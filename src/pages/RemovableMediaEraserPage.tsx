import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  CheckIcon,
  ArrowRightIcon,
  GearIcon,
} from "@/components/FlatIcons";
import { FileTextIcon, Download, Zap, Database, HardDrive, Server, RefreshCcw, Activity } from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { ProductContactForm } from "@/components/forms/ProductContactForm";

const RemovableMediaEraserPage: React.FC = memo(function RemovableMediaEraserPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Monitor scroll for sticky secondary nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = globalThis.scrollY;
      const shouldShow = scrollY > 400;
      setIsNavVisible(shouldShow);

      // Only dispatch event to hide/show main navbar on desktop (md+) screens
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          })
        );
      }

      const sections = ["overview", "capabilities", "benefits", "specifications", "compliance", "contact"];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: false },
        })
      );
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + globalThis.pageYOffset - offset;
      globalThis.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "benefits", label: "Benefits" },
    { id: "specifications", label: "Specifications" },
    { id: "compliance", label: "Compliance" },
    { id: "contact", label: "Contact" },
  ];

  const capabilities = [
    {
      name: "USB Thumb Drives",
      desc: "Securely erase all data from standard USB drives, including high-capacity flash storage.",
      icon: <Database className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "SD & MicroSD Cards",
      desc: "Critical for mobile device security, ensuring no sensitive data remains on external memory cards.",
      icon: <Activity className="w-6 h-6" />, // Changed from Smartphone
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "CompactFlash & Micro Drives",
      desc: "Support for professional-grade storage used in cameras, specialized equipment, and embedded systems.",
      icon: <HardDrive className="w-6 h-6" />,
      color: "from-emerald-600 to-teal-700"
    },
    {
      name: "Flash Memory Devices",
      desc: "Broad support for MP3 players, digital cameras, and other removable flash storage.",
      icon: <Server className="w-6 h-6" />, // Changed from Layers
      color: "from-teal-500 to-emerald-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("removable-media-eraser")} />

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
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === link.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* ================= HERO SECTION ================= */}
        <section id="overview" className="relative pt-8 pb-4 lg:pt-12 lg:pb-8 xl:pt-16 xl:pb-10 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.08),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.08),transparent_50%)]"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="flex-1 text-center lg:text-left">
                <Reveal>
                  <UpcomingBadge className="mb-4" />
                </Reveal>
                
                <Reveal delayMs={100}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-4 tracking-tight">
                    Securely Erase <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">USB & Flash</span> Drives
                  </h1>
                </Reveal>

                <Reveal delayMs={200}>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                    Permanently destroy data from removable storage including USB drives, SD cards, and CompactFlash memory with tamper-proof reporting and global compliance.
                  </p>
                </Reveal>

                <Reveal delayMs={300}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <a 
                      href="/contact" 
                      className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-lg transition-all hover:border-emerald-300 flex items-center justify-center gap-3 shadow-md"
                    >
                      <Download className="w-5 h-5 text-emerald-600" />
                      Download Overview
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* 3D Visual Hero */}
              <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none px-4 lg:px-0">
                <Reveal delayMs={300}>
                  <div className="relative aspect-square lg:aspect-auto lg:h-[450px] flex items-center justify-center">
                    {/* Animated Particles */}
                    <div className="absolute top-[20%] right-[10%] w-3 h-3 bg-emerald-400 rounded-full animate-pulse opacity-40"></div>
                    <div className="absolute bottom-[15%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2.8s_ease-in-out_infinite_1s] opacity-40"></div>
                    <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[ping_3.2s_ease-in-out_infinite_0.3s] opacity-40"></div>

                    {/* 3D Visual Container - USB Theme */}
                    <div 
                      className="relative animate-[float_4s_ease-in-out_infinite]"
                      style={{ transformStyle: 'preserve-3d', animation: 'float 4s ease-in-out infinite' }}
                    >
                      {/* Glow Behind */}
                      <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-3xl scale-125"></div>

                      {/* USB-like 3D Object (Represented as a premium product box with USB focus) */}
                      <div 
                        className="relative w-[240px] h-[320px] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl overflow-hidden"
                        style={{ 
                          transform: 'rotateY(-12deg) rotateX(5deg)',
                          boxShadow: '25px 25px 60px rgba(0,0,0,0.3), -5px -5px 20px rgba(255,255,255,0.1), inset 0 0 80px rgba(255,255,255,0.05)'
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent"></div>

                        <div className="relative h-full flex flex-col items-center justify-center p-8">
                          <div className="absolute top-6 left-6">
                            <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">D-Secure</span>
                          </div>

                          {/* Main Icon - USB/External Drive */}
                          <div className="w-28 h-28 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                             <Database className="w-16 h-16 text-white drop-shadow-xl" />
                          </div>

                          <h3 className="text-white text-3xl font-bold tracking-tight text-center mb-2">
                             Removable Media
                          </h3>
                          <p className="text-white/70 text-xs text-center tracking-wide uppercase">
                            Flash Storage Eraser
                          </p>


                        </div>
                      </div>

                      {/* Multi-drive Visual (Floating mini-cards to show simultaneous erasure) */}
                      <div className="absolute -right-12 top-10 w-24 h-24 bg-white/40 backdrop-blur-md rounded-xl shadow-lg border border-white/40 flex items-center justify-center animate-[float_5s_ease-in-out_infinite_1s]" style={{ transform: 'translateZ(50px)' }}>
                         <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-inner">
                            <Zap className="w-6 h-6" />
                         </div>
                      </div>
                      <div className="absolute -left-16 bottom-20 w-20 h-20 bg-white/40 backdrop-blur-md rounded-xl shadow-lg border border-white/40 flex items-center justify-center animate-[float_6s_ease-in-out_infinite_0.5s]" style={{ transform: 'translateZ(30px)' }}>
                         <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white shadow-inner">
                            <CheckIcon className="w-5 h-5" />
                         </div>
                      </div>

                      {/* Reflection */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[240px] h-20 bg-emerald-600/20 blur-2xl rounded-full"></div>
                    </div>
                  </div>
                </Reveal>

                <style>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0px) rotateY(-12deg) rotateX(5deg); }
                    50% { transform: translateY(-20px) rotateY(-8deg) rotateX(3deg); }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}
        <section id="capabilities" className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Supported Memory Devices</h2>
                <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mb-8"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                   Comprehensive data destruction support for all types of flash memory and removable media.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((item, i) => (
                <Reveal key={item.name} delayMs={i * 100}>
                  <div className="group bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/20 transition-all duration-500 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                       {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.name}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY BENEFITS ================= */}
        <section id="benefits" className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Dark theme benefits */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,#064e3b_1px,transparent_1px),linear-gradient(-45deg,#064e3b_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-white">
                <Reveal>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8">Scale Your Erasure Operations</h2>
                  <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                    Designed for high-volume environments, our removable media solution allows for massive throughput without compromising security or compliance.
                  </p>
                </Reveal>

                <div className="space-y-8">
                  <Reveal delayMs={100}>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-400 border border-emerald-500/30">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Simultaneous Erasure</h4>
                        <p className="text-slate-400 leading-relaxed">Permanently erase 24+ flash drives rapidly and simultaneously, drastically reducing system downtime.</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={200}>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-400 border border-blue-500/30">
                        <GearIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Flexible Deployment</h4>
                        <p className="text-slate-400 leading-relaxed">Deploy as a standalone desktop application or an MSI package for enterprise-wide user access.</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={300}>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-teal-400 border border-teal-500/30">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Managed Console Integration</h4>
                        <p className="text-slate-400 leading-relaxed">Maximize erasure processes by integrating with D-Secure Management Console for centralized reporting.</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>

              <div className="flex-1 w-full">
                <Reveal delayMs={400}>
                   <div className="bg-gradient-to-br from-emerald-600 to-teal-800 p-1 rounded-3xl shadow-2xl">
                      <div className="bg-slate-900 rounded-[22px] p-8 lg:p-12 overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-4 opacity-20"><RefreshCcw className="w-24 h-24 animate-spin-slow" /></div>
                         <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Why Choose D-Secure?</h3>
                         <ul className="space-y-4">
                            {[
                              "ISO & NIST standards support",
                              "100% Tamper-proof reporting",
                              "Digitally signed erasure certificates",
                              "Prevention of data loss and fraud",
                              "Customized consolidated reports",
                              "Global regulatory compliance"
                            ].map((item, idx) => (
                               <li key={item} className="flex items-center gap-3 text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 flex-shrink-0">
                                   <ArrowRightIcon className="w-3 h-3" />
                                </div>
                                <span>{item}</span>
                              </li>
                            ))}
                         </ul>
                         <button 
                           onClick={() => scrollToSection("contact")}
                           className="mt-10 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 uppercase tracking-widest text-sm"
                         >
                            Explore Case Studies
                         </button>
                      </div>
                   </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE & STANDARDS ================= */}
        <section id="compliance" className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                 <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Global Compliance & Standards</h2>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">Supporting 25+ international data erasure standards and regulatory requirements.</p>
                 <div className="flex flex-wrap justify-center gap-6 items-center opacity-70">
                    {["PCI DSS", "HIPAA", "SOX", "ISO 27001", "ISO 27040", "EU GDPR"].map((tag) => (
                      <span key={tag} className="px-6 py-3 bg-slate-100 rounded-full font-bold text-slate-700 border border-slate-200 shadow-sm">{tag}</span>
                    ))}
                 </div>
              </div>
            </Reveal>

            <div className="bg-emerald-50 rounded-3xl p-8 lg:p-12 border border-emerald-100">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-2">
                     <Reveal>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Bulletproof Audit Trail</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                           Every erasure process generates a digitally signed, tamper-proof certificate of erasure. This detailed report includes hardware asset identifiers, erasure standard used, and verification result, providing 100% proof of compliance for audits.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-emerald-200">
                              <CheckIcon className="w-5 h-5 text-emerald-500" />
                              <span className="text-sm font-bold text-slate-800">Tamper-Proof PDF</span>
                           </div>
                           <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-emerald-200">
                              <CheckIcon className="w-5 h-5 text-emerald-500" />
                              <span className="text-sm font-bold text-slate-800">XML Export Ready</span>
                           </div>
                        </div>
                     </Reveal>
                  </div>
                  <div className="relative group">
                     <Reveal delayMs={300}>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                           <FileTextIcon className="w-16 h-16 text-emerald-600 mb-4" />
                           <div className="space-y-3">
                              <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
                              <div className="h-3 w-full bg-slate-100 rounded"></div>
                              <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                                 <span>Verified</span>
                                 <span>D-Secure Regulatory</span>
                              </div>
                           </div>
                        </div>
                     </Reveal>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-white border-t relative overflow-hidden isolate">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="w-full">
              <ProductContactForm 
                source="Removable Media Eraser Page" 
                solutionType="Eraser"
                title="Request a Free Trial"
                subtitle="See how D-Secure Removable Media Eraser can secure your flash storage."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer is handled by MainLayout */}
    </div>
  );
});

export default RemovableMediaEraserPage;
