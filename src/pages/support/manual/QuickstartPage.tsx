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
      title: "Installation & Setup",
      description: "Install D-Secure and activate your license in 3 minutes",
      icon: "📥",
      subsections: [
        {
          id: 11,
          title: "Download D-Secure",
          description: "Get the latest installer from our website",
          url: "/support/manual/installation",
          pageCount: 1,
        },
        {
          id: 12,
          title: "License Activation",
          description: "Enter your 25-digit activation key",
          url: "/support/manual/first-time-setup",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "First Erasure Operation",
      description: "Perform your first secure data erasure in 5 minutes",
      icon: "🔄",
      subsections: [
        {
          id: 21,
          title: "Select Target Device",
          description: "Choose the drive or device to erase",
          url: "/support/manual/user-interface",
          pageCount: 1,
        },
        {
          id: 22,
          title: "Choose Erasure Method",
          description: "Select appropriate overwrite pattern",
          url: "/support/manual/overwrite-patterns",
          pageCount: 1,
        },
        {
          id: 23,
          title: "Start Erasure Process",
          description: "Begin secure data destruction",
          url: "/support/manual/verification-methods",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Verification & Reporting",
      description: "Verify erasure completion and generate certificates",
      icon: "✅",
      subsections: [
        {
          id: 31,
          title: "Verify Erasure",
          description: "Confirm data has been completely destroyed",
          url: "/support/manual/verification-methods",
          pageCount: 1,
        },
        {
          id: 32,
          title: "Generate Certificate",
          description: "Create tamper-proof erasure certificate",
          url: "/support/manual/certificates",
          pageCount: 1,
        },
      ],
    },



  ];

  const quickAccessItems = [
    {
      title: "Download Installer",
      description: "Get D-Secure installer",
      icon: "📥",
      url: "/support/manual/installation",
      color: "bg-emerald-500",
    },
    {
      title: "First Erasure",
      description: "Your first data wipe",
      icon: "🔄",
      url: "/support/manual/overwrite-patterns",
      color: "bg-teal-500",
    },
    {
      title: "Generate Certificate",
      description: "Proof of destruction",
      icon: "📜",
      url: "/support/manual/certificates",
      color: "bg-cyan-500",
    },
    {
      title: "Troubleshooting",
      description: "Fix common issues",
      icon: "🔧",
      url: "/support/manual/common-issues",
      color: "bg-emerald-600",
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
      ctaTitle="Ready to Start Erasing Data Securely?"
      ctaDescription="Follow this tutorial and you'll be performing secure data erasure operations in minutes."
      ctaButtons={[
        {
          text: "Download D-Secure",
          url: "/products",
          primary: true,
        },
        {
          text: "View Full Manual",
          url: "/support/help-manual",
        },
      ]}
    />

  );
});

export default QuickStartTutorial;
