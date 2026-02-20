import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import {
  ShieldIcon,
  ArrowRightIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  GlobeIcon,
  ClipboardIcon,
  GearIcon,
  LightningIcon,
  StarIcon,
  HoverIcon,
  CheckIcon,
} from "@/components/FlatIcons";

/* ───────────── data ───────────── */

const solutions = [
  {
    title: "D-Secure Drive Eraser",
    desc: "Permanently erase data from HDD, SSD, NVMe drives on PC, Mac, Servers, RAID arrays & Chromebooks. Supports on-site, off-site & remote erasure via USB boot, PXE network boot, or MSI deployment. Generates tamper-proof erasure certificates for audit compliance.",
    icon: DatabaseIcon,
    color: "emerald",
    link: "/products/drive-eraser",
  },
  {
    title: "D-Secure File Eraser",
    desc: "Selectively erase files, folders, free space, system traces, browser history & cloud storage data on Windows, macOS & Linux. Schedule automated erasure tasks, drag-and-drop file selection, and generate detailed PDF reports for compliance documentation.",
    icon: ClipboardIcon,
    color: "teal",
    link: "/products/file-eraser",
  },
];

const capabilities = [
  {
    title: "Reliable Data Erasure",
    desc: "100% guaranteed erasure of sensitive data from HDDs & SSDs across PCs, laptops, Macs, and servers, & mobile devices beyond recovery.",
    icon: ShieldIcon,
  },
  {
    title: "Cloud Console",
    desc: "Secure cloud dashboard that provides flexibility to create users, manage license distribution & maintain a central repository of reports & certificates.",
    icon: CloudIcon,
  },
  {
    title: "Global Wiping Standards",
    desc: "Supports an extensive list of up to 26 global data erasure standards including NIST 800-88 Purge, NIST 800-88 Clear, IEEE 2883-2022, DoD 3 Pass, HMG, etc.",
    icon: GlobeIcon,
  },
  {
    title: "Reports for Audit Trails",
    desc: "Generates data erasure reports for audit trails with the option to customize and save reports in various formats like PDF, and XML.",
    icon: ClipboardIcon,
  },
  {
    title: "Data Erasure Certificate",
    desc: "Generates 100% tamper-proof data erasure certificate that ensures compliance with EU-GDPR, SOX, GLBA, HIPAA & other international data protection regulations.",
    icon: StarIcon,
  },
  {
    title: "Automate Data Erasure",
    desc: "Automate media sanitization with D-Secure ISO customization to standardize data wiping, eliminate human errors, and ensure consistency across sites.",
    icon: LightningIcon,
  },
  {
    title: "Accurate Diagnostics",
    desc: "Device diagnostics are integrated into the data erasure software, helping assess device health and confirm functionality through a series of automated and manual tests.",
    icon: GearIcon,
  },
  {
    title: "Centrally Managed Bulk Erasure",
    desc: "Use the network cloud variant to wipe multiple devices or drives over a local network through PXE boot, while managing, monitoring, and reporting through the cloud console.",
    icon: DatabaseIcon,
  },
  {
    title: "API & ERP Integration",
    desc: "D-Secure Drive & Mobile Eraser/Diagnostics software integrates with ERP systems. Cloud API is available to feed data into asset-management tools for seamless data transfer.",
    icon: ServerIcon,
  },
];

const useCases = [
  {
    title: "Disposing End-Of-Life IT Assets",
    content:
      "Disposal of old IT assets through physical destruction methods does not guarantee 100% safe media sanitization. For example, shredding can pose a threat of data leakage while the media is 'in transit' to the shredding facility. Likewise, degaussing cannot sanitize flash storage as per NIST SP 800-88 Guideline. Data erasure technology can neutralize all the data threats on end-of-life devices by overwriting the media.",
  },
  {
    title: "Returning Leased IT Assets",
    content:
      "When returning leased IT assets, organizations must ensure all sensitive data is permanently removed. D-Secure data erasure provides verifiable proof of data sanitization through tamper-proof certificates, ensuring compliance with leasing agreements and data protection regulations. This protects both the lessee and lessor from potential data breaches.",
  },
  {
    title: "Reselling IT Assets or Personal Devices",
    content:
      "Before reselling used IT equipment or personal devices, it's critical to permanently erase all data. Simple formatting or factory reset is not sufficient — data can be recovered using forensic tools. D-Secure's compliance-ready data erasure ensures complete data removal beyond recovery, maximizing resale value while protecting sensitive information.",
  },
];

