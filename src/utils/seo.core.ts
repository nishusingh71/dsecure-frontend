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
  structuredData?: any;
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

export const BASE_KEYWORDS = [
  "data erasure software",
  "data erasure tool",
  "data erasure solution",
  "data wiping software",
  "data destruction software",
  "data sanitization tool",
  "secure data erasure",
  "permanent data erasure",
  "NIST 800-88 compliance",
  "GDPR data erasure",
  "HIPAA data erasure",
  "enterprise data erasure",
  "hard drive wiping software",
  "SSD data erasure",
  "D-Secure Tech",
  "certified data wiping",
  "secure drive disposal",
  "NIST 800-88 rev 1",
  "Blancco alternative",
  "secure file shredder",
  "permanent data destruction",
];

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
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: productName,
  description: description,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Windows, macOS, Linux",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: {
    "@type": "Organization",
    name: "D-Secure Tech",
  },
});

export const getDefaultSEO = (): SEOMetadata => ({
  title:
    "D-Secure - Best Data Erasure Software | Secure Tech for Enterprise Data Wiping",
  description:
    "D-Secure is the best data erasure software trusted globally. Secure data wiping for HDD, SSD, mobile devices. NIST 800-88, GDPR, HIPAA certified. Free trial available. Secure tech for enterprise.",
  keywords: generateKeywords(),
  canonicalUrl: SEO_CONFIG.baseUrl,
  ogTitle: "D-Secure Tech - Secure Data Erasure Solutions",
  ogDescription:
    "Professional data erasure and sanitization software for enterprise compliance and security.",
  ogImage: SEO_CONFIG.defaultImage,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "D-Secure Tech - Data Erasure Solutions",
  twitterDescription:
    "Secure data destruction and sanitization for enterprise compliance.",
  twitterImage: SEO_CONFIG.defaultImage,
  structuredData: generateOrganizationSchema(),
});
