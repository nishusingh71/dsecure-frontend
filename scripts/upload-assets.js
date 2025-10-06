#!/usr/bin/env node

/**
 * Cloudinary Asset Upload Script
 * 
 * This script helps you upload your local assets to Cloudinary with the correct public IDs.
 * 
 * Setup:
 * 1. npm install cloudinary (if not already installed)
 * 2. Set your Cloudinary credentials in .env.local
 * 3. Run: node scripts/upload-assets.js
 */

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // You need to add this to .env.local
})

// Asset mappings
const assets = [
  {
    local: './public/dsecure-logo-black.svg',
    publicId: 'dsecure/logos/dsecure-logo-black',
    description: 'D-Secure main logo (black)'
  },
  {
    local: './public/dsecure-logo-white.svg',
    publicId: 'dsecure/logos/dsecure-logo-white',
    description: 'D-Secure white logo for dark backgrounds'
  },
  {
    local: './public/new-favicon.svg',
    publicId: 'dsecure/logos/dsecure-favicon',
    description: 'D-Secure molecular network favicon'
  },
  {
    local: './public/new-favicon.svg',
    publicId: 'dsecure/logos/dsecure-icon',
    description: 'D-Secure molecular network icon'
  }
  // Add more assets here as needed
]

async function uploadAsset({ local, publicId, description }) {
  try {
    // Check if local file exists
    if (!fs.existsSync(local)) {
      //console.log(`⚠️  File not found: ${local}`)
      return false
    }

    //console.log(`📤 Uploading: ${description}`)
    //console.log(`   Local: ${local}`)
    //console.log(`   Public ID: ${publicId}`)

    const result = await cloudinary.uploader.upload(local, {
      public_id: publicId,
      resource_type: 'auto', // Auto-detect file type
      overwrite: true, // Overwrite if exists
      invalidate: true, // Invalidate CDN cache
      use_filename: false,
      unique_filename: false
    })

    //console.log(`✅ Success: ${result.secure_url}`)
    //console.log(`   Size: ${(result.bytes / 1024).toFixed(2)}KB`)
    //console.log(`   Format: ${result.format}`)
    //console.log('')

    return true
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`)
    console.error(`   Error: ${error.message}`)
    //console.log('')
    return false
  }
}

async function main() {
  //console.log('🚀 Cloudinary Asset Upload Script')
  //console.log('================================')
  //console.log('')

  // Validate configuration
  if (!process.env.VITE_CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Missing VITE_CLOUDINARY_CLOUD_NAME in .env.local')
    process.exit(1)
  }

  if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Missing CLOUDINARY_API_SECRET in .env.local')
    console.error('   Get this from your Cloudinary dashboard and add it to .env.local')
    process.exit(1)
  }

  //console.log(`📋 Cloud Name: ${process.env.VITE_CLOUDINARY_CLOUD_NAME}`)
  //console.log(`📋 Assets to upload: ${assets.length}`)
  //console.log('')

  let successCount = 0
  let failCount = 0

  for (const asset of assets) {
    const success = await uploadAsset(asset)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  //console.log('📊 Upload Summary')
  //console.log('================')
  //console.log(`✅ Successful: ${successCount}`)
  //console.log(`❌ Failed: ${failCount}`)
  //console.log(`📁 Total: ${assets.length}`)

  if (successCount > 0) {
    //console.log('')
    //console.log('🎉 Assets uploaded successfully!')
    //console.log('💡 Next steps:')
    //console.log('   1. Set VITE_CLOUDINARY_CLOUD_NAME in your Vercel environment variables')
    //console.log('   2. Deploy your app')
    //console.log('   3. Verify images load from Cloudinary')
  }

  if (failCount > 0) {
    //console.log('')
    //console.log('⚠️  Some uploads failed. Check the errors above.')
    process.exit(1)
  }
}

// Run the script
main().catch(error => {
  // console.error('💥 Script failed:', error.message)
  process.exit(1)
})