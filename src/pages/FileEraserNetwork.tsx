import React, { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UpcomingBadge from "@/components/ui/UpcomingBadge";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  StarIcon,
  ServerIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import { blogPosts } from "@/data/blogPosts";
import { FileTextIcon, Monitor, Download, X } from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { useToast } from "@/components/Toast";
import { ENV } from "@/config/env";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const FileEraserNetwork: React.FC = memo(function FileEraserNetwork() {
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
  const [showVideoModal, setShowVideoModal] = useState(false);
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
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png",
      alt: "Dashboard View",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/ot4kpilynrfgw9vuzrbf.png",
      alt: "Erasure Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ctujrrfv3h1visi1jrvz.png",
      alt: "File Selection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ykhnzzsbwdeuncs9uvem.png",
      alt: "Erasure Progress",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/bjklx7nvvam1m2h122zo.png",
      alt: "File Eraser Screenshot 5",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/lxs0usvvneldpij0dqwo.png",
      alt: "File Eraser Screenshot 6",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/oax8dj4tw1pitsbnbr31.png",
      alt: "File Eraser Screenshot 7",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/cninfubwl4z6u9bhoi3f.png",
      alt: "File Eraser Screenshot 8",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/dns8j5kip5vxyczqoipe.png",
      alt: "File Eraser Screenshot 9",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/k6uywfbzsktkrdzmojnm.png",
      alt: "File Eraser Screenshot 10",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/lsjiymvrj0x7jmgempbe.png",
      alt: "File Eraser Screenshot 11",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/ndoby2cwwxxsngynqp5e.png",
      alt: "File Eraser Screenshot 12",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/slvfga3d5nx66jv7uxug.png",
      alt: "File Eraser Screenshot 13",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185417/fpnm8lqq46ftsw0ny0ca.png",
      alt: "File Eraser Screenshot 14",
    },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/vytjbf7yigyyo6nc5qhv.png",
    //   alt: "File Eraser Screenshot 15",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mu4inz3sickwxfbtduzn.png",
    //   alt: "File Eraser Screenshot 16",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/smkmqfqk7dw0xwmfl4xa.png",
    //   alt: "File Eraser Screenshot 17",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/trcabsasqpewodfyrykl.png",
    //   alt: "File Eraser Screenshot 18",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qnl0maavgwb12eyx9drx.png",
    //   alt: "File Eraser Screenshot 19",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/y20i3mvvbzzddrzjnunf.png",
    //   alt: "File Eraser Screenshot 20",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/g59dppsz6gyjm10rf5lo.png",
    //   alt: "File Eraser Screenshot 21",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615237/mx6or4o6uenf3q42ipqg.png",
    //   alt: "File Eraser Screenshot 22",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/bj1yo6ykwgxvkp9bbmlm.png",
    //   alt: "File Eraser Screenshot 23",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/iuvskkxwxsawnvvk8i4l.png",
    //   alt: "File Eraser Screenshot 24",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/nalxxlyfrewjxtpptplf.png",
    //   alt: "File Eraser Screenshot 25",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/qxrifgrivw11cqhuegx0.png",
    //   alt: "File Eraser Screenshot 26",
    // },
    // {
    //   url: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1770615238/pb9yo6kfjwz8z4shw2vz.png",
    //   alt: "File Eraser Screenshot 27",
    // },
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
    { id: "demo", label: "Interactive Demo" },
    { id: "how-it-works", label: "How It Works" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "blogs", label: "Blogs" },
    { id: "faq", label: "FAQ" },
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

  // Wiping capabilities for Domain Network
  const eraseTypes = [
    {
      name: "Domain Files & Folders",
      desc: "Securely wipe sensitive files and folders across all domain-connected machines from a central admin console.",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Mapped Network Drives",
      desc: "Permanently erase data from mapped network drives and shared volumes across the enterprise infrastructure.",
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      color: "from-red-500 to-red-600",
    },
    {
      name: "Internet & App Traces",
      desc: "Remove digital footprints by wiping browser history, cookies, and application traces from network endpoints.",
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
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "High-Speed Parallel Wiping",
      desc: "Simultaneously erase data on multiple domain machines with high-speed multithreaded algorithms.",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Keyword & CSV Search",
      desc: "Search and erase specific files using keywords or by importing file paths directly from CSV files.",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Scheduled Tasks",
      desc: "Automate erasure routines at regular intervals to maintain data hygiene across the domain network.",
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
            d="M5 14l6-6m-3 6V8a2 2 0 012-2h6a2 2 0 012 2v6m2 4H7a2 2 0 01-2-2v-2a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  // Platforms supported (Network focused)
  const platforms = [
    {
      name: "Windows Domain",
      versions: "Windows 10, 11, Server 2016 - 2025",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "Linux Enterprise",
      versions: "Ubuntu, CentOS, RHEL, Debian etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.072-.2-.052-.334.033-.466.204-.263.466-.399.795-.528.396-.2.762-.269 1.139-.268h.13zm4.006 2.933c-.009.04-.009.037-.012.071-.075.443-.134.8-.166 1.2-.028.332-.043.663-.044.998l.003.467.004.073.009.135.003.2.016.267c.09.333.15.6.313.8.082.103.17.2.27.27.136.07.272.135.41.135.074 0 .15-.015.223-.04.31-.112.48-.332.618-.59.109-.202.17-.403.217-.598.04-.195.067-.39.08-.545.031-.4.049-.664.049-.664l-.003-.402-.01-.267-.014-.202c-.012-.133-.03-.266-.053-.397v-.003L13 9.4v-.003l-.048-.2h.003l.025.003c-.038-.007-.077-.01-.116-.02-.062-.01-.124-.029-.184-.04z" />
        </svg>
      ),
    },
    {
      name: "Private Cloud",
      versions: "VMware, Hyper-V, Nutanix & SAN/NAS",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
  ];

  // Key features (Domain Network focused)
  const features = [
    {
      title: "18+ Erasure Standards",
      desc: "Native support for NIST 800-88, DoD 5220.22-M, Gutmann, and other international data sanitization protocols.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "MSI Remote Deployment",
      desc: "Deploy the eraser across the network as an MSI package for remote wiping on Windows endpoint devices.",
      icon: (
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
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      ),
    },
    {
      title: "Scheduled Automation",
      desc: "Set recurring sanitization policies to maintain data hygiene and prevent unauthorized data accumulation.",
      icon: <GearIcon className="w-6 h-6" />,
    },
    {
      title: "License Pooling",
      desc: "Centrally manage and pool erasure licenses. Deactivate from one machine and reuse on another.",
      icon: (
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Centralized Management",
      desc: "Wipe data stored on all machines in the local organization network from a unified admin console.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "Tamper-Proof Reports",
      desc: "Automatically generate signed, audit-trail reports for every deletion to meet regulatory compliance.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "Cloud Repository",
      desc: "Save and access erasure reports on a centralized cloud console anytime, anywhere for audit readiness.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Discovery & Search",
      desc: "Powerful keyword-based searching across domain machines to identify and erase sensitive data files.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
  ];

  // Real-world application scenarios
  const useCases = [
    {
      title: "IT Admin Fleet Management",
      desc: "Centrally manage data privacy across Windows endpoints. Erase files, folders, and traces from a domain-connected location at regular intervals.",
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
      title: "Secure Storage Hygiene",
      desc: "Free up disk space across domain-connected computers by permanently erasing obsolete technical residues and temporary files beyond recovery.",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Confidential Data Destruction",
      desc: "Protect sensitive corporate assets by ensuring no trace of deleted files remains on hardware, preventing misuse and forensic extraction.",
      icon: <StarIcon className="w-8 h-8" />,
    },
    {
      title: "Global Compliance Audits",
      desc: "Stay compliant with EU-GDPR, HIPAA, and PCI-DSS by maintaining a verifiable digital audit trail of all erasure tasks performed over the network.",
      icon: <ClipboardIcon className="w-8 h-8" />,
    },
  ];

  // Related blog articles (IT Admin & Enterprise focus)
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

  // International standards supported
  const complianceStandards = [
    {
      name: "NIST 800-88",
      desc: "Guidelines for media sanitization ensuring data is permanently irretrievable.",
    },
    {
      name: "DoD 5220.22-M",
      desc: "Standard for data erasure used by the U.S. Department of Defense.",
    },
    {
      name: "GDPR",
      desc: "Ensures 'Right to Erasure' compliance for personal data protection.",
    },
    {
      name: "HIPAA",
      desc: "Protects sensitive patient health information from unauthorized access.",
    },
    {
      name: "SOX",
      desc: "Mandates secure data lifecycle management for corporate financial records.",
    },
    {
      name: "PCI-DSS",
      desc: "Requirements for secure disposal of cardholder data and sensitive info.",
    },
  ];

  // Professional FAQ for Network Eraser
  const faqs = [
    {
      question: "What is File Eraser Network?",
      answer: "It is a specialized software that allows IT administrators to permanently erase files, folders, and system traces from all domain-connected computers across an organization from a centralized console.",
    },
    {
      question: "Does it generate tamper-proof reports?",
      answer: "Yes, it generates a cryptographically signed, tamper-proof erasure report for every machine, documenting the list of files erased and the standard used for audit trails.",
    },
    {
      question: "What is the license model?",
      answer: "The software is available on an annual subscription model per computer. You can centrally manage and pool licenses from the cloud console.",
    },
    {
      question: "Can it erase machines disconnected from the domain?",
      answer: "Yes, if a task is already scheduled for a computer or Organizational Unit (OU), it will execute at the scheduled time even if the machine is temporarily disconnected.",
    },
    {
      question: "Can I search for specific files across the network?",
      answer: "Absolutely. You can use keywords or import CSV files containing paths to search and identify sensitive data before performing an erasure task.",
    },
    {
      question: "Does it support offline activation?",
      answer: "Yes, the software supports both online and offline activation methods to accommodate air-gapped or restricted network environments.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DataSheetFileEraser.pdf";
    link.download = "DataSheetFileEraser.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("file-eraser-network")} />
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
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
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
        <section className="min-h-[calc(100vh-56px)] flex items-center py-10 lg:py-14 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content - Domain Network specialized */}
              <Reveal>
                <div className="space-y-6">
                  <div>
                    <Reveal>
                      <UpcomingBadge className="mb-2" />
                    </Reveal>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <ShieldIcon className="w-3.5 h-3.5" />
                        Wipe Data on Domain Network Connected Computers
                      </div>
                      <Link 
                        to="/products/file-eraser"
                        className="inline-flex items-center gap-2 bg-white text-slate-600 hover:text-emerald-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 hover:border-emerald-200 transition-colors group shadow-sm"
                      >
                        <ArrowLeftIcon className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Standard Edition</span>
                      </Link>
                    </div>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      File Eraser Network
                    </span>
                  </h1>

                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    Permanently erase files, folders, internet history, and
                    system traces across domain-connected endpoint devices.
                    Schedule erasure tasks and stay compliant from a central
                    location.
                  </p>

                  {/* CTA Buttons - Upcoming Status (Moved Up) */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-500 font-bold px-8 py-3.5 rounded-xl shadow-inner cursor-not-allowed transition-all duration-300"
                    >
                      Upcoming
                    </button>
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 px-8 py-3.5 rounded-xl font-bold cursor-not-allowed transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      Download Datasheet Upcoming
                    </button>
                  </div>

                  {/* Compliance Badges (Moved Down & Compact) */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {["NIST 800-88", "GDPR", "HIPAA", "SOC 2"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full shadow-sm border border-emerald-100"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              {/* Right: Hierarchical Network Visual Replication from FreezeStatePage */}
              <Reveal delayMs={200}>
                <div className="relative flex flex-col items-center justify-center min-h-[450px] lg:min-h-[480px] w-full max-w-2xl mx-auto overflow-visible pt-4 pb-12">
                  {/* Background Network Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] border-emerald-500"></div>
                  
                  {/* CENTRAL NETWORK ADMIN HUB (TOP) - Premium Monitor Look */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-30 mb-6 group"
                  >
                    {/* Monitor Stand Base */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-300 rounded-full blur-[2px] opacity-40"></div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-t from-slate-400 to-slate-200 rounded-sm skew-x-[15deg] -translate-x-[22px]"></div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-t from-slate-400 to-slate-200 rounded-sm -skew-x-[15deg] translate-x-[10px]"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-400/50 rounded-full"></div>

                    {/* Monitor Body (Bezel) */}
                    <div className="bg-slate-100 p-2 lg:p-3 rounded-[1.5rem] shadow-2xl border-4 border-slate-200 w-64 lg:w-72 relative transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                      {/* Power Indicator */}
                      <div className="absolute bottom-2 right-8 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                      
                      {/* D-Secure Logo/Badge on Bezel */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-40">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                        <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter">D-Secure</span>
                      </div>

                      <div className="bg-slate-900 rounded-xl p-5 relative overflow-hidden group/screen shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] border border-slate-800">
                        {/* Screen Reflection/Shine */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-[35deg] pointer-events-none group-hover/screen:animate-[shine_3s_infinite]"></div>

                        <div className="flex flex-col items-center justify-center py-4 space-y-3 relative z-10">
                           <div className="relative">
                             <ServerIcon className="w-10 h-10 text-emerald-400 mb-2 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                             {/* Shield Overlay on Monitor Screen Icon */}
                             <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-slate-900">
                               <ShieldIcon className="w-2.5 h-2.5 text-white" />
                             </div>
                           </div>
                           
                           <div className="w-full space-y-2">
                             <div className="h-1 bg-emerald-500/20 rounded-full overflow-hidden w-32 mx-auto">
                               <motion.div animate={{ x: [-64, 64] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></motion.div>
                             </div>
                             <p className="text-[9px] font-mono text-emerald-400 text-center tracking-widest uppercase animate-pulse">Admin: Online</p>
                           </div>
                        </div>
                      </div>

                      {/* Monitor Info Area below screen */}
                      <div className="flex items-center justify-between px-2 pt-4 pb-1">
                        <div>
                          <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Global Eraser</p>
                          <h4 className="text-sm font-black text-slate-900 uppercase">Admin Console</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Network</p>
                          <p className="text-xs font-black text-emerald-600">Unified</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CONNECTING BRIDGE (MIDDLE) */}
                  <div className="relative z-20 w-44 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-around px-4 mb-10">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200 shadow-inner group overflow-hidden">
                        <motion.div 
                          animate={{ opacity: [0, 1, 0] }} 
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }} 
                          className="w-full h-full bg-emerald-500"
                        ></motion.div>
                      </div>
                    ))}
                    {/* Radial Connector Lines */}
                    <svg className="absolute top-full left-1/2 -translate-x-1/2 w-[550px] h-24 pointer-events-none overflow-visible" viewBox="0 0 600 100">
                      {[0,1,2,3,4].map((i) => {
                        const targetX = 150 * i;
                        return (
                          <motion.path
                            key={i}
                            d={`M 300 0 C 300 64, ${targetX} 64, ${targetX} 128`}
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeOpacity="0.3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1 + i * 0.1 }}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* ENDPOINT NODES (BOTTOM) */}
                  <div className="relative z-20 flex justify-between w-full max-w-2xl px-4 gap-4 mt-4">
                    {[1,2,3,4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                      >
                        <div className="bg-white/90 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl border border-slate-100 w-22 text-center group hover:-translate-y-2 transition-transform cursor-pointer overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 mx-auto mb-3 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ width: ["20%", "100%", "20%"] }} 
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} 
                                className="h-full bg-emerald-500/40 rounded-full"
                              ></motion.div>
                            </div>
                            <p className="text-[6px] font-black uppercase text-slate-400 tracking-widest leading-none">Endpoint</p>
                            <div className="flex items-center justify-center gap-1">
                              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                              <span className="text-[6px] font-black uppercase text-emerald-600 tracking-widest leading-none">Erasing</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Ambient Glows */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-200/20 blur-[100px] -z-10 rounded-full"></div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eraseTypes.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 50}>
                  <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
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
          className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  See File Eraser in Action
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch how D-Secure File Eraser permanently destroys sensitive
                  data with audit-ready documentation
                </p>
              </div>
            </Reveal>

            {/* Media Grid - 1 Video + 2 Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Main Video Card */}
              {/* Embedded Product Demo - Sandbox Style */}
              <Reveal delayMs={100}>
                <div
                  ref={demoContainerRef}
                  className={`relative bg-white overflow-hidden shadow-2xl border border-slate-200/80 hover:shadow-emerald-200/30 transition-shadow duration-500 flex flex-col group ${
                    isFullscreen
                      ? "w-full h-full rounded-none"
                      : "rounded-2xl h-full min-h-[800px]"
                  }`}
                >
                  {/* Fullscreen Toggle Button (visible only when demo is active) */}
                  {isDemoActive && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-12 right-4 z-50 p-2.5 bg-slate-900/80 hover:bg-emerald-600 text-white rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
                      title={
                        isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                      }
                    >
                      {isFullscreen ? (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      )}
                      <span className="text-sm font-medium pr-1 hidden sm:block">
                        {isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                      </span>
                    </button>
                  )}

                  {/* Upcoming Overlay for Main Demo */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-20 flex items-center justify-center p-6 text-center">
                    <div className="flex flex-col items-center gap-6 max-w-sm">
                      <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <Monitor className="w-10 h-10 text-emerald-400" />
                      </div>
                      <div>
                        <UpcomingBadge className="mb-4 inline-block" />
                        <h3 className="text-2xl font-bold text-white mb-2">Interactive Demo</h3>
                        <p className="text-slate-300 text-sm">Our interactive sandbox environment is currently under development. Stay tuned for the full release.</p>
                      </div>
                    </div>
                  </div>

                  {/* Original Demo Placeholder - Keep for future but hidden/disabled */}
                  <div className="group relative w-full h-full min-h-[400px] flex-1 overflow-hidden pointer-events-none opacity-40 grayscale">
                    <img
                      src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                      alt="D-Secure File Eraser Preview"
                      className="w-full h-full object-contain bg-slate-50"
                    />
                  </div>
                </div>
              </Reveal>

              {/* [OLD VIDEO CARD - PRESERVED AS COMMENT]
              <Reveal delayMs={100}>
                <div
                  onClick={() => setShowVideoModal(true)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-bold text-lg">
                            File Eraser
                          </h4>
                          <p className="text-emerald-400 text-sm font-medium">
                            Product Demo
                          </p>
                        </div>
                      </div>
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-2xl">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                          <svg
                            className="w-7 h-7 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-4 text-white/70 text-sm font-medium">
                        Click to watch demo
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-500/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        VIDEO
                      </span>
                      <span className="text-slate-400 text-xs">6:10</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Product Demo
                    </h3>
                    <p className="text-sm text-slate-500">
                      Complete walkthrough of File Eraser features
                    </p>
                  </div>
                </div>
              </Reveal>
              */}

              {/* Screenshot Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Screenshot 1 */}
                <Reveal delayMs={150}>
                  <div
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 cursor-not-allowed"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/rrewuevqba6xopawa2n8.png"
                        alt="Dashboard View"
                        className="w-full h-full object-cover opacity-30 grayscale"
                      />
                      {/* Upcoming Badge Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 2 */}
                <Reveal delayMs={200}>
                  <div
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 cursor-not-allowed"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185419/ot4kpilynrfgw9vuzrbf.png"
                        alt="Erasure Report"
                        className="w-full h-full object-cover opacity-30 grayscale"
                      />
                      {/* Upcoming Badge Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 3 */}
                <Reveal delayMs={250}>
                  <div
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 cursor-not-allowed"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ctujrrfv3h1visi1jrvz.png"
                        alt="File Selection"
                        className="w-full h-full object-cover opacity-30 grayscale"
                      />
                      {/* Upcoming Badge Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 4 - Shows "More" badge if additional images exist */}
                <Reveal delayMs={300}>
                  <div
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 transition-all duration-300 cursor-not-allowed"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772185418/ykhnzzsbwdeuncs9uvem.png"
                        alt="Erasure Progress"
                        className="w-full h-full object-cover opacity-30 grayscale"
                      />
                      {/* Upcoming Badge Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Demo Section CTA - Upcoming Status */}
              {/* <Reveal delayMs={350}>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-500 font-bold px-10 py-4 rounded-xl shadow-inner cursor-not-allowed transition-all duration-300 w-full sm:w-auto"
                    >
                      Upcoming
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Buy Now Disabled</span>
                  </div>
                  
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-400 px-8 py-4 rounded-xl font-bold cursor-not-allowed transition-all duration-300 w-full sm:w-auto group"
                  >
                    <Download className="w-5 h-5 opacity-50" />
                    Download Datasheet Upcoming
                  </button>
                </div>
              </Reveal> */}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (MSI & REMOTE DEPLOYMENT) ================= */}
        <section id="how-it-works" className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Reveal>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  Deploy & Erase Across the{" "}
                  <span className="text-emerald-600">Entire Domain</span>
                </h2>
                <p className="text-lg text-slate-600">
                  IT Admins can manage data sanitization with zero physical
                  intervention using remote deployment tools.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  title: "MSI Packaging",
                  desc: "Prepare the software as an MSI package for group policy (GPO) deployment.",
                },
                {
                  step: "02",
                  title: "Remote Push",
                  desc: "Push the eraser to all endpoint devices or specific Organizational Units.",
                },
                {
                  step: "03",
                  title: "Central Command",
                  desc: "Select files or schedule wiping tasks from the admin console across the domain.",
                },
                {
                  step: "04",
                  title: "Audit Trail",
                  desc: "Automatically receive signed erasure reports in the Cloud repository for compliance.",
                },
              ].map((item, idx) => (
                <Reveal key={idx} delayMs={idx * 150}>
                  <div className="relative p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:shadow-lg transition-all group h-full flex flex-col">
                    <div className="text-5xl font-black text-emerald-100 group-hover:text-emerald-200 transition-colors absolute top-4 right-4 leading-none">
                      {item.step}
                    </div>
                    <div className="relative z-10 pt-8 flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  D-Secure File Eraser supports organizational compliance
                  initiatives by aligning with widely accepted data protection
                  principles and secure erasure best practices
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {complianceStandards.map((std, i) => (
                <Reveal key={std.name} delayMs={i * 50}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-white/20 transition-colors border border-white/10 h-full flex flex-col items-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{std.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed flex-grow">
                      {std.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PLATFORM SUPPORT ================= */}
        <section
          id="platforms"
          className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 to-teal-50"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Multi-Platform Support
                </h2>
                <p className="text-lg text-slate-600">
                  Full support across your entire technology ecosystem
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 80}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 flex-shrink-0 text-emerald-800 flex items-center justify-center bg-emerald-50 rounded-2xl mb-4">
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {p.name}
                      </h3>
                      <p className="text-sm text-slate-500">{p.versions}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delayMs={i * 40}>
                  <div className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-grow">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delayMs={i * 80}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 h-full flex flex-col">
                    <div className="flex items-start gap-5 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center flex-shrink-0">
                        {u.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {u.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
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

        {/* ================= RELATED RESOURCES (BLOG) ================= */}
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
                  className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-700 transition-colors group"
                >
                  View More
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBlogs.map((blog, i) => (
                <Reveal key={blog.id} delayMs={i * 60}>
                  <Link to={blog.link} className="block group h-full">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {blog.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-emerald-800 font-semibold text-sm mb-4 group-hover:gap-2 gap-1 transition-all">
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

        {/* ================= FAQ SECTION ================= */}
        <section
          id="faq"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Everything you need to know about D-Secure File Eraser
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Reveal key={i} delayMs={i * 50}>
                  <details className="group bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900 pr-4">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-open:rotate-180 transition-transform">
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
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY / CTA SECTION ================= */}
        <section id="contact" className="py-20 lg:py-28 bg-white border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
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
                          <CheckIcon className="w-4 h-4 text-emerald-800" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Or contact us directly
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">
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
                          "File Eraser Page Contact",
                        );

                        // Subject and CC
                        formSubmitData.append(
                          "_subject",
                          "New Inquiry - File Eraser Page - D-Secure Tech",
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
                          solutionType: "file-erasure",
                          complianceRequirements: "",
                          message: formData.message.trim(),
                          usageType: "",
                          source: "File Eraser Page Contact",
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
                        placeholder=" Email *"
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

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowVideoModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="https://res.cloudinary.com/dhwi5wevf/video/upload/f_auto,q_auto/v1770725346/jqkinwc7zk4w2ak9nplw.3gp"
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}
    </>
  );
});

export default FileEraserNetwork;
