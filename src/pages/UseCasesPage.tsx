import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "../components/Reveal";

export default function UseCasesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useCases = [
    {
      title: "Finance & Banking",
      sector: "FinTech",
      challenge:
        "Protecting highly sensitive PII and financial records during workstation upgrades.",
      solution:
        "D-Secure's automated Purge protocol with auditable JSON-LD certificates for SOX compliance.",
      icon: "🏦",
    },
    {
      title: "Healthcare",
      sector: "Healthcare IT",
      challenge:
        "Handling PHI on medical devices and servers while meeting HIPAA/HITECH disposal requirements.",
      solution:
        "Device-agnostic sanitization that handles legacy proprietary firmware correctly.",
      icon: "🏥",
    },
    {
      title: "Government & Defense",
      sector: "Public Sector",
      challenge:
        "Ensuring no data leaks during wide-scale hardware decommissioning across multiple agencies.",
      solution:
        "Centralized governance console with tamper-proof audit trails for cross-agency verification.",
      icon: "🏛️",
    },
    {
      title: "ITAD & Recyclers",
      sector: "Eco-Tech",
      challenge:
        "Processing thousands of drives daily with high throughput and 100% verification.",
      solution:
        "Parallel execution engine capable of sanitizing 100+ drives simultaneously.",
      icon: "♻️",
    },
    {
      title: "Cloud Service Providers",
      sector: "Data Centers",
      challenge:
        "Secure decommissioning of faulty SSDs in high-density storage arrays.",
      solution:
        "Remote-triggered cryptographic erase that integrates with existing maintenance workflows.",
      icon: "☁️",
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("use-cases")} />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-emerald-900 py-20 lg:py-32 text-white">
          <div className="container-responsive">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                Enterprise <span className="text-brand">Use Cases</span>
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl">
                See how industry leaders across the globe leverage D-Secure to
                eliminate data liabilities and streamline compliance operations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Use Case Grid */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="container-responsive">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 group hover:border-brand/40 transition-all"
                >
                  <div className="text-5xl mb-6">{useCase.icon}</div>
                  <div className="text-brand font-bold text-xs uppercase tracking-widest mb-2">
                    {useCase.sector}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-brand transition-colors">
                    {useCase.title}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-2">
                        The Challenge
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {useCase.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-2">
                        The D-Secure Solution
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {useCase.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-50">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-brand font-bold hover:gap-2 transition-all"
                    >
                      Learn more about {useCase.title}{" "}
                      <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Integration Section */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="container-responsive relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Deploy Anywhere, Sanitize Everywhere
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
              Our platform is designed for versatility. Whether it's an
              on-premise data center or a remote field office, D-Secure provides
              consistent, structural governance.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">On-Prem</div>
                <div className="text-xs text-slate-500">Enterprise Servers</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">Remote</div>
                <div className="text-xs text-slate-500">Corporate Laptops</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">
                  Industrial
                </div>
                <div className="text-xs text-slate-500">Medical Hardware</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">ITAD</div>
                <div className="text-xs text-slate-500">
                  High Volume Erasure
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
