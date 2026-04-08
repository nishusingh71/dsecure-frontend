import React, { useState } from "react";
import { SEOHead } from "../../components/SEOHead";
import { Link } from "react-router-dom";
import { AlertTriangle, HardDrive, Smartphone, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { useFormSubmission } from "../../hooks/useFormSubmission";

type MediaType = "hdd" | "ssd" | "mobile" | "nvme" | null;
type Sensitivity = "public" | "internal" | "confidential" | "top_secret" | null;

interface Recommendation {
  action: "Clear" | "Purge" | "Destroy";
  description: string;
  solution: string;
  link: string;
}

export default function NIST80088CheckerPage() {
  const [step, setStep] = useState<number>(1);
  const [mediaType, setMediaType] = useState<MediaType>(null);
  const [sensitivity, setSensitivity] = useState<Sensitivity>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const { isSubmitting, submitForm } = useFormSubmission({
    requiredFields: ["email"],
  });

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const recommendation = getRecommendation();
    await submitForm({
      email,
      mediaType: mediaType || "",
      sensitivity: sensitivity || "",
      requiredAction: recommendation.action,
      formType: "NIST 800-88 Audit Report Request",
      subject: `New Request: NIST Compliance Report for ${mediaType}`
    });

    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 4000);
  };

  const getRecommendation = (): Recommendation => {
    if (sensitivity === "top_secret") {
      return {
        action: "Destroy",
        description: "Physical destruction is strictly required for Top Secret level data on any media.",
        solution: "D-Secure ITAD & Physical Destruction Services",
        link: "/solutions/itad",
      };
    }
    
    if (sensitivity === "confidential") {
       if (mediaType === "ssd" || mediaType === "nvme" || mediaType === "mobile") {
         return {
           action: "Purge",
           description: "Advanced cryptographic erasure or block-level purge is required for high-density flash media.",
           solution: "D-Secure Drive Eraser (Advanced Algorithm)",
           link: "/products/drive-eraser",
         };
       }
       return {
         action: "Clear",
         description: "A standard cryptographic overwrite (Clear) is acceptable, but Purge is highly recommended.",
         solution: "D-Secure Drive Eraser",
         link: "/products/drive-eraser",
       };
    }

    // Default for Public / Internal
    if (mediaType === "mobile") {
       return {
         action: "Purge",
         description: "Factory reset is NOT enough. Cryptographic purge is required for mobile devices even for internal data.",
         solution: "D-Secure Smartphone Eraser",
         link: "/products/smartphone-eraser",
       };
    }

    return {
      action: "Clear",
      description: "Standard software overwrite (Clear) is acceptable for this level of data sensitivity.",
      solution: "D-Secure File Eraser",
      link: "/products/file-eraser",
    };
  };

  const handleNext = () => {
    if (step === 1 && mediaType) setStep(2);
    if (step === 2 && sensitivity) setStep(3);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="NIST 800-88 Compliance Checker | D-Secure Free Tool"
        description="Free interactive NIST 800-88 compliance checker. Determine whether you need to Clear, Purge, or Destroy your data storage media based on official NIST guidelines."
        canonicalUrl="https://dsecuretech.com/tools/nist-800-88-compliance-checker"
      />

      {/* Dark Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 skew-x-12 translate-x-1/2" />
        <div className="container-app relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 tracking-wide uppercase">
               Free Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              NIST 800-88 <span className="text-emerald-500">Compliance Checker</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Find out exactly what data destruction method your media requires to meet federal standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main App Container */}
      <main className="py-16 md:py-24">
        <div className="container-app">
          {/* Wizard Container */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-10 relative">
              <div className="w-full absolute top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full z-0">
                 <div 
                   className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                   style={{ width: ['33%', '66%', '100%'][step - 1] || '0%' }}
                 />
              </div>
              {[1, 2, 3].map((num) => (
                <div 
                  key={num} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg z-10 transition-all duration-300 shadow-sm ${
                    step > num 
                      ? 'bg-emerald-600 text-white ring-4 ring-white' 
                      : step === num 
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-slate-100 text-slate-400 border-2 border-slate-200 ring-4 ring-white'
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
                </div>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">What type of media are you erasing?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "hdd", icon: HardDrive, label: "Hard Disk Drive (HDD)" },
                    { id: "ssd", icon: HardDrive, label: "Solid State Drive (SSD)" },
                    { id: "nvme", icon: HardDrive, label: "NVMe / M.2 Drive" },
                    { id: "mobile", icon: Smartphone, label: "Smartphone / Tablet" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setMediaType(item.id as MediaType)}
                      className={`p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border-2 text-center ${
                        mediaType === item.id 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-slate-50 hover:shadow-sm'
                      }`}
                    >
                      <item.icon className="w-10 h-10" />
                      <span className="font-bold text-lg">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-end">
                  <button 
                    disabled={!mediaType}
                    onClick={handleNext}
                    className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-extrabold flex items-center justify-center w-full sm:w-auto gap-2 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    Next Step <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">What is the data sensitivity level?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "public", label: "Public / No Risks", desc: "Data is publicly available." },
                    { id: "internal", label: "Internal Data", desc: "Proprietary but unclassified." },
                    { id: "confidential", label: "Confidential / PII", desc: "Contains PII, HIPAA, or financial data." },
                    { id: "top_secret", label: "Classified / Secret", desc: "National security or critical trade secrets." },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSensitivity(item.id as Sensitivity)}
                      className={`p-6 rounded-2xl flex flex-col items-start gap-2 transition-all text-left duration-300 border-2 ${
                        sensitivity === item.id 
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 hover:shadow-sm'
                      }`}
                    >
                      <span className={`font-bold text-lg ${sensitivity === item.id ? 'text-emerald-700' : 'text-slate-900'}`}>{item.label}</span>
                      <span className={`text-sm font-medium ${sensitivity === item.id ? 'text-emerald-600/80' : 'text-slate-500'}`}>{item.desc}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-8 py-4 text-slate-600 border border-slate-200 bg-white rounded-xl font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors order-2 sm:order-1"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!sensitivity}
                    onClick={handleNext}
                    className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-extrabold flex items-center justify-center gap-2 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none order-1 sm:order-2"
                  >
                    Get Result <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - RESULT */}
            {step === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 mb-8 ${
                  getRecommendation().action === "Destroy" 
                    ? "bg-rose-50 border-rose-100" 
                    : "bg-emerald-50 border-emerald-100"
                }`}>
                  {getRecommendation().action === "Destroy" ? (
                    <AlertTriangle className="w-12 h-12 text-rose-600" />
                  ) : (
                    <Shield className="w-12 h-12 text-emerald-600" />
                  )}
                </div>
                
                <h2 className="text-sm font-extrabold text-slate-500 mb-2 uppercase tracking-widest">Required Action:</h2>
                <div className={`text-5xl md:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent mb-8 drop-shadow-sm ${
                  getRecommendation().action === "Destroy" 
                    ? "bg-gradient-to-r from-rose-600 to-red-500" 
                    : "bg-gradient-to-r from-emerald-600 to-teal-500"
                }`}>
                  {getRecommendation().action}
                </div>
                
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 max-w-lg mx-auto mb-10 shadow-sm">
                  <p className="text-lg font-medium text-slate-700 mb-6 leading-relaxed">
                    {getRecommendation().description}
                  </p>
                  <div className="pt-6 border-t border-slate-200 flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended D-Secure Solution</span>
                    <Link 
                      to={getRecommendation().link}
                      className="inline-flex items-center gap-2 font-bold text-lg text-emerald-600 hover:text-emerald-700 transition-colors group"
                    >
                      {getRecommendation().solution}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Lead Capture form hint */}
                <form onSubmit={handleDownload} className="p-6 md:p-8 border border-emerald-100 bg-white rounded-2xl max-w-lg mx-auto shadow-xl shadow-emerald-900/5 mt-8">
                  <h3 className="font-extrabold text-slate-900 mb-2 text-xl">Want a formal audit report?</h3>
                  <p className="text-sm font-medium text-slate-500 mb-6">Download a full compliance breakdown for your IT team.</p>
                  
                  {status === "success" ? (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl font-bold border border-emerald-200 text-center animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                      Request sent successfully! Our team will contact you shortly.
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your work email"
                        aria-label="Your work email"
                        required
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 placeholder-slate-400 font-medium" 
                      />
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 uppercase tracking-wide text-sm whitespace-nowrap disabled:opacity-75 disabled:cursor-wait"
                      >
                        {isSubmitting ? "Sending..." : "Download"}
                      </button>
                    </div>
                  )}
                </form>

                <div className="mt-10">
                   <button 
                     onClick={() => { setStep(1); setMediaType(null); setSensitivity(null); }} 
                     className="text-slate-500 hover:text-slate-900 font-bold underline decoration-slate-300 underline-offset-4 text-sm transition-colors"
                   >
                     Start Over
                   </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}
