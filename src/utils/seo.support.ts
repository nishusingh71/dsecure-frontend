import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const SUPPORT_SEO: Record<string, Partial<SEOMetadata>> = {
  "support/knowledge-base": {
    title: "Knowledge Base | Technical Support | D-Secure Tech",
    description:
      "Access technical documentation, setup guides, and advanced troubleshooting for D-Secure data erasure software.",
    keywords: generateKeywords([
      "knowledge base",
      "technical support",
      "erasure documentation",
    ]),
    canonicalUrl: getCanonicalUrl("/support/knowledge-base"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Knowledge Base", item: "/support/knowledge-base" },
    ],
  },
  "support/faqs": {
    title: "Frequently Asked Questions | D-Secure Data Erasure",
    description:
      "Find answers to common questions about data sanitization, compliance, and enterprise deployment.",
    keywords: generateKeywords([
      "data erasure FAQ",
      "sanitization help",
      "compliance questions",
    ]),
    canonicalUrl: getCanonicalUrl("/support/faqs"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "FAQs", item: "/support/faqs" },
    ],
  },
  "support/manual/installation": {
    title: "Installation Guide | D-Secure Tech Manual",
    description:
      "Step-by-step installation instructions for D-Secure enterprise datasets and agents.",
    keywords: generateKeywords([
      "software installation",
      "setup guide",
      "deployment instructions",
    ]),
    canonicalUrl: getCanonicalUrl("/support/manual/installation"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Installation Guide", item: "/support/manual/installation" },
    ],
  },
  "support/help-manual/complete-manual": {
    title: "D-Secure File Eraser Complete Manual",
    description:
      "Comprehensive user guide and documentation for D-Secure File Eraser. Learn how to securely wipe files, free space, and manage erasure reports.",
    keywords: generateKeywords([
      "file eraser manual",
      "d-secure documentation",
      "how to erase files",
      "file shredding guide",
    ]),
    canonicalUrl: getCanonicalUrl("/support/help-manual/complete-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/help-manual" },
      { name: "File Eraser Manual", item: "/support/help-manual/complete-manual" },
    ],
  },
  "support/help-manual/complete-drive-manual": {
    title: "D-Secure Drive Eraser Complete Manual",
    description:
      "Complete user manual for D-Secure Drive Eraser. Detailed step-by-step instructions for booting, hardware detection, volume wiping, and compliance reporting.",
    keywords: generateKeywords([
      "drive eraser manual",
      "boot drive wipe guide",
      "volume sanitization manual",
      "d-secure drive documentation",
    ]),
    canonicalUrl: getCanonicalUrl("/support/help-manual/complete-drive-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/help-manual" },
      { name: "Drive Eraser Manual", item: "/support/help-manual/complete-drive-manual" },
    ],
  },
  "support/get-started": {
    title: "Get Started with D-Secure | Setup & Configuration Guide",
    description: "New to D-Secure? Follow our quick start guide to set up your data erasure console and start wiping your first devices.",
    keywords: generateKeywords(["get started", "quick start guide", "setup tutorial"]),
    canonicalUrl: getCanonicalUrl("/support/get-started"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Get Started", item: "/support/get-started" },
    ],
  },
  "support/product-videos": {
    title: "D-Secure Product Videos & Video Tutorials",
    description: "Watch step-by-step video tutorials on how to use D-Secure Drive Eraser, File Eraser, and Mobile Eraser solutions.",
    keywords: generateKeywords(["video tutorials", "product demos", "how-to videos"]),
    canonicalUrl: getCanonicalUrl("/support/product-videos"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Product Videos", item: "/support/product-videos" },
    ],
  },
  "support/help-manual": {
    title: "D-Secure Help Center & User Documentation",
    description: "Browse our comprehensive help manual for all D-Secure products. Detailed guides for installation, usage, and troubleshooting.",
    keywords: generateKeywords(["help manual", "user guide", "product documentation"]),
    canonicalUrl: getCanonicalUrl("/support/help-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Help Manual", item: "/support/help-manual" },
    ],
  },
  "support/manual/cryptographic-erasure": {
    title: "Cryptographic Erasure Guide | NIST 800-88 Purge | D-Secure",
    description: "Learn how to perform cryptographic erasure (CE) on SSDs and SEDs according to NIST 800-88 'Purge' standards.",
    keywords: generateKeywords(["cryptographic erasure", "CE guide", "NIST 800-88 purge", "SSD crypto erase"]),
    canonicalUrl: getCanonicalUrl("/support/manual/cryptographic-erasure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Cryptographic Erasure", item: "/support/manual/cryptographic-erasure" },
    ],
  },
};
