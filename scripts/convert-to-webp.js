/**
 * Convert images to WebP format
 * 
 * This script converts all JPG/PNG images to WebP format
 * for better performance (25-35% smaller file size)
 * 
 * Usage:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/convert-to-webp.js
 * 
 * Features:
 * - Batch conversion of all images
 * - Maintains original quality (85%)
 * - Creates organized output directory
 * - Shows file size savings
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDirs: [
    './public',
    './src/assets',
  ],
  outputDir: './public/images/webp', // Organized output directory
  quality: 85, // WebP quality (85 is optimal)
  skipExisting: true, // Skip if WebP already exists
  verbose: true, // Show detailed logs
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Format bytes to human-readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Create output directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`${colors.blue}📁 Created directory: ${dirPath}${colors.reset}`);
  }
}

// Get all image files recursively
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        getImageFiles(filePath, fileList);
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Convert single image to WebP
async function convertImage(inputPath, outputPath) {
  try {
    const inputStat = fs.statSync(inputPath);
    const inputSize = inputStat.size;

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: config.quality })
      .toFile(outputPath);

    const outputStat = fs.statSync(outputPath);
    const outputSize = outputStat.size;
    const savings = ((inputSize - outputSize) / inputSize) * 100;

    return {
      success: true,
      inputSize,
      outputSize,
      savings,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Main conversion function
async function convertAllImages() {
  console.log(`${colors.cyan}🚀 Starting WebP conversion...${colors.reset}\n`);

  // Create output directory
  ensureDirectoryExists(config.outputDir);

  // Collect all images
  let allImages = [];
  config.inputDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      const images = getImageFiles(dir);
      allImages = allImages.concat(images);
      console.log(`${colors.blue}📂 Found ${images.length} images in ${dir}${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  Directory not found: ${dir}${colors.reset}`);
    }
  });

  if (allImages.length === 0) {
    console.log(`${colors.yellow}⚠️  No images found to convert${colors.reset}`);
    return;
  }

  console.log(`${colors.cyan}\n📊 Processing ${allImages.length} images...\n${colors.reset}`);

  // Statistics
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;

  // Convert each image
  for (const inputPath of allImages) {
    const fileName = path.basename(inputPath);
    const webpFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(config.outputDir, webpFileName);

    // Skip if already exists
    if (config.skipExisting && fs.existsSync(outputPath)) {
      if (config.verbose) {
        console.log(`${colors.yellow}⏭️  Skipped (exists): ${fileName}${colors.reset}`);
      }
      skipped++;
      continue;
    }

    // Convert image
    const result = await convertImage(inputPath, outputPath);

    if (result.success) {
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      converted++;

      if (config.verbose) {
        console.log(
          `${colors.green}✅ Converted: ${fileName}${colors.reset}\n` +
          `   ${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)} ` +
          `(${colors.green}-${result.savings.toFixed(1)}%${colors.reset})`
        );
      }
    } else {
      failed++;
      console.log(`${colors.red}❌ Failed: ${fileName}${colors.reset}\n   Error: ${result.error}`);
    }
  }

  // Summary
  const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize) * 100;

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}📊 Conversion Summary${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  console.log(`${colors.green}✅ Converted: ${converted}${colors.reset}`);
  console.log(`${colors.yellow}⏭️  Skipped: ${skipped}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  console.log(`\n${colors.blue}💾 Total Input Size: ${formatBytes(totalInputSize)}${colors.reset}`);
  console.log(`${colors.green}💾 Total Output Size: ${formatBytes(totalOutputSize)}${colors.reset}`);
  console.log(`${colors.green}💰 Total Savings: ${formatBytes(totalInputSize - totalOutputSize)} (${totalSavings.toFixed(1)}%)${colors.reset}`);

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.green}✨ WebP conversion complete!${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Next steps
  console.log(`${colors.yellow}📝 Next Steps:${colors.reset}`);
  console.log(`   1. Update image imports to use WebP files`);
  console.log(`   2. Use <WebPImage> component for automatic fallback`);
  console.log(`   3. Test in Chrome DevTools → Network tab`);
  console.log(`   4. Run Lighthouse to verify improvements\n`);
}

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log(`${colors.red}❌ Error: 'sharp' module not found${colors.reset}`);
  console.log(`\n${colors.yellow}Please install it first:${colors.reset}`);
  console.log(`   npm install --save-dev sharp\n`);
  process.exit(1);
}

// Run conversion
convertAllImages().catch((error) => {
  console.error(`${colors.red}❌ Conversion failed:${colors.reset}`, error);
  process.exit(1);
});
