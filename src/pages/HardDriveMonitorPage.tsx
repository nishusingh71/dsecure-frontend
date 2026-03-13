import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  ClipboardIcon,
} from "@/components/FlatIcons";
import {
  Activity,
  Thermometer,
  Copy,
  Search,
  CheckCircle,
  Download,
  ShoppingCart,
  FileText,
  Bell,
  Cpu,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/Toast";

/**
 * HardDriveMonitorPage component
 * This page provides comprehensive hard drive health, temperature, S.M.A.R.T. status, and performance monitoring features.
 * The theme is exactly matched with the File Eraser page (Emerald/Teal gradients).
 */
const HardDriveMonitorPage: React.FC = memo(function HardDriveMonitorPage() {
  const { showToast } = useToast();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sectionNavItems = [
    { id: "hero", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "process", label: "Process" },
    { id: "specs", label: "Specifications" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  // Logic to handle sticky navigation visibility and active section tracking on scroll
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

      // Update active navigation section based on scroll position
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
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Feature cards data with descriptions and icons
  const mainFeatures = [
    {
      title: "Health Overview",
      desc: "Get a real-time comprehensive snapshot of your drive's general health status and critical parameters.",
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50"
    },
    {
      title: "S.M.A.R.T. Status",
      desc: "Monitor detailed S.M.A.R.T. attributes such as Reallocated Sector Count to anticipate failures.",
      icon: <ShieldIcon className="w-6 h-6 text-teal-500" />,
      bg: "bg-teal-50"
    },
    {
      title: "Real-time Alerts",
      desc: "Set personalized notifications for temperature thresholds and critical disk health events.",
      icon: <Bell className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50"
    },
    {
      title: "Disk Cloning",
      desc: "Create replicas of your drives for backup or easy migration from older HDDs to high-speed SSDs.",
      icon: <Copy className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50"
    },
    {
      title: "Disk Scan & Repair",
      desc: "In-depth scanning to identify and isolate bad sectors, ensuring your data remains in healthy blocks.",
      icon: <Search className="w-6 h-6 text-teal-500" />,
      bg: "bg-teal-50"
    },
    {
      title: "SMART Reports",
      desc: "Save and export detailed status reports for future reference or for technical support diagnostics.",
      icon: <FileText className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50"
    }
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: "Smart Diagnostic - Real-time Disk Health & Performance Monitoring | D-Secure",
          description: "Monitor smart diagnostic health, temperature, and performance in real-time. S.M.A.R.T. tracking, bad sector scanning, and disk cloning support for total data security.",
          keywords: "smart diagnostic, disk health, SMART status, disk cloning, bad sector scan, temperature monitor, disk diagnostics",
          canonicalUrl: "/products/smart-diagnostic",
        }}
      />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link to="/" className="flex items-center">
                <ThemeAwareLogo className="h-7 sm:h-8 w-auto" />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id || (activeSection === "" && item.id === "hero")
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
        <section id="hero" className="py-8 lg:py-12 xl:py-16 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    Advanced Smart Diagnostic Utility
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Complete Smart Diagnostic <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Monitoring Solution
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    D-Secure Smart Diagnostic provides close real-time watch on your drives to prevent issues before they affect your critical data. 
                    Monitor health, SMART status, and temperature with total precision.
                  </p>

                  {/* CTA Buttons - Matching File Eraser Style */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-100 text-emerald-400 px-8 py-4 rounded-xl font-bold opacity-60 cursor-not-allowed transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      Upcoming
                    </button>
                    <Link 
                      to="/pricing-and-plan?product=smart-diagnostic"
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Purchase License
                    </Link>

                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
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
                          <Activity className="w-12 h-12 lg:w-16 lg:h-16 text-white drop-shadow-lg" />
                        </div>

                        {/* Product Name */}
                        <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight text-center mb-1 lg:mb-2">
                          Smart Diagnostic
                        </h3>

                        {/* Tagline */}
                        <p className="text-white/70 text-[10px] lg:text-xs text-center tracking-wide uppercase">
                          Disk Health Solution
                        </p>

                        {/* Bottom Badge */}
                        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/20">
                            <ShieldIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-300" />
                            <span className="text-white/90 text-[9px] lg:text-[11px] font-semibold">
                              Real-time Care
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

                  {/* Floating Status Cards */}
                  {/* Card 1: Temperature (Existing) */}
                  <div className="absolute -top-12 -right-12 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-50 animate-[float_5s_ease-in-out_infinite] hidden sm:block z-30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                        <Thermometer className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Storage Temp</p>
                        <p className="text-sm font-black text-slate-900">Optimal (32°C)</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Disk Health % */}
                  <div className="absolute top-1/4 -left-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-teal-50 animate-[float_6s_ease-in-out_infinite_0.5s] hidden sm:block z-30">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                          <circle cx="22" cy="22" r="18" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="113" strokeDashoffset="11" strokeLinecap="round" className="animate-pulse" />
                        </svg>
                        <span className="absolute text-[10px] font-black text-emerald-600">92%</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disk Health</p>
                        <p className="text-sm font-black text-slate-900">Excellent</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Performance Gauge */}
                  <div className="absolute -bottom-10 -right-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-cyan-50 animate-[float_5.5s_ease-in-out_infinite_1s] hidden sm:block z-30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Performance</p>
                        <div className="flex items-center gap-1.5">
                           <p className="text-sm font-black text-slate-900">Ultra fast</p>
                           <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-cyan-500' : 'bg-slate-200'}`}></div>)}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: S.M.A.R.T. Status Badge */}
                  <div className="absolute bottom-1/4 -left-16 bg-gradient-to-r from-emerald-500 to-teal-600 p-[1px] rounded-full shadow-lg animate-[float_7s_ease-in-out_infinite_1.5s] hidden lg:block z-30">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                       <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">S.M.A.R.T. Status: Passed</span>
                    </div>
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



        {/* ================= DETAILED DISK INFO SECTION ================= */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
                  <img 
                    src="/images/products/drive-monitor-health.png" 
                    alt="SMART Status Reporting Interface Details" 
                    className="w-full h-auto scale-105 group-hover:scale-100 transition-transform duration-700 opacity-90"
                  />
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Smart Diagnostic Health Checkup</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Disk crashes seldom happen suddenly. Usually, a drive shows signs of wear and tear for many weeks before dying. 
                    D-Secure Smart Diagnostic identifies critical attributes to warn you well in advance.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: <Cpu className="w-5 h-5" />, title: "Detailed Diagnostics", txt: "Serial number, Model, Firmware, and Buffer size." },
                      { icon: <BarChart3 className="w-5 h-5" />, title: "SMART Reporting", txt: "Export status reports for future reference." },
                      { icon: <RefreshCw className="w-5 h-5" />, title: "Live Background Sync", txt: "Continuous background health monitoring." },
                      { icon: <ClipboardIcon className="w-5 h-5" />, title: "Custom Thresholds", txt: "Personalized temp alerts for disk safety." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 text-emerald-600">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-normal">{item.txt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FEATURES GRID ================= */}
        <section id="features" className="py-24 bg-gradient-to-b from-white/50 to-emerald-50/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 font-display">Integrated Smart Diagnostic Protection</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A complete set of diagnostic tools designed to keep your drives in perfect condition, catching problems as they occur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, idx) => (
                <Reveal key={idx} delayMs={idx * 100}>
                  <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DETAILED SECTION: CLONING ================= */}
        <section className="py-24 overflow-hidden relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900">Clone Disk for Ultimate Safety</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Creates an exact replica of a drive for backup and recovery. 
                    Whether you're performing a hardware upgrade or preserving data from a failing drive, 
                    our sector-by-sector cloning ensures no bit is left behind.
                  </p>
                  <ul className="grid grid-cols-1 gap-4">
                    {[
                      "Creates exact bit-by-bit replica of the source drive",
                      "Ideal for upgrading to high-capacity SSDs/HDDs",
                      "Auto backup and sync with external USB/NAS storage",
                      "Syncs local files seamlessly across storage platforms"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* <Link 
                    to="/resources/clone-guide"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all mt-4"
                  >
                    Learn To Clone
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link> */}

                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="relative p-4 bg-white rounded-3xl shadow-2xl group border border-emerald-50 overflow-hidden">
                   <img 
                    src="/images/products/drive-monitor-cloning-fixed.png" 
                    alt="D-Secure Drive Cloning Application Screen Preview" 
                    className="w-full h-auto rounded-2xl group-hover:scale-105 transition-all duration-700"
                   />

                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PROCESS SECTION ================= */}
        <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-16">Monitor Your Storage in 3 Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Select Utility", desc: "Choose between Health, SMART, Scan or Clone from the intuitive side pane." },
                { step: "02", title: "View Results", desc: "Identify drive metrics and check temperature or SMART attributes immediately." },
                { step: "03", title: "Save Report", desc: "Export and save health reports to track performance or share with support." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto font-bold text-lg group-hover:scale-110 transition-transform">{item.step}</div>
                  <h4 className="text-xl font-bold pt-2">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TECHNICAL SPECIFICATIONS ================= */}
        <section id="specs" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Technical Specifications</h2>
            </div>
            <div className="max-w-4xl mx-auto border border-emerald-100 rounded-3xl overflow-hidden shadow-sm bg-white/70 backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {[
                    ["Processor", "Intel / Compatible Dual Core (x86, x64)"],
                    ["OS Support", "Windows 11, 10, 8.1, 8 & Windows 7"],
                    ["Memory", "4 GB Minimum (8 GB recommended for cloning)"],
                    ["Hard Disk", "250 MB free space for smooth installation"],
                    ["Interface Support", "SATA, SSD, Mechanical Drives, External USB Disk"]
                  ].map(([label, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50/10"}>
                      <td className="px-8 py-5 font-bold text-slate-700 border-b border-emerald-50 whitespace-nowrap">{label}</td>
                      <td className="px-8 py-5 text-slate-600 border-b border-emerald-50">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
        <section id="faq" className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Expert Answers to Common Queries</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { q: "What parameters are monitored by the SMART utility?", a: "It monitors critical attributes like Read Error Rate, Reallocated Sector Count, and Seek Error Rate to detect potential mechanical or firmware failures." },
                { q: "Can I monitor disk health of my Windows 11 system?", a: "Yes, D-Secure Smart Diagnostic is fully optimized for Windows 11, 10, and older versions, operating smoothly as a native Windows utility." },
                { q: "How does the 'Scan Disk' feature help identify Bad Sectors?", a: "The feature performs a surface test on the drive, marking bad sectors to prevent the OS from writing data to physically damaged blocks." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm transition-shadow hover:shadow-md group">
                  <h4 className="font-bold text-slate-900 flex items-center gap-3 group-hover:text-emerald-600 transition-colors">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {item.q}
                  </h4>
                  <p className="mt-4 text-slate-600 pl-8 leading-relaxed font-medium text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT CTA ================= */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden max-w-7xl mx-auto shadow-2xl shadow-emerald-100">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
              <div className="relative z-10 space-y-10">
                <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">Need Enterprise Data Care?</h2>
                <p className="text-emerald-50 text-xl max-w-3xl mx-auto opacity-90">
                  D-Secure is recognized as a professional data care provider globally. Join our growing community of satisfied users today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center bg-white text-emerald-700 px-12 py-5 rounded-2xl font-black transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    Get Business Quote
                  </Link>
                  <button className="inline-flex items-center justify-center border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-bold transition-all duration-300 hover:bg-white/10">
                    Contact Recovery Experts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default HardDriveMonitorPage;