const faqs = [
  {
    q: "What types of storage media can D-Secure erase?",
    a: "D-Secure can erase HDDs, SSDs, NVMe drives, USB drives, memory cards, and more across PCs, Macs, servers, laptops, Chromebooks, and mobile devices (iOS & Android).",
  },
  {
    q: "Do I need separate licenses for different types of drives (HDD, SSD, NVMe, etc.)?",
    a: "No, a single D-Secure Drive Eraser license covers all types of drives connected to a machine. Whether it's HDD, SSD, NVMe, or any other storage media, one license handles them all.",
  },
  {
    q: "Can I diagnose the essential components of the drive?",
    a: "Yes, D-Secure includes integrated hardware diagnostics that assess the health of storage drives. This includes SMART data analysis, surface scan testing, and comprehensive health reporting before or after erasure.",
  },
  {
    q: "What erasure standards does D-Secure support?",
    a: "D-Secure supports 26+ global erasure standards including NIST 800-88 (Clear & Purge), DoD 5220.22-M, IEEE 2883-2022, HMG Infosec Standard 5, RCMP TSSIT OPS-II, and many more.",
  },
  {
    q: "Can D-Secure wipe multiple iOS and Android devices simultaneously?",
    a: "Yes, D-Secure Mobile Eraser supports batch processing of multiple iOS and Android devices simultaneously, making it ideal for enterprise environments with large device fleets.",
  },
  {
    q: "What are the features of D-Secure File Eraser software?",
    a: "D-Secure File Eraser provides selective file and folder erasure, scheduled erasure, cloud storage erasure (Google Drive, OneDrive), browser trace cleaning, and tamper-proof erasure certificates with full audit trails.",
  },
];

/* ─────────── helpers ─────────── */
const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: {
    bg: "from-emerald-50 to-emerald-100/50",
    border: "border-emerald-200/60 hover:border-emerald-400",
    text: "text-emerald-600",
    iconBg: "from-emerald-500 to-emerald-600",
  },
  teal: {
    bg: "from-teal-50 to-teal-100/50",
    border: "border-teal-200/60 hover:border-teal-400",
    text: "text-teal-600",
    iconBg: "from-teal-500 to-teal-600",
  },
  cyan: {
    bg: "from-cyan-50 to-cyan-100/50",
    border: "border-cyan-200/60 hover:border-cyan-400",
    text: "text-cyan-600",
    iconBg: "from-cyan-500 to-cyan-600",
  },
  blue: {
    bg: "from-blue-50 to-blue-100/50",
    border: "border-blue-200/60 hover:border-blue-400",
    text: "text-blue-600",
    iconBg: "from-blue-500 to-blue-600",
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100/50",
    border: "border-indigo-200/60 hover:border-indigo-400",
    text: "text-indigo-600",
    iconBg: "from-indigo-500 to-indigo-600",
  },
  purple: {
    bg: "from-purple-50 to-purple-100/50",
    border: "border-purple-200/60 hover:border-purple-400",
    text: "text-purple-600",
    iconBg: "from-purple-500 to-purple-600",
  },
};

