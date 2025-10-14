import React, { memo } from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";

// CDN Image URLs - Using placeholder images that match the content
const CDN_IMAGES = {
  dashboard:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  navigation:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  alerts:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  visualization:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  settings:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  mobile:
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
};

interface ManualSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: number;
  title: string;
  description: string;
  url: string;
  pageCount: number;
}

const UserInterfacePage: React.FC = memo(() => {
  const sections = [
    {
      id: 1,
      title: "Dashboard Overview",
      description: "Main interface and navigation elements",
      icon: "📊",
      subsections: [
        {
          id: 11,
          title: "Main Dashboard",
          description: "Overview of erasure operations and system status",
          url: "/support/manual/main-dashboard",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Navigation Menu",
          description: "Access to all D-Secure features and tools",
          url: "/support/manual/navigation",
          pageCount: 1,
        },
        {
          id: 13,
          title: "Device Selection",
          description: "Choosing drives and devices for erasure",
          url: "/support/manual/device-selection",
          pageCount: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Erasure Operations",
      description: "Managing data erasure tasks and monitoring progress",
      icon: "🔄",
      subsections: [
        {
          id: 21,
          title: "Start Erasure",
          description: "Initiating secure data destruction operations",
          url: "/support/manual/start-erasure",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Progress Monitoring",
          description: "Real-time erasure progress and status updates",
          url: "/support/manual/progress-monitoring",
          pageCount: 1,
        },
        {
          id: 23,
          title: "Operation History",
          description: "View completed and failed erasure operations",
          url: "/support/manual/operation-history",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Reports & Certificates",
      description: "Generate compliance reports and erasure certificates",
      icon: "📋",
      subsections: [
        {
          id: 31,
          title: "Erasure Reports",
          description: "Detailed reports of completed operations",
          url: "/support/manual/erasure-reports",
          pageCount: 2,
        },
        {
          id: 32,
          title: "Certificate Generation",
          description: "Create tamper-proof destruction certificates",
          url: "/support/manual/certificates",
          pageCount: 1,
        },
        {
          id: 33,
          title: "Compliance Export",
          description: "Export reports for audit and compliance",
          url: "/support/manual/compliance-export",
          pageCount: 1,
        },
      ],
    },

    {
      id: 4,
      title: "Settings & Configuration",
      description: "Customize D-Secure preferences and options",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "General Settings",
          description: "Basic application preferences and defaults",
          url: "/support/manual/general-settings",
          pageCount: 1,
        },
        {
          id: 42,
          title: "Erasure Preferences",
          description: "Default erasure methods and verification options",
          url: "/support/manual/erasure-preferences",
          pageCount: 2,
        },
        {
          id: 43,
          title: "User Management",
          description: "Manage user accounts and permissions",
          url: "/support/manual/user-management",
          pageCount: 1,
        },
      ],
    },

  ];

  const quickAccessItems = [
    {
      title: "Main Dashboard",
      description: "System overview and status",
      icon: "📊",
      url: "/support/manual/main-dashboard",
      color: "bg-emerald-500",
    },
    {
      title: "Start Erasure",
      description: "Begin data destruction",
      icon: "🔄",
      url: "/support/manual/start-erasure",
      color: "bg-teal-500",
    },
    {
      title: "View Reports",
      description: "Access erasure reports",
      icon: "📋",
      url: "/support/manual/erasure-reports",
      color: "bg-cyan-500",
    },
    {
      title: "Settings",
      description: "Configure preferences",
      icon: "⚙️",
      url: "/support/manual/general-settings",
      color: "bg-emerald-600",
    },
  ];

  return (
    <ManualPageTemplate
      title="User Interface Guide"
      subtitle="Master D-Secure's intuitive interface for efficient data erasure operations"
      description="Comprehensive guide to D-Secure's user interface. Learn to navigate dashboards, manage erasure operations, generate reports, and configure settings."
      canonicalUrl="https://dsecuretech.com/support/manual/user-interface"
      keywords="D-Secure interface, data erasure dashboard, UI guide, erasure operations, D-Secure navigation"
      sections={sections}
      quickAccessItems={quickAccessItems}
      ctaTitle="Need Interface Help?"
      ctaDescription="Our support team can help you master the D-Secure interface and data erasure workflows."
      ctaButtons={[
        {
          text: "Contact UI Support",
          url: "/contact",
          primary: true,
        },
        {
          text: "View Video Tutorials",
          url: "/support/product-videos",
        },
      ]}
    />

  );
});

export default UserInterfacePage;
