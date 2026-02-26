import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

const FinancialServices: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("financial-services")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 1.343-3 3 0 1.315.84 2.433 2 2.83V17h2v-3.17a3.001 3.001 0 00-1-5.83z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    D-Secure Financial Services Solutions
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Empowering Financial Institutions with Secure, Compliant, and
                  Intelligent Data Erasure Systems.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/60">
          <div className="container-responsive">
            <div className="max-w-5xl mx-auto space-y-10">
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <img
                    src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1760089424/cctijcsqv0m78nfmmocv.jpg"
                    alt="Financial Security Overview"
                    className="rounded-xl mb-6"
                  />
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Overview: Digital Trust for Financial Ecosystems
                  </h2>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    The financial sector handles some of the most sensitive data
                    in the world. D-Secure ensures that every byte of customer
                    data, transaction log, and audit file is securely erased,
                    compliant with financial and international data protection
                    regulations such as PCI DSS, GDPR, and ISO 27001.
                  </p>
                </div>
              </Reveal>

              {/* Core Services */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Core Services for Financial Institutions
                  </h2>
                  <p className="text-slate-700 mb-6">
                    DSecure’s comprehensive data sanitization suite protects
                    critical financial data across infrastructure, devices, and
                    cloud systems.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Regulatory Compliance Erasure",
                        desc: "Ensure full compliance with PCI DSS, GLBA, and SEC data retention guidelines.",
                        img: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1760090537/axob47fesej4jehz3oet.jpg",
                      },
                      {
                        title: "Secure Cloud Deletion",
                        desc: "Automated data sanitization workflows across hybrid cloud and multi-tenant environments.",
                        img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
                      },
                      {
                        title: "Auditable Reports",
                        desc: "Generate tamper-proof digital regulatory documents for every data erasure operation.",
                        img: "https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1760090536/bwfxnasge68rv2y4pgyj.jpg",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-sm hover:shadow-md overflow-hidden"
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          className="h-40 w-full object-cover"
                        />
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-teal-800 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Technology & Innovation */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-cyan-100 hover:shadow-xl transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
                    alt="Technology Innovation"
                    className="rounded-xl mb-6"
                  />
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Technology-Driven Innovation
                  </h2>
                  <ul className="list-disc ml-6 text-slate-700 space-y-2">
                    <li>AI-assisted anomaly detection in erasure logs.</li>
                    <li>End-to-end encryption and blockchain verification.</li>
                    <li>
                      Centralized cloud console for compliance monitoring.
                    </li>
                  </ul>
                </div>
              </Reveal>

              {/* Client Success Story */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Client Success Story
                  </h2>
                  <img
                    src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80"
                    alt="Bank Success Story"
                    className="rounded-xl mb-6"
                  />
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    A leading global bank reduced their data risk exposure by
                    70% and achieved zero compliance violations after
                    integrating DSecure’s regulated erasure system. Their ITAD
                    lifecycle now runs 40% faster with auditable verification.
                  </p>
                </div>
              </Reveal>

              {/* Certifications & Compliance */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Regulations & Compliance Standards
                  </h2>
                  <ul className="list-disc ml-6 text-slate-700 space-y-2">
                    <li>ISO 27001 – Information Security Management</li>
                    <li>PCI DSS – Payment Data Security Compliance</li>
                    <li>NIST 800-88 Rev.1 – Data Erasure Standards</li>
                    <li>GDPR Article 17 – Right to Erasure</li>
                  </ul>
                </div>
              </Reveal>

              {/* CTA Section */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Get Started with D-Secure Financial Services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {[
                      {
                        title: "Request Demo",
                        desc: "Experience DSecure’s compliance-driven erasure system in action.",
                      },
                      {
                        title: "Consult Compliance Experts",
                        desc: "Get personalized guidance from our financial security specialists.",
                      },
                      {
                        title: "Partner with D-Secure",
                        desc: "Collaborate to enhance your organization’s data integrity strategy.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-emerald-100">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FinancialServices;
