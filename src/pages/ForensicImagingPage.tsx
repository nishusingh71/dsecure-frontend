import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ChevronDown,
  Lock,
  Search,
  HardDrive,
  Boxes,
  RefreshCcw,
  CheckCircle,
  FileText,
  Layers,
  Database,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import { 
  ShieldIcon, 
  CheckIcon, 
  ArrowRightIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
} from "@/components/FlatIcons";

const ForensicImagingPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "standards", "verification", "features", "faq", "contact"];
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
    { id: "standards", label: "Standards" },
    { id: "verification", label: "Verification" },
    { id: "features", label: "Features" },
    { id: "faq", label: "FAQ" },
  ];

  const standards = [
    { title: "Physical Write-Blocking", desc: "Ensures source devices remain unmodified during the entire imaging process.", icon: <Lock className="w-5 h-5" /> },
    { title: "Universal Interface Support", desc: "SATA, SAS, IDE, USB 3.0, PCIe, NVMe, and Memory Card support.", icon: <HardDrive className="w-5 h-5" /> },
    { title: "E01 & Ex01 Formats", desc: "Industry-standard compressed forensic image formats with metadata support.", icon: <FileText className="w-5 h-5" /> },
    { title: "Raw (dd) Imaging", desc: "Bit-for-bit physical copies for maximum compatibility with analysis tools.", icon: <Layers className="w-5 h-5" /> },
  ];

  const verificationFeatures = [
    { title: "MD5/SHA Hashing", desc: "Simultaneous calculation of multiple hash signatures during acquisition.", icon: <ShieldIcon className="w-10 h-10" /> },
    { title: "Audit Log Generation", desc: "Comprehensive CSV/PDF logs documenting every step of the imaging session.", icon: <ClipboardIcon className="w-10 h-10" /> },
    { title: "Data Integrity Check", desc: "Automated block-level verification against original hash signatures.", icon: <CheckCircle className="w-10 h-10" /> },
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: "Forensic Imaging Tool | Bit-for-Bit Data Acquisition | D-Secure",
          description: "Professional forensic imaging software for secure data acquisition. Features physical write-blocking, MD5/SHA-256 verification, and support for all major file systems.",
          keywords: "forensic imaging, disk cloning, write blocking, data acquisition, E01 imaging, dd image, forensic hash verification",
          canonicalUrl: "https://dsecuretech.com/products/forensic-imaging",
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
        <section id="overview" className="relative py-12 lg:py-20 xl:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8 text-left">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <ShieldIcon className="w-4 h-4" />
                    Forensic-Grade Acquisition
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Forensic Imaging
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Create immutable, bit-for-bit duplicates of any storage media. Optimized for high-speed acquisition with built-in write-blocking and cryptographic verification.
                  </p>

                  {/* Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {["NIST 800-88", "GDPR", "HIPAA", "DOJ Standard", "SOX"].map((badge) => (
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
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Request Technical Demo
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => scrollToSection("standards")}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                    >
                      View Full Specs
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Forensic Imaging Visual (Modern Box Style) */}
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

                  {/* Modern 3D Visual Container */}
                  <div className="relative group transition-transform duration-700 hover:rotate-y-12">
                     <div className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border border-emerald-50 overflow-hidden w-[280px] xs:w-[340px] lg:w-[380px] mx-auto transform hover:-translate-y-2 transition-all duration-500">
                        {/* Internal UI elements */}
                        <div className="space-y-8">
                           <div className="flex items-center justify-between border-b pb-6 border-emerald-50">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                                   <Database className="w-5 h-5" />
                                </div>
                                <div>
                                   <h4 className="font-bold text-slate-900 line-clamp-1">Source: SAS Drive 2TB</h4>
                                   <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Write-Blocking Active</p>
                                </div>
                             </div>
                             <Lock className="w-5 h-5 text-emerald-500" />
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
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Avg Speed</p>
                                 <p className="text-xl font-black text-slate-900">1.4 GB/s</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Time left</p>
                                 <p className="text-xl font-black text-slate-900">04:12</p>
                              </div>
                           </div>

                           <div className="p-5 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200">
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
              <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20 mb-8">
                   Cryptographic Verification
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 italic tracking-tight">Every Byte Matters.</h2>
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
                <div className="max-w-2xl">
                   <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight">Industrial Scale Imaging</h2>
                   <p className="text-lg text-slate-600 leading-relaxed">
                     From single-drive investigations to mass deployment in datacenters, our tool handles heavy throughput with absolute precision.
                   </p>
                </div>
                <div className="flex items-center gap-4 text-emerald-700 font-black bg-emerald-50 px-8 py-5 rounded-[2rem] border border-emerald-100 shadow-sm transition-transform hover:scale-105">
                   <Zap className="w-6 h-6 text-emerald-500 animate-pulse" />
                   UP TO 3.5 GB/s
                </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { title: "Multicast Architecture", desc: "Clonezilla-powered parallel imaging for deploying across 100+ systems simultaneously.", icon: <Boxes /> },
                 { title: "High-Speed Sanitization", desc: "Built-in NIST-compliant secure erase to clear destination media before acquisition.", icon: <GearIcon /> },
                 { title: "Bittorrent Streaming", desc: "Resilient decentralized mass imaging even in high-latency network environments.", icon: <Zap /> },
                 { title: "Enterprise Cloud Hub", desc: "Direct imaging to AWS S3, Azure Blob, or D-Secure Encrypted Cloud Repository.", icon: <CloudIcon /> },
                 { title: "Live Content Indexing", desc: "Search and categorize evidence items while the image is being acquired.", icon: <Search /> },
                 { title: "Adaptive Resume", desc: "Intelligent recovery of interrupted imaging sessions with automatic checksum validation.", icon: <RefreshCcw /> },
               ].map((item) => (
                 <Reveal key={item.title}>
                    <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-500 h-full group relative overflow-hidden">
                       <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                       <div className="w-11 h-11 rounded-xl bg-white text-emerald-600 flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 shadow-sm transition-transform border border-slate-50">
                          {React.isValidElement(item.icon) 
                            ? React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })
                            : <Layers className="w-5 h-5" />
                          }
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

        {/* ================= CTA ================= */}
        <section id="contact" className="py-24 lg:py-40 relative overflow-hidden">
           <div className="absolute inset-0 bg-white"></div>
           {/* Abstract Background Shapes */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4"></div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <Reveal>
              <div className="relative bg-gradient-to-br from-emerald-900 to-teal-950 rounded-[3rem] p-10 lg:p-24 text-center shadow-3xl overflow-hidden group">
                {/* Micro-interactive background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Start Your <br/>
                    <span className="italic text-emerald-400">Secure Acquisition</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-emerald-100/70 leading-relaxed font-medium">
                    Deploy D-Secure Forensic Imaging in your lab or field operations. Guaranteed integrity, unrivaled speed.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto bg-white text-emerald-900 font-black px-12 py-6 rounded-[2rem] hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl"
                    >
                      REQUEST TECHNICAL QUOTE
                    </Link>
                    <button className="w-full sm:w-auto border-2 border-white/20 text-white font-bold px-12 py-6 rounded-[2rem] hover:bg-white/10 transition-all font-mono tracking-widest text-sm">
                      VERIFY_SPECS()
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

export default ForensicImagingPage;
