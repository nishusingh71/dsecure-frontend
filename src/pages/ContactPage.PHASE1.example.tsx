/**
 * PHASE 1: Contact Page with Image Optimization
 * 
 * This is an example showing how to use the image optimization components
 * in your Contact page.
 * 
 * Key Features:
 * - WebP images with JPG/PNG fallback
 * - Lazy loading for offscreen images
 * - Blur placeholders for smooth loading
 * - Explicit dimensions to prevent CLS
 * - Preloading critical above-fold images
 */

import React, { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import WebPImage from '@/components/WebPImage';
import { preloadImage } from '@/utils/imageOptimization';
import {
  BuildingIcon,
  ChatIcon,
  ClipboardIcon,
  DollarIcon,
  GearIcon,
  MobileIcon,
} from '@/components/FlatIcons';

export default function ContactPageOptimized() {
  // Preload critical above-the-fold images
  useEffect(() => {
    // Only preload if hero image exists
    // preloadImage('/images/webp/contact-hero.webp');
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage('contact')} />
      <ContactPageContent />
    </>
  );
}

function ContactPageContent() {
  // Sample office data with image paths
  const offices = [
    {
      id: 1,
      imagePath: '/images/webp/office-ny.webp',
      imageFallback: '/images/office-ny.jpg',
      location: {
        city: 'New York',
        country: 'United States',
        flag: '🇺🇸',
        address: '123 Tech Boulevard\nNew York, NY 10001',
      },
      contacts: {
        primary: {
          name: 'John Smith',
          title: 'Head of Sales',
          phone: '+1-555-123-4567',
          email: 'john@dsecuretech.com',
        },
      },
    },
    {
      id: 2,
      imagePath: '/images/webp/office-london.webp',
      imageFallback: '/images/office-london.jpg',
      location: {
        city: 'London',
        country: 'United Kingdom',
        flag: '🇬🇧',
        address: '456 Finance Street\nLondon EC2M 7PP',
      },
      contacts: {
        primary: {
          name: 'Emma Watson',
          title: 'Regional Director',
          phone: '+44-20-7123-4567',
          email: 'emma@dsecuretech.com',
        },
      },
    },
  ];

  return (
    <>
      {/* Hero Section with Background Image (Optional) */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-4">
        {/* 
          OPTIONAL: Add background image if you have one
          This image is ABOVE THE FOLD, so we set priority={true} 
        */}
        {/* 
        <div className="absolute inset-0 z-0">
          <WebPImage
            src="/images/webp/contact-hero.webp"
            fallback="/images/contact-hero.jpg"
            alt="Contact background"
            width={1920}
            height={600}
            priority={true}
            objectFit="cover"
            className="opacity-10 w-full h-full"
          />
        </div>
        */}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Contact our team for expert guidance on data security solutions.
          </p>
        </div>
      </section>

      {/* Contact Form Section - No images needed */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h2>
          {/* Your existing contact form here */}
        </div>
      </section>

      {/* Office Cards with Optimized Images */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Our Global Offices
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Visit us at any of our worldwide locations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* 
                  Office Photo with WebP Optimization
                  These images are BELOW THE FOLD, so priority={false} for lazy loading
                */}
                {office.imagePath && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <WebPImage
                      src={office.imagePath}
                      fallback={office.imageFallback}
                      alt={`${office.location.city} office`}
                      width={400}
                      height={300}
                      priority={false} // Lazy load - image is below fold
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-t-xl"
                    />
                  </div>
                )}

                {/* Office Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-3xl"
                      role="img"
                      aria-label={`${office.location.country} flag`}
                    >
                      {office.location.flag}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {office.location.city}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {office.location.country}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 text-sm text-slate-600 mb-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-slate-400 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <address className="not-italic">
                        {office.location.address}
                      </address>
                    </div>

                    {office.contacts.primary.phone && (
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href={`tel:${office.contacts.primary.phone}`}
                          className="hover:text-emerald-600 transition-colors"
                        >
                          {office.contacts.primary.phone}
                        </a>
                      </div>
                    )}

                    {office.contacts.primary.email && (
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href={`mailto:${office.contacts.primary.email}`}
                          className="hover:text-emerald-600 transition-colors"
                        >
                          {office.contacts.primary.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  {office.contacts.primary.email && (
                    <a
                      href={`mailto:${office.contacts.primary.email}`}
                      className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Office
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options - Uses SVG icons (already optimized) */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Other Ways to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Support cards with SVG icons - no image optimization needed */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <ChatIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Live Chat
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get instant help from our support team
                  </p>
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Start Chat →
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <ClipboardIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Knowledge Base
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Browse our comprehensive documentation
                  </p>
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Browse Articles →
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <GearIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Technical Support
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Submit a technical support ticket
                  </p>
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Create Ticket →
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <DollarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Sales Inquiry
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get pricing and product information
                  </p>
                  <span className="text-sm text-blue-600 font-medium hover:underline">
                    Contact Sales →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
