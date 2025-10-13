import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

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
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Core Philosophy & Navigation",
      description:
        "Understanding D-Secure's intuitive design and navigation principles",
      icon: "🧭",
      subsections: [
        {
          id: 11,
          title: "Design Philosophy",
          description: "Clarity, control, and intuitive navigation principles",
          url: "/support/manual/design-philosophy",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Global Navigation",
          description: "Persistent sidebar and quick access to major modules",
          url: "/support/manual/global-navigation",
          pageCount: 1,
        },
        {
          id: 13,
          title: "Interface Components",
          description: "Key UI elements and their functions",
          url: "/support/manual/interface-components",
          pageCount: 2,
        },
        {
          id: 14,
          title: "Data Visualization",
          description:
            "Transforming complex data into digestible visual formats",
          url: "/support/manual/data-visualization",
          pageCount: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Dashboard & Overview",
      description: "Security command center and real-time monitoring interface",
      icon: "📊",
      subsections: [
        {
          id: 21,
          title: "Main Dashboard",
          description: "High-level security posture overview and key metrics",
          url: "/support/manual/main-dashboard",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Threat Level Indicators",
          description: "Color-coded alerts and severity ratings",
          url: "/support/manual/threat-indicators",
          pageCount: 1,
        },
        {
          id: 23,
          title: "Real-Time Feed",
          description: "Live security events and system status updates",
          url: "/support/manual/realtime-feed",
          pageCount: 1,
        },
        {
          id: 24,
          title: "Customizable Dashboards",
          description: "Tailoring views to prioritize relevant metrics",
          url: "/support/manual/custom-dashboards",
          pageCount: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Alert Management",
      description: "Streamlined incident handling and threat response workflow",
      icon: "🚨",
      subsections: [
        {
          id: 31,
          title: "Alert Detection",
          description: "Real-time anomaly detection and severity rating",
          url: "/support/manual/alert-detection",
          pageCount: 1,
        },
        {
          id: 32,
          title: "Investigation Tools",
          description: "Drill-down views, context, and log analysis",
          url: "/support/manual/investigation-tools",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Remediation Actions",
          description: "One-click actions and guided playbooks",
          url: "/support/manual/remediation-actions",
          pageCount: 1,
        },
        {
          id: 34,
          title: "Alert Closure & Archiving",
          description: "Logging, categorization, and audit trails",
          url: "/support/manual/alert-closure",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Threat Visualization",
      description: "Visual threat landscape and security analytics",
      icon: "🔍",
      subsections: [
        {
          id: 41,
          title: "Threat Distribution",
          description: "Visualizing origin and types of security threats",
          url: "/support/manual/threat-distribution",
          pageCount: 1,
        },
        {
          id: 42,
          title: "Network Traffic Analysis",
          description: "Anomaly detection and traffic pattern visualization",
          url: "/support/manual/network-analysis",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Security Metrics",
          description: "Key performance indicators and trend analysis",
          url: "/support/manual/security-metrics",
          pageCount: 1,
        },
        {
          id: 44,
          title: "Interactive Maps",
          description: "Geographical threat visualization and analysis",
          url: "/support/manual/interactive-maps",
          pageCount: 1,
        },
      ],
    },
    {
      id: 5,
      title: "Configuration & Settings",
      description: "Granular control and system customization options",
      icon: "⚙️",
      subsections: [
        {
          id: 51,
          title: "User Access Control",
          description: "Roles, permissions, and multi-factor authentication",
          url: "/support/manual/access-control",
          pageCount: 2,
        },
        {
          id: 52,
          title: "Third-Party Integrations",
          description: "SIEM, ticketing, and cloud platform connections",
          url: "/support/manual/integrations",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Notification Settings",
          description: "Email, SMS, and in-app alert configurations",
          url: "/support/manual/notifications",
          pageCount: 1,
        },
        {
          id: 54,
          title: "Backup & Restore",
          description: "Data backup and system restore procedures",
          url: "/support/manual/backup-restore",
          pageCount: 1,
        },
      ],
    },
    {
      id: 6,
      title: "Mobile Interface",
      description: "Responsive design for on-the-go security management",
      icon: "📱",
      subsections: [
        {
          id: 61,
          title: "Mobile Dashboard",
          description: "Compact overview for mobile devices",
          url: "/support/manual/mobile-dashboard",
          pageCount: 1,
        },
        {
          id: 62,
          title: "Alert Handling on Mobile",
          description: "Quick response capabilities from anywhere",
          url: "/support/manual/mobile-alerts",
          pageCount: 1,
        },
        {
          id: 63,
          title: "Mobile Optimization",
          description: "Touch-friendly controls and performance tips",
          url: "/support/manual/mobile-optimization",
          pageCount: 1,
        },
      ],
    },
  ];

  const filteredSections = manualSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
      )
    );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalPages = (section: ManualSection) => {
    return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
  };

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://dsecuretech.com/support/user-interface"
        />
        <title>
          D-Secure User Interface Guide | Intuitive Security Management
        </title>
        <meta
          name="description"
          content="Comprehensive guide to D-Secure's user interface. Learn to navigate dashboards, manage alerts, visualize threats, and configure settings effectively."
        />
        <meta
          name="keywords"
          content="D-Secure interface, security dashboard, threat visualization, alert management, UI guide"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    User Interface{" "}
                    <span className="text-purple-600 block sm:inline">
                      Guide
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Intuitive security management: Master D-Secure's dashboard,
                    alerts, visualization, and configuration interface
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search interface guide..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm sm:text-base"
                      />
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                  <OptimizedImage
                    src={CDN_IMAGES.dashboard}
                    alt="D-Secure main dashboard overview"
                    fallback={getFallbackImage('security')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Intuitive Security Interface
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Clarity and control in every view — from dashboard to
                        detailed analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🖥️</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                    Responsive
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Desktop & mobile ready
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🎨</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                    Customizable
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Tailor to your needs
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">⚡</div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                    Real-Time
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Instant updates
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  No Sections Found
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Try adjusting your search terms.
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredSections.map((section, index) => (
                  <Reveal key={section.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-lg sm:text-2xl">
                            {section.icon}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {section.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500">
                              <span>{section.subsections.length} topics</span>
                              <span>{getTotalPages(section)} pages</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
                            activeSection === section.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeSection === section.id && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="border-t border-slate-200 pt-4">
                            <div className="grid gap-3 sm:gap-4">
                              {section.subsections.map((subsection) => (
                                <Link
                                  key={subsection.id}
                                  to={subsection.url}
                                  className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 group-hover:text-purple-600 transition-colors mb-1 text-sm sm:text-base">
                                      {subsection.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                      {subsection.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                                    <span>{subsection.pageCount} pages</span>
                                    <svg
                                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Visual Guide Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Visual Interface Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Key screens and interfaces in D-Secure
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Main Dashboard",
                  description: "High-level security overview",
                  image: CDN_IMAGES.dashboard,
                  alt: "D-Secure main dashboard interface",
                },
                {
                  title: "Navigation System",
                  description: "Intuitive module access",
                  image: CDN_IMAGES.navigation,
                  alt: "D-Secure navigation sidebar",
                },
                {
                  title: "Alert Center",
                  description: "Real-time threat alerts",
                  image: CDN_IMAGES.alerts,
                  alt: "D-Secure alert management screen",
                },
                {
                  title: "Threat Visualization",
                  description: "Interactive security maps",
                  image: CDN_IMAGES.visualization,
                  alt: "D-Secure threat visualization tools",
                },
                {
                  title: "Settings Panel",
                  description: "Configuration options",
                  image: CDN_IMAGES.settings,
                  alt: "D-Secure settings and configuration interface",
                },
                {
                  title: "Mobile View",
                  description: "Responsive mobile interface",
                  image: CDN_IMAGES.mobile,
                  alt: "D-Secure mobile dashboard",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="relative h-32 sm:h-40 md:h-48">
                      <OptimizedImage
                        src={item.image}
                        alt={item.alt}
                        fallback={getFallbackImage('security')}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        width={600}
                        height={450}
                      />
                    </div>
                    <p className="text-slate-600 mt-3 sm:mt-4 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                  Security, Simplified
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      99.9%
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      Uptime
                    </div>
                    <p className="text-purple-100 text-sm sm:text-base">
                      Guaranteed system availability for continuous monitoring
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      &lt; 30s
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      Avg. Response Time
                    </div>
                    <p className="text-purple-100 text-sm sm:text-base">
                      Time to triage and initiate response for critical alerts
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      4.8/5
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                      User Rating
                    </div>
                    <p className="text-purple-100 text-sm sm:text-base">
                      High satisfaction for interface usability and clarity
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Download UI Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Get the complete user interface guide as a downloadable PDF
                  for offline reference
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download UI Guide (PDF)
                  </button>
                  <button className="bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.5a2 2 0 00-2 2v4a2 2 0 002 2h2m3-4v6m0 0l-3-3m3 3l3-3"
                      />
                    </svg>
                    Quick Reference (PDF)
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-4">
                  Last updated: {new Date().getFullYear()} • Version 4.1 • 10
                  pages
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  Need Interface Help?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our support team can help you master the D-Secure interface
                  and security workflows
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/support/contact"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Contact UI Support
                  </Link>
                  <a
                    href="mailto:ui-support@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
                  >
                    Email Interface Team
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default UserInterfacePage;
