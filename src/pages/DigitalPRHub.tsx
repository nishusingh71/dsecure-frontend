import React, { useState } from "react";
import { 
  Megaphone, 
  Download, 
  FileText, 
  Users, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Globe,
  Camera,
  ArrowRight
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import Reveal from "../components/Reveal";
import { useFormSubmission } from "../hooks/useFormSubmission";

const pressReleases = [
  {
    date: "March 15, 2026",
    title: "D-Secure Tech Announces Major Expansion of NIST 800-88 Purge Protocols",
    excerpt: "New update brings cryptographically-verified erasure to ultra-high density NVMe architectures, setting new industry benchmarks for speed and reliability.",
    tag: "Product Announcement"
  },
  {
    date: "February 22, 2026",
    title: "Global ITAD Partnership Initiative Launched to Secure E-Waste Lifecycle",
    excerpt: "Strategic alliance with leading recyclers aims to standardize certifiable data sanitization across secondary markets worldwide.",
    tag: "Partnership"
  },
  {
    date: "January 14, 2026",
    title: "Dhruv Rai Named Keynote Speaker at 2026 Cyber-Resilience Summit",
    excerpt: "D-Secure Founder to present on the intersection of Zero-Trust architecture and hardware decommissioning safety.",
    tag: "Events"
  }
];

const mediaAssets = [
  { 
    title: "D-Secure Brand Kit", 
    description: "Official logos in SVG, PNG, and EPS formats with typography guidelines.",
    icon: Camera, 
    size: "4.2 MB",
    link: "#" 
  },
  { 
    title: "Corporate Fact Sheet", 
    description: "Company overview, mission, core technology, and market presence summary.",
    icon: FileText, 
    size: "1.1 MB",
    link: "#" 
  },
  { 
    title: "Founder Assets", 
    description: "High-resolution headshots and executive biography for Dhruv Rai.",
    icon: Users, 
    size: "8.5 MB",
    link: "#" 
  }
];

const DigitalPRHub: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { submitForm, isSubmitting } = useFormSubmission({
    requiredFields: ["email", "media_outlet"]
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    media_outlet: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({
      ...formData,
      formType: "Media Inquiry Form",
      subject: `New PR Inquiry from ${formData.media_outlet}`
    });
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        title="Journalist Resources & Newsroom | D-Secure PR Hub"
        description="Access D-Secure's official newsroom. Download media kits, read press releases, and request interviews with Founder Dhruv Rai."
        canonicalUrl="https://dsecuretech.com/press-room"
      />

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-transparent"></div>
        <div className="container-app relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-8">
              <Megaphone className="w-4 h-4" />
              D-Secure Newsroom
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Direct Access to IT <br />
              <span className="text-emerald-500">Sanitization Authority</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-10">
              Welcome to the D-Secure Media Center. We provide journalists, analysts, and researchers with real-time updates and high-fidelity assets on the future of data security.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Latest Press Releases */}
      <section className="py-24 px-6">
        <div className="container-app">
          <div className="flex items-end justify-between mb-16 px-4 border-l-4 border-emerald-500">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Latest Press Releases</h2>
              <p className="text-slate-500 mt-2">Official company announcements and industry milestones.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressReleases.map((pr) => (
              <Reveal key={pr.title}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                      {pr.tag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{pr.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
                    {pr.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {pr.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <button className="flex items-center gap-2 text-emerald-600 font-bold text-sm group">
                      Full Story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
          <Globe className="w-96 h-96" />
        </div>
        <div className="container-app relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-black mb-6">Downloadable Media Kit</h2>
            <p className="text-slate-400 text-lg">
              Everything you need to cover D-Secure accurately. Professional-grade assets and backgrounders for story development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaAssets.map((asset) => (
              <Reveal key={asset.title}>
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8 shadow-lg shadow-emerald-500/20">
                    <asset.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{asset.title}</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    {asset.description}
                  </p>
                  <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all group-hover:shadow-xl">
                    <Download className="w-4 h-4" />
                    Download ({asset.size})
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Bench & Interview Requests */}
      <section className="py-24 px-6">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Spokesperson Card */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200">
                    <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mb-8 mx-auto border-4 border-emerald-500 p-1">
                      <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-emerald-500 text-4xl font-black">
                        DR
                      </div>
                    </div>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-900">Dhruv Rai</h3>
                      <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mt-1">Founder & Lead Architect</p>
                    </div>
                    <p className="text-slate-500 text-sm text-center leading-relaxed italic border-y border-slate-50 py-6 mb-8">
                      "Data sanitization is not a disposal chore; it's a critical layer of active cybersecurity defense."
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-700 font-medium text-sm bg-slate-50 p-3 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Expert on NIST 800-88 Standards
                      </div>
                      <div className="flex items-center gap-3 text-slate-700 font-medium text-sm bg-slate-50 p-3 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Regulatory Compliance specialist
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Media Inquiry Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Expert Commentary & Requests</h2>
                <p className="text-slate-500 text-lg mb-12">
                  Are you working on a story about data privacy, e-waste, or cybersecurity? Dhruv and our engineering team are available for technical commentary and insightful interviews.
                </p>

                {isSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h3>
                    <p className="text-slate-600">Our PR team will get back to you within 4 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="pr-name" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          id="pr-name"
                          required
                          type="text" 
                          placeholder="Reporter Name"
                          className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="pr-outlet" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Media Outlet</label>
                        <input 
                          id="pr-outlet"
                          required
                          type="text" 
                          placeholder="e.g. TechCrunch"
                          className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          value={formData.media_outlet}
                          onChange={e => setFormData({...formData, media_outlet: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="pr-email" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                      <input 
                        id="pr-email"
                        required
                        type="email" 
                        placeholder="email@press.com"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="pr-message" className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Inquiry Brief</label>
                      <textarea 
                        id="pr-message"
                        rows={4}
                        placeholder="Tell us about your story deadline and requirements..."
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-emerald-500 text-slate-900 font-black rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Interview / Info Request'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Media Mentions / Logos */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="container-app">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">D-Secure in the News</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-150">
            <div className="text-2xl font-black tracking-tighter">FORBES</div>
            <div className="text-2xl font-black tracking-tighter italic">WIRED</div>
            <div className="text-2xl font-black tracking-tighter">TECHCRUNCH</div>
            <div className="text-2xl font-black tracking-tighter italic">CISO MAG</div>
            <div className="text-2xl font-black tracking-tighter">ZDNET</div>
          </div>
        </div>
      </section>

      {/* PR Footer */}
      <footer className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="container-app">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Direct Mail</p>
                <a href="mailto:press@dsecuretech.com" className="text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors">press@dsecuretech.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400">Follow for updates:</span>
              <a href="https://dsecuretech.com/media" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://dsecuretech.com/social" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DigitalPRHub;
