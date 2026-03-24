import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  TagIcon,
  ServerIcon,
  ClipboardIcon,
} from "@/components/FlatIcons";
import {
  Shield,
  Eraser,
  Activity,
  Smartphone,
  CheckCircle,
  Zap,
  Settings,
  ChevronDown,
  Cloud,
  RefreshCcw,
  Globe,
  Cpu,
  Layers,
  Database,
  Lock,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  Workflow,
  Layout
} from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { ProductContactForm } from "@/components/forms";
import Reveal from "../components/Reveal";
import SEOHead from "../components/SEOHead";
import ThemeAwareLogo from "../components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";

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
    const scrollPosition = globalThis.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "erase-types", "compliance", "platforms", "features", "use-cases", "faq", "contact"];
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
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
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
        }),
      );
    };
  }, [isNavVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      globalThis.scrollTo({
        top: id === "overview" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const downloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "https://assets.dsecuretech.com/pdf/DSec-Mobile-Eraser-Datasheet.pdf";
    link.download = "DSec-Mobile-Eraser-Datasheet.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "erase-types", label: "Erase Types" },
    { id: "compliance", label: "Compliance" },
    { id: "platforms", label: "Platforms" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const eraseTypes = [
    {
      title: "eSIM Erasure",
      desc: "Securely remove eSIM profiles and associated sensitive carrier data without affecting physical hardware.",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "App Data & Cache",
      desc: "Wipe sensitive application data, chat histories, and cached credentials that standard factory resets often miss.",
      icon: <Layers className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Call Logs & Messages",
      desc: "Permanent destruction of private communication logs, SMS, and multimedia messages.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Internet History",
      desc: "Clean browser history, cookies, and saved login data to prevent identity theft.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Media & Cloud Traces",
      desc: "Erase locally stored media and clear traces of connected cloud storage services.",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Locked Device Reset",
      desc: "Bypass and reset locked iOS/Android devices for secure data disposal (available on Linux edition).",
      icon: <Lock className="w-8 h-8" />,
      color: "from-slate-700 to-slate-900",
    },
  ];

  const useCases = [
    {
      title: "Mobile Trade-in & Buyback",
      desc: "Guarantee 100% data sanitization for used devices before they are resold or refurbished in secondary markets.",
      icon: <RefreshCcw className="w-6 h-6" />,
    },
    {
      title: "Corporate Device Exit",
      desc: "Securely wipe employee devices when they leave the organization or when hardware is being reallocated.",
      icon: <ServerIcon className="w-6 h-6" />,
    },
    {
      title: "ITAD & Recycling",
      desc: "Compliant erasure for large volumes of retired mobile assets in bulk-processing environments.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Individual Privacy",
      desc: "Personal users can safeguard their identity and banking data before selling heart-to-heart devices.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  const platforms = [
    {
      name: "iOS",
      versions: "iOS v7 & above (Eraser)",
      icon: (
        <svg className="w-12 h-12 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      name: "Android",
      versions: "Android OS v5 & above",
      icon: (
        <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414C17.0673 15.3414 16.6961 14.9702 16.6961 14.5145C16.6961 14.0588 17.0673 13.6876 17.523 13.6876C17.9787 13.6876 18.3499 14.0588 18.3499 14.5145C18.3499 14.9702 17.9787 15.3414 17.523 15.3414ZM6.47702 15.3414C6.02131 15.3414 5.65011 14.9702 5.65011 14.5145C5.65011 14.0588 6.02131 13.6876 6.47702 13.6876C6.93272 13.6876 7.30392 14.0588 7.30392 14.5145C7.30392 14.9702 6.93272 15.3414 6.47702 15.3414ZM17.9366 10.6622L19.7401 7.53835C19.8643 7.32332 19.7909 7.04944 19.5759 6.92523C19.3609 6.80102 19.087 6.87441 18.9628 7.08944L17.135 10.2559C15.6888 9.59604 13.8837 9.17244 12 9.17244C10.1163 9.17244 8.3112 9.59604 6.86503 10.2559L5.03723 7.08944C4.91302 6.87441 4.63914 6.80102 4.42411 6.92523C4.20908 7.04944 4.13569 7.32332 4.25990 7.53835L6.06341 10.6622C3.12461 12.234 1.13745 15.2115 1.05479 18.7301H22.9452C22.8625 15.2115 20.8753 12.234 17.9366 10.6622Z" />
        </svg>
      ),
    },
    {
      name: "Deployment",
      versions: "Windows Edition & Barebone (Linux)",
      icon: <ServerIcon className="w-12 h-12 text-blue-600" />,
    },
  ];

  const moreFeatures = [
    {
      title: "Unified iOS & Android",
      desc: "Single application to securely erase data from both iOS and Android devices, including tablets and eSIM profiles.",
      icon: <Layout className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Cloud Console Control",
      desc: "Centralized dashboard for user management, license distribution, and audit-ready report storage.",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "ERP/API Connectivity",
      desc: "Integrated with industry-leading ERPs (Macro/Razor) and a cloud API for seamless data flow into your ITAM system.",
      icon: <Workflow className="w-6 h-6" />,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Automatic Verification",
      desc: "Every erasure is automatically verified and generates a tamper-proof certificate beyond the scope of recovery.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Batch Processing",
      desc: "Process up to 40 mobile devices simultaneously on a single workstation to maximize productivity.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "IMEI 1 & 2 Retrieval",
      desc: "Automatically fetch core hardware identifiers including IMEI 1, IMEI 2, ESN, and Serial Numbers.",
      icon: <TagIcon className="w-5 h-5" />,
    },
    {
      title: "Label Printing",
      desc: "Automated label generation with device details for effortless tracking in large-scale warehouses.",
      icon: <FileCheck className="w-5 h-5" />,
    },
    {
      title: "Customizable Reports",
      desc: "Add your company logo and watermark to tamper-proof PDF, CSV, and XML reports.",
      icon: <ClipboardIcon className="w-5 h-5" />,
    }
  ];


  return (
    <>
      <SEOHead seo={getSEOForPage("smartphone-eraser")} />

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
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <UpcomingBadge className="mb-4" />

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
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
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <button
                      onClick={downloadCatalog}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Monitor + Hub + 5 Phones Visual */}
              <Reveal delayMs={100}>
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative flex flex-col items-center scale-[0.8] lg:scale-90 origin-top">

                    {/* ── MONITOR ── */}
                    <div className="w-[340px] h-[220px] bg-slate-800 rounded-2xl p-2.5 border-4 border-slate-700 shadow-2xl relative z-20">
                      <div className="w-full h-full bg-white rounded-lg overflow-hidden relative flex flex-col items-center justify-center border border-slate-200">
                        {/* Binary Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-mono text-[8px] leading-[10px] break-all overflow-hidden p-1">
                          {new Array(10).fill("101010101010101010101010101010101010101010101010101010").join("\n")}
                        </div>

                        {/* Heartbeat Line (Animates across) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
                          <svg className="w-full h-24 text-emerald-600" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path
                              d="M0 50 L150 50 L160 20 L175 80 L190 20 L200 80 L210 50 L400 50"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="animate-pulse"
                              strokeDasharray="400"
                              strokeDashoffset="400"
                              style={{ animation: 'dash 3s linear infinite' }}
                            />
                          </svg>
                        </div>

                        {/* Central Shield + Eraser */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="relative w-20 h-24 flex items-center justify-center">
                            <Shield className="w-full h-full text-emerald-600 fill-emerald-50/10" strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center pt-2">
                              <Eraser className="w-10 h-10 text-emerald-600" />
                            </div>
                          </div>
                          <div className="mt-4 font-black text-[14px] text-slate-800 tracking-wider">
                            Smartphone Eraser
                          </div>
                        </div>
                      </div>

                      {/* Monitor Stand */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-8 h-12 bg-slate-700"></div>
                        <div className="w-32 h-3 bg-slate-800 rounded-full border-t border-slate-600"></div>
                      </div>
                    </div>

                    {/* ── CABLE FROM MONITOR TO HUB ── */}
                    <div className="w-0.5 h-10 bg-slate-400 mt-12 relative z-10 box-border border-r-2 border-slate-300"></div>

                    {/* ── HUB ── */}
                    <div className="w-32 h-10 bg-white border-2 border-slate-300 rounded-lg shadow-md flex items-center justify-around px-2 relative z-20">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3 h-1.5 bg-slate-200 rounded-sm border border-slate-300"></div>
                      ))}
                    </div>

                    {/* ── CABLES FROM HUB TO PHONES (SVG) ── */}
                    <div className="relative w-full h-12 -mt-2">
                      <svg className="w-full h-full stroke-slate-400 fill-none" preserveAspectRatio="none">
                        <path d="M260 0 C 260 20, 60 20, 60 40" />
                        <path d="M260 0 C 260 20, 160 20, 160 40" />
                        <path d="M260 0 C 260 20, 260 20, 260 40" />
                        <path d="M260 0 C 260 20, 360 20, 360 40" />
                        <path d="M260 0 C 260 20, 460 20, 460 40" />
                      </svg>
                    </div>

                    {/* ── FIVE PHONES ── */}
                    <div className="flex justify-between w-[520px] px-2 -mt-4">
                      {[
                        { type: 'erase', fill: 85 },
                        { type: 'diag', fill: 40 },
                        { type: 'erase', fill: 100 },
                        { type: 'diag', fill: 65 },
                        { type: 'erase', fill: 20 }
                      ].map((phone, i) => (
                        <div key={`${phone.type}-${i}`} className="flex flex-col items-center">
                          <div className="w-20 h-32 bg-white rounded-xl border-2 border-slate-300 p-1.5 shadow-lg relative overflow-hidden group/phone hover:border-emerald-400 transition-colors">
                            {/* Filling animation */}
                            <div
                              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500/40 to-emerald-400/10 rounded-b-lg transition-all duration-1000`}
                              style={{ height: `${phone.fill}%` }}
                            ></div>

                            <div className="relative h-full flex flex-col items-center justify-center">
                              {phone.type === 'erase' ? (
                                <div className="relative w-10 h-12 flex items-center justify-center">
                                  <Shield className="w-full h-full text-emerald-600 opacity-80" strokeWidth={1} />
                                  <div className="absolute inset-0 flex items-center justify-center pt-1">
                                    <Eraser className="w-4 h-4 text-emerald-600" />
                                  </div>
                                </div>
                              ) : (
                                <Activity className="w-8 h-8 text-emerald-600 opacity-80 animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CSS for dash animation */}
                  <style>{`
                    @keyframes dash {
                      from { stroke-dashoffset: 400; }
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
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
                { step: "03", title: "Erase", desc: "Run regulatory erasure in parallel across all connected devices.", icon: <Zap className="w-6 h-6" /> },
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

        {/* ================= ERASE TYPES ================= */}
        <section id="erase-types" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Complete Sanitization</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Go beyond standard factory resets. Our solution wipes every trace of sensitive data to ensure absolute privacy.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eraseTypes.map((type, i) => (
                <Reveal key={type.title} delayMs={i * 100}>
                  <div className="group relative p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-2xl transition-all h-full overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.color} opacity-[0.03] -mr-16 -mt-16 rounded-full transition-all group-hover:scale-110`}></div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{type.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{type.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE (was STANDARDS) ================= */}
        <section id="compliance" className="py-20 lg:py-32 bg-slate-900 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]"></div>
          </div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/20">
                    Audit-Ready Implementation
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                    Global Certification <br />
                    <span className="text-emerald-500">& Compliance</span>
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Our methods are regulatory and tested by global bodies to meet the most stringent data sanitization requirements across all industries.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "NIST 800-88 Clear",
                      "NIST 800-88 Purge",
                      "IEEE 2883:2022 Clear",
                      "IEEE 2883:2022 Purge",
                      "US DoD 5220.22-M (3 Pass)",
                      "US DoD 5220.22-M ECE (7 Pass)",
                      "Peter Gutmann (35 Pass)",
                      "B. Schneier's Algorithm (7 Pass)",
                      "British HMG IS5 (3 Pass)",
                      "US Army AR 380-19",
                      "US Air Force AFSSI-5020",
                      "Common Criteria (EAL 2)",
                      "ISO 27001 Compliant",
                    ].map((std) => (
                      <div key={std} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                        <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {std}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm shadow-2xl">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Tamper-Proof Certificates</h3>
                    <p className="text-slate-400 max-w-sm">
                      Each erasure generates a verifiable JSON or PDF certificate signed with a cryptographical hash for complete audit readiness.
                    </p>
                    <div className="pt-6 border-t border-white/5 w-full grid grid-cols-2 gap-8 text-left">
                       <div>
                          <p className="text-xs text-slate-500 font-bold mb-2 tracking-widest">OUTPUT FORMATS</p>
                          <p className="text-sm text-slate-300">PDF, CSV, XML, JSON</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 font-bold mb-2 tracking-widest">VALIDITY</p>
                          <p className="text-sm text-emerald-500">Global Legal Compliance</p>
                       </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PLATFORMS ================= */}
        <section id="platforms" className="py-20 lg:py-32 bg-emerald-50/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Platform Support</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Cross-platform compatibility ensuring no device is left vulnerable.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 100}>
                  <div className="p-8 rounded-3xl bg-white border border-emerald-100 shadow-xl hover:shadow-2xl transition-all text-center group">
                    <div className="w-20 h-20 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.name}</h3>
                    <p className="text-emerald-700 font-semibold text-sm mb-4">{p.versions}</p>
                    <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full"></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Advanced Capabilities</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Powered by next-gen technology to automate your mobile asset circular economy.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {moreFeatures.map((feat, i) => (
                <Reveal key={feat.title} delayMs={i * 100}>
                  <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Circular Economy Enabler</h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  From single devices to warehouse-level processing, we provide the backbone for secure mobile recycling.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((use, i) => (
                <Reveal key={use.title} delayMs={i * 100}>
                  <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                    <div className="w-16 h-16 flex-shrink-0 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                      {use.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{use.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{use.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-20 lg:py-32 bg-emerald-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Common Questions</h2>
                <p className="text-lg text-slate-600">Expert answers for your security concerns.</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
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

        {/* ================= CONTACT / CTA ================= */}
        <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
           {/* Subtle background patterns */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
              source="Smartphone Eraser Page Contact"
              solutionType="mobile-erasure"
              title="Scale Your Mobile Disposal Business Today"
              subtitle="Join leading ITADs and mobile retailers using D-Secure to process thousands of devices with 100% data security guarantee."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default SmartphoneEraserPage;
