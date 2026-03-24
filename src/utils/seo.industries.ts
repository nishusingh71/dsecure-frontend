import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const INDUSTRY_SEO: Record<string, Partial<SEOMetadata>> = {
  "solutions/financial-services": {
    title: "Banking & Financial Data Erasure - PCI-DSS & SOX Compliant | D-Secure Tech",
    description:
      "Secure data erasure solutions for banks and financial institutions. Achieve 100% compliance with PCI-DSS, SOX, GLBA, and FACTA with tamper-proof audit trails.",
    keywords: generateKeywords([
      "banking data erasure",
      "financial data destruction",
      "PCI-DSS compliance",
      "SOX data erasure",
      "GLBA compliance",
      "FACTA disposal rule",
      "banking ITAD",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/financial"),
  },
  "solutions/healthcare": {
    title: "Healthcare Data Sanitization | HIPAA Compliance | D-Secure",
    description:
      "Secure medical record sanitization and PHI erasure. HIPAA-compliant data sanitization for hospitals and clinics.",
    keywords: generateKeywords([
      "healthcare data privacy",
      "HIPAA compliance",
      "PHI erasure",
      "HITECH compliance",
      "secure medical record disposal",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/healthcare"),
  },
  "solutions/government": {
    title: "Government Data Erasure - NIST 800-88 & DoD Compliant | D-Secure Tech",
    description:
      "Secure data destruction for government and defense. Meet NIST 800-88, DoD 5220.22-M, and CMMC standards with tamper-proof audit trails.",
    keywords: generateKeywords([
      "government data security",
      "NIST 800-88",
      "military data erasure",
      "DoD 5220.22-M",
      "CMMC compliance",
      "classified data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/government"),
  },
  "solutions/itad": {
    title: "ITAD Data Erasure Solutions | Asset Disposal | D-Secure",
    description:
      "Secure data wiping for IT asset disposition and recyclers. Ensure certified sanitization during hardware retirement.",
    keywords: generateKeywords([
      "ITAD data erasure",
      "asset disposal",
      "certified wiping",
      "R2v3 compliance",
      "e-Stewards data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
  },
};
