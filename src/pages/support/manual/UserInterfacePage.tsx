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
      title: "Dashboard Overview & Navigation",
      description: "Master the main interface, navigation elements, and system status monitoring",
      icon: "📊",
      subsections: [
        {
          id: 11,
          title: "Main Dashboard Layout",
          description: "Comprehensive overview of active operations, system health, and quick access panels",
          url: "/support/manual/main-dashboard",
          pageCount: 3,
        },
        {
          id: 12,
          title: "Navigation Menu System",
          description: "Complete guide to accessing all D-Secure features, tools, and administrative functions",
          url: "/support/manual/navigation",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Device Discovery & Selection",
          description: "Advanced device detection, filtering, and selection for targeted erasure operations",
          url: "/support/manual/device-selection",
          pageCount: 3,
        },
        {
          id: 14,
          title: "Status Indicators & Alerts",
          description: "Understanding system alerts, warning indicators, and notification management",
          url: "/support/manual/status-indicators",
          pageCount: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Erasure Operations Management",
      description: "Complete workflow for managing data erasure tasks with real-time monitoring",
      icon: "🔄",
      subsections: [
        {
          id: 21,
          title: "Erasure Operation Setup",
          description: "Configure erasure parameters, select methods, and initiate secure data destruction",
          url: "/support/manual/start-erasure",
          pageCount: 4,
        },
        {
          id: 22,
          title: "Real-Time Progress Monitoring",
          description: "Track erasure progress, performance metrics, and estimated completion times",
          url: "/support/manual/progress-monitoring",
          pageCount: 3,
        },
        {
          id: 23,
          title: "Operation History & Logs",
          description: "Access detailed logs of completed, failed, and interrupted erasure operations",
          url: "/support/manual/operation-history",
          pageCount: 2,
        },
        {
          id: 24,
          title: "Batch Operations Interface",
          description: "Manage multiple simultaneous erasure operations with queue management",
          url: "/support/manual/batch-operations",
          pageCount: 3,
        },
      ],
    },
    {
      id: 3,
      title: "Reports, Certificates & Compliance",
      description: "Generate comprehensive reports and compliance certificates for audit requirements",
      icon: "📋",
      subsections: [
        {
          id: 31,
          title: "Detailed Erasure Reports",
          description: "Generate comprehensive reports with technical details, timestamps, and verification data",
          url: "/support/manual/erasure-reports",
          pageCount: 4,
        },
        {
          id: 32,
          title: "Certificate Generation System",
          description: "Create tamper-proof destruction certificates with digital signatures and compliance data",
          url: "/support/manual/certificate-generation",
          pageCount: 3,
        },
        {
          id: 33,
          title: "Compliance Export & Integration",
          description: "Export reports in multiple formats for regulatory compliance and third-party systems",
          url: "/support/manual/compliance-export",
          pageCount: 2,
        },
        {
          id: 34,
          title: "Audit Trail Management",
          description: "Maintain comprehensive audit trails with chain of custody documentation",
          url: "/support/manual/audit-trails",
          pageCount: 3,
        },
      ],
    },
    {
      id: 4,
      title: "Advanced Settings & Configuration",
      description: "Customize D-Secure preferences, user management, and enterprise configurations",
      icon: "⚙️",
      subsections: [
        {
          id: 41,
          title: "General Application Settings",
          description: "Configure basic preferences, interface themes, and default operational parameters",
          url: "/support/manual/general-settings",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Erasure Method Preferences",
          description: "Set default erasure methods, verification options, and compliance standards",
          url: "/support/manual/erasure-preferences",
          pageCount: 3,
        },
        {
          id: 43,
          title: "User Management & Permissions",
          description: "Manage user accounts, role-based access control, and administrative privileges",
          url: "/support/manual/user-management",
          pageCount: 3,
        },
        {
          id: 44,
          title: "Enterprise Integration Settings",
          description: "Configure LDAP, Active Directory, and enterprise system integrations",
          url: "/support/manual/enterprise-integration",
          pageCount: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Advanced Interface Features",
      description: "Utilize advanced interface capabilities for power users and administrators",
      icon: "🚀",
      subsections: [
        {
          id: 51,
          title: "Custom Dashboard Layouts",
          description: "Create personalized dashboard configurations and widget arrangements",
          url: "/support/manual/custom-dashboards",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Keyboard Shortcuts & Hotkeys",
          description: "Master keyboard shortcuts for efficient navigation and operation control",
          url: "/support/manual/keyboard-shortcuts",
          pageCount: 1,
        },
        {
          id: 53,
          title: "API Integration Interface",
          description: "Access REST API controls and automation interfaces within the GUI",
          url: "/support/manual/api-integration",
          pageCount: 2,
        },
      ],
    },
  ];

  const quickAccessItems = [
    {
      title: "Dashboard Navigation",
      description: "Master the main interface and system overview",
      icon: "📊",
      url: "/support/manual/main-dashboard",
      color: "bg-emerald-500",
    },
    {
      title: "Erasure Operations",
      description: "Complete guide to data destruction workflows",
      icon: "🔄",
      url: "/support/manual/start-erasure",
      color: "bg-teal-500",
    },
    {
      title: "Reports & Certificates",
      description: "Generate compliance documentation",
      icon: "📋",
      url: "/support/manual/erasure-reports",
      color: "bg-cyan-500",
    },
    {
      title: "Advanced Configuration",
      description: "Customize settings and preferences",
      icon: "⚙️",
      url: "/support/manual/general-settings",
      color: "bg-emerald-600",
    },
    {
      title: "Batch Operations",
      description: "Manage multiple erasure tasks efficiently",
      icon: "📏",
      url: "/support/manual/batch-operations",
      color: "bg-teal-600",
    },
    {
      title: "User Management",
      description: "Control access and permissions",
      icon: "👥",
      url: "/support/manual/user-management",
      color: "bg-cyan-600",
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
      ctaTitle="Master the D-Secure Interface?"
      ctaDescription="Our expert support team provides comprehensive training on D-Secure's interface, helping you maximize efficiency and ensure compliance with data erasure workflows."
      ctaButtons={[
        {
          text: "Get Interface Training",
          url: "/contact",
          primary: true,
        },
        {
          text: "Watch Video Tutorials",
          url: "/support/product-videos",
        },
        {
          text: "Download Quick Reference",
          url: "/support/downloads",
        },
      ]}
    />

  );
});

export default UserInterfacePage;
