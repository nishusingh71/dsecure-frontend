import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ChevronDown,
  Database,
  Server,
  Layers,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { 
  ShieldIcon, 
  CheckIcon, 
  ArrowRightIcon,
  GlobeIcon,
  GearIcon,
  CloudIcon,
  ServerIcon,
} from "@/components/FlatIcons";

const DataMigrationPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "strategy", "types", "best-practices", "security", "faq"];
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
    { id: "strategy", label: "Strategy" },
    { id: "types", label: "Types" },
    { id: "best-practices", label: "Best Practices" },
    { id: "faq", label: "FAQ" },
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

  return (
    <>
      <SEOHead
        seo={{
          title: "D-Secure Data Migration | Secure Enterprise Data Transfer Product",
          description: "D-Secure Data Migration provides professional, zero-loss data transition across Cloud, Database, and Infrastructure. Enterprise-grade security for mission-critical workloads.",
          keywords: "data migration tool, enterprise data transfer, cloud migration software, database migration, secure data transition, D-Secure",
          canonicalUrl: "https://dsecuretech.com/products/data-migration",
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
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8 text-left">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
                    <ShieldIcon className="w-4 h-4" />
                    Enterprise-Grade Data Transfer
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1]">
                    D-Secure <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent italic">
                      Data Migration
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Securely transition your mission-critical workloads across <span className="text-emerald-700 font-bold">Cloud, Database, and Physical</span> infrastructure with zero compromise.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold px-8 py-4 rounded-xl opacity-60 cursor-not-allowed shadow-md transition-all duration-300 pointer-events-none"
                    >
                      Buy Now
                      <ArrowRightIcon className="w-5 h-5" />
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

                        <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight text-center mb-1 lg:mb-2 italic">
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

        {/* ================= STRATEGY SECTION (3 PILLARS) ================= */}
        <section id="strategy" className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight">
                  The 3 Strategic Pillars
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We formulate your migration strategy based on three critical vectors defined by industry standards.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { 
                   title: "Workload Complexity", 
                   desc: "Evaluating VMs, Databases, and specialized applications to determine the best migration toolset.", 
                   icon: <Layers />,
                   gradient: "from-blue-500 to-cyan-500"
                 },
                 { 
                   title: "Data Volume Scale", 
                   desc: "From <10TB online transfers to multi-petabyte offline physical appliances, we scale to match your footprint.", 
                   icon: <Server />,
                   gradient: "from-emerald-500 to-teal-500"
                 },
                 { 
                   title: "Execution Velocity", 
                   desc: "Optimizing network bandwidth vs logic shipping timelines to meet your critical business deadlines.", 
                   icon: <Clock />,
                   gradient: "from-purple-500 to-indigo-500"
                 },
               ].map((item, idx) => (
                 <Reveal key={item.title} delayMs={idx * 100}>
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full group">
                       <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform`}>
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-7 h-7" })}
                       </div>
                       <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= MIGRATION TYPES SECTION ================= */}
        <section id="types" className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#065f4630_0%,transparent_100%)]"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
                 <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20 mb-8">
                       Azure-Aligned Taxonomy
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold italic tracking-tight mb-0">Types of Data Migration</h2>
                 </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
               {migrationTypes.map((type, idx) => (
                 <Reveal key={type.title} delayMs={idx * 100}>
                    <div className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                       <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.color} opacity-[0.03] blur-3xl group-hover:opacity-10 transition-opacity`}></div>
                       <div className="flex gap-6 items-start">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                             {type.icon}
                          </div>
                          <div>
                             <h4 className="text-xl font-bold mb-3 tracking-tight">{type.title}</h4>
                             <p className="text-slate-400 text-sm leading-relaxed mb-6">{type.desc}</p>
                             <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:gap-4 transition-all">
                                Learn More <ArrowUpRight className="w-4 h-4" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= BEST PRACTICES SECTION ================= */}
        <section id="best-practices" className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-10">
                  <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight italic tracking-tight">
                    Optimized Migration <br/>
                    <span className="text-emerald-600">Best Practices.</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      { icon: <Briefcase />, title: "Stakeholder Alignment", desc: "Gather requirements from all business units early to align on formatting and analytics needs." },
                      { icon: <GlobeIcon />, title: "Environment Probing", desc: "Rigorous assessment of source and target OS, DDL, and schema compatibility." },
                      { icon: <GearIcon />, title: "Risk Mitigation", desc: "Pre-migration data cleaning to eliminate redundancy and redundant entries (Dirty Data)." },
                    ].map((item) => (
                       <div key={item.title} className="flex gap-6 group">
                          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:bg-emerald-100 transition-colors">
                             {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-900 mb-1 tracking-tight">{item.title}</h4>
                             <p className="text-slate-600 text-sm">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="relative bg-emerald-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-emerald-200 group overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                   <ShieldIcon className="w-16 h-16 text-emerald-300 mb-8 animate-pulse" />
                   <h3 className="text-3xl font-bold mb-6 italic tracking-tight">Security & Compliance First.</h3>
                   <ul className="space-y-4">
                      {[
                        "AES-256 Military Grade Encryption for transit",
                        "Immutable Hashing for post-migration validation",
                        "Audit Trail for Regulatory compliance (SOC2/GDPR)",
                        "Secure Offline shipping for massive data volumes"
                      ].map(check => (
                        <li key={check} className="flex items-center gap-3">
                           <CheckCircle className="w-5 h-5 text-emerald-300" />
                           <span className="font-medium text-emerald-50">{check}</span>
                        </li>
                      ))}
                   </ul>
                   <div className="mt-10 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                      <p className="text-xs text-emerald-100 font-bold uppercase tracking-widest mb-2">Technical Standard</p>
                      <p className="text-sm font-mono italic">Compatible with NIST 800-88, DoD 5220.22-M Media Sanitization Guidelines.</p>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-24 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 italic tracking-tight">Migration Q&A</h2>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What is the difference between data migration and data conversion?",
                  a: "Data migration is the overall process of moving data from one system/storage to another. Data conversion is a subset of that process, where the data format itself is transformed to be compatible with the target system.",
                },
                {
                  q: "How long does a petabyte-scale migration take?",
                  a: "For large-scale transfers (petabytes), timeline depends on bandwidth and strategy. Offline migration devices are often used to reduce this timeframe significantly.",
                },
                {
                  q: "Will there be downtime during the migration?",
                  a: "Our strategy aims for near-zero downtime. For mission-critical workloads, we implement strategies like 'Parallel Execution' where systems run concurrently.",
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
                    Start Your Migration <br/>
                    <span className="italic text-emerald-400">With Expert Confidence</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-emerald-100/70 leading-relaxed font-medium">
                    Discuss your project with our migration architects and get a custom strategy tailored to your organization.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto bg-white text-emerald-900 font-black px-12 py-6 rounded-[2rem] hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl"
                    >
                      REQUEST STRATEGY SESSION
                    </Link>
                    <Link 
                      to="/pricing-and-plan"
                      className="w-full sm:w-auto border-2 border-white/20 text-white font-bold px-12 py-6 rounded-[2rem] hover:bg-white/10 transition-all font-mono tracking-widest text-sm uppercase text-center"
                    >
                      View Pricing
                    </Link>
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

export default DataMigrationPage;
