#!/usr/bin/env node
/**
 * extract-i18n.mjs
 * 
 * Scans TSX page files to extract hardcoded English text and generate
 * categorized locale JSON files (per-page, common, seo).
 * 
 * Usage: node scripts/extract-i18n.mjs [--pages=PageName1,PageName2]
 * 
 * Output: scripts/i18n-output/en/<pageName>.json + common.json + seo.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const LOCALES_EN = path.join(ROOT, 'src', 'locales', 'en');
const OUTPUT_DIR = path.join(ROOT, 'scripts', 'i18n-output', 'en');

// ─── Helpers ───────────────────────────────────────────────────

/** Convert text to a camelCase key, truncated to ~50 chars */
function textToKey(text) {
  const cleaned = text
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 8)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
  return cleaned.substring(0, 50) || 'untitled';
}

/** Convert PascalCase page name to camelCase namespace */
function pageToNamespace(pageName) {
  // DriveEraserPage → driveEraser
  const name = pageName.replace(/Page$/, '').replace(/\.tsx$/, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/** Check if a string is likely English text (not code/CSS/variable) */
function isLikelyText(str) {
  const trimmed = str.trim();
  if (trimmed.length < 2) return false;
  if (trimmed.length > 500) return false;
  // Skip pure numbers
  if (/^\d+(\.\d+)?$/.test(trimmed)) return false;
  // Skip CSS classes
  if (/^[a-z\-]+(\s[a-z\-]+)*$/.test(trimmed) && trimmed.includes('-')) return false;
  // Skip URLs
  if (/^(https?:\/\/|www\.|\/\/)/.test(trimmed)) return false;
  // Skip file paths / imports
  if (/^[\w\/.@-]+\.(tsx?|jsx?|css|png|jpg|svg|json|webp)$/.test(trimmed)) return false;
  // Skip SVG paths
  if (/^M[\d\s.,]+[zZ]?$/.test(trimmed)) return false;
  if (/^[MmLlHhVvCcSsQqTtAaZz\d\s.,\-]+$/.test(trimmed) && trimmed.length > 20) return false;
  // Skip hex colors
  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return false;
  // Skip single special chars
  if (/^[^a-zA-Z]*$/.test(trimmed)) return false;
  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  // Skip known non-text patterns
  if (/^(true|false|null|undefined|none|auto|flex|grid|block|inline|absolute|relative|fixed|sticky)$/i.test(trimmed)) return false;
  // Skip Tailwind-like classes
  if (/^(bg-|text-|flex-|p-|m-|w-|h-|border|rounded|shadow|hover:|focus:|transition)/.test(trimmed)) return false;
  return true;
}

/** Check if text is already wrapped in t() / i18n translation */
function isAlreadyTranslated(line, matchIndex) {
  // Check if the match is inside a t("...") or t('...') call
  const before = line.substring(0, matchIndex);
  // Check for t( or t(" patterns before this text
  if (/\bt\(\s*["'`]$/.test(before)) return true;
  if (/\bt\(\s*$/.test(before)) return true;
  // Check for {t("...")} pattern
  if (/\{t\(/.test(before) && !before.includes(')')) return true;
  return false;
}

// ─── Extraction Engine ─────────────────────────────────────────

function extractFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileName = path.basename(filePath);
  
  const found = {
    pageStrings: [],   // Page-specific text
    seoStrings: [],    // SEO meta titles/descriptions
  };

  let inJSXReturn = false;
  let inImportBlock = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmedLine = line.trim();

    // Skip import lines
    if (trimmedLine.startsWith('import ')) { inImportBlock = true; continue; }
    if (inImportBlock && (trimmedLine.endsWith(';') || trimmedLine.endsWith("';"))) { inImportBlock = false; continue; }
    if (inImportBlock) continue;

    // Skip comments
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) continue;

    // ── Pattern 1: JSX text content >{text}< ──
    // Match text directly inside JSX elements (not inside {} expressions)
    const jsxTextRegex = />([^<>{]+)</g;
    let match;
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (isLikelyText(text) && !isAlreadyTranslated(line, match.index)) {
        // Check if it's inside Helmet/SEO
        const contextLines = lines.slice(Math.max(0, i - 5), i + 1).join('\n');
        const isSeo = /Helmet|<title|<meta/.test(contextLines);
        const entry = { text, key: textToKey(text), line: lineNum, file: fileName };
        if (isSeo) {
          found.seoStrings.push(entry);
        } else {
          found.pageStrings.push(entry);
        }
      }
    }

    // ── Pattern 2: String attributes (title, placeholder, aria-label, alt) ──
    const attrRegex = /(?:title|placeholder|aria-label|alt|content|label)\s*=\s*"([^"]+)"/g;
    while ((match = attrRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (isLikelyText(text) && !isAlreadyTranslated(line, match.index)) {
        const contextLines = lines.slice(Math.max(0, i - 5), i + 1).join('\n');
        const isSeo = /Helmet|<meta/.test(contextLines);
        const entry = { text, key: textToKey(text), line: lineNum, file: fileName, type: 'attribute' };
        if (isSeo) {
          found.seoStrings.push(entry);
        } else {
          found.pageStrings.push(entry);
        }
      }
    }

    // ── Pattern 3: Hardcoded strings in arrays/objects ──
    // Look for patterns like: "Some English text" or 'Some English text' in object literals
    const stringLiteralRegex = /["']([A-Z][a-zA-Z\s,.\-&/!?:;()]{5,})["']/g;
    while ((match = stringLiteralRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (isLikelyText(text) && !isAlreadyTranslated(line, match.index)) {
        // Skip if it's a key name (before a colon)
        const afterMatch = line.substring(match.index + match[0].length).trim();
        if (afterMatch.startsWith(':')) continue;
        // Skip CSS/className values
        if (/className/.test(line.substring(0, match.index))) continue;
        
        found.pageStrings.push({ text, key: textToKey(text), line: lineNum, file: fileName, type: 'string-literal' });
      }
    }
  }

  return found;
}

// ─── Main ──────────────────────────────────────────────────────

function main() {
  console.log('\n🔍 i18n Text Extraction Script');
  console.log('═'.repeat(60));

  // Parse --pages argument
  const pagesArg = process.argv.find(a => a.startsWith('--pages='));
  let targetPages = null;
  if (pagesArg) {
    targetPages = pagesArg.split('=')[1].split(',').map(p => p.trim());
    console.log(`\n📎 Targeting specific pages: ${targetPages.join(', ')}`);
  }

  // Find all TSX page files
  let pageFiles = fs.readdirSync(PAGES_DIR)
    .filter(f => f.endsWith('.tsx') && !f.startsWith('.'));

  if (targetPages) {
    pageFiles = pageFiles.filter(f => {
      const name = f.replace('.tsx', '');
      return targetPages.some(tp => name.toLowerCase().includes(tp.toLowerCase()));
    });
  }

  console.log(`\n📂 Found ${pageFiles.length} page files to scan\n`);

  // Track all strings across pages for common detection
  const allStrings = new Map(); // text → [{ namespace, key, file, line }]
  const perPageResults = new Map(); // namespace → { strings, seo }

  // Extract from each page
  for (const file of pageFiles) {
    const filePath = path.join(PAGES_DIR, file);
    const namespace = pageToNamespace(file);
    const result = extractFromFile(filePath);

    if (result.pageStrings.length > 0 || result.seoStrings.length > 0) {
      perPageResults.set(namespace, result);
      
      // Track for common detection
      for (const entry of result.pageStrings) {
        const existing = allStrings.get(entry.text) || [];
        existing.push({ namespace, ...entry });
        allStrings.set(entry.text, existing);
      }
    }
  }

  // ── Categorize: common (3+ pages) vs page-specific ──
  const commonStrings = new Map();
  const COMMON_THRESHOLD = 3;

  for (const [text, occurrences] of allStrings) {
    const uniquePages = new Set(occurrences.map(o => o.namespace));
    if (uniquePages.size >= COMMON_THRESHOLD) {
      commonStrings.set(text, { key: textToKey(text), pages: [...uniquePages], count: uniquePages.size });
    }
  }

  // ── Generate output ──
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate per-page JSON
  let totalPageStrings = 0;
  let totalSeoStrings = 0;
  const pageSummary = [];

  for (const [namespace, result] of perPageResults) {
    const pageJson = {};
    let pageCount = 0;

    for (const entry of result.pageStrings) {
      // Skip if it's common
      if (commonStrings.has(entry.text)) continue;
      // Avoid duplicate keys
      let key = entry.key;
      let suffix = 1;
      while (pageJson[key] && pageJson[key] !== entry.text) {
        key = `${entry.key}_${suffix++}`;
      }
      pageJson[key] = entry.text;
      pageCount++;
    }

    if (pageCount > 0) {
      const outPath = path.join(OUTPUT_DIR, `${namespace}.json`);
      fs.writeFileSync(outPath, JSON.stringify(pageJson, null, 2), 'utf-8');
      totalPageStrings += pageCount;
      pageSummary.push({ namespace, count: pageCount });
    }

    // Count SEO
    totalSeoStrings += result.seoStrings.length;
  }

  // Generate common.json
  if (commonStrings.size > 0) {
    const commonJson = {};
    for (const [text, info] of commonStrings) {
      commonJson[info.key] = text;
    }
    fs.writeFileSync(path.join(OUTPUT_DIR, '_common.json'), JSON.stringify(commonJson, null, 2), 'utf-8');
  }

  // Generate seo.json
  const seoJson = {};
  for (const [namespace, result] of perPageResults) {
    if (result.seoStrings.length > 0) {
      seoJson[namespace] = {};
      for (const entry of result.seoStrings) {
        seoJson[namespace][entry.key] = entry.text;
      }
    }
  }
  if (Object.keys(seoJson).length > 0) {
    fs.writeFileSync(path.join(OUTPUT_DIR, '_seo.json'), JSON.stringify(seoJson, null, 2), 'utf-8');
  }

  // ── Print Summary ──
  console.log('═'.repeat(60));
  console.log('📊 EXTRACTION SUMMARY');
  console.log('═'.repeat(60));

  if (pageSummary.length > 0) {
    console.log('\n📄 Per-page hardcoded strings found:');
    for (const { namespace, count } of pageSummary.sort((a, b) => b.count - a.count)) {
      console.log(`   ${namespace.padEnd(35)} ${String(count).padStart(4)} strings`);
    }
  }

  console.log(`\n   ${'TOTAL page-specific'.padEnd(35)} ${String(totalPageStrings).padStart(4)} strings`);
  console.log(`   ${'Common strings (3+ pages)'.padEnd(35)} ${String(commonStrings.size).padStart(4)} strings`);
  console.log(`   ${'SEO strings'.padEnd(35)} ${String(totalSeoStrings).padStart(4)} strings`);
  console.log(`\n✅ Output written to: ${path.relative(ROOT, OUTPUT_DIR)}/`);
  console.log('═'.repeat(60));
}

main();
