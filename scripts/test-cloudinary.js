#!/usr/bin/env node

/**
 * Cloudinary Connection Test
 * 
 * This script tests your Cloudinary configuration without requiring API secrets.
 * It generates example URLs to verify your setup is working.
 */

import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

// //console.log('🔍 Cloudinary Configuration Test')
// //console.log('===============================')
// //console.log('')

// Check environment variables
const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.VITE_CLOUDINARY_API_KEY

if (!cloudName) {
  // console.error('❌ Missing VITE_CLOUDINARY_CLOUD_NAME in .env.local')
  // console.error('   Get this from your Cloudinary dashboard')
  process.exit(1)
}

// //console.log(`✅ Cloud Name: ${cloudName}`)
// //console.log(`✅ API Key: ${apiKey ? 'Set' : 'Not set (optional for frontend)'}`)
// //console.log('')

// Test URL generation
// //console.log('🌐 Test Image URLs:')
// //console.log('==================')

const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`

// Test URLs for your assets
const testUrls = [
  {
    name: 'Main Logo',
    publicId: 'dsecure/logos/logo',
    url: `${baseUrl}/dsecure/logos/logo`
  },
  {
    name: 'White Logo',
    publicId: 'dsecure/logos/logo-white', 
    url: `${baseUrl}/dsecure/logos/logo-white`
  },
  {
    name: 'Optimized Logo (auto quality/format)',
    publicId: 'dsecure/logos/logo',
    url: `${baseUrl}/q_auto,f_auto/dsecure/logos/logo`
  },
  {
    name: 'Resized Logo (120x40)',
    publicId: 'dsecure/logos/logo',
    url: `${baseUrl}/w_120,h_40,c_scale/dsecure/logos/logo`
  }
]

testUrls.forEach(({ name, publicId, url }) => {
  // //console.log(`📸 ${name}:`)
  // //console.log(`   Public ID: ${publicId}`)
  // //console.log(`   URL: ${url}`)
  // //console.log('')
})

// //console.log('💡 Next Steps:')
// //console.log('=============')
// //console.log('1. Upload your assets to Cloudinary with the public IDs shown above')
// //console.log('2. Test the URLs in your browser to verify they load')
// //console.log('3. Your app will automatically use Cloudinary when VITE_CLOUDINARY_CLOUD_NAME is set')
// //console.log('')
// //console.log('🚀 Ready to go! Your Cloudinary configuration looks good.')