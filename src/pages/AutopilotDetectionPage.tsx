import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
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
import { Monitor, Download, X, Search, Zap, ScanSearch } from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { getReadTime } from "@/utils/readTime";
import { ProductContactForm } from "@/components/forms";



const AutopilotDetectionPage: React.FC = memo(function AutopilotDetectionPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "how-it-works", label: "How It Works" },
    { id: "risks", label: "The Hidden Risk" },
    { id: "features", label: "Key Features" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Deployment" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scroll position ke hisaab se active section aur sticky nav update karein
      const scrollPosition = window.scrollY;
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
    // Smooth scroll functionality specific section ke liye
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

  const risks = [
    {
      title: "The Re-Enrollment Loop",
      desc: "Even after a full data wipe, Autopilot enrollment remains intact. Resold devices will automatically re-lock to the previous owner's tenant upon internet connection.",
      icon: <X className="w-6 h-6" />,
    },
    {
      title: "R2v3 Compliance Risk",
      desc: "Failing to deregister retired IT assets violates R2v3 (Appendix B) and ISO 27001 standards, which require removal of all enterprise locks and policies.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "Unusable Liabilities",
      desc: "Locked devices are effectively bricks for the new owner, leading to high return rates, warranty disputes, and damage to your brand reputation.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const features = [
    {
      title: "Automatic UEM Detection",
      desc: "Identify Unified Endpoint Management (UEM) enrollments during the device processing phase without manual intervention.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Cloud Verification",
      desc: "Verify device unenrollment directly from the cloud, ensuring assets are truly 'clean' before redistribution.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Compliance Certification",
      desc: "Generate tamper-proof reports that certify the successful unenrollment of assets from enterprise UEMs.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "Enterprise Automation",
      desc: "Scale your processing facility with fully automated workflows that flag 'stuck' devices instantly.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "ERP/API Connectivity",
      desc: "Seamlessly integrate with ITAD management platforms like Makor and RazorERP for centralized asset flagging.",
      icon: <GearIcon className="w-6 h-6" />,
    },
    {
      title: "Parallel Processing",
      desc: "Check multiple devices simultaneously via PXE boot, significantly increasing your facility's daily throughput.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  /* Unused variable cleaned up via lint suggestion */
  console.log(features.length > 0 ? "Features loaded" : "No features");

  const complianceStandards = [
    { name: "R2v3 Appendix B", desc: "Meets SERI requirements for logical data sanitization and lock removal." },
    { name: "NIST 800-88", desc: "Ensures media sanitization aligns with federal data destruction standards." },
    { name: "ISO 27001", desc: "Supports global information security management systems (ISMS)." },
    { name: "GDPR", desc: "Complies with 'Right to Erasure' and data privacy regulations." },
    { name: "HIPAA", desc: "Protects PHI during the decommissioning of healthcare IT assets." },
    { name: "ITAD Regulatory", desc: "Designed for high-volume asset disposition (ITAD) workflows." },
  ];

  const platforms = [
    {
      name: "USB Boot Mode",
      desc: "Ideal for manual processing. Boot from a specialized D-Secure Detection USB to fetch cloud status instantly.",
      icon: <Download className="w-10 h-10" />,
    },
    {
      name: "PXE Network Boot",
      desc: "Recommended for bulk volume. Deploy detection across your local network for automated, high-speed auditing.",
      icon: <ServerIcon className="w-10 h-10" />,
    },
  ];

  const useCases = [
    {
      title: "ITAD Vendors",
      desc: "Centrally flag locked devices and coordinate deregistration with clients before resale to maintain margins.",
      icon: <ShieldIcon className="w-6 h-6" />,
    },
    {
      title: "Enterprise IT",
      desc: "Ensure 100% of retired assets are removed from Intune/Azure AD before they leave organizational control.",
      icon: <GlobeIcon className="w-6 h-6" />,
    },
    {
      title: "Refurbishers",
      desc: "Prevent 'failed provisioning' loops for end-users and minimize RMA rates for refurbished inventory.",
      icon: <Monitor className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("autopilot-detection")} />
      
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
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>

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
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
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
                          <ScanSearch className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
              {/* Connector lines (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-emerald-100 -z-0"></div>
              
              {[
                { step: "01", title: "Detect", desc: "Flags devices still enrolled in Autopilot or Intune during processing.", icon: <Search className="w-6 h-6" /> },
                { step: "02", title: "Verify", desc: "Cloud-based recheck confirms unenrolment status automatically.", icon: <CloudIcon className="w-6 h-6" /> },
                { step: "03", title: "Certify", desc: "Tamper-proof report confirms the complete unenrollment status.", icon: <ClipboardIcon className="w-6 h-6" /> },
              ].map((item, idx) => (
                <Reveal key={idx} delayMs={idx * 100}>
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

        {/* ================= THE HIDDEN RISK ================= */}
        <section id="risks" className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-emerald-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-emerald-700">The Hidden Risk</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Why simple data erasure isn't enough for enterprise-enrolled assets.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {risks.map((risk, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <div className="bg-white rounded-2xl p-8 border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                      {risk.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{risk.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{risk.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY FEATURES ================= */}
        <section id="features" className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Key Features</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Advanced automated auditing for high-volume ITAD and enterprise environments.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <Reveal key={i} delayMs={i * 50}>
                  <div className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
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

        {/* ================= PLATFORMS & DEPLOYMENT ================= */}
        <section id="platforms" className="py-20 lg:py-28 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Deployment Modes</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Flexible deployment options to fit any processing scale—from single devices to entire server racks.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {platforms.map((platform, i) => (
                <Reveal key={i} delayMs={i * 100}>
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-[2rem] border border-emerald-100 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                      {platform.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{platform.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{platform.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Who Is It For?</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  D-Secure Autopilot Detection streamlines asset disposition for professional electronics recyclers and corporate IT teams.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, i) => (
                <Reveal key={i} delayMs={i * 80}>
                  <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{useCase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TECHNICAL SPECIFICATIONS ================= */}
        <section id="tech-specs" className="py-20 lg:py-28 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
                  <div className="space-y-6">
                    {[
                      { label: "Identification Type", value: "Hardware ID (HWID) & Serial Number Verification" },
                      { label: "Cloud Integration", value: "Direct Azure/Intune API Connectivity" },
                      { label: "Response Time", value: "< 2 Seconds for Cloud Status Retrieval" },
                      { label: "Deployment", value: "x86/x64 Bootable ISO (USB 3.0 / PXE)" },
                      { label: "Report Format", value: "Tamper-proof PDF / CSV / JSON (Makor/Razor Ready)" },
                      { label: "Minimum Specs", value: "2GB RAM, Intel/AMD Processor, Internet Access" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100 last:border-0">
                        <span className="font-semibold text-slate-900 w-full sm:w-1/3 mb-1 sm:mb-0">{spec.label}</span>
                        <span className="text-slate-600 w-full sm:w-2/3">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white relative border border-slate-800 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Smart Audit Logic</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Automatic HWID generation during boot",
                        "End-to-end encrypted cloud communication",
                        "Timestamped verification with digital signature",
                        "Auto-retry logic for unstable connections",
                        "Detailed tenant ID and enrollment profiles",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
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
                  a: "It's a specialized feature that identifies if a device is still linked to a Microsoft Cloud (Autopilot/Intune) tenant. It prevents the major security risk of assets re-locking to previous owners after resale.",
                },
                {
                  q: "How does the detection logic work?",
                  a: "The tool generates a unique Hardware ID (HWID) during boot and queries the Microsoft cloud directly to verify the enrollment status of the specific device.",
                },
                {
                  q: "Why is data erasure alone not enough?",
                  a: "Data erasure wipes the locally stored data, but Windows Autopilot is a cloud-side lock. Even a 'clean' drive will automatically re-apply enterprise policies as soon as it connects to the internet.",
                },
                {
                  q: "What is the benefit for ITAD vendors?",
                  a: "It helps ITADs avoid costly RMAs and returns. By identifying locked devices early, you can coordinate unenrollment with the client and ensure every asset is truly ready for the circular economy.",
                },
                {
                  q: "Can this be run at scale over a network?",
                  a: "Yes. Using PXE (Network) Boot, you can process high volumes of assets simultaneously, with results automatically synced to your cloud dashboard or ERP system.",
                },
                {
                  q: "Which compliance standards does it support?",
                  a: "It directly assists with R2v3 (Appendix B) compliance, which requires clear proof that enterprise controls, locks, and connectivity have been removed from repurposed IT assets.",
                },
                {
                  q: "Do I need separate licenses for detection?",
                  a: "Yes, Autopilot Detection is an add-on capability and usually requires separate cloud verification licenses from the standard erasure tokens.",
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
        <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
           {/* Subtle background patterns */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-300 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
              source="Autopilot Detection Page Contact"
              solutionType="autopilot-detection"
              title="Ready to Automate Your Disposal Workflow?"
              subtitle="Talk to our experts to see how D-Secure Autopilot Detection can scale your ITAD or enterprise operations."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default AutopilotDetectionPage;
