import React, { useState } from "react";
import { SEOHead } from "../../components/SEOHead";
import { Calculator, ShieldAlert, TrendingUp, CheckCircle2 } from "lucide-react";
import { useFormSubmission } from "../../hooks/useFormSubmission";

type Industry = "healthcare" | "financial" | "tech" | "public" | "retail" | "other";

export default function DataBreachCalculatorPage() {
  const [industry, setIndustry] = useState<Industry>("financial");
  const [records, setRecords] = useState<number>(50000);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const { isSubmitting, submitForm } = useFormSubmission({
    requiredFields: ["email"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await submitForm({
      email,
      industry,
      exposedRecords: records,
      estimatedExposureCost: calculateCost(),
      formType: "Data Breach ROI Analysis Request",
      subject: `New Request: ROI Analysis for ${industry} (${records} records)`
    });
    
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 4000);
  };

  const industryData: Record<Industry, { label: string; costPerRecord: number; baseCost: number }> = {
    healthcare: { label: "Healthcare & Pharma", costPerRecord: 176, baseCost: 1500000 },
    financial: { label: "Banking & Financial", costPerRecord: 164, baseCost: 1200000 },
    tech: { label: "Technology & Software", costPerRecord: 145, baseCost: 1000000 },
    public: { label: "Public Sector", costPerRecord: 130, baseCost: 800000 },
    retail: { label: "Retail & E-commerce", costPerRecord: 125, baseCost: 600000 },
    other: { label: "Other Industries", costPerRecord: 110, baseCost: 500000 },
  };

  const calculateCost = () => {
    const selected = industryData[industry];
    return selected.baseCost + (records * selected.costPerRecord);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const currentCost = calculateCost();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Data Breach Cost Calculator | D-Secure Free Tool"
        description="Estimate the financial impact of a data breach based on your industry and data volume. Industry-average cost estimator for uncertified data erasure."
        canonicalUrl="https://dsecuretech.com/tools/data-breach-calculator"
      />

      {/* Dark Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 skew-x-12 translate-x-1/2" />
        <div className="container-app relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 tracking-wide uppercase">
              Free Estimator Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Data Breach <span className="text-emerald-500">Cost Calculator</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Discover your potential financial exposure if end-of-life IT assets are disposed of without certified data erasure. 
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive App Area */}
      <main className="py-16 md:py-24">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls Section */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Input Parameters</h2>
              </div>

              {/* Industry Select */}
              <fieldset className="mb-10">
                <legend id="industry-label" className="block text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Your Industry</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-labelledby="industry-label">
                  {Object.entries(industryData).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={(e) => {
                        e.preventDefault();
                        setIndustry(key as Industry);
                      }}
                      className={`py-4 px-5 rounded-xl text-sm font-bold transition-all border text-left flex justify-between items-center ${
                        industry === key 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm ring-1 ring-emerald-500' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      {data.label}
                      {industry === key && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Records Slider */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                   <label htmlFor="records-slider" className="block text-sm font-bold text-slate-500 uppercase tracking-wider">Number of Records Exposed</label>
                   <div className="text-2xl font-black text-emerald-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                     {new Intl.NumberFormat("en-US").format(records)}
                   </div>
                 </div>
                 <input 
                   id="records-slider"
                   type="range" 
                   min="1000" 
                   max="1000000" 
                   step="1000"
                   value={records} 
                   onChange={(e) => setRecords(Number(e.target.value))}
                   className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                 />
                 <div className="flex justify-between text-xs font-bold text-slate-400 mt-3 font-mono">
                   <span>1K</span>
                   <span>500K</span>
                   <span>1M+</span>
                 </div>
              </div>

              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4">
                 <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                 <p className="text-sm text-slate-700 leading-relaxed font-medium">
                   These estimates use global industry averages for cost-per-record and incident response. Actual regulatory fines (like GDPR or HIPAA) are <strong className="text-amber-800">not fully included</strong> and may double the calculated total.
                 </p>
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-700 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_40px_rgb(16,185,129,0.2)] relative overflow-hidden h-fit">
               {/* Glow effects */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full point-events-none" />
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 blur-[80px] rounded-full point-events-none" />

               <div className="relative z-10">
                 <h3 className="text-sm font-black text-emerald-100 mb-3 uppercase tracking-widest text-center">Estimated Financial Exposure</h3>
                 
                 <div className="mt-6 mb-10 text-center">
                   <div className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg">
                     {formatCurrency(currentCost)}
                   </div>
                   <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-emerald-50 mt-6 font-bold text-sm sm:text-base border border-white/10">
                     <TrendingUp className="w-4 h-4" />
                     <span>Avg. ${industryData[industry].costPerRecord} per record</span>
                   </div>
                 </div>

                 <div className="space-y-4 mb-10 bg-black/20 rounded-2xl p-6 border border-white/10">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-emerald-100 font-medium text-sm sm:text-base">Fixed Incident Response</span>
                      <span className="font-bold text-white text-sm sm:text-base">{formatCurrency(industryData[industry].baseCost)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-emerald-100 font-medium text-sm sm:text-base">Stolen Record Cost</span>
                      <span className="font-bold text-white text-sm sm:text-base">{formatCurrency(records * industryData[industry].costPerRecord)}</span>
                    </div>
                 </div>

                 {/* Lead Capture */}
                 <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100">
                   <h4 className="font-extrabold text-slate-900 mb-2">Want to prevent this globally?</h4>
                   <p className="text-sm text-slate-600 mb-5 font-medium leading-relaxed">
                     D-Secure provides 100% certified software data erasure. Request a tailored ROI analysis.
                   </p>
                   
                   {status === "success" ? (
                     <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl font-bold border border-emerald-200 text-center animate-in fade-in zoom-in duration-300">
                       <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                       Request sent successfully! Our team will contact you shortly.
                     </div>
                   ) : (
                     <div className="flex flex-col gap-3">
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="Work email address" 
                         aria-label="Work email address"
                         required
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-900 placeholder-slate-400 font-medium" 
                       />
                       <button 
                         type="submit"
                         disabled={isSubmitting}
                         className="w-full bg-emerald-600 text-white font-extrabold px-6 py-4 rounded-xl hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl shadow-emerald-600/30 uppercase tracking-widest text-sm disabled:opacity-75 disabled:cursor-wait"
                       >
                         {isSubmitting ? "Sending..." : "Get Official Report"}
                       </button>
                     </div>
                   )}
                 </form>

               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
