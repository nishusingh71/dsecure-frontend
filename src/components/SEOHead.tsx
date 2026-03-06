import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";
import { SEOMetadata, formatStructuredData } from "@/utils/seo";
import { SUPPORTED_LANGUAGES } from "../i18n/languages";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://dsecuretech.com";

interface SEOHeadProps {
  seo?: SEOMetadata;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  /** Optional: translation key prefix for SEO namespace (e.g. 'home') */
  pageKey?: string;
  /** Optional: current path for hreflang generation (e.g. '/about') */
  currentPath?: string;
}

/**
 * SEOHead Component - Standardized SEO meta tags for all pages
 * Uses react-helmet-async for efficient meta tag management
 * Supports i18n hreflang tags for 46 languages
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  seo,
  title,
  description,
  canonicalUrl,
  pageKey,
  currentPath,
}) => {
  const { i18n, t } = useTranslation("seo");
  const currentLang = i18n.language || "en";

  // Use pageKey-based translations if available, otherwise fall back to props
  const resolvedTitle = pageKey
    ? t(`${pageKey}.title`, { defaultValue: title || "" })
    : title || "";
  const resolvedDescription = pageKey
    ? t(`${pageKey}.description`, { defaultValue: description || "" })
    : description || "";

  const effectiveSeo: SEOMetadata = seo || {
    title: resolvedTitle,
    description: resolvedDescription,
    canonicalUrl: canonicalUrl || "",
    keywords: "",
  };

  // Build hreflang links for all supported languages
  const hreflangLinks = currentPath
    ? SUPPORTED_LANGUAGES.map((lang) => ({
        lang: lang.code,
        href: `${BASE_URL}/${lang.code}${currentPath}`,
      }))
    : [];

  // Map i18n language code to og:locale format
  const ogLocale = currentLang.replace("-", "_");

  return (
    <Helmet>
      {/* HTML lang attribute */}
      <html
        lang={currentLang}
        dir={
          SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.dir || "ltr"
        }
      />

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
      <meta property="og:locale" content={ogLocale} />

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
      <meta name="language" content={currentLang} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />

      {/* Hreflang tags for i18n SEO */}
      {hreflangLinks.map((link) => (
        <link
          key={link.lang}
          rel="alternate"
          hrefLang={link.lang}
          href={link.href}
        />
      ))}
      {currentPath && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${BASE_URL}/en${currentPath}`}
        />
      )}

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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.clarity.ms" />
    </Helmet>
  );
};

export default SEOHead;
