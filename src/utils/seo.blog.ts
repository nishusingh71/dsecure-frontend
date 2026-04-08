import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const BLOG_SEO: Record<string, Partial<SEOMetadata>> = {
  "blog/overwrite-guide": {
    title: "The Ultimate Guide to Data Overwriting | Secure ITAD Solutions | D-Secure",
    description: "Learn how data overwriting works and why it's the gold standard for secure data sanitization in enterprise data erasure workflows.",
    keywords: generateKeywords(["overwriting guide", "data sanitization methods", "secure wiping", "enterprise data erasure"]),
    canonicalUrl: getCanonicalUrl("/blog/overwrite-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "Overwrite Guide", item: "/blog/overwrite-guide" },
    ],
  },
  "blog/ssd-wipe-guide": {
    title: "How to Securely Wipe SSDs | Advanced Sanitization | D-Secure",
    description: "SSD data erasure is different from HDD. Discover the specific techniques required for permanent SSD data destruction.",
    keywords: generateKeywords(["SSD wipe guide", "solid state drive erasure", "SSD security"]),
    canonicalUrl: getCanonicalUrl("/blog/ssd-wipe-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "SSD Wipe Guide", item: "/blog/ssd-wipe-guide" },
    ],
  },
  "blog/nist-800-88-compliance-india": {
    title: "NIST 800-88 Compliant Data Erasure Software India | D-Secure Tech",
    description: "NIST 800-88 is the gold standard for data erasure solutions in India. Learn about secure data sanitization for ITAD and government sectors.",
    keywords: generateKeywords(["NIST 800-88 compliant data erasure software India", "DPDP Act 2023 compliance", "secure data destruction India", "data sanitization software"]),
    canonicalUrl: getCanonicalUrl("/blog/nist-800-88-compliance-india"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
      { name: "NIST 800-88 Compliance", item: "/blog/nist-800-88-compliance-india" },
    ],
  },
  // ... (In a real scenario, all 300+ blog entries would go here)
};
