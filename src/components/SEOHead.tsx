import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata, formatStructuredData } from '@/utils/seo';

interface SEOHeadProps {
  seo: SEOMetadata;
}

/**
 * SEOHead Component - Standardized SEO meta tags for all pages
 * Uses react-helmet-async for efficient meta tag management
 */
export const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.ogType || 'website'} />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:site_name" content="DSecure Tech" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={seo.twitterTitle || seo.title} />
      <meta name="twitter:description" content={seo.twitterDescription || seo.description} />
      <meta name="twitter:image" content={seo.twitterImage || seo.ogImage} />
      <meta name="twitter:creator" content="@dsecuretech" />
      <meta name="twitter:site" content="@dsecuretech" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="DSecure Tech" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      
      {/* Structured Data */}
      {seo.structuredData && (
        <script type="application/ld+json">
          {formatStructuredData(seo.structuredData)}
        </script>
      )}
      
      {/* Additional Head Elements for Performance & SEO */}
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.clarity.ms" />
    </Helmet>
  );
};

export default SEOHead;
