import React from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DigitalProtectionSolutions: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("digital-protection-solutions")} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
                  D-Secure: Digital Protection Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                Revolutionizing Cybersecurity with Cutting-Edge Technology and
                Accessible Enterprise-Grade Protection
              </p>
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
                alt="Digital Security"
                className="rounded-2xl shadow-lg mx-auto max-h-[400px] object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white/70">
          <div className="container-responsive max-w-5xl mx-auto space-y-10">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Our Mission and Vision
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Mission Statement
                    </h3>
                    <p className="text-slate-700 mb-4">
                      To empower businesses of all sizes with enterprise-grade
                      security solutions that are accessible, affordable, and
                      adaptable. We believe every organisation deserves robust
                      protection against evolving digital threats.
                    </p>
                    <ul className="list-disc ml-5 text-slate-700 space-y-2">
                      <li>Democratising cybersecurity technology</li>
                      <li>Building trust through transparency</li>
                      <li>Continuous innovation and improvement</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Vision for the Future
                    </h3>
                    <p className="text-slate-700 mb-4">
                      To become the most trusted name in digital security across
                      India and beyond, creating a safer digital ecosystem for
                      businesses, institutions, and individuals.
                    </p>
                    <ul className="list-disc ml-5 text-slate-700 space-y-2">
                      <li>Leading industry standards</li>
                      <li>Expanding global reach</li>
                      <li>Fostering security awareness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Core Services */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Core Services and Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Threat Detection",
                      desc: "Real-time monitoring and advanced threat intelligence to identify and neutralise security risks before they impact your operations.",
                      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Network Security",
                      desc: "Comprehensive firewall solutions and intrusion prevention systems that safeguard your entire digital infrastructure.",
                      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Data Encryption",
                      desc: "Military-grade encryption protocols protecting sensitive information across all platforms and devices, ensuring complete confidentiality.",
                      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      title: "Cloud Protection",
                      desc: "Secure cloud environments with continuous monitoring, ensuring your data remains protected wherever it resides.",
                      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 text-center"
                    >
                      <img
                        src={service.img}
                        alt={service.title}
                        className="rounded-xl mb-4 h-40 w-full object-cover shadow-sm"
                      />
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-700">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Why Choose D-Secure */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Why Choose D-Secure?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "AI-Powered Protection",
                      desc: "Leveraging artificial intelligence and machine learning to predict and prevent threats with unprecedented accuracy.",
                      icon: "🤖",
                    },
                    {
                      title: "24/7 Expert Support",
                      desc: "Round-the-clock assistance from regulated security professionals who understand your unique challenges.",
                      icon: "🛡️",
                    },
                    {
                      title: "Scalable Solutions",
                      desc: "Flexible packages that grow with your business, from startups to enterprises, without compromising on security.",
                      icon: "📈",
                    },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl mb-4">{feature.icon}</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-700">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* D-Secure Advantage */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                  The D-Secure Advantage
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      value: "99.9%",
                      label: "Uptime Guarantee",
                      desc: "Ensuring your security systems are always operational",
                    },
                    {
                      value: "<5min",
                      label: "Response Time",
                      desc: "Lightning-fast threat response to minimise damage",
                    },
                    {
                      value: "500+",
                      label: "Threats Blocked Daily",
                      desc: "Proactive defence stopping attacks before they reach you",
                    },
                    {
                      value: "100%",
                      label: "Compliance Ready",
                      desc: "Meeting GDPR, ISO 27001, and local standards",
                    },
                  ].map((advantage, i) => (
                    <div
                      key={i}
                      className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6"
                    >
                      <div className="text-2xl font-bold text-slate-800 mb-2">
                        {advantage.value}
                      </div>
                      <div className="font-semibold text-slate-900 mb-2">
                        {advantage.label}
                      </div>
                      <div className="text-sm text-slate-700">
                        {advantage.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Implementation Process */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Our Implementation Process
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      step: "Initial Assessment",
                      desc: "Comprehensive evaluation of your current security posture, identifying vulnerabilities and areas for improvement.",
                    },
                    {
                      step: "Custom Strategy",
                      desc: "Development of a tailored security roadmap aligned with your business objectives, budget, and risk tolerance.",
                    },
                    {
                      step: "Seamless Deployment",
                      desc: "Expert installation and configuration with minimal disruption to your operations, ensuring smooth transition.",
                    },
                    {
                      step: "Team Training",
                      desc: "Comprehensive education programmes for your staff, building security awareness and best practices.",
                    },
                    {
                      step: "Ongoing Optimisation",
                      desc: "Continuous monitoring, updates, and improvements to keep your defences ahead of emerging threats.",
                    },
                  ].map((process, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-4 bg-gradient-to-r from-blue-50/60 to-transparent rounded-xl p-6"
                    >
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-xl mb-2">
                          {process.step}
                        </h3>
                        <p className="text-slate-700">{process.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Industry Applications */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Industry Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      industry: "Healthcare",
                      desc: "Protecting patient data and medical records with HIPAA-compliant solutions, ensuring confidentiality whilst enabling seamless care delivery.",
                      img: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760093103/cp7t7nascrxgvlbjxj7t.jpg",
                    },
                    {
                      industry: "Financial Services",
                      desc: "Safeguarding transactions and customer information with banking-grade encryption and fraud prevention systems.",
                      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      industry: "Education",
                      desc: "Securing student data and institutional systems whilst maintaining accessibility for learning and research activities.",
                      img: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760093103/fqyls0ledhjwmgoph0bq.jpg",
                    },
                    {
                      industry: "E-Commerce",
                      desc: "Protecting customer transactions and business data, building trust and ensuring compliance with payment security standards.",
                      img: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1760093292/c3s2iz7zd1g5qmnpkw6d.jpg",
                    },
                  ].map((application, i) => (
                    <div
                      key={i}
                      className="flex flex-col bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl overflow-hidden"
                    >
                      <img
                        src={application.img}
                        alt={application.industry}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 text-xl mb-3">
                          {application.industry}
                        </h3>
                        <p className="text-slate-700">{application.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Client Success Stories */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Client Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      company: "TechVentures Pvt Ltd",
                      quote:
                        "D-Secure transformed our security infrastructure within weeks. Their team's expertise and responsiveness exceeded our expectations. We've experienced zero breaches since implementation.",
                      author: "Rajesh Kumar, CTO",
                    },
                    {
                      company: "MediCare Hospitals",
                      quote:
                        "Patient data security is paramount in healthcare. D-Secure's solutions not only meet compliance requirements but provide peace of mind. Their 24/7 support has been invaluable.",
                      author: "Dr. Priya Sharma, IT Director",
                    },
                    {
                      company: "FinanceFirst Bank",
                      quote:
                        "The implementation was seamless, and the results speak for themselves. Transaction security has improved dramatically, and customer confidence has soared.",
                      author: "Amit Patel, Security Manager",
                    },
                  ].map((testimonial, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6"
                    >
                      <h3 className="font-bold text-slate-900 text-lg mb-3">
                        {testimonial.company}
                      </h3>
                      <p className="text-slate-700 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-slate-600 font-semibold">
                        {testimonial.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Section */}
            <Reveal>
              <div className="bg-gradient-to-r from-slate-700 via-blue-700 to-purple-800 rounded-2xl p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Begin Your Security Journey Today
                </h2>
                <p className="text-center text-slate-200 text-lg max-w-3xl mx-auto mb-6">
                  Don't wait for a security incident to take action. D-Secure is
                  ready to protect your organisation with industry-leading
                  solutions tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  {/* <button className="bg-white text-slate-800 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                    Schedule Consultation
                  </button> */}
                  <Link to={'/contact'} className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Request Demo
                  </Link>
                  {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Get Started
                  </button> */}
                </div>
                <div className="text-center text-slate-300">
                  <p>Email: info@d-secure.com</p>
                  <p>Phone: +91-XXXX-XXXXXXX</p>
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

export default DigitalProtectionSolutions;
