import React, { useState } from "react";
import { 
  ShieldCheck, 
  Key, 
  Eye, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  AlertTriangle,
  Layers,
  Settings,
  Lock,
  Zap,
  Activity,
  Globe,
  Database,
  Cpu,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import Reveal from "../../components/Reveal";
import { useFormSubmission } from "../../hooks/useFormSubmission";

const zeroTrustChapters = [
  { id: "intro", title: "Conceptual Foundation", icon: Layers, summary: "Defining the requirement for Zero-Trust at the data-lifecycle edge." },
  { id: "paradigm", title: "The Trust Paradox", icon: ShieldCheck, summary: "Why perimeter-based security fails during asset decommissioning." },
  { id: "sanitization", title: "Continuous Verification", icon: Settings, summary: "Moving to a model of perpetual, bit-level sanitization auditing." },
  { id: "governance", title: "Hardware-Bound Telemetry", icon: Key, summary: "Anchoring digital trust in immutable hardware-level signatures." },
  { id: "implementation", title: "Architecture Blueprint", icon: Eye, summary: "Step-by-step integration of D-Secure into Enterprise ZTAs." }
];

const ZeroTrustSanitization: React.FC = () => {
  // Brand Alignment: D-Secure Light Theme (white/slate-50).
  // Premium Layout: Left-sidebar chapter navigation with deep-dive technical content.
  
  const [activeChapter, setActiveChapter] = useState("intro");
  const [isSuccess, setIsSuccess] = useState(false);
  const { submitForm, isSubmitting } = useFormSubmission({
    requiredFields: ["email"]
  });

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({
      email,
      formType: "Zero-Trust Whitepaper Download",
      subject: "New Framework Technical Access"
    });
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <style>{`
        .chapter-active {
          background: #f0fdf4;
          border-left: 4px solid #059669;
          box-shadow: 10px 0 20px -5px rgba(5,150,105,0.05);
        }
      `}</style>
      <SEOHead 
        title="Zero-Trust Data Sanitization Framework | D-Secure Research"
        description="Integrating verifiable media sanitization into a modern Zero-Trust Architecture (ZTA). Technical whitepaper on hardware-bound telemetry and cryptographic trust."
        canonicalUrl="https://dsecuretech.com/research/zero-trust-sanitization-framework"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/20 to-cyan-50/40 -z-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[100px] -z-10"></div>
        <div className="container-app relative z-10">
           <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-[0.25em] mb-10 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                D-Secure Laboratories • Security Whitepaper Series
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-slate-900 uppercase">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">Zero-Trust Sanitization</span>
              </h1>
              <p className="text-slate-600 text-xl md:text-2xl leading-relaxed mb-12 max-w-4xl font-medium">
                Establishing verifiable digital certainty at the hardware decommissioning edge through automated, hardware-bound cryptographic primitives.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-emerald-100">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-md">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 55}`} alt="Contributor" className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
                 <div className="text-left py-2 border-l border-slate-200 pl-8 font-black">
                    <p className="text-slate-900 text-sm">Expert Peer Review Committee</p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-none">Global Security Research Unit</p>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* Main Framework Explorer */}
      <section className="py-24 px-6 bg-white border-y border-slate-100 shadow-inner min-h-[1000px]">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Sidebar Navigation - Light Mode */}
            <div className="lg:col-span-4 space-y-10 sticky top-32">
              <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 px-8 py-10 opacity-5 group-hover:opacity-10 transition-opacity"><BookOpen className="w-24 h-24" /></div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 relative">Framework Contents</h3>
                <div className="space-y-4 relative">
                  {zeroTrustChapters.map(chapter => (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapter(chapter.id)}
                      className={`w-full text-left p-6 rounded-3xl flex items-start gap-6 transition-all duration-300 group ${
                        activeChapter === chapter.id 
                        ? "chapter-active" 
                        : "hover:bg-emerald-50/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        activeChapter === chapter.id 
                        ? "bg-white border-emerald-200 text-emerald-600 shadow-md" 
                        : "bg-white border-slate-100 text-slate-400 group-hover:text-emerald-500"
                      }`}>
                        <chapter.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <p className={`text-sm font-black tracking-wide mb-1 ${activeChapter === chapter.id ? "text-emerald-900" : "text-slate-500 group-hover:text-slate-900"}`}>{chapter.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{chapter.summary}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-12 text-white shadow-3xl shadow-emerald-200 group relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-10 opacity-10 group-hover:rotate-12 transition-transform"><Download className="w-24 h-24" /></div>
                 <h4 className="text-3xl font-black mb-6 relative z-10 leading-tight">Download the <br /> Technical Blueprint</h4>
                 <p className="text-emerald-50 text-sm mb-10 relative z-10 font-medium italic opacity-80">
                   Includes architecture diagrams, bit-level API integration hooks, and CIS benchmark audit rules.
                 </p>
                 {isSuccess ? (
                   <div className="p-8 bg-white/20 rounded-[2rem] text-white font-black text-center backdrop-blur-md flex flex-col items-center gap-4 border border-white/30">
                     <CheckCircle2 className="w-12 h-12" />
                     Whitepaper Sent!
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                      <input 
                        required
                        type="email"
                        placeholder="Enterprise Email"
                        className="w-full px-6 py-4 bg-white/10 border border-white/30 text-white rounded-2xl outline-none focus:ring-2 focus:ring-white transition-all text-sm placeholder:text-white/50 font-black tracking-wide"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-white text-emerald-950 font-black rounded-2xl hover:bg-emerald-50 transition-all text-sm shadow-xl active:scale-95"
                      >
                         {isSubmitting ? 'Authenticating...' : 'Download Blueprint v2.0'}
                      </button>
                   </form>
                 )}
              </div>
            </div>

            {/* Content Area - Detailed Whitepaper Flow */}
            <div className="lg:col-span-8">
               <Reveal key={activeChapter}>
                  {activeChapter === 'intro' && (
                    <div className="prose prose-slate prose-lg max-w-none">
                      <h2 className="text-4xl font-black text-slate-900 border-b border-slate-100 pb-10 mb-12">1. The Sanitization Trust Gap</h2>
                      <p className="text-slate-600 text-xl leading-relaxed font-medium border-l-4 border-emerald-500 pl-10 mb-16 bg-emerald-50/50 p-10 rounded-r-3xl shadow-inner">
                        "Traditional IT Asset Disposition (ITAD) relies on extrinsic trust—trusting a third party, trusting a report, or trusting a process. In a Zero-Trust world, Trust is a Vulnerability."
                      </p>
                      <p className="text-slate-600 mb-10 leading-relaxed">
                        The core objective of Zero Trust Architecture (ZTA) is: **"Never Trust, Always Verify."** While organizations have applied this to network traffic and user identity, the "Sanitization Edge"—where hardware leaves production environments—remains a critical blind spot in modern security perimeters.
                      </p>
                      <p className="text-slate-600 leading-relaxed mb-16">
                        D-Secure's 2026 Framework defines a new paradigm: **The Zero-Trust Sanitization Model**. This model shifts the focus from "process-based trust" (following a manual checklist) to "evidence-based certainty" (automated, hardware-bound cryptographic proof).
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20 not-prose">
                         {[
                           { label: "Verifiable", val: "100%", icon: Activity, sub: "Bit-Level Proof" },
                           { label: "Automated", val: "0min", icon: Zap, sub: "Human-Free Trigger" },
                           { label: "Immutable", val: "∞", icon: Lock, sub: "Cert-Chain Proven" }
                         ].map(stat => (
                           <div key={stat.label} className="p-8 bg-slate-50 border border-slate-100 rounded-3xl text-center group hover:bg-white hover:shadow-2xl transition-all">
                              <stat.icon className="w-8 h-8 text-emerald-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                              <p className="text-3xl font-black text-slate-900 mb-2">{stat.val}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                              <p className="text-[9px] text-emerald-700 font-black mt-2">{stat.sub}</p>
                           </div>
                         ))}
                      </div>
                    </div>
                  )}

                  {activeChapter === 'paradigm' && (
                    <div className="prose prose-slate prose-lg max-w-none">
                       <h2 className="text-4xl font-black text-slate-900 border-b border-slate-100 pb-10 mb-12">2. Shifting the Sanitization Paradigm</h2>
                       <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                          Enterprise security leaders must abandon the belief that a partner's signature is sufficient proof of data destruction. In the age of AI-driven forensic recovery, only hardware-originated telemetry provides the requisite level of data certainty.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose mb-20">
                          <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><AlertTriangle className="w-16 h-16 text-orange-500" /></div>
                             <h4 className="text-xl font-black text-orange-600 mb-6 uppercase tracking-wider">Legacy: Reactive Trust</h4>
                             <ul className="space-y-4 text-sm text-slate-500 font-bold">
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-200" /> Batch-level reporting</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-200" /> Manual asset scanning</li>
                                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-200" /> Paper-based certificates</li>
                             </ul>
                          </div>
                          <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100 relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck className="w-16 h-16 text-emerald-600" /></div>
                             <h4 className="text-xl font-black text-emerald-700 mb-6 uppercase tracking-wider">ZTA: Proactive Cert</h4>
                             <ul className="space-y-4 text-sm text-emerald-900 font-bold">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> UUID-bound telemetry</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> API-triggered destruction</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cryptographic Proof</li>
                             </ul>
                          </div>
                       </div>
                       <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-10 font-medium">
                          Note: The Zero-Trust model treats the hardware decommissioning agent as an unauthenticated actor until a verifiable cryptographic handshake is completed.
                       </p>
                    </div>
                  )}

                  {activeChapter === 'sanitization' && (
                    <div className="prose prose-slate prose-lg max-w-none">
                       <h2 className="text-4xl font-black text-slate-900 border-b border-slate-100 pb-10 mb-12">3. The Continuous Verification Engine</h2>
                       <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                         Sanitization must evolve from a scheduled "maintenance task" into a policy-driven "security event". D-Secure's Continuous Verification Engine (CVE) ensures that every asset remains in a non-compliant state until a successful sanitization handshake is broadcast across the security fabric.
                       </p>
                       <div className="bg-slate-50 p-12 rounded-[3.5rem] not-prose border border-slate-100 shadow-inner group">
                          <div className="flex items-center gap-4 mb-12">
                             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                               <Settings className="w-5 h-5 text-white" />
                             </div>
                             <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">ZT-Pipeline Architecture v2.0</span>
                          </div>
                          <div className="space-y-8">
                             {[
                               { l: "Phase 1: Discovery", d: "Automatic identification via hardware-bound unique identifier (UUID)." },
                               { l: "Phase 2: Authentication", d: "Cryptographic challenge to verify local controller integrity." },
                               { l: "Phase 3: Execution", d: "NIST 800-88 Purge via native firmware commands." },
                               { l: "Phase 4: Audit Extraction", d: "Collection of post-erasure entropy data for verification." },
                               { l: "Phase 5: Cert Generation", d: "Signing of tamper-proof Erasure Certificate via D-Secure Vault." }
                             ].map((item, idx) => (
                               <div key={item.l} className="flex gap-10 group/item hover:translate-x-2 transition-transform">
                                  <div className="text-emerald-500 font-black text-xs pt-1 opacity-50">0{idx+1}</div>
                                  <div>
                                     <div className="text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] mb-2">{item.l}</div>
                                     <div className="text-xs text-slate-500 font-bold leading-relaxed">{item.d}</div>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {activeChapter === 'governance' && (
                    <div className="prose prose-slate prose-lg max-w-none">
                       <h2 className="text-4xl font-black text-slate-900 border-b border-slate-100 pb-10 mb-12">4. Securing the Chain of Custody</h2>
                       <p className="text-slate-600 text-lg leading-relaxed mb-10">
                         In a Zero-Trust environment, the Proof of Erasure (POE) is the definitive trust signal. D-Secure anchors this signal in hardware-bound telemetry—metadata generated by the drive's own controller at the moment of bit-destruction.
                       </p>
                       <p className="text-slate-600 leading-relaxed mb-16">
                         By integrating these certificates into a centralized Governance Registry, organizations can automate the "Release from Asset Inventory" protocol. This ensures that no asset is marked as retired without an accompanying, verifiable erasure signature.
                       </p>
                       <div className="bg-slate-50 border border-slate-100 p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-12 shadow-2xl not-prose relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] group-hover:scale-150 transition-transform"></div>
                          <div className="flex-1">
                             <h5 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Immutable Auditability</h5>
                             <p className="text-xs text-slate-500 leading-relaxed font-bold">D-Secure Erasure Certificates utilize SHA-256 hashing to bundle asset metadata with technician signatures and lab verification codes, creating a tamper-evident compliance artifact.</p>
                             <div className="mt-8 flex gap-4">
                                <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">Audit Ready</div>
                                <div className="px-4 py-2 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-200">ISO 27001</div>
                             </div>
                          </div>
                          <div className="w-full md:w-1/3 aspect-square bg-white rounded-3xl p-10 flex items-center justify-center border border-slate-100 shadow-xl relative">
                             <Key className="w-20 h-20 text-emerald-600 group-hover:scale-110 transition-transform" />
                          </div>
                       </div>
                    </div>
                  )}

                  {activeChapter === 'implementation' && (
                    <div className="prose prose-slate prose-lg max-w-none">
                       <h2 className="text-4xl font-black text-slate-900 border-b border-slate-100 pb-10 mb-12">5. Strategic Implementation Roadmap</h2>
                       <p className="text-slate-600 text-lg leading-relaxed mb-16 font-medium italic">
                         Implementing Zero-Trust Sanitization is a progressive journey from "Visible Asset Management" to "Autonomous Security Infrastructure".
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-20">
                          {[
                            { title: "Standardisation", d: "Standardize on NIST 800-88 Purge across all hardware vendors.", icon: Settings },
                            { title: "API Fabric", d: "Integrate D-Secure into ServiceNow or Jira for automated work-orders.", icon: Activity },
                            { title: "Key Management", d: "Enable Cryptographic Erasure for all NVMe storage nodes.", icon: Lock },
                            { title: "Final Reporting", d: "Deploy Unified Compliance Dashboards for global asset visibility.", icon: Globe }
                          ].map(card => (
                            <div key={card.title} className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-2xl transition-all flex gap-6">
                               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-50">
                                 <card.icon className="w-6 h-6 text-emerald-600" />
                               </div>
                               <div>
                                  <h6 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-2">{card.title}</h6>
                                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{card.d}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                       <div className="text-center bg-emerald-700 rounded-[3.5rem] p-16 not-prose shadow-3xl shadow-emerald-200">
                          <h4 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Ready to Architect?</h4>
                          <p className="text-emerald-50 mb-10 max-w-xl mx-auto font-bold opacity-80 uppercase tracking-widest text-[10px]">Access the D-Secure lab's complete 2026 technical deployment guide.</p>
                          <a href="#whitepaper-download" className="px-10 py-5 bg-white text-emerald-950 font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 mx-auto w-fit shadow-2xl">
                             Request Blueprint v2.0
                             <ArrowRight className="w-5 h-5" />
                          </a>
                       </div>
                    </div>
                  )}
               </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Hub Footer */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="container-app relative z-10">
           <Reveal>
             <div className="max-w-4xl mx-auto text-center">
                <div className="w-20 h-20 bg-white text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-emerald-100 shadow-xl">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 leading-tight uppercase tracking-tighter">
                  Digital Certainty <br />
                  <span className="text-emerald-700">Starts at the Edge.</span>
                </h2>
                <Link to="/resources/research" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-emerald-600 transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Return to Hub
                </Link>
             </div>
           </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ZeroTrustSanitization;
