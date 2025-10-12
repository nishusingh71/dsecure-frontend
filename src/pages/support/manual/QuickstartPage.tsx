import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  setup:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  create:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  publish:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  collaborate:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface TutorialSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  steps: TutorialStep[];
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  url: string;
  timeEstimate: string;
}

const QuickStartTutorial: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tutorialSections: TutorialSection[] = [
    {
      id: 1,
      title: "Getting Started",
      description: "Set up your account and workspace in minutes",
      icon: "🚀",
      duration: "5 min",
      steps: [
        {
          id: 11,
          title: "Create Your Account",
          description: "Sign up and verify your email address",
          url: "/tutorial/create-account",
          timeEstimate: "1 min",
        },
        {
          id: 12,
          title: "Set Up Workspace",
          description: "Configure your organization and team settings",
          url: "/tutorial/setup-workspace",
          timeEstimate: "2 min",
        },
        {
          id: 13,
          title: "Invite Team Members",
          description: "Add collaborators to your documentation project",
          url: "/tutorial/invite-team",
          timeEstimate: "2 min",
        },
      ],
    },
    {
      id: 2,
      title: "First Document",
      description: "Create and format your first documentation page",
      icon: "📝",
      duration: "8 min",
      steps: [
        {
          id: 21,
          title: "Create New Document",
          description: "Start a new document from template or scratch",
          url: "/tutorial/create-document",
          timeEstimate: "2 min",
        },
        {
          id: 22,
          title: "Basic Formatting",
          description: "Learn markdown and rich text editing basics",
          url: "/tutorial/formatting",
          timeEstimate: "3 min",
        },
        {
          id: 23,
          title: "Add Images & Media",
          description: "Embed images, videos, and files in your document",
          url: "/tutorial/add-media",
          timeEstimate: "3 min",
        },
      ],
    },
    {
      id: 3,
      title: "Organization",
      description: "Structure your documentation with folders and categories",
      icon: "📁",
      duration: "6 min",
      steps: [
        {
          id: 31,
          title: "Create Folders",
          description: "Organize documents into logical folders",
          url: "/tutorial/create-folders",
          timeEstimate: "2 min",
        },
        {
          id: 32,
          title: "Set Up Categories",
          description: "Use categories for better content organization",
          url: "/tutorial/setup-categories",
          timeEstimate: "2 min",
        },
        {
          id: 33,
          title: "Navigation Setup",
          description: "Configure sidebar and table of contents",
          url: "/tutorial/navigation-setup",
          timeEstimate: "2 min",
        },
      ],
    },
    {
      id: 4,
      title: "Collaboration",
      description: "Work with your team on documentation projects",
      icon: "👥",
      duration: "7 min",
      steps: [
        {
          id: 41,
          title: "Share Documents",
          description: "Control access and share with team members",
          url: "/tutorial/share-documents",
          timeEstimate: "2 min",
        },
        {
          id: 42,
          title: "Comments & Feedback",
          description: "Use comments for team collaboration",
          url: "/tutorial/comments-feedback",
          timeEstimate: "3 min",
        },
        {
          id: 43,
          title: "Version Control",
          description: "Track changes and restore previous versions",
          url: "/tutorial/version-control",
          timeEstimate: "2 min",
        },
      ],
    },
    {
      id: 5,
      title: "Publishing",
      description: "Publish and distribute your documentation",
      icon: "🌐",
      duration: "5 min",
      steps: [
        {
          id: 51,
          title: "Publish Settings",
          description: "Configure visibility and access controls",
          url: "/tutorial/publish-settings",
          timeEstimate: "2 min",
        },
        {
          id: 52,
          title: "Generate Share Links",
          description: "Create public or private shareable links",
          url: "/tutorial/share-links",
          timeEstimate: "2 min",
        },
        {
          id: 53,
          title: "Embed Documentation",
          description: "Embed docs in your website or application",
          url: "/tutorial/embed-docs",
          timeEstimate: "1 min",
        },
      ],
    },
    {
      id: 6,
      title: "Advanced Features",
      description: "Explore powerful features for better documentation",
      icon: "⚡",
      duration: "10 min",
      steps: [
        {
          id: 61,
          title: "Custom Templates",
          description: "Create and use custom document templates",
          url: "/tutorial/custom-templates",
          timeEstimate: "3 min",
        },
        {
          id: 62,
          title: "API Documentation",
          description: "Set up API documentation with code examples",
          url: "/tutorial/api-docs",
          timeEstimate: "4 min",
        },
        {
          id: 63,
          title: "Automation & Integrations",
          description: "Connect with other tools and automate workflows",
          url: "/tutorial/integrations",
          timeEstimate: "3 min",
        },
      ],
    },
  ];

  const filteredSections = tutorialSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.steps.some(
        (step) =>
          step.title.toLowerCase().includes(query) ||
          step.description.toLowerCase().includes(query)
      )
    );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalTime = (section: TutorialSection) => {
    return section.steps.reduce((total, step) => {
      const time = parseInt(step.timeEstimate);
      return total + (isNaN(time) ? 0 : time);
    }, 0);
  };

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://securedocs.com/tutorial/quick-start"
        />
        <title>
          Quick Start Tutorial | SecureDocs - Get Started in 10 Minutes
        </title>
        <meta
          name="description"
          content="Step-by-step quick start tutorial for SecureDocs. Learn to create, organize, collaborate, and publish documentation in under 10 minutes."
        />
        <meta
          name="keywords"
          content="SecureDocs tutorial, quick start guide, documentation tool tutorial, get started with SecureDocs"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
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
                    Quick Start{" "}
                    <span className="text-green-600 block sm:inline">
                      Tutorial
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Get up and running with SecureDocs in under 10 minutes. From
                    account setup to publishing your first documentation.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tutorial sections..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base"
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
                  <img
                    src={CDN_IMAGES.hero}
                    alt="SecureDocs dashboard overview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Start Documenting Today
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        Create professional documentation in minutes with our
                        intuitive platform.
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
                  <div className="text-3xl sm:text-4xl mb-4">🚀</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                    Quick Setup
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Ready in under 10 minutes
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">👥</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                    Team Ready
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Unlimited collaborators
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🌐</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                    Easy Sharing
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Public & private options
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tutorial Sections */}
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
                  No Tutorials Found
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
                              <span>{section.steps.length} steps</span>
                              <span>{section.duration}</span>
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
                            <div className="space-y-3 sm:space-y-4">
                              {section.steps.map((step) => (
                                <Link
                                  key={step.id}
                                  to={step.url}
                                  className="block p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-slate-900 group-hover:text-green-600 transition-colors text-sm sm:text-base">
                                        {step.title}
                                      </h4>
                                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                                        {step.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                      <span>{step.timeEstimate}</span>
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Visual Guide
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Screenshots of key SecureDocs interfaces
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Account Setup",
                  description: "Quick and secure account creation process",
                  image: CDN_IMAGES.setup,
                  alt: "SecureDocs account setup interface",
                },
                {
                  title: "Document Editor",
                  description: "Intuitive editor with real-time preview",
                  image: CDN_IMAGES.create,
                  alt: "SecureDocs document editor interface",
                },
                {
                  title: "Publish & Share",
                  description: "Easy publishing and sharing options",
                  image: CDN_IMAGES.publish,
                  alt: "SecureDocs publishing settings panel",
                },
                {
                  title: "Team Collaboration",
                  description: "Real-time editing and comments",
                  image: CDN_IMAGES.collaborate,
                  alt: "SecureDocs collaboration features",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="relative h-32 sm:h-40 md:h-48">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        loading="lazy"
                        decoding="async"
                        style={{ aspectRatio: "4/3" }}
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

        {/* Most Popular Tutorials */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Most Popular Tutorials
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Jump to the most commonly needed quick start guides
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "First Document",
                  description: "Create your first doc in 2 minutes",
                  icon: "📝",
                  url: "/tutorial/create-document",
                  color: "bg-blue-500",
                  time: "2 min",
                },
                {
                  title: "Team Setup",
                  description: "Invite and manage team members",
                  icon: "👥",
                  url: "/tutorial/invite-team",
                  color: "bg-green-500",
                  time: "3 min",
                },
                {
                  title: "Publishing",
                  description: "Publish and share your docs",
                  icon: "🌐",
                  url: "/tutorial/publish-settings",
                  color: "bg-purple-500",
                  time: "2 min",
                },
                {
                  title: "Templates",
                  description: "Use pre-built templates",
                  icon: "🎨",
                  url: "/tutorial/custom-templates",
                  color: "bg-orange-500",
                  time: "4 min",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-white rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mb-3 flex-grow">
                      {item.description}
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {item.time}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Start Documenting?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Complete this quick start tutorial and you'll be creating
                  professional documentation in no time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/tutorial/create-account"
                    className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Start First Tutorial
                  </Link>
                  <Link
                    to="/support"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Explore Full Documentation
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Need Help Along the Way?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
                  Our support team is here to help you succeed with SecureDocs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@securedocs.com"
                    className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center justify-center text-base sm:text-lg"
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email Support
                  </a>
                  <Link
                    to="/support/chat"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors inline-flex items-center justify-center text-base sm:text-lg"
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Live Chat
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default QuickStartTutorial;
