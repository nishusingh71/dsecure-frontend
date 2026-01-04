import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ServiceProvidersSolutionsPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("service-providers-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-rose-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  D-Secure: Service Provider Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                White-Label Data Erasure Solutions for MSPs and IT Service Providers
              </p>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                alt="Service Provider Solutions"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Empower Your Service Portfolio
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Comprehensive data sanitization services that MSPs can offer to their clients with full branding.
                  Our white-label solutions enable you to expand your service offerings, increase revenue, and
                  provide enterprise-grade data security to your customers without the overhead of developing
                  your own solutions.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
                  alt="MSP Solutions"
                  className="rounded-xl shadow-md mx-auto"
                />
              </div>
            </Reveal>

            {/* Key Benefits */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Key Benefits for Service Providers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "White-Label Branding",
                      desc: "Fully customizable interface with your company branding, logos, and color schemes for seamless client experience.",
                      img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Multi-Tenant Management",
                      desc: "Efficiently manage multiple clients from a single dashboard with isolated data and customizable policies.",
                      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Revenue Sharing Programs",
                      desc: "Attractive partner programs with competitive revenue sharing and tiered pricing for volume growth.",
                      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Technical Support Included",
                      desc: "Dedicated partner support team to assist you and your clients with technical implementation and troubleshooting.",
                      img: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-purple-800 mb-2">
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
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Service Provider Use Cases
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Client Services",
                      desc: "Offer data sanitization as a managed service to your existing client base with seamless automated billing.",
                      icon: "👥",
                    },
                    {
                      title: "Partner Programs",
                      desc: "Join our partner network and unlock revenue-generating opportunities with attractive commission structures.",
                      icon: "🤝",
                    },
                    {
                      title: "24/7 Support Services",
                      desc: "Leverage our expert technical support team to provide round-the-clock assistance to your clients.",
                      icon: "🔧",
                    },
                    {
                      title: "Automated Reporting",
                      desc: "Generate branded compliance reports and regulatory documents for your clients with automated workflows.",
                      icon: "📊",
                    },
                  ].map((useCase, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-purple-50/60 to-transparent rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className="text-4xl">{useCase.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-800 mb-2">
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
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Platform Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Multi-tenant architecture",
                    "Custom branding & themes",
                    "Automated billing & invoicing",
                    "Client portal access",
                    "Volume-based pricing",
                    "Partner training programs",
                    "Marketing materials provided",
                    "Compliance documentation",
                    "Dedicated account manager",
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4"
                    >
                      <svg
                        className="w-6 h-6 text-purple-600 flex-shrink-0"
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
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Become a Partner?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join our growing network of service providers and start offering
                  enterprise-grade data erasure solutions to your clients today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Become a Partner
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

export default ServiceProvidersSolutionsPage;
