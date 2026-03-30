/**
 * SEO Core Utilities - Shared interfaces and base configuration
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  fragment?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: { name: string; item: string }[];
}

export const SEO_CONFIG = {
  siteName: "D-Secure Tech",
  baseUrl: "https://dsecuretech.com",
  defaultImage: "https://dsecuretech.com/logo-white.svg",
  author: "D-Secure Tech",
  language: "en",
  locale: "en_US",
  twitterHandle: "@D-Securetech",
};

import { ALL_SEO_KEYWORDS } from "./seo.keywords";

// Deduplicated keyword array - sabhi categories se unique keywords
export const BASE_KEYWORDS = [...new Set(ALL_SEO_KEYWORDS)];


export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
};

export const generateKeywords = (pageSpecificKeywords: string[] = []): string => {
  return [...BASE_KEYWORDS, ...pageSpecificKeywords].join(", ");
};

export const formatStructuredData = (data: any): string => {
  return JSON.stringify(data);
};

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "D-Secure Tech",
  url: SEO_CONFIG.baseUrl,
  logo: `${SEO_CONFIG.baseUrl}/logo-white.svg`,
  description: "Leading provider of enterprise data erasure and sanitization solutions.",
});

export const generateSoftwareProductSchema = (
  productName: string,
  description: string,
  options: {
    category?: string;
    os?: string;
    price?: string;
    currency?: string;
    image?: string;
    ratingValue?: number;
    reviewCount?: number;
  } = {}
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    description: description,
    applicationCategory: options.category || "SecurityApplication",
    operatingSystem: options.os || "Windows, macOS, Linux, Android, iOS",
    offers: {
      "@type": "Offer",
      price: options.price || "0",
      priceCurrency: options.currency || "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: "D-Secure Tech",
    },
  };

  if (options.image) {
    schema.image = options.image;
  }

  if (options.ratingValue && options.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: options.ratingValue.toString(),
      reviewCount: options.reviewCount.toString(),
    };
  }

  return schema;
};

export const generateBreadcrumbSchema = (
  breadcrumbs: { name: string; item: string }[]
) => {
  const itemListElement = breadcrumbs.map((crumb, index) => {
    let itemUrl = crumb.item;
    if (!itemUrl.startsWith("http")) {
      const slash = itemUrl.startsWith("/") ? "" : "/";
      itemUrl = `${SEO_CONFIG.baseUrl}${slash}${itemUrl}`;
    }
      
    return {
      "@type": "ListItem" as const,
      position: index + 1,
      name: crumb.name,
      item: itemUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
};

export const getDefaultSEO = (): SEOMetadata => ({
  title:
    "D-Secure - Best Data Erasure Software | Secure Tech for Enterprise Data Wiping",
  description:
    "D-Secure is the best data erasure software trusted globally. Secure data wiping for HDD, SSD, mobile devices. NIST 800-88, GDPR, HIPAA compliance with Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary). Free trial available. Secure tech for enterprise.",
  keywords: generateKeywords(),
  canonicalUrl: SEO_CONFIG.baseUrl,
  ogTitle: "D-Secure Tech - Secure Data Erasure Solutions",
  ogDescription:
    "Professional data erasure and sanitization software for enterprise compliance and security.",
  ogImage: SEO_CONFIG.defaultImage,
  ogType: "website",
  fragment: "!",
  twitterCard: "summary_large_image",
  twitterTitle: "D-Secure Tech - Data Erasure Solutions",
  twitterDescription:
    "Secure data destruction and sanitization for enterprise compliance.",
  twitterImage: SEO_CONFIG.defaultImage,
  structuredData: generateOrganizationSchema(),
});
