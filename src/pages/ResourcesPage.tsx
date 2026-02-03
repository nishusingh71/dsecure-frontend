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
      case "blog":
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
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
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
    // Blog Posts
    {
      id: 10,
      title: "D-Secure File Eraser Manual",
      type: "blog",
      category: "blog",
      description:
        "Complete user manual for D-Secure File Eraser. Installation, configuration, and operational instructions for secure file deletion.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/support/help-manual/complete-manual",
      author: "Nitesh Kushwaha",
      date: "October 15, 2024"
    },
    {
      id: 11,
      title: "Securely Erasing SSDs & NVMe Drives",
      type: "blog",
      category: "blog",
      description:
        "Why traditional wiping methods fail on SSDs. Exploring command-based erasure, cryptographic sanitization, and handling wear leveling.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/blog/ssd-wipe-guide",
      author: "Nitish",
      date: "October 22, 2024"
    },
    {
      id: 12,
      title: "Erasure vs. Physical Destruction: ROI Analysis",
      type: "blog",
      category: "blog",
      description:
        "A comparative analysis of value retention. How secure erasure allows for asset remarketing and ESG compliance, compared to the total loss of value with physical destruction.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: true,
      referenceUrl: "/blog/erasure-vs-destruction",
      author: "Nitesh Kushwaha",
      date: "November 5, 2024"
    },
    {
      id: 13,
      title: "Debunking 5 Critical Data Deletion Myths",
      type: "blog",
      category: "blog",
      description:
        "Formatting is not erasure. We expose common misconceptions that leave organizations vulnerable to data breaches and regulatory fines.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/data-deletion-myths",
      author: "Nitish",
      date: "November 12, 2024"
    },
    {
      id: 14,
      title: "Navigating Global Data Compliance Standards",
      type: "blog",
      category: "blog",
      description:
        "Essential guide to matching your sanitization protocols with GDPR, HIPAA, SOX, and ISO/IEC 27001 requirements for audit-proof security.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/data-sanitization-compliance",
      author: "Nitish",
      date: "November 19, 2024"
    },
    {
      id: 15,
      title: "Best Data Erasure Method for Any Storage Media Type",
      type: "blog",
      category: "blog",
      description:
        "One size does not fit all. Learn the correct erasure standard for HDDs, SSDs, and Mobile devices to ensure compliance.",
      downloadSize: "N/A",
      pages: "1 min read",
      featured: false,
      referenceUrl: "/blog/best-data-erasure-methods",
      author: "Prashant Saini",
      date: "December 03, 2024"
    },
  ];

  const categories = [
    { id: "all", name: "All Blog Articles", count: resources.filter((r) => r.type === "blog").length },
    {
      id: "blog",
      name: "Blog Articles",
      count: resources.filter((r) => r.category === "blog").length,
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

  // Enhanced resource filtering - only show blogs
  const filteredResources = resources.filter((resource) => {
    const isBlogs = resource.type === "blog";
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
    return isBlogs && matchesCategory && matchesSearch;
  });

  // Filter featured resources based on search - only show blogs
  const featuredResources = resources.filter((r) => r.featured && r.type === "blog");
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
                Blog & Insights Hub
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Explore our latest insights, expert perspectives, and industry
                trends through our comprehensive blog articles. Stay updated with
                data security best practices and emerging technologies.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Reveal delayMs={15}>
                <Link
                  to="/blog"
                  className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-rose-300/50 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-transparent to-rose-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-rose-500/25">
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-300 rounded-full opacity-75"></div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
                      Industry Insights & Blog
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Stay updated with the latest trends, expert insights, and
                      best practices in data sanitization and security.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-rose-600 text-sm font-semibold group-hover:text-rose-700 transition-colors">
                        Read Latest Articles
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
                        Weekly Updates
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
            {/* <Reveal delayMs={50}>
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
            </Reveal> */}
          </div>
        </section>
      )}

      {/* Featured Resources */}
      {shouldShowSection("featured") && (
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Featured Blog Articles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our most popular and insightful blog articles to keep you informed.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredFeaturedResources.map((resource, i) => (
                <Reveal key={resource.id} delayMs={i * 100}>
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div>{getIcon(resource.category)}</div>
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 flex-grow">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <span>{resource.pages}</span>
                        <span className="capitalize">{resource.type}</span>
                      </div>
                      <div className="mt-auto">
                        <Link
                          to={resource.referenceUrl}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm inline-flex items-center justify-center"
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          Read Article
                        </Link>
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
                All Blog Articles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our complete library of blog articles and insights.
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
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
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
                            : resource.type === "blog"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-xs mb-4 leading-relaxed flex-grow">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>{resource.pages}</span>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={resource.referenceUrl}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-xs inline-flex items-center justify-center"
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        Read Article
                      </Link>

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
      
    </>
  );
}
