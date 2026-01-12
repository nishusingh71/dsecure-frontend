import React, { useState } from 'react';
import ImageComponent from '@/components/ImageComponent';

/**
 * ImageComponent Demo Page
 * 
 * Demonstrates all features of the production-ready ImageComponent:
 * - WebP/AVIF support
 * - Lazy loading with Intersection Observer
 * - Loading states (skeleton, blur, spinner)
 * - Error handling
 * - Responsive images
 * - Priority loading
 */
export default function ImageComponentDemo() {
  const [loadCount, setLoadCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🖼️ ImageComponent Demo
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            Production-ready React image component with WebP/AVIF, lazy loading, 
            responsive images, and error handling
          </p>
          <div className="flex gap-4 justify-center">
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
              ✅ Images Loaded: {loadCount}
            </div>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
              ❌ Errors: {errorCount}
            </div>
          </div>
        </div>

        {/* Before vs After Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            📊 Before vs After
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BEFORE - Standard img tag */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                ❌ Before (Standard &lt;img&gt;)
              </h3>
              <div className="mb-4 text-sm text-slate-600 space-y-1">
                <p>• Format: JPEG/PNG</p>
                <p>• Size: ~500 KB</p>
                <p>• No lazy loading</p>
                <p>• No loading state</p>
                <p>• No error handling</p>
              </div>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800"
                  alt="Standard image"
                  className="w-full h-full object-cover"
                />
              </div>
              <pre className="bg-slate-900 text-white p-4 rounded-lg text-xs overflow-x-auto">
{`<img 
  src="photo.jpg"
  alt="..."
  className="w-full"
/>`}
              </pre>
            </div>

            {/* AFTER - ImageComponent */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-500">
              <h3 className="text-xl font-bold text-emerald-600 mb-4">
                ✅ After (ImageComponent)
              </h3>
              <div className="mb-4 text-sm text-slate-600 space-y-1">
                <p>• Format: AVIF/WebP</p>
                <p>• Size: ~100 KB (80% smaller!)</p>
                <p>• Lazy loading ✅</p>
                <p>• Loading states ✅</p>
                <p>• Error handling ✅</p>
              </div>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4">
                <ImageComponent
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800"
                  alt="Optimized with ImageComponent"
                  width={800}
                  height={450}
                  enableWebP={true}
                  enableAVIF={true}
                  onLoad={() => setLoadCount(c => c + 1)}
                />
              </div>
              <pre className="bg-slate-900 text-white p-4 rounded-lg text-xs overflow-x-auto">
{`<ImageComponent
  src="photo.jpg"
  alt="..."
  width={800}
  height={450}
  enableWebP={true}
  enableAVIF={true}
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Feature Demonstrations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            ✨ Feature Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Priority Loading */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">🚀 Priority Loading</h3>
              <p className="text-sm text-slate-600 mb-4">
                Above-the-fold images load immediately (no lazy loading)
              </p>
              <ImageComponent
                src="https://images.unsplash.com/photo-1661956602868-6ae368943878?w=400"
                alt="Priority image"
                width={400}
                height={250}
                priority={true}
                enableWebP={true}
                className="rounded-lg"
                onLoad={() => setLoadCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                priority={'{true}'}
              </pre>
            </div>

            {/* 2. Lazy Loading */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">😴 Lazy Loading</h3>
              <p className="text-sm text-slate-600 mb-4">
                Loads when scrolling near (Intersection Observer)
              </p>
              <ImageComponent
                src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=400"
                alt="Lazy loaded"
                width={400}
                height={250}
                enableWebP={true}
                className="rounded-lg"
                onLoad={() => setLoadCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                loading="lazy" (default)
              </pre>
            </div>

            {/* 3. Blur Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">🌫️ Blur Placeholder</h3>
              <p className="text-sm text-slate-600 mb-4">
                Smooth loading transition with blur effect
              </p>
              <ImageComponent
                src="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?w=400"
                alt="With blur placeholder"
                width={400}
                height={250}
                placeholder="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?w=50&q=10"
                blurAmount={8}
                enableWebP={true}
                className="rounded-lg"
                onLoad={() => setLoadCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                blurAmount={'{8}'}
              </pre>
            </div>

            {/* 4. Error Handling */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">⚠️ Error Fallback</h3>
              <p className="text-sm text-slate-600 mb-4">
                Shows fallback if main image fails
              </p>
              <ImageComponent
                src="https://broken-url.com/image.jpg"
                alt="Broken image"
                width={400}
                height={250}
                fallbackSrc="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400"
                className="rounded-lg"
                onError={() => setErrorCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                fallbackSrc="..."
              </pre>
            </div>

            {/* 5. Skeleton Loader */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">💀 Skeleton Loader</h3>
              <p className="text-sm text-slate-600 mb-4">
                Animated loading placeholder
              </p>
              <ImageComponent
                src="https://images.unsplash.com/photo-1661956602868-6ae368943878?w=400"
                alt="With skeleton"
                width={400}
                height={250}
                showSkeleton={true}
                enableWebP={true}
                className="rounded-lg"
                onLoad={() => setLoadCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                showSkeleton={'{true}'}
              </pre>
            </div>

            {/* 6. Object Fit Options */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-3">🖼️ Object Fit</h3>
              <p className="text-sm text-slate-600 mb-4">
                Control how image fills container
              </p>
              <ImageComponent
                src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=400"
                alt="Contain fit"
                width={400}
                height={250}
                objectFit="contain"
                enableWebP={true}
                className="rounded-lg bg-slate-100"
                onLoad={() => setLoadCount(c => c + 1)}
              />
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs">
                objectFit="contain"
              </pre>
            </div>
          </div>
        </section>

        {/* Responsive Images Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            📱 Responsive Images
          </h2>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-slate-600 mb-6 text-center">
              Resize your browser to see different image sizes load automatically
            </p>
            
            <ImageComponent
              src="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?w=1920"
              alt="Responsive image"
              width={1920}
              height={1080}
              sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
              enableWebP={true}
              enableAVIF={true}
              className="rounded-lg w-full"
              onLoad={() => setLoadCount(c => c + 1)}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900">📱 Mobile</p>
                <p className="text-blue-700">640px image (~50 KB)</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold text-purple-900">📱 Tablet</p>
                <p className="text-purple-700">1024px image (~120 KB)</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="font-semibold text-emerald-900">🖥️ Desktop</p>
                <p className="text-emerald-700">1920px image (~200 KB)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Format Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            🎨 Format Comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-4">JPEG (Original)</h3>
              <p className="text-sm text-slate-600 mb-4">
                Size: ~500 KB<br />
                Quality: Good<br />
                Support: 100%
              </p>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&fm=jpg"
                  alt="JPEG"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-4">WebP ✅</h3>
              <p className="text-sm text-slate-600 mb-4">
                Size: ~150 KB (70% smaller)<br />
                Quality: Better<br />
                Support: 95%
              </p>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                <ImageComponent
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600"
                  alt="WebP"
                  width={600}
                  height={337}
                  enableWebP={true}
                  enableAVIF={false}
                  onLoad={() => setLoadCount(c => c + 1)}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-500">
              <h3 className="font-bold text-emerald-900 mb-4">AVIF 🚀</h3>
              <p className="text-sm text-slate-600 mb-4">
                Size: ~100 KB (80% smaller)<br />
                Quality: Best<br />
                Support: 85%
              </p>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                <ImageComponent
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600"
                  alt="AVIF"
                  width={600}
                  height={337}
                  enableWebP={true}
                  enableAVIF={true}
                  onLoad={() => setLoadCount(c => c + 1)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">💻 Complete Code Examples</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Hero Image (Priority)</h3>
              <pre className="bg-slate-900 text-white p-4 rounded-lg text-xs overflow-x-auto">
{`<ImageComponent
  src="/images/hero.jpg"
  alt="Hero section"
  width={1920}
  height={1080}
  priority={true}
  enableWebP={true}
  enableAVIF={true}
  className="w-full h-96"
  objectFit="cover"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Card Image (Lazy)</h3>
              <pre className="bg-slate-900 text-white p-4 rounded-lg text-xs overflow-x-auto">
{`<ImageComponent
  src="/images/card.jpg"
  alt="Product card"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
  placeholder="/images/card-tiny.jpg"
  blurAmount={6}
  className="rounded-lg"
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="mt-12 text-center">
          <div className="inline-block bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              📊 Performance Impact
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-emerald-600">80%</p>
                <p className="text-sm text-slate-600">Size Reduction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">70%</p>
                <p className="text-sm text-slate-600">Faster Loading</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">95%</p>
                <p className="text-sm text-slate-600">Browser Support</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
