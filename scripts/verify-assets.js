#!/usr/bin/env node

/**
 * Cloudinary Asset Verification Script
 * Tests if your assets are actually uploaded and accessible
 */

import { config } from 'dotenv'
import https from 'https'

// Load environment variables
config({ path: '.env.local' })

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME

// //console.log('🔍 Cloudinary Asset Verification')
// //console.log('==============================')
// //console.log('')

// Test URLs
const testAssets = [
  {
    name: 'Main Logo',
    publicId: 'dsecure/logos/logo',
    url: `https://res.cloudinary.com/${cloudName}/image/upload/dsecure/logos/logo`
  },
  {
    name: 'White Logo', 
    publicId: 'dsecure/logos/logo-white',
    url: `https://res.cloudinary.com/${cloudName}/image/upload/dsecure/logos/logo-white`
  }
]

async function testUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      resolve({
        status: response.statusCode,
        contentType: response.headers['content-type'],
        exists: response.statusCode === 200
      })
    })
    
    request.on('error', () => {
      resolve({ status: 'ERROR', exists: false })
    })
    
    request.setTimeout(5000, () => {
      request.destroy()
      resolve({ status: 'TIMEOUT', exists: false })
    })
  })
}

async function verifyAssets() {
  // //console.log(`Testing assets for cloud: ${cloudName}`)
  // //console.log('')
  
  for (const asset of testAssets) {
    // //console.log(`📸 Testing: ${asset.name}`)
    // //console.log(`   URL: ${asset.url}`)
    
    const result = await testUrl(asset.url)
    
    if (result.exists) {
      // //console.log(`   ✅ EXISTS (${result.status}) - ${result.contentType}`)
    } else {
      // //console.log(`   ❌ NOT FOUND (${result.status})`)
    }
    // //console.log('')
  }
}

verifyAssets().catch(console.error)