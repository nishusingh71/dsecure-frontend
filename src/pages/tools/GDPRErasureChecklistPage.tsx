import React, { useState } from "react";
import { 
  ClipboardCheck, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Circle,
  Download,
  Scale,
  AlertCircle
} from "lucide-react";
import SEOHead from "../../components/SEOHead";
import { useFormSubmission } from "../../hooks/useFormSubmission";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

const GDPRErasureChecklistPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "policy",
      title: "Data Erasure Policy",
      description: "Do you have a clear internal policy for processing 'Right to Erasure' requests?",
      checked: false
    },
    {
      id: "media",
      title: "Certified Sanitization",
      description: "Are you using software that provides tamper-proof certificates of erasure for each device?",
      checked: false
    },
    {
      id: "backup",
      title: "Backup & Archive Purge",
      description: "Can you verify that data is also removed from secondary backups and archive storage?",
      checked: false
    },
    {
      id: "thirdparty",
      title: "Third-Party Notification",
      description: "Is there a process to notify downstream processors to erase shared data?",
      checked: false
    },
    {
      id: "log",
      title: "Audit Log & Record Keeping",
      description: "Do you maintain a centralized audit log of all erasure outcomes for DPO review?",
      checked: false
    }
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);
  const [isSuccess, setIsSuccess] = useState(false);

  const { submitForm, isSubmitting } = useFormSubmission({
    requiredFields: ["email"]
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({
      ...contactForm,
      formType: "GDPR Checklist Content Lead",
      calc_gdpr_progress: `${progress}%`,
      calc_missing_points: items.filter(i => !i.checked).map(i => i.title).join(", ")
    });
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        title="GDPR Right to Erasure (Article 17) Checklist | D-Secure"
        description="Verify your organization's compliance with GDPR 'Right to Erasure' requirements using our interactive audit checklist."
        canonicalUrl="https://dsecuretech.com/tools/gdpr-erasure-checklist"
      />

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        
        <div className="container-app relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Scale className="w-4 h-4" />
              Article 17 Compliance Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Right to Erasure <span className="text-emerald-500">Compliance Audit</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              GDPR Article 17 mandates that organizations must erase personal data upon request. Use this interactive checklist to audit your technical readiness for 'The Right to be Forgotten'.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist Content */}
      <section className="py-16 px-6 -mt-12">
        <div className="container-app max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Checklist */}
            <div className="lg:col-span-12">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                {/* Progress Header */}
                <div className="bg-slate-50 p-8 border-b border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                        Audit Progress
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">Check the items that your organization currently has in place.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-600">{progress}%</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Compliance Score</div>
                      </div>
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full p-8 text-left transition-all hover:bg-slate-50/80 flex items-start gap-6 group ${
                        item.checked ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <div className={`shrink-0 mt-1 ${item.checked ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'}`}>
                        {item.checked ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold mb-2 transition-colors ${
                          item.checked ? 'text-emerald-900' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm leading-relaxed transition-colors ${
                          item.checked ? 'text-emerald-700/80' : 'text-slate-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="p-10 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Get Your Audit Report</h4>
                      <p className="text-slate-400 text-sm">Download the full technical requirements for GDPR sanitization.</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    {isSuccess ? (
                      <div className="flex items-center gap-3 text-emerald-400 font-bold bg-emerald-400/10 px-6 py-3 rounded-xl border border-emerald-400/20">
                        <CheckCircle2 className="w-5 h-5" />
                        Checklist Sent to Email
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                          required
                          type="email"
                          placeholder="Email address"
                          className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
                          value={contactForm.email}
                          onChange={e => setContactForm({...contactForm, email: e.target.value})}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-emerald-500 text-slate-900 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Sending...' : 'Get PDF'}
                          <Download className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Tips */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Penalties</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Non-compliance with 'Right to Erasure' can lead to fines up to 4% of annual global turnover or €20 million.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Verifiability</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Simply deleting file pointers is not enough. GDPR mandates verifiable data sanitization that is permanent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Requirement</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Controllers must be able to prove erasure occurred to satisfy audit requests from Supervisory Authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Commentary */}
      <section className="py-20 px-6">
        <div className="container-app">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-emerald-500 pl-6 uppercase tracking-tighter">Expert Insights</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <p className="text-slate-600 leading-relaxed italic">
                \"Article 17 compliance is more than just a legal requirement; it's a technical demonstration of respect for data privacy. Organizations that automate their data erasure lifecycle don't just avoid fines—they build consumer trust through verifiable transparency.\"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center text-slate-500 font-bold">DS</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">D-Secure Compliance Team</div>
                  <div className="text-xs text-slate-400">Governance, Risk & Compliance Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPRErasureChecklistPage;
