import {
  getCanonicalUrl,
  getDefaultSEO,
  SEOMetadata,
  SEO_CONFIG,
  generateKeywords,
  generateOrganizationSchema,
} from "./seo.core";
import { FAQ } from "../data/blogFaqs";

export {
  SEO_CONFIG,
  BASE_KEYWORDS,
  getCanonicalUrl,
  generateKeywords,
  generateOrganizationSchema,
  generateSoftwareProductSchema,
  generateBreadcrumbSchema,
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
    title: "D-Secure - #1 Data Erasure Software | NIST 800-88 Compliance | Secure Tech",
    description:
      "Looking for the best data erasure software? D-Secure is #1 for NIST 800-88 Compliance, GDPR & HIPAA compliant wiping. Securely erase HDD, SSD, and mobile devices with tamper-proof audit reports with certificate.",
    canonicalUrl: getCanonicalUrl("/"),
    breadcrumbs: [{ name: "Home", item: "/" }],
  },
  // About page — company ke baare mein
  about: {
    title: "D-Secure - Best Data Erasure Software | Secure Tech for Enterprise Data Sanitization",
    description: "D-Secure is the best data erasure software trusted globally. Industry-leading secure data sanitization for enterprises, ITADs, and government organizations.",
    canonicalUrl: getCanonicalUrl("/about"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "About", item: "/about" },
    ],
  },
  // Contact page
  contact: {
    title: "Contact D-Secure | Get Data Erasure Quote & Support",
    description: "Contact D-Secure for enterprise data erasure solutions. Get pricing quotes, technical support, and deployment assistance for NIST 800-88 compliant data sanitization.",
    canonicalUrl: getCanonicalUrl("/contact"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Contact", item: "/contact" },
    ],
  },
  // Pricing page — PricingAndPlanPage.tsx mein 'pricing-and-plan' key use hota hai
  "pricing-and-plan": {
    title: "D-Secure Pricing & Plans | Enterprise Data Erasure Software",
    description: "View D-Secure pricing and plans for data erasure software. Flexible licensing for Drive Eraser, File Eraser, and Smartphone Eraser with volume discounts.",
    canonicalUrl: getCanonicalUrl("/pricing-and-plan"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Pricing", item: "/pricing-and-plan" },
    ],
  },
  // Legacy PricingPage.tsx bhi 'pricing' key use karta hai
  pricing: {
    title: "D-Secure Pricing & Plans | Enterprise Data Erasure Software",
    description: "View D-Secure pricing and plans for data erasure software. Flexible licensing for Drive Eraser, File Eraser, and Smartphone Eraser with volume discounts.",
    canonicalUrl: getCanonicalUrl("/pricing-and-plan"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Pricing", item: "/pricing-and-plan" },
    ],
  },
  nist80088: {
    title: "NIST 800-88 Compliant Data Erasure Tool | Compliance Software India | D-Secure",
    description: "Secure your enterprise with the leading NIST 800-88 data erasure tool. D-Secure provides tamper-proof audit reports with certificate for permanently wiping data from HDDs, SSDs, and mobiles in India.",
    canonicalUrl: getCanonicalUrl("/compliance/nist-800-88"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
      { name: "NIST 800-88", item: "/compliance/nist-800-88" },
    ],
  },
  gdpr: {
    title: "GDPR Compliant Data Erasure | Right to Erasure Software | D-Secure",
    description: "Achieve GDPR compliant data erasure with D-Secure. Our tamper-proof audit reports with certificate ensure permanent data destruction with audit-proof transparency.",
    canonicalUrl: getCanonicalUrl("/compliance/gdpr"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
      { name: "GDPR", item: "/compliance/gdpr" },
    ],
  },
  mac: {
    title: "MAC Erasure Software | Compliance Hard Drive Eraser for Apple | D-Secure",
    description: "D-Secure is the leading MAC erasure software. Compliance hard drive eraser for Apple Silicon (M1-M4) & Intel Macs. Permanently wipe data with tamper-proof audit reports with certificate.",
    canonicalUrl: getCanonicalUrl("/solutions/mac-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Mac Erasure", item: "/solutions/mac-erasure" },
    ],
  },
  itad: {
    title: "ITAD Data Wiping Solution | Secure IT Asset Disposal Software | D-Secure",
    description: "The best ITAD data wiping solution for secure IT asset disposal. Compliance software with tamper-proof audit reports with certificate and automation for processing loose drives.",
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD", item: "/solutions/itad" },
    ],
  },
  // ITADSolution page ke liye alias — component mein 'itadsolution' key use hota hai
  itadsolution: {
    title: "ITAD Data Wiping Solution | Secure IT Asset Disposal Software | D-Secure",
    description: "The best ITAD data wiping solution for secure IT asset disposal. Compliance software with tamper-proof audit reports with certificate and automation for processing loose drives.",
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD", item: "/solutions/itad" },
    ],
  },
  alternative: {
    title: "Blancco Alternative Data Erasure | Compliance Data Eraser Software | D-Secure",
    description: "Looking for a Blancco alternative for data erasure? D-Secure is the #1 compliance data eraser software providing tamper-proof audit reports with certificate at a better price point.",
    canonicalUrl: getCanonicalUrl("/solutions/blancco-alternative"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Alternative", item: "/solutions/blancco-alternative" },
    ],
  },
  download: {
    title: "Download Data Erasure Software & Trial | D-Secure Tech",
    description: "Download D-Secure data erasure software for HDD, SSD, and mobile devices. Get your 14-day free trial and start secure wiping today.",
    canonicalUrl: getCanonicalUrl("/download"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Download", item: "/download" },
    ],
  },
  "itad-solution": {
    title: "IT Asset Disposition (ITAD) Software | Secure Wiping | D-Secure",
    description: "The complete ITAD software solution for secure asset disposal. Automate your erasure process with tamper-proof audit reports with certificate.",
    canonicalUrl: getCanonicalUrl("/itad-solution"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "ITAD Solution", item: "/itad-solution" },
    ],
  },
  "healthcare-services": {
    title: "Healthcare Data Privacy & PHI Erasure | HIPAA Compliant | D-Secure",
    description: "Secure medical data sanitization solutions for hospitals. Ensure HIPAA compliance and patient data privacy with audit-proof reports.",
    canonicalUrl: getCanonicalUrl("/healthcare-services"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Healthcare", item: "/healthcare-services" },
    ],
  },
  "financial-services": {
    title: "Financial Data Destruction & Compliance | PCI-DSS & SOX | D-Secure",
    description: "Data destruction solutions for banking and finance. Meet PCI-DSS, SOX, and GLBA standards with secure, certified erasure.",
    canonicalUrl: getCanonicalUrl("/solutions/financial-services"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Financial", item: "/financial-services" },
    ],
  },
  "compliance": {
    title: "Data Erasure Compliance Standards | NIST, GDPR, HIPAA | D-Secure",
    description: "D-Secure meets global data sanitization standards including NIST 800-88, GDPR, HIPAA, and DoD. View our compliance certifications.",
    canonicalUrl: getCanonicalUrl("/compliance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Compliance", item: "/compliance" },
    ],
  },
  "solutions": {
    title: "Industry Specific Data Erasure Solutions | D-Secure Tech",
    description: "Explore data erasure solutions tailored for ITADs, Enterprises, Governments, and Service Providers. Secure tech for every industry.",
    canonicalUrl: getCanonicalUrl("/solutions"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
    ],
  },
  "products": {
    title: "Enterprise Data Sanitization & Diagnostics Products | D-Secure",
    description: "Full suite of data erasure and hardware diagnostic products. From desktop files to server LUNs, wipe everything securely.",
    canonicalUrl: getCanonicalUrl("/products"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service | D-Secure Tech",
    description: "Read the Terms of Service for D-Secure data erasure software and services. Understand your rights and responsibilities when using our secure tech.",
    canonicalUrl: getCanonicalUrl("/terms-of-service"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Terms of Service", item: "/terms-of-service" },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy | D-Secure Tech",
    description: "D-Secure Privacy Policy. Learn how we handle your data and ensure privacy while using our data erasure and sanitization solutions.",
    canonicalUrl: getCanonicalUrl("/privacy-policy"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Privacy Policy", item: "/privacy-policy" },
    ],
  },
};

// Default SEO ke saath page-specific SEO merge karo
export const getSEOForPage = (
  pageName: keyof typeof PAGE_SEO,
  overrides?: Partial<SEOMetadata>
): SEOMetadata => {
  const defaultSEO = getDefaultSEO();
  const pageSEO = PAGE_SEO[pageName] || {};

  // Combine structuredData instead of overwriting
  const combinedStructuredData = [];
  if (defaultSEO.structuredData) {
    if (Array.isArray(defaultSEO.structuredData)) {
      combinedStructuredData.push(...defaultSEO.structuredData);
    } else {
      combinedStructuredData.push(defaultSEO.structuredData);
    }
  }
  
  if (pageSEO.structuredData) {
    if (Array.isArray(pageSEO.structuredData)) {
      combinedStructuredData.push(...pageSEO.structuredData);
    } else {
      combinedStructuredData.push(pageSEO.structuredData);
    }
  }

  if (overrides?.structuredData) {
    if (Array.isArray(overrides.structuredData)) {
      combinedStructuredData.push(...overrides.structuredData);
    } else {
      combinedStructuredData.push(overrides.structuredData);
    }
  }

  const merged = {
    ...defaultSEO,
    ...pageSEO,
    ...overrides,
    structuredData: combinedStructuredData.length > 0 ? combinedStructuredData : undefined,
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
  excerpt?: string;
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

  // Fallback excerpt calculation (SEO best practice: ~155 chars)
  const effectiveDescription = (blogData.excerpt || blogData.title || "")
    .slice(0, 155)
    .trim();

  // Breadcrumbs for Blog
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Article", item: `/blog/${blogData.slug}` },
  ];

  // Article structured data Google rich snippets ke liye
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogData.title,
    description: effectiveDescription,
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

  const organizationSchema = generateOrganizationSchema();
  const combinedStructuredData: Record<string, any>[] = [organizationSchema, articleStructuredData];
  
  if (faqStructuredData) {
    combinedStructuredData.push(faqStructuredData);
  }

  return {
    title: `${blogData.title} | D-Secure Tech Blog`,
    description: effectiveDescription,
    keywords: generateKeywords(
      (blogData.keywords || "").split(",").map((k: string) => k.trim()).filter(Boolean)
    ),
    canonicalUrl,
    ogTitle: blogData.title,
    ogDescription: effectiveDescription,
    ogImage,
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: blogData.title,
    twitterDescription: effectiveDescription,
    twitterImage: ogImage,
    structuredData: combinedStructuredData,
    breadcrumbs,
  };
};
