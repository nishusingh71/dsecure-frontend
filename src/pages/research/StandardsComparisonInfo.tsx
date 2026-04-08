import React from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import Reveal from "../../components/Reveal";

const StandardsComparisonInfo: React.FC = () => {
  // Brand Alignment: D-Secure Light Theme (bg-slate-50, emerald/teal accents).
  // Technical comparison for NIST, IEEE, and DoD standards.
  
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        title="NIST 800-88 vs. IEEE 2883-2022 | Media Sanitization Standard Comparison"
        description="A technical comparison of dominant global data destruction standards. Deep-dive into Clear, Purge, and Destroy guidelines for HDD, SSD, and NVMe media."
        canonicalUrl="https://dsecuretech.com/research/media-sanitization-comparison-2026"
      />

      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/20 to-cyan-50/40 -z-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="container-app relative z-10">
           <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Compliance Framework • 2026 Edition
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-slate-900">
                Media Sanitization <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Standards Matrix.</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-4xl font-medium">
                The definitive technical guide for ITAD managers and CISOs navigating the intersection of NIST 800-88, IEEE 2883-2022, and legacy DoD 5220.22-M frameworks.
              </p>
              
              {/* Standards Badges Hub */}
              <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-emerald-100">
                {["NIST 800-88", "IEEE 2883-2022", "DoD 5220.22-M", "BSI/HMG", "ISO 27001"].map(s => (
                  <div key={s} className="px-5 py-2 bg-white rounded-xl shadow-sm border border-slate-100 text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    {s}
                  </div>
                ))}
              </div>
           </Reveal>
        </div>
      </section>

      {/* Master Comparison Matrix */}
      <section className="py-24 px-6 bg-white border-y border-slate-100 shadow-inner">
        <div className="container-app">
          <Reveal>
             <div className="mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-6">Technical Alignment Scorecard</h2>
                <p className="text-slate-500 max-w-3xl font-medium leading-relaxed">
                   How each standard approaches the three core levels of media sanitization: Clear, Purge, and Destroy. D-Secure prioritizes 'Purge' as the modern benchmark for non-volatile media.
                </p>
             </div>
             
             <div className="overflow-x-auto rounded-[2.5rem] border border-slate-100 shadow-3xl">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-8 px-10 text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 w-1/4">Sanitization Level</th>
                      <th className="py-8 px-10 text-xs font-black uppercase text-slate-900 tracking-widest border-b border-slate-100">NIST 800-88 Rev. 1</th>
                      <th className="py-8 px-10 text-xs font-black uppercase text-slate-900 tracking-widest border-b border-slate-100">IEEE 2883-2022</th>
                      <th className="py-8 px-10 text-xs font-black uppercase text-slate-900 tracking-widest border-b border-slate-100">Legacy DoD 5220.22</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                       <td className="py-10 px-10 border-r border-slate-50">
                          <p className="text-xl font-black text-slate-900 mb-2">CLEAR</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Base Level Overwrite</p>
                       </td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Software-based overwriting of all user-addressable storage locations. Protects against simple non-invasive recovery.</td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Logical sanitization utilizing controller commands to overwrite user data. Targeted at low-sensitivity assets.</td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Three-pass pseudorandom overwrite (0x00, 0xFF, Random). Not recommended for modern SSD/NVMe.</td>
                    </tr>
                    <tr className="bg-emerald-50/20">
                       <td className="py-10 px-10 border-r border-emerald-50">
                          <p className="text-xl font-black text-emerald-700 mb-2">PURGE</p>
                          <p className="text-[10px] text-emerald-600/60 font-black uppercase tracking-widest">Enterprise Benchmark</p>
                       </td>
                       <td className="py-10 px-10 text-slate-600 font-bold leading-relaxed px-10 border-r border-emerald-50/50">Utilizes internal drive commands (Crypto Erase/Block Erase) to make data recovery infeasible even with laboratory tools.</td>
                       <td className="py-10 px-10 text-slate-600 font-bold leading-relaxed px-10 border-r border-emerald-50/50">Advanced cryptographic and firmware-level destruction. Mandatory for SSD/NVMe and high-density magnetic media.</td>
                       <td className="py-10 px-10 text-slate-400 font-medium">Standard not defined for SSD architectures. Recommends physical destruction.</td>
                    </tr>
                    <tr>
                       <td className="py-10 px-10 border-r border-slate-50">
                          <p className="text-xl font-black text-slate-900 mb-2">DESTROY</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Physical End-of-Life</p>
                       </td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Phisical shredding to particles &lt; 2mm. Required for damaged or un-clearable media.</td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Incineration, disintegration, or shredding beyond any potential state-level reconstruction.</td>
                       <td className="py-10 px-10 text-slate-500 font-medium leading-relaxed">Standardized physical destruction via approved industrial degaussers or shredders.</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </Reveal>
        </div>
      </section>

      {/* Deep-Dive Technical Content */}
      <section className="py-24 px-6 bg-white">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <Reveal>
                <div className="prose prose-slate prose-lg max-w-none">
                   <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-12">The Shift from NIST to IEEE 2883-2022</h2>
                   <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 border-l-4 border-emerald-500 pl-8 bg-emerald-50/30 p-8 rounded-r-3xl">
                      "While NIST 800-88 Rev 1. has been the bedrock of US compliance for a decade, the new IEEE 2883-2022 standard provides the granularity needed for modern cloud-scale NVMe and HBM architectures."
                   </p>
                   <p className="text-slate-600 leading-relaxed mb-8">
                      Modern solid-state storage presents a unique challenge: the existence of **Over-Provisioned (OP) sectors** and **Flash Translation Layers (FTL)**. In legacy NIST Clear (overwrite) scenarios, software-level tools cannot reliably address the data hidden behind the FTL.
                   </p>
                   <p className="text-slate-600 leading-relaxed mb-16">
                      IEEE 2883-2022 solves this by mandating 'Storage Sanitization Commands'—instructions sent directly to the device controller. D-Secure's 2026 framework bridges these two standards, ensuring that a 'NIST Purge' also satisfies the 'IEEE Purge' requirement through identical cryptographic primitives.
                   </p>
                   
                   <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 shadow-inner group">
                      <div className="flex items-center gap-4 mb-8">
                         <Search className="w-8 h-8 text-emerald-500" />
                         <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Compliance Audit Checklist</span>
                      </div>
                      <ul className="space-y-6 text-slate-500 text-sm font-bold">
                         <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Verify Drive Controller Identity (UUID)</li>
                         <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Issue Firmware-Native Purge Instruction</li>
                         <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Statistical Post-Erasure Entropy Verification</li>
                         <li className="flex items-center gap-4 group-hover:translate-x-2 transition-transform"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Timestamped, Cryptographically Signed Certification</li>
                      </ul>
                   </div>
                </div>
             </Reveal>

             <Reveal delayMs={200}>
                <div className="flex flex-col gap-8">
                  <div className="bg-emerald-900 rounded-[3.5rem] p-12 text-white shadow-3xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ShieldCheck className="w-32 h-32" />
                     </div>
                     <h3 className="text-3xl font-black mb-8 uppercase tracking-wide leading-tight">Regulatory <br /> Adherence v2.0</h3>
                     <p className="text-emerald-100/70 text-sm leading-relaxed font-medium mb-10">
                        Access our pre-mapped regulatory landscape for GDPR Article 17, HIPAA Security Rule §164.310, and California CCPA guidelines.
                     </p>
                     <button className="px-8 py-4 bg-white text-emerald-900 font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 shadow-xl">
                        View Compliance Map
                        <ArrowRight className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl">
                     <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-8">
                        <AlertTriangle className="w-8 h-8 text-orange-500" />
                     </div>
                     <h4 className="text-2xl font-black text-slate-900 mb-4 uppercase">The "Delete" Myth</h4>
                     <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                        Standard OS-level formatting or file deletion only removes the pointer to the data, not the data itself. D-Secure's laboratory tests prove that 99% of data remains recoverable after a standard Windows/macOS format.
                     </p>
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black overflow-hidden grayscale">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 10}`} alt="Expert" className="w-full h-full object-cover" />
                          </div>
                        ))}
                     </div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Reviewed by 12 Global Sec-Ops Leads</p>
                  </div>
                </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* Lab Nav Footer */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
         <div className="container-app">
            <Reveal>
               <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
                  <div className="max-w-xl">
                     <h2 className="text-3xl font-black text-slate-900 mb-6">Continue Your <br /><span className="text-emerald-600">Research Journey</span></h2>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        Explore more technical studies from the D-Secure Research Lab.
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/research/state-of-data-destruction-2026" className="px-8 py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all text-sm flex items-center gap-2">
                       2026 Report
                       <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/resources/research" className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all text-sm flex items-center gap-2 shadow-lg shadow-emerald-100">
                       Research Hub
                    </Link>
                  </div>
               </div>
            </Reveal>
         </div>
      </section>
    </div>
  );
};

export default StandardsComparisonInfo;
