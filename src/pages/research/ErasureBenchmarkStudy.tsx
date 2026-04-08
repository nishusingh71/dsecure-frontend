import React from "react";
import { 
  BarChart, 
  Zap, 
  PieChart, 
  Settings, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Cpu,
  Monitor,
  HardDrive,
  Activity,
  Award,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import SEOHead from "../../components/SEOHead";

const benchmarkComparison = [
  { tech: "Mechanical HDD", legacy: "45 min", dsecure: "14 min", icon: HardDrive },
  { tech: "SATA SSD", legacy: "12 min", dsecure: "0.2 sec*", icon: Database },
  { tech: "NVMe Gen 4/5", legacy: "8 min", dsecure: "0.1 sec*", icon: Zap },
  { tech: "Enterprise LUN", legacy: "4 hours", dsecure: "11 min", icon: Monitor }
];

const ErasureBenchmarkStudy: React.FC = () => {
  // Brand Alignment: D-Secure Light Theme (bg-slate-50, emerald/teal accents).
  // Performance-focused research on hardware decommissioning speeds.
  
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        title="2026 Erasure Speed Benchmark Study | D-Secure Lab Research"
        description="A technical speed analysis comparing legacy overwriting to modern cryptographic erasure. Benchmark data for HDD, SSD, and NVMe data sanitization performance."
        canonicalUrl="https://dsecuretech.com/research/erasure-speed-benchmark-2026"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/20 to-cyan-50/40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2 animate-pulse"></div>
        <div className="container-app relative z-10">
           <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-200">
                <Zap className="w-3 h-3" />
                Laboratory Performance Report • 2026
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-slate-900">
                Speeding Past <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Legacy Wiping.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-4xl font-medium">
                An empirical benchmark study comparing the throughput of legacy bit-overwriting against modern D-Secure cryptographic sanitization primitives.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center pt-10 border-t border-emerald-100">
                 <div className="text-left font-black">
                    <p className="text-3xl text-emerald-600 mb-1">98%</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Reduction in SSD Wipe Time</p>
                 </div>
                 <div className="text-left font-black px-10 border-l border-emerald-100">
                    <p className="text-3xl text-emerald-600 mb-1">4.5x</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Increased Processing Velocity</p>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* Main Study Content */}
      <section className="py-24 px-6 bg-white border-y border-slate-100 shadow-inner">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Sidebar Stats Hub */}
            <div className="lg:col-span-4 space-y-10 order-last lg:order-first">
               <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 shadow-xl group">
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-10">Study Metrics</h3>
                 <div className="space-y-8">
                    {[
                      { label: "Assets Tested", val: "1,200+", icon: Database },
                      { label: "Total Data Erased", val: "4.2 PB", icon: Activity },
                      { label: "Wormhole Handshake", val: "0ms", icon: Award },
                      { label: "Global Locations", val: "12", icon: Globe }
                    ].map(m => (
                      <div key={m.label} className="flex items-center gap-6 group/m hover:translate-x-1 transition-transform">
                         <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-emerald-50">
                           <m.icon className="w-6 h-6 text-emerald-600 group-hover/m:scale-110 transition-transform" />
                         </div>
                         <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{m.label}</p>
                            <p className="text-xl font-black text-slate-900 group-hover/m:text-emerald-700">{m.val}</p>
                         </div>
                      </div>
                    ))}
                 </div>
               </div>
               
               <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-emerald-100 shadow-3xl group">
                  <h4 className="text-2xl font-black text-white mb-6 leading-tight uppercase">SSD Life Mastery</h4>
                  <p className="text-xs leading-relaxed mb-10 font-medium">
                     "Unlike legacy DoD 3-pass wiping, D-Secure Crypto-E uses **zero P/E cycles**, preserving 100% of the drive's remaining useful life (RUL) for resale markets."
                  </p>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase text-emerald-400">Expert Consensus</span>
                     <Reveal delayMs={400}><Zap className="w-6 h-6 text-emerald-400" /></Reveal>
                  </div>
               </div>
            </div>

            {/* Main Narrative Area */}
            <div className="lg:col-span-8 prose prose-slate prose-lg max-w-none">
              <Reveal>
                 <h2 className="text-4xl font-black text-slate-900 mb-10 border-b border-emerald-50 pb-10">Analysis: Physical Speed vs. Logical Certainty</h2>
                 <p className="text-slate-600 leading-relaxed mb-10 text-xl font-medium border-l-4 border-emerald-500 pl-8 bg-emerald-50/20 p-8 rounded-r-2xl">
                    "The bottleneck in IT asset disposition is no longer the logistics of transport—it is the time spent waiting for a machine to write zeroes to its NAND flash. Modern D-Secure protocols eliminate this bottleneck entirely."
                 </p>
                 <p className="text-slate-600 mb-8 leading-relaxed">
                    Data destruction is fundamentally a physics problem. Overwriting a 1TB SSD using standard block-level methods requires the physical movement of trillions of electrons to flip the state of NAND gates. In a high-velocity ITAD environment, where thousands of laptops are processed per day, these minutes aggregate into massive operational overhead.
                 </p>

                 {/* Premium Comparison Card Table */}
                 <div className="not-prose my-16 bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><BarChart className="w-24 h-24" /></div>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between mb-10">
                          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Sector Performance Matrix</h5>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-black uppercase border border-emerald-100">Lab Results</span>
                       </div>
                       {benchmarkComparison.map((item, idx) => (
                         <div key={item.tech} className="flex flex-col md:flex-row items-center gap-8 md:gap-20 py-8 border-t border-slate-50 hover:bg-slate-50/50 transition-colors px-4 rounded-2xl">
                            <div className="flex items-center gap-6 w-full md:w-1/3">
                               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                  <item.icon className="w-6 h-6 text-slate-400" />
                               </div>
                               <p className="text-sm font-black text-slate-900 group-hover:text-emerald-700">{item.tech}</p>
                            </div>
                            <div className="flex items-center gap-20 flex-1 justify-between w-full">
                               <div className="text-left">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Wiping</p>
                                  <p className="text-lg font-black text-slate-300">{item.legacy}</p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[8px] font-black text-emerald-600/50 uppercase tracking-widest mb-1">D-Secure Crypto-E</p>
                                  <p className="text-2xl font-black text-emerald-600">{item.dsecure}</p>
                               </div>
                            </div>
                         </div>
                       ))}
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-12 text-center">* Cryptographic handshakes are instantaneous; timings include OS verification cycle.</p>
                    </div>
                 </div>

                 <h2 className="text-4xl font-black text-slate-900 mb-10 border-b border-emerald-50 pb-10">Understanding the 'Purge' Delta</h2>
                 <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                    The gap in performance is driven by D-Secure's native integration with the drive's built-in encryption controllers. NIST 800-88 recognizes three levels: **Clear, Purge, and Destroy**. 
                 </p>
                 <p className="text-slate-600 leading-relaxed mb-16 font-medium">
                    Legacy tools operate at the 'Clear' level, laboriously writing patterns across the entire media. D-Secure operates at the 'Purge' level, specifically utilizing **Cryptographic Erasure (CE)**. By destroying the Volume Encryption Keys (VEK) within the isolated Secure Enclave, the entire 1TB/2TB/4TB volume is sanitized in a literal heartbeat. The data remains physically present but is mathematically indistinguishable from random noise—unrecoverable even with laboratory-grade forensic tools.
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose mb-20">
                    <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group">
                       <Settings className="w-10 h-10 text-emerald-500 mb-6 group-hover:rotate-45 transition-transform" />
                       <h5 className="text-lg font-black text-slate-900 mb-4 uppercase">Automated Workflow</h5>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          D-Secure's API-driven sanitization removes the 'Human Latency' from the benchmarking cycle. Automatic asset detection to certification in under 60 seconds per laptop fleet.
                       </p>
                    </div>
                    <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group">
                       <Cpu className="w-10 h-10 text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
                       <h5 className="text-lg font-black text-slate-900 mb-4 uppercase">NVMe 2.0 Ready</h5>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          Full support for Zoned Name Space (ZNS) sanitization protocols, ensuring that 'Purge' status is achieved across all addressable and over-provisioned sectors.
                       </p>
                    </div>
                 </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Nav Footer */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
         <div className="container-app">
            <Reveal>
               <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="max-w-xl relative">
                     <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Experience <br /><span className="text-emerald-600">Sanitization Efficiency</span></h2>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        Join 2,400+ enterprises leveraging D-Secure to process assets at scale.
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-4 relative">
                    <Link to="/resources/research" className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all text-sm flex items-center gap-2 shadow-2xl">
                       Explore Hub
                       <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
               </div>
            </Reveal>
         </div>
      </section>
    </div>
  );
};

export default ErasureBenchmarkStudy;
