import React, { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import UpcomingBadge from "../components/ui/UpcomingBadge";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  ServerIcon,
} from "@/components/FlatIcons";
import { FileTextIcon, Monitor, Database, Zap } from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import { ProductContactForm } from "@/components/forms/ProductContactForm";

const VirtualMachineEraserPage: React.FC = memo(function VirtualMachineEraserPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "capabilities", label: "Capabilities" },
    { id: "use-cases", label: "Use Cases" },
    { id: "features", label: "Features" },
    { id: "standards", label: "Standards" },
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

  const scrollToSection = useCallback((sectionId: string) => {
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
  }, []);

  const capabilities = [
    {
      title: "Erase Multiple VMs",
      desc: "Securely wipe multiple virtual machines simultaneously across leading platforms like VMware ESXi and Microsoft Hyper-V.",
      icon: <Monitor className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Cloud Console",
      desc: "Centralized repository of VM erasure reports accessible anytime, maintaining a comprehensive audit trail.",
      icon: <CloudIcon className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Global Standards",
      desc: "Supports up to 18 globally recognized erasure methods including NIST 800-88 and US DoD 5220.22-M.",
      icon: <ShieldIcon className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Quick Deployment",
      desc: "Install on any Windows system to manage erasure of VMs hosted on ESXi or Hyper-V centrally.",
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
    },
  ];

  const features = [
    {
      title: "Tamper-proof Reports",
      desc: "Generates digitally signed PDF/XML reports with VM size, ID, MAC address and more.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "No License Expiry",
      desc: "Pay-per-use licenses that do not expire until they are used for erasure.",
      icon: <CheckIcon className="w-6 h-6" />,
    },
    {
      title: "Full VM Erasure",
      desc: "Wipes virtual hard drives, checkpoints, configuration settings, and runtime states.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Centralized Management",
      desc: "Option to create users and distribute erasure licenses across the organization.",
      icon: <GearIcon className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("virtual-machine-eraser")} />
      
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
        <section className="pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <UpcomingBadge />
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0 flex-nowrap">
                      <div className="flex-shrink-0 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200 shadow-sm h-10">
                        <Database className="w-4 h-4" />
                        Secure VM Data Sanitization
                      </div>
                    </div>
                  </div>

                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                    D-Secure{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Virtual Machine Eraser
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Permanently erase Virtual Machines hosted on VMware ESXi and Microsoft Hyper-V. 
                    Ensure 100% compliance with audit-ready tamper-proof reports.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {["VMware Ready", "Hyper-V", "NIST 800-88", "GDPR"].map((badge) => (
                      <div key={badge} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">{badge}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Request Early Access
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Floating Monitor with D-Secure Dashboard */}
              <Reveal delayMs={100}>
                <div
                  className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]"
                  style={{ perspective: "1000px" }}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl"></div>

                  {/* Orbiting Device Icons */}
                  <div className="absolute inset-0 hidden sm:block">
                    {[
                      {
                        top: "8%",
                        left: "12%",
                        label: "VMware",
                        icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2",
                        delay: "0s",
                      },
                      {
                        top: "10%",
                        right: "8%",
                        label: "Hyper-V",
                        icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                        delay: "0.6s",
                      },
                      {
                        bottom: "25%",
                        left: "5%",
                        label: "Cloud VM",
                        icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                        delay: "1.2s",
                      },
                      {
                        bottom: "18%",
                        right: "6%",
                        label: "Storage",
                        icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
                        delay: "0.3s",
                      },
                      {
                        top: "45%",
                        left: "2%",
                        label: "ESXi Host",
                        icon: "M21 12H3m18-6H3m18 12H3",
                        delay: "0.9s",
                      },
                      {
                        bottom: "8%",
                        left: "38%",
                        label: "Snapshot",
                        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                        delay: "1.5s",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="absolute group"
                        style={{
                          top: item.top,
                          left: item.left,
                          right: item.right,
                          bottom: item.bottom,
                        }}
                      >
                        <div
                          className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-xl shadow-lg border border-emerald-100 flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl hover:border-emerald-400"
                          style={{
                            animation: `deviceBob 3s ease-in-out infinite ${item.delay}`,
                          }}
                        >
                          <svg
                            className="w-4.5 h-4.5 lg:w-5 lg:h-5 text-emerald-800"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={item.icon}
                            />
                          </svg>
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] lg:text-[8px] font-medium text-slate-500 whitespace-nowrap">
                          {item.label}
                        </span>
                        {/* Connection line to center */}
                        <div
                          className="absolute top-1/2 left-1/2 w-6 lg:w-8 h-px bg-gradient-to-r from-emerald-300/40 to-transparent origin-left"
                          style={{
                            transform: `rotate(${item.right ? "180deg" : "0deg"})`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Main Monitor */}
                  <div
                    className="relative z-10"
                    style={{
                      animation: "monitorFloat 6s ease-in-out infinite",
                    }}
                  >
                    {/* Glow behind monitor */}
                    <div className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full"></div>

                    {/* Monitor frame */}
                    <div className="relative w-[230px] sm:w-[270px] lg:w-[330px]">
                      {/* Screen bezel */}
                      <div
                        className="bg-slate-900 rounded-t-xl sm:rounded-t-2xl p-1 sm:p-1.5 lg:p-2 shadow-2xl border border-slate-700/50"
                        style={{
                          boxShadow:
                            "0 15px 50px -10px rgba(0,0,0,0.4), 0 0 30px rgba(16,185,129,0.12)",
                        }}
                      >
                        {/* Screen content */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl overflow-hidden">
                          {/* Title bar */}
                          <div className="flex items-center justify-between px-3 py-1 bg-slate-800/80 border-b border-slate-700/50">
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-400 rounded-full"></div>
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-400 rounded-full"></div>
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-[6px] sm:text-[7px] lg:text-[8px] text-slate-500 font-medium">
                              D-Secure VM Console
                            </span>
                            <div className="w-6"></div>
                          </div>

                          {/* Dashboard content */}
                          <div className="p-2 sm:p-3 lg:p-3.5 space-y-2 sm:space-y-2.5">
                            {/* Top stats row */}
                            <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-emerald-400 font-bold text-[10px] sm:text-xs lg:text-base">
                                  1,240
                                </div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">
                                  VMs Wiped
                                </div>
                              </div>
                              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-teal-400 font-bold text-[10px] sm:text-xs lg:text-base">
                                  100%
                                </div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">
                                  Success Rate
                                </div>
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-1 sm:p-1.5 text-center">
                                <div className="text-cyan-400 font-bold text-[10px] sm:text-xs lg:text-base">
                                  18+
                                </div>
                                <div className="text-[5px] sm:text-[6px] lg:text-[7px] text-slate-500 uppercase">
                                  Standards
                                </div>
                              </div>
                            </div>

                            {/* Active erasure task */}
                            <div className="bg-slate-800/60 rounded-lg p-1.5 sm:p-2 border border-slate-700/40">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <ShieldIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                                  </div>
                                  <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-white font-medium">
                                    VM Erasure — NIST 800-88
                                  </span>
                                </div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  style={{
                                    width: "85%",
                                    animation:
                                      "progressGrow 3s ease-in-out infinite",
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-0.5">
                                <span className="text-[5px] sm:text-[6px] text-slate-500">
                                  28 of 32 VMs
                                </span>
                                <span className="text-[5px] sm:text-[6px] text-emerald-400 font-bold">
                                  85%
                                </span>
                              </div>
                            </div>

                            {/* Recent reports mini list */}
                            <div className="space-y-1">
                              {[
                                {
                                  name: "VM_Production_DB",
                                  status: "verified",
                                  time: "1m ago",
                                },
                                {
                                  name: "ESXi_Host_Alpha",
                                  status: "verified",
                                  time: "3m ago",
                                },
                              ].map((item) => (
                                <div
                                  key={item.name}
                                  className="flex items-center justify-between px-2 py-0.5 rounded bg-slate-800/40"
                                >
                                  <div className="flex items-center gap-1">
                                    <div
                                      className={`w-1 h-1 rounded-full ${item.status === "verified" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
                                    ></div>
                                    <span className="text-[6px] sm:text-[7px] text-slate-400">
                                      {item.name}
                                    </span>
                                  </div>
                                  <span className="text-[5px] sm:text-[6px] text-slate-600">
                                    {item.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monitor stand */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 sm:w-16 lg:w-20 h-3 sm:h-4 lg:h-5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-sm"></div>
                        <div className="w-20 sm:w-24 lg:w-28 h-1.5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @keyframes monitorFloat {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-8px); }
                    }
                    @keyframes deviceBob {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-5px); }
                    }
                    @keyframes progressGrow {
                      0%, 100% { width: 85%; }
                      50% { width: 90%; }
                    }
                  `}</style>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}
        <section id="capabilities" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Powerful VM Erasure Capabilities</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                D-Seecure is ideal for Enterprises, ITADs, and Government organizations needing to securely wipe virtual machines.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((cap, idx) => (
                <Reveal key={idx} delayMs={idx * 100}>
                  <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100 hover:shadow-xl transition-all duration-300 h-full group">
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 w-fit group-hover:scale-110 transition-transform">
                      {cap.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{cap.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section id="use-cases" className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-8 text-white">
                  <h2 className="text-3xl lg:text-5xl font-bold leading-tight">When to use VM Erasure?</h2>
                  <div className="space-y-6">
                    {[
                      { title: "Project Completion", desc: "Securely wipe VMs used for testing or DevOps workflows handling sensitive data." },
                      { title: "Cloud Decommissioning", desc: "Eliminate residual data risks when moving or deleting cloud-hosted virtual instances." },
                      { title: "Compliance Audits", desc: "Meet GDPR, HIPAA, and ISO 27001 requirements with verifiable audit trails." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                          <CheckIcon className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                          <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/3 w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                   <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                        <ServerIcon className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Multi-System Architecture</h3>
                      <p className="text-slate-400">Supports erasure in complex setups where the application, VM host, and storage are across multiple systems.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES GRID ================= */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Excellent Features for VM Sanitization</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                   <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                      {feature.icon}
                   </div>
                   <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STANDARDS ================= */}
        <section id="standards" className="py-20 bg-slate-50">
           <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                 <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">18+ Globally Recognized Erasure Standards</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                       D-Secure supports all major global standards to ensure that your virtual machine data is permanently deleted beyond any chance of recovery.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       {["NIST 800-88", "US DoD 5220.22", "HMG IS5", "NATO", "AFSSI 5020", "Gutmann"].map(s => (
                          <div key={s} className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                             <ShieldIcon className="w-4 h-4 text-emerald-500" />
                             {s}
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="lg:col-span-3">
                    <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
                       <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                          <div className="flex-1">
                             <h3 className="text-2xl font-bold mb-4">Digitally Signed Reports</h3>
                             <p className="text-emerald-50 mb-6">Maintain complete accountability with tamper-proof reports containing VM size, ID, MAC address, and more.</p>
                             <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                                <ul className="space-y-3">
                                   {[
                                      "VM Size & ID",
                                      "MAC Address & Traces",
                                      "Erasure Method Used",
                                      "Verification Result"
                                   ].map(li => (
                                      <li key={li} className="flex items-center gap-3 text-sm font-medium">
                                         <CheckIcon className="w-4 h-4 text-emerald-300" />
                                         {li}
                                      </li>
                                   ))}
                                </ul>
                             </div>
                          </div>
                          <div className="hidden md:block">
                             <FileTextIcon className="w-32 h-32 text-emerald-200/40" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "Which virtualization platforms are supported?", a: "D-Secure Virtual Machine Eraser supports leading platforms such as Microsoft Hyper-V and VMware ESXi, enabling secure erasure across local, network, and remote configurations." },
                { q: "Are the licenses permanent?", a: "Yes, the VM erasure licenses are provided on a pay-per-use basis and do not expire until they are used." },
                { q: "Can I manage everything centrally?", a: "Absolutely. The software can be installed on any Windows system to centrally manage and securely erase virtual machines across your infrastructure." },
                { q: "Is the report compliant with GDPR?", a: "Yes, the software generates detailed, tamper-proof reports that help you comply with a wide range of global data protection laws including EU-GDPR, HIPAA, and PCI-DSS." }
              ].map((faq, k) => (
                <div key={k} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-lg font-bold text-slate-800 mb-3">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="py-20 bg-white border-t relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center">
                  {/* <div className="space-y-8 text-slate-900">
                     <Reveal>
                        <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Ready to secure your virtual environment?</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                           Our team is here to help you implement a secure VM erasure workflow that protects your company's intellectual property and ensures regulatory compliance.
                        </p>
                        <div className="space-y-6">
                           {[
                              { label: "Phone", value: "+1 (800) 270-1311" },
                              { label: "Email", value: "sales@dsecuretech.com" },
                              { label: "Support", value: "Available 24/5 Worldwide" }
                           ].map(c => (
                              <div key={c.label} className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                 </div>
                                 <div className="text-left">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">{c.label}</p>
                                    <p className="text-lg font-semibold text-slate-900">{c.value}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </Reveal>
                  </div> */}
                  <Reveal delayMs={200}>
                    <ProductContactForm source="Virtual Machine Eraser" solutionType="Eraser" />
                  </Reveal>
               </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default VirtualMachineEraserPage;
