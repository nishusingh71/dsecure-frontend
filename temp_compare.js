const fs = require('fs');
const l1 = JSON.parse(fs.readFileSync('src/languages/en.json', 'utf8'));
const l2 = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(flattenKeys(obj[k], prefix + k + '.'));
    } else {
      keys.push({ key: prefix + k, val: obj[k] });
    }
  }
  return keys;
}

const flat1 = flattenKeys(l1);
const flat2 = flattenKeys(l2);

const keys2 = new Set(flat2.map(x => x.key));
const values2 = new Set(flat2.map(x => typeof x.val === 'string' ? x.val.toLowerCase().trim() : ''));

const missingKeys = flat1.filter(x => !keys2.has(x.key));
const missingValues = flat1.filter(x => typeof x.val === 'string' && !values2.has(x.val.toLowerCase().trim()));

console.log('--- Stats ---');
console.log('Keys in languages:', flat1.length);
console.log('Keys in locales:', flat2.length);
console.log('Keys in languages NOT in locales:', missingKeys.length);
console.log('Values in languages NOT in locales:', missingValues.length);

if (missingValues.length > 0) {
  console.log('\nSample missing values (first 10):');
  missingValues.slice(0, 10).forEach(x => console.log('  ' + x.key + ' -> ' + JSON.stringify(x.val)));
}
