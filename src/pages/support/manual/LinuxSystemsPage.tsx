import React, { useState, memo } from "react";
import { Helmet } from 'react-helmet-async';
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
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
            title: "D-Secure Linux Foundation & Distribution Support",
            description: "Comprehensive understanding of Linux distributions and D-Secure compatibility matrix",
            icon: "🐧",
            subsections: [
                {
                    id: 11,
                    title: "D-Secure Linux Data Erasure Introduction",
                    description: "Critical importance of secure erasure in Linux environments with enterprise-grade D-Secure solutions",
                    pageCount: 3,
                },
                {
                    id: 12,
                    title: "Supported Linux Distributions",
                    description: "Complete compatibility guide for Ubuntu, CentOS, RHEL, SUSE, Debian, Fedora, and Arch Linux",
                    pageCount: 4,
                },
                {
                    id: 13,
                    title: "Advanced File System Support",
                    description: "In-depth coverage of ext4, XFS, Btrfs, ZFS, and F2FS considerations with D-Secure optimization",
                    pageCount: 3,
                },
                {
                    id: 14,
                    title: "Kernel Version Compatibility",
                    description: "D-Secure compatibility across different kernel versions and custom kernel configurations",
                    pageCount: 2,
                },
            ],
        },
        {
            id: 2,
            title: "D-Secure Command Line Mastery & Native Tools",
            description: "Advanced Linux command-line tools integration with D-Secure utilities and automation",
            icon: "⌨️",
            subsections: [
                {
                    id: 21,
                    title: "D-Secure Enhanced dd and shred Commands",
                    description: "Advanced low-level disk operations, secure deletion patterns, and verification methods",
                    pageCount: 4,
                },
                {
                    id: 22,
                    title: "LUKS Encryption & Cryptographic Erasure",
                    description: "Complete guide to encrypted volume management, key destruction, and instant cryptographic erasure",
                    pageCount: 3,
                },
                {
                    id: 23,
                    title: "D-Secure Scripting & Advanced Automation",
                    description: "Comprehensive bash scripting, Python integration, and automated erasure workflow development",
                    pageCount: 3,
                },
                {
                    id: 24,
                    title: "System Integration & Service Management",
                    description: "Systemd service integration, cron job scheduling, and enterprise automation frameworks",
                    pageCount: 2,
                },
            ],
        },
        {
            id: 3,
            title: "D-Secure Enterprise Linux & Data Center Operations",
            description: "Large-scale server environments, data centers, and enterprise deployment strategies",
            icon: "🏢",
            subsections: [
                {
                    id: 31,
                    title: "Enterprise Server Hardware Erasure",
                    description: "RAID arrays, NVMe enterprise drives, SAN/NAS systems, and high-performance storage with D-Secure",
                    pageCount: 4,
                },
                {
                    id: 32,
                    title: "D-Secure Remote Management & Orchestration",
                    description: "SSH-based erasure, Ansible playbooks, Puppet modules, and centralized monitoring solutions",
                    pageCount: 3,
                },
                {
                    id: 33,
                    title: "Container & Virtualization Erasure",
                    description: "Docker containers, Kubernetes clusters, VMware, KVM, and cloud instance secure erasure",
                    pageCount: 3,
                },
                {
                    id: 34,
                    title: "High Availability & Cluster Environments",
                    description: "Pacemaker clusters, load balancers, and distributed system erasure coordination",
                    pageCount: 2,
                },
            ],
        },
        {
            id: 4,
            title: "D-Secure Advanced Storage Technologies & Optimization",
            description: "Modern Linux storage architectures and D-Secure performance optimization techniques",
            icon: "💾",
            subsections: [
                {
                    id: 41,
                    title: "NVMe & High-Performance SSD Optimization",
                    description: "Advanced secure erase commands, TRIM optimization, and enterprise NVMe management",
                    pageCount: 3,
                },
                {
                    id: 42,
                    title: "LVM & Advanced Software RAID",
                    description: "Logical volume management, RAID 0/1/5/6/10 erasure, and snapshot-based operations",
                    pageCount: 4,
                },
                {
                    id: 43,
                    title: "Network & Distributed Storage",
                    description: "NFS, iSCSI, Ceph, GlusterFS, and distributed storage erasure with D-Secure",
                    pageCount: 3,
                },
                {
                    id: 44,
                    title: "Cloud Storage Integration",
                    description: "AWS EBS, Azure Disks, Google Persistent Disks, and hybrid cloud erasure strategies",
                    pageCount: 2,
                },
            ],
        },
        {
            id: 5,
            title: "D-Secure Security Frameworks & Compliance",
            description: "Enterprise security frameworks, compliance standards, and regulatory requirements",
            icon: "🔒",
            subsections: [
                {
                    id: 51,
                    title: "SELinux & AppArmor Integration",
                    description: "Mandatory access control systems, policy configuration, and D-Secure security contexts",
                    pageCount: 3,
                },
                {
                    id: 52,
                    title: "Comprehensive Audit & Logging",
                    description: "System logging, auditd integration, SIEM compatibility, and compliance documentation",
                    pageCount: 3,
                },
                {
                    id: 53,
                    title: "Advanced Kernel Security Features",
                    description: "Secure boot, TPM 2.0, hardware security modules, and kernel hardening with D-Secure",
                    pageCount: 2,
                },
                {
                    id: 54,
                    title: "Compliance Standards Implementation",
                    description: "GDPR, HIPAA, PCI-DSS, NIST, and DoD compliance with automated reporting",
                    pageCount: 3,
                },
            ],
        },
        {
            id: 6,
            title: "D-Secure Advanced Troubleshooting & Performance Optimization",
            description: "Expert-level problem resolution, performance tuning, and system optimization techniques",
            icon: "🔧",
            subsections: [
                {
                    id: 61,
                    title: "Complex Linux Issues Resolution",
                    description: "Advanced permission problems, device mounting issues, and hardware compatibility troubleshooting",
                    pageCount: 4,
                },
                {
                    id: 62,
                    title: "Performance Optimization & Tuning",
                    description: "I/O scheduling optimization, memory management, CPU affinity, and system-wide performance tuning",
                    pageCount: 3,
                },
                {
                    id: 63,
                    title: "Advanced Monitoring & Diagnostics",
                    description: "Real-time system monitoring, performance metrics, and comprehensive erasure verification",
                    pageCount: 3,
                },
                {
                    id: 64,
                    title: "Recovery & Disaster Management",
                    description: "Failed erasure recovery, system restoration, and disaster recovery procedures",
                    pageCount: 2,
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                                <div className="p-4 sm:p-6">
                                    <div className="text-3xl sm:text-4xl mb-4">🐧</div>
                                    <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-2">Multi-Distro</div>
                                    <div className="text-slate-600 text-sm sm:text-base">Ubuntu, RHEL, SUSE, Debian, Arch</div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="text-3xl sm:text-4xl mb-4">⌨️</div>
                                    <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">Command Line</div>
                                    <div className="text-slate-600 text-sm sm:text-base">Native tools & automation</div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="text-3xl sm:text-4xl mb-4">🏢</div>
                                    <div className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2">Enterprise</div>
                                    <div className="text-slate-600 text-sm sm:text-base">Data centers & cloud ready</div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="text-3xl sm:text-4xl mb-4">🔒</div>
                                    <div className="text-xl sm:text-2xl font-bold text-emerald-700 mb-2">Secure</div>
                                    <div className="text-slate-600 text-sm sm:text-base">SELinux & compliance ready</div>
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
                                                className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${activeSection === section.id ? "rotate-180" : ""
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

                {/* Quick Access Section */}
                <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <Reveal>
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                    Linux Distribution Quick Access
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                                    Jump to specific Linux distribution guides and enterprise solutions
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[
                                {
                                    title: "Ubuntu & Debian",
                                    description: "APT-based distributions and package management",
                                    icon: "🐧",
                                    color: "bg-emerald-500",
                                },
                                {
                                    title: "RHEL & CentOS",
                                    description: "Enterprise Red Hat and community distributions",
                                    icon: "🏢",
                                    color: "bg-teal-500",
                                },
                                {
                                    title: "SUSE & openSUSE",
                                    description: "Enterprise SUSE and community openSUSE",
                                    icon: "🔧",
                                    color: "bg-cyan-500",
                                },
                                {
                                    title: "Arch & Fedora",
                                    description: "Rolling release and cutting-edge distributions",
                                    icon: "⚙️",
                                    color: "bg-emerald-600",
                                },
                            ].map((item, index) => (
                                <Reveal key={item.title} delayMs={index * 100}>
                                    <div className="bg-slate-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                                        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                                            <span className="text-xl sm:text-2xl text-white">{item.icon}</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm flex-grow">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <Reveal>
                            <div className="text-center text-white">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                                    Expert D-Secure Linux Erasure Services
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                                    Our regulated D-Secure specialists provide comprehensive Linux data erasure solutions across all distributions, from single servers to enterprise data centers with thousands of systems.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center justify-center">
                                        <span className="mr-2">🐧</span>
                                        D-Secure Linux Services
                                    </button>
                                    <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center justify-center">
                                        <span className="mr-2">📞</span>
                                        Consult Linux Experts
                                    </button>
                                    <button className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center justify-center">
                                        <span className="mr-2">📚</span>
                                        Download Linux Guide
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