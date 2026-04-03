import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const INDUSTRY_SEO: Record<string, Partial<SEOMetadata>> = {
  "solutions/data-erasure-banking-finance": {
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
    canonicalUrl: getCanonicalUrl("/solutions/data-erasure-banking-finance"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Financial Services", item: "/solutions/data-erasure-banking-finance" },
    ],
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
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Healthcare", item: "/solutions/healthcare" },
    ],
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
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Government", item: "/solutions/government" },
    ],
  },
  "solutions/itad": {
    title: "ITAD Data Erasure Solutions | Asset Disposal | D-Secure",
    description: "Secure data wiping for IT asset disposition and recyclers. Ensure compliance sanitization with Tamper-proof audit reports (Page 1: Certificate, Page 2+: Summary) during hardware retirement.",
    keywords: generateKeywords([
      "ITAD data erasure",
      "asset disposal",
      "compliance wiping",
      "R2v3 compliance",
      "e-Stewards data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/itad"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "ITAD", item: "/solutions/itad" },
    ],
  },
  "solutions/education": {
    title: "Education Data Erasure & Privacy - FERPA & COPPA Compliant | D-Secure Tech",
    description:
      "Secure data erasure solutions for schools, universities, and research institutions. Ensure FERPA and COPPA compliance with compliance-verified student data sanitization.",
    keywords: generateKeywords([
      "education data erasure",
      "FERPA compliance software",
      "COPPA data privacy",
      "student data privacy",
      "university IT asset disposal",
      "school computer wiping",
      "educational data sanitization",
      "NIST 800-88 education",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/education"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Education", item: "/solutions/education" },
    ],
  },
  "solutions/non-profit": {
    title: "Non-Profit Data Erasure Solutions | Secure Device Donation & Reuse | D-Secure",
    description:
      "Comply with data privacy laws by securely erasing sensitive donor, beneficiary, and financial records from drives and devices. Cost-effective, audit-ready data sanitization for NGOs and charities.",
    keywords: generateKeywords([
      "non-profit data erasure",
      "NGO data security",
      "charity device donation",
      "secure data disposal for NGOs",
      "NIST 800-88 non-profit",
      "sustainable IT asset disposal",
      "non-profit GDPR compliance",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/non-profit"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Non-Profit Organizations", item: "/solutions/non-profit" },
    ],
  },
  // Enterprise Solutions Page — SEO key "enterprise-solutions" se match hota hai
  "enterprise-solutions": {
    title: "Enterprise Data Erasure Solutions | Scalable Secure Wiping | D-Secure",
    description:
      "Enterprise-grade data erasure for large organizations. Wipe up to 65,000 drives simultaneously with PXE boot, RAID support, and tamper-proof audit trails. NIST 800-88, GDPR, HIPAA compliant.",
    keywords: generateKeywords([
      "enterprise data erasure",
      "enterprise data sanitization",
      "large scale data wiping",
      "PXE boot erasure",
      "network server wiping",
      "NIST 800-88 enterprise",
      "corporate data destruction",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/enterprise"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Enterprise", item: "/solutions/enterprise" },
    ],
  },
  // Service Providers Page — SEO key "solutions/service-providers" se match hota hai
  "solutions/service-providers": {
    title: "MSP & Service Provider Data Erasure Solutions | D-Secure Tech",
    description:
      "Data erasure solutions for Managed Service Providers and System Integrators. Offer certified data sanitization as a service with centralized audit trails, white-label reporting, and scalable licensing.",
    keywords: generateKeywords([
      "MSP data erasure",
      "service provider data wiping",
      "managed service provider security",
      "erasure as a service",
      "ITAD service provider",
      "white label data erasure",
      "MSP compliance tools",
    ]),
    canonicalUrl: getCanonicalUrl("/solutions/service-providers"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Solutions", item: "/solutions" },
      { name: "Service Providers", item: "/solutions/service-providers" },
    ],
  },
};
