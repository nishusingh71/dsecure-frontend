import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  LightningIcon,
  ServerIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import {
  CpuIcon,
  FileTextIcon,
  LockIcon,
  RefreshCwIcon,
  SettingsIcon,
  User,
} from "lucide-react";
import { title } from "process";
import { blogPosts } from "@/data/blogPosts";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const DriveEraserPage: React.FC = memo(function FileEraserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sectionNavItems = [
    { id: "erase-types", label: "Erase Types" },
    { id: "demo", label: "Demo" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "blogs", label: "Blogs" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show nav after scrolling past hero section (approx 400px)
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      // Only dispatch event to hide/show main navbar on desktop (md+) screens
      // since sticky nav is hidden on mobile
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      // Find current active section
      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Reset main navbar visibility on unmount (only on desktop)
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const eraseTypes = [
    {
      name: "PC & Laptops",
      desc: "Certified data wiping for Windows, Mac, and Linux computers. Permanent erasure with tamper-proof certificates for audit compliance.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Servers & RAID Arrays",
      desc: "Secure erasure for enterprise servers and RAID configurations. DIY solution that generates certificates meeting global standards like GDPR, HIPAA, and ISO 27001.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      color: "from-red-500 to-red-600",
    },
    {
      name: "SSDs & NVMe Drives",
      desc: "Specialized erasure for solid-state storage ensuring complete data destruction. Deploy via bootable USB or PXE network boot for maximum flexibility.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "HDDs & External Drives",
      desc: "Permanent erasure for traditional hard drives and USB storage. Software supports remote deployment via MSI and provides audit trail for compliance reporting.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      color: "from-teal-500 to-teal-600",
    },
  ];

  const platforms = [
    {
      name: "Windows",
      versions: "Arch64 (x64) and x86 (64-bit) and ARM64 (ARM)",
      features: [
        "Desktop & Laptop Support",
        "Server Edition Available",
        "Active Directory Integration",
        "Group Policy Support",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "macOS",
      versions: "Arch64 (x64) and x86 (64-bit) and ARM64 (ARM), Intel (x64)",
      features: [
        "Intel & Apple Silicon",
        "Full Disk Access",
        "T2/M1/M2/M3 Chip Support",
        "Native Performance",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Linux",
      versions: "Arch64 (x64) and x86 (64-bit) and ARM64 (ARM)",
      features: [
        "CLI & GUI Options",
        "Kernel Level Erasure",
        "Enterprise Distros",
        "Headless Server Mode",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.072-.2-.052-.334.033-.466.204-.263.466-.399.795-.528.396-.2.762-.269 1.139-.268h.13zm4.006 2.933c-.009.04-.009.037-.012.071-.075.443-.134.8-.166 1.2-.028.332-.043.663-.044.998l.003.467.004.073.009.135.003.2.016.267c.09.333.15.6.313.8.082.103.17.2.27.27.136.07.272.135.41.135.074 0 .15-.015.223-.04.31-.112.48-.332.618-.59.109-.202.17-.403.217-.598.04-.195.067-.39.08-.545.031-.4.049-.664.049-.664l-.003-.402-.01-.267-.014-.202c-.012-.133-.03-.266-.053-.397v-.003L13 9.4v-.003l-.048-.2h.003l.025.003c-.038-.007-.077-.01-.116-.02-.062-.01-.124-.029-.184-.04z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Secure Drive Erasure",
      desc: "NIST-tested software delivers erasure with  data destruction guarantee for all storage types.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "Cloud Console",
      desc: "Centralized management platform for monitoring, reporting, and managing erasure tasks across all locations.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Supports Global Wiping Standards",
      desc: "26+ international erasure standards including NIST 800-88, DoD, HMG.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: "Multiple Deployment Solutions",
      desc: "Deploy via USB boot, PXE network boot, or integrate directly with IT asset management systems.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "ERP Integration",
      desc: "Seamlessly integrate with all enterprise systems via REST APIs.",
      icon: <FileTextIcon className="w-6 h-6" />,
    },
    {
      title: "Simultaneous Data Wiping",
      desc: "enables efficient large-scale data destruction, eliminating the need for manual data wiping processes.",
      icon: <RefreshCwIcon className="w-6 h-6" />,
    },
    {
      title: "Automatic & MDM Detection",
      desc: "Automatically detect hardware specifications, MDM profiles, and activation locks before erasure.",
      icon: <CpuIcon className="w-6 h-6" />,
    },
    {
      title: "License Don't Expire",
      desc: "Pay-per-use licensing model with no expiration - use credits whenever you need them.",
      icon: <LockIcon className="w-6 h-6" />,
    },
  ];

  const useCases = [
    {
      title: "Disposal of RAID Servers",
      desc: "Securely erase enterprise RAID arrays before disposal, and private data cannot be recovered.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "IT Asset Redeployment",
      desc: "Safely repurpose hardware within organization",
      icon: <ServerIcon className="w-8 h-8" />,
    },
    {
      title: "Device Recycling & Resale",
      desc: "Prepare devices for resale programs",
      icon: <RefreshCwIcon className="w-8 h-8" />,
    },
    {
      title: "End-of-Lease IT Hardware",
      desc: "Comply with lease return data requirements",
      icon: <User className="w-8 h-8" />,
    },
    {
      title: "Regulatory Compliance",
      desc: "Meet GDPR, HIPAA, PCI-DSS requirements",
      icon: <GlobeIcon className="w-8 h-8" />,
    },
    {
      title: "Cloud Migration Projects",
      desc: "Securely decommission on-premise storage",
      icon: <GlobeIcon className="w-8 h-8" />,
    },
  ];

  const complianceStandards = [
    { name: "NIST 800-88", desc: "US National Institute of Standards" },
    { name: "DoD 5220.22-M", desc: "US Department of Defense" },
    { name: "GDPR", desc: "EU General Data Protection" },
    { name: "HIPAA", desc: "Healthcare Information Privacy" },
    { name: "SOX", desc: "Sarbanes-Oxley Act" },
    { name: "PCI-DSS", desc: "Payment Card Industry" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const relatedBlogs = blogPosts
    .filter((post) =>
      [
        "overwrite-guide",
        "ssd-wipe-guide",
        "data-deletion-myths",
        "best-data-erasure-methods",
      ].includes(post.id),
    )
    .slice(0, 4);

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "/downloads/D-Secure-file-eraser-catalog.pdf";
    link.download = "D-Secure-File-Eraser-Catalog.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Insights/Resources
  const insights = [
    {
      type: "Blog",
      title: "NIST 800-88 Explained: Complete Guide",
      icon: () => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      type: "Technical Article",
      title: "SSD vs HDD Erasure Methods",
      icon: () => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h.01M9 12h.01M9 15h.01M15 9h.01M15 12h.01M15 15h.01" />
        </svg>
      ),
    },
    {
      type: "Knowledge Base",
      title: "Deployment Best Practices",
      icon: GlobeIcon,
    },
    {
      type: "Product Video",
      title: "Drive Eraser Demo",
      icon: () => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
        </svg>
      ),
    },
  ];
  return (
    <>
      <SEOHead
        seo={{
          title:
            "D-Secure Drive Eraser | Secure File & Folder Deletion Software",
          description:
            "Permanently erase files, folders, system traces, and cloud data with D-Secure Drive Eraser. NIST 800-88 compliant data destruction for privacy and security.",
          keywords:
            "Drive Eraser, secure delete, data destruction, file shredder, privacy software, NIST 800-88, GDPR compliance",
          canonicalUrl: "https://dsecuretech.com/services/file-eraser",
        }}
      />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link to="/" className="flex items-center">
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* ================= HERO SECTION ================= */}
        <section className="py-16 lg:py-24 xl:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    Enterprise-Grade Drive Erasure
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Drive Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Permanently erase files, folders, system traces, and cloud
                    data using internationally recognized erasure standards.
                    Designed for privacy, security, and audit readiness.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "SOC 2"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="pricing-and-plan"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <HoverIcon>
                        {(filled) => (
                          <LightningIcon className="w-5 h-5" filled={filled} />
                        )}
                      </HoverIcon>
                      Upcoming
                    </Link>
                    <button
                      onClick={downloadCatalog}
                      disabled={true}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Comming soon Datasheet
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - 3D Product Box */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[280px] sm:min-h-[340px] lg:min-h-[480px] overflow-hidden"
                  style={{ perspective: "1200px" }}
                >
                  {/* Ambient Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 via-transparent to-teal-300/20 blur-3xl"></div>

                  {/* Floating Particles - hidden on very small screens */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
                    <div
                      className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-teal-400/50 rounded-full animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-emerald-300/40 rounded-full animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>

                  {/* Main 3D Container */}
                  <div
                    className="relative w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] lg:max-w-[400px] mx-auto transform-gpu"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "heroFloat 5s ease-in-out infinite",
                    }}
                  >
                    {/* Glow Effect Behind - smaller on mobile */}
                    <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 blur-2xl sm:blur-3xl rounded-full"></div>

                    {/* Main Hard Drive / Server Unit */}
                    <div
                      className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-5 lg:p-8 shadow-2xl border border-slate-700/50"
                      style={{
                        transform: "rotateY(-8deg) rotateX(5deg)",
                        boxShadow:
                          "0 25px 80px -20px rgba(16, 185, 129, 0.35), 0 10px 40px -10px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {/* Top Status Bar */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                          <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                            Active
                          </span>
                        </div>
                        <div className="flex gap-1 sm:gap-1.5">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-emerald-500 rounded-full"></div>
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-teal-500 rounded-full"></div>
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-cyan-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Drive Visualization */}
                      <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-5 border border-slate-600/30 mb-3 sm:mb-4 lg:mb-6">
                        {/* Spinning Disk Animation */}
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 mx-auto">
                          {/* Outer Ring */}
                          <div
                            className="absolute inset-0 rounded-full border-2 sm:border-4 border-slate-600/50"
                            style={{ animation: "spinDisk 3s linear infinite" }}
                          >
                            <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border border-slate-500/30"></div>
                            <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800"></div>
                          </div>

                          {/* Center Hub */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                              <ShieldIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                            </div>
                          </div>

                          {/* Erasure Progress Ring */}
                          <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="rgba(100,116,139,0.3)"
                              strokeWidth="3"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="url(#progressGradient)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray="283"
                              strokeDashoffset="70"
                              style={{
                                animation:
                                  "progressPulse 2s ease-in-out infinite",
                              }}
                            />
                            <defs>
                              <linearGradient
                                id="progressGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#14b8a6" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>

                        {/* Erasure Status Text */}
                        <div className="text-center mt-2 sm:mt-3 lg:mt-4">
                          <p className="text-emerald-400 font-bold text-xs sm:text-sm lg:text-lg">
                            Drive Eraser
                          </p>
                        </div>
                      </div>

                      {/* Bottom Info Panel - Hidden on very small screens */}
                      <div className="hidden sm:grid grid-cols-3 gap-2 sm:gap-3">
                        {/* <div className="bg-slate-800/60 rounded-lg p-2 sm:p-3 text-center border border-slate-700/30">
                          <p className="text-emerald-400 font-bold text-xs sm:text-sm lg:text-base">26+</p>
                          <p className="text-slate-500 text-[8px] sm:text-[9px] lg:text-[10px] uppercase">Standards</p>
                        </div> */}
                        {/* <div className="bg-slate-800/60 rounded-lg p-2 sm:p-3 text-center border border-slate-700/30">
                          <p className="text-teal-400 font-bold text-xs sm:text-sm lg:text-base">100%</p>
                          <p className="text-slate-500 text-[8px] sm:text-[9px] lg:text-[10px] uppercase">Verified</p>
                        </div>
                        <div className="bg-slate-800/60 rounded-lg p-2 sm:p-3 text-center border border-slate-700/30">
                          <p className="text-cyan-400 font-bold text-xs sm:text-sm lg:text-base">∞</p>
                          <p className="text-slate-500 text-[8px] sm:text-[9px] lg:text-[10px] uppercase">License</p>
                        </div> */}
                      </div>

                      {/* Branding Footer */}
                      <div className="mt-2 sm:mt-4 lg:mt-5 pt-2 sm:pt-3 lg:pt-4 border-t border-slate-700/30 flex items-center justify-between">
                        <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[9px] tracking-widest uppercase">
                          D-Secure™
                        </span>
                        <span className="text-slate-600 text-[6px] sm:text-[7px] lg:text-[8px] tracking-wider">
                          Drive Eraser Pro
                        </span>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute -top-1 -right-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 overflow-hidden rounded-tr-xl sm:rounded-tr-2xl lg:rounded-tr-3xl">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/20 to-transparent"></div>
                      </div>
                    </div>

                    {/* 3D Side Panel - smaller on mobile */}
                    <div
                      className="absolute top-1 -right-1 sm:top-2 sm:-right-2 lg:top-4 lg:-right-4 w-2 sm:w-3 lg:w-5 h-[calc(100%-8px)] sm:h-[calc(100%-16px)] lg:h-[calc(100%-32px)] bg-gradient-to-b from-slate-700 to-slate-800 rounded-r-md sm:rounded-r-lg"
                      style={{
                        transform: "rotateY(75deg)",
                        transformOrigin: "left center",
                      }}
                    ></div>

                    {/* Reflection - smaller on mobile */}
                    <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-1/2 -translate-x-1/2 w-3/4 sm:w-4/5 h-4 sm:h-6 lg:h-8 bg-gradient-to-t from-emerald-500/10 to-transparent blur-lg sm:blur-xl rounded-full"></div>
                  </div>

                  <style>{`
                    @keyframes heroFloat {
                      0%, 100% { transform: translateY(0px) rotateY(-8deg) rotateX(5deg); }
                      50% { transform: translateY(-12px) rotateY(-5deg) rotateX(3deg); }
                    }
                    @keyframes spinDisk {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    @keyframes progressPulse {
                      0%, 100% { stroke-dashoffset: 70; opacity: 1; }
                      50% { stroke-dashoffset: 50; opacity: 0.8; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= WHAT YOU CAN ERASE ================= */}
        <section id="erase-types" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  What You Can Erase
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive data destruction capabilities for all types of
                  sensitive information
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {eraseTypes.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 50}>
                  <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 min-h-[200px] sm:min-h-[250px] md:min-h-[280px] flex flex-col">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 flex-shrink-0">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-1 overflow-auto">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VIDEO SECTION ================= */}
        <section
                 id="demo"
                 className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-emerald-50"
               >
                 <div className="container mx-auto px-4 max-w-6xl">
                   <Reveal>
                     <div className="text-center mb-6 sm:mb-10">
                       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                         See Drive Eraser in Action
                       </h2>
                       <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                         Watch how D-Secure Drive Eraser permanently destroys sensitive
                         data with audit-ready documentation
                       </p>
                     </div>
                   </Reveal>
       
                   {/* Media Grid - 1 Video + 2 Screenshots */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {/* Main Video Card */}
                     <Reveal delayMs={100}>
                       <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                         {/* Video Thumbnail */}
                         <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                           {/* Replace VIDEO_THUMBNAIL_URL with actual thumbnail */}
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl cursor-pointer group-hover:scale-110 transition-transform">
                               <svg
                                 className="w-7 h-7 text-white ml-1"
                                 fill="currentColor"
                                 viewBox="0 0 24 24"
                               >
                                 <path d="M8 5v14l11-7z" />
                               </svg>
                             </div>
                           </div>
                           {/* Uncomment when video thumbnail ready: */}
                           {/* <img 
                             src="VIDEO_THUMBNAIL_URL" 
                             alt="File Eraser Demo" 
                             className="w-full h-full object-cover"
                           /> */}
                         </div>
                         {/* Video Info */}
                         <div className="p-5">
                           <div className="flex items-center gap-2 mb-2">
                             <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                               VIDEO
                             </span>
                             <span className="text-slate-400 text-xs">2:45</span>
                           </div>
                           <h3 className="font-bold text-slate-900 mb-1">
                             Product Demo
                           </h3>
                           <p className="text-sm text-slate-500">
                             Complete walkthrough of Drive Eraser features
                           </p>
                         </div>
                       </div>
                     </Reveal>
       
                     {/* Screenshot Cards Grid */}
                     <div className="grid grid-cols-2 gap-2 sm:gap-4">
                       {/* Screenshot 1 */}
                       <Reveal delayMs={150}>
                         <div
                           className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300"
                         >
                           <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative flex flex-col items-center justify-center">
                             <svg
                               className="w-8 h-8 text-slate-500 mb-2"
                               fill="none"
                               stroke="currentColor"
                               strokeWidth="1.5"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                               />
                             </svg>
                             <span className="text-slate-400 text-xs font-medium">Coming Soon</span>
                           </div>
                           {/* <div className="p-3 text-center">
                             <span className="text-xs font-medium text-slate-600">Dashboard View</span>
                           </div> */}
                         </div>
                       </Reveal>
       
                       {/* Screenshot 2 */}
                       <Reveal delayMs={200}>
                         <div
                           className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300"
                         >
                           <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative flex flex-col items-center justify-center">
                             <svg
                               className="w-8 h-8 text-slate-500 mb-2"
                               fill="none"
                               stroke="currentColor"
                               strokeWidth="1.5"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                               />
                             </svg>
                             <span className="text-slate-400 text-xs font-medium">Coming Soon</span>
                           </div>
                           {/* <div className="p-3 text-center">
                             <span className="text-xs font-medium text-slate-600">Erasure Report</span>
                           </div> */}
                         </div>
                       </Reveal>
       
                       {/* Screenshot 3 */}
                       <Reveal delayMs={250}>
                         <div
                           className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300"
                         >
                           <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative flex flex-col items-center justify-center">
                             <svg
                               className="w-8 h-8 text-slate-500 mb-2"
                               fill="none"
                               stroke="currentColor"
                               strokeWidth="1.5"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                               />
                             </svg>
                             <span className="text-slate-400 text-xs font-medium">Coming Soon</span>
                           </div>
                           {/* <div className="p-3 text-center">
                             <span className="text-xs font-medium text-slate-600">File Selection</span>
                           </div> */}
                         </div>
                       </Reveal>
       
                       {/* Screenshot 4 */}
                       <Reveal delayMs={300}>
                         <div
                           className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300"
                         >
                           <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative flex flex-col items-center justify-center">
                             <svg
                               className="w-8 h-8 text-slate-500 mb-2"
                               fill="none"
                               stroke="currentColor"
                               strokeWidth="1.5"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                               />
                             </svg>
                             <span className="text-slate-400 text-xs font-medium">Coming Soon</span>
                           </div>
                           {/* <div className="p-3 text-center">
                             <span className="text-xs font-medium text-slate-600">Erasure Progress</span>
                           </div> */}
                         </div>
                       </Reveal>
                     </div>
                   </div>
                 </div>
               </section>

        {/* ================= HOW IT WORKS (Help Manual) ================= */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <GearIcon className="w-4 h-4" />
                  Simple 4-Step Process
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  How To Use <span className="text-emerald-600">D-Secure</span>{" "}
                  Drive Eraser?
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Get started in minutes with our easy deployment options
                </p>
              </div>
            </Reveal>

            {/* Enhanced 4-Step Flow */}
            <Reveal delayMs={100}>
              <div className="relative max-w-5xl mx-auto">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 z-0"></div>
                
                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  
                  {/* Step 1: Download */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        1
                      </div>
                      {/* Icon */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">Download</h3>
                      <p className="text-sm text-slate-500">Get the software from our secure portal</p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg className="w-6 h-6 text-emerald-300 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Step 2: Deploy */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        2
                      </div>
                      {/* Icon */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100">
                        <CloudIcon className="w-8 h-8 text-emerald-600" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">Deploy</h3>
                      <p className="text-sm text-slate-500 mb-3">Multiple ways to deploy</p>
                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">USB ISO</span>
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">PXE Boot</span>
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">MSI</span>
                      </div>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg className="w-6 h-6 text-emerald-300 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Step 3: Erase */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        3
                      </div>
                      {/* Icon with overlapping shields */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100 relative">
                        <div className="flex -space-x-2">
                          <ShieldIcon className="w-6 h-6 text-emerald-600 relative z-10" />
                          <ShieldIcon className="w-6 h-6 text-emerald-400 relative z-0" />
                        </div>
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">Erase Devices</h3>
                      <p className="text-sm text-slate-500">Securely wipe multiple devices simultaneously</p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg className="w-6 h-6 text-emerald-300 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Step 4: Save Reports */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        4
                      </div>
                      {/* Icon with checkmark */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100 relative">
                        <FileTextIcon className="w-8 h-8 text-emerald-600" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">Save Reports</h3>
                      <p className="text-sm text-slate-500">Store erasure certificates on cloud</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Description Text */}
            <Reveal delayMs={200}>
              <div className="max-w-3xl mx-auto mt-12 text-center">
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">D-Secure Drive Eraser</strong> offers the flexibility to wipe drives and devices in both internet-enabled locations and offline facilities. Deploy via <strong className="text-emerald-600">USB drive</strong>, <strong className="text-emerald-600">PXE boot</strong> over network, or <strong className="text-emerald-600">MSI package</strong> for remote wiping on Windows endpoints.
                </p>
                <p className="text-sm text-slate-500 mt-4">
                  *Offline variant available for Non-Internet locations
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= COMPLIANCE STANDARDS ================= */}
        <section
          id="compliance"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Compliance-Ready by Design
                </h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  D-Secure Drive Eraser supports organizational compliance
                  initiatives by aligning with widely accepted data protection
                  principles and secure erasure best practices
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {complianceStandards.map((std, i) => (
                <Reveal key={std.name} delayMs={i * 50}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-5 text-center hover:bg-white/20 transition-colors border border-white/10 h-full flex flex-col items-center justify-start min-h-[130px] sm:min-h-[160px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base">{std.name}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">
                      {std.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MULTI-ARCHITECTURE SUPPORT ================= */}
        <section
          id="platforms"
          className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 to-teal-50"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Cross-Platform Native
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Multi-Architecture Support
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
                  Native performance across all major CPU architectures and operating systems
                </p>
              </div>
            </Reveal>

            {/* Architecture Cards */}
            <Reveal delayMs={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {/* x64 Architecture */}
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl shadow-lg">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-bl from-emerald-100 to-transparent rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">x64</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">AMD64 / Intel 64</h3>
                      <p className="text-xs sm:text-sm text-emerald-600">Most Common Architecture</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">Standard 64-bit processors from Intel & AMD used in most desktops, laptops, and servers.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">Intel Core</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">AMD Ryzen</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">Xeon</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">EPYC</span>
                  </div>
                </div>

                {/* ARM64 Architecture */}
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl shadow-lg">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-bl from-teal-100 to-transparent rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">ARM64</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">ARM64</h3>
                      <p className="text-xs sm:text-sm text-teal-600">Growing Ecosystem</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">Modern ARM-based processors for power-efficient computing on mobile, Mac, and servers.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">Apple Silicon</span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">Snapdragon</span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">Graviton</span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">Ampere</span>
                  </div>
                </div>

                {/* x86 Architecture */}
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl shadow-lg sm:col-span-2 md:col-span-1">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-bl from-cyan-100 to-transparent rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">x86</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">x86 (32-bit)</h3>
                      <p className="text-xs sm:text-sm text-cyan-600">Legacy Support</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">Legacy 32-bit processors for older systems still in enterprise use requiring secure erasure.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">Legacy Intel</span>
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">Pentium</span>
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">Atom</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* OS Compatibility Grid */}
            <Reveal delayMs={200}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">Operating System Compatibility</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Windows */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-blue-500 flex items-center justify-center bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Windows</h4>
                      <p className="text-xs text-slate-500">x64, ARM64, x86</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>

                  {/* macOS */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-slate-700 flex items-center justify-center bg-slate-100 rounded-lg sm:rounded-xl border border-slate-300">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">macOS</h4>
                      <p className="text-xs text-slate-500">x64, ARM64 (Apple Silicon)</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>

                  {/* Linux */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-yellow-600 flex items-center justify-center bg-yellow-50 rounded-lg sm:rounded-xl border border-yellow-200">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.117.779.456 1.456 1.003 1.959.508.466 1.17.77 1.924.888.75.12 1.56.083 2.4-.066.93-.164 1.88-.476 2.793-.873l.185-.078c.64-.27 1.29-.56 1.87-.9.574-.334 1.09-.704 1.5-1.128.406-.423.69-.907.815-1.463.124-.552.084-1.172-.128-1.863-.21-.688-.557-1.396-.99-2.112-.433-.718-.94-1.423-1.48-2.09-.107-.132-.218-.264-.33-.396.112-.134.225-.267.34-.4.56-.653 1.11-1.318 1.6-2.01.493-.694.92-1.414 1.23-2.173.156-.38.278-.77.353-1.172.074-.4.106-.815.08-1.244-.05-.857-.34-1.757-.9-2.524-.563-.773-1.376-1.39-2.338-1.77-.963-.38-2.058-.535-3.17-.478-.106.005-.21.015-.315.025V0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Linux</h4>
                      <p className="text-xs text-slate-500">x64, ARM64, x86</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-600">
                    <div className="flex gap-0.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    <span>All Architectures</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="flex gap-0.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                    <span>x64 & ARM64</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= KEY FEATURES ================= */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Powerful Features
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Enterprise-grade capabilities designed for security
                  professionals
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delayMs={i * 40}>
                  <div className="group bg-gradient-to-br from-slate-50 to-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 min-h-[180px] sm:min-h-[220px] flex flex-col">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section
          id="use-cases"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Use Cases
                </h2>
                <p className="text-lg text-slate-600">
                  Trusted by individuals and enterprises worldwide
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delayMs={i * 80}>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 min-h-[100px] flex flex-col">
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center flex-shrink-0">
                        {u.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {u.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed flex-1">
                          {u.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Everything you need to know about D-Secure Drive Eraser
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "How many drives can I erase at a time on one machine?",
                  a: "D-Secure Drive Eraser supports simultaneous erasure of up to 32 drives per machine, depending on your hardware configuration. For bulk operations, you can use our cloud console to manage multiple machines.",
                },
                {
                  q: "Does the software support Partition Deletion Wipe?",
                  a: "Yes, D-Secure supports partition-level erasure in addition to full drive erasure. You can selectively wipe specific partitions while keeping others intact.",
                },
                {
                  q: "Do I need Technical Skills?",
                  a: "No, D-Secure is designed with a user-friendly interface. Simply boot from USB, select your drive and erasure standard, and the software handles everything automatically.",
                },
                {
                  q: "Can I sign my file, like XML, jar file with my e-Signature?",
                  a: "Yes, D-Secure supports custom digital signatures for reports. You can integrate your organization's PKI for enhanced security.",
                },
                {
                  q: "Does D-Secure integrate with ServiceNow?",
                  a: "Yes, D-Secure offers native integration with ServiceNow via REST APIs. You can automatically update CMDB records and create incident tickets upon erasure completion.",
                },
                {
                  q: "Can I track separate Inventory for different types of Drives (SSD/HDD, Mobile, etc)?",
                  a: "Absolutely. The cloud console provides detailed categorization and filtering by device type, making it easy to track and report on different asset categories.",
                },
              ].map((faq, i) => (
                <Reveal key={i} delayMs={i * 50}>
                  <details className="group bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                    <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900 pr-3 sm:pr-4 text-sm sm:text-base">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-600 leading-relaxed text-sm sm:text-base">
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LATEST INSIGHTS & UPDATES ================= */}
        <section id="blogs" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                    Technical Blogs
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl">
                    Expert insights on data security, erasure standards, and
                    best practices
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
                >
                  View More
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedBlogs.map((blog, i) => (
                <Reveal key={blog.id} delayMs={i * 60}>
                  <Link to={blog.link} className="block group h-full">
                    <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {blog.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-emerald-600 font-semibold text-sm mb-4 group-hover:gap-2 gap-1 transition-all">
                        Read Article <ArrowRightIcon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">
                        <span>{blog.publishDate}</span>
                        <span>
                          {blog.readTime || getReadTime(blog.excerpt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY / CTA SECTION ================= */}
        <section id="contact" className="py-12 sm:py-20 lg:py-28 bg-white border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Talk to Our Data Security Experts
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get personalized guidance on deployment, licensing, and
                    audit-ready data erasure strategies tailored to your
                    organization's needs.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Enterprise & SMB licensing options",
                      "Compliance-focused implementation",
                      "White-label branding available",
                      "No-obligation consultation",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Or contact us directly
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Request Information
                  </h3>
                  <form className="space-y-5">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email *"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Organization"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default DriveEraserPage;
