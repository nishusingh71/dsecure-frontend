#!/usr/bin/env node
/**
 * audit-hindi.mjs
 * 
 * Audits Hindi locale files to detect:
 * 1. Missing translation keys (in English but not in Hindi)
 * 2. Hindi values that still contain English text
 * 
 * Usage: node scripts/audit-hindi.mjs [--fix-report]
 * 
 * Output: Console report + scripts/i18n-output/hindi-audit-report.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const LOCALES_EN = path.join(ROOT, 'src', 'locales', 'en');
const LOCALES_HI = path.join(ROOT, 'src', 'locales', 'hi');
const OUTPUT_DIR = path.join(ROOT, 'scripts', 'i18n-output');

// ─── English Detection Patterns ────────────────────────────────

/**
 * Common English acronyms/terms that should be transliterated in Hindi.
 * Each entry: [pattern, description]
 */
const ENGLISH_PATTERNS = [
  // Technical acronyms (2+ uppercase Latin letters)
  [/\b[A-Z]{2,}\b/g, 'Uppercase acronym'],
  // English words with 4+ letters (mixed case)
  [/\b[A-Za-z]{4,}\b/g, 'English word'],
  // Common brand/product names
  [/\b(D-Secure|ServiceNow|Apple Silicon|macOS|Windows|Linux)\b/gi, 'Brand name'],
  // Architecture identifiers
  [/\b(Arch64|ARM64|AMD64|x64|x86|NVMe)\b/g, 'Architecture identifier'],
];

/** 
 * Allowlist — these English words are acceptable in Hindi locale 
 * (brand names that should stay in English, technical identifiers)
 */
const ALLOWLIST = new Set([
  'D-Secure', 'ISO', 'T2', 'M1', 'M2', 'M3',
  // URL parts
  'https', 'http', 'www', 'com',
  // File formats
  'png', 'jpg', 'svg', 'webp', 'json',
  // CSS/Code
  'auto', 'blue', 'slate', 'yellow', 'green',
]);

// ─── Helpers ───────────────────────────────────────────────────

