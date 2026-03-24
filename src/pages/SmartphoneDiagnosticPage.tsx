import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Zap,
  Smartphone,
  Shield,
  FileText,
  Settings,
  Globe,
  Wifi,
  Battery,
  Camera,
  Monitor,
  Cpu,
  ChevronDown,
  Eraser,
  Layers,
  Search,
  CheckCircle,
  Database,
  ShieldCheck,
  Workflow,
  Layout,
  RefreshCcw,
  Server,
  Bluetooth,
  Radio,
  Mic,
} from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { 
  BuildingIcon,
  GlobeIcon,
  BriefcaseIcon,
  ServerIcon,
  ClipboardIcon,
  TagIcon
} from "@/components/FlatIcons";
import Reveal from "../components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import { ProductContactForm } from "@/components/forms";

// Reusing Icons from the theme
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SmartphoneDiagnosticPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "tests", "grading", "features", "faq", "contact"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 100;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          setActiveSection(section);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Sync with MainLayout header visibility
  useEffect(() => {
    const event = new CustomEvent("stickyNavVisible", {
      detail: { visible: isNavVisible },
    });
    globalThis.dispatchEvent(event);

    return () => {
      // Ensure header is restored when leaving the page
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: false },
        })
      );
    };
  }, [isNavVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === "overview" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DSec-SmartPhone-Diagnostic-Datasheet.pdf";
    link.download = "DSec-SmartPhone-Diagnostic-Datasheet.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "diag-tests", label: "Diag Tests" },
    { id: "features", label: "Features" },
    { id: "platforms", label: "Platforms" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const diagnosticTests = [
    { 
      title: "Core Hardware", 
      icon: <Cpu className="w-8 h-8" />, 
      desc: "Comprehensive check of CPU performance, RAM integrity, Internal Storage (NAND), and OTG functionality.",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Display & Touch", 
      icon: <Monitor className="w-8 h-8" />, 
      desc: "Pixel-perfect check for dead pixels, backlight uniformity, and multi-touch sensitivity with pressure mapping.",
      color: "from-teal-500 to-emerald-600"
    },
    { 
      title: "Battery Health", 
      icon: <Battery className="w-8 h-8" />, 
      desc: "Detailed analysis of battery cycle count, design vs. current capacity, and a 2-minute battery drain test.",
      color: "from-amber-500 to-orange-600"
    },
    { 
      title: "Connectivity", 
      icon: <Wifi className="w-8 h-8" />, 
      desc: "Stress testing Wi-Fi (2.4/5GHz), Bluetooth 5.0+, GPS signal locking, and 5G/LTE cellular strength.",
      color: "from-cyan-500 to-blue-600"
    },
    { 
      title: "Camera & Audio", 
      icon: <Camera className="w-8 h-8" />, 
      desc: "Front/Rear camera focus, flash uniformity, microphone frequency range, and stereo speaker clarity.",
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "Sensors & Biometrics", 
      icon: <Activity className="w-8 h-8" />, 
      desc: "Testing FaceID/TouchID, Accelerometer, Gyroscope, Proximity, and Ambient light sensors.",
      color: "from-slate-700 to-slate-900"
    },
  ];

  const featItems = [
    { 
      title: "Parallel Processing", 
      desc: "Perform 50+ health checks on up to 40 devices simultaneously to skyrocket warehouse productivity.", 
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "QR Code Automation", 
      desc: "Automate Android device setup and debugging activation by simply scanning a unique QR code.", 
      icon: <Layout className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    { 
      title: "Lock & MDM Detection", 
      desc: "Instant detection of Find My iPhone (FMIP), Google FRP, MDM supervision, and carrier/network status.", 
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600"
    },
    { 
      title: "Audit Trail Reports", 
      desc: "Tamper-proof PDF/CSV reports with device grading, IMEI metadata, and verifiable hardware health status.", 
      icon: <ClipboardIcon className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const platforms = [
    {
      name: "iOS Support",
      versions: "iOS v12.5.7 & above",
      icon: (
        <svg className="w-12 h-12 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Android Support",
      versions: "Android OS v5.0 & above",
      icon: (
        <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414C17.0673 15.3414 16.6961 14.9702 16.6961 14.5145C16.6961 14.0588 17.0673 13.6876 17.523 13.6876C17.9787 13.6876 18.3499 14.0588 18.3499 14.5145C18.3499 14.9702 17.9787 15.3414 17.523 15.3414ZM6.47702 15.3414C6.02131 15.3414 5.65011 14.9702 5.65011 14.5145C5.65011 14.0588 6.02131 13.6876 6.47702 13.6876C6.93272 13.6876 7.30392 14.0588 7.30392 14.5145C7.30392 14.9702 6.93272 15.3414 6.47702 15.3414ZM17.9366 10.6622L19.7401 7.53835C19.8643 7.32332 19.7909 7.04944 19.5759 6.92523C19.3609 6.80102 19.087 6.87441 18.9628 7.08944L17.135 10.2559C15.6888 9.59604 13.8837 9.17244 12 9.17244C10.1163 9.17244 8.3112 9.59604 6.86503 10.2559L5.03723 7.08944C4.91302 6.87441 4.63914 6.80102 4.42411 6.92523C4.20908 7.04944 4.13569 7.32332 4.2599 7.53835L6.06341 10.6622C3.12461 12.234 1.13745 15.2115 1.05479 18.7301H22.9452C22.8625 15.2115 20.8753 12.234 17.9366 10.6622Z" />
        </svg>
      ),
    },
    {
      name: "Deployment",
      versions: "Windows & Barebone (Linux)",
      icon: <ServerIcon className="w-12 h-12 text-blue-600" />,
    },
  ];

  const useCases = [
    {
      title: "Retail Diagnostics",
      desc: "Perform quick health evaluations in front of customers to provide accurate trade-in quotes instantly.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Warehouse Grading",
      desc: "Sort thousands of devices into grading buckets (A+, A, B, C) with automated hardware verification.",
      icon: <BuildingIcon className="w-6 h-6" />,
    },
    {
      title: "Insurance Claim Audit",
      desc: "Verify hardware damage or functionality before processing insurance claims to prevent fraud.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Returns Management",
      desc: "Easily verify returned devices for any functional discrepancies compared to the original sale state.",
      icon: <RefreshCcw className="w-6 h-6" />,
    },
  ];


  return (
    <>
      <SEOHead seo={getSEOForPage("smartphone-diagnostic")} />
      
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
                        ? "bg-emerald-600 text-white shadow-md"
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

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50/30 to-slate-50">
        {/* ================= HERO SECTION ================= */}
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <UpcomingBadge className="mb-4" />

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Smartphone{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      Diagnostics
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Identify hardware flaws, software issues, and unlock statuses instantly. 
                    The most comprehensive diagnostic tool for second-hand device evaluation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={downloadCatalog}
                      className="inline-flex items-center justify-center gap-2 border-2 border-teal-500 text-teal-800 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition-all duration-300"
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

              {/* Right: Monitor + Hub + 5 Phones Visual — Diagnostics */}
              <Reveal delayMs={100}>
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-10 bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative flex flex-col items-center scale-[0.8] lg:scale-90 origin-top">
                    
                    {/* ── MONITOR ── */}
                    <div className="w-[340px] h-[220px] bg-slate-800 rounded-2xl p-2.5 border-4 border-slate-700 shadow-2xl relative z-20">
                      <div className="w-full h-full bg-white rounded-lg overflow-hidden relative flex flex-col items-center justify-center border border-slate-200">
                        {/* Binary Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-mono text-[8px] leading-[10px] break-all overflow-hidden p-1">
                          {Array(10).fill("101010101010101010101010101010101010101010101010101010").join("\n")}
                        </div>

                        {/* Heartbeat Line (Animates across) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
                          <svg className="w-full h-24 text-teal-600" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path 
                              d="M0 50 L150 50 L160 20 L175 80 L190 20 L200 80 L210 50 L400 50" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5"
                              className="animate-pulse"
                              strokeDasharray="400"
                              strokeDashoffset="400"
                              style={{ animation: 'dash 3s linear infinite' }}
                            />
                          </svg>
                        </div>

                        {/* Central Shield + Heartbeat */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="relative w-20 h-24 flex items-center justify-center">
                            <Shield className="w-full h-full text-teal-600 fill-teal-50/10" strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center pt-2">
                              <Activity className="w-10 h-10 text-teal-600 animate-pulse" />
                            </div>
                          </div>
                          <div className="mt-4 font-black text-[14px] text-slate-800 tracking-wider">
                            SMARTPHONE DIAGNOSE
                          </div>
                        </div>
                      </div>
                      
                      {/* Monitor Stand */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-8 h-12 bg-slate-700"></div>
                        <div className="w-32 h-3 bg-slate-800 rounded-full border-t border-slate-600"></div>
                      </div>
                    </div>

                    {/* ── CABLE FROM MONITOR TO HUB ── */}
                    <div className="w-0.5 h-10 bg-slate-400 mt-12 relative z-10 box-border border-r-2 border-slate-300"></div>

                    {/* ── HUB ── */}
                    <div className="w-32 h-10 bg-white border-2 border-slate-300 rounded-lg shadow-md flex items-center justify-around px-2 relative z-20">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3 h-1.5 bg-slate-200 rounded-sm border border-slate-300"></div>
                      ))}
                    </div>

                    {/* ── CABLES FROM HUB TO PHONES (SVG) ── */}
                    <div className="relative w-full h-12 -mt-2">
                      <svg className="w-full h-full stroke-slate-400 fill-none" preserveAspectRatio="none">
                        <path d="M260 0 C 260 20, 60 20, 60 40" />
                        <path d="M260 0 C 260 20, 160 20, 160 40" />
                        <path d="M260 0 C 260 20, 260 20, 260 40" />
                        <path d="M260 0 C 260 20, 360 20, 360 40" />
                        <path d="M260 0 C 260 20, 460 20, 460 40" />
                      </svg>
                    </div>

                    {/* ── FIVE PHONES ── */}
                    <div className="flex justify-between w-[520px] px-2 -mt-4">
                      {/* ... Phone mapping logic ... */}
                      {[ 
                        { type: 'diag', fill: 85 }, 
                        { type: 'diag', fill: 35 }, 
                        { type: 'erase', fill: 100 }, 
                        { type: 'diag', fill: 60 }, 
                        { type: 'diag', fill: 20 }
                      ].map((phone, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-20 h-32 bg-white rounded-xl border-2 border-slate-300 p-1.5 shadow-lg relative overflow-hidden group/phone hover:border-emerald-400 transition-colors">
                            {/* Filling animation */}
                            <div 
                              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500/40 to-emerald-400/10 rounded-b-lg transition-all duration-1000`} 
                              style={{ height: `${phone.fill}%` }}
                            ></div>
                            
                            <div className="relative h-full flex flex-col items-center justify-center">
                              {phone.type === 'erase' ? (
                                <div className="relative w-10 h-12 flex items-center justify-center">
                                  <Shield className="w-full h-full text-emerald-600 opacity-80" strokeWidth={1} />
                                  <div className="absolute inset-0 flex items-center justify-center pt-1">
                                    <Eraser className="w-4 h-4 text-emerald-600" />
                                  </div>
                                </div>
                              ) : (
                                <Activity className="w-8 h-8 text-emerald-600 opacity-80 animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CSS for dash animation */}
                  <style>{`
                    @keyframes dash {
                      from { stroke-dashoffset: 400; }
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ================= DIAGNOSTIC TESTS ================= */}
        <section id="diag-tests" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">50+ Hardware Health Checks</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Our automated suite identifies every hidden defect across iOS and Android platforms with surgical precision.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diagnosticTests.map((test, i) => (
                <Reveal key={test.title} delayMs={i * 100}>
                  <div className="group relative p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 hover:shadow-2xl transition-all h-full overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${test.color} opacity-[0.03] -mr-16 -mt-16 rounded-full transition-all group-hover:scale-110`}></div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${test.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {test.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{test.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{test.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="py-20 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Excellent Diagnostic Capabilities</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  One platform to test and evaluate thousands of devices per day with zero room for human error.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featItems.map((feat, i) => (
                <Reveal key={feat.title} delayMs={i * 100}>
                  <div className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-teal-200 hover:shadow-xl transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center mb-6`}>
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

        {/* ================= PLATFORMS ================= */}
        <section id="platforms" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Platform Support</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Regulatory hardware diagnostics across major mobile ecosystems.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 100}>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-teal-100 shadow-xl hover:shadow-2xl transition-all text-center group">
                    <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.name}</h3>
                    <p className="text-teal-700 font-semibold text-sm mb-4">{p.versions}</p>
                    <div className="h-1 w-12 bg-teal-500 mx-auto rounded-full"></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-20 lg:py-32 bg-slate-900 relative">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Designed for Every Workflow</h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  From single-device retail shops to massive high-volume processing warehouses.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((use, i) => (
                <Reveal key={use.title} delayMs={i * 100}>
                  <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                    <div className="w-16 h-16 flex-shrink-0 bg-teal-500/20 text-teal-400 rounded-2xl flex items-center justify-center">
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

        {/* ================= GRADING ================= */}
        <section id="grading" className="py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    Intelligent <span className="text-teal-600">Device Grading</span> for Maximum Value
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Automate your valuation process. Our software assigns objective health grades based on test results, helping you monetize inventory with total transparency.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "IMEI 1 & 2 Metadata Retrieval",
                      "Find My iPhone (FMIP) / FRP Status",
                      "Carrier & Network Lock Detection",
                      "Jailbreak & Root Detection",
                      "Battery Cycle & Capacity Reports",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700">
                        <CheckIcon className="w-5 h-5 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="relative p-1 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl overflow-hidden group shadow-2xl">
                   <div className="bg-slate-50 p-8 lg:p-12 rounded-[1.6rem] relative">
                      <div className="text-center space-y-4">
                        <p className="text-teal-600 font-bold tracking-widest text-xs">GRADING REPORT</p>
                        <h3 className="text-6xl font-black text-slate-900">A+</h3>
                        <p className="text-slate-600">Mint Condition • 100% Functional</p>
                        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-4 text-left">
                           <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                              <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">IMEI Status</p>
                              <p className="text-xs text-emerald-600 font-bold">Whitelisted</p>
                           </div>
                           <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                              <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Processing</p>
                              <p className="text-xs text-slate-900 font-bold">Tamper-Proof PDF</p>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-20 lg:py-32 bg-teal-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-600">Got questions? We have answers.</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Can I choose which tests to perform?",
                  a: "Yes! Our application gives you complete freedom to select specific tests for certain batches or run the full 50+ test suite for a complete audit of premium devices.",
                },
                {
                  q: "Does it work for both Android and iOS?",
                  a: "Absolutely. D-Secure Diagnostic is a unified application that supports both platforms seamlessly. We support iOS v12.5.7+ and Android v5.0+.",
                },
                {
                  q: "How many devices can I test at once?",
                  a: "You can perform batch processing on up to 40 devices simultaneously on a single workstation.",
                },
                {
                  q: "Does it identify locked or jailbroken devices?",
                  a: "Yes, the software supports retrieval of IMEI 1 & 2, and detects Find My iPhone (FMIP), Factory Reset Protection (FRP), MDM status, ESN status, carrier locks, and jailbreak/root status.",
                },
                {
                  q: "Can I perform diagnostics on devices with broken screens?",
                  a: "Yes, our specialized Linux-based (Barebone) edition can perform hardware diagnostics even on devices with broken screens or those in recovery modes.",
                },
                {
                  q: "Are the diagnostic reports customizable?",
                  a: "Yes, you can customize the generated PDF, CSV, or XML reports with your company logo and watermark. All reports are verifiable and serve as proper audit trails.",
                },
              ].map((faq) => (
                <Reveal key={faq.q} delayMs={Number.parseInt(faq.q.length.toString()) * 5}>
                  <details className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
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
              source="Smartphone Diagnostic Page Contact"
              solutionType="mobile-diagnostics"
              title="Professional Grade Reports for Smarter Selling"
              subtitle="Start grading your mobile inventory with D-Secure and increase your residual value today."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default SmartphoneDiagnosticPage;
