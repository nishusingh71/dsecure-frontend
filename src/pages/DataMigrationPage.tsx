import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getSEOForPage } from "@/utils/seo";
import {
  Zap,
  ChevronDown,
  Database,
  Server,
  Layers,
  ArrowUpRight,
  CheckCircle,
  Briefcase,
  Activity,
  ShieldCheck,
  Search,
  Settings,
  Monitor,
  Cloud,
  Globe,
  Lock,
  FileSearch,
  BarChart3,
  RefreshCcw,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import { ProductContactForm } from "@/components/forms";
import {
  ShieldIcon,
  CheckIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  ServerIcon,
} from "@/components/FlatIcons";

const sectionNavItems = [
  { id: "overview", label: "Overview" },
  { id: "methodology", label: "Methodology" },
  { id: "types", label: "Migration Types" },
  { id: "technology", label: "How It Works" },
  { id: "security", label: "Security & Compliance" },
  { id: "use-cases", label: "Use Cases" },
  { id: "specs", label: "Specifications" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const migrationTypes = [
  {
    title: "Storage Migration",
    desc: "Moving data from aging hardware to high-performance SSDs or modern san/nas systems.",
    icon: <ServerIcon className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Database Migration",
    desc: "Upgrading database engines or moving to cloud-native databases like Azure SQL or AWS RDS.",
    icon: <Database className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Application Migration",
    desc: "Transitioning entire application stacks between environments while ensuring data model parity.",
    icon: <Layers className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Cloud Migration",
    desc: "Lifting and shifting on-premises workloads to public cloud environments (AWS, Azure, GCP).",
    icon: <CloudIcon className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600"
  }
];

const DataMigrationPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
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
  }, []);

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
      <SEOHead seo={getSEOForPage("data-migration")} />
      
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
        <section id="overview" className="relative pt-6 pb-12 lg:pt-10 lg:pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8 text-left">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>

                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <ShieldIcon className="w-4 h-4" />
                    Enterprise-Grade Data Transfer
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1]">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Data Migration
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Experience <span className="text-emerald-700 font-bold">Zero-Loss, Zero-Downtime</span> data transitions. Securely migrate mission-critical workloads across Cloud, Database, and Hybrid infrastructure with automated validation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={() => scrollToSection("strategy")}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                    >
                      View Strategies
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: 3D Product Box Visual (Follows FileEraserPage theme) */}
              <Reveal delayMs={200}>
                <div 
                  className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl rounded-full"></div>
                  
                  {/* 3D Product Box Container */}
                  <div
                    className="relative animate-[float_4s_ease-in-out_infinite]"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glow Behind Box */}
                    <div className="absolute inset-0 bg-emerald-500/40 blur-3xl rounded-3xl scale-110"></div>

                    {/* Main Box - Front Face */}
                    <div
                      className="relative w-[220px] h-[280px] lg:w-[280px] lg:h-[360px] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateY(-12deg) rotateX(5deg)",
                        boxShadow: "25px 25px 60px rgba(0,0,0,0.3), -5px -5px 20px rgba(255,255,255,0.1), inset 0 0 80px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Top Shine */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 lg:p-8">
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                          <span className="text-white/80 text-[10px] lg:text-xs font-semibold tracking-widest uppercase">D-Secure</span>
                        </div>

                        {/* Main Icon - Transfer/Sync Icon */}
                        <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 lg:mb-6 border border-white/20 shadow-inner">
                          <Zap className="w-12 h-12 lg:w-16 lg:h-16 text-white drop-shadow-lg" />
                        </div>

                        <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight text-center mb-1 lg:mb-2">
                          Data Migration
                        </h3>

                        <p className="text-white/70 text-[10px] lg:text-xs text-center tracking-wide uppercase">
                          Zero-Loss Transition
                        </p>

                        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/20">
                            <CheckIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-300" />
                            <span className="text-white/90 text-[9px] lg:text-[11px] font-semibold uppercase tracking-wider">Secure Sync</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Face (3D) */}
                    <div
                      className="absolute top-0 right-0 w-[30px] lg:w-[40px] h-full bg-gradient-to-l from-emerald-800 to-emerald-700 rounded-r-lg"
                      style={{
                        transform: "rotateY(90deg) translateZ(0px) translateX(15px)",
                        transformOrigin: "left center",
                      }}
                    ></div>

                    {/* Bottom Reflection */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[180px] lg:w-[240px] h-16 bg-gradient-to-t from-emerald-600/20 to-transparent blur-xl rounded-full"></div>
                  </div>

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

        {/* ================= METHODOLOGY SECTION ================= */}
        {/* Five-step migration lifecycle ko explain kiya gaya hai */}
        <section id="methodology" className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  Our Migration Methodology
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  A military-grade, systematic approach ensuring 100% data integrity and minimal downtime.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-5 gap-4">
               {[
                 { step: "01", title: "Assessment", desc: "Source environment probing & ROT data discovery.", icon: <Search /> },
                 { step: "02", title: "Planning", desc: "Strategy formulation & pilot testing.", icon: <Briefcase /> },
                 { step: "03", title: "Execution", desc: "Byte-level secure data transfer.", icon: <Activity /> },
                 { step: "04", title: "Validation", desc: "Post-migration checksum & logic verification.", icon: <ShieldCheck /> },
                 { step: "05", title: "Reporting", desc: "Comprehensive audit logs & decommissioning.", icon: <FileSearch /> },
               ].map((item, idx) => (
                 <Reveal key={item.title} delayMs={idx * 100}>
                    <div className="relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 h-full group text-center">
                       <span className="absolute top-4 right-6 text-4xl font-black text-slate-200/50 group-hover:text-emerald-500/10 transition-colors uppercase">{item.step}</span>
                       <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                       </div>
                       <h4 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h4>
                       <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= TECHNOLOGY DEEP DIVE SECTION ================= */}
        {/* Technical implementation details yaha bataye gaye hain */}
        <section id="technology" className="py-24 lg:py-32 bg-slate-900 text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#065f4625_0%,transparent_100%)]"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <Reveal>
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">
                    Engineered for Velocity
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
                    Near-Zero <br/>
                    <span className="text-emerald-500 text-5xl lg:text-7xl">Downtime.</span>
                  </h2>
                  <div className="space-y-8">
                    {[
                      { title: "Real-time Byte-Level Replication", desc: "Mirror source systems precisely at the block level, capturing every change before the final cutover.", icon: <RefreshCcw /> },
                      { title: "Intelligent Compression & WAN Opt", desc: "Deduplication and multi-threaded transfer protocols to saturate available bandwidth efficiently.", icon: <Zap /> },
                      { title: "Agentless Discovery", desc: "Scan your entire infrastructure without installing software on source machines, reducing complexity.", icon: <Search /> },
                    ].map(item => (
                      <div key={item.title} className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="relative p-1 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-[3rem]">
                  <div className="bg-slate-800 rounded-[2.8rem] p-10 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 p-8">
                       <Activity className="w-32 h-32 text-emerald-500/10" />
                    </div>
                    
                    <div className="space-y-8 relative z-10">
                       <div className="p-6 bg-slate-700/50 rounded-2xl border border-white/10">
                          <div className="flex justify-between items-center mb-4">
                             <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Migration Flow Velocity</span>
                             <span className="text-xs font-mono text-emerald-400">985 MB/s</span>
                          </div>
                          <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 w-[85%] animate-pulse"></div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Data Consistence</p>
                             <p className="text-lg font-bold">99.999%</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Latency Offset</p>
                             <p className="text-lg font-bold text-emerald-400">-42ms</p>
                          </div>
                       </div>

                       <div className="p-6 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-900/40">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-white" />
                             </div>
                             <div>
                                <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Active Integrity Guard</p>
                                <p className="text-sm text-white font-bold">CRC-64 Validation Running</p>
                             </div>
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
        {/* Security standards aur features yaha detail mein hain */}
        <section id="security" className="py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="relative">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                  <div className="relative z-10 space-y-8">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                      Fortified <br/>
                      <span className="text-emerald-600">Data Integrity.</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Our migration engine is built on a "De-Risk First" architecture, ensuring every byte is protected by industrial-grade security protocols.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { title: "AES-256 Encryption", desc: "End-to-end encryption for data in transit and at rest.", icon: <Lock /> },
                        { title: "Immutable Hashing", desc: "MD5/SHA-256 verification for absolute data parity.", icon: <ShieldCheck /> },
                        { title: "Audit Continuity", desc: "Detailed chain-of-custody reporting for every file.", icon: <BarChart3 /> },
                        { title: "Access Control", desc: "Granular RBAC and MFA for migration operators.", icon: <Settings /> },
                      ].map(item => (
                        <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 mb-4 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                             {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                          </div>
                          <h4 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative shadow-2xl overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors"></div>
                   
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                         <ShieldCheck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold">Compliance Ready</h3>
                         <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Global Standards Met</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { label: "SOC2 Type II", value: "Security, Confidentiality & Processing Integrity" },
                        { label: "GDPR / HIPAA", value: "Meets all data privacy and handling requirements" },
                        { label: "NIST 800-88", value: "Compliant with media sanitization guidelines" },
                        { label: "ISO 27001", value: "Information security management systems certified" }
                      ].map(std => (
                        <div key={std.label} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                           <div className="mt-1"><CheckCircle className="w-4 h-4 text-emerald-400" /></div>
                           <div>
                              <p className="text-sm font-bold text-white">{std.label}</p>
                              <p className="text-xs text-slate-400 leading-relaxed">{std.value}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="mt-10 pt-10 border-t border-white/10">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-4">Verification Audit Report</p>
                      <div className="flex bg-slate-800 rounded-xl p-4 items-center justify-between">
                         <div className="flex items-center gap-3">
                            <FileSearch className="w-5 h-5 text-emerald-400" />
                            <span className="text-xs font-medium text-slate-300">Final_Integrity_Report.pdf</span>
                         </div>
                         <button className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors">DOWNLOAD</button>
                      </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= USE CASES SECTION ================= */}
        {/* Industry specific scenarios yaha focus kiye gaye hain */}
        <section id="use-cases" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  Tailored for Every <span className="text-emerald-600">Scenario.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Whether it's a massive cloud move or a physical data center exit, D-Secure adapts.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   title: "Cloud Adoption",
                   desc: "Accelerate your move to AWS, Azure, or GCP with automated platform translation and minimal disruption.",
                   icon: <Cloud />,
                   stat: "40% Faster Delivery",
                   tags: ["Lift & Shift", "Refactoring", "Hybrid"]
                 },
                 {
                   title: "Mergers & Acquisitions",
                   desc: "Consolidate heterogeneous data environments from multiple organizations into a unified core during M&A events.",
                   icon: <Globe />,
                   stat: "Zero Data Collision",
                   tags: ["Consolidation", "Tenant Migration", "Identity Sync"]
                 },
                 {
                   title: "DC Exit & Consolidation",
                   desc: "Securely decommission aging data centers while maintaining 100% availability of services during transition.",
                   icon: <Monitor />,
                   stat: "99.9% Uptime Maintained",
                   tags: ["Physical to Virtual", "Hardware Refresh", "ITAD"]
                 }
               ].map((useCase, idx) => (
                 <Reveal key={useCase.title} delayMs={idx * 100}>
                    <div className="group bg-white rounded-[2.5rem] p-10 border border-slate-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center text-center">
                       <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                          {React.cloneElement(useCase.icon as React.ReactElement, { className: "w-8 h-8" })}
                       </div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{useCase.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed mb-8">{useCase.desc}</p>
                       
                       <div className="mt-auto w-full pt-8 border-t border-slate-100">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4">{useCase.stat}</p>
                          <div className="flex flex-wrap justify-center gap-2">
                             {useCase.tags.map(tag => (
                               <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">{tag}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= SPECIFICATIONS SECTION ================= */}
        {/* Technical compatibility aur requirements yaha hain */}
        <section id="specs" className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  Technical <span className="text-emerald-600">Specifications.</span>
                </h2>
                <p className="text-lg text-slate-600 font-medium">
                  Engineered for maximum compatibility across enterprise ecosystems.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               {[
                 {
                   category: "Operating System Support",
                   items: ["Windows Server 2012 / 2016 / 2019 / 2022", "RHEL 7.x / 8.x / 9.x", "Ubuntu 18.04 / 20.04 / 22.04 LTS", "macOS 12.0+ (Monterey, Ventura, Sonoma)"],
                   icon: <Settings />
                 },
                 {
                   category: "Data Sources & Targets",
                   items: ["AWS (S3, RDS, EBS, EC2)", "Azure (Blob, SQL DB, Managed Disks)", "Google Cloud (GCS, Cloud SQL, Compute Engine)", "On-Premises (VMware, Hyper-V, KVM)"],
                   icon: <Server />
                 },
                 {
                   category: "Transfer Protocols",
                   items: ["SFTP (Secure File Transfer)", "HTTPS (TLS 1.3)", "TCP/IP (Optimized Flow Control)", "Fiber Channel / iSCSI for SAN-to-SAN"],
                   icon: <Activity />
                 },
                 {
                   category: "Hardware Compatibility",
                   items: ["NVMe / SSD / SAS / SATA Support", "All major RAID controllers (Dell, HP, Lenovo)", "Network Interface: 1GbE / 10GbE / 40GbE / 100GbE", "Storage Appliances (NAS/SAN)"],
                   icon: <Monitor />
                 }
               ].map((spec, idx) => (
                 <Reveal key={spec.category} delayMs={idx * 100}>
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 h-full">
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                             {React.cloneElement(spec.icon as React.ReactElement, { className: "w-5 h-5" })}
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 tracking-tight">{spec.category}</h4>
                       </div>
                       <ul className="grid grid-cols-1 gap-3">
                          {spec.items.map(item => (
                            <li key={item} className="flex gap-3 text-sm text-slate-600 font-medium">
                               <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES GRID SECTION ================= */}
        {/* Supplementary features yaha summary mein hain */}
        <section className="py-24 lg:py-32 bg-slate-900 text-white relative">
           <div className="container mx-auto px-4 max-w-7xl">
              <Reveal>
                 <div className="text-left mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Advanced Capabilities</h2>
                 </div>
              </Reveal>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { title: "Smart Discovery", desc: "Automatic workload identification.", icon: <Search /> },
                   { title: "WAN Optimiser", desc: "Data stream acceleration.", icon: <Zap /> },
                   { title: "Resource Balancing", desc: "Dynamic CPU/Network throttling.", icon: <Settings /> },
                   { title: "Central Console", desc: "Manage multi-site migrations.", icon: <Monitor /> },
                   { title: "Auto Validation", desc: "Real-time checksum matching.", icon: <ShieldCheck /> },
                   { title: "Cloud Connector", desc: "Native API level integration.", icon: <Cloud /> },
                   { title: "Policy Engine", desc: "Custom exclusion rules.", icon: <Settings /> },
                   { title: "Audit Portal", desc: "Historical migration analytics.", icon: <BarChart3 /> }
                 ].map((feat, idx) => (
                    <Reveal key={feat.title} delayMs={idx * 50}>
                       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors group">
                          <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                             {React.cloneElement(feat.icon as React.ReactElement, { className: "w-6 h-6" })}
                          </div>
                          <h4 className="font-bold text-sm mb-1">{feat.title}</h4>
                          <p className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">{feat.desc}</p>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Migration Q&A</h2>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What is D-Secure's approach to data integrity during migration?",
                  a: "We use byte-level verification and CRC-64 checksum matching at both source and target. Every transferred block is validated before the migration is marked as successful, ensuring absolute parity.",
                },
                {
                  q: "How does 'Near-Zero Downtime' work?",
                  a: "Our technology uses real-time asynchronous replication. We sync the majority of the data while the system is live, and only perform a brief 'catch-up' sync and cutover once the data is nearly in sync, minimizing disruption to seconds.",
                },
                {
                  q: "Can D-Secure migrate data between different cloud providers?",
                  a: "Yes. Our platform-agnostic engine supports Cloud-to-Cloud (e.g., AWS to Azure), On-Prem-to-Cloud, and Cloud-to-On-Prem migrations with automatic format translation where necessary.",
                },
                {
                  q: "What happens if a migration is interrupted by a network failure?",
                  a: "Our engine includes 'Checkpoint Restart' capabilities. If a transfer is interrupted, it automatically resumes from the last successfully transferred block once connectivity is restored, without needing to restart from scratch.",
                },
                {
                  q: "Does D-Secure handle specialized databases like Oracle or SAP?",
                  a: "Absolutely. We provide specialized connectors for major RDBMS engines (Oracle, SQL Server, MySQL, Postgres) ensuring transactional consistency and schema integrity throughout the migration.",
                },
              ].map((faq) => (
                <Reveal key={faq.q}>
                  <details className="group bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm">
                    <summary className="flex items-center justify-between p-7 cursor-pointer list-none">
                      <span className="font-bold text-slate-900 pr-4 text-base lg:text-lg tracking-tight">{faq.q}</span>
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-open:rotate-180 transition-transform shadow-inner">
                        <ChevronDown className="w-6 h-6" />
                      </span>
                    </summary>
                    <div className="px-7 pb-8 text-slate-600 leading-relaxed text-sm lg:text-base border-t border-slate-50 pt-6 font-medium">
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
              source="Data Migration Page Contact"
              solutionType="data-migration"
              title="Start Your Migration With Expert Confidence"
              subtitle="Discuss your project with our migration architects and get a custom strategy tailored to your organization."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default DataMigrationPage;
