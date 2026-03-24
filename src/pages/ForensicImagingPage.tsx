import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getSEOForPage } from "@/utils/seo";
import {
  ShieldIcon,
  CheckIcon,
  GearIcon,
  ClipboardIcon,
  TagIcon,
} from "@/components/FlatIcons";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import { ProductContactForm } from "@/components/forms";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import {
  FileCheck,
  ShieldCheck,
  Workflow,
  Activity,
  Cpu,
  Cloud,
  Zap,
  HardDrive as HardDriveIcon,
  Database as DatabaseIcon,
  Layers as LayersIcon,
  Search as SearchIcon,
  Lock as LockIcon,
  Boxes as BoxesIcon,
  RefreshCcw as RefreshCcwIcon,
  FileText as FileTextIcon,
  ChevronDown
} from "lucide-react";

const ForensicImagingPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = globalThis.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "acquisition-types", "how-it-works", "verification", "features", "use-cases", "faq", "contact"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 150;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          setActiveSection(section);
        }
      }
    }

    // Sync with MainLayout header visibility
    const isDesktop = globalThis.innerWidth >= 768;
    if (isDesktop) {
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: scrollPosition > 400 },
        })
      );
    }
  }, []);

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      // Clean up header visibility on unmount
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } })
        );
      }
    };
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: id === "overview" ? 0 : elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const standards = [
    { title: "Physical Write-Blocking", desc: "Ensures source devices remain unmodified during the entire imaging process.", icon: <LockIcon className="w-5 h-5" /> },
    { title: "Universal Interface Support", desc: "SATA, SAS, IDE, USB 3.0, PCIe, NVMe, and Memory Card support.", icon: <HardDriveIcon className="w-5 h-5" /> },
    { title: "E01 & Ex01 Formats", desc: "Industry-standard compressed forensic image formats with metadata support.", icon: <FileTextIcon className="w-5 h-5" /> },
    { title: "Raw (dd) Imaging", desc: "Bit-for-bit physical copies for maximum compatibility with analysis tools.", icon: <LayersIcon className="w-5 h-5" /> },
  ];

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "acquisition-types", label: "Acquisition" },
    { id: "how-it-works", label: "Workflow" },
    { id: "verification", label: "Integrity" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const acquisitionTypes = [
    {
      title: "Physical Imaging",
      desc: "Bit-by-bit duplication of the entire storage device, including unallocated space and hidden partitions (HPA/DCO).",
      icon: <DatabaseIcon className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Logical Acquisition",
      desc: "Targeted acquisition of specific files, folders, or partitions when full physical imaging is not required or restricted.",
      icon: <LayersIcon className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Volatile RAM Capture",
      desc: "Capture live system memory to recover volatile data like encryption keys, passwords, and active network connections.",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Live System Imaging",
      desc: "Acquire data from running systems through secure network protocols without powering down the evidence source.",
      icon: <Activity className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Cloud Acquisition",
      desc: "Direct imaging from cloud services like AWS S3, Azure Blob, and Google Cloud Storage via secure APIs.",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Encrypted Volume Setup",
      desc: "Auto-detect and mount encrypted volumes (BitLocker, FileVault, LUKS) for decrypted data acquisition.",
      icon: <LockIcon className="w-8 h-8" />,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const useCases = [
    {
      title: "Digital Investigations",
      desc: "Provide law enforcement and forensic labs with bit-perfect evidence replicas for criminal and civil cases.",
      icon: <SearchIcon className="w-6 h-6" />,
    },
    {
      title: "Incident Response",
      desc: "Rapidly acquire system images during a breach to analyze malware, unauthorized access, and data exfiltration.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Internal Corporate Audit",
      desc: "Securely document internal policy violations, IP theft, or employee misconduct with admissible evidence.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "Data Recovery",
      desc: "Create safe clones of failing hardware to perform deep data recovery without further stressing the source media.",
      icon: <RefreshCcwIcon className="w-6 h-6" />,
    },
  ];

  const verificationFeatures = [
    { 
      title: "Real-Time Hashing", 
      desc: "Simultaneous calculation of multiple hash signatures (MD5, SHA-1, SHA-256) during the entire acquisition process.", 
      icon: <ShieldCheck className="w-10 h-10" /> 
    },
    { 
      title: "Write-Blocking Support", 
      desc: "Seamless integration with hardware write-blockers and software-level protections to prevent any data modification.", 
      icon: <LockIcon className="w-10 h-10" /> 
    },
    { 
      title: "Audit Log Generation", 
      desc: "Comprehensive PDF/CSV logs documenting hardware IDs, timestamps, and technician details for chain of custody.", 
      icon: <FileCheck className="w-10 h-10" /> 
    },
  ];

  const moreFeatures = [
    {
      title: "Multicast Architecture",
      desc: "Simultaneously image or deploy images across 100+ systems in a high-speed local network environment.",
      icon: <BoxesIcon className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "E01/Ex01 Support",
      desc: "Industry-standard compressed formats with internal metadata, hash storage, and evidence details.",
      icon: <FileTextIcon className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Intelligent Resume",
      desc: "Automatically resume interrupted imaging sessions with block-level validation to prevent data corruption.",
      icon: <RefreshCcwIcon className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Decentralized Imaging",
      desc: "Leverage Peer-to-Peer protocols for resilient mass imaging across high-latency enterprise networks.",
      icon: <Workflow className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "HPA/DCO Acquisition",
      desc: "Access hidden Host Protected Areas (HPA) and Device Configuration Overlays (DCO) to find concealed data.",
      icon: <HardDriveIcon className="w-5 h-5" />,
    },
    {
      title: "Direct API Access",
      desc: "Integrate with Case Management and Digital Asset Management systems via our secure REST API.",
      icon: <GearIcon className="w-5 h-5" />,
    },
    {
      title: "Custom Metadata",
      desc: "Add case numbers, evidence tags, and technician notes directly into the forensic image headers.",
      icon: <TagIcon className="w-5 h-5" />,
    },
    {
      title: "Secure Verification",
      desc: "Automated block-by-block verification after imaging to ensure 100% mathematical certainty of the replicate.",
      icon: <ShieldCheck className="w-5 h-5" />,
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("forensic-imaging")} />
      
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
                <ThemeAwareLogo className="h-7 sm:h-8 w-auto" responsive={true} />
              </Link>
              <nav className="flex items-center gap-1">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
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
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8 text-left">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <ShieldIcon className="w-4 h-4" />
                    Forensic-Grade Acquisition
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Forensic Imaging
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Create immutable, bit-for-bit duplicates of any storage media. Optimized for high-speed acquisition with built-in write-blocking and cryptographic verification.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {["E01/Ex01", "dd (Raw)", "DMG", "VHDX", "AFF", "SMART"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-slate-700">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={() => scrollToSection("acquisition-types")}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-200 bg-white text-emerald-800 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                    >
                      View Acquisition Specs
                    </button>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl rounded-full"></div>

                  <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                  <div className="absolute bottom-[15%] right-[10%] w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-40"></div>

                  <div className="relative group transition-transform duration-700 hover:rotate-y-12">
                     <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-emerald-50 overflow-hidden w-[280px] xs:w-[340px] lg:w-[380px] mx-auto transform hover:-translate-y-2 transition-all duration-500">
                        <div className="space-y-8">
                           <div className="flex items-center justify-between border-b pb-6 border-emerald-50">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                                   <DatabaseIcon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                   <h4 className="font-bold text-slate-900 line-clamp-1">Source: SAS Drive 2TB</h4>
                                   <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Write-Blocking Active</p>
                                </div>
                             </div>
                             <LockIcon className="w-5 h-5 text-emerald-500" />
                           </div>

                           <div className="space-y-3">
                              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                 <span>IMAGING PROGRESS</span>
                                 <span>82%</span>
                              </div>
                              <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-teal-500 w-[82%] rounded-full shadow-lg h-full"></div>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                                 <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Avg Speed</p>
                                 <p className="text-xl font-black text-slate-900">1.4 GB/s</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                                 <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Time left</p>
                                 <p className="text-xl font-black text-slate-900">04:12</p>
                              </div>
                           </div>

                           <div className="p-5 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200 text-left">
                              <p className="text-[10px] text-emerald-200 font-bold mb-2 uppercase tracking-widest">Hash Fingerprint (SHA-256)</p>
                              <p className="text-[10px] font-mono text-white break-all leading-tight opacity-90">
                                 7F83B12787B6BC1B498A190BA...
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 italic tracking-tight">Industrial Scale Acquisition</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  A high-speed, automated forensic workflow designed for investigators processing large volumes of evidence with absolute data integrity.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-4 lg:gap-8">
              {[
                { step: "01", title: "Connect", desc: "Plug in evidence media via physical write-blocker or secure network protocol.", icon: <HardDriveIcon className="w-6 h-6" /> },
                { step: "02", title: "Setup", desc: "Configure hash algorithms (MD5/SHA) and select output format (E01/dd).", icon: <GearIcon className="w-6 h-6" /> },
                { step: "03", title: "Acquire", desc: "Run bit-for-bit imaging at speeds up to 3.5 GB/s with real-time logging.", icon: <Zap className="w-6 h-6" /> },
                { step: "04", title: "Verify", desc: "Automated block-level hash verification and court-ready report generation.", icon: <ShieldCheck className="w-6 h-6" /> },
              ].map((item) => (
                <Reveal key={item.title} delayMs={Number.parseInt(item.step) * 100}>
                  <div className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all group">
                    <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ACQUISITION TYPES ================= */}
        <section id="acquisition-types" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight">Complete Evidence Support</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Go beyond standard disk cloning. Our solution handles Physical, Logical, and Volatile data to ensure comprehensive discovery.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {acquisitionTypes.map((type, i) => (
                <Reveal key={type.title} delayMs={i * 100}>
                  <div className="group relative p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-2xl transition-all h-full overflow-hidden text-left">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.color} opacity-[0.03] -mr-16 -mt-16 rounded-full transition-all group-hover:scale-110`}></div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{type.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STANDARDS SECTION ================= */}
        <section id="standards" className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="grid grid-cols-2 gap-4">
                  {standards.map((s) => (
                    <div key={s.title} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-emerald-300 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                       <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                         {s.icon}
                       </div>
                       <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                       <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Compliance-First <br/>
                    <span className="text-emerald-600">Forensic Workflows</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Designed for digital forensic practitioners, ITADs, and security researchers. Our imaging tool bridges the gap between raw hardware access and legal admissibility with absolute data integrity.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Bit-for-Bit Physical Copies",
                      "Logical Data Acquisition",
                      "HPA and DCO regions",
                      "Disk-to-Disk Imaging",
                      "Encrypted Volume support",
                      "Remote Network Acquisition",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                        <CheckIcon className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= VERIFICATION SECTION ================= */}
        <section id="verification" className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#064e3b20_0%,transparent_100%)]"></div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28 text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20 mb-8 mx-auto">
                   Cryptographic Verification
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Every Byte Matters.</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  D-Secure ensures that your forensic image is a perfect, verifiable replica of the original evidence source, ready for legal production.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {verificationFeatures.map((f) => (
                <Reveal key={f.title}>
                   <div className="text-center p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      {React.cloneElement(f.icon as React.ReactElement, { className: "w-8 h-8" })}
                    </div>
                    <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURE GRID ================= */}
        <section id="features" className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-28 gap-8">
                <div className="max-w-2xl text-left">
                   <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Advanced Capabilities</h2>
                   <p className="text-lg text-slate-600 leading-relaxed">
                     From single-drive investigations to mass imaging in enterprise networks, our tool handles heavy throughput with absolute precision.
                   </p>
                </div>
                <div className="flex items-center gap-4 text-emerald-700 font-black bg-emerald-50 px-8 py-5 rounded-[2rem] border border-emerald-100 shadow-sm transition-transform hover:scale-105">
                   <Zap className="w-6 h-6 text-emerald-500 animate-pulse" />
                   UP TO 3.5 GB/s
                </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {moreFeatures.map((feat, i) => (
                <Reveal key={feat.title} delayMs={i * 100}>
                  <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 transition-all h-full text-left relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Enterprise Investigation Enabler</h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  From critical security incidents to law enforcement support, we provide the backbone for immutable digital discovery.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((use, i) => (
                <Reveal key={use.title} delayMs={i * 100}>
                  <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all text-left">
                    <div className="w-16 h-16 flex-shrink-0 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                      {use.icon}
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-xl font-bold text-white">{use.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed">{use.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-24 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 italic tracking-tight">Forensic Q&A</h2>
                <p className="text-lg text-slate-600">Advanced answers for digital forensic professionals</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Is it compatible with my existing hardware write-blockers?",
                  a: "Absolutely. D-Secure Forensic Imaging is designed to work seamlessly with all industry-standard hardware write-blockers (Tableau, UltraBlock, FRED). It provides the software imaging layer required to create your audit-ready evidence files.",
                },
                {
                  q: "Can I generate legally admissible reports?",
                  a: "Yes. Every image acquisition includes a cryptographic audit trail. Our reports document timestamps, hardware IDs, hashing algorithms, and verification results, meeting DOJ and international forensic standards for admissibility.",
                },
                {
                  q: "What is the maximum disk size supported?",
                  a: "Our tool supports all modern LBA (Logical Block Addressing) standards, effectively removing capacity limits. We have successfully tested with 20TB+ enterprise SAS arrays and NVMe pools.",
                },
                {
                  q: "How does it handle bad sectors?",
                  a: "D-Secure uses an intelligent retry mechanism for unstable sectors. You can configure the number of retries and choose to 'skip and log' to ensure as much data as possible is recovered without damaging the evidence source.",
                },
              ].map((faq) => (
                <Reveal key={faq.q}>
                  <details className="group bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm">
                    <summary className="flex items-center justify-between p-7 cursor-pointer list-none">
                      <span className="font-bold text-slate-900 pr-4 text-base lg:text-lg">{faq.q}</span>
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-open:rotate-180 transition-transform shadow-inner">
                        <ChevronDown className="w-6 h-6" />
                      </span>
                    </summary>
                    <div className="px-7 pb-8 text-slate-600 leading-relaxed text-sm lg:text-base border-t border-slate-50 pt-6">
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT / CTA ================= */}
        <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
           {/* Subtle background patterns */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
 
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
              source="Forensic Imaging Page Contact"
              solutionType="forensic-imaging"
              title="Start Your Secure Acquisition"
              subtitle="Deploy D-Secure Forensic Imaging in your lab or field operations. Guaranteed integrity, unrivaled speed."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default ForensicImagingPage;
