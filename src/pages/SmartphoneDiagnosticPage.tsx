import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Zap,
  Smartphone,
  Shield,
  FileText,
  Settings,
  ChevronDown,
  Globe,
  Wifi,
  Battery,
  Camera,
  Monitor,
  Cpu,
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

const SmartphoneDiagnosticPage = memo(() => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Handle scroll for sticky nav visibility and active section tracking
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsNavVisible(scrollPosition > 400);

    const sections = ["overview", "tests", "grading", "features", "faq", "contact"];
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
    { id: "tests", label: "50+ Tests" },
    { id: "grading", label: "Grading" },
    { id: "features", label: "Features" },
    { id: "faq", label: "FAQ" },
  ];

  const diagItems = [
    { name: "Display Touch", status: "OK", color: "text-emerald-600" },
    { name: "Battery Health", status: "94%", color: "text-emerald-600" },
    { name: "MDM Status", status: "OFF", color: "text-emerald-600" },
    { name: "Face ID", status: "FAIL", color: "text-red-500" },
  ];

  const featItems = [
    { title: "Parallel Diagnostics", desc: "Batch process up to 40 devices simultaneously on a single workstation.", icon: <Zap className="w-8 h-8" /> },
    { title: "Customizable Workflows", desc: "Preconfigure workflows or select specific tests based on incoming inventory grade.", icon: <Settings className="w-8 h-8" /> },
    { title: "Audit Trail Reports", desc: "Verifiable reports indicating device functionality, locked status, and overall health.", icon: <FileText className="w-8 h-8" /> },
    { title: "Automated Device Setup", desc: "Android setup & debugging automated through QR code scanning for faster processing.", icon: <Smartphone className="w-8 h-8" /> },
    { title: "MDM & Lock Detection", icon: <Shield className="w-8 h-8" />, desc: "Instant detection of MDM supervision, FMIP, FRP, and Carrier locks." },
    { title: "ERP & API Ready", icon: <Globe className="w-8 h-8" />, desc: "Integrate diagnostic data directly into Razor, MakorERP, or custom ITAM systems." },
  ];

  const diagnosticTests = [
    { title: "Hardware", icon: <Cpu className="w-5 h-5" />, desc: "CPU, Memory, OTG, & Storage health check." },
    { title: "Display", icon: <Monitor className="w-5 h-5" />, desc: "Dead pixels, Touch sensitivity, & Brightness." },
    { title: "Battery", icon: <Battery className="w-5 h-5" />, desc: "Cycle count, Health %, & Battery Drain test." },
    { title: "Sensors", icon: <Activity className="w-5 h-5" />, desc: "Accelerometer, Gyroscope, & Proximity." },
    { title: "Wireless", icon: <Wifi className="w-5 h-5" />, desc: "Wi-Fi, Bluetooth, GPS, & 5G/LTE connectivity." },
    { title: "Multimedia", icon: <Camera className="w-5 h-5" />, desc: "Front/Rear cameras, Mic, & Speakers." },
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: "Smartphone Diagnostics | 50+ Automated Health Tests | D-Secure",
          description: "Comprehensive mobile diagnostic software for iOS & Android. Run 50+ automated tests, check IMEI status, detect MDM/FRP, and grade devices accurately.",
          keywords: "smartphone diagnostics, mobile test software, iPhone hardware check, android diagnostic tool, IMEI lookup, MDM detection, device grading",
          canonicalUrl: "https://dsecuretech.com/products/smartphone-diagnostic",
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

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50/30 to-slate-50">
        {/* ================= HERO SECTION ================= */}
        <section id="overview" className="pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold">
                    <Activity className="w-4 h-4" />
                    Professional Mobile Health Audit
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
                    Smartphone{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      Diagnostics
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Identify hardware flaws, software issues, and unlock statuses instantly. 
                    The most comprehensive diagnostic tool for second-hand device evaluation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-teal-700 transition-all hover:scale-105"
                    >
                      Analyze My Inventory
                    </Link>
                    <button
                      className="inline-flex items-center justify-center gap-2 border-2 border-teal-200 bg-white text-teal-800 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition-all"
                    >
                      See 50+ Tests
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Laptop + USB connected devices visual — Diagnostics */}
              <Reveal delayMs={100}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative max-w-[520px] mx-auto lg:mx-0">
                    {/* ── LAPTOP ── */}
                    <div className="relative bg-slate-800 rounded-t-2xl p-1 border-4 border-slate-700 shadow-2xl">
                      {/* Laptop screen */}
                      <div className="bg-slate-950 rounded-t-xl p-5 min-h-[220px]">
                        {/* D-Secure diagnostic software UI on screen */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                          <span className="ml-2 text-[10px] text-slate-500 font-mono">D-Secure Smartphone Diagnostics v3.1</span>
                        </div>
                        {/* Device diagnostics grid */}
                        <div className="grid grid-cols-3 gap-2">
                          {/* Device 1 — testing */}
                          <div className="bg-teal-900/40 border border-teal-500/30 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">iPhone 15 Pro</p>
                            <p className="text-teal-400 text-[9px] font-bold mt-1">32/50 tests</p>
                            <div className="h-1 bg-slate-700 rounded-full mt-1"><div className="h-1 bg-teal-400 rounded-full w-[64%] animate-pulse"></div></div>
                          </div>
                          {/* Device 2 — testing */}
                          <div className="bg-teal-900/40 border border-teal-500/30 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">Galaxy S24</p>
                            <p className="text-teal-400 text-[9px] font-bold mt-1">18/50 tests</p>
                            <div className="h-1 bg-slate-700 rounded-full mt-1"><div className="h-1 bg-teal-400 rounded-full w-[36%] animate-pulse"></div></div>
                          </div>
                          {/* Device 3 — graded */}
                          <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-lg p-2.5 text-center">
                            <Smartphone className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                            <p className="text-[9px] text-white/70 font-medium">Pixel 8</p>
                            <div className="bg-emerald-500/20 rounded-full px-2 py-0.5 mt-1 inline-block">
                              <span className="text-emerald-400 text-[10px] font-black">Grade A</span>
                            </div>
                          </div>
                        </div>
                        {/* Status bar */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[9px] text-slate-400 font-mono">3 devices connected • 50+ tests</span>
                          <span className="text-[9px] text-teal-400 font-bold">● SCANNING</span>
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
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-teal-400 animate-pulse"></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-slate-700 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-teal-400 mb-1" />
                          <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                          <div className="text-[7px] text-teal-400 font-bold mt-0.5">TESTING</div>
                        </div>
                      </div>
                      {/* Phone 2 with USB line */}
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-teal-400 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-slate-700 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-teal-400 mb-1" />
                          <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                          <div className="text-[7px] text-teal-400 font-bold mt-0.5">TESTING</div>
                        </div>
                      </div>
                      {/* Phone 3 with USB line */}
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-400 to-emerald-400"></div>
                        <div className="bg-slate-900 rounded-xl p-2 border-2 border-emerald-600/50 w-14 h-24 flex flex-col items-center justify-center shadow-lg">
                          <Smartphone className="w-5 h-5 text-emerald-400 mb-1" />
                          <span className="text-[9px] text-emerald-400 font-black">A</span>
                          <div className="text-[7px] text-emerald-400 font-bold">GRADED</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= 50+ TESTS ================= */}
        <section id="tests" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Complete Device Auditing</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Our software triggers 50+ automated and assisted tests to ensure every component works as expected before you resell or refurbish.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
               {diagnosticTests.map((test) => (
                 <Reveal key={test.title} delayMs={diagnosticTests.indexOf(test) * 50}>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 transition-all text-center group">
                       <div className="w-12 h-12 rounded-2xl bg-white text-teal-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 shadow-sm transition-transform">
                         {test.icon}
                       </div>
                       <h4 className="font-bold text-slate-900 mb-2">{test.title}</h4>
                       <p className="text-[11px] text-slate-500">{test.desc}</p>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ================= GRADING ================= */}
        <section id="grading" className="py-20 lg:py-32 bg-slate-900 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                    Intelligent <span className="text-teal-400">Device Grading</span> for Maximum Value
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Automate your valuation process. Our software assigns objective health grades based on test results, helping you monetize inventory with total transparency.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "IMEI 1 & 2 Metadata Retrieval",
                      "Find My iPhone (FMIP) / FRP Status",
                      "Carrier & Network Lock Detection",
                      "Jailbreak & Root Detection",
                      "Battery Cycle & Capacity Reports",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300">
                        <CheckIcon className="w-5 h-5 text-teal-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="relative p-1 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl overflow-hidden group">
                   <div className="bg-slate-900 p-8 lg:p-12 rounded-[1.6rem] relative">
                      <div className="text-center space-y-4">
                        <p className="text-teal-400 font-bold tracking-widest text-xs">GRADING REPORT</p>
                        <h3 className="text-6xl font-black text-white">A+</h3>
                        <p className="text-slate-400">Mint Condition • 100% Functional</p>
                        <div className="pt-8 grid grid-cols-2 gap-4 text-left">
                           <div className="p-4 bg-white/5 rounded-xl">
                              <p className="text-[10px] text-slate-500 font-bold mb-1">IMEI REGISTERED</p>
                              <p className="text-xs text-white">Clean / WhiteList</p>
                           </div>
                           <div className="p-4 bg-white/5 rounded-xl">
                              <p className="text-[10px] text-slate-500 font-bold mb-1">BATTERY SCORE</p>
                              <p className="text-xs text-white">Excellent (98%)</p>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Excellent Diagnostic Capabilities</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  One platform to test and evaluate thousands of devices per day with zero room for human error.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featItems.map((feat) => (
                <Reveal key={feat.title} delayMs={featItems.indexOf(feat) * 100}>
                  <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 hover:shadow-xl transition-all h-full">
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
                      {feat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-20 lg:py-32 bg-teal-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-600">Got questions? We have answers.</p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Can I choose which tests to perform?",
                  a: "Yes! Our application gives you complete freedom to select specific tests for certain batches or run the full 50+ test suite for a complete audit of premium devices.",
                },
                {
                  q: "Does it work for both Android and iOS?",
                  a: "Absolutely. D-Secure Diagnostic is a unified application that supports both platforms seamlessly. We support iOS v12.5.7+ and Android v5.0+.",
                },
                {
                  q: "How many devices can I test at once?",
                  a: "You can perform batch processing on up to 40 devices simultaneously on a single workstation.",
                },
                {
                  q: "Does it identify locked or jailbroken devices?",
                  a: "Yes, the software supports retrieval of IMEI 1 & 2, and detects Find My iPhone (FMIP), Factory Reset Protection (FRP), MDM status, ESN status, carrier locks, and jailbreak/root status.",
                },
                {
                  q: "Can I perform diagnostics on devices with broken screens?",
                  a: "Yes, our specialized Linux-based (Barebone) edition can perform hardware diagnostics even on devices with broken screens or those in recovery modes.",
                },
                {
                  q: "Are the diagnostic reports customizable?",
                  a: "Yes, you can customize the generated PDF, CSV, or XML reports with your company logo and watermark. All reports are verifiable and serve as proper audit trails.",
                },
              ].map((faq) => (
                <Reveal key={faq.q} delayMs={Number.parseInt(faq.q.length.toString()) * 5}>
                  <details className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center group-open:rotate-180 transition-transform">
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
              <div className="relative bg-teal-900 rounded-[3rem] p-10 lg:p-20 text-center overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                    Professional Grade Reports for Smarter Selling
                  </h2>
                  <p className="text-lg lg:text-xl text-teal-100/80 leading-relaxed">
                    Start certifying your mobile inventory with D-Secure and increase your residual value today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto bg-white text-teal-900 font-bold px-10 py-5 rounded-2xl hover:bg-teal-50 transition-all"
                    >
                      Get Started For Free
                    </Link>
                    <button className="w-full sm:w-auto border border-teal-400 text-white font-bold px-10 py-5 rounded-2xl hover:bg-teal-900 transition-all">
                      Watch Demo
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

export default SmartphoneDiagnosticPage;
