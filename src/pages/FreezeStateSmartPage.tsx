import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getSEOForPage } from "@/utils/seo";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import SEOHead from "../components/SEOHead";
import { 
  Activity, 
  Monitor, 
  RefreshCcw, 
  CheckCircle, 
  Layout, 
  Shield, 
  ShieldCheck,
  Users,
  Smartphone,
  Gauge,
  Zap
} from "lucide-react";
import { ArrowRightIcon } from "@/components/FlatIcons";
import Reveal from "@/components/Reveal";
import { ProductContactForm } from "@/components/forms";

const FreezeStateSmartPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "telemetry", label: "Real-time Telemetry" },
    { id: "admin-console", label: "Admin Console" },
    { id: "user-requests", label: "User Requests" },
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
      <SEOHead seo={getSEOForPage("freeze-state-smart")} />

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
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
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
                        <Activity className="w-4 h-4 animate-pulse" />
                        Live Intelligent Monitoring
                      </div>
                      
                      <Link 
                        to="/products/freeze-state-advanced"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm text-slate-600 hover:bg-slate-200 px-4 py-2 rounded-full text-[10px] font-bold border border-slate-200 transition-all group shadow-sm h-10"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Switch to Advanced Eraser Edition</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                    FreezeState <br />
                    <span className="text-emerald-600">Smart Diagnostic</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-xl">
                    Full visibility into your workstation fleet. The Smart edition pairs robust reboot-to-restore protection with real-time performance telemetry and centralized command.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => scrollToSection("contact")}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all duration-500 shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 text-xs"
                    >
                      Request Early Access
                    </button>
                    <button 
                      onClick={() => scrollToSection("telemetry")}
                      className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all duration-500 active:scale-95 text-xs"
                    >
                      View Features
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Floating Monitor with D-Secure Dashboard */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl"></div>

                  {/* Orbiting Device Icons */}
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

                  {/* Main Monitor */}
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
                            <span className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 font-medium">FreezeState Smart Console</span>
                            <div className="w-6"></div>
                          </div>
                          <div className="p-2 sm:p-3 lg:p-3.5 space-y-2 sm:space-y-2.5">
                            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-emerald-400 font-bold text-[10px] sm:text-xs lg:text-base">1,240</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">Systems Frozen</div>
                              </div>
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-teal-400 font-bold text-[10px] sm:text-xs lg:text-base">100%</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">Rollback Rate</div>
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-cyan-400 font-bold text-[10px] sm:text-xs lg:text-base">99.9%</div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">Zero Persistence</div>
                              </div>
                            </div>
                            <div className="bg-slate-800/60 rounded-lg p-1.5 sm:p-2 border border-slate-700/40">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <Activity className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                                  </div>
                                  <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-white font-medium">System Scan — Lab 4A</span>
                                </div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "85%", animation: "progressGrow 3s ease-in-out infinite" }}></div>
                              </div>
                              <div className="flex justify-between mt-0.5">
                                <span className="text-[5px] sm:text-[6px] text-slate-500">Sync: Real-time (Node #481)</span>
                                <span className="text-[5px] sm:text-[6px] text-emerald-400 font-bold">85%</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {[{ name: "Workstation_01", status: "frozen", time: "Active" }, { name: "Lab_Console_Alpha", status: "frozen", time: "Synced" }].map((item) => (
                                <div key={item.name} className="flex items-center justify-between px-2 py-0.5 rounded bg-slate-800/40">
                                  <div className="flex items-center gap-1">
                                    <div className={`w-1 h-1 rounded-full ${item.status === "frozen" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}></div>
                                    <span className="text-[6px] sm:text-[7px] text-slate-400">{item.name}</span>
                                  </div>
                                  <span className="text-[5px] sm:text-[6px] text-slate-600">{item.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 sm:w-16 lg:w-20 h-3 sm:h-4 lg:h-5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-sm"></div>
                        <div className="w-20 sm:w-24 lg:w-28 h-1.5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes monitorFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
                    @keyframes deviceBob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
                    @keyframes progressGrow { 0%, 100% { width: 85%; } 50% { width: 90%; } }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TELEMETRY SECTION */}
        <section id="telemetry" className="py-32 bg-white relative overflow-hidden">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col md:flex-row gap-20 items-center">
                 <div className="w-full md:w-1/2 order-2 md:order-1">
                    <Reveal>
                       <div className="grid grid-cols-2 gap-6">
                          {[
                            { icon: <Monitor />, title: "10-20s Refresh", desc: "Machine status refreshes every 10-20 seconds for real-time monitoring." },
                            { icon: <CheckCircle />, title: "Admin Approval", desc: "Allows users to send requests for temporary or permanent system changes." },
                            { icon: <Shield />, title: "Timeline History", desc: "Comprehensive monitoring of all system updates, clears, and freezes since deployment." },
                            { icon: <Zap />, title: "Alert Messages", desc: "Remotely configure custom warning messages displayed during system resets." },
                          ].map((item) => (
                            <div key={item.title} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:bg-white hover:shadow-xl group">
                               <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                               </div>
                               <h5 className="font-black uppercase tracking-widest text-xs mb-3 text-slate-900">{item.title}</h5>
                               <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
                 <div className="w-full md:w-1/2 order-1 md:order-2 space-y-8">
                    <Reveal>
                       <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight italic">
                          Real-time <br />
                          <span className="text-emerald-600">Performance Telemetry</span>
                       </h2>
                       <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          Knowledge is power. Smart Diagnostic doesn't just protect your machines; it tells you exactly how they're performing. From CPU spikes to memory leaks, your admin panel is always in sync.
                       </p>
                       <div className="space-y-4 pt-4">
                          {[
                            "Machine-level unique identification",
                            "Automatic hardware health alerts",
                            "Sector-wise delta monitoring",
                            "Cross-platform telemetry sync"
                          ].map((text) => (
                             <div key={text} className="flex items-center gap-3">
                               <CheckCircle className="w-5 h-5 text-emerald-500" />
                               <span className="font-bold text-slate-700 text-sm uppercase tracking-widest">{text}</span>
                             </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* ADMIN CONSOLE */}
        <section id="admin-console" className="py-32 bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#10b98140_0%,transparent_100%)]"></div>
           </div>
           <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-16">
              <Reveal>
                 <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tight">
                       Centralized <br />
                       <span className="text-emerald-400">Admin Console</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                       Admin command center updates every minute, providing a unified view of your entire workstation network. Approve requests, monitor health, and push policies in one click.
                    </p>
                 </div>
              </Reveal>

              <Reveal delayMs={200}>
                 <div className="grid md:grid-cols-3 gap-8">
                    {[
                       { icon: <Smartphone />, title: "Mobile Ready", desc: "Native iOS and Android apps for on-the-go lab management and alerts." },
                       { icon: <RefreshCcw />, title: "1-Minute Sync", desc: "The console pulls fresh data from all nodes every 60 seconds." },
                       { icon: <Gauge />, title: "Fleet-wide Metrics", desc: "Aggregated performance data for your entire institution at a glance." },
                       
                    ].map((item) => (
                       <div key={item.title} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 text-left">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-8 shadow-lg">
                             {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                          </div>
                          <h4 className="text-xl font-bold uppercase tracking-widest mb-4">{item.title}</h4>
                          <p className="text-slate-400 leading-relaxed font-medium text-sm">{item.desc}</p>
                       </div>
                    ))}
                 </div>
              </Reveal>
           </div>
        </section>

        {/* USER REQUESTS */}
        <section id="user-requests" className="py-32 bg-slate-50">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col md:flex-row gap-20 items-center">
                 <div className="w-full md:w-1/2 space-y-8">
                    <Reveal>
                       <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                          Empower Users, <br />
                          <span className="text-emerald-600">Retain Control</span>
                       </h2>
                       <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          With the integrated request workflow, users can ask to persist files or maintain session states. Admins get a notification on their console and can approve or deny in seconds.
                       </p>
                       <div className="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-6 shadow-xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-125"></div>
                          <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <Users className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Session Request Flow</span>
                          </div>
                          <div className="space-y-4">
                             <div className="flex gap-4">
                                <div className="w-1 bg-emerald-500 rounded-full"></div>
                                <div>
                                   <p className="text-xs font-black uppercase text-slate-900 tracking-widest">User Request</p>
                                   <p className="text-sm text-slate-500">"Save project files till Monday"</p>
                                </div>
                             </div>
                             <div className="flex gap-4">
                                <div className="w-1 bg-slate-200 rounded-full"></div>
                                <div>
                                   <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Admin Status</p>
                                   <p className="text-sm text-emerald-600 font-bold">Checking Lab Capacity...</p>
                                 </div>
                             </div>
                          </div>
                          <div className="pt-4 flex gap-4">
                             <div className="flex-1 bg-emerald-600 text-white text-[10px] font-black uppercase py-3 rounded-xl text-center tracking-widest cursor-pointer shadow-lg shadow-emerald-500/20">Automatic Approve</div>
                             <div className="flex-1 bg-slate-900 text-white text-[10px] font-black uppercase py-3 rounded-xl text-center tracking-widest cursor-pointer shadow-lg">Review First</div>
                          </div>
                       </div>
                    </Reveal>
                 </div>
                 <div className="w-full md:w-1/2">
                    <Reveal delayMs={200}>
                       <div className="bg-emerald-600 rounded-[3.5rem] p-12 text-white space-y-10 relative overflow-hidden shadow-2xl shadow-emerald-600/30">
                          <div className="absolute -bottom-10 -right-10 opacity-10">
                             <Layout className="w-64 h-64" />
                          </div>
                          <h3 className="text-3xl font-bold tracking-tight mb-8">Flexible Persistent Policies</h3>
                          <ul className="space-y-10 relative z-10 mt-16">
                             {[
                                { title: "Session Locking", desc: "Temporarily stop the reboot-to-restore cycle for specific approved machines." },
                                { title: "Whitelisted Paths", desc: "Allow users to save to specific secure directories via admin approval." },
                                { title: "Automated Resets", desc: "Schedule resets immediately after a persistence window expires." },
                             ].map((item) => (
                                <li key={item.title} className="flex gap-12">
                                   <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                                      <Shield className="w-5 h-5" />
                                   </div>
                                    <div className="space-y-1.5">
                                       <p className="text-sm font-bold uppercase tracking-widest mb-1">{item.title}</p>
                                       <p className="text-[13px] text-white/70 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                             ))}
                          </ul>
                       </div>
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
                 <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">Technical Specs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
                {[
                  { label: "Update Interval", value: "10-20 Seconds (Machine Local)" },
                  { label: "Admin Sync", value: "60 Seconds (Cloud Command)" },
                  { label: "Identity Architecture", value: "UUID Based Machine Linking" },
                  { label: "Persistence Control", value: "Admin-mediated Request System" },
                  { label: "Metrics Tracked", value: "CPU, RAM, Disk I/O, App Delta" },
                  { label: "Mobile Support", value: "Native Android & iOS Admin App" },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center border-b border-slate-100 pb-6 group">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors uppercase">{spec.label}</span>
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 bg-slate-50">
           <div className="container mx-auto px-4 max-w-4xl">
              <Reveal>
                 <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">Frequent Questions</h2>
                    <p className="text-slate-500 font-medium">Everything you need to know about Smart Diagnostic.</p>
                 </div>
                 <div className="space-y-6">
                    {[
                       { q: "How does the 10-second telemetry affect PC performance?", a: "Our agent is ultra-lean, consuming less than 0.1% CPU resources for its telemetry reporting, ensuring no impact on user experience." },
                       { q: "Can I manage machines from outside the lab network?", a: "Yes. Smart Diagnostic uses a secure cloud tunnel, allowing admins to approve persistent requests from any location via the mobile app or web portal." },
                       { q: "What happens if a machine loses internet connection?", a: "FreezeState local protection continues to work offline. Telemetry data is cached locally and uploaded to the console as soon as connectivity is restored." }
                    ].map((item) => (
                       <div key={item.q} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4">Q: {item.q}</h4>
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
               source="Freeze State Smart Page Detailed"
               solutionType="freeze-state-smart"
               title="Ready for Fleet Visibility?"
               subtitle="Transform your lab management with real-time diagnostics and smart persistent control. Get started today."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default FreezeStateSmartPage;
