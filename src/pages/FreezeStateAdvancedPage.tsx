import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getSEOForPage } from "@/utils/seo";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import SEOHead from "../components/SEOHead";
import { 
  Zap,
  ShieldCheck as ShieldCheckIcon,
  FileText,
  Lock,
  CheckCircle,
  HardDrive,
  ShieldAlert,
  Archive,
  Terminal,
  FileCheck,
  ClipboardCheck,
  Cpu,
  Fingerprint,
  Activity,
  Monitor,
  RefreshCcw,
  Gauge,
  Workflow,
  Cloud,
  Layers,
  Search,
  Lock as LockIcon,
  Boxes,
  Shield as ShieldIconLucide,
  Database as DatabaseIcon,
  BookOpen
} from "lucide-react";
import { ArrowRightIcon, ShieldIcon } from "@/components/FlatIcons";
import Reveal from "@/components/Reveal";
import { ProductContactForm } from "@/components/forms";
import { generateFreezeStateReport } from "@/utils/reportGenerator";

const FreezeStateAdvancedPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "erasure-tech", label: "Sector-Wise Erase" },
    { id: "compliance", label: "Compliance" },
    { id: "audit-reports", label: "Audit Reports" },
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
      <SEOHead seo={getSEOForPage("freeze-state-advanced")} />

      <div className="min-h-screen bg-white text-slate-900">
        {/* ================= STICKY SECTION NAV ================= */}
        <div
          className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
            isNavVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
            <div className="container mx-auto px-4 max-w-7xl">
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
                <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
                  {sectionNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
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

        {/* HERO */}
        <section id="overview" className="min-h-[calc(100vh-64px)] flex items-center pt-16 pb-12 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-emerald-100/30 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <UpcomingBadge />
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0 flex-nowrap text-left">
                      <div className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 border border-emerald-200 shadow-sm h-10">
                        <ShieldCheckIcon className="w-4 h-4" />
                        Military-Grade Data Sanitization
                      </div>
                      
                      <Link 
                        to="/products/freeze-state-smart"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm text-slate-600 hover:bg-slate-200 px-4 py-2 rounded-full text-[10px] font-bold border border-slate-200 transition-all group shadow-sm h-10"
                      >
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        <span>Switch to Smart Diagnostic Edition</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
                    Advanced <span className="text-emerald-600">Eraser</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-xl">
                    For environments that demand absolute data destruction. Advanced Eraser wipes redirected sectors beyond recovery on every reboot, meeting global security standards.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => scrollToSection("contact")}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all duration-500 shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 text-xs"
                    >
                      Request Early Access
                    </button>
                    <button 
                      onClick={() => scrollToSection("erasure-tech")}
                      className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all duration-500 active:scale-95 text-xs"
                    >
                      Technical Overview
                    </button>
                    {/* <Link 
                      to="/support/help-manual/complete-freeze-state-manual"
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 text-xs flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      View Help Manual
                    </Link> */}
                  </div>
                </div>
              </Reveal>

              {/* Right Hero: Floating Monitor (Same Logic as Smart Edition) */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl"></div>

                  {/* Orbiting Device Icons (Direct style transfer from Smart Edition) */}
                  <div className="absolute inset-0 hidden sm:block">
                    {[
                      { top: "8%", left: "12%", label: "Secure Boot", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", delay: "0s" },
                      { top: "10%", right: "8%", label: "BIOS Config", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", delay: "0.6s" },
                      { bottom: "18%", right: "8%", label: "System RAM", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", delay: "0.3s" },
                      { bottom: "8%", left: "38%", label: "Network Nodes", icon: "M4 6h16M4 12h16M4 18h16", delay: "1.5s" },
                      { bottom: "25%", left: "5%", label: "Registry", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", delay: "1.2s" },
                      { top: "45%", left: "2%", label: "Workstation", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", delay: "0.9s" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="absolute group"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                      >
                        <div
                          className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-xl shadow-lg border border-emerald-100 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl hover:border-emerald-400"
                          style={{ animation: `deviceBob 3s ease-in-out infinite ${item.delay}` }}
                        >
                          <svg className="w-4.5 h-4.5 lg:w-5 lg:h-5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] lg:text-[8px] font-medium text-slate-500 whitespace-nowrap">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main Monitor (Syncing Float Height and Interior Structure) */}
                  <div className="relative z-10" style={{ animation: "monitorFloat 6s ease-in-out infinite" }}>
                    <div className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full"></div>
                    <div className="relative w-[230px] sm:w-[270px] lg:w-[330px]">
                      <div className="bg-slate-900 rounded-t-xl sm:rounded-t-2xl p-1 sm:p-1.5 lg:p-2 shadow-2xl border border-slate-700/50">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-1 bg-slate-800/80 border-b border-slate-700/50">
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-400 rounded-full"></div>
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-400 rounded-full"></div>
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 font-medium italic">D-Secure Advanced Console</span>
                            <div className="w-6"></div>
                          </div>
                          <div className="p-2 sm:p-3 lg:p-3.5 space-y-2 sm:space-y-2.5">
                            {/* Advanced Edition Stats */}
                            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-emerald-400 font-bold text-[10px] sm:text-xs lg:text-base">5,840+</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase font-black">Systems Protected</div>
                              </div>
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-teal-400 font-bold text-[10px] sm:text-xs lg:text-base">0 ms</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase font-black">Persistence</div>
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-cyan-400 font-bold text-[10px] sm:text-xs lg:text-base">100%</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase font-black">Compliance</div>
                              </div>
                            </div>

                            {/* Advanced Action View */}
                            <div className="bg-slate-800/60 rounded-lg p-1.5 sm:p-2 border border-slate-700/40">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <ShieldCheckIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                                  </div>
                                  <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-white font-medium uppercase tracking-widest italic">Kernel Erasure Active</span>
                                </div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  style={{
                                    width: "94%",
                                    animation: "progressGrow 3s ease-in-out infinite",
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-0.5">
                                <span className="text-[5px] sm:text-[6px] text-slate-500 italic italic">Scan: Secure Boot (Node #FSX)</span>
                                <span className="text-[5px] sm:text-[6px] text-emerald-400 font-bold">94%</span>
                              </div>
                            </div>

                            {/* Feed */}
                            <div className="space-y-1">
                              {[
                                { node: "FS_Node_841", action: "Erasure Lock", time: "Live" },
                                { node: "Kernel_Alpha", action: "Pure State", time: "Synced" },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between px-2 py-0.5 rounded bg-slate-800/40"
                                >
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                    <span className="text-[6px] sm:text-[7px] text-slate-400 font-medium uppercase">
                                      {item.node}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[5px] sm:text-[6px]">
                                    <span className="text-slate-500 italic">{item.action}</span>
                                    <span className="text-emerald-500/70 font-mono">{item.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stand */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 sm:w-16 lg:w-20 h-3 sm:h-4 lg:h-5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-sm"></div>
                        <div className="w-20 sm:w-24 lg:w-28 h-1.5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes monitorFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
                    @keyframes deviceBob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
                    @keyframes progressGrow { 0%, 100% { width: 94%; } 50% { width: 98%; } }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY SECTION */}
        <section id="erasure-tech" className="py-32 bg-white relative overflow-hidden">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col md:flex-row gap-20 items-center">
                 <div className="w-full md:w-1/2 space-y-8">
                    <Reveal>
                       <div className="bg-slate-50 p-4 rounded-full inline-flex items-center gap-3 pr-6 border border-slate-100 mb-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                             <Terminal className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Proprietary Kernel Logic</span>
                       </div>
                       <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight italic">
                          Sector-Wise <br />
                          <span className="text-emerald-600">Pure Permanence</span>
                       </h2>
                       <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          Standard reboot-to-restore engines simply redirect file pointers. Our Advanced Eraser writes random patterns over every sector of the 'redirected space' before discarding it, making data recovery physically impossible.
                       </p>
                       <div className="grid grid-cols-2 gap-8 pt-4">
                          {[
                             { title: "Military-grade", desc: "DOD/NIST sector-level erasure." },
                             { title: "Health Certificates", desc: "Per-machine audit-ready reports." },
                             { title: "Deep Wiping", desc: "Redirected space removal logic." },
                             { title: "Full Reports", desc: "Comprehensive erasure history." },
                          ].map((item) => (
                             <div key={item.title} className="space-y-2">
                                <div className="flex items-center gap-2">
                                   <Zap className="w-4 h-4 text-emerald-600" />
                                   <p className="font-black text-xs uppercase tracking-widest">{item.title}</p>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                             </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
                 <div className="w-full md:w-1/2">
                    <Reveal delayMs={200}>
                       <div className="grid grid-cols-2 gap-6">
                          {[
                            { icon: <HardDrive />, title: "Native SSD Trim", desc: "Full compatibility with SSD NAND Flash wear leveling logic." },
                            { icon: <Cpu />, title: "UEFI Secure Boot", desc: "Integrates at the firmware level for tamper-proof execution." },
                            { icon: <ShieldAlert />, title: "Auto-Fail Safe", desc: "Self-locking mechanism if sanitization verification fails." },
                            { icon: <Archive />, title: "Custom Passes", desc: "Configure up to 35-pass Guttman-grade overwriting." },
                          ].map((item) => (
                            <div key={item.title} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                               <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                               </div>
                               <h5 className="font-black uppercase tracking-widest text-xs mb-3 text-slate-900 italic">{item.title}</h5>
                               <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* COMPLIANCE STANDARDS */}
        <section id="compliance" className="py-32 bg-slate-50 border-y border-slate-100">
           <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                 <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                     <h2 className="text-4xl lg:text-7xl font-bold tracking-tight text-slate-900">
                        Global <br />
                        <span className="text-emerald-600">Compliance</span>
                     </h2>
                     <p className="text-lg text-slate-500 font-medium">Compliant with the most stringent data destruction requirements.</p>
                 </div>
              </Reveal>

              <div className="grid md:grid-cols-4 gap-6">
                 {[
                    { title: "NIST 800-88", standard: "Purge & Clear", desc: "U.S. Federal guidelines for media sanitization." },
                    { title: "DoD 5220.22-M", standard: "3-Pass / 7-Pass", desc: "Department of Defense erasure requirements." },
                    { title: "HMG Infosec 5", standard: "Higher Manual", desc: "UK Government standard for data classification." },
                    { title: "ISO 27001", standard: "Compliance", desc: "Global information security management compliance." },
                 ].map((item) => (
                    <Reveal key={item.title} delayMs={100}>
                        <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center">
                           <h4 className="text-xl font-bold mb-1 uppercase tracking-tighter text-slate-900">{item.title}</h4>
                          <p className="text-[10px] font-black uppercase text-emerald-500 mb-4 tracking-widest">{item.standard}</p>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">{item.desc}</p>
                       </div>
                    </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* AUDIT REPORTS */}
        <section id="audit-reports" className="py-32 bg-slate-900 text-white relative overflow-hidden">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col md:flex-row gap-20 items-center">
                 <div className="w-full md:w-1/2">
                    <Reveal>
                       <div className="relative p-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[3.5rem] shadow-2xl">
                          <div className="bg-white rounded-[3.4rem] p-10 space-y-8 text-slate-900">
                             <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <div className="flex items-center gap-3">
                                    <FileCheck className="w-5 h-5 text-emerald-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Verification Report</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job_ID: 8847-X</span>
                             </div>
                             
                             <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                   <div className="space-y-1">
                                      <p className="text-[10px] uppercase font-black text-slate-400">Node Name</p>
                                       <p className="text-sm font-bold">Lab_PC_West_04</p>
                                   </div>
                                   <div className="text-right space-y-1">
                                      <p className="text-[10px] uppercase font-black text-slate-400">Method</p>
                                       <p className="text-sm font-bold text-emerald-600">DoD 5220.22-M</p>
                                   </div>
                                </div>
                                
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                   <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Verify Pass</span>
                                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                                   </div>
                                   <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                      <div className="h-full bg-emerald-500 w-[100%] transition-all"></div>
                                   </div>
                                </div>
                             </div>

                              <div className="pt-4">
                                 <button 
                                    onClick={generateFreezeStateReport}
                                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center cursor-pointer hover:bg-slate-900 transition-colors shadow-lg shadow-emerald-500/20 border-none"
                                 >
                                    Download Sample Certificate
                                 </button>
                              </div>
                          </div>
                       </div>
                    </Reveal>
                 </div>
                 <div className="w-full md:w-1/2 space-y-8 text-left">
                    <Reveal delayMs={200}>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                           Automated <br />
                           <span className="text-emerald-400">Sanitization Reports</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                           Accountability is built-in. Advanced Eraser automatically generates tamper-proof sanitization certificates for every reboot. These reports provide forensic proof of erasure compliance.
                        </p>
                       <ul className="space-y-10 mt-16">
                          {[
                             { icon: <ClipboardCheck />, title: "Signed Certificates", desc: "Digital signatures ensure the report hasn't been modified." },
                             { icon: <FileText />, title: "JSON/CSV/PDF Export", desc: "Seamlessly integrate reports into your compliance software." },
                             { icon: <Fingerprint />, title: "Node Persistence Tracking", desc: "Tracks every wipe action ever performed on a specific hardware ID." },
                          ].map((item) => (
                             <li key={item.title} className="flex gap-12">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all">
                                   {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                                </div>
                                 <div className="space-y-1.5">
                                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">{item.title}</p>
                                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                 </div>
                             </li>
                          ))}
                       </ul>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* SPECS */}
        <section id="specs" className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-0.5 w-12 bg-emerald-600"></div>
                  <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-slate-900">High-Security Specs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 text-slate-900">
                {[
                  { label: "Erasure Algorithms", value: "25+ Military Standards" },
                  { label: "Overwrite Logic", value: "Random Pattern / Zero-Fill" },
                  { label: "Verification Level", value: "Sector-Wise Comparative Scan" },
                  { label: "Compliance Engine", value: "NIST 800-88 / DoD Compliance" },
                  { label: "Reporting Format", value: "Signed PDF / Cryptographic Hash" },
                  { label: "Boot Architecture", value: "UEFI / Secure-Boot Compliant" },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center border-b border-slate-100 pb-6 group hover:border-emerald-200 transition-all">
                     <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors uppercase">{spec.label}</span>
                     <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 bg-slate-50">
           <div className="container mx-auto px-4 max-w-4xl text-center">
              <Reveal>
                 <div className="mb-20 space-y-4">
                     <h2 className="text-4xl font-bold tracking-tight uppercase text-slate-900">Security Briefing</h2>
                     <p className="text-slate-500 font-medium">Protocol details for infrastructure administrators.</p>
                 </div>
                 <div className="text-left space-y-6">
                    {[
                       { q: "What is the difference between 'Shallow' and 'Deep' erase in Advanced mode?", a: "Shallow reset clears the redirection pointer (standard restore), while Deep erase performs a full low-level sector wipe on the modified storage area using NIST-compliant algorithms." },
                       { q: "Is this compatible with NVMe SSDs?", a: "Yes. Advanced Eraser includes native NVMe Sanitize and Secure Erase command support for modern flash-based architectures." },
                       { q: "How long does a sector-level wipe take during reboot?", a: "For typical session data (5-10 GB), a NIST Clear pass adds only 15-30 seconds to the boot cycle. Deep military-grade multiple passes vary by data volume." }
                    ].map((item) => (
                       <div key={item.q} className="bg-white p-8 rounded-[3rem] border border-slate-200 hover:border-emerald-400 transition-all shadow-sm group">
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4 group-hover:text-emerald-600">Q: {item.q}</h4>
                           <p className="text-sm text-slate-500 font-medium leading-relaxed">A: {item.a}</p>
                       </div>
                    ))}
                 </div>
              </Reveal>
           </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
               source="Freeze State Advanced Page Detailed"
               solutionType="freeze-state-advanced"
               title="Certify Your Data Destruction"
               subtitle="Leverage the most advanced reboot-to-restore eraser for mission-critical infrastructure. Get a custom security consultation."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default FreezeStateAdvancedPage;
