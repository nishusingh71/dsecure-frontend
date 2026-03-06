const fs = require('fs');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const filePath = './src/pages/FileEraserPage.tsx';
const localesPath = './src/locales/en/fileEraser.json';

const code = fs.readFileSync(filePath, 'utf-8');

const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
});

let translationKeys = {};
if (fs.existsSync(localesPath)) {
    translationKeys = JSON.parse(fs.readFileSync(localesPath, 'utf-8'));
}

const isMeaningfulText = (text) => {
    if (!text) return false;
    const trimmed = text.trim();
    if (trimmed.length === 0) return false;
    // skip purely numbers or short symbols
    if (/^[\d\s\.\,\+\-\*\/\%\=\:\;]+$/.test(trimmed)) return false;
    // skip paths, urls, basic variable names, small words
    if (/^[a-z_][a-zA-Z0-9_]*$/.test(trimmed) && trimmed.length < 5) return false;
    if (trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('file://')) return false;
    if (trimmed === 'true' || trimmed === 'false' || trimmed === 'null' || trimmed === 'undefined') return false;
    return /[a-zA-Z]{2,}/.test(trimmed); 
};

// basic string to key
const generateKey = (str) => {
    let key = str.toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    return key.substring(0, 40); // cap length
};

let modifiedCount = 0;

traverse(ast, {
    JSXText(path) {
        const text = path.node.value.trim();
        if (isMeaningfulText(text) && !path.parentPath.isJSXExpressionContainer()) {
            let key = generateKey(text);
            
            // handle collision
            if (translationKeys[key] && translationKeys[key] !== text) {
                let i = 1;
                while(translationKeys[`${key}_${i}`] && translationKeys[`${key}_${i}`] !== text) i++;
                key = `${key}_${i}`;
            }
            
            translationKeys[key] = text;

            path.replaceWith(babel.types.jsxExpressionContainer(
                babel.types.callExpression(
                    babel.types.identifier('t'),
                    [babel.types.stringLiteral(`${key}`)]
                )
            ));
            modifiedCount++;
        }
    },
    // Also catch hardcoded strings in props (e.g. placeholder="Email", label="Contact")
    JSXAttribute(path) {
        if (path.node.name.name === 'placeholder' || path.node.name.name === 'label' || path.node.name.name === 'title' || path.node.name.name === 'alt') {
            const valueNode = path.node.value;
            if (babel.types.isStringLiteral(valueNode)) {
                const text = valueNode.value;
                if (isMeaningfulText(text)) {
                    let key = generateKey(text);
                    if (translationKeys[key] && translationKeys[key] !== text) {
                        let i = 1;
                        while(translationKeys[`${key}_${i}`] && translationKeys[`${key}_${i}`] !== text) i++;
                        key = `${key}_${i}`;
                    }
                    translationKeys[key] = text;
                    
                    path.node.value = babel.types.jsxExpressionContainer(
                        babel.types.callExpression(
                            babel.types.identifier('t'),
                            [babel.types.stringLiteral(`${key}`)]
                        )
                    );
                    modifiedCount++;
                }
            }
        }
    },
    // Catch strings in objects/arrays like `const platforms = [{ name: "Windows" }]`
    // We only want strings inside arrays/objects inside the component
    StringLiteral(path) {
        // Only if it's inside an array expression or object property that's not a standard React config
        const parent = path.parent;
        if (babel.types.isObjectProperty(parent) || babel.types.isArrayExpression(parent)) {
            // Ignore keys of objects
            if (babel.types.isObjectProperty(parent) && parent.key === path.node) return;
            
            // We only want to translate specific keys if in an object (e.g. name, desc, title, label, versions)
            let shouldTranslate = false;
            if (babel.types.isObjectProperty(parent) && babel.types.isIdentifier(parent.key)) {
               const keyName = parent.key.name;
               if (['name', 'desc', 'label', 'title', 'versions', 'description', 'alt', 'q', 'a'].includes(keyName)) {
                   shouldTranslate = true;
               }
            } else if (babel.types.isArrayExpression(parent)) {
                 shouldTranslate = true; 
            }

            if (shouldTranslate) {
                const text = path.node.value;
                if (isMeaningfulText(text) && !path.node._translated) {
                     let key = generateKey(text);
                     if (translationKeys[key] && translationKeys[key] !== text) {
                         let i = 1;
                         while(translationKeys[`${key}_${i}`] && translationKeys[`${key}_${i}`] !== text) i++;
                         key = `${key}_${i}`;
                     }
                     translationKeys[key] = text;
                     
                     const newCall = babel.types.callExpression(
                         babel.types.identifier('t'),
                         [babel.types.stringLiteral(`${key}`)]
                     );
                     // Mark to prevent infinite recursion if we were to revisit, though traverse usually doesn't loop
                     path.replaceWith(newCall);
                     modifiedCount++;
                }
            }
        }
    }
});

// 4. Update the component to include the hook and import
if (modifiedCount > 0) {
    // Check for useTranslation import
    let hasImport = false;
    traverse(ast, {
        ImportDeclaration(path) {
            if (path.node.source.value === 'react-i18next') {
                hasImport = true;
                if (!path.node.specifiers.some(s => s.imported?.name === 'useTranslation')) {
                    path.node.specifiers.push(babel.types.importSpecifier(
                        babel.types.identifier('useTranslation'),
                        babel.types.identifier('useTranslation')
                    ));
                }
            }
        }
    });

    if (!hasImport) {
        ast.program.body.unshift(babel.types.importDeclaration(
            [babel.types.importSpecifier(babel.types.identifier('useTranslation'), babel.types.identifier('useTranslation'))],
            babel.types.stringLiteral('react-i18next')
        ));
    }

    // Add const { t } = useTranslation("fileEraser"); inside the component
    traverse(ast, {
        FunctionDeclaration(path) {
            if (path.node.id?.name === 'FileEraserPage') {
                const body = path.node.body.body;
                if (!body.some(stmt => 
                    babel.types.isVariableDeclaration(stmt) && 
                    JSON.stringify(stmt).includes('useTranslation')
                )) {
                    body.unshift(babel.types.variableDeclaration('const', [
                        babel.types.variableDeclarator(
                            babel.types.objectPattern([
                                babel.types.objectProperty(
                                    babel.types.identifier('t'),
                                    babel.types.identifier('t'),
                                    false,
                                    true
                                )
                            ]),
                            babel.types.callExpression(
                                babel.types.identifier('useTranslation'),
                                [babel.types.stringLiteral('fileEraser')]
                            )
                        )
                    ]));
                }
            }
        }
    });

    const output = generate(ast, {
        retainLines: true,
        compact: false
    }, code);
    fs.writeFileSync(filePath, output.code, 'utf-8');
    fs.writeFileSync(localesPath, JSON.stringify(translationKeys, null, 2), 'utf-8');
    console.log(`Successfully extracted ${modifiedCount} strings.`);
} else {
    console.log('No strings needed extraction.');
}
