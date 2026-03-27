import {
  getCanonicalUrl,
  getDefaultSEO,
  SEOMetadata,
  SEO_CONFIG,
  generateKeywords,
} from "./seo.core";
import { FAQ } from "../data/blogFaqs";

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
    title: "D-Secure - #1 Data Erasure Software | NIST 800-88 Certified | Secure Tech",
    description:
      "Looking for the best data erasure software? D-Secure is #1 for NIST 800-88 certified, GDPR & HIPAA compliant wiping. Securely erase HDD, SSD, and mobile devices with audit-ready reports.",
    canonicalUrl: getCanonicalUrl("/"),
  },
  nist80088: {
    title: "NIST 800-88 Compliant Data Erasure Tool | Certified Software India | D-Secure",
    description: "Secure your enterprise with the leading NIST 800-88 data erasure tool. D-Secure provides certified software for permanently wiping data from HDDs, SSDs, and mobiles in India.",
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
    title: "ITAD Data Wiping Solution | Secure IT Asset Disposal Software | D-Secure",
    description: "The best ITAD data wiping solution for secure IT asset disposal. Certified software with NIST 800-88 compliant reporting and automation for processing loose drives.",
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
  },
  alternative: {
    title: "Blancco Alternative Data Erasure | Certified Data Eraser Software | D-Secure",
    description: "Looking for a Blancco alternative for data erasure? D-Secure is the #1 certified data eraser software for permanently wiping data at a better price point.",
    canonicalUrl: getCanonicalUrl("/solutions/blancco-alternative"),
  },
};

// Default SEO ke saath page-specific SEO merge karo
export const getSEOForPage = (
  pageName: keyof typeof PAGE_SEO,
  overrides?: Partial<SEOMetadata>
): SEOMetadata => {
  const defaultSEO = getDefaultSEO();
  const pageSEO = PAGE_SEO[pageName] || {};

  const merged = {
    ...defaultSEO,
    ...pageSEO,
    ...overrides,
  };

  return {
    ...merged,
    ogTitle: overrides?.ogTitle || pageSEO.ogTitle || merged.title || defaultSEO.ogTitle,
    ogDescription:
      overrides?.ogDescription || pageSEO.ogDescription || merged.description || defaultSEO.ogDescription,
    twitterTitle:
      overrides?.twitterTitle || pageSEO.twitterTitle || merged.title || defaultSEO.twitterTitle,
    twitterDescription:
      overrides?.twitterDescription ||
      pageSEO.twitterDescription ||
      merged.description ||
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
  faqs?: FAQ[];
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

  // FAQPage structured data agar FAQs exist karte hain
  const faqStructuredData = blogData.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blogData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const combinedStructuredData = faqStructuredData 
    ? [articleStructuredData, faqStructuredData] 
    : articleStructuredData;

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
    structuredData: combinedStructuredData,
  };
};
