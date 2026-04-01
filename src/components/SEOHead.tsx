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
    canonicalUrl: canonicalUrl || 'https://dsecuretech.com',
    keywords: '', // Default fallbacks handled or empty
  };

  // Step-by-step canonical normalization
  let normalizedPath = effectiveSeo.canonicalUrl;
  if (!normalizedPath.startsWith('http')) {
    const prefix = normalizedPath.startsWith('/') ? '' : '/';
    normalizedPath = `https://dsecuretech.com${prefix}${normalizedPath}`;
  }
  const finalCanonical = normalizedPath.toLowerCase().replace(/\/$/, ""); // Canonical should be lowercase and without trailing slash for consistency

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
        <meta property="og:image" content={effectiveSeo.ogImage} />
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
          isliye ye hidden div prerender.js ko page-specific SEO data deta hai */}
      <div
        data-seo-bridge=""
        data-seo-title={effectiveSeo.title}
        data-seo-description={effectiveSeo.description}
        data-seo-canonical={finalCanonical}
        data-seo-og-title={effectiveSeo.ogTitle || effectiveSeo.title}
        data-seo-og-description={effectiveSeo.ogDescription || effectiveSeo.description}
        data-seo-og-image={effectiveSeo.ogImage || ''}
        data-seo-og-type={effectiveSeo.ogType || 'website'}
        data-seo-keywords={effectiveSeo.keywords || ''}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      {/* JSON-LD Structured Data — body mein render karo kyunki Helmet context SSR mein kaam nahi karta
          Google body se bhi JSON-LD padh leta hai, aur prerender.js ise head mein move kar dega */}
      {effectiveSeo.structuredData && (
        Array.isArray(effectiveSeo.structuredData)
          ? effectiveSeo.structuredData.map((schema, index) => (
              <script key={`body-schema-${index}`} type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
              />
            ))
          : (
            <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(effectiveSeo.structuredData) }}
            />
          )
      )}
      {effectiveSeo.breadcrumbs && effectiveSeo.breadcrumbs.length > 0 && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(effectiveSeo.breadcrumbs)) }}
        />
      )}
    </>
  );
};

export default SEOHead;
