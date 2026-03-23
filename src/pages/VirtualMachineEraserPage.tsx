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
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>

                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <Database className="w-4 h-4" />
                    Secure VM Data Sanitization
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

              <Reveal delayMs={200}>
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-200/20 blur-3xl rounded-full"></div>
                  <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                     {/* 3D-like box representation */}
                     <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
                        <div className="w-64 h-64 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/20 flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform duration-700 shadow-xl">
                           <div className="w-48 h-48 bg-white rounded-xl shadow-lg border border-emerald-100 flex items-center justify-center relative">
                              <Monitor className="w-24 h-24 text-emerald-500" />
                              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-lg shadow-md border border-emerald-50 flex items-center justify-center animate-bounce">
                                 <Zap className="w-6 h-6 text-emerald-400" />
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           {[1, 2, 3].map((i) => (
                              <div 
                                key={i}
                                className="absolute border-2 border-emerald-400/10 rounded-full animate-ping"
                                style={{ 
                                  width: `${100 + i * 50}%`,
                                  height: `${100 + i * 50}%`,
                                  animationDelay: `${i * 0.5}s`,
                                  animationDuration: '3s'
                                }}
                              ></div>
                           ))}
                        </div>
                     </div>
                  </div>
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
