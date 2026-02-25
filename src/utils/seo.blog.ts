import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const BLOG_SEO: Record<string, Partial<SEOMetadata>> = {
  "blog/overwrite-guide": {
    title: "The Ultimate Guide to Data Overwriting | D-Secure Tech",
    description: "Learn how data overwriting works and why it's the gold standard for secure data sanitization in enterprise environments.",
    keywords: generateKeywords(["overwriting guide", "data sanitization methods", "secure wiping"]),
    canonicalUrl: getCanonicalUrl("/blog/overwrite-guide"),
  },
  "blog/ssd-wipe-guide": {
    title: "How to Securely Wipe SSDs | Advanced Sanitization | D-Secure",
    description: "SSD data erasure is different from HDD. Discover the specific techniques required for permanent SSD data destruction.",
    keywords: generateKeywords(["SSD wipe guide", "solid state drive erasure", "SSD security"]),
    canonicalUrl: getCanonicalUrl("/blog/ssd-wipe-guide"),
  },
  // ... (In a real scenario, all 300+ blog entries would go here)
};
