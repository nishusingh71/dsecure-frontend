import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata, formatStructuredData, generateBreadcrumbSchema } from '@/utils/seo';

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
    canonicalUrl: canonicalUrl || '', // No default to homepage! Force provide or handled below
    keywords: '', 
  };

  // Strict canonical URL normalization — duplicate page errors rokne ke liye
  const normalizeCanonical = (rawUrl: string): string => {
    let url = rawUrl.trim();

    // Agar relative path hai to absolute banao
    if (url && !url.startsWith('http')) {
      const prefix = url.startsWith('/') ? '' : '/';
      url = `https://dsecuretech.com${prefix}${url}`;
    }

    // Agar koi URL nahi mila to homepage default do
    if (!url) return 'https://dsecuretech.com/';

    // Lowercase karo (domain + path dono)
    url = url.toLowerCase();

    // www hata do — hamesha non-www canonical use karo
    url = url.replace('://www.dsecuretech.com', '://dsecuretech.com');

    // Double slashes hatao (protocol ke baad waali chhod ke)
    url = url.replace(/(https?:\/\/)|(\/{2,})/g, (match, protocol) => protocol || '/');

    // Query params aur hash hatao — canonical mein nahi chahiye
    const queryIndex = url.indexOf('?');
    if (queryIndex !== -1) url = url.substring(0, queryIndex);
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) url = url.substring(0, hashIndex);

    // Homepage ke liye trailing slash force karo, baaki sabse hatao
    const stripped = url.replace(/\/$/, '');
    if (stripped === 'https://dsecuretech.com') {
      return stripped + '/';
    }
    return stripped;
  };

  const finalCanonical = normalizeCanonical(effectiveSeo.canonicalUrl || '');

  // Helper to ensure URLs are absolute for social media crawlers
  const ensureAbsoluteUrl = (url?: string): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const prefix = url.startsWith('/') ? '' : '/';
    return `https://dsecuretech.com${prefix}${url}`;
  };

  const finalOgImage = ensureAbsoluteUrl(effectiveSeo.ogImage || 'https://dsecuretech.com/logo-white.svg');
  const finalTwitterImage = ensureAbsoluteUrl(effectiveSeo.twitterImage || effectiveSeo.ogImage || 'https://dsecuretech.com/logo-white.svg');

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{effectiveSeo.title}</title>
        <meta name="description" content={effectiveSeo.description} />
        <meta name="keywords" content={effectiveSeo.keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonical} />

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
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:url" content={finalCanonical} />
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
          content={finalTwitterImage}
        />
        <meta name="twitter:creator" content="@D-Securetech" />
        <meta name="twitter:site" content="@D-Securetech" />

        {/* Additional SEO Meta Tags */}
        <meta
          name="robots"
          content={effectiveSeo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
        />
        <meta name="author" content="D-Secure Tech" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />

        {/* Structured Data */}
        {effectiveSeo.structuredData && (
          Array.isArray(effectiveSeo.structuredData) 
            ? effectiveSeo.structuredData.map((schema, index) => (
                <script key={`schema-${index}`} type="application/ld+json">
                  {formatStructuredData(schema)}
                </script>
              ))
            : (
              <script type="application/ld+json">
                {formatStructuredData(effectiveSeo.structuredData)}
              </script>
            )
        )}

        {/* Breadcrumb Structured Data */}
        {effectiveSeo.breadcrumbs && effectiveSeo.breadcrumbs.length > 0 && (
          <script type="application/ld+json">
            {formatStructuredData(generateBreadcrumbSchema(effectiveSeo.breadcrumbs))}
          </script>
        )}

        {/* Additional Head Elements for Performance & SEO */}
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Helmet>
      {/* SSR SEO Data Bridge — React 19 streaming mein Helmet context populate nahi hota,
          isliye ye hidden div prerender.js ko page-specific SEO data deta hai.
          JSON-LD bhi data attribute mein serialize karo taaki prerender.js inhe <head> mein inject kare
          aur body mein duplicate <script> tags na rahe */}
      <div
        data-seo-bridge=""
        data-seo-title={effectiveSeo.title}
        data-seo-description={effectiveSeo.description}
        data-seo-canonical={finalCanonical}
        data-seo-og-title={effectiveSeo.ogTitle || effectiveSeo.title}
        data-seo-og-description={effectiveSeo.ogDescription || effectiveSeo.description}
        data-seo-og-image={finalOgImage}
        data-seo-og-type={effectiveSeo.ogType || 'website'}
        data-seo-twitter-image={finalTwitterImage}
        data-seo-keywords={effectiveSeo.keywords || ''}
        data-seo-schemas={effectiveSeo.structuredData ? JSON.stringify(
          Array.isArray(effectiveSeo.structuredData)
            ? effectiveSeo.structuredData
            : [effectiveSeo.structuredData]
        ) : ''}
        data-seo-breadcrumbs={effectiveSeo.breadcrumbs && effectiveSeo.breadcrumbs.length > 0
          ? JSON.stringify(generateBreadcrumbSchema(effectiveSeo.breadcrumbs))
          : ''}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </>
  );
};

export default SEOHead;
