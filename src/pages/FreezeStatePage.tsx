import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import {
  Settings,
  AlertCircle,
  ShieldCheck,
  Server,
  Layers,
  Database,
  Lock,
  Boxes,
  FileText,
  Search,
  HardDrive,
  Users,
  Activity,
  History,
  Zap,
  ChevronDown,
  RefreshCcw,
  CheckCircle,
  Shield,
  Layout,
  Globe,
  Monitor,
  Cloud,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import { ProductContactForm } from "@/components/forms";
import { 
  ShieldIcon, 
  CheckIcon, 
  ArrowRightIcon,
  GearIcon,
  ClipboardIcon,
} from "@/components/FlatIcons";

const FreezeStatePage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "modes", label: "Protection Modes" },
    { id: "technology", label: "The Technology" },
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
      <SEOHead
        seo={{
          title: "FreezeState | Reboot-to-Restore Instant PC Recovery | D-Secure",
          description: "Protect your workstations from configuration drift and unauthorized changes. FreezeState reverts PCs to their pristine state on every restart. Ideal for labs, kiosks, and shared devices.",
          keywords: "reboot to restore, computer freeze software, deep freeze alternative, workstation protection, configuration drift prevention, instant system recovery",
          canonicalUrl: "https://dsecuretech.com/products/freeze-state",
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
              <Reveal>
                <div className="space-y-8 text-left">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>

                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <RefreshCcw className="w-4 h-4" />
                    Indestructible Workstations
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1]">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent italic">
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

              {/* Right: 3D Frozen Workstation Visual */}
              <Reveal delayMs={200}>
                <div 
                  className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl rounded-full"></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                  <div className="absolute bottom-[15%] right-[10%] w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-40"></div>

                  <div className="relative group transition-transform duration-700 hover:rotate-y-12">
                     <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/50 overflow-hidden w-[280px] xs:w-[340px] lg:w-[380px] mx-auto transform hover:-translate-y-2 transition-all duration-500">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">System Protected</span>
                           </div>
                           <Shield className="w-4 h-4 text-emerald-500" />
                        </div>

                        {/* Visual Core: The Frozen Screen */}
                        <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500">
                           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                           <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                 <RefreshCcw className="w-6 h-6 text-white animate-spin-slow" />
                              </div>
                              <div className="text-center">
                                 <p className="text-white font-mono text-[10px] tracking-widest">DRIVE_C://FROZEN</p>
                                 <div className="flex gap-1 mt-2">
                                    {[1,2,3,4,5].map(i => (
                                       <div key={i} className="w-4 h-1 bg-emerald-400 rounded-full"></div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Stats/Metrics UI */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                           <div className="p-4 bg-slate-100/50 rounded-2xl border border-white/50">
                              <p className="text-[9px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Helpdesk Load</p>
                              <p className="text-lg font-black text-emerald-600">-63%</p>
                           </div>
                           <div className="p-4 bg-slate-100/50 rounded-2xl border border-white/50">
                              <p className="text-[9px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Uptime</p>
                              <p className="text-lg font-black text-slate-900">100%</p>
                           </div>
                        </div>

                        {/* ThawSpace indicator */}
                        <div className="mt-6 flex items-center justify-between p-4 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                 <Layout className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                 <p className="text-[9px] text-emerald-100 font-bold uppercase tracking-widest">ThawSpace</p>
                                 <p className="text-[10px] text-white font-bold italic">Persistence Drive (D:)</p>
                              </div>
                           </div>
                           <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                     </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PROTECTION MODES SECTION ================= */}
        {/* Is section mein hum system ke alag alag states ko explain karenge */}
        <section id="modes" className="py-24 lg:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight underline decoration-emerald-500/30 decoration-8 underline-offset-8">
                  Intelligent Protection Modes
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Switch between states seamlessly for maintenance or total lockdown.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: "frozen",
                  title: "Frozen Mode",
                  desc: "Every reboot restores the system to its pristine baseline. Permanent configuration immunity.",
                  icon: <ShieldCheck className="w-8 h-8" />,
                  color: "bg-emerald-500",
                  textColor: "text-emerald-600",
                },
                {
                  id: "thawed",
                  title: "Thawed Mode",
                  desc: "Maintenance mode where all changes are saved permanently. Use for updates or patches.",
                  icon: <RefreshCcw className="w-8 h-8" />,
                  color: "bg-amber-500",
                  textColor: "text-amber-600",
                },
                {
                  id: "thawed-once",
                  title: "Thawed on Next Boot",
                  desc: "Reboot once into thawed mode for scheduled tasks, then automatically re-freeze.",
                  icon: <Activity className="w-8 h-8" />,
                  color: "bg-cyan-500",
                  textColor: "text-cyan-600",
                },
              ].map((mode) => (
                <Reveal key={mode.id}>
                  <div className="group relative p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className={`${mode.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl group-hover:rotate-12 transition-transform`}>
                      {mode.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{mode.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{mode.desc}</p>
                    <div className="mt-8 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      <span className={`text-sm font-bold ${mode.textColor}`}>Learn More</span>
                      <ArrowRightIcon className={`w-4 h-4 ${mode.textColor}`} />
                    </div>
                  </div>
                </Reveal>
              ))}
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
                <h2 className="text-4xl lg:text-6xl font-bold text-white italic mb-8">
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
                 <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight">Total Control Console</h2>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 italic tracking-tight">FreezeState Q&A</h2>
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
