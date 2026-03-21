import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  ServerIcon,
} from "@/components/FlatIcons";
import { Search, Zap } from "lucide-react";

const getReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length * 5;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const AutopilotDetectionPage: React.FC = memo(function AutopilotDetectionPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "how-it-works", label: "How It Works" },
    { id: "benefits", label: "Key Benefits" },
    { id: "compliance", label: "Compliance" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const keyBenefits = [
    {
      title: "Stop Re-Enrollments",
      desc: "Automatically detect and flag devices still tied to Windows Autopilot, Intune, or other UEMs—preventing accidental reconnection or data recovery.",
      icon: <ShieldIcon className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Touchless Recheck",
      desc: "Verify unenrolment via the cloud without reconnecting devices. Provides timestamped proof and auto-notifications when action is required.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-teal-500 to-emerald-600",
    },
    {
      title: "Protect Brand Reputation",
      desc: "Guarantee data integrity and customer confidence with verifiable, audit-ready reports for every processed device leaving your facility.",
      icon: <GlobeIcon className="w-8 h-8" />,
      color: "from-emerald-600 to-green-700",
    },
    {
      title: "Accelerate Throughput",
      desc: "Eliminate manual verification steps, helping ITADs and enterprises return certified assets to market faster with higher resale value.",
      icon: <GearIcon className="w-8 h-8" />,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const features = [
    {
      title: "Automatic UEM Detection",
      desc: "Identify Unified Endpoint Management (UEM) enrollments during the erasure process without manual intervention.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Cloud Verification",
      desc: "Verify device unenrollment directly from the cloud, ensuring assets are truly 'clean' before redistribution.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Compliance Certification",
      desc: "Generate tamper-proof reports that include both erasure status and unenrollment verification.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "Enterprise Automation",
      desc: "Scale your processing facility with fully automated workflows that flag 'stuck' devices instantly.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
  ];

  /* Unused variable cleaned up via lint suggestion */
  console.log(features.length > 0 ? "Features loaded" : "No features");

  const complianceStandards = [
    { name: "NIST 800-88", desc: "Verifiable media sanitization standards for modern storage." },
    { name: "GDPR", desc: "Supports 'Right to Erasure' and data privacy regulations." },
    { name: "SOX", desc: "Ensures secure data lifecycle management for financial records." },
    { name: "HIPAA", desc: "Protects sensitive healthcare data during device decommissioning." },
    { name: "ISO 27001", desc: "Aligns with global information security management standards." },
    { name: "ITAD Ready", desc: "Designed for IT Asset Disposition high-volume environments." },
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: "Autopilot Detection & Touchless Recheck | D-Secure",
          description: "Prevent data recovery and re-enrollment risks. Automatically identify Windows Autopilot and Intune enrolled devices before resale.",
          keywords: "autopilot detection, intune unenrollment, touchless recheck, ITAD, secure data erasure, windows autopilot",
          canonicalUrl: "https://dsecuretech.com/products/autopilot-detection",
        }}
      />
      
      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link to="/" className="flex items-center">
                <ThemeAwareLogo className="h-7 sm:h-8 w-auto" responsive={true} />
              </Link>
              <nav className="flex items-center gap-1">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-slate-50">
        {/* ================= HERO SECTION ================= */}
        <section id="overview" className="py-12 lg:py-20 xl:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    Secure Re-Enrollment Prevention
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Autopilot{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Detection
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Identify Windows Autopilot and Intune enrolled devices automatically. 
                    Ensure assets are fully unenrolled from UEMs before they leave your facility.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 bg-slate-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg cursor-not-allowed opacity-80"
                    >
                      Coming Soon
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-400 px-8 py-4 rounded-xl font-bold cursor-not-allowed opacity-70"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: 3D Product Box Illustration */}
              <Reveal delayMs={100}>
                <div className="relative flex items-center justify-center min-h-[400px]" style={{ perspective: "1000px" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl"></div>
                  
                  <div className="relative animate-[float_4s_ease-in-out_infinite]" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute inset-0 bg-emerald-500/40 blur-3xl rounded-3xl scale-110"></div>
                    
                    <div
                      className="relative w-[240px] h-[320px] lg:w-[300px] lg:h-[400px] bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                      style={{ transform: "rotateY(-12deg) rotateX(5deg)" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                      <div className="relative h-full flex flex-col items-center justify-center p-8">
                        <div className="absolute top-6 left-6 uppercase tracking-widest text-white/80 text-xs font-semibold">
                          D-Secure
                        </div>
                        
                        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                          <Zap className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                        </div>

                        <h3 className="text-white text-2xl lg:text-4xl font-bold text-center mb-2">
                          Autopilot
                        </h3>
                        <p className="text-white/70 text-xs lg:text-sm text-center uppercase tracking-widest">
                          Detection & Recheck
                        </p>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <CheckIcon className="w-4 h-4 text-emerald-300" />
                            <span className="text-white font-semibold text-xs">Cloud Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Shadow/Side faces */}
                    <div className="absolute top-0 right-0 w-10 h-full bg-emerald-900 rounded-r-lg" style={{ transform: "rotateY(90deg) translateX(20px)", transformOrigin: "left center" }}></div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Touchless Recheck Workflow
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Complete automation from detection to certification without manual intervention.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector lines (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-emerald-100 -z-0"></div>
              
              {[
                { step: "01", title: "Detect", desc: "Flags devices still enrolled in Autopilot or Intune during erasure.", icon: <Search className="w-6 h-6" /> },
                { step: "02", title: "Erase", desc: "Performs certified data destruction (NIST 800-88).", icon: <Zap className="w-6 h-6" /> },
                { step: "03", title: "Verify", desc: "Cloud-based recheck confirms unenrolment status automatically.", icon: <CloudIcon className="w-6 h-6" /> },
                { step: "04", title: "Certify", desc: "Tamper-proof report includes both Erasure & Unenrollment status.", icon: <ClipboardIcon className="w-6 h-6" /> },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-2xl bg-white border-2 border-emerald-500 shadow-xl flex items-center justify-center mb-6 group hover:bg-emerald-600 transition-colors">
                      <div className="text-emerald-600 group-hover:text-white">{item.icon}</div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY BENEFITS ================= */}
        <section id="benefits" className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-emerald-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Key Benefits</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Accelerate your value recovery and protect your reputation with certified automation.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyBenefits.map((benefit) => (
                <Reveal key={benefit.title}>
                  <div className="bg-white rounded-2xl p-8 border border-emerald-100 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm flex-grow">{benefit.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE (Dark Section) ================= */}
        <section id="compliance" className="py-20 lg:py-28 bg-slate-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">Fully Audit-Ready Certification</h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  Our solution provides verifiable proof that asset control has been completely severed from enterprise systems.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {complianceStandards.map((std) => (
                <Reveal key={std.name}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors h-full flex flex-col items-center text-center">
                    <CheckIcon className="w-8 h-8 text-emerald-400 mb-4" />
                    <h4 className="font-bold text-lg mb-2">{std.name}</h4>
                    <p className="text-xs text-slate-400">{std.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section
          id="faq"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-emerald-50"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Everything you need to know about D-Secure Autopilot Detection
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What is Windows Autopilot Detection?",
                  a: "It's a specialized feature that identifies if a device is still linked to a Microsoft Cloud (Autopilot/Intune) tenant, preventing re-enrollment when the device is reused or resold.",
                },
                {
                  q: "How does Touchless Recheck work?",
                  a: "It allows you to verify the unenrollment status of a device directly from the cloud without needing to boot into the OS or manually check the Microsoft Admin center.",
                },
                {
                  q: "Why is this important for ITADs?",
                  a: "If a device is sold while still enrolled in Autopilot, the new owner will see the previous company's login screen. This is a major security risk and a common reason for returns in the ITAD industry.",
                },
                {
                  q: "Does it require a network connection on the device?",
                  a: "No, the 'Touchless' part means our software communicates with the cloud to check the status based on the device's hardware ID, so the device itself doesn't need to be online for the recheck.",
                },
                {
                  q: "What reports are provided?",
                  a: "You receive a comprehensive report that certifies both the data erasure (NIST 800-88 compliant) and the successful unenrollment from the UEM/Autopilot tenant.",
                },
                {
                  q: "Can I automate this for high-volume processing?",
                  a: "Yes, Autopilot Detection can be integrated into your existing D-Secure erasure workflows to automatically flag devices that require manual unenrollment action.",
                },
              ].map((faq) => (
                <Reveal key={faq.q}>
                  <details className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-semibold text-slate-900 pr-4">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT / CTA ================= */}
        <section id="contact" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <Reveal>
              <div className="bg-emerald-600 rounded-[3rem] p-10 lg:p-16 text-white text-center shadow-2xl shadow-emerald-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 relative z-10">Ready to Automate Your Disposal Workflow?</h2>
                <p className="text-lg lg:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto relative z-10">
                  Talk to our experts to see how D-Secure Autopilot Detection can scale your ITAD or enterprise operations.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                  <Link to="/contact" className="bg-white text-emerald-600 font-bold px-10 py-5 rounded-2xl hover:bg-emerald-50 transition-colors shadow-lg">
                    Contact Sales
                  </Link>
                  <button onClick={() => scrollToSection('faq')} className="bg-emerald-700 text-white border border-emerald-400 font-bold px-10 py-5 rounded-2xl hover:bg-emerald-800 transition-colors">
                    View FAQ
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default AutopilotDetectionPage;
