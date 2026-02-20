import React, { memo } from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";

const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  setup: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  scan: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  verify: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
};



const QuickStartTutorial: React.FC = memo(() => {
  const sections = [
    {
      id: 1,
      title: "Installation & Setup (3 minutes)",
      description: "Install D-Secure and activate your license with step-by-step guidance",
      icon: "📥",
      subsections: [
        {
          id: 11,
          title: "Download D-Secure Installer",
          description: "Get the latest regulated installer from our secure download portal",
          url: "/support/manual/installation",
          pageCount: 2,
        },
        {
          id: 12,
          title: "System Requirements Check",
          description: "Verify your system meets minimum hardware and OS requirements",
          url: "/support/manual/system-requirements",
          pageCount: 1,
        },
        {
          id: 13,
          title: "License Key Activation",
          description: "Enter your 25-digit activation key and verify premium features",
          url: "/support/manual/first-time-setup",
          pageCount: 2,
        },
        {
          id: 14,
          title: "Initial Configuration",
          description: "Configure basic settings and user preferences",
          url: "/support/manual/user-interface",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "First Erasure Operation (5 minutes)",
      description: "Perform your first secure data erasure with confidence and precision",
      icon: "🔄",
      subsections: [
        {
          id: 21,
          title: "Device Selection & Analysis",
          description: "Choose target drive and analyze storage type (HDD/SSD/NVMe)",
          url: "/support/manual/user-interface",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Erasure Method Selection",
          description: "Select appropriate overwrite pattern based on compliance needs",
          url: "/support/manual/overwrite-patterns",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Pre-Erasure Safety Checks",
          description: "Backup critical data and confirm erasure parameters",
          url: "/support/manual/common-issues",
          pageCount: 1,
        },
        {
          id: 24,
          title: "Execute Erasure Process",
          description: "Begin secure data destruction with real-time monitoring",
          url: "/support/manual/verification-methods",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Verification & Compliance (2 minutes)",
      description: "Verify erasure completion and generate compliance regulatory documents",
      icon: "✅",
      subsections: [
        {
          id: 31,
          title: "Erasure Verification Process",
          description: "Confirm complete data destruction using multiple verification methods",
          url: "/support/manual/verification-methods",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Regulatory Document Generation",
          description: "Create tamper-proof erasure regulatory documents for audit compliance",
          url: "/support/manual/certificate-generation",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Audit Trail Documentation",
          description: "Export detailed logs and reports for regulatory compliance",
          url: "/support/manual/audit-trails",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Advanced Features & Optimization",
      description: "Unlock D-Secure's full potential with advanced security features",
      icon: "🚀",
      subsections: [
        {
          id: 41,
          title: "Batch Operations Setup",
          description: "Configure multiple device erasure for enterprise efficiency",
          url: "/support/manual/batch-operations",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Custom Erasure Patterns",
          description: "Create organization-specific overwrite patterns and policies",
          url: "/support/manual/custom-configurations",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Automated Scheduling",
          description: "Set up recurring erasure tasks and maintenance schedules",
          url: "/support/manual/scripting-automation",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Troubleshooting & Support",
      description: "Resolve common issues and optimize D-Secure performance",
      icon: "🔧",
      subsections: [
        {
          id: 51,
          title: "Common Issues Resolution",
          description: "Fix typical installation and operation problems quickly",
          url: "/support/manual/common-issues",
          pageCount: 3,
        },
        {
          id: 52,
          title: "Performance Optimization",
          description: "Maximize erasure speed and system efficiency",
          url: "/support/manual/performance-optimization",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Error Code Reference",
          description: "Comprehensive guide to D-Secure error codes and solutions",
          url: "/support/manual/error-codes",
          pageCount: 2,
        },
      ],
    },
  ];

  const quickAccessItems = [
    {
      title: "Download & Install",
      description: "Get D-Secure installer and activate license",
      icon: "📥",
      url: "/support/manual/installation",
      color: "bg-emerald-500",
    },
    {
      title: "First Secure Erasure",
      description: "Complete your first data destruction",
      icon: "🔄",
      url: "/support/manual/overwrite-patterns",
      color: "bg-teal-500",
    },
    {
      title: "Compliance Regulatory Documents",
      description: "Generate audit-ready proof of destruction",
      icon: "📜",
      url: "/support/manual/certificate-generation",
      color: "bg-cyan-500",
    },
    {
      title: "Advanced Features",
      description: "Batch operations and automation",
      icon: "🚀",
      url: "/support/manual/batch-operations",
      color: "bg-emerald-600",
    },
    {
      title: "Performance Tuning",
      description: "Optimize erasure speed and efficiency",
      icon: "⚡",
      url: "/support/manual/performance-optimization",
      color: "bg-teal-600",
    },
    {
      title: "Troubleshooting Guide",
      description: "Resolve issues and error codes",
      icon: "🔧",
      url: "/support/manual/common-issues",
      color: "bg-cyan-600",
    },
  ];

  return (
    <ManualPageTemplate
      title="Quick Start Tutorial"
      subtitle="Complete your first secure data erasure in under 10 minutes with D-Secure"
      description="Step-by-step quick start tutorial for D-Secure. Learn to install, configure, and perform your first secure data erasure in minutes."
      canonicalUrl="https://dsecuretech.com/support/manual/quickstart"
      keywords="D-Secure quick start, data erasure tutorial, secure wipe guide, D-Secure tutorial"
      sections={sections}
      quickAccessItems={quickAccessItems}
      ctaTitle="Ready to Master D-Secure Data Erasure?"
      ctaDescription="Follow this comprehensive tutorial and become proficient in secure data destruction within 10 minutes. Join thousands of IT professionals who trust D-Secure."
      ctaButtons={[
        {
          text: "Download D-Secure Now",
          url: "/#products",
          primary: true,
        },
        {
          text: "View Complete Manual",
          url: "/support/help-manual",
        },
        {
          text: "Watch Video Tutorial",
          url: "/support/product-videos",
        },
      ]}
    />
  );
});

export default QuickStartTutorial;
