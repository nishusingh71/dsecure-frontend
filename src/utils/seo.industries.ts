import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const INDUSTRY_SEO: Record<string, Partial<SEOMetadata>> = {
  "solutions/financial-services": {
    title: "Financial Services Data Erasure | Banking Compliance | D-Secure",
    description:
      "Secure data sanitization for banks and financial institutions. PCI-DSS and GLBA compliant erasure for high-stakes financial data.",
    keywords: generateKeywords([
      "banking data security",
      "financial compliance",
      "PCI-DSS erasure",
      "GLBA compliance",
      "SOX data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/financial-services"),
  },
  "solutions/healthcare": {
    title: "Healthcare Data Sanitization | HIPAA Compliance | D-Secure",
    description:
      "Certified medical record destruction and PHI erasure. HIPAA-compliant data sanitization for hospitals and clinics.",
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
    title: "Government Data Erasure | NIST 800-88 & DoD | D-Secure",
    description:
      "Military-grade data destruction for government and defense. NIST 800-88 and DoD 5220.22-M compliant sanitization.",
    keywords: generateKeywords([
      "government data security",
      "NIST 800-88",
      "military data erasure",
      "DoD 5220.22-M",
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
