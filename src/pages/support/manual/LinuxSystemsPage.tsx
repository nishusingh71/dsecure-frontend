import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { getFallbackImage } from '@/utils/imagePlaceholders';

const CDN_IMAGES = {
 hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
 terminal: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
 server: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface ManualSection {
 id: number;
 title: string;
 description: string;
 icon: string;
 subsections: ManualSubsection[];
}

interface ManualSubsection {
 id: number;
 title: string;
 description: string;
 pageCount: number;
}

const LinuxSystemsPage: React.FC = memo(() => {
 const [activeSection, setActiveSection] = useState<number | null>(null);

 const manualSections: ManualSection[] = [
 {
 id: 1,
 title: "D-Secure Linux Introduction & Distributions",
 description: "Understanding Linux distributions and D-Secure compatibility",
 icon: "🐧",
 subsections: [
 {
 id: 11,
 title: "Introduction to D-Secure Linux Data Erasure",
 description: "Importance of secure erasure in Linux environments with D-Secure",
 pageCount: 2,
 },
 {
 id: 12,
 title: "Supported Distributions",
 description: "Ubuntu, CentOS, RHEL, SUSE, and Debian compatibility",
 pageCount: 2,
 },
 {
 id: 13,
 title: "File System Support",
 description: "ext4, XFS, Btrfs, and ZFS considerations with D-Secure",
 pageCount: 1,
 },
 ],
 },
 {
 id: 2,
 title: "D-Secure Command Line Tools",
 description: "Native Linux tools and D-Secure command-line utilities",
 icon: "⌨️",
 subsections: [
 {
 id: 21,
 title: "D-Secure dd and shred Commands",
 description: "Low-level disk operations and secure deletion",
 pageCount: 2,
 },
 {
 id: 22,
 title: "LUKS and Encryption Management",
 description: "Cryptographic erasure with encrypted volumes",
 pageCount: 2,
 },
 {
 id: 23,
 title: "D-Secure Scripting & Automation",
 description: "Bash scripts and automated erasure workflows",
 pageCount: 1,
 },
 ],
 },
 {
 id: 3,
 title: "D-Secure Enterprise Linux",
 description: "Server environments and enterprise deployment",
 icon: "🏢",
 subsections: [
 {
 id: 31,
 title: "Server Hardware Erasure",
 description: "RAID arrays, NVMe, and enterprise storage with D-Secure",
 pageCount: 2,
 },
 {
 id: 32,
 title: "D-Secure Remote Management",
 description: "SSH-based erasure and monitoring solutions",
 pageCount: 2,
 },
 {
 id: 33,
 title: "Container & VM Erasure",
 description: "Docker, Kubernetes, and virtualization considerations",
 pageCount: 1,
 },
 ],
 },
 {
 id: 4,
 title: "D-Secure Storage Technologies",
 description: "Modern Linux storage and D-Secure optimization",
 icon: "💾",
 subsections: [
 {
 id: 41,
 title: "NVMe and SSD Optimization",
 description: "Secure erase commands and TRIM support",
 pageCount: 2,
 },
 {
 id: 42,
 title: "LVM and Software RAID",
 description: "Logical volume and RAID erasure with D-Secure",
 pageCount: 2,
 },
 {
 id: 43,
 title: "Network Storage",
 description: "NFS, iSCSI, and distributed storage erasure",
 pageCount: 2,
 },
 ],
 },
 {
 id: 5,
 title: "D-Secure Compliance & Security",
 description: "Security frameworks and compliance requirements",
 icon: "🔒",
 subsections: [
 {
 id: 51,
 title: "SELinux and AppArmor",
 description: "Security framework considerations with D-Secure",
 pageCount: 2,
 },
 {
 id: 52,
 title: "Audit and Logging",
 description: "System logging and compliance documentation",
 pageCount: 2,
 },
 {
 id: 53,
 title: "Kernel Security Features",
 description: "Secure boot, TPM, and hardware security",
 pageCount: 1,
 },
 ],
 },
 {
 id: 6,
 title: "D-Secure Troubleshooting & Performance",
 description: "Problem resolution and optimization techniques",
 icon: "🔧",
 subsections: [
 {
 id: 61,
 title: "Common Linux Issues",
 description: "Permission, mounting, and device access problems",
 pageCount: 2,
 },
 {
 id: 62,
 title: "Performance Optimization",
 description: "I/O scheduling and system tuning for D-Secure",
 pageCount: 2,
 },
 {
 id: 63,
 title: "Monitoring and Diagnostics",
 description: "System monitoring and erasure verification",
 pageCount: 1,
 },
 ],
 },
 ];

 const toggleSection = (id: number) => {
 setActiveSection(activeSection === id ? null : id);
 };

 const getTotalPages = (section: ManualSection) => {
 return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
 };

 return (
 <>
 <Helmet>
 <title>D-Secure Linux Systems Data Erasure | Linux Secure Wipe Guide</title>
 <meta name="description" content="Complete guide to secure data erasure on Linux systems with D-Secure. Procedures for all major distributions, file systems, and enterprise environments." />
 <meta name="keywords" content="D-Secure Linux data erasure, Linux secure delete, dd shred commands, LUKS erasure, enterprise Linux security" />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-8 sm:py-12 md:py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
 D-Secure Linux Systems{" "}
 <span className="text-emerald-600 block sm:inline">Data Erasure</span>
 </h1>
 <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
 Secure Data Erasure on Linux with D-Secure: Complete procedures for all major distributions, enterprise servers, and modern storage technologies.
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 bg-white">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
 <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
 <img
 src={CDN_IMAGES.hero}
 alt="D-Secure Linux Systems Data Erasure"
 
 className="w-full h-full object-cover"
 width={1600}
 height={900}
 
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
 <div className="p-4 sm:p-6 md:p-8 text-white">
 <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
 Secure D-Secure Linux Erasure
 </h2>
 <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
 Comprehensive D-Secure procedures for all Linux distributions and enterprise environments
 </p>
 </div>
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">🐧</div>
 <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">Multi-Distro</div>
 <div className="text-slate-600 text-sm sm:text-base">All major distributions</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">⌨️</div>
 <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">Command Line</div>
 <div className="text-slate-600 text-sm sm:text-base">Native tools integration</div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="text-3xl sm:text-4xl mb-4">🏢</div>
 <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">Enterprise</div>
 <div className="text-slate-600 text-sm sm:text-base">Server & cloud ready</div>
 </div>
 </div>
 </Reveal>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-4 sm:space-y-6">
 {manualSections.map((section, index) => (
 <Reveal key={section.id} delayMs={index * 50}>
 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
 <button
 onClick={() => toggleSection(section.id)}
 className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
 >
 <div className="flex items-center gap-3 sm:gap-4">
 <div className="text-lg sm:text-2xl">{section.icon}</div>
 <div>
 <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
 {section.title}
 </h3>
 <p className="text-slate-600 text-xs sm:text-sm">
 {section.description}
 </p>
 <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500">
 <span>{section.subsections.length} topics</span>
 <span>{getTotalPages(section)} pages</span>
 </div>
 </div>
 </div>
 <svg
 className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
 activeSection === section.id ? "rotate-180" : ""
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 </svg>
 </button>

 {activeSection === section.id && (
 <div className="px-4 sm:px-6 pb-4 sm:pb-6">
 <div className="border-t border-slate-200 pt-4">
 <div className="grid gap-3 sm:gap-4">
 {section.subsections.map((subsection) => (
 <div
 key={subsection.id}
 className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg"
 >
 <div className="flex-1">
 <h4 className="font-medium text-slate-900 mb-1 text-sm sm:text-base">
 {subsection.title}
 </h4>
 <p className="text-xs sm:text-sm text-slate-600">
 {subsection.description}
 </p>
 </div>
 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
 <span>{subsection.pageCount} pages</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </section>

 <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 <Reveal>
 <div className="text-center text-white">
 <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
 Need D-Secure Linux Erasure Assistance?
 </h2>
 <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
 Our D-Secure experts specialize in Linux data erasure across all distributions and enterprise environments.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 D-Secure Linux Services
 </button>
 <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg">
 Consult D-Secure Experts
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

export default LinuxSystemsPage;