/* ═══════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════ */
const DataEraserSoftwarePage: React.FC = memo(function DataEraserSoftwarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openUseCase, setOpenUseCase] = useState<number>(0);
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "products", label: "Products" },
    { id: "use-cases", label: "Use Cases" },
    { id: "capabilities", label: "Capabilities" },
    { id: "solutions", label: "Solutions" },
    { id: "why-dsecure", label: "Why D-Secure" },
    { id: "faq", label: "FAQ" },
    { id: "cta", label: "Get Started" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        window.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

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
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("data-eraser-software")} />

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
        {/* ═══════════ HERO ═══════════ */}
        <section className="py-16 lg:py-24 xl:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    D-Secure Data Eraser Software
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    100% Guaranteed{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Data Wiping
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Erase data from HDD, SSD, PC, Mac, Server & Mobile devices
                    onsite, offsite & remotely. Helps meet compliance with laws
                    and regulations.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "ISO 27001"].map((badge) => (
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
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <HoverIcon>
                        {(filled) => (
                          <ArrowRightIcon className="w-5 h-5" filled={filled} />
                        )}
                      </HoverIcon>
                      Submit Enquiry
                    </Link>
                    <Link
                      to="/pricing-and-plan"
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13v5a2 2 0 002 2h6.5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Right: Floating Monitor with D-Secure Dashboard */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[340px] sm:min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl"></div>

                  {/* Orbiting Device Icons */}
                  <div className="absolute inset-0 hidden sm:block">
                    {[
                      { top: "5%", left: "10%", label: "HDD", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", delay: "0s" },
                      { top: "8%", right: "5%", label: "SSD", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", delay: "0.6s" },
                      { bottom: "25%", left: "2%", label: "Mobile", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", delay: "1.2s" },
                      { bottom: "15%", right: "3%", label: "Cloud", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", delay: "0.3s" },
                      { top: "45%", left: "0%", label: "Server", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", delay: "0.9s" },
                      { bottom: "5%", left: "35%", label: "Mac", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", delay: "1.5s" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="absolute group"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                      >
                        <div
                          className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl shadow-lg border border-emerald-100 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl hover:border-emerald-400"
                          style={{ animation: `deviceBob 3s ease-in-out infinite ${item.delay}` }}
                        >
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] lg:text-[9px] font-medium text-slate-500 whitespace-nowrap">
                          {item.label}
                        </span>
                        {/* Connection line to center */}
                        <div className="absolute top-1/2 left-1/2 w-8 lg:w-12 h-px bg-gradient-to-r from-emerald-300/40 to-transparent origin-left" style={{ transform: `rotate(${item.right ? '180deg' : '0deg'})` }}></div>
                      </div>
                    ))}
                  </div>

                  {/* Main Monitor */}
                  <div
                    className="relative z-10"
                    style={{ animation: "monitorFloat 6s ease-in-out infinite" }}
                  >
                    {/* Glow behind monitor */}
                    <div className="absolute -inset-6 lg:-inset-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full"></div>

                    {/* Monitor frame */}
                    <div className="relative w-[260px] sm:w-[300px] lg:w-[380px]">
                      {/* Screen bezel */}
                      <div className="bg-slate-900 rounded-t-xl sm:rounded-t-2xl p-1.5 sm:p-2 lg:p-2.5 shadow-2xl border border-slate-700/50"
                        style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.15)" }}
                      >
                        {/* Screen content */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl overflow-hidden">
                          {/* Title bar */}
                          <div className="flex items-center justify-between px-3 py-1.5 sm:py-2 bg-slate-800/80 border-b border-slate-700/50">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-slate-500 font-medium">D-Secure Console</span>
                            <div className="w-6"></div>
                          </div>

                          {/* Dashboard content */}
                          <div className="p-2.5 sm:p-3 lg:p-4 space-y-2 sm:space-y-3">
                            {/* Top stats row */}
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-1.5 sm:p-2 text-center">
                                <div className="text-emerald-400 font-bold text-xs sm:text-sm lg:text-lg">847</div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">Devices Wiped</div>
                              </div>
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-1.5 sm:p-2 text-center">
                                <div className="text-teal-400 font-bold text-xs sm:text-sm lg:text-lg">100%</div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">Success Rate</div>
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-1.5 sm:p-2 text-center">
                                <div className="text-cyan-400 font-bold text-xs sm:text-sm lg:text-lg">26+</div>
                                <div className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 uppercase">Standards</div>
                              </div>
                            </div>

                            {/* Active erasure task */}
                            <div className="bg-slate-800/60 rounded-lg p-2 sm:p-2.5 border border-slate-700/40">
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <ShieldIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                  </div>
                                  <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-white font-medium">Batch Erasure — NIST 800-88</span>
                                </div>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="h-1 sm:h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "72%", animation: "progressGrow 3s ease-in-out infinite" }}></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-[6px] sm:text-[7px] text-slate-500">12 of 16 devices</span>
                                <span className="text-[6px] sm:text-[7px] text-emerald-400 font-bold">72%</span>
                              </div>
                            </div>

                            {/* Recent reports mini list */}
                            <div className="space-y-1">
                              {[
                                { name: "WD Blue 2TB", status: "verified", time: "2m ago" },
                                { name: "Samsung 870 EVO", status: "verified", time: "5m ago" },
                                { name: "iPhone 14 Pro", status: "in-progress", time: "now" },
                              ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between px-2 py-1 rounded bg-slate-800/40">
                                  <div className="flex items-center gap-1.5">
                                    <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${item.status === 'verified' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></div>
                                    <span className="text-[7px] sm:text-[8px] text-slate-400">{item.name}</span>
                                  </div>
                                  <span className="text-[6px] sm:text-[7px] text-slate-600">{item.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monitor stand */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 sm:w-20 lg:w-24 h-4 sm:h-5 lg:h-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-sm"></div>
                        <div className="w-24 sm:w-28 lg:w-36 h-1.5 sm:h-2 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes monitorFloat {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                    }
                    @keyframes deviceBob {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-6px); }
                    }
                    @keyframes progressGrow {
                      0%, 100% { width: 72%; }
                      50% { width: 78%; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════ OUR PRODUCTS (2 cards) ═══════════ */}
        <section id="products" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Our Data Erasure{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Products
                  </span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Two powerful solutions designed for complete data sanitization — from full-disk erasure to selective file wiping
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {solutions.map((s, i) => {
                const c = colorMap[s.color] || colorMap.emerald;
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delayMs={i * 80}>
                    <Link
                      to={s.link}
                      className={`group relative bg-gradient-to-br ${c.bg} rounded-2xl p-7 border ${c.border} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 block h-full`}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      <span
                        className={`inline-flex items-center text-sm font-semibold ${c.text} group-hover:gap-2 transition-all`}
                      >
                        Learn More
                        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ USE CASES ═══════════ */}
        <section id="use-cases" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left — illustration placeholder */}
              <Reveal>
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-10 lg:p-14 flex items-center justify-center min-h-[360px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
                      <ShieldIcon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-800">
                      D-Secure Use Cases
                    </h3>
                    <p className="text-sm text-emerald-700/80 max-w-xs">
                      When to use D-Secure Data Eraser Software
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right — accordion */}
              <div className="space-y-4">
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Use Cases
                    </span>
                  </h2>
                  <p className="text-slate-600 mb-6">
                    When to use D-Secure Data Eraser Software
                  </p>
                </Reveal>

                {useCases.map((uc, i) => (
                  <Reveal key={uc.title} delayMs={i * 80}>
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                      <button
                        onClick={() =>
                          setOpenUseCase(openUseCase === i ? -1 : i)
                        }
                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900">
                          {uc.title}
                        </span>
                        <svg
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                            openUseCase === i ? "rotate-180" : ""
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
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openUseCase === i
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {uc.content}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CAPABILITIES 3×3 ═══════════ */}
        <section id="capabilities" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  D-Secure Software With{" "}
                  <span className="text-emerald-400">
                    Excellent Capabilities
                  </span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Scalable, manageable & cost-effective solution
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <Reveal key={cap.title} delayMs={i * 60}>
                    <div className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* CTAs */}
            <Reveal delayMs={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Submit Enquiry
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Buy Now
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ DATA WIPING SOLUTIONS ═══════════ */}
        <section id="solutions" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  D-Secure{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Data Wiping Solutions
                  </span>{" "}
                  To Meet Your Needs
                </h2>
                <p className="text-emerald-600 font-semibold mb-4">
                  100% Data Erasure Beyond Data Recovery
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-slate-600 text-center max-w-4xl mx-auto mb-14 leading-relaxed">
                Our compliance-ready data erasure software ensures the permanent
                wiping of sensitive data from Drives, Laptops, Mac, Chromebooks,
                Servers & Mobile devices. This data wiping software generates
                tamper-proof erasure certificates, helping organizations mitigate
                risks & attain compliance with laws and standards like EU-GDPR,
                CPRA, GLBA, HIPAA, PCI-DSS, & ISO-27001.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {solutions.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={`sol2-${s.title}`} delayMs={i * 80}>
                    <Link
                      to={s.link}
                      className="group bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200/60 p-6 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 block h-full"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY D-SECURE ═══════════ */}
        <section id="why-dsecure" className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Why Choose D-Secure?
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                  Purpose-built for organizations that take data privacy seriously
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {[
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  title: "26+ Erasure Standards",
                  desc: "Aligned with NIST 800-88, DoD 5220.22-M, IEEE 2883, HMG & more international standards",
                },
                {
                  icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                  title: "100% Data Removal",
                  desc: "Overwrites every sector on HDD, SSD, NVMe — data becomes irrecoverable by any forensic tool",
                },
                {
                  icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                  title: "Tamper-Proof Reports",
                  desc: "Auto-generated erasure certificates in PDF & XML — ready for audits and regulatory reviews",
                },
                {
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Multi-Platform Support",
                  desc: "Works across Windows, macOS, Linux, Chromebook, iOS & Android — one tool for all devices",
                },
                {
                  icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                  title: "Cloud Console",
                  desc: "Centralized dashboard to manage licenses, users, and store all erasure reports securely",
                },
                {
                  icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                  title: "Dedicated Support",
                  desc: "Direct access to our engineering team for onboarding, deployment help & technical queries",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delayMs={i * 80}>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-white/65 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Most Popular{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    FAQs
                  </span>
                </h2>
                <p className="text-slate-600">
                  Didn't find your answer? We are happy to help.{" "}
                  <Link
                    to="/contact"
                    className="text-emerald-600 font-semibold hover:underline"
                  >
                    Ask us
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delayMs={i * 60}>
                  <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-slate-900 pr-4">
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
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
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === i
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Secure Your Data?
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                Get started with D-Secure's compliance-ready data erasure software.
                Protect your organization from data breaches and ensure
                regulatory compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <HoverIcon>
                    {(filled) => (
                      <ArrowRightIcon
                        className="w-5 h-5 mr-2"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                  Submit Enquiry
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13v5a2 2 0 002 2h6.5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Buy Now
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default DataEraserSoftwarePage;
