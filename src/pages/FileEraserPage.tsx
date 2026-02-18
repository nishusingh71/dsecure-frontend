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
  StarIcon,
  ServerIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import { blogPosts } from "@/data/blogPosts";
import { FileTextIcon, Monitor, Download, X } from "lucide-react";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 8; // Estimate based on content length
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const FileEraserPage: React.FC = memo(function FileEraserPage() {
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

  // Gallery images array for lightbox navigation
  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/wyano4in32dsvwrjfose.png",
      alt: "Dashboard View",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/kwmr1zmohxlsvu7mewu6.png",
      alt: "Erasure Report",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/gw3zeqnncwvnn1hnlekg.png",
      alt: "File Selection",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/m0m1b2hqj9tl6g9gmhgz.png",
      alt: "Erasure Progress",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/zulpnihjrlfuoitqaizh.png",
      alt: "File Eraser Screenshot 5",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615235/a31wp92vyyeh2j2hu9zc.png",
      alt: "File Eraser Screenshot 6",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/s18pgdvgux4dye0fmscy.png",
      alt: "File Eraser Screenshot 7",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/iyavx0ommailpdkcxng5.png",
      alt: "File Eraser Screenshot 8",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/uxdebjbpxhj9s4e9f2a5.png",
      alt: "File Eraser Screenshot 9",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/h71mhoxgsxhsmftagfui.png",
      alt: "File Eraser Screenshot 10",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/zx7c8pmkp59la8bat6co.png",
      alt: "File Eraser Screenshot 11",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615236/f3brvyeayc1gjvvbhycn.png",
      alt: "File Eraser Screenshot 12",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/k5qipygfaw0nczflr3zz.png",
      alt: "File Eraser Screenshot 13",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/ju9tjx02ffgsyg7hytqm.png",
      alt: "File Eraser Screenshot 14",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/vytjbf7yigyyo6nc5qhv.png",
      alt: "File Eraser Screenshot 15",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/mu4inz3sickwxfbtduzn.png",
      alt: "File Eraser Screenshot 16",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/smkmqfqk7dw0xwmfl4xa.png",
      alt: "File Eraser Screenshot 17",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/trcabsasqpewodfyrykl.png",
      alt: "File Eraser Screenshot 18",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/qnl0maavgwb12eyx9drx.png",
      alt: "File Eraser Screenshot 19",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/y20i3mvvbzzddrzjnunf.png",
      alt: "File Eraser Screenshot 20",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/g59dppsz6gyjm10rf5lo.png",
      alt: "File Eraser Screenshot 21",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615237/mx6or4o6uenf3q42ipqg.png",
      alt: "File Eraser Screenshot 22",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/bj1yo6ykwgxvkp9bbmlm.png",
      alt: "File Eraser Screenshot 23",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/iuvskkxwxsawnvvk8i4l.png",
      alt: "File Eraser Screenshot 24",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/nalxxlyfrewjxtpptplf.png",
      alt: "File Eraser Screenshot 25",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/qxrifgrivw11cqhuegx0.png",
      alt: "File Eraser Screenshot 26",
    },
    {
      url: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1770615238/pb9yo6kfjwz8z4shw2vz.png",
      alt: "File Eraser Screenshot 27",
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

  const eraseTypes = [
    {
      name: "Files & Folders",
      desc: "Securely remove selected files, folders, and documents from local storage with multi-pass overwrite algorithms.",
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
      name: "Free Space & Deleted Data",
      desc: "Permanently wipe unused disk space and previously deleted files to prevent any chance of forensic recovery.",
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
      name: "Cloud Storage Data",
      desc: "Remove data from connected cloud platforms like Google Drive, OneDrive, Dropbox, and iCloud.",
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
      name: "High-Speed Erasure",
      desc: "Simultaneously erase multiple files and drives with optimized algorithms for maximum efficiency.",
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
      name: "Automate Erasure Tasks",
      desc: "Schedule automatic data destruction routines based on specific triggers or time intervals.",
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
      name: "Volume Erase",
      desc: "Completely erase volume partitions including boot sectors, partition tables, and all data structures.",
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

  const platforms = [
    {
      name: "Windows",
      versions: "Windows 10, 11, Server 2016+ etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
        </svg>
      ),
    },
    {
      name: "macOS",
      versions: "Monterey, Ventura, Sonoma, Sequoia etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Linux",
      versions: "Ubuntu, CentOS, Debian, RHEL etc.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.072-.2-.052-.334.033-.466.204-.263.466-.399.795-.528.396-.2.762-.269 1.139-.268h.13zm4.006 2.933c-.009.04-.009.037-.012.071-.075.443-.134.8-.166 1.2-.028.332-.043.663-.044.998l.003.467.004.073.009.135.003.2.016.267c.09.333.15.6.313.8.082.103.17.2.27.27.136.07.272.135.41.135.074 0 .15-.015.223-.04.31-.112.48-.332.618-.59.109-.202.17-.403.217-.598.04-.195.067-.39.08-.545.031-.4.049-.664.049-.664l-.003-.402-.01-.267-.014-.202c-.012-.133-.03-.266-.053-.397v-.003L13 9.4v-.003l-.048-.2h.003l.025.003c-.038-.007-.077-.01-.116-.02-.062-.01-.124-.029-.184-.04z" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "27+ Erasure Standards",
      desc: "Support for NIST 800-88, DoD 5220.22-M, Gutmann, HMG, and other internationally recognized erasure methods.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "Multi-Language Support",
      desc: "User-friendly interface available in 20+ languages for global enterprise deployment.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: "Cloud Data Erasure",
      desc: "Securely remove files from connected cloud storage services with verifiable deletion.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Scheduled Erasure",
      desc: "Automate data destruction with scheduled tasks for regular cleanup and compliance maintenance.",
      icon: <GearIcon className="w-6 h-6" />,
    },
    {
      title: "Drag & Drop Selection",
      desc: "Intuitive file selection with drag-and-drop interface for quick and easy data erasure.",
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
      title: "Detailed PDF Reports",
      desc: "Generate comprehensive, tamper-proof erasure certificates for audit and compliance documentation.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "Enterprise Scalability",
      desc: "Deploy across thousands of endpoints with centralized management and monitoring.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "Custom Branding",
      desc: "White-label solution with your organization's branding for client-facing reports.",
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      title: "Encryption",
      desc: "Military-grade encryption secures data before erasure, preventing unauthorized access during the process.",
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
      title: "Centralized Logging",
      desc: "Maintain a centralized immutable log of all erasure activities for security audits.",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      title: "Individual Privacy Protection",
      desc: "Stop identity theft before it happens. Recovered financial records and personal photos can be used for blackmail if not permanently erased.",
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
      title: "Enterprise Data Governance",
      desc: "Don't let your secrets become public. Deleted corporate data in the wrong hands leads to massive financial loss and reputation destruction.",
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
      title: "Cloud Data Exposure",
      desc: "Deleting files in the cloud doesn't mean they are gone. Ghost copies leave you vulnerable to breaches indefinitely without secure erasure.",
      icon: <CloudIcon className="w-8 h-8" />,
    },
    {
      title: "Avoid Compliance Fines",
      desc: "Regulatory fines can bankrupt a business. Failing to prove verifiable data destruction guarantees penalties under GDPR, HIPAA, and SOX.",
      icon: <ClipboardIcon className="w-8 h-8" />,
    },
  ];

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "/downloads/DataSheetFileEraser.pdf";
    link.download = "DataSheetFileEraser.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead
        seo={{
          title:
            "D-Secure File Eraser | Secure File & Folder Deletion Software",
          description:
            "Permanently erase files, folders, system traces, and cloud data with D-Secure File Eraser. NIST 800-88 compliant data destruction for privacy and security.",
          keywords:
            "file eraser, secure delete, data destruction, file shredder, privacy software, NIST 800-88, GDPR compliance",
          canonicalUrl: "https://dsecuretech.com/products/file-eraser",
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
                    Enterprise-Grade File Erasure
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      File Eraser
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
                      to="/pricing-and-plan?product=file-eraser"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Buy Now
                    </Link>
                    <button
                      onClick={downloadCatalog}
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
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - 3D Product Box */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl"></div>

                  {/* Floating Particles */}
                  <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-40"></div>
                  <div className="absolute top-[20%] right-[12%] w-1.5 h-1.5 bg-teal-400 rounded-full animate-[ping_2.5s_ease-in-out_infinite_0.5s] opacity-40"></div>
                  <div className="absolute bottom-[15%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2.8s_ease-in-out_infinite_1s] opacity-40"></div>
                  <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[ping_3.2s_ease-in-out_infinite_0.3s] opacity-40"></div>

                  {/* 3D Product Box Container */}
                  <div
                    className="relative animate-[float_4s_ease-in-out_infinite]"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    {/* Glow Behind Box */}
                    <div className="absolute inset-0 bg-emerald-500/40 blur-3xl rounded-3xl scale-110"></div>

                    {/* Main Box - Front Face */}
                    <div
                      className="relative w-[220px] h-[280px] lg:w-[280px] lg:h-[360px] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateY(-12deg) rotateX(5deg)",
                        boxShadow:
                          "25px 25px 60px rgba(0,0,0,0.3), -5px -5px 20px rgba(255,255,255,0.1), inset 0 0 80px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Top Shine Effect */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>

                      {/* Side Shadow (3D Effect) */}
                      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent"></div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 lg:p-8">
                        {/* D-Secure Badge */}
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                          <span className="text-white/80 text-[10px] lg:text-xs font-semibold tracking-widest uppercase">
                            D-Secure
                          </span>
                        </div>

                        {/* Main Icon */}
                        <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 lg:mb-6 border border-white/20 shadow-inner">
                          <svg
                            className="w-12 h-12 lg:w-16 lg:h-16 text-white drop-shadow-lg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight text-center mb-1 lg:mb-2">
                          File Eraser
                        </h3>

                        {/* Tagline */}
                        <p className="text-white/70 text-[10px] lg:text-xs text-center tracking-wide uppercase">
                          Secure Data Destruction
                        </p>

                        {/* Bottom Badge */}
                        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/20">
                            <svg
                              className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                            </svg>
                            <span className="text-white/90 text-[9px] lg:text-[11px] font-semibold">
                              Certified Erasure
                            </span>
                          </div>
                        </div>

                        {/* Decorative Lines */}
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                      </div>

                      {/* Animated Pulse Ring */}
                      <div className="absolute inset-0 border-2 border-white/10 rounded-2xl animate-pulse"></div>
                    </div>

                    {/* Right Side Face (3D) */}
                    <div
                      className="absolute top-0 right-0 w-[30px] lg:w-[40px] h-full bg-gradient-to-l from-emerald-800 to-emerald-700 rounded-r-lg"
                      style={{
                        transform:
                          "rotateY(90deg) translateZ(0px) translateX(15px)",
                        transformOrigin: "left center",
                      }}
                    ></div>

                    {/* Bottom Reflection */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[180px] lg:w-[240px] h-16 bg-gradient-to-t from-emerald-600/20 to-transparent blur-xl rounded-full"></div>
                  </div>

                  {/* CSS Animation Keyframes */}
                  <style>{`
                    @keyframes float {
                      0%, 100% { transform: translateY(0px) rotateY(-12deg) rotateX(5deg); }
                      50% { transform: translateY(-15px) rotateY(-8deg) rotateX(3deg); }
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Video Card */}
              <Reveal delayMs={100}>
                <div
                  onClick={() => setShowVideoModal(true)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                >
                  {/* Video Thumbnail - Custom Styled */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      {/* Logo/Icon Area */}
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

                      {/* Play Button */}
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

                      {/* Bottom Text */}
                      <p className="mt-4 text-white/70 text-sm font-medium">
                        Click to watch demo
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-500/20 to-transparent" />
                  </div>
                  {/* Video Info */}
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

              {/* Screenshot Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Screenshot 1 */}
                <Reveal delayMs={150}>
                  <div
                    onClick={() => setSelectedImageIndex(0)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_1_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
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
                      </div>
                      {/* Uncomment when image ready: */}
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1769790692/x2bqsc3nxzdfns3nyb5r.png"
                        alt="Dashboard View"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* <div className="p-3">
                      <span className="text-xs font-medium text-slate-700">Dashboard View</span>
                    </div> */}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 2 */}
                <Reveal delayMs={200}>
                  <div
                    onClick={() => setSelectedImageIndex(1)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_2_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
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
                      </div>
                      {/* Uncomment when image ready: */}
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1769790691/y0qoxkpzqqxw8f0vibb8.png"
                        alt="Erasure Report"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* <div className="p-3">
                      <span className="text-xs font-medium text-slate-700">Erasure Report</span>
                    </div> */}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 3 */}
                <Reveal delayMs={250}>
                  <div
                    onClick={() => setSelectedImageIndex(2)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_3_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
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
                      </div>
                      {/* Uncomment when image ready: */}
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1769790691/bdacwvgixrbp512igxz0.png"
                        alt="File Selection"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* <div className="p-3">
                      <span className="text-xs font-medium text-slate-700">File Selection</span>
                    </div> */}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Screenshot 4 - Shows "More" badge if additional images exist */}
                <Reveal delayMs={300}>
                  <div
                    onClick={() => setSelectedImageIndex(3)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {/* Replace SCREENSHOT_4_URL with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-slate-300"
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
                      </div>
                      {/* Uncomment when image ready: */}
                      <img
                        src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1769790692/cfpwnf2ii0sjjkknhdjl.png"
                        alt="Erasure Progress"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* More Images Badge */}
                      {additionalImagesCount > 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xl sm:text-2xl font-bold">
                            +{additionalImagesCount} More
                          </span>
                        </div>
                      )}
                    </div>
                    {/* <div className="p-3">
                      <span className="text-xs font-medium text-slate-700">Erasure Progress</span>
                    </div> */}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                      </div>
                    </div>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  How To Use <span className="text-emerald-600">D-Secure</span>{" "}
                  File Eraser?
                </h2>
                <p className="text-lg text-slate-600">
                  Downloadable Software For Windows, Mac & Linux OS
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Visual Flow Diagram (7 cols) */}
              <div className="lg:col-span-7">
                <Reveal delayMs={100}>
                  <div className="relative">
                    {/* Flow Steps */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                      {/* Step 1: Download */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 group-hover:border-emerald-300 transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <CloudIcon className="w-10 h-10 text-emerald-600" />
                          <div className="absolute -bottom-2">
                            <Download className="w-5 h-5 text-emerald-500 bg-white rounded-full p-0.5 shadow-sm" />
                          </div>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Download D-Secure File Eraser Software
                        </p>
                      </div>

                      {/* Arrow 1 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 2: Install */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 group-hover:border-emerald-300 transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <Monitor className="w-10 h-10 text-emerald-600" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Install D-Secure File Eraser
                        </p>
                      </div>

                      {/* Arrow 2 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 3: Select */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 group-hover:border-emerald-300 transition-colors w-28 h-28 flex items-center justify-center mb-4">
                          <ClipboardIcon className="w-10 h-10 text-emerald-600" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[140px]">
                          Select Files/Folders/ Volumes To Erase
                        </p>
                      </div>

                      {/* Arrow 3 */}
                      <div className="hidden md:flex items-center justify-center h-28 text-slate-300">
                        <ArrowRightIcon className="w-6 h-6" />
                      </div>

                      {/* Step 4: Erase */}
                      <div className="text-center flex-1 w-full md:w-auto flex flex-col items-center group">
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 group-hover:border-emerald-300 transition-colors w-28 h-28 flex items-center justify-center mb-4 relative">
                          <FileTextIcon className="w-10 h-10 text-emerald-600" />
                          <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <ShieldIcon className="w-4 h-4 text-emerald-500" />
                          </div>
                        </div>
                        <p className="font-semibold text-slate-800 text-sm max-w-[120px]">
                          Erase & Save Report
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Text Content (5 cols) */}
              <div className="lg:col-span-5">
                <Reveal delayMs={200}>
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      <strong className="text-slate-900">
                        D-Secure File Eraser
                      </strong>{" "}
                      can be deployed across{" "}
                      <strong className="text-slate-900">
                        Windows, Mac, and Linux
                      </strong>{" "}
                      systems to permanently erase files, folders, and traces
                      beyond recovery.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Select the file/s or folders or search the name to erase.
                      The <strong className="text-emerald-700">Cloud</strong>{" "}
                      allows administrators to execute and monitor erasures
                      remotely across multiple endpoints as well.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link
                        to="/support/help-manual/complete-manual"
                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
                      >
                        Help Manual
                        <ClipboardIcon className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* <div className="pt-2">
                      <Link
                        to="/support/help-manual"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium"
                      >
                        <div className="p-1 border border-slate-300 rounded">
                          <ClipboardIcon className="w-4 h-4" />
                        </div>
                        Help Manual
                      </Link>
                    </div> */}
                  </div>
                </Reveal>
              </div>
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
                    <div className="w-16 h-16 flex-shrink-0 text-emerald-600 flex items-center justify-center bg-emerald-50 rounded-2xl mb-4">
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
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0">
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
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
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
              {[
                {
                  q: "How is D-Secure File Eraser different from simply deleting files?",
                  a: "When you delete a file normally, only the reference to the data is removed—the actual data remains on your drive and can be recovered with forensic tools. D-Secure File Eraser overwrites the data multiple times using internationally recognized algorithms (like NIST 800-88, DoD 5220.22-M), making recovery impossible.",
                },
                {
                  q: "What erasure standards does File Eraser support?",
                  a: "D-Secure File Eraser supports 27+ erasure standards including NIST 800-88 Clear/Purge, DoD 5220.22-M (3-pass and 7-pass), Gutmann (35-pass), HMG IS5, RCMP TSSIT OPS-II, Peter Gutmann's method, and many more. You can choose the appropriate standard based on your compliance requirements.",
                },
                {
                  q: "Can I erase data from cloud storage services?",
                  a: "Yes! D-Secure File Eraser supports secure erasure from major cloud platforms including Google Drive, Microsoft OneDrive, Dropbox, and iCloud. It uses OAuth integration to securely connect and permanently remove files from your cloud storage.",
                },
                {
                  q: "Will I receive proof of erasure for compliance audits?",
                  a: "Absolutely. After every erasure operation, D-Secure generates a detailed PDF certificate that includes file details, erasure method used, timestamp, verification status, and a tamper-proof hash. These certificates are suitable for regulatory audits and compliance documentation.",
                },
                {
                  q: "Is the software suitable for enterprise deployment?",
                  a: "Yes, D-Secure File Eraser is designed for enterprise scalability. It supports Active Directory integration, Group Policy deployment, centralized management, scheduled erasure tasks, and can be deployed across thousands of endpoints with remote monitoring capabilities.",
                },
                {
                  q: "Does File Eraser support SSD and NVMe drives?",
                  a: "Yes, the software is optimized for all storage types including HDDs, SSDs, NVMe drives, and USB storage devices. It uses appropriate erasure techniques for each storage type to ensure complete and verifiable data destruction.",
                },
                {
                  q: "What ongoing support is provided?",
                  a: "We provide continuous support including regular software updates, technical assistance, compliance monitoring, and renewal coordination. Think of us as your ongoing partner in data hygiene.",
                },
              ].map((faq, i) => (
                <Reveal key={i} delayMs={i * 50}>
                  <details className="group bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900 pr-4">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-open:rotate-180 transition-transform">
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
                      {faq.a}
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
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">
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
              src="https://res.cloudinary.com/dhwi5wevf/video/upload/v1770725346/jqkinwc7zk4w2ak9nplw.3gp"
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

export default FileEraserPage;
