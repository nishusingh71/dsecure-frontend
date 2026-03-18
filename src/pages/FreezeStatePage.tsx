import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ChevronDown,
  Lock,
  RefreshCcw,
  CheckCircle,
  Shield,
  Layout,
  Globe,
  Monitor,
  Cloud,
  Settings,
  AlertCircle,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
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

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "technology", "benefits", "features", "faq", "cta"];
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
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: scrollPosition > 400 },
        })
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up header visibility on unmount
      const isDesktop = window.innerWidth >= 768;
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
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: id === "overview" ? 0 : elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "technology", label: "Technology" },
    { id: "benefits", label: "Benefits" },
    { id: "features", label: "Features" },
    { id: "faq", label: "FAQ" },
  ];

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
        <section id="overview" className="relative py-16 lg:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8 text-left">
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
                    Patented <span className="text-emerald-700 font-bold">Reboot-to-Restore</span> technology that makes your computers bulletproof. 100% workstation recovery with every restart.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Request Technical Demo
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
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

        {/* ================= HOW IT WORKS SECTION ================= */}
        <section id="technology" className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    Pure Configuration <br/>
                    <span className="text-emerald-600 italic">Immunity.</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    FreezeState operates at the partition level. It creates a virtual redirect table for all write operations. All data written to the "Frozen" drive is redirected—never touching the original data sectors.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                       <Shield className="w-6 h-6 text-emerald-500 mb-4" />
                       <h4 className="font-bold text-slate-900 mb-2">Sector Persistence</h4>
                       <p className="text-sm text-slate-600">Original sectors remain untouched, ensuring zero corruption.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                       <Zap className="w-6 h-6 text-emerald-500 mb-4" />
                       <h4 className="font-bold text-slate-900 mb-2">Instant Recovery</h4>
                       <p className="text-sm text-slate-600">A simple restart clears the redirect table in milliseconds.</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Indestructible State", desc: "No matter what changes a user makes, a reboot brings it back.", icon: <Monitor /> },
                    { title: "Master Boot Record (MBR) Protection", desc: "Prevents rootkits and low-level software from modifying the boot process.", icon: <Lock /> },
                    { title: "Stealth Mode", desc: "Hides FreezeState icons and prevents users from knowing the system is protected.", icon: <Cloud /> },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-300 hover:bg-white hover:shadow-xl transition-all duration-300">
                       <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS SECTION ================= */}
        <section id="benefits" className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#064e3b30_0%,transparent_100%)]"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20 mb-8">
                   Enterprise ROI
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 italic tracking-tight">Zero Configuration Drift.</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Reduce IT overhead by automating the "Reboot-to-Restore" cycle across your entire workstation pool.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: "63% Fewer IT Tickets", val: "Helpdesk tickets are reduced significantly as user-induced issues vanish.", icon: <ClipboardIcon /> },
                 { title: "NIST Compliance", val: "Ensure shared computers always maintain a compliant, pristine state.", icon: <ShieldIcon /> },
                 { title: "Lower TCO", val: "Extend hardware life and reduce the need for frequent re-imaging.", icon: <CheckIcon /> },
               ].map((f) => (
                <Reveal key={f.title}>
                   <div className="text-center p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 h-full group">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      {React.cloneElement(f.icon as React.ReactElement, { className: "w-8 h-8" })}
                    </div>
                    <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.val}</p>
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
                  a: "You can schedule 'Maintenance Windows' through the console. FreezeState will automatically switch to a 'Thawed' state, allow updates to install, and then return to a 'Frozen' state—keeping your systems up-to-date and secure.",
                },
                {
                  q: "Can I protect specific partitions only?",
                  a: "Yes. You have full control over which physical drives and logical partitions are Frozen. Common practice is to Freeze the C: drive and keep a separate D: drive as a Thawed persistence space.",
                },
                {
                  q: "Is it compatible with newer SSDs and NVMe drives?",
                  a: "Absolutely. FreezeState is fully optimized for modern flash storage, including TRIM support, ensuring both high-speed performance and longevity of your SSD infrastructure.",
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

        {/* ================= CTA ================= */}
        <section id="cta" className="py-24 lg:py-40 relative overflow-hidden">
           <div className="absolute inset-0 bg-white"></div>
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4"></div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <Reveal>
              <div className="relative bg-gradient-to-br from-emerald-900 to-teal-950 rounded-[3rem] p-10 lg:p-24 text-center shadow-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 group-hover:scale-110 transition-transform duration-1000"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Make Your Workstations <br/>
                    <span className="italic text-emerald-400">Truly Indestructible</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-emerald-100/70 leading-relaxed font-medium">
                    Deploy FreezeState across your enterprise to eliminate configuration drift once and for all.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto bg-white text-emerald-900 font-black px-12 py-6 rounded-[2rem] hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl"
                    >
                      REQUEST TECHNICAL QUOTE
                    </Link>
                    <button className="w-full sm:w-auto border-2 border-white/20 text-white font-bold px-12 py-6 rounded-[2rem] hover:bg-white/10 transition-all font-mono tracking-widest text-sm uppercase">
                      Start 30-Day Trial
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default FreezeStatePage;
