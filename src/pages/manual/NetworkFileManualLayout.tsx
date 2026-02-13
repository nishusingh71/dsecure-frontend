// src/pages/manual/NetworkFileManualLayout.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Layers,
  Settings as SettingsIcon,
  Network,
  CloudUpload,
  FileX,
  Sparkles,
  FileText,
  Calendar,
  HelpCircle,
  Phone,
  Info,
  ChevronRight,
  Menu,
  X,
  Shield,
  Folder,
} from "lucide-react";

// Sidebar section structure
interface SubSection {
  id: string;
  title: string;
  path: string;
}

interface SidebarSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subsections: SubSection[];
}

const sidebarSections: SidebarSection[] = [
  {
    id: "quick-overview",
    icon: BookOpen,
    title: "Quick Overview",
    subsections: [
      { id: "quick-overview", title: "Quick Overview", path: "/support/help-manual/network-file/quick-overview" },
    ],
  },
  {
    id: "installation",
    icon: Layers,
    title: "Installation",
    subsections: [
      { id: "installation", title: "Installation", path: "/support/help-manual/network-file/installation" },
    ],
  },
  {
    id: "user-interface",
    icon: Shield,
    title: "User Interface",
    subsections: [
      { id: "user-interface", title: "User Interface", path: "/support/help-manual/network-file/user-interface" },
    ],
  },
  {
    id: "licensing",
    icon: FileText,
    title: "Licensing",
    subsections: [
      { id: "licensing", title: "Licensing", path: "/support/help-manual/network-file/licensing" },
    ],
  },
  {
    id: "settings",
    icon: SettingsIcon,
    title: "Settings",
    subsections: [
      { id: "settings", title: "Settings", path: "/support/help-manual/network-file/settings" },
    ],
  },
  {
    id: "connecting-domain",
    icon: Network,
    title: "Connecting Domain",
    subsections: [
      { id: "connecting-domain", title: "Connecting Domain", path: "/support/help-manual/network-file/connecting-domain" },
    ],
  },
  {
    id: "cloud-integration",
    icon: CloudUpload,
    title: "Cloud Integration",
    subsections: [
      { id: "cloud-integration", title: "Cloud Integration", path: "/support/help-manual/network-file/cloud-integration" },
    ],
  },
  {
    id: "erasing-files",
    icon: FileX,
    title: "Erasing Files",
    subsections: [
      { id: "erasing-files", title: "Securely Erasing Files and Folders", path: "/support/help-manual/network-file/erasing-files" },
    ],
  },
  {
    id: "erasing-traces",
    icon: Sparkles,
    title: "Erasing Traces",
    subsections: [
      { id: "erasing-traces", title: "Erase Digital Traces and Activity History", path: "/support/help-manual/network-file/erasing-traces" },
    ],
  },
  {
    id: "scheduling-tasks",
    icon: Calendar,
    title: "Scheduling Tasks",
    subsections: [
      { id: "scheduling-tasks", title: "Scheduling Tasks", path: "/support/help-manual/network-file/scheduling-tasks" },
    ],
  },
  {
    id: "report-management",
    icon: Folder,
    title: "Report Management",
    subsections: [
      { id: "report-management", title: "Report Management", path: "/support/help-manual/network-file/report-management" },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    subsections: [
      { id: "faq", title: "FAQ", path: "/support/help-manual/network-file/faq" },
    ],
  },
  {
    id: "support",
    icon: Phone,
    title: "Support",
    subsections: [
      { id: "support", title: "Support", path: "/support/help-manual/network-file/support" },
    ],
  },
  {
    id: "about",
    icon: Info,
    title: "About",
    subsections: [
      { id: "about", title: "About", path: "/support/help-manual/network-file/about" },
    ],
  },
];

const NetworkFileManualLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>D-Secure Network File Manual - Complete Guide</title>
        <meta
          name="description"
          content="Complete user manual for D-Secure File Eraser Network - Installation, configuration, and usage guide"
        />
      </Helmet>

      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #dee2e6;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #adb5bd;
        }
      `}</style>

      {/* Main Content Area - Bootstrap Docs Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Sidebar Navigation - Bootstrap Docs Style */}
          <aside
            ref={listRef}
            className={`${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:static top-0 left-0 h-screen lg:h-auto w-72 bg-white lg:bg-transparent z-40 transition-transform duration-300 lg:block shrink-0 border-r border-gray-200 lg:border-r-0`}
          >
            <div
              className="sticky top-4 p-4 lg:p-0 lg:pr-6 max-h-[calc(100vh-2rem)] overflow-y-auto sidebar-scroll"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#dee2e6 #f8f9fa",
              }}
            >
              <nav className="space-y-1">
                {sidebarSections.map((section) => (
                  <div key={section.id} className="mb-4">
                    {/* Section Header - Always visible */}
                    <div className="mb-2">
                      <button
                        onClick={() => handleNavigation(section.subsections[0]?.path || "")}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded transition-colors text-left ${
                          location.pathname === section.subsections[0]?.path
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        <section.icon className="w-4 h-4 shrink-0" />
                        <span>{section.title}</span>
                      </button>
                    </div>

                    {/* Subsections - Always visible */}
                    {section.subsections.length > 0 && (
                      <div className="ml-6 space-y-0.5 border-l border-gray-200">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => handleNavigation(subsection.path)}
                            className={`w-full flex items-start px-4 py-1.5 text-sm rounded-r transition-colors text-left ${
                              location.pathname === subsection.path
                                ? "text-blue-600 font-medium bg-blue-50 border-l-2 border-blue-600 -ml-px"
                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="break-words">{subsection.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Welcome Banner - Only show on index route */}
            {location.pathname === "/support/help-manual/complete-network-manual" && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  D-Secure File Eraser Network Manual
                </h1>
                <p className="text-blue-100 text-lg">
                  Complete guide to installation, configuration, and secure data erasure operations
                </p>
                <div className="mt-6">
                  <Link
                    to="/support/help-manual/network-file/quick-overview"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
            )}

            {/* Render child routes */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default NetworkFileManualLayout;
