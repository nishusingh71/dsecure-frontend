import React, { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
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
  Cpu,
  Cpu as CpuIcon,
  FileTextIcon,
  LockIcon,
  RefreshCwIcon,
  SettingsIcon,
  User,
  X,
  Battery,
  Wifi,
  AlertTriangle,
  Database,
  Volume2,
  Bluetooth,
  Heart,
  Activity,
} from "lucide-react";
import { title } from "process";
import { useToast } from "@/components/Toast";
import { blogPosts } from "@/data/blogPosts";
import { ENV } from "@/config/env";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const HardwareDiagnosticsPage: React.FC = memo(function FileEraserPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const demoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (demoContainerRef.current?.requestFullscreen) {
          await demoContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Gallery images array for lightbox navigation
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1715856402/diagnostics-hero.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417893/yhvioc1r2sgrjkpt4xnx.png",
      alt: "Hardware Diagnostics Screenshot 1",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417890/awgnvxwdwcli7oyhxuwa.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417890/awgnvxwdwcli7oyhxuwa.png",
      alt: "Hardware Diagnostics Screenshot 2",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417890/g7qsgoaib5aff4fz4lwp.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417890/g7qsgoaib5aff4fz4lwp.png",
      alt: "Hardware Diagnostics Screenshot 3",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417889/mbz29lvbnlqcgpftgtp2.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417889/mbz29lvbnlqcgpftgtp2.png",
      alt: "Hardware Diagnostics Screenshot 4",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417889/o4zgi0cowaixr9spcqkf.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417889/o4zgi0cowaixr9spcqkf.png",
      alt: "Hardware Diagnostics Screenshot 5",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417889/oijdo5wfz4n7zesrrudt.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417889/oijdo5wfz4n7zesrrudt.png",
      alt: "Hardware Diagnostics Screenshot 6",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417780/z30pqhpscxlo6dsbmmn3.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417780/z30pqhpscxlo6dsbmmn3.png",
      alt: "Hardware Diagnostics Screenshot 7",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417780/hpjvvebp5ya3beufhslh.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417780/hpjvvebp5ya3beufhslh.png",
      alt: "Hardware Diagnostics Screenshot 8",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417780/qoi3ucpunnzcaeu1ljw6.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417780/qoi3ucpunnzcaeu1ljw6.png",
      alt: "Hardware Diagnostics Screenshot 9",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417780/nbwo10x5ljj8lvnlve3z.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417780/nbwo10x5ljj8lvnlve3z.png",
      alt: "Hardware Diagnostics Screenshot 10",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417779/sxw62hblrclb96aqnfyj.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417779/sxw62hblrclb96aqnfyj.png",
      alt: "Hardware Diagnostics Screenshot 11",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417779/hk7tniwoqceef728iwep.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417779/hk7tniwoqceef728iwep.png",
      alt: "Hardware Diagnostics Screenshot 12",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417779/e7sdh1mazppjy3ikjrrz.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417779/e7sdh1mazppjy3ikjrrz.png",
      alt: "Hardware Diagnostics Screenshot 13",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417779/qn7dcrwd4iojztir1rxp.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417779/qn7dcrwd4iojztir1rxp.png",
      alt: "Hardware Diagnostics Screenshot 14",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772417779/cfolkopf9z9ogx8wnulz.png",
      thumbnail:
        "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto,w_400/v1772417779/cfolkopf9z9ogx8wnulz.png",
      alt: "Hardware Diagnostics Screenshot 15",
    },
  ];

  // Number of additional images beyond the 4th card (for "More" badge)
  const additionalImagesCount = galleryImages.length - 4;

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? galleryImages.length - 1
          : selectedImageIndex - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryImages.length - 1
          ? 0
          : selectedImageIndex + 1,
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

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

  const diagnosticsFeatures = [
    {
      name: "PC, Laptops & Mac",
      desc: "Simultaneously assess the health of multiple PCs, laptops, and MacBooks (Intel & Apple Silicon M1/M2/M3/M4). Identifies issues across all critical hardware layers.",
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
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "PXE Boot for Mass Diagnostics",
      desc: "Deploy diagnostics via PXE network boot to test up to 255 machines simultaneously. Ideal for high-volume ITAD facilities and large-scale asset audits.",
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
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Automated Component Tests",
      desc: "Run 10+ automated tests including CPU, Memory (RAM), Storage (SMART), Motherboard, Battery Health, CMOS, and Network interfaces without manual intervention.",
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
      name: "Manual Assessment & Grading",
      desc: "Perform 12+ guided manual tests for Keyboard, Touchpad, Webcam, Microphone, Audio, Display (Dead Pixels), and USB ports for comprehensive grading.",
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
  ];

  const platforms = [
    {
      name: "Apple Mac (Intel & Silicon)",
      versions: "Intel, T1, T2, M1, M2, M3, & M4 models",
      features: [
        "Terminal-based Deployment",
        "MDM Enrollment Detection",
        "Apple Silicon Native Support",
        "Battery Health & Cycle Count",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.06.75.79-.03 2.02-.8 3.41-.69 1.69.13 2.95.81 3.65 2.09-3.41 1.94-2.87 6.45.69 8.24-.65 1.63-1.6 3.19-2.81 4.58zM15 1.03c.02 0 .04 0 .06.01.04 4.09-4.23 4.29-4.27.05.01-2.12 1.13-4.08 2.76-4.99.7-.35 1.45-.53 2.22-.53-.13 1.83-.87 3.54-2.11 4.79C12.42 1.6 13.68 1.05 15 1.03z" />
        </svg>
      ),
    },
    {
      name: "Laptop & Desktops",
      versions: "All major OEM brands supported",
      features: [
        "Network Boot (PXE)",
        "USB Boot (UEFI/Legacy)",
        "Offline Diagnostics Mode",
        "Customizable ISO Support",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "Servers & Enterprise",
      versions: "Server-grade hardware & workstations",
      features: [
        "Simultaneous Multi-Machine",
        "Tamper-proof Report Logs",
        "Centralized Cloud Console",
        "ERP / API Integration",
      ],
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Diagnose & Grade Devices",
      desc: "Accurately diagnose all internal components and assign grades to IT assets based on health status and performance results.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "Mac-Native Diagnostics",
      desc: "Native diagnostic support for all Apple Mac devices including Intel, T1, T2, and Silicon (M1/M2/M3/M4) architectures.",
      icon: <RefreshCwIcon className="w-6 h-6" />,
    },
    {
      title: "MDM Enrollment Detection",
      desc: "Identify MDM-enrolled Mac devices to ensure accurate hardware diagnostics and compliant asset processing.",
      icon: <LockIcon className="w-6 h-6" />,
    },
    {
      title: "Cloud Console Support",
      desc: "Centralized management of users, licenses, and diagnostics reports. Access and export reports anytime from the cloud.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Tamper-proof Signed Reports",
      desc: "Generates secure, digitally signed hardware diagnostics reports in PDF, CSV, and XML formats to prevent data tampering.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: "PXE & Network Deployment",
      desc: "Deploy via PXE to diagnose up to 255 machines simultaneously. Supports UEFI and Legacy BIOS boot modes.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "Enterprise API Integration",
      desc: "Seamlessly integrate diagnostics data with ERP systems and organizational asset management tools via Cloud APIs.",
      icon: <FileTextIcon className="w-6 h-6" />,
    },
    {
      title: "ISO Standardized Tests",
      desc: "Create and customize ISOs to standardize test workflows across all devices, ensuring consistent quality control.",
      icon: <SettingsIcon className="w-6 h-6" />,
    },
    {
      title: "No-Expiry Licensing",
      desc: "Flexible pay-per-use licensing model. Diagnostic licenses do not expire and remain active until consumed.",
      icon: <LockIcon className="w-6 h-6" />,
    },
  ];

  const useCases = [
    {
      title: "Evaluate Used IT Assets",
      desc: "Get accurate insights into component functioning before repurposing used IT assets.",
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
      title: "Right to Repair",
      desc: "Identify faulty parts by testing device components that can then be repaired or replaced.",
      icon: <ServerIcon className="w-8 h-8" />,
    },
    {
      title: "Device Recycling & Resale",
      desc: "Obtain maximum residual value from old IT assets by ensuring peak performance.",
      icon: <RefreshCwIcon className="w-8 h-8" />,
    },
    {
      title: "ITAD & Refurbishers",
      desc: "Mass-diagnose incoming inventory efficiently through PXE network boot.",
      icon: <User className="w-8 h-8" />,
    },
    {
      title: "Meet Industry Standards",
      desc: "Maintain compliance with R2v3, e-Stewards, and other certification standards.",
      icon: <GlobeIcon className="w-8 h-8" />,
    },
    {
      title: "Standardize Quality Control",
      desc: "Use customizable ISOs to run consistent diagnostic tests across all processed devices.",
      icon: <GlobeIcon className="w-8 h-8" />,
    },
  ];

  const complianceStandards = [
    { name: "R2v3", desc: "Responsible Recycling standard" },
    { name: "e-Stewards", desc: "Ethical electronics recycling" },
    { name: "ISO 27001", desc: "Information Security Management" },
    { name: "ISO 9001", desc: "Quality Management System" },
    { name: "ADISA", desc: "Assured Data Sanitization (Optional Grading)" },
    { name: "HIPAA", desc: "Healthcare Information Privacy" },
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
    link.href = "https://assets.dsecuretech.com/pdf/DataSheetDiagnostics.pdf";
    link.download = "DataSheetDiagnostics.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Insights/Resources
  const insights = [
    {
      type: "Blog",
      title: "R2v3 Certification Complete Guide",
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
      title: "Importance of Pre-Processing Diagnostics",
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
      title: "Hardware Diagnostics Demo",
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
          title: "D-Secure Hardware Diagnostics | PC & Mac (M1-M4) Diagnostic Tool",
          description:
            "Professional hardware diagnostics for PC, Laptop & Apple Mac (Intel & Silicon M1-M4). Mass diagnose 255+ machines via PXE boot with tamper-proof reports.",
          keywords:
            "hardware diagnostics, mac diagnostics, apple silicon m4 test, pxe boot diagnostics, pc diagnostic software, laptop health check, MDM detection",
          canonicalUrl: "https://dsecuretech.com/products/device-analytics",
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
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
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
        <section className="py-8 lg:py-12 xl:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <ShieldIcon className="w-4 h-4" />
                      Accurate Diagnostics Tool
                    </div>
                    <Link
                      to="/products/drive-eraser-diagnostic"
                      className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100 transition-colors group"
                    >
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span>New: Integrated Solution</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Hardware Diagnostics
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Comprehensive hardware health assessment for PC, Laptop, Desktop & Apple Mac (Intel & Silicon M1-M4). Simultaneously diagnose up to 255 machines via PXE boot and generate tamper-proof reports for asset grading and compliance.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["R2v3 Compliant", "e-Stewards", "ISO 27001", "SOC 2"].map((badge) => (
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
                  <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                    <Link
                      to="/pricing-and-plan?product=hardware-diagnostics"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <svg
                        className="w-5 h-5 group-hover:rotate-12 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Buy Now
                    </Link>
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-100 text-emerald-400 px-8 py-4 rounded-xl font-bold opacity-60 cursor-not-allowed transition-all duration-200"
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
                      Coming Soon
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - Minimalist Laptop & Floating Icons */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[300px] xs:min-h-[340px] sm:min-h-[400px] lg:min-h-[520px] overflow-visible px-4"
                  style={{ perspective: "1500px" }}
                >
                  {/* Ambient Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-transparent to-teal-400/15 blur-3xl rounded-full"></div>

                  {/* Floating Icons Arc - Adjusted positions to prevent overflow */}
                  <div className="absolute inset-x-0 inset-y-0 pointer-events-none">
                    {[
                      { icon: <Battery className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[15%] left-[20%]", delay: "0s", color: "text-emerald-400" },
                      { icon: <Wifi className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[8%] left-[50%] -translate-x-1/2", delay: "0.2s", color: "text-teal-400" },
                      { icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[15%] right-[20%]", delay: "0.4s", color: "text-yellow-400" },
                      { icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[45%] left-[10%]", delay: "0.6s", color: "text-cyan-400" },
                      { icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[45%] right-[10%]", delay: "0.8s", color: "text-emerald-500" },
                      { icon: <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[30%] left-[25%]", delay: "1s", color: "text-teal-500" },
                      { icon: <Bluetooth className="w-5 h-5 sm:w-6 sm:h-6" />, pos: "top-[30%] right-[25%]", delay: "1.2s", color: "text-blue-400" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`absolute ${item.pos} p-2 sm:p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl ${item.color} animate-float hidden xs:flex`}
                        style={{ animationDelay: item.delay }}
                      >
                        {item.icon}
                      </div>
                    ))}
                  </div>

                  {/* Main Laptop 3D Container */}
                  <div
                    className="relative w-full max-w-[160px] xs:max-w-[220px] sm:max-w-[320px] lg:max-w-[420px] mx-auto transform-gpu"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "heroFloat 6s ease-in-out infinite",
                    }}
                  >
                    {/* Monitor Screen Container */}
                    <div
                      className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-950 rounded-lg p-1 sm:p-2 border-2 border-slate-700/50 shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateX(-5deg) rotateY(-10deg)",
                        boxShadow: "20px 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(16, 185, 129, 0.05)",
                      }}
                    >
                      {/* Bezel */}
                      <div className="relative bg-slate-900 rounded-md overflow-hidden aspect-[16/9] flex flex-col border border-slate-800">
                        {/* Screen Content - Heartbeat Animation */}
                        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 bg-[#0a0f1c] relative">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_100%)]"></div>
                          
                          {/* Heart Icon (Small) */}
                          <div className="mb-2 sm:mb-4">
                            <Heart className="w-6 h-6 sm:w-10 sm:h-10 text-emerald-500 fill-emerald-500/20 animate-pulse" />
                          </div>

                          {/* Heartbeat Wave */}
                          <div className="w-full h-12 sm:h-18 md:h-20 relative overflow-hidden">
                            <svg
                              viewBox="0 0 400 100"
                              className="w-full h-full text-emerald-400 stroke-2 fill-none"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0 50 L100 50 L115 20 L130 80 L145 50 L160 50 L170 10 L180 90 L195 50 L250 50 L265 30 L280 70 L295 50 L310 50 L320 0 L330 100 L345 50 L400 50"
                                className="heartbeat-path"
                              />
                            </svg>
                          </div>

                          {/* Status Indicator */}
                          <div className="mt-2 sm:mt-4 flex items-center gap-1.5 sm:gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
                            <span className="text-[8px] sm:text-xs font-mono text-emerald-500 tracking-wider uppercase">Health Check Active</span>
                          </div>
                        </div>

                        {/* Screen Footer / Brand */}
                        <div className="h-5 sm:h-8 bg-slate-800/80 flex items-center justify-center border-t border-slate-700/50">
                          <span className="text-[7px] sm:text-[9px] font-semibold text-slate-400 tracking-[0.2em] uppercase">D-Secure Diagnostics</span>
                        </div>
                      </div>
                    </div>

                    {/* Monitor Stand - Neck */}
                    <div 
                      className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-10 sm:h-14 bg-gradient-to-b from-slate-700 to-slate-900 border-x border-slate-600/30"
                      style={{
                        transform: "translateZ(-20px) rotateX(20deg)",
                      }}
                    ></div>

                    {/* Monitor Stand - Base */}
                    <div 
                      className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-3 sm:h-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-t-xl border border-slate-600/40 shadow-xl"
                      style={{
                        transform: "rotateX(75deg)",
                        transformOrigin: "top center",
                      }}
                    >
                      <div className="absolute inset-0 bg-emerald-500/5 blur-sm"></div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes heroFloat {
                      0%, 100% { transform: translateY(0px) rotateY(-5deg) rotateX(2deg); }
                      50% { transform: translateY(-15px) rotateY(-2deg) rotateX(1deg); }
                    }
                    @keyframes float {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                    }
                    .animate-float {
                      animation: float 4s ease-in-out infinite;
                    }
                    .heartbeat-path {
                      stroke-dasharray: 1000;
                      stroke-dashoffset: 1000;
                      animation: heartbeat-animation 3s linear infinite;
                    }
                    @keyframes heartbeat-animation {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                    @keyframes progressPulse {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.6; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= WHAT YOU CAN DIAGNOSE ================= */}
        <section id="erase-types" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Diagnostic Capabilities
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive hardware testing tailored for various form factors and devices.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {diagnosticsFeatures.map((item, i) => (
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

        {/* ================= PRODUCT DEMO SECTION — COMING SOON ================= */}
        <section
          id="demo"
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Try Hardware Diagnostics{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Demo
                  </span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Experience D-Secure Hardware Diagnostics in action — explore the
                  interface and features right here
                </p>
              </div>
            </Reveal>

            {/* Coming Soon Placeholder */}
            <Reveal delayMs={100}>
              <div
                className="relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 rounded-2xl h-[350px] sm:h-[400px] lg:h-[500px] flex flex-col items-center justify-center"
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                {/* Coming Soon Content */}
                <div className="relative z-10 flex flex-col items-center gap-6 px-6">
                  {/* Animated Icon */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-200 flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-inner animate-pulse">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                      Coming Soon
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base max-w-md">
                      We're building an interactive demo for Hardware Diagnostics. Stay tuned for a hands-on experience!
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-semibold border border-emerald-200 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Under Development
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Caption below demo */}
            <Reveal delayMs={200}>
              <p className="text-center text-sm text-slate-500 mt-4">
                Interactive demo coming soon — Hardware Diagnostics will be available to try directly in your browser
              </p>
            </Reveal>

            {/* Screenshot Cards Grid — COMMENTED OUT FOR NOW
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {galleryImages.slice(0, 4).map((img, i) => (
                <Reveal key={img.alt} delayMs={150 + i * 50}>
                  <div
                    onClick={() => setSelectedImageIndex(i)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      <img
                        src={img.thumbnail}
                        alt={img.alt}
                        className="w-full h-full object-contain bg-slate-50 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold bg-emerald-600/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {i === 3 && additionalImagesCount > 0 ? `+${additionalImagesCount} More` : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            */}
          </div>
        </section>

        {/* [OLD VIDEO SECTION - PRESERVED AS COMMENT]
        <section
          id="demo"
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  See Hardware Diagnostics in Action
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch how D-Secure Hardware Diagnostics permanently destroys sensitive
                  data with audit-ready documentation
                </p>
              </div>
            </Reveal>
            ... (video + screenshot cards removed) ...
          </div>
        </section>
        */}

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
                  Hardware Diagnostics?
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
                        <svg
                          className="w-8 h-8 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">
                        Download
                      </h3>
                      <p className="text-sm text-slate-500">
                        Get the software from our secure portal
                      </p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
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
                      <p className="text-sm text-slate-500 mb-3">
                        Multiple ways to deploy
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">
                          USB ISO
                        </span>
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">
                          PXE Boot
                        </span>
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">
                          EXE
                        </span>
                        <span className="text-[10px] px-2 py-1 bg-white border border-emerald-200 rounded-full text-emerald-700 font-medium">
                          MSI
                        </span>
                      </div>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Step 3: Diagnose */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                      {/* Step Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        3
                      </div>
                      {/* Icon */}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100 relative">
                        <CpuIcon className="w-8 h-8 text-emerald-600" />
                      </div>
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 mb-2">
                        Diagnose Devices
                      </h3>
                      <p className="text-sm text-slate-500">
                        Automatically test hardware components
                      </p>
                    </div>
                    {/* Arrow for mobile/tablet */}
                    <div className="flex justify-center py-3 lg:hidden">
                      <svg
                        className="w-6 h-6 text-emerald-300 rotate-90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
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
                      <h3 className="font-bold text-slate-900 mb-2">
                        Save Reports
                      </h3>
                      <p className="text-sm text-slate-500">
                        Store diagnostic certificates on cloud
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Description Text */}
            <Reveal delayMs={200}>
              <div className="max-w-3xl mx-auto mt-12 text-center">
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">
                    D-Secure Hardware Diagnostics
                  </strong>{" "}
                  offers the flexibility to test devices efficiently in both
                  internet-enabled facilities and offline environments. Deploy via{" "}
                  <strong className="text-emerald-600">USB drive</strong>,{" "}
                  <strong className="text-emerald-600">PXE boot</strong> over
                  network, or{" "}
                  <strong className="text-emerald-600">MSI package</strong> for
                  remote diagnostics.
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
                  D-Secure Hardware Diagnostics supports IT asset auditing procedures
                  and ethical recycling practices by providing tamper-proof
                  hardware grading records.
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
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base">
                      {std.name}
                    </h3>
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
                  <svg
                    className="w-4 h-4"
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
                  Cross-Platform Native
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Multi-Architecture Support
                </h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
                  Native performance across all major CPU architectures and
                  operating systems
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
                      <span className="text-white font-bold text-base sm:text-lg">
                        x64
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                        AMD64 / Intel 64
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-600">
                        Most Common Architecture
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Standard 64-bit processors from Intel & AMD used in most
                    desktops, laptops, and servers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Intel Core
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      AMD Ryzen
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      Xeon
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
                      EPYC
                    </span>
                  </div>
                </div>

                {/* ARM64 Architecture */}
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl shadow-lg">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-bl from-teal-100 to-transparent rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">
                        ARM64
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        ARM64
                      </h3>
                      <p className="text-xs sm:text-sm text-teal-600">
                        Growing Ecosystem
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Modern ARM-based processors for power-efficient computing on
                    mobile, Mac, and servers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">
                      Apple Silicon
                    </span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">
                      Snapdragon
                    </span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">
                      Graviton
                    </span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200">
                      Ampere
                    </span>
                  </div>
                </div>

                {/* x86 Architecture */}
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl shadow-lg sm:col-span-2 md:col-span-1">
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-bl from-cyan-100 to-transparent rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">
                        x86
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        x86 (32-bit)
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-600">
                        Legacy Support
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Legacy 32-bit processors for older systems still in
                    enterprise use requiring hardware health checks.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">
                      Legacy Intel
                    </span>
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">
                      Pentium
                    </span>
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full border border-cyan-200">
                      Atom
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* OS Compatibility Grid */}
            <Reveal delayMs={200}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
                  Operating System Compatibility
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Windows */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-blue-500 flex items-center justify-center bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
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
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">macOS</h4>
                      <p className="text-xs text-slate-500">
                        x64, ARM64 (Apple Silicon)
                      </p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    </div>
                  </div>

                  {/* Linux */}
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 text-yellow-600 flex items-center justify-center bg-yellow-50 rounded-lg sm:rounded-xl border border-yellow-200">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
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
                  Everything you need to know about D-Secure Hardware Diagnostics
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What architectures and chips are supported on Mac?",
                  a: "D-Secure supports all Apple architectures including legacy Intel, T1, T2 security chips, and the entire Apple Silicon range (M1, M2, M3, and M4 series). Deployment is handled natively via a single Terminal command in Recovery Mode.",
                },
                {
                  q: "How does MDM Enrollment Detection work?",
                  a: "The software automatically checks the MDM (Mobile Device Management) status of Mac devices during diagnostics. It identifies if a device is locked or enrolled in a corporate management system, ensuring compliant processing.",
                },
                {
                  q: "What is the limit for simultaneous diagnostics?",
                  a: "Via PXE network boot, you can diagnose up to 255 machines simultaneously on a single network segment, making it highly efficient for high-volume ITAD and refurbishing operations.",
                },
                {
                  q: "Can I run diagnostics without an internet connection?",
                  a: "Yes, D-Secure Hardware Diagnostics offers a standalone offline mode. You can perform full hardware assessments using a bootable USB drive in environments with restricted or no internet access.",
                },
                {
                  q: "What types of hardware components are tested?",
                  a: "The tool performs 10+ automated tests (CPU, RAM, SMART, Battery, CMOS, Motherboard) and provides guided manual tests for Keyboard, Display, Audio, Webcam, and USB ports for 100% component verification.",
                },
                {
                  q: "Are the diagnostics reports tamper-proof?",
                  a: "Yes, every report is digitally signed and generated in non-editable PDF, XML, and CSV formats. This ensures the integrity of the hardware health data for audits and resale grading.",
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
        <section
          id="contact"
          className="py-12 sm:py-20 lg:py-28 bg-white border-t"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Talk to Our Data Security Experts
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Get personalized guidance on deployment, licensing, and
                    hardware diagnostics strategies tailored to your
                    organization's needs.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Enterprise & SMB licensing options",
                      "Standardized testing implementation",
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
                  <form
                    className="space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoading(true);

                      try {
                        const now = new Date();
                        const timestampLocal = now.toLocaleString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        });
                        const timestampISO = now.toISOString();

                        // === Prepare FormData for FormSubmit ===
                        const formSubmitData = new FormData();
                        // Webhook to notify backend - backend will send auto-response email
                        formSubmitData.append(
                          "_webhook",
                          "https://api.dsecuretech.com/api/formsubmit/webhook",
                        );
                        formSubmitData.append("_captcha", "false");
                        formSubmitData.append("_template", "table");

                        // Form fields
                        formSubmitData.append("name", formData.name.trim());
                        formSubmitData.append("email", formData.email.trim());
                        formSubmitData.append(
                          "organization",
                          formData.organization.trim(),
                        );
                        formSubmitData.append(
                          "message",
                          formData.message.trim(),
                        );

                        // Required for autoresponse
                        formSubmitData.append(
                          "_replyto",
                          formData.email.trim(),
                        );
                        formSubmitData.append("timestamp", timestampLocal);
                        formSubmitData.append(
                          "source",
                          "Hardware Diagnostics Page Contact",
                        );

                        // Subject and CC
                        formSubmitData.append(
                          "_subject",
                          "New Inquiry - Hardware Diagnostics Page - D-Secure Tech",
                        );
                        formSubmitData.append(
                          "_cc",
                          "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
                        );

                        // === Prepare submission data for Backend API ===
                        const submissionData = {
                          name: formData.name.trim(),
                          email: formData.email.trim(),
                          company: formData.organization.trim(),
                          phone: "",
                          country: "",
                          businessType: "",
                          solutionType: "device-analytics",
                          complianceRequirements: "",
                          message: formData.message.trim(),
                          usageType: "",
                          source: "Hardware Diagnostics Page Contact",
                          timestamp: timestampISO,
                        };

                        // Reset form and show success immediately
                        setFormData({
                          name: "",
                          email: "",
                          organization: "",
                          message: "",
                        });
                        setIsLoading(false);
                        showToast(
                          "Thank you! Your enquiry has been submitted successfully.",
                          "success",
                        );

                        try {
                          // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                          const API_BASE = ENV.API_BASE_URL;
                          const apiResponse = await fetch(
                            `${API_BASE}/api/ContactFormSubmissions`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(submissionData),
                            },
                          );

                          // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
                          const response = await fetch(
                            "https://formsubmit.co/support@dsecuretech.com",
                            {
                              method: "POST",
                              body: formSubmitData,
                              headers: { Accept: "application/json" },
                            },
                          );

                          // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
                          fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "x-api-key": "REACT_CONTACT_2026",
                            },
                            body: JSON.stringify(submissionData),
                          }).catch(() => {});

                          if (!apiResponse.ok) {
                            const errorData = await apiResponse.json();
                            console.error(
                              "Backend submission failed:",
                              errorData,
                            );
                          }
                        } catch (error: any) {
                          console.error("Form error:", error);
                          showToast(
                            error.message ||
                              "Failed to send message. Please try again later.",
                            "error",
                          );
                        }
                      } catch (error) {
                        console.error("FormSubmit error:", error);
                        showToast(
                          "Failed to submit enquiry. Please try again.",
                          "error",
                        );
                        setIsLoading(false);
                      }
                    }}
                  >
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
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal with Gallery Navigation */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
});

export default HardwareDiagnosticsPage;
