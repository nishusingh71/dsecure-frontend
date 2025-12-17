/**
 * 🔍 Email PII Migration Validator
 * 
 * This script scans the codebase to ensure NO email addresses
 * are being sent through URL parameters.
 * 
 * Run: node validate-email-pii.js
 */

const fs = require('fs')
const path = require('path')

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
}

// Patterns that indicate PII exposure
const VIOLATION_PATTERNS = [
  {
    pattern: /\/api\/.*\$\{.*email.*\}/gi,
    description: 'Email in URL template literal',
    severity: 'HIGH'
  },
  {
    pattern: /encodeURIComponent\(.*email.*\)/gi,
    description: 'Email encoded in URL (still visible)',
    severity: 'HIGH'
  },
  {
    pattern: /\/api\/.*\/\$\{email\}/gi,
    description: 'Direct email variable in URL',
    severity: 'HIGH'
  },
  {
    pattern: /fetch\(['"`]\/api\/.*\$\{.*email/gi,
    description: 'Fetch with email in URL',
    severity: 'HIGH'
  }
]

// Patterns that indicate correct implementation
const COMPLIANCE_PATTERNS = [
  {
    pattern: /X-User-Email.*encodeEmail/gi,
    description: 'Email in Base64-encoded header'
  },
  {
    pattern: /import.*encodeEmail.*from.*encodeEmail/gi,
    description: 'encodeEmail utility imported'
  }
]

let violations = []
let compliantFiles = []
let scannedFiles = 0

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  let fileViolations = []
  let fileCompliance = []
  
  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
      return
    }
    
    // Check for violations
    VIOLATION_PATTERNS.forEach(({ pattern, description, severity }) => {
      if (pattern.test(line)) {
        fileViolations.push({
          file: filePath,
          line: index + 1,
          content: line.trim(),
          description,
          severity
        })
      }
    })
    
    // Check for compliance
    COMPLIANCE_PATTERNS.forEach(({ pattern, description }) => {
      if (pattern.test(line)) {
        fileCompliance.push({
          file: filePath,
          line: index + 1,
          description
        })
      }
    })
  })
  
  if (fileViolations.length > 0) {
    violations.push(...fileViolations)
  }
  
  if (fileCompliance.length > 0) {
    compliantFiles.push(filePath)
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, build folders
      if (!['node_modules', 'dist', 'build', '.git'].includes(file)) {
        scanDirectory(filePath)
      }
    } else if (stat.isFile()) {
      // Only scan TypeScript/JavaScript files
      if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(file))) {
        scannedFiles++
        scanFile(filePath)
      }
    }
  })
}

function printReport() {
  console.log('\n' + '='.repeat(80))
  console.log(COLORS.blue + '🔍 Email PII Migration Validation Report' + COLORS.reset)
  console.log('='.repeat(80) + '\n')
  
  console.log(`📊 Scanned ${scannedFiles} files\n`)
  
  // Violations
  if (violations.length > 0) {
    console.log(COLORS.red + `❌ VIOLATIONS FOUND: ${violations.length}` + COLORS.reset)
    console.log('The following code exposes email in URLs:\n')
    
    violations.forEach((v, i) => {
      console.log(`${i + 1}. ${COLORS.yellow}[${v.severity}]${COLORS.reset} ${v.file}:${v.line}`)
      console.log(`   ${COLORS.red}Issue:${COLORS.reset} ${v.description}`)
      console.log(`   ${COLORS.blue}Code:${COLORS.reset} ${v.content}`)
      console.log()
    })
    
    console.log(COLORS.red + '⚠️  MIGRATION INCOMPLETE - Please fix violations above' + COLORS.reset)
  } else {
    console.log(COLORS.green + '✅ NO VIOLATIONS FOUND' + COLORS.reset)
    console.log('All email transmission uses secure headers!\n')
  }
  
  // Compliance
  if (compliantFiles.length > 0) {
    console.log(COLORS.green + `\n✅ COMPLIANT FILES: ${compliantFiles.length}` + COLORS.reset)
    console.log('The following files use PII-safe email transmission:\n')
    
    [new Set(compliantFiles)].forEach((file, i) => {
      console.log(`${i + 1}. ${file}`)
    })
  }
  
  console.log('\n' + '='.repeat(80))
  
  // Summary
  if (violations.length === 0) {
    console.log(COLORS.green + '🎉 MIGRATION COMPLETE - All files are PII-safe!' + COLORS.reset)
  } else {
    console.log(COLORS.red + `⚠️  MIGRATION INCOMPLETE - ${violations.length} violations to fix` + COLORS.reset)
  }
  
  console.log('='.repeat(80) + '\n')
}

// Run validation
console.log('Starting Email PII validation scan...\n')

const srcDir = path.join(__dirname, 'src')

if (fs.existsSync(srcDir)) {
  scanDirectory(srcDir)
  printReport()
  
  // Exit with error if violations found
  if (violations.length > 0) {
    process.exit(1)
  }
} else {
  console.error(COLORS.red + '❌ Error: src directory not found!' + COLORS.reset)
  process.exit(1)
}
