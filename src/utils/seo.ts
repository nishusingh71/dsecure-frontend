import {
  getCanonicalUrl,
  getDefaultSEO,
  SEOMetadata,
  SEO_CONFIG,
  generateKeywords,
} from "./seo.core";

export {
  SEO_CONFIG,
  BASE_KEYWORDS,
  getCanonicalUrl,
  generateKeywords,
  generateOrganizationSchema,
  generateSoftwareProductSchema,
  getDefaultSEO,
  formatStructuredData,
} from "./seo.core";

export type { SEOMetadata } from "./seo.core";

import { INDUSTRY_SEO } from "./seo.industries";
import { SUPPORT_SEO } from "./seo.support";
import { BLOG_SEO } from "./seo.blog";
import { PRODUCT_SEO } from "./seo.products";



// Saare SEO modules ko ek jagah combine karo
export const PAGE_SEO: Record<string, Partial<SEOMetadata>> = {
  ...INDUSTRY_SEO,
  ...SUPPORT_SEO,
  ...BLOG_SEO,
  ...PRODUCT_SEO,
  // Home page SEO - "D-Secure" branding use karo, "Eraser" nahi
  home: {
    title: "D-Secure - Best Data Erasure Software | NIST 800-88 Certified | Secure Tech",
    description:
      "D-Secure is India's leading data erasure software. NIST 800-88 certified, GDPR & HIPAA compliant. Securely erase HDD, SSD, mobile devices. Free trial available.",
    canonicalUrl: getCanonicalUrl("/"),
  },
  nist80088: {
    title: "NIST 800-88 Data Erasure Tool | Certified Data Eraser Software | D-Secure",
    description: "Looking for a NIST 800-88 data erasure tool? D-Secure is the certified data eraser software for permanently wiping data from HDDs, SSDs, and mobile devices.",
    canonicalUrl: getCanonicalUrl("/compliance/nist-800-88"),
  },
  gdpr: {
    title: "GDPR Compliant Data Erasure | Right to Erasure Software | D-Secure",
    description: "Achieve GDPR compliant data erasure with D-Secure. Our certified data wiping software ensures permanent data destruction with audit-proof reports.",
    canonicalUrl: getCanonicalUrl("/compliance/gdpr"),
  },
  mac: {
    title: "MAC Erasure Software | Certified Hard Drive Eraser for Apple | D-Secure",
    description: "D-Secure is the leading MAC erasure software. Certified hard drive eraser for Apple Silicon (M1-M4) & Intel Macs. Permanently wipe data with NIST compliance.",
    canonicalUrl: getCanonicalUrl("/solutions/mac-erasure"),
  },
  itad: {
    title: "ITAD Data Wiping Solution | Certified & Secure Data Wiping Software | D-Secure",
    description: "The best ITAD data wiping solution. Certified & secure data wiping software for IT asset disposal companies. NIST 800-88 compliant reporting.",
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
  },
  alternative: {
    title: "Blancco Alternative Data Erasure | Certified Data Eraser Software | D-Secure",
    description: "Looking for a Blancco alternative for data erasure? D-Secure is the #1 certified data eraser software for permanently wiping data at a better price point.",
    canonicalUrl: getCanonicalUrl("/solutions/blancco-alternative"),
  },
};

// Default SEO ke saath page-specific SEO merge karo
export const getSEOForPage = (pageName: keyof typeof PAGE_SEO): SEOMetadata => {
  const defaultSEO = getDefaultSEO();
  const pageSEO = PAGE_SEO[pageName] || {};

  return {
    ...defaultSEO,
    ...pageSEO,
    ogTitle: pageSEO.ogTitle || pageSEO.title || defaultSEO.ogTitle,
    ogDescription:
      pageSEO.ogDescription || pageSEO.description || defaultSEO.ogDescription,
    twitterTitle:
      pageSEO.twitterTitle || pageSEO.title || defaultSEO.twitterTitle,
    twitterDescription:
      pageSEO.twitterDescription ||
      pageSEO.description ||
      defaultSEO.twitterDescription,
  };
};

// Blog post ke liye date string ko ISO format mein convert karo
const formatBlogDate = (dateStr: string): string => {
  const months: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };

  const blogRegExp = /(\w+)\s+(\d+),\s+(\d+)/;
  const parts = blogRegExp.exec(dateStr);
  if (parts) {
    const month = months[parts[1]] || "01";
    const day = parts[2].padStart(2, "0");
    const year = parts[3];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split("T")[0];
};

// Blog posts ke liye SEO metadata generate karo (Article structured data ke saath)
export const getBlogSEO = (blogData: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishDate: string;
  keywords?: string;
  category?: string;
  tag?: string;
}): SEOMetadata => {
  const canonicalUrl = `${SEO_CONFIG.baseUrl}/blog/${blogData.slug}`;
  const ogImage = `${SEO_CONFIG.baseUrl}/blog/${blogData.slug}.webp`;

  // Article structured data Google rich snippets ke liye
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogData.title,
    description: blogData.excerpt,
    author: {
      "@type": "Person",
      name: blogData.author,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.baseUrl}/logo-white.svg`,
      },
    },
    datePublished: formatBlogDate(blogData.publishDate),
    image: ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: blogData.keywords,
    articleSection: blogData.category || "Blog",
  };

  return {
    title: `${blogData.title} | D-Secure Tech Blog`,
    description: blogData.excerpt,
    keywords: generateKeywords(
      (blogData.keywords || "").split(",").map((k: string) => k.trim()).filter(Boolean)
    ),
    canonicalUrl,
    ogTitle: blogData.title,
    ogDescription: blogData.excerpt,
    ogImage,
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: blogData.title,
    twitterDescription: blogData.excerpt,
    twitterImage: ogImage,
    structuredData: articleStructuredData,
  };
};
