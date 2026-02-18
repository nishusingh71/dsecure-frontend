import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata, formatStructuredData } from '@/utils/seo';

interface SEOHeadProps {
  seo?: SEOMetadata;
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

/**
 * SEOHead Component - Standardized SEO meta tags for all pages
 * Uses react-helmet-async for efficient meta tag management
 */
export const SEOHead: React.FC<SEOHeadProps> = ({ seo, title, description, canonicalUrl }) => {
  const effectiveSeo: SEOMetadata = seo || {
    title: title || '',
    description: description || '',
    canonicalUrl: canonicalUrl || '',
    keywords: '', // Default fallbacks handled or empty
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{effectiveSeo.title}</title>
      <meta name="description" content={effectiveSeo.description} />
      <meta name="keywords" content={effectiveSeo.keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={effectiveSeo.canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={effectiveSeo.ogType || "website"} />
      <meta
        property="og:title"
        content={effectiveSeo.ogTitle || effectiveSeo.title}
      />
      <meta
        property="og:description"
        content={effectiveSeo.ogDescription || effectiveSeo.description}
      />
      <meta property="og:image" content={effectiveSeo.ogImage} />
      <meta property="og:url" content={effectiveSeo.canonicalUrl} />
      <meta property="og:site_name" content="D-Secure Tech" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content={effectiveSeo.twitterCard || "summary_large_image"}
      />
      <meta
        name="twitter:title"
        content={effectiveSeo.twitterTitle || effectiveSeo.title}
      />
      <meta
        name="twitter:description"
        content={effectiveSeo.twitterDescription || effectiveSeo.description}
      />
      <meta
        name="twitter:image"
        content={effectiveSeo.twitterImage || effectiveSeo.ogImage}
      />
      <meta name="twitter:creator" content="@D-Securetech" />
      <meta name="twitter:site" content="@D-Securetech" />

      {/* Additional SEO Meta Tags */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="author" content="D-Secure Tech" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />

      {/* Structured Data */}
      {effectiveSeo.structuredData && (
        <script type="application/ld+json">
          {formatStructuredData(effectiveSeo.structuredData)}
        </script>
      )}

      {/* Additional Head Elements for Performance & SEO */}
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.clarity.ms" />
    </Helmet>
  );
};

export default SEOHead;
