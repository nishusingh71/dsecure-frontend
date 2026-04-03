import { SEOMetadata, generateKeywords, getCanonicalUrl } from "./seo.core";

export const MANUAL_SEO: Record<string, Partial<SEOMetadata>> = {
  "system-setup": {
    title: "System Setup & Configuration Guide | D-Secure Tech Manual",
    description: "Complete guide for D-Secure system configuration, disk access permissions, and initial setup steps for macOS and Windows.",
    keywords: generateKeywords(["system setup", "configuration guide", "disk access", "macOS setup", "D-Secure configuration"]),
    canonicalUrl: getCanonicalUrl("/support/manual/system-setup"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "System Setup", item: "/support/manual/system-setup" },
    ],
  },
  "installation-guide": {
    title: "Detailed Installation Guide | D-Secure Tech Manual",
    description: "Step-by-step instructions for installing D-Secure data erasure agents and console across enterprise networks.",
    keywords: generateKeywords(["installation guide", "software deployment", "agent installation", "D-Secure setup"]),
    canonicalUrl: getCanonicalUrl("/support/manual/installation-guide"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Installation Guide", item: "/support/manual/installation-guide" },
    ],
  },
  "working-with-dsecure": {
    title: "How to Work with D-Secure | Core Operations Manual",
    description: "Learn how to use D-Secure for drive wiping, file erasure, and report management. Basic and advanced operation guide.",
    keywords: generateKeywords(["how to use d-secure", "erasure operations", "drive wiping guide", "file erasure tutorial"]),
    canonicalUrl: getCanonicalUrl("/support/manual/working-with-dsecure"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Working with D-Secure", item: "/support/manual/working-with-dsecure" },
    ],
  },
  "report-management": {
    title: "Report Management & Audit Logs | D-Secure Tech Manual",
    description: "Learn how to generate, manage, and export tamper-proof audit reports and certificates for data erasure compliance.",
    keywords: generateKeywords(["report management", "audit logs", "erasure certificates", "compliance reporting"]),
    canonicalUrl: getCanonicalUrl("/support/manual/report-management"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Report Management", item: "/support/manual/report-management" },
    ],
  },
  "schedule-settings": {
    title: "Automation & Schedule Settings | D-Secure Tech Manual",
    description: "Configure automated data erasure tasks, recurring schedules, and policy-based wiping in D-Secure.",
    keywords: generateKeywords(["scheduled erasure", "policy wiping", "automation", "D-Secure tasks"]),
    canonicalUrl: getCanonicalUrl("/support/manual/schedule-settings"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/manual" },
      { name: "Schedule Settings", item: "/support/manual/schedule-settings" },
    ],
  },
  "complete-freeze-state-manual": {
    title: "D-Secure FreezeState Manual | Reboot-to-Restore Guide",
    description: "Comprehensive guide for D-Secure FreezeState. Learn how to manage indestructible workstations, monitor system health, and configure reboot-to-restore policies.",
    keywords: generateKeywords(["freezestate manual", "reboot to restore", "system protection", "admin console guide", "endpoint monitor"]),
    canonicalUrl: getCanonicalUrl("/support/help-manual/complete-freeze-state-manual"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Support", item: "/support" },
      { name: "Manual", item: "/support/help-manual" },
      { name: "FreezeState Manual", item: "/support/help-manual/complete-freeze-state-manual" },
    ],
  },
};
