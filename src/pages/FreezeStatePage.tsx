import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getSEOForPage } from "@/utils/seo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import {
  Settings,
  ShieldCheck,
  Server,
  Layers,
  Database,
  Lock,
  Search,
  HardDrive,
  Users,
  Activity,
  RefreshCcw,
  CheckCircle,
  Layout,
  Globe,
  Monitor,
  Cloud,
  ChevronDown,
  Zap,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import { ProductContactForm } from "@/components/forms";
import { 
  ArrowRightIcon,
} from "@/components/FlatIcons";

const FreezeStatePage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Core Architecture" },
    { id: "editions", label: "Solution Variants" },
    { id: "technology", label: "How it Works" },
    { id: "security", label: "Security & Compliance" },
    { id: "use-cases", label: "Use Cases" },
    { id: "specs", label: "Specifications" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const handleScroll = useCallback(() => {
    const scrollPosition = globalThis.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = sectionNavItems.map(item => item.id);
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
  }, [sectionNavItems]);

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

  return (
    <>
      <SEOHead seo={getSEOForPage("freeze-state")} />
      
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
        <section id="overview" className="relative pt-4 pb-8 lg:pt-6 lg:pb-12 overflow-hidden flex flex-col justify-center min-h-[calc(100vh-64px)]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8 text-left">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>

                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <RefreshCcw className="w-4 h-4" />
                    Indestructible Workstations
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1]">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      FreezeState
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Patented <span className="text-emerald-700 font-bold">Reboot-to-Restore</span> technology that makes your computers bulletproof. 100% workstation recovery with every restart, ensuring configuration drift is a thing of the past.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={() => scrollToSection("technology")}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                    >
                      How it Works
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hierarchical Fleet Management Visual */}
              <Reveal delayMs={200}>
                <div className="relative flex flex-col items-center justify-center min-h-[450px] lg:min-h-[480px] w-full max-w-2xl mx-auto overflow-visible pt-4">
                  {/* Background Network Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
                  
                  {/* CENTRAL ADMIN HUB (TOP) */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-30 mb-6"
                  >
                    <div className="bg-white p-5 rounded-[2rem] shadow-2xl border border-emerald-100 w-64 lg:w-72 relative group hover:scale-105 transition-transform duration-500">
                      <div className="absolute -top-3 -right-3 bg-emerald-500 text-white p-2.5 rounded-xl shadow-lg animate-pulse border-2 border-white">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="bg-slate-900 rounded-2xl p-5 mb-5 relative overflow-hidden group/screen shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                        <div className="flex flex-col items-center justify-center py-4 space-y-3">
                           <Server className="w-10 h-10 text-emerald-400 mb-2" />
                           <div className="w-full space-y-2">
                             <div className="h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                               <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-emerald-500/60"></motion.div>
                             </div>
                             <p className="text-[9px] font-mono text-emerald-400 text-center tracking-widest uppercase">Admin: Online</p>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Global Manager</p>
                          <h4 className="text-lg font-black text-slate-900">Fleet Console</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Controlled</p>
                          <p className="text-sm font-black text-emerald-600">1.2K+ Nodes</p>
                        </div>
                      </div>
                    </div>
                    {/* Connecting Base to Hub */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-emerald-200 to-transparent"></div>
                  </motion.div>

                  {/* CONNECTING BRIDGE (MIDDLE) */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative z-20 w-44 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-around px-4 mb-10"
                  >
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
                  </motion.div>

                  {/* ENDPOINT NODES (BOTTOM) */}
                  <div className="relative z-20 flex justify-between w-full max-w-2xl px-4 gap-4 mt-4">
                    {[1,2,3,4,5].map((i) => (
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
                            <p className="text-[6px] font-black uppercase text-slate-400 tracking-widest">DRIVE_C</p>
                            <div className="flex items-center justify-center gap-1">
                              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                              <span className="text-[6px] font-black uppercase text-emerald-600 tracking-widest">Protected</span>
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

        {/* ================= CORE ARCHITECTURE SECTION ================= */}
        <section id="architecture" className="py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  The <span className="text-emerald-600">Core Architecture</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                  A dual-product ecosystem designed for maximum control and zero-footprint performance.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Product 1: Admin Console */}
              <Reveal>
                <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Layout className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
                      Product 1
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Admin Console</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                      Tailored for lab administrators and professors. A robust web-based dashboard optimized for Windows and cross-platform management.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Device grouping by Lab/Room",
                        "Change request approval flow",
                        "Remote File/App installation",
                        "Live Fleet Monitoring (Variant 2+)"
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Product 2: Client Application */}
              <Reveal delayMs={100}>
                <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Monitor className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200">
                      Product 2
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">Client Application (Per Machine)</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                      A lightweight application for every endpoint. Displays real-time freeze state and active session logs without requiring user login.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Standard Warning Messages",
                        "Timeline History showing resets",
                        "User-side Change Requests",
                        "Unique Device Identity"
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        <section id="editions" className="py-24 lg:py-32 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#10b98115_0%,transparent_100%)]"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 italic tracking-tight">
                  Choose Your <span className="text-emerald-400">Edition</span>
                </h2>
                <p className="text-lg text-emerald-100/60 max-w-2xl mx-auto leading-relaxed">
                  Tailored variants for everything from local workstations to enterprise-wide smart labs.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Variant 1: Core Protection */}
              <Reveal>
                <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/20 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Deep Freeze Basic</h3>
                  <p className="text-emerald-100/60 mb-8 font-medium">The essential reboot-to-restore engine for standalone systems.</p>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {[
                      "Standard Shallow Reset",
                      "Full Deep Reset Capability",
                      "MBR & GPT Protection",
                      "Localized ThawSpaces",
                      "Windows 10/11 & Server Support"
                    ].map(feat => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-emerald-50">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 italic">Best for</p>
                      <p className="text-sm font-medium">Personal Workstations</p>
                    </div>
                    <Link 
                      to="/products/freeze-state" 
                      className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500/40 transition-colors"
                    >
                      Learn More <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Variant 2: Smart Diagnostic */}
              <Reveal delayMs={100}>
                <div className="p-8 lg:p-10 rounded-[2.5rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 transform lg:-translate-y-4 transition-all duration-500 flex flex-col h-full group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Activity className="w-32 h-32" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 border border-white/30 backdrop-blur-md">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Most Advanced Monitoring
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart Diagnostic</h3>
                  <p className="text-white/80 mb-8 font-medium italic">Intelligent performance monitoring for managed lab environments.</p>
                  
                  <div className="bg-white/10 rounded-2xl p-4 mb-8 border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">CPU Usage Scan</span>
                       <span className="text-xs font-bold">42%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[42%] animate-pulse"></div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {[
                      "Shallow Delete + Smart Monitoring",
                      "Real-time CPU/RAM/Disk live stats",
                      "10-20s Dashboard Refresh Rate",
                      "Admin Console Syncing & Notifications",
                      "User-side Change Request System",
                      "Automatic Warning & Alert System"
                    ].map(feat => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0 shadow-sm" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-1 italic">Best for</p>
                      <p className="text-sm font-bold">Managed Labs</p>
                    </div>
                    <Link 
                      to="/products/freeze-state-smart" 
                      className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-emerald-50 transition-colors"
                    >
                      Explore Smart <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Variant 3: Advanced Eraser */}
              <Reveal delayMs={200}>
                <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-8 border border-cyan-500/20 shadow-inner">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Advanced Eraser</h3>
                  <p className="text-emerald-100/60 mb-8 font-medium">Military-grade data protection with built-in erasure certs.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                     {["NIST", "DoD", "BSI", "HMG"].map(std => (
                       <span key={std} className="px-2 py-1 bg-white/10 rounded-md text-[9px] font-black border border-white/10">{std} 800-88</span>
                     ))}
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {[
                      "All Eraser Algorithms Supported",
                      "Sector-wise Permanent Erasure",
                      "Multiple Erasure Passes (DOD/NIST)",
                      "Health Certificates per Machine",
                      "Full Suite Reporting & Auditing",
                      "Enterprise-level Mass Management"
                    ].map(feat => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-emerald-50">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 italic">Best for</p>
                      <p className="text-sm font-medium">Govt & Healthcare</p>
                    </div>
                    <Link 
                      to="/products/freeze-state-advanced" 
                      className="inline-flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-cyan-500/40 transition-colors text-cyan-400"
                    >
                      Go Advanced <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= THE TECHNOLOGY (DEEP DIVE) SECTION ================= */}
        {/* Technical details yaha explain kiye gaye hain */}
        <section id="technology" className="py-24 lg:py-32 bg-slate-900 text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#064e3b20_0%,transparent_100%)]"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <Reveal>
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">
                    Technical Architecture
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-bold italic tracking-tight">
                    Sector-Level <br />
                    <span className="text-emerald-500">Redirection.</span>
                  </h2>
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Virtual Overlay Layer</h4>
                        <p className="text-slate-400 leading-relaxed">
                          All write operations are intercepted at the driver level and redirected to a temporary virtual overlay table, keeping original data sectors locked.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                        <HardDrive className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Persistent ThawSpaces</h4>
                        <p className="text-slate-400 leading-relaxed">
                          Create dedicated virtual partitions for user data, ensuring work is saved even when the system drive is frozen and reset.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                        <Search className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">MBR & GPT Protection</h4>
                        <p className="text-slate-400 leading-relaxed">
                          Locks the Master Boot Record and partition tables to prevent low-level rootkits or malicious modification of the boot process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="relative p-1 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-[3rem]">
                  <div className="bg-slate-800 rounded-[2.8rem] p-10 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-8">
                      <Database className="w-32 h-32 text-emerald-500/10" />
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-700/50 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">System Write Flow</span>
                           <Lock className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-[60%] animate-pulse"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm font-medium p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           <span>IO Redirection Table Active</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           <span>Driver-Level Shadowing Enabled</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           <span>Anti-Tamper Watchdog Running</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= SECURITY & COMPLIANCE SECTION ================= */}
        {/* Security and standards compliance details */}
        <section id="security" className="py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight underline decoration-cyan-500/30 decoration-8 underline-offset-8">
                  Enterprise Security & Compliance
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Engineered to meet the stringent security standards of healthcare, finance, and government sectors.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Stealth Mode", desc: "Completely hide the interface and icons to prevent user tampting.", icon: <Search /> },
                { title: "NIST 800-53", desc: "Helps achieve NIST compliance for shared workstation protection.", icon: <ShieldCheck /> },
                { title: "HIPAA Ready", desc: "Ensure patient record portals always revert to secure states.", icon: <Lock /> },
                { title: "PCI DSS", desc: "Locks down payment terminals and kiosks against unauthorized changes.", icon: <Settings /> },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-cyan-50/30 hover:border-cyan-200 transition-all duration-300 h-full group">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-cyan-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES SECTION ================= */}
        {/* Industry specific uses cases yaha dikhaye gaye hain */}
        <section id="use-cases" className="py-24 lg:py-40 bg-slate-900 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="max-w-3xl mb-16 lg:mb-24">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                  One Solution. <br/>
                  <span className="text-emerald-500">Infinite Environments.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "Educational Labs", 
                  desc: "Reset student PCs after every class. Eliminate virus threats and settings changes instantly.", 
                  icon: <Users />,
                  stat: "99.9% Uptime"
                },
                { 
                  title: "Healthcare Kiosks", 
                  desc: "Protect patient data integrity on self-service terminals. Ensure terminals are always in a compliant state.", 
                  icon: <ShieldCheck />,
                  stat: "HIPAA Compliant"
                },
                { 
                  title: "Professional Training", 
                  desc: "Start every training session with a standardized software environment for all participants.", 
                  icon: <Layout />,
                  stat: "Seamless Deploy"
                },
                { 
                  title: "Public Libraries", 
                  desc: "Limit public internet terminal damage. Prevent installation of unapproved helper tools or malware.", 
                  icon: <Monitor />,
                  stat: "Zero Maintenance"
                },
                { 
                  title: "Corporate Remote", 
                  desc: "Empower remote workers while keeping core OS settings locked against accidental errors.", 
                  icon: <Cloud />,
                  stat: "Global Management"
                },
                { 
                  title: "Retail POS", 
                  desc: "Ensure critical point-of-sale systems are untouchable and always running optimized code.", 
                  icon: <Server />,
                  stat: "100% Reliability"
                },
              ].map((useCase) => (
                <Reveal key={useCase.title}>
                  <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 h-full group">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                      {React.cloneElement(useCase.icon as React.ReactElement, { className: "w-7 h-7" })}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl font-bold text-white">{useCase.title}</h4>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-widest">{useCase.stat}</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium">{useCase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SPECIFICATIONS SECTION ================= */}
        {/* Technical specifications aur OS support information */}
        <section id="specs" className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 italic tracking-tight underline decoration-emerald-500/30 decoration-8 underline-offset-8">
                  Technical Specifications
                </h2>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <Reveal>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Monitor className="w-6 h-6 text-emerald-500" />
                    Operating System Support
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { os: "Windows 10 & 11", ver: "32/64-bit supported" },
                      { os: "Windows Server", ver: "2016, 2019, 2022" },
                      { os: "macOS", ver: "10.15 (Catalina) to 14 (Sonoma)" },
                      { os: "Linux", ver: "Ubuntu, Debian, CentOS" },
                    ].map(item => (
                      <div key={item.os} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                         <div>
                            <p className="font-bold text-slate-900">{item.os}</p>
                            <p className="text-xs text-slate-500">{item.ver}</p>
                         </div>
                         <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Database className="w-6 h-6 text-emerald-500" />
                    Hardware & File Systems
                  </h4>
                  <div className="space-y-4">
                     {[
                       { label: "Storage Types", val: "SSD, NVMe, HDD, RAID Controllers, eMMC" },
                       { label: "File Systems", val: "NTFS, FAT32, APFS (Mac), HFS+, Ext4" },
                       { label: "Boot Modes", val: "UEFI Secure Boot, Legacy BIOS, GPT/MBR" },
                       { label: "Min Specs", val: "2GB RAM, 10% free disk space for redirect table" },
                     ].map(item => (
                       <div key={item.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center group hover:bg-emerald-50/50 transition-colors">
                          <span className="font-bold text-slate-700">{item.label}</span>
                          <span className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">{item.val}</span>
                       </div>
                     ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FEATURE GRID ================= */}
        <section id="features" className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-20 lg:mb-28">
                 <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Total Control Console</h2>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                   Manage thousands of workstations efficiently with central management, scheduling, and remote configuration tools.
                 </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: "Central Management", desc: "Enterprise console for silent deployment, remote restarts, and status monitoring.", icon: <Globe /> },
                 { title: "Automated Maintenance", desc: "Scheduled 'Thawed' periods for Windows Updates and software patches.", icon: <Settings /> },
                 { title: "Custom ThawSpaces", desc: "Virtual drives that retain data even when the system is in a protected state.", icon: <Layout /> },
                 { title: "Anti-Ransomware", desc: "Immunity from ransomware damage—simply reboot to clear encrypted files.", icon: <Lock /> },
                 { title: "Multi-Boot Support", desc: "Compatible with multiple partitions and boot environments on a single disk.", icon: <Monitor /> },
                 { title: "Cloud Connector", desc: "Sync configurations and manage endpoints through a secure cloud interface.", icon: <Cloud /> },
               ].map((item) => (
                 <Reveal key={item.title}>
                    <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-500 h-full group relative overflow-hidden">
                       <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                       <div className="w-11 h-11 rounded-xl bg-white text-emerald-600 flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 shadow-sm transition-transform border border-slate-50">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                       </div>
                       <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">FreezeState Q&A</h2>
                <p className="text-lg text-slate-600 font-medium">Expert answers for IT administrators</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Does it slow down computer performance?",
                  a: "No. FreezeState's redirection logic consumes negligible CPU cycles. In many cases, it makes the system feel faster as it prevents the accumulation of temporary files and unwanted background processes.",
                },
                {
                  q: "How do I install updates when the system is Frozen?",
                  a: "You can schedule 'Maintenance Windows' through the console. FreezeState will automatically switch to a 'Thawed' state, allow updates to install, or deploy patches, and then return to a 'Frozen' state automatically.",
                },
                {
                  q: "Can I protect specific partitions only?",
                  a: "Yes. You have full control over which physical drives and logical partitions are Frozen. Common practice is to Freeze the system (C:) drive and keep a separate D: drive as a Thawed persistence space for user files.",
                },
                {
                  q: "Is it compatible with newer SSDs (NVMe)?",
                  a: "Absolutely. FreezeState is fully optimized for modern NVMe and SSD storage, including TRIM support, ensuring both high-speed performance and longevity of your hardware infrastructure.",
                },
                {
                  q: "Does it work with Cloud Central Management?",
                  a: "Yes. You can manage multiple workstations from anywhere in the world using our secure cloud-based console, which allows for remote freezing, thawing, and scheduling.",
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
              source="Freeze State Page Contact"
              solutionType="freeze-state"
              title="Make Your Workstations Truly Indestructible"
              subtitle="Deploy FreezeState across your enterprise to eliminate configuration drift once and for all. Guaranteed recovery with every restart."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default FreezeStatePage;
