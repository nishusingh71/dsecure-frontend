import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  CheckCircle,
  Smartphone,
  Layers,
  FileText,
  Settings,
  ArrowRight,
  ChevronDown,
  Cloud,
  RefreshCcw,
} from "lucide-react";
import Reveal from "../components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";

// Reusing Icons from the theme
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SmartphoneEraserPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "how-it-works", "benefits", "standards", "faq", "contact"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offset = element.offsetTop - 100;
        const height = element.offsetHeight;
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          setActiveSection(section);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Sync with MainLayout header visibility
  useEffect(() => {
    const event = new CustomEvent("stickyNavVisible", {
      detail: { visible: isNavVisible },
    });
    globalThis.dispatchEvent(event);

    return () => {
      // Ensure header is restored when leaving the page
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: false },
        })
      );
    };
  }, [isNavVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === "overview" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "how-it-works", label: "How It Works" },
    { id: "benefits", label: "Benefits" },
    { id: "standards", label: "Standards" },
    { id: "faq", label: "FAQ" },
  ];

  const keyBenefits = [
    {
      title: "Bulk Processing",
      desc: "Securely erase up to 40+ iOS & Android devices simultaneously on a single workstation. Scale capacity across multiple workstations managed via a central cloud console.",
      icon: <Layers className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "14 Global Standards",
      desc: "Supports NIST 800-88 Clear & Purge, IEEE 2883:2022 Clear & Purge, DoD 5220.22-M (3 & 7 Pass), Peter Gutmann (35 Pass), and more for total compliance.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "from-teal-500 to-emerald-600",
    },
    {
      title: "eSIM & Locked Device Erasure",
      desc: "Permanently remove eSIM profiles, erase locked iPhones, and wipe devices with broken screens or in recovery mode via our Linux-based edition.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-emerald-600 to-green-700",
    },
    {
      title: "Tamper-Proof Reports",
      desc: "Generates verifiable erasure reports & certificates in PDF, CSV & XML formats. Customize with your company logo & watermark for audit trails.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const features = [
    {
      title: "Unified iOS & Android App",
      desc: "Single unified application to erase iPhones, iPads & Android devices. Supports iOS v7+ for erasure and Android v5+.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Cloud Console",
      desc: "Dashboard to create users, manage license distribution & maintain a central repository of reports & certificates accessible anytime.",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      title: "Configuration & Automation",
      desc: "Automate erasure workflows, print labels with device details for tracking, and customize USB port names for easy identification.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "ERP & API Integration",
      desc: "Cloud-based API for report transfer into IT Asset Management software. Connects with Razor & MakorERP for seamless data flow.",
      icon: <RefreshCcw className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: "Smartphone Eraser | Secure iOS & Android Data Destruction | D-Secure",
          description: "Certified data erasure software for ITADs and mobile retailers. Permanently wipe iPhones, iPads, and Android devices with 50+ tests and audit-ready reports.",
          keywords: "mobile eraser, smartphone data destruction, iPhone wiping software, android secure erase, ITAD mobile processing, NIST 800-88 mobile",
          canonicalUrl: "https://dsecuretech.com/products/smartphone-eraser",
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
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
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
        <section id="overview" className="pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                    <CheckCircle className="w-4 h-4" />
                    Certified Mobile Data Erasure
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
                    Smartphone{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    The enterprise standard for high-volume mobile device sanitization. 
                    Permanently wipe iOS & Android devices beyond forensic recovery.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
                    >
                      Start Free Trial
                    </Link>
                    <button
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-200 bg-white text-emerald-800 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all"
                    >
                      View Mobile Standards
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Laptop + USB connected devices visual */}
              <Reveal delayMs={100}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse"></div>
                  <div className="relative max-w-[520px] mx-auto lg:mx-0">
                    {/* ── LAPTOP ── */}
                    <div className="relative bg-slate-800 rounded-t-2xl p-1 border-4 border-slate-700 shadow-2xl">
                      {/* Laptop screen */}
                      <div className="bg-slate-950 rounded-t-xl p-5 min-h-[220px]">
                        {/* D-Secure software UI on screen */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                          <span className="ml-2 text-[10px] text-slate-500 font-mono">D-Secure Smartphone Eraser v4.2</span>
                        </div>
                        {/* Device slots grid */}
                        <div className="grid grid-cols-3 gap-2">
                          {/* Device 1 — wiping */}
                          <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">iPhone 15</p>
                            <p className="text-emerald-400 text-xs font-bold mt-1">87%</p>
                            <div className="h-1 bg-slate-700 rounded-full mt-1"><div className="h-1 bg-emerald-400 rounded-full w-[87%] animate-pulse"></div></div>
                          </div>
                          {/* Device 2 — wiping */}
                          <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">Galaxy S24</p>
                            <p className="text-emerald-400 text-xs font-bold mt-1">42%</p>
                            <div className="h-1 bg-slate-700 rounded-full mt-1"><div className="h-1 bg-emerald-400 rounded-full w-[42%] animate-pulse"></div></div>
                          </div>
                          {/* Device 3 — complete */}
                          <div className="bg-teal-900/30 border border-teal-500/20 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">Pixel 8</p>
                            <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mt-1" />
                            <p className="text-[8px] text-emerald-400 font-bold mt-0.5">DONE</p>
                          </div>
                        </div>
                        {/* Status bar */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] text-slate-400 font-mono">3 devices connected • NIST 800-88</span>
                          <span className="text-[9px] text-emerald-400 font-bold">● ACTIVE</span>
                        </div>
                      </div>
                    </div>
                    {/* Laptop base/hinge */}
                    <div className="bg-gradient-to-b from-slate-600 to-slate-500 h-3 rounded-b-lg mx-4 shadow-lg"></div>
                    <div className="bg-slate-400/60 h-1.5 rounded-b-xl mx-8"></div>

                    {/* ── USB CABLES + PHONES ── */}
                    <div className="flex justify-around mt-6 px-2">
                      {/* Phone 1 with USB line */}
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-emerald-400 animate-pulse"></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-slate-700 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-emerald-400 mb-1" />
                          <div className="text-[8px] text-emerald-400 font-bold">87%</div>
                          <div className="h-0.5 bg-slate-600 rounded-full w-8 mt-1"><div className="h-0.5 bg-emerald-400 rounded-full w-[87%]"></div></div>
                        </div>
                      </div>
                      {/* Phone 2 with USB line */}
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-emerald-400 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-slate-700 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-emerald-400 mb-1" />
                          <div className="text-[8px] text-emerald-400 font-bold">42%</div>
                          <div className="h-0.5 bg-slate-600 rounded-full w-8 mt-1"><div className="h-0.5 bg-emerald-400 rounded-full w-[42%]"></div></div>
                        </div>
                      </div>
                      {/* Phone 3 with USB line */}
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-teal-400"></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-teal-600/50 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-teal-400 mb-1" />
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <div className="text-[7px] text-emerald-400 font-bold mt-0.5">DONE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Efficiency At Scale</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  A high-speed, automated workflow designed for ITADs, refurbishers, and retailers processing 1000s of devices daily.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-4 lg:gap-8">
              {[
                { step: "01", title: "Connect", desc: "Plug in up to 40 devices per workstation using standard USB hubs.", icon: <Smartphone className="w-6 h-6" /> },
                { step: "02", title: "Config", desc: "Software auto-detects model, OS, and IMEI metadata instantly.", icon: <Settings className="w-6 h-6" /> },
                { step: "03", title: "Erase", desc: "Run certified erasure in parallel across all connected devices.", icon: <Zap className="w-6 h-6" /> },
                { step: "04", title: "Verify", desc: "Generate tamper-proof reports and print identification labels.", icon: <CheckCircle className="w-6 h-6" /> },
              ].map((item) => (
                <Reveal key={item.title} delayMs={Number.parseInt(item.step) * 100}>
                  <div className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all group">
                    <span className="absolute top-6 right-6 text-4xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY BENEFITS ================= */}
        <section id="benefits" className="py-20 lg:py-32 bg-slate-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Designed for Performance</h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  Handle the complexities of mobile asset disposition with a solution that prioritizes security and speed.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyBenefits.map((benefit) => (
                <Reveal key={benefit.title} delayMs={keyBenefits.indexOf(benefit) * 100}>
                  <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STANDARDS ================= */}
        <section id="standards" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    Compliant with 14+ <br />
                    <span className="text-emerald-700">Global Standards</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Choose from a wide array of internationally recognized data erasure algorithms to meet your specific regional or industry compliance requirements.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "NIST 800-88 Clear",
                      "NIST 800-88 Purge",
                      "IEEE 2883:2022 Clear",
                      "IEEE 2883:2022 Purge",
                      "DoD 5220.22-M (3 Pass)",
                      "DoD 5220.22-M ECE (7 Pass)",
                      "Peter Gutmann (35 Pass)",
                      "B. Schneier's Algorithm",
                      "British HMG IS5 (3 Pass)",
                      "US Army AR 380-19",
                      "US Air Force AFSSI-5020",
                      "Native OS Erasure",
                    ].map((std) => (
                      <div key={std} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                        <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {std}
                      </div>
                    ))}
                  </div>
                  <button className="text-emerald-700 font-bold flex items-center gap-2 hover:gap-3 transition-all pt-4">
                    View Technical Specifications <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="grid grid-cols-2 gap-6 p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                   {features.map((feat) => (
                     <div key={feat.title} className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
                          {feat.icon}
                        </div>
                        <h4 className="font-bold text-slate-900">{feat.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                     </div>
                   ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-20 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-600">Common questions about Smartphone Eraser deployment.</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "How many devices can be erased simultaneously?",
                  a: "D-Secure Smartphone Eraser supports parallel processing of up to 40 devices simultaneously on a single workstation. You can have multiple workstations to increase simultaneous erasure capacity, all managed via a central cloud console.",
                },
                {
                  q: "Does it support eSIM un-enrollment?",
                  a: "Yes, our software supports eSIM erasure — it specifically identifies and permanently removes eSIM profiles and cellular configurations during the data destruction process, ensuring the device is fully carrier-agnostic for resale.",
                },
                {
                  q: "Can I erase locked iPhones or devices with broken screens?",
                  a: "Yes, you can erase locked iPhones — the lock will remain post-erasure. For devices with broken screens or in recovery modes, our Linux-based (Barebone) edition can perform erasure and diagnostics without requiring screen interaction.",
                },
                {
                  q: "What deployment options are available?",
                  a: "D-Secure Mobile Eraser is available as a Windows application and a Barebone hardware (Linux-based) edition. The Linux edition supports custom USB port naming, broken screen devices, and dedicated hardware deployment for high-throughput environments.",
                },
                {
                  q: "Does it detect FMIP, FRP, MDM & Carrier Lock status?",
                  a: "Yes, the software retrieves both IMEI 1 & IMEI 2 and checks Find My iPhone (FMIP), Factory Reset Protection (FRP), MDM supervision status, ESN status, and carrier lock status before erasure.",
                },
                {
                  q: "Is there a per-device license fee?",
                  a: "Our application does not consume another license if you perform the same process (erasure or diagnostics) within 30 days on the same device, making it extremely cost-effective for re-testing or troubleshooting.",
                },
                {
                  q: "Can I install the app on multiple machines?",
                  a: "Yes, you can install the application on multiple machines and perform erasure and diagnostics simultaneously. The cloud console manages license distribution and maintains a central repository of all reports.",
                },
              ].map((faq, i) => (
                <Reveal key={faq.q} delayMs={i * 50}>
                  <details className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section id="contact" className="py-20 lg:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <Reveal>
              <div className="relative bg-emerald-600 rounded-[3rem] p-10 lg:p-20 text-center overflow-hidden">
                {/* Background patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-10 w-96 h-96 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                  <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-300 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                    Scale Your Mobile Disposal Business Today
                  </h2>
                  <p className="text-lg lg:text-xl text-emerald-50 leading-relaxed">
                    Join leading ITADs and mobile retailers using D-Secure to process thousands of devices with 100% data security guarantee.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto bg-white text-emerald-700 font-bold px-10 py-5 rounded-2xl hover:bg-emerald-50 transition-all shadow-xl"
                    >
                      Request a Trial Account
                    </Link>
                    <button className="w-full sm:w-auto border border-emerald-400 text-white font-bold px-10 py-5 rounded-2xl hover:bg-emerald-700 transition-all">
                      Talk To Sales
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default SmartphoneEraserPage;
