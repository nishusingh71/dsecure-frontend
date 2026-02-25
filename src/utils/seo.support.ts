import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const SUPPORT_SEO: Record<string, Partial<SEOMetadata>> = {
  "support/knowledge-base": {
    title: "Knowledge Base | Technical Support | D-Secure Tech",
    description: "Access technical documentation, setup guides, and advanced troubleshooting for D-Secure data erasure software.",
    keywords: generateKeywords(["knowledge base", "technical support", "erasure documentation"]),
    canonicalUrl: getCanonicalUrl("/support/knowledge-base"),
  },
  "support/faqs": {
    title: "Frequently Asked Questions | D-Secure Data Erasure",
    description: "Find answers to common questions about data sanitization, compliance, and enterprise deployment.",
    keywords: generateKeywords(["data erasure FAQ", "sanitization help", "compliance questions"]),
    canonicalUrl: getCanonicalUrl("/support/faqs"),
  },
  "support/manual/installation": {
    title: "Installation Guide | D-Secure Tech Manual",
    description: "Step-by-step installation instructions for D-Secure enterprise datasets and agents.",
    keywords: generateKeywords(["software installation", "setup guide", "deployment instructions"]),
    canonicalUrl: getCanonicalUrl("/support/manual/installation"),
  },
};
