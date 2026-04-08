import React from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  FileSearch, 
  ArrowRight,
  Globe,
  Database,
  Lock,
  Search,
  BookOpen,
  PieChart,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import SEOHead from "../../components/SEOHead";

const researchAssets = [
  {
    id: "data-destruction-2026",
    title: "State of Data Destruction 2026",
    category: "Annual Industry Report",
    desc: "A comprehensive analysis of global asset decommissioning velocity, AI-hardware trends, and emerging sanitization standards.",
    icon: BarChart3,
    link: "/research/state-of-data-destruction-2026",
    color: "emerald",
    tags: ["2026 Trend", "Global Insights"]
  },
  {
    id: "standards-matrix",
    title: "Media Sanitization Standards Matrix",
    category: "Technical Guide",
    desc: "Deep-diver into NIST 800-88, IEEE 2883-2022, and international protocols. Real-time comparison for compliance leaders.",
    icon: ShieldCheck,
    link: "/research/media-sanitization-comparison-2026",
    color: "blue",
    tags: ["NIST 800-88", "IEEE 2883"]
  },
  {
    id: "benchmark-study",
    title: "Erasure Performance Benchmarks",
    category: "Performance Study",
    desc: "Empirical speed data across HDD, SSD, and NVMe. How controller-level cryptographic erasure outpaces legacy overwriting.",
    icon: Zap,
    link: "/research/erasure-speed-benchmark-2026",
    color: "teal",
    tags: ["Benchmark", "NVMe/SSD"]
  },
  {
    id: "zero-trust-framework",
    title: "Zero-Trust Sanitization Framework",
    category: "Security Whitepaper",
    desc: "Integrating verifiable media sanitization into a modern ZTA. How to establish cryptographic trust at the asset edge.",
    icon: FileSearch,
    link: "/research/zero-trust-sanitization-framework",
    color: "indigo",
    tags: ["Zero Trust", "Whitepaper"]
  }
];

const ResearchHubPage: React.FC = () => {
  // Brand Alignment: Standard D-Secure Light Theme (bg-slate-50, emerald accents).
  // Premium Layout: Research Hub with orbital lines on a clean background.
  
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      <SEOHead 
        title="D-Secure Lab | High-Authority Data Security Research Hub"
        description="Access enterprise-grade technical research, benchmark studies, and security whitepapers. Deep-dives into NIST 800-88, ZTA sanitization, and data destruction trends."
        canonicalUrl="https://dsecuretech.com/resources/research"
      />

      {/* Premium Hero - Brand Aligned */}
      <section className="relative pt-32 pb-40 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/20 to-cyan-50/40 -z-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        
        <div className="container-app relative">
           {/* Animated Orbital Decoration for 'Labs' feel */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-40">
              <svg className="w-full h-full animate-[spin_120s_linear_infinite]" viewBox="0 0 1000 1000">
                 <circle cx="500" cy="500" r="450" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-emerald-300" />
                 <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" className="text-emerald-200" />
              </svg>
           </div>

           <div className="max-w-4xl relative z-10">
              <Reveal>
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-[0.25em] mb-10 shadow-sm">
                   <Lock className="w-3.5 h-3.5" />
                   Security Intelligence Lab • Research Hub
                 </div>
                 <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.05] tracking-tight text-slate-900 uppercase">
                    Data Sanitization <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Intelligence.</span>
                 </h1>
                 <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-3xl mb-12 font-medium">
                    High-authority technical documentation, benchmark studies, and strategic whitepapers from the D-Secure Global Research Initiative.
                 </p>
                 
                 <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-emerald-100">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-emerald-100 flex items-center justify-center border border-emerald-50">
                          <Users className="w-6 h-6 text-emerald-600" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Expert Contributors</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Security Units</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-emerald-100 flex items-center justify-center border border-emerald-50">
                          <BookOpen className="w-6 h-6 text-emerald-600" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Technical Library</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">v2.0 2026 Edition</p>
                       </div>
                    </div>
                 </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* Strategic Research Library - Brand Aligned Cards */}
      <section className="py-24 px-6 bg-white relative">
        <div className="container-app">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {researchAssets.map((asset, idx) => (
                <Reveal key={asset.id} delayMs={idx * 100}>
                  <Link 
                    to={asset.link}
                    className="group relative h-full bg-slate-50/50 hover:bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/20 flex flex-col"
                  >
                    <div className="absolute top-10 right-10 flex gap-2">
                      {asset.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white border border-slate-100 text-[8px] font-black uppercase text-slate-500 tracking-wider rounded-lg shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center mb-8 shadow-inner group-hover:border-emerald-100 group-hover:scale-110 transition-transform duration-500`}>
                      <asset.icon className="w-7 h-7 text-emerald-600" />
                    </div>

                    <div className="mb-8">
                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">{asset.category}</p>
                       <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-emerald-800 transition-colors">{asset.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed font-medium">
                          {asset.desc}
                       </p>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600">Access Framework</span>
                       <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-sm group-hover:shadow-lg group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white">
                          <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* Expert Intelligence Quote */}
      <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
         <div className="container-app relative">
            <Reveal>
               <div className="max-w-4xl mx-auto text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-emerald-500/20">
                    <Zap className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight">
                    "Data sanitization is no longer a maintenance task—it is a critical security primitive in the age of global data exposure."
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-emerald-400">
                     <div className="w-10 h-[1px] bg-emerald-500/30"></div>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em]">D-Secure Research Initiative</p>
                     <div className="w-10 h-[1px] bg-emerald-500/30"></div>
                  </div>
               </div>
            </Reveal>
         </div>
      </section>
    </div>
  );
};

export default ResearchHubPage;
