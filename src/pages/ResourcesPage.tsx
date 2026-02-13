import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import { downloadResource } from "../utils/downloadUtils";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/Toast";

export default function ResourcesPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("resources")} />
      <ResourcesPageContent />
    </>
  );
}

function ResourcesPageContent() {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();

  // Handle URL parameters to auto-select category
  useEffect(() => {
    const urlType = searchParams.get("type")?.toLowerCase();
    if (urlType) {
      if (urlType === "documentation" || urlType === "docs") {
        setActiveCategory("technical");
      } else if (urlType === "case-studies" || urlType === "cases") {
        setActiveCategory("enterprise");
      } else if (urlType === "compliance") {
        setActiveCategory("compliance");
      } else if (urlType === "whitepapers" || urlType === "papers") {
        setActiveCategory("whitepaper");
      } else if (urlType === "guides") {
        setActiveCategory("itad");
      }
    }
  }, [searchParams]);

  // Helper: Flaticon-style SVG Icons
  const getIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "enterprise":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
      case "itad":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "technical":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        );
      case "business":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
      case "whitepaper":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "case-study":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "report":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "tool":
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2m0 0h14m-14 0a2 2 0 002 2v2a2 2 0 01-2 2"
            />
          </svg>
        );
    }
  };

  const resources = [
    {
      id: 1,
      title: "NIST 800-88 Compliance Guide",
      type: "whitepaper",
      category: "compliance",
      description:
        "Comprehensive guide to implementing NIST 800-88 Rev. 1 standards with D-Secure solutions.",
      downloadSize: "2.4 MB",
      pages: 28,
      featured: true,
      referenceUrl:
        "https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final",
    },
    {
      id: 2,
      title: "Enterprise Data Sanitization Case Study",
      type: "case-study",
      category: "enterprise",
      description:
        "How a Fortune 500 company reduced IT refresh cycle time by 60% while maintaining 100% compliance.",
      downloadSize: "1.8 MB",
      pages: 12,
      featured: true,
      referenceUrl: "https://www.sans.org/white-papers/1907/",
    },
    {
      id: 4,
      title: "HIPAA Compliance in Healthcare",
      type: "whitepaper",
      category: "compliance",
      description:
        "Best practices for healthcare organizations to maintain HIPAA compliance during device disposal.",
      downloadSize: "2.1 MB",
      pages: 22,
      featured: false,
      referenceUrl:
        "https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity/index.html",
    },
    {
      id: 5,
      title: "ITAD Workflow Optimization",
      type: "guide",
      category: "itad",
      description:
        "Step-by-step guide to optimizing IT Asset Disposition workflows for maximum efficiency.",
      downloadSize: "1.9 MB",
      pages: 18,
      featured: false,
      referenceUrl: "https://www.itassetmanagement.net/best-practices/",
    },
    {
      id: 6,
      title: "Cloud Data Erasure Best Practices",
      type: "whitepaper",
      category: "technical",
      description:
        "Advanced techniques for secure data sanitization in multi-cloud environments.",
      downloadSize: "2.7 MB",
      pages: 31,
      featured: true,
      referenceUrl:
        "https://aws.amazon.com/blogs/security/how-to-securely-destroy-data-stored-on-aws/",
    },
    {
      id: 7,
      title: "Financial Services Compliance Report",
      type: "report",
      category: "compliance",
      description:
        "Industry analysis of data protection requirements for financial institutions.",
      downloadSize: "1.5 MB",
      pages: 15,
      featured: false,
      referenceUrl:
        "https://www.finra.org/rules-guidance/guidance/reports/2022-report-examination-findings",
    },
    {
      id: 8,
      title: "ROI Calculator & Business Case",
      type: "tool",
      category: "business",
      description:
        "Interactive tool to calculate ROI and build business case for data sanitization projects.",
      downloadSize: "0.8 MB",
      pages: 8,
      featured: false,
      referenceUrl:
        "https://www.gartner.com/en/information-technology/insights/it-asset-disposition",
    },
    {
      id: 9,
      title: "Security Architecture Whitepaper",
      type: "whitepaper",
      category: "technical",
      description:
        "Deep dive into D-Secure's security architecture and cryptographic implementations.",
      downloadSize: "3.5 MB",
      pages: 38,
      featured: false,
      referenceUrl:
        "https://owasp.org/www-project-application-security-architecture/",
    },
  ];

  const categories = [
    { id: "all", name: "All Resources", count: resources.length },
    {
      id: "compliance",
      name: "Compliance",
      count: resources.filter((r) => r.category === "compliance").length,
    },
    {
      id: "technical",
      name: "Technical",
      count: resources.filter((r) => r.category === "technical").length,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      count: resources.filter((r) => r.category === "enterprise").length,
    },
    {
      id: "itad",
      name: "ITAD",
      count: resources.filter((r) => r.category === "itad").length,
    },
    {
      id: "business",
      name: "Business",
      count: resources.filter((r) => r.category === "business").length,
    },
  ];

  // Enhanced search functionality for entire page content
  const pageContentKeywords = [
    "knowledge center",
    "resources",
    "comprehensive guides",
    "whitepapers",
    "case studies",
    "webinars",
    "technical documentation",
    "data sanitization",
    "compliance",
    "security",
    "enterprise",
    "business intelligence",
    "ITAD",
    "asset management",
    "featured resources",
    "resource library",
    "documentation hub",
    "implementation stories",
    "best practices",
    "industry trends",
    "market analysis",
    "audit guides",
    "API documentation",
    "developer resources",
    "success metrics",
    "ROI analysis",
    "deployment strategies",
  ];

  // Check if search term matches page content
  const searchMatchesPageContent = (searchTerm: string) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      pageContentKeywords.some((keyword) => keyword.includes(term)) ||
      term === "all" ||
      term === "everything" ||
      term === "content"
    );
  };

  // Enhanced resource filtering
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.referenceUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchMatchesPageContent(searchTerm);
    return matchesCategory && matchesSearch;
  });

  // Filter featured resources based on search
  const featuredResources = resources.filter((r) => r.featured);
  const filteredFeaturedResources = featuredResources.filter((resource) => {
    if (searchTerm === "") return true;
    const term = searchTerm.toLowerCase();
    return (
      resource.title.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term) ||
      resource.category.toLowerCase().includes(term) ||
      resource.type.toLowerCase().includes(term) ||
      searchMatchesPageContent(searchTerm)
    );
  });

  // Show/hide sections based on search relevance
  const shouldShowSection = (sectionType: string) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    switch (sectionType) {
      case "categories":
        return (
          term.includes("categor") ||
          term.includes("browse") ||
          term.includes("compliance") ||
          term.includes("technical") ||
          term.includes("enterprise") ||
          term.includes("business") ||
          term.includes("itad") ||
          searchMatchesPageContent(searchTerm)
        );

      case "featured":
        return (
          term.includes("featured") ||
          term.includes("popular") ||
          term.includes("comprehensive") ||
          filteredFeaturedResources.length > 0 ||
          searchMatchesPageContent(searchTerm)
        );

      case "resources":
        return (
          filteredResources.length > 0 || searchMatchesPageContent(searchTerm)
        );

      default:
        return searchMatchesPageContent(searchTerm);
    }
  };

  const webinars = [
    {
      title: "Data Sanitization in the Cloud Era",
      speaker: "Dr. Sarah Chen, Chief Security Officer",
      description:
        "Learn advanced techniques for secure data erasure in hybrid and multi-cloud environments.",
      status: "upcoming",
      type: "future",
    },
    {
      title: "NIST 800-88 Implementation Guide",
      speaker: "Michael Rodriguez, Compliance Director",
      description:
        "Overview of the latest NIST guidelines and how to implement them in your organization.",
      status: "upcoming",
      type: "future",
    },
    {
      title: "Enterprise Scale Data Sanitization",
      speaker: "James Wilson, Solutions Architect",
      description:
        "Best practices for managing large-scale data sanitization projects.",
      status: "upcoming",
      type: "future",
    },
    {
      title: "Advanced Compliance Frameworks",
      speaker: "Lisa Anderson, Compliance Expert",
      description:
        "Deep dive into GDPR, HIPAA, and SOX compliance requirements for data sanitization.",
      status: "upcoming",
      type: "future",
    },
    {
      title: "File Security & Erasure",
      speaker: "David Park, Security Specialist",
      description:
        "Comprehensive drive and file data protection and secure erasure strategies.",
      status: "upcoming",
      type: "future",
    },
    {
      title: "Cloud Storage Security Best Practices",
      speaker: "Rachel Martinez, Cloud Architect",
      description:
        "Securing data across multiple cloud platforms with proper erasure techniques.",
      status: "upcoming",
      type: "future",
    },
  ];

  // Enhanced webinar filtering with page content matching
  const filteredWebinars = webinars.filter((webinar) => {
    if (searchTerm === "") return true;
    const term = searchTerm.toLowerCase();
    return (
      webinar.title.toLowerCase().includes(term) ||
      webinar.description.toLowerCase().includes(term) ||
      webinar.speaker.toLowerCase().includes(term) ||
      webinar.type.toLowerCase().includes(term) ||
      webinar.status.toLowerCase().includes(term) ||
      searchMatchesPageContent(searchTerm) ||
      term.includes("webinar") ||
      term.includes("session") ||
      term.includes("live") ||
      term.includes("upcoming") ||
      term.includes("future")
    );
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <div className="container-responsive py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Knowledge Center & Resources
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Access comprehensive guides, whitepapers, case studies,
                webinars, and technical documentation to maximize your data
                sanitization success. Search across all content and reference
                links.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search resources, webinars, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      {shouldShowSection("categories") && (
        <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-teal-50/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="container-responsive relative z-10">
            <div className="text-center mb-16">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2m0 0h14m-14 0a2 2 0 002 2v2a2 2 0 01-2 2"
                    />
                  </svg>
                  Resource Categories
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Comprehensive Knowledge
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                    Resource Library
                  </span>
                </h2>
              </Reveal>
              <Reveal delayMs={10}>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Access our expertly curated collection of resources, designed
                  to help you navigate data security challenges with confidence
                  and expertise.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <Reveal delayMs={10}>
                <Link
                  to="/resources/documentation"
                  className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-blue-300/50 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/25">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full opacity-75"></div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      Technical Documentation
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Comprehensive user guides, implementation documentation,
                      and quick-start resources for administrators.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
                        Explore Documentation
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        15+ Guides
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
              <Reveal delayMs={20}>
                <Link
                  to="/resources/case-studies"
                  className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-green-300/50 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-green-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-green-500/25">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full opacity-75"></div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      Customer Success Stories
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Real-world case studies showcasing implementation success
                      and measurable ROI outcomes.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 text-sm font-semibold group-hover:text-green-700 transition-colors">
                        View Case Studies
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        8 Studies
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
              <Reveal delayMs={30}>
                <Link
                  to="/resources/compliance"
                  className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-purple-300/50 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/25">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-300 rounded-full opacity-75"></div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      Compliance Frameworks
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Navigate GDPR, HIPAA, PCI DSS, and SOX requirements with
                      our detailed compliance guides.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-purple-600 text-sm font-semibold group-hover:text-purple-700 transition-colors">
                        Browse Compliance
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        12 Frameworks
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
              <Reveal delayMs={40}>
                <Link
                  to="/resources/whitepapers"
                  className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-orange-300/50 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-orange-500/25">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-300 rounded-full opacity-75"></div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      Research Whitepapers
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      In-depth research, industry analysis, and technical
                      insights on data security trends.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:text-orange-700 transition-colors">
                        Read Whitepapers
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        25+ Papers
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
            <Reveal delayMs={50}>
              <div className="mt-16 pt-12 border-t border-slate-200/60">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">
                      500+
                    </div>
                    <div className="text-sm text-slate-600">
                      Total Resources
                    </div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                      50k+
                    </div>
                    <div className="text-sm text-slate-600">Downloads</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                      98%
                    </div>
                    <div className="text-sm text-slate-600">
                      Satisfaction Rate
                    </div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                      24/7
                    </div>
                    <div className="text-sm text-slate-600">
                      Access Available
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Featured Resources */}
      {shouldShowSection("featured") && (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Featured Resources
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our most popular and comprehensive resources to get you started.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredFeaturedResources.map((resource, i) => (
                <Reveal key={resource.id} delayMs={i * 100}>
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>{getIcon(resource.category)}</div>
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span>{resource.pages} pages</span>
                        <span>{resource.downloadSize}</span>
                        <span className="capitalize">{resource.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const ok = downloadResource(resource);
                            if (ok)
                              toast.showToast(
                                `Downloaded: ${resource.title}`,
                                "success"
                              );
                            else
                              toast.showToast(
                                "Download failed. Please try again.",
                                "error"
                              );
                          }}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm inline-flex items-center justify-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
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
                          Download
                        </button>
                        <a
                          href={resource.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm inline-flex items-center justify-center"
                          title="View Reference"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources */}
      {shouldShowSection("resources") && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                All Resources
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our complete library of resources by category.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {category.name}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === category.id
                        ? "bg-teal-400 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, i) => (
                <Reveal key={resource.id} delayMs={i * 50}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>{getIcon(resource.category)}</div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.type === "whitepaper"
                            ? "bg-blue-100 text-blue-700"
                            : resource.type === "case-study"
                            ? "bg-green-100 text-green-700"
                            : resource.type === "documentation"
                            ? "bg-purple-100 text-purple-700"
                            : resource.type === "guide"
                            ? "bg-orange-100 text-orange-700"
                            : resource.type === "report"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>{resource.pages} pages</span>
                      <span>{resource.downloadSize}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const ok = downloadResource(resource);
                          if (ok)
                            toast.showToast(
                              `Downloaded: ${resource.title}`,
                              "success"
                            );
                          else
                            toast.showToast(
                              "Download failed. Please try again.",
                              "error"
                            );
                        }}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-xs inline-flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
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
                        Download
                      </button>
                      <a
                        href={resource.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-xs inline-flex items-center justify-center"
                        title="View Reference"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 text-slate-400 mx-auto mb-4">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No resources found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Webinars Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Webinars & Events
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join our experts for live discussions on data sanitization best
              practices and industry trends.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredWebinars.map((webinar, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        webinar.status === "upcoming"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {webinar.status === "upcoming"
                        ? "Upcoming"
                        : "Recording Available"}
                    </span>
                    <div className="w-6 h-6 text-slate-700">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.59-4.59a2 2 0 012.83 2.83L18 13l4.59 4.59a2 2 0 01-2.83 2.83L15 18l-4.59 4.59a2 2 0 01-2.83-2.83L12 15l-4.59 4.59a2 2 0 01-2.83-2.83L9 13l-4.59-4.59a2 2 0 012.83-2.83L12 10z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">
                    {webinar.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {webinar.description}
                  </p>
                  <div className="space-y-2 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Coming Soon - Stay Tuned
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {webinar.speaker}
                    </div>
                  </div>
                  <button
                    disabled
                    className="w-full text-sm font-medium py-2 px-4 rounded-lg transition-colors inline-block text-center bg-blue-100 text-blue-600 cursor-not-allowed"
                  >
                    Register Soon - Coming Soon
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          {filteredWebinars.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="w-12 h-12 text-slate-400 mx-auto mb-4">
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.59-4.59a2 2 0 012.83 2.83L18 13l4.59 4.59a2 2 0 01-2.83 2.83L15 18l-4.59 4.59a2 2 0 01-2.83-2.83L12 15l-4.59 4.59a2 2 0 01-2.83-2.83L9 13l-4.59-4.59a2 2 0 012.83-2.83L12 10z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No webinars found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search terms to find relevant webinars.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Support Section */}
      {/* <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Need Additional Support?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delayMs={10}>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200/60">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                </div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Live Chat Support
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Get instant help from our technical experts
                </p>
                <button className="btn-primary text-sm">
                  <Link to="/contact">Start Chat</Link>
                </button>
              </div>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200/60">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Email Support</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Detailed responses within 24 hours
                </p>
                <button className="btn-secondary text-sm">
                  <Link to="/contact">Contact Support</Link>
                </button>
              </div>
            </Reveal>
            <Reveal delayMs={30}>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-slate-200/60">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Training Services
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Comprehensive training programs for your team
                </p>
                <button className="btn-secondary text-sm">
                  <Link to="/training">Learn More</Link>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section> */}
    </>
  );
}
