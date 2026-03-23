import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  GlobeIcon,
  GearIcon,
  ClipboardIcon,
  ServerIcon,
} from "@/components/FlatIcons";
import {
  Zap,
  Database,
  Monitor,
  RefreshCcw,
} from "lucide-react";
import { ProductContactForm } from "@/components/forms/ProductContactForm";
import { getSEOForPage } from "@/utils/seo";

const AssetReimagingPage: React.FC = memo(function AssetReimagingPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "capabilities", label: "Capabilities" },
    { id: "workflow", label: "Workflow" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;

      // Show nav after scrolling past hero section (approx 400px)
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      // Only dispatch event to hide/show main navbar on desktop (md+) screens
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      // Find current active section
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
      // Reset main navbar visibility on unmount (only on desktop)
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
      const offset = 100; // Account for sticky nav height
      const elementPosition =
        element.getBoundingClientRect().top + globalThis.scrollY;
      globalThis.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const faqs = [
    {
      q: "Does Asset Reimaging include Windows licenses?",
      a: "No, D-Secure does not sell or distribute Microsoft Windows licenses. Customers can obtain licenses through authorized third-party providers like Blair Tech under the Third-Party Refurbisher Program."
    },
    {
      q: "Can I deploy custom Windows images?",
      a: "Yes, the system supports deployment of your own standardized Windows 10/11 images, including custom drivers and policy configurations."
    },
    {
      q: "Is technician interaction required during reimaging?",
      a: "The process is designed to be zero-touch. Once the erasure workflow triggers the PXE boot, the reimaging applies automatically without manual intervention."
    },
    {
      q: "How is the reimaging event reported?",
      a: "All reimaging events are logged in the Management Portal, providing a unified audit trail that connects the erasure event with the successful reimaging of the device."
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("asset-reimaging")} />

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
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
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

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* ================= HERO SECTION ================= */}
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Erase → Reimage → Redeploy
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Automated Windows <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Asset Reimaging
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Seamlessly extend secure data erasure into automated OS deployment. Transform wiped stock into ready-to-use inventory with zero technician interaction.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                    <a
                      href="#capabilities"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("capabilities");
                      }}
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      View Capabilities
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - 3D Product Box */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-200/30 blur-3xl"></div>

                  {/* Floating Particles */}
                  <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-40"></div>
                  <div className="absolute top-[20%] right-[12%] w-1.5 h-1.5 bg-teal-400 rounded-full animate-[ping_2.5s_ease-in-out_infinite_0.5s] opacity-40"></div>
                  <div className="absolute bottom-[15%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2.8s_ease-in-out_infinite_1s] opacity-40"></div>
                  <div className="absolute bottom-[20%] right-[15%] w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[ping_3.2s_ease-in-out_infinite_0.3s] opacity-40"></div>

                  {/* 3D Product Box Container */}
                  <div
                    className="relative animate-[float_4s_ease-in-out_infinite]"
                    style={{
                      transformStyle: "preserve-3d",
                      animation: "float 4s ease-in-out infinite",
                    }}
                  >
                    {/* Glow Behind Box */}
                    <div className="absolute inset-0 bg-emerald-500/40 blur-3xl rounded-3xl scale-110"></div>

                    {/* Main Box - Front Face */}
                    <div
                      className="relative w-[220px] h-[280px] lg:w-[280px] lg:h-[360px] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateY(-12deg) rotateX(8deg)",
                        boxShadow:
                          "35px 35px 70px rgba(0,0,0,0.4), -5px -5px 25px rgba(255,255,255,0.1), inset 0 0 100px rgba(255,255,255,0.05)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Top Shine Effect */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>

                      {/* Side Shadow (3D Effect) */}
                      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent"></div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 lg:p-8">
                        {/* D-Secure Badge */}
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                          <span className="text-white/80 text-[10px] lg:text-xs font-semibold tracking-widest uppercase">
                            D-Secure
                          </span>
                        </div>

                        {/* Main Icon */}
                        <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 lg:mb-6 border border-white/20 shadow-inner">
                          <RefreshCcw className="w-10 h-10 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
                        </div>

                        {/* Product Name */}
                        <h3 className="text-white text-xl lg:text-3xl font-bold tracking-tight text-center mb-1 lg:mb-2">
                          Asset <br /> Reimaging
                        </h3>

                        {/* Tagline */}
                        <p className="text-white/70 text-[10px] lg:text-xs text-center tracking-wide uppercase mb-8 lg:mb-10">
                          Zero-Touch OS Deployment
                        </p>

                        {/* Bottom Badge */}
                        <div className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border border-white/20">
                            <CheckIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-300" />
                            <span className="text-white/90 text-[9px] lg:text-[11px] font-semibold">
                              Regulatory Reimaging
                            </span>
                          </div>
                        </div>

                        {/* Decorative Lines */}
                        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                      </div>

                      {/* Main Box Edge Shine */}
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>

                      {/* Animated Pulse Ring */}
                      <div className="absolute inset-0 border-2 border-white/10 rounded-2xl animate-pulse"></div>
                    </div>

                    {/* Right Side Face (3D) */}
                    <div
                      className="absolute top-0 right-0 w-[30px] lg:w-[40px] h-full bg-gradient-to-l from-emerald-800 to-emerald-700 rounded-r-lg"
                      style={{
                        transform:
                          "rotateY(90deg) translateZ(0px) translateX(15px)",
                        transformOrigin: "left center",
                      }}
                    ></div>
                    
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      {/* Value Proposition */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Why Reimaging Matters More Than Ever
            </h2>
            <p className="text-lg text-slate-600">
              Transforming wiped hardware into "ready-to-sell" inventory is the ultimate margin engine for processing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Higher Resale Value",
                desc: "Ship fully imaged, ready-to-boot devices that command premium prices in marketplaces.",
                icon: <Zap className="w-6 h-6" />
              },
              {
                title: "Reduced Processing Cost",
                desc: "Eliminate manual technician steps, allowing your team to focus on higher-value tasks.",
                icon: <GearIcon className="w-6 h-6" />
              },
              {
                title: "Marketplace Trust",
                desc: "Deliver consistent, standardized builds that lower dispute and return rates.",
                icon: <ShieldIcon className="w-6 h-6" />
              }
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  Key Capabilities for <br />High-Volume Processing
                </h2>
                <div className="space-y-4">
                  {[
                    "Automated PXE / WinPE boot initiation from erasure workflow",
                    "Windows 10/11 system image deployment at scale",
                    "D-Secure Asset Reimaging: Regulatory OS deployment and asset configuration for ITAD and enterprise environments.",
                    "Third-party Windows license support integration",
                    "Zero-touch, technician-free automated imaging",
                    "Unified audit reporting across erase + reimage events"
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1">
                        <CheckIcon className="w-4 h-4 text-emerald-800" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <h3 className="text-2xl font-bold">A Unified Management Hub</h3>
                  <p className="text-slate-400 leading-relaxed">
                    View every lifecycle event in one place. Our management portal doesn't just log wipes—it tracks the entire journey from secure erasure to successful OS deployment.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-2xl font-bold text-white mb-1">Erase</p>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Regulatory Wipe</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                      <p className="text-2xl font-bold text-emerald-400 mb-1">Reimage</p>
                      <p className="text-xs text-emerald-400/60 uppercase tracking-widest">OS Deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Zero-Touch Automation</h2>
            <p className="text-lg text-slate-400">
              The entire process is integrated into a single processing line. No workflow switching required.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {/* Step Lines for Desktop */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 hidden lg:block -translate-y-12"></div>
            
            {[
              {
                step: "01",
                title: "Regulatory Erasure",
                desc: "Device is securely erased using standards-compliant algorithms.",
                icon: <ShieldIcon className="w-8 h-8" />
              },
              {
                step: "02",
                title: "PXE Boot Trigger",
                desc: "Workflow automatically triggers PXE boot into WinPE environment.",
                icon: <Monitor className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Automated Reimage",
                desc: "System applies your Windows image, drivers, and policy configs.",
                icon: <RefreshCcw className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Unified Reporting",
                desc: "All events are logged centrally for a complete audit trail.",
                icon: <ClipboardIcon className="w-8 h-8" />
              }
            ].map((item) => (
              <Reveal key={item.step} animation="slide-up">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-emerald-500 font-mono font-bold tracking-widest">{item.step}</span>
                    <h3 className="text-xl font-bold mt-2 mb-4">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "ITADs",
                list: [
                  "Automate imaging at scale",
                  "Increase throughput",
                  "Ready-to-ship units"
                ],
                icon: <Database className="w-6 h-6" />
              },
              {
                title: "Enterprise IT",
                list: [
                  "Standardize Windows fleets",
                  "Support redeployment",
                  "Zero manual reimages"
                ],
                icon: <GlobeIcon className="w-6 h-6" />
              },
              {
                title: "Leasing Providers",
                list: [
                  "Consistent end-of-lease returns",
                  "Faster turnaround",
                  "Audit-ready inventory"
                ],
                icon: <ServerIcon className="w-6 h-6" />
              }
            ].map((group) => (
              <div key={group.title} className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 space-y-6 hover:bg-emerald-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">{group.title}</h3>
                <ul className="space-y-3">
                  {group.list.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700">
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">Everything you need to know about automated reimaging.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Reveal key={faq.q}>
                <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:border-emerald-300">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-900">{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
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

      {/* Contact Form Section */}
      <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <ProductContactForm 
            source="Asset Reimaging Page Contact"
            solutionType="asset-reimaging"
            title="Accelerate Your Processing Margin"
            subtitle="Request a sandbox demo or speak with our high-volume processing experts about your reimaging workflow requirements."
          />
        </div>
      </section>
      </div>
    </>
  );
});

export default AssetReimagingPage;
