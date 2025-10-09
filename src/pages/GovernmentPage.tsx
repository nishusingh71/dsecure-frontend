import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";

const GovernmentSecuritySolutions: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("government-security-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  D-Secure: Government Security Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                Revolutionizing Security for Government Institutions with
                Cutting-Edge Technology
              </p>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
                alt="Government Security"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Our Vision for Secure Governance
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  To empower government agencies with state-of-the-art security
                  solutions that ensure data integrity, operational continuity,
                  and citizen trust. We believe that robust security
                  infrastructure is the foundation of effective governance in
                  the digital age.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1200&q=80"
                  alt="Secure Governance"
                  className="rounded-xl shadow-md mx-auto"
                />
              </div>
            </Reveal>

            {/* Comprehensive Solutions */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Comprehensive Security Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Cyber Defence Systems",
                      desc: "Advanced threat detection and prevention mechanisms protecting government networks from sophisticated cyber attacks.",
                      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Data Protection",
                      desc: "End-to-end encryption and secure storage solutions ensuring confidentiality of sensitive governmental information.",
                      img: "https://images.unsplash.com/photo-1563013541-2d0c41c8264c?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Physical Security",
                      desc: "Integrated surveillance and access control systems safeguarding government facilities and critical infrastructure.",
                      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Cloud Security",
                      desc: "Secure cloud infrastructure enabling government agencies to modernize operations while maintaining stringent security.",
                      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Why Choose D-Secure */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Why Government Agencies Choose D-Secure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Compliance Expertise",
                      desc: "Deep understanding of government regulations, compliance requirements, and security standards including ISO 27001, NIST frameworks, and local data protection laws.",
                    },
                    {
                      title: "24/7 Support",
                      desc: "Round-the-clock monitoring and rapid response teams ensuring continuous protection and immediate incident resolution.",
                    },
                    {
                      title: "Proven Technology",
                      desc: "Cutting-edge security solutions built on battle-tested technologies, ensuring reliability and effectiveness.",
                    },
                    {
                      title: "Scalable Solutions",
                      desc: "Flexible architecture that grows with your agency's needs, from local municipal offices to large-scale national deployments.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-blue-50/60 to-transparent rounded-xl p-6"
                    >
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Technology Stack */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Our Technology Stack
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "AI-Powered Threat Intelligence",
                      desc: "Machine learning algorithms that continuously analyze patterns, predict potential security threats, and automatically respond to emerging risks.",
                    },
                    {
                      title: "Blockchain Security",
                      desc: "Distributed ledger technology ensuring tamper-proof record-keeping, transparent audit trails, and enhanced data integrity.",
                    },
                    {
                      title: "Biometric Authentication",
                      desc: "Multi-factor authentication systems incorporating fingerprint, facial recognition, and iris scanning for authorized access.",
                    },
                  ].map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-4 bg-gradient-to-r from-purple-50/60 to-transparent rounded-xl p-4"
                    >
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {tech.title}
                        </h3>
                        <p className="text-slate-700">{tech.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Impact Metrics */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                  Security Impact Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      value: "99.9%",
                      label: "System Uptime",
                      desc: "Guaranteed availability ensuring continuous protection",
                    },
                    {
                      value: "<5min",
                      label: "Threat Response",
                      desc: "Average time to detect and respond to security incidents",
                    },
                    {
                      value: "100%",
                      label: "Compliance Rate",
                      desc: "Full adherence to government security standards",
                    },
                    {
                      value: "24/7",
                      label: "Monitoring",
                      desc: "Continuous surveillance and real-time threat detection",
                    },
                  ].map((metric, i) => (
                    <div
                      key={i}
                      className="text-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6"
                    >
                      <div className="text-2xl font-bold text-indigo-700 mb-2">
                        {metric.value}
                      </div>
                      <div className="font-semibold text-slate-900 mb-2">
                        {metric.label}
                      </div>
                      <div className="text-sm text-slate-700">
                        {metric.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Key Benefits */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Key Benefits for Government Agencies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Enhanced Protection",
                      items: [
                        "Multi-layered security architecture",
                        "Real-time threat detection",
                        "Automated incident response",
                        "Comprehensive data encryption",
                      ],
                    },
                    {
                      title: "Operational Efficiency",
                      items: [
                        "Streamlined security processes",
                        "Reduced manual oversight",
                        "Centralized management console",
                        "Automated compliance reporting",
                      ],
                    },
                    {
                      title: "Cost Optimization",
                      items: [
                        "Reduced security incidents",
                        "Lower operational costs",
                        "Scalable pricing models",
                        "Long-term ROI",
                      ],
                    },
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6"
                    >
                      <h3 className="font-bold text-slate-900 text-lg mb-4">
                        {benefit.title}
                      </h3>
                      <ul className="list-disc ml-5 text-slate-700 space-y-2">
                        {benefit.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Section */}
            <Reveal>
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Partner with D-Secure Today
                </h2>
                <p className="text-center text-blue-100 text-lg max-w-3xl mx-auto mb-6">
                  Join us in building a more secure future for government
                  services. Contact our team today to schedule a comprehensive
                  security assessment and discover how D-Secure can transform
                  your agency's security posture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Schedule Consultation
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
                <div className="text-center mt-8 text-blue-100">
                  <p>Email: government@d-secure.com</p>
                  <p>Phone: +91-XXXX-XXXXXX</p>
                  <p>Website: www.d-secure.com</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default GovernmentSecuritySolutions;
