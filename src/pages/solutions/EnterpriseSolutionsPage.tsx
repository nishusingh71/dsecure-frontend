import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const EnterpriseSolutionsPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("enterprise-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  D-Secure: Enterprise Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                Complete IT Asset Lifecycle Management for Modern Enterprises
              </p>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
                alt="Enterprise Solutions"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Streamline Your IT Asset Management
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Ease enterprise cloud migrations, IT asset decommissioning and end-of-life data erasure 
                  with compliant and secure data erasure software. Get compliant erasure at scale for all 
                  your IT data storage assets across workforce, operations, and data centers.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
                  alt="Enterprise IT Management"
                  className="rounded-xl shadow-md mx-auto"
                />
              </div>
            </Reveal>

            {/* Key Benefits */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Enterprise-Grade Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Software-Based Sanitization",
                      desc: "Safe and sustainable reuse of IT assets with certified data sanitization processes.",
                      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Tamper-Proof Audit Trail",
                      desc: "Digitally signed reports providing complete chain of custody documentation for compliance.",
                      img: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760089918/uh9vcisoo7jwfggjbilf.jpg",
                    },
                    {
                      title: "Asset Management Platform",
                      desc: "Seamless compatibility with ServiceNow and common IT asset management platforms.",
                      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Cloud Migration Support",
                      desc: "Secure data handling during cloud infrastructure transitions and data center decommissioning.",
                      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-emerald-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Use Cases */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Enterprise Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Cloud Migration",
                      desc: "Secure data handling during cloud infrastructure transitions with zero data leakage.",
                      icon: "☁️",
                    },
                    {
                      title: "Data Center Erasure",
                      desc: "Meticulous erasure from servers, loose drives, and storage networks at scale.",
                      icon: "🏢",
                    },
                    {
                      title: "Endpoint Device Management",
                      desc: "Erase data from desktops, laptops, mobile devices, and removable media.",
                      icon: "💻",
                    },
                    {
                      title: "Data Retention Policies",
                      desc: "Securely remove ROT (Redundant, Obsolete, Trivial) data from storage mediums.",
                      icon: "📋",
                    },
                    {
                      title: "Employee Offboarding",
                      desc: "Complete data removal from departing employee devices with audit trails.",
                      icon: "👤",
                    },
                    {
                      title: "Storage & Loose Drives",
                      desc: "Securely manage loose drives and large-scale storage systems across facilities.",
                      icon: "💾",
                    },
                  ].map((useCase, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-emerald-50/60 to-transparent rounded-xl p-6 flex items-start gap-4 border border-emerald-100"
                    >
                      <div className="text-4xl">{useCase.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-slate-700">{useCase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Platform Capabilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Active environment erasure",
                    "Reduced e-waste management",
                    "Technology investment returns",
                    "Centralized console dashboard",
                    "Multi-site deployment support",
                    "Role-based access control",
                    "Automated scheduling",
                    "Real-time monitoring",
                    "Compliance reporting",
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4"
                    >
                      <svg
                        className="w-6 h-6 text-emerald-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-slate-800 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Section */}
            <Reveal>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Enterprise IT Management?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss your specific requirements and design a solution that fits your 
                  enterprise needs and compliance standards.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Schedule Consultation
                  </Link>
                  <Link
                    to="/pricing"
                    className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnterpriseSolutionsPage;
