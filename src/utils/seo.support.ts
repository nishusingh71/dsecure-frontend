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
  },
};
