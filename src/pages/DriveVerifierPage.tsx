import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import { 
  Search, 
  Monitor, 
  Database, 
  FileCheck,
  HardDrive,
  Laptop,
  Server,
  Check,
  Clock
} from "lucide-react";
import { getSEOForPage } from "@/utils/seo";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import { ProductContactForm } from "@/components/forms";
import UpcomingBadge from "@/components/ui/UpcomingBadge";

const ScanningHeroVisual = () => {
  const hardwareIcons = [
    { id: 'hdd', icon: <HardDrive className="w-8 h-8" />, label: "HDD", x: -180, y: 20 },
    { id: 'laptop', icon: <Laptop className="w-8 h-8" />, label: "Laptop", x: -130, y: -60 },
    { id: 'monitor', icon: <Monitor className="w-8 h-8" />, label: "PC", x: -40, y: -110 },
    { id: 'server', icon: <Server className="w-8 h-8" />, label: "Server", x: 50, y: -110 },
    { 
      id: 'ssd',
      icon: (
        <div className="relative flex flex-col items-center justify-center border-2 border-slate-400 rounded-md w-10 h-10 px-1">
          <span className="text-[10px] font-bold text-slate-600 leading-none">SSD</span>
          <div className="w-full h-[2px] bg-slate-400 mt-1"></div>
          <div className="w-full h-[2px] bg-slate-400 mt-1"></div>
        </div>
      ), 
      label: "SSD", 
      x: 140, 
      y: -60 
    },
    { 
      id: 'sdcard',
      icon: (
        <div className="relative border-2 border-slate-400 rounded-sm w-8 h-10">
          <div className="absolute top-0 right-0 w-2 h-2 border-l-2 border-b-2 border-slate-400 -mr-[1px] -mt-[1px] bg-white transform rotate-45" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
          <div className="flex flex-col gap-1 p-1 mt-2">
            <div className="w-full h-[2px] bg-slate-400"></div>
            <div className="w-full h-[2px] bg-slate-400"></div>
            <div className="w-full h-[2px] bg-slate-400"></div>
          </div>
        </div>
      ), 
      label: "SD Card", 
      x: 190, 
      y: 20 
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[400px] lg:h-[500px] overflow-visible">
      {/* Background Arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-slate-200/50 clip-path-top shadow-[0_-20px_40px_-10px_rgba(16,185,129,0.05)]"></div>

      {/* Floating Hardware Icons */}
      {hardwareIcons.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute p-4 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:border-emerald-200 transition-colors duration-300"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
          animate={{ x: item.x, y: item.y, opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          style={{
            left: "calc(50% - 32px)",
            top: "calc(50% - 32px)",
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}

      {/* Central Scanning Frame */}
      <div className="relative z-10 w-64 h-64 flex items-center justify-center">
        {/* Frame Corners */}
        <div className="absolute inset-0 border-slate-900">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-slate-800 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-slate-800 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-slate-800 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-slate-800 rounded-br-lg"></div>
        </div>

        {/* Binary Backdrop */}
        <div className="absolute inset-4 overflow-hidden flex flex-col justify-center gap-1 opacity-20 pointer-events-none select-none font-mono text-xs">
          {['r1', 'r2', 'r3', 'r4', 'r5', 'r6'].map((id, i) => (
            <motion.div
              key={id}
              className="flex justify-between text-slate-900 whitespace-nowrap"
              animate={{ x: i % 2 === 0 ? [0, -20, 0] : [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {"1010101010101010101010101010".split("").map((c, j) => (
                <span key={`char-${id}-${j}`} className={j % 3 === 0 ? "text-emerald-600" : ""}>{c}</span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Magnifier Lens with Checkmark */}
        <motion.div
          className="relative z-20 w-40 h-40"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Lens Circle */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full border-2 border-slate-200 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Inner Emerald Circle */}
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-inner">
              <Check className="w-16 h-16 text-emerald-500 stroke-[4px]" />
            </div>
          </div>
          
          {/* Lens Handle */}
          <div className="absolute bottom-[-15px] right-[-15px] w-6 h-12 bg-emerald-600 rounded-full rotate-[-45deg] origin-bottom shadow-lg"></div>
        </motion.div>
      </div>
    </div>
  );
};

const DriveVerifierPage: React.FC = memo(function DriveVerifierPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "overview", label: "Overview" },
    { id: "use-cases", label: "Use Cases" },
    { id: "capabilities", label: "Capabilities" },
    { id: "specs", label: "Specifications" },
    { id: "compliance", label: "Compliance" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavVisible(scrollPosition > 400);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    globalThis.dispatchEvent(
      new CustomEvent("stickyNavVisible", {
        detail: { visible: isNavVisible },
      }),
    );
    return () => {
      globalThis.dispatchEvent(
        new CustomEvent("stickyNavVisible", {
          detail: { visible: false },
        }),
      );
    };
  }, [isNavVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const capabilities = [
    {
      title: "Data Erasure Verification",
      desc: "Accurately scans the drive and examines bit patterns to confirm possibility of data traces left in erased drives, PCs, laptops & servers.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Cloud Management Console",
      desc: "Central repository for erasure verification reports with user license management via D-Secure Cloud console.",
      icon: <CloudIcon className="w-6 h-6" />,
    },
    {
      title: "Digitally Signed Reports",
      desc: "Generates detailed verification reports in PDF, XML & CSV formats to meet R2, NAID AAA, and e-Stewards compliance.",
      icon: <ClipboardIcon className="w-6 h-6" />,
    },
    {
      title: "USB or PXE Deployment",
      desc: "Deploy via bootable USB or over network using PXE boot for scalable simultaneous verification of multiple devices.",
      icon: <Monitor className="w-6 h-6" />,
    },
    {
      title: "Seamless API Integration",
      desc: "Smoothly integrates with IT asset management software or ERP systems for effortless report retrieval.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "ISO Customization",
      desc: "Automate verification processes with customized ISO images to save time in repetitive tasks.",
      icon: <GearIcon className="w-6 h-6" />,
    },
  ];

  const useCases = [
    {
      title: "ITAD & Refurbishers",
      desc: "Verify success of data erasure on wiped drives and devices before resale or disposal to ensure zero data remanence.",
      icon: <ServerIcon className="w-8 h-8" />,
    },
    {
      title: "Compliance Audits",
      desc: "Meet R2v3 Appendix B requirements for independent verification of 5% of erased drives.",
      icon: <ShieldIcon className="w-8 h-8" />,
    },
    {
      title: "NAID AAA Certification",
      desc: "Utilize independent software for overwriting verification as mandated by NAID AAA section 4.6.",
      icon: <CheckIcon className="w-8 h-8" />,
    },
    {
      title: "e-Stewards Reporting",
      desc: "Generate tamper-proof records of successful sanitization required under Appendix D Section 8.9.4.",
      icon: <FileCheck className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("drive-verifier")} />

      {/* Sticky Nav */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50"
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
        {/* Hero Section */}
        <section id="overview" className="pt-6 pb-12 lg:pt-10 lg:pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <Reveal>
                <div className="space-y-8">
                  <Reveal>
                    <UpcomingBadge className="mb-4" />
                  </Reveal>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <ShieldIcon className="w-4 h-4" />
                    Complete Erasure Verification
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                    Accurately <span className="text-emerald-600">Verify</span> Erased Drives
                  </h1>
                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Verify drives for complete data erasure and confirm if any data traces exist. 
                    The industry-standard solution for ITADs, refurbishers, and resellers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["R2v3", "NAID AAA", "e-Stewards"].map((badge) => (
                      <div key={badge} className="bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100 text-sm font-medium text-slate-700">
                        {badge} Verified
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
                    >
                      Request Early Access
                    </button>
                    <button className="border-2 border-amber-200 text-amber-600 font-bold px-8 py-4 rounded-xl cursor-not-allowed opacity-75 flex items-center justify-center gap-2 transition-all">
                      <Clock className="w-5 h-5" />
                      Coming Soon: DataSheet
                    </button>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={100}>
                <ScanningHeroVisual />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">When To Use Drive Verifier</h2>
              <p className="text-slate-600">Critical tool for organizations that handle mass data sanitization and require independent audit trails.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase) => (
                <Reveal key={useCase.title}>
                  <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all">
                    <div className="text-emerald-600 mb-6">{useCase.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{useCase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Excellent Capabilities</h2>
              <p className="text-slate-600">Built for reliability, scale, and compliance in the data care industry.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap) => (
                <Reveal key={cap.title}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {cap.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{cap.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section id="specs" className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Technical Specification</h2>
                <div className="space-y-6">
                  {[
                    "Supports SATA, PATA, SCSI, SAS, NVMe, USB & SD cards",
                    "Verify up to 255 machines simultaneously over PXE",
                    "HexViewer support to manually confirm erasure success",
                    "Advanced asset tagging and customizable report fields",
                    "Supports 22 data wiping methods verification",
                    "Pay-per-use licenses with no expiry date",
                  ].map((spec) => (
                    <div key={spec} className="flex items-start gap-4">
                      <div className="mt-1 bg-emerald-500 rounded-full p-1">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                    <span className="text-slate-400">Software Variant</span>
                    <span className="font-medium">Cloud / Offline / Network PXE</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                    <span className="text-slate-400">Deployment</span>
                    <span className="font-medium">Bootable USB / PXE Boot</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                    <span className="text-slate-400">Report Formats</span>
                    <span className="font-medium">PDF, XML, CSV</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Verification Methods</span>
                    <span className="font-medium">Total & Random</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 lg:py-40 bg-white border-t overflow-hidden relative">
          {/* Subtle background patterns */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <ProductContactForm 
              source="Drive Verifier Page"
              solutionType="drive-verifier"
              title="Ensure Your Data Erasure is Verified"
              subtitle="Connect with our experts to discuss your sanitization verification requirements and get a professional consultation."
            />
          </div>
        </section>
      </div>
    </>
  );
});

export default DriveVerifierPage;