/** Recursively flatten a JSON object into key-value pairs */
function flattenJson(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenJson(value, fullKey));
    } else if (Array.isArray(value)) {
      // Handle arrays (like FAQ, eraseTypesData, etc.)
      value.forEach((item, idx) => {
        if (typeof item === 'object') {
          Object.assign(result, flattenJson(item, `${fullKey}[${idx}]`));
        } else {
          result[`${fullKey}[${idx}]`] = item;
        }
      });
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

/** Detect English text in a Hindi string value */
function detectEnglish(value) {
  if (typeof value !== 'string') return [];
  
  const findings = [];
  
  // Find uppercase English sequences (2+ uppercase Latin chars)
  const acronymRegex = /\b[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*\b/g;
  let match;
  while ((match = acronymRegex.exec(value)) !== null) {
    const word = match[0];
    // Skip single uppercase letters
    if (word.length < 2) continue;
    // Skip allowlisted
    if (ALLOWLIST.has(word)) continue;
    // Skip if it's just numbers with letters like M1, T2
    if (/^[A-Z]\d+$/.test(word)) continue;
    // Must have at least 2 Latin letters
    if ((word.match(/[A-Za-z]/g) || []).length < 2) continue;
    findings.push({ word, position: match.index });
  }
  
  // Also detect lowercase English words (4+ chars)
  const wordRegex = /\b[a-z]{4,}\b/g;
  while ((match = wordRegex.exec(value)) !== null) {
    const word = match[0];
    if (ALLOWLIST.has(word)) continue;
    // Skip common transliterated Hindi words written in Latin
    if (['auto', 'blue', 'slate', 'yellow', 'green', 'level', 'color', 'null'].includes(word)) continue;
    // Check if it's surrounded by Devanagari text — likely intentional
    const before = value.charAt(match.index - 1) || '';
    const after = value.charAt(match.index + word.length) || '';
    const isInHindiContext = /[\u0900-\u097F]/.test(before) || /[\u0900-\u097F]/.test(after);
    if (!isInHindiContext) {
      findings.push({ word, position: match.index, type: 'lowercase' });
    }
  }

  return findings;
}

// ─── Main ──────────────────────────────────────────────────────

function main() {
  console.log('\n🔍 Hindi Translation Audit Script');
  console.log('═'.repeat(60));

  // Find all JSON files
  const enFiles = fs.readdirSync(LOCALES_EN).filter(f => f.endsWith('.json'));
  const hiFiles = fs.readdirSync(LOCALES_HI).filter(f => f.endsWith('.json'));

  console.log(`\n📂 English locale: ${enFiles.length} files (${enFiles.join(', ')})`);
  console.log(`📂 Hindi locale:   ${hiFiles.length} files (${hiFiles.join(', ')})`);

  const report = {
    timestamp: new Date().toISOString(),
    summary: { totalMissing: 0, totalEnglishInHindi: 0 },
    files: {}
  };

  // ── Check each English file ──
  for (const file of enFiles) {
    const enPath = path.join(LOCALES_EN, file);
    const hiPath = path.join(LOCALES_HI, file);
    const namespace = file.replace('.json', '');
    
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📄 ${file}`);
    console.log(`${'─'.repeat(60)}`);

    const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
    const enFlat = flattenJson(enData);

    const fileReport = {
      missingKeys: [],
      englishInHindi: [],
      stats: { enKeys: Object.keys(enFlat).length, hiKeys: 0, missing: 0, englishDetected: 0 }
    };

    if (!fs.existsSync(hiPath)) {
      console.log(`   ❌ Hindi file MISSING — entire file needs translation`);
      fileReport.missingKeys = Object.keys(enFlat);
      fileReport.stats.missing = Object.keys(enFlat).length;
      report.summary.totalMissing += Object.keys(enFlat).length;
      report.files[namespace] = fileReport;
      continue;
    }

    const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf-8'));
    const hiFlat = flattenJson(hiData);
    fileReport.stats.hiKeys = Object.keys(hiFlat).length;

    // ── 1. Missing keys ──
    const missingKeys = Object.keys(enFlat).filter(k => !(k in hiFlat));
    fileReport.missingKeys = missingKeys;
    fileReport.stats.missing = missingKeys.length;
    report.summary.totalMissing += missingKeys.length;

    if (missingKeys.length > 0) {
      console.log(`\n   🔑 Missing keys (${missingKeys.length}):`);
      for (const key of missingKeys.slice(0, 15)) {
        const val = enFlat[key];
        const preview = typeof val === 'string' ? val.substring(0, 50) : JSON.stringify(val).substring(0, 50);
        console.log(`      ❌ ${key}: "${preview}${preview.length >= 50 ? '...' : ''}"`);
      }
      if (missingKeys.length > 15) {
        console.log(`      ... and ${missingKeys.length - 15} more`);
      }
    } else {
      console.log(`   ✅ All keys present`);
    }

    // ── 2. English text in Hindi values ──
    let englishCount = 0;
    for (const [key, value] of Object.entries(hiFlat)) {
      if (typeof value !== 'string') continue;
      // Skip URL values, cloudinary paths, etc.
      if (value.startsWith('http') || value.includes('cloudinary')) continue;
      // Skip color/level values
      if (['blue', 'slate', 'yellow', 'green', 'red', 'purple'].includes(value)) continue;
      
      const findings = detectEnglish(value);
      if (findings.length > 0) {
        const uniqueWords = [...new Set(findings.map(f => f.word))];
        fileReport.englishInHindi.push({ key, value: value.substring(0, 80), englishWords: uniqueWords });
        englishCount++;
      }
    }
    fileReport.stats.englishDetected = englishCount;
    report.summary.totalEnglishInHindi += englishCount;

    if (englishCount > 0) {
      console.log(`\n   🔤 Hindi values with English text (${englishCount}):`);
      for (const item of fileReport.englishInHindi.slice(0, 15)) {
        const words = item.englishWords.join(', ');
        console.log(`      ⚠️  ${item.key}`);
        console.log(`         English found: ${words}`);
        console.log(`         Value: "${item.value}${item.value.length >= 80 ? '...' : ''}"`);
      }
      if (englishCount > 15) {
        console.log(`      ... and ${englishCount - 15} more`);
      }
    } else {
      console.log(`   ✅ No English text detected in Hindi values`);
    }

    report.files[namespace] = fileReport;
  }

  // ── Overall Summary ──
  console.log(`\n${'═'.repeat(60)}`);
  console.log('📊 AUDIT SUMMARY');
  console.log('═'.repeat(60));
  console.log(`\n   Missing translation keys:      ${report.summary.totalMissing}`);
  console.log(`   Hindi values with English:     ${report.summary.totalEnglishInHindi}`);
  
  if (report.summary.totalMissing === 0 && report.summary.totalEnglishInHindi === 0) {
    console.log('\n   🎉 PERFECT! All translations are complete and in Hindi!');
  } else {
    console.log('\n   ⚠️  Some translations need attention. See report above.');
  }

  // ── Save report ──
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const reportPath = path.join(OUTPUT_DIR, 'hindi-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n✅ Full report saved: ${path.relative(ROOT, reportPath)}`);
  console.log('═'.repeat(60));
}

main();
