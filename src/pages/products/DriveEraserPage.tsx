import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEOHead";
import Reveal from "@/components/Reveal";
import {
    DatabaseIcon,
    ShieldIcon,
    CheckIcon,
    ArrowRightIcon,
    ClipboardIcon,
} from "@/components/FlatIcons";

const DriveEraserPage: React.FC = () => {
    const { t } = useTranslation();

    const supportedDevices = [
        { name: "HDD", desc: "Hard Disk Drives of all capacities" },
        { name: "SSD", desc: "Solid State Drives including NVMe" },
        { name: "PC/Laptop", desc: "Windows desktops and laptops" },
        { name: "Mac", desc: "Apple Silicon & Intel-based Mac" },
        { name: "Chromebook", desc: "All models of Chromebook" },
        { name: "Server", desc: "Enterprise servers and workstations" },
    ];

    const certifications = [
        { name: "NIST 800-88", desc: "Clear & Purge Methods" },
        { name: "DoD 5220.22-M", desc: "US Department of Defense Standard" },
        { name: "IEEE 2883-2022", desc: "Sanitization Standard" },
        { name: "ADISA Level 5", desc: "Highest Assurance Level" },
        { name: "ISO 27001", desc: "Information Security Certified" },
        { name: "Common Criteria EAL 2", desc: "Internationally Recognized" },
    ];

    const features = [
        "26+ International Erasure Standards",
        "Cloud Console Integration for Centralized Management",
        "USB & PXE Boot Deployment Options",
        "Digitally Signed Tamper-Proof Certificates",
        "Automatic Hardware Detection",
        "Batch Processing for Multiple Drives",
        "Detailed Audit Reports (PDF, XML)",
        "White-Label Branding Options",
    ];

    const downloadCatalog = () => {
        const link = document.createElement('a');
        link.href = '/downloads/D-Secure-drive-eraser-catalog.pdf';
        link.download = 'D-Secure-Drive-Eraser-Catalog.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <SEOHead
                seo={{
                    title: "D-Secure Drive Eraser | Certified Data Erasure Software for HDD, SSD, Mac & Server",
                    description: "D-Secure Drive Eraser guarantees 100% data wiping from HDD, SSD, PC, Mac, Chromebook & Server. NIST 800-88, DoD 5220.22-M certified with tamper-proof reports.",
                    keywords: "drive eraser, data erasure software, hard drive wipe, SSD erase, mac data wipe, server data destruction, NIST 800-88",
                    canonicalUrl: "https://dsecuretech.com/products/drive-eraser",
                }}
            />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <Reveal>
                                    <div>
                                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                            <ShieldIcon className="w-4 h-4" />
                                            Certified Data Erasure
                                        </div>
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                                            D-Secure{" "}
                                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                Drive Eraser
                                            </span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                                            Guarantees 100% Wiping of Sensitive Data Across HDD, SSD, PC, Mac, Chromebook & Server -
                                            On-site & Off-site. Certified by international standards for complete data security.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                to="/contact?request=free-demo&product=drive-eraser"
                                                className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center justify-center gap-3"
                                            >
                                                <span>Request Free Demo</span>
                                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <button
                                                onClick={downloadCatalog}
                                                className="group border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                                            >
                                                <ClipboardIcon className="w-5 h-5" />
                                                <span>Download Datasheet</span>
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delayMs={200}>
                                    <div className="relative">
                                        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/60">
                                            <div className="flex items-center justify-center mb-6">
                                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                                                    <DatabaseIcon className="w-12 h-12 text-white" />
                                                </div>
                                            </div>
                                            <div className="text-center mb-6">
                                                <p className="text-3xl font-bold text-slate-900 mb-2">Starting at $20</p>
                                                <p className="text-slate-600">Pay Per Use Licensing</p>
                                            </div>
                                            <ul className="space-y-3 mb-6">
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    26+ Erasure Standards
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    Tamper-Proof Certificates
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    Cloud Console Access
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    USB & PXE Boot
                                                </li>
                                            </ul>
                                            <Link
                                                to="/pricing-and-plan?product=drive-eraser"
                                                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-center transition-colors"
                                            >
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Supported Devices Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Supported <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Devices</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                    Erase data from virtually any storage device with complete certification.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                            {supportedDevices.map((device, index) => (
                                <Reveal key={device.name} delayMs={index * 50}>
                                    <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <DatabaseIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{device.name}</h3>
                                        <p className="text-xs text-slate-500">{device.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Key <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Features</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                    Enterprise-grade data erasure with comprehensive features for complete data security.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                            {features.map((feature, index) => (
                                <Reveal key={feature} delayMs={index * 50}>
                                    <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                                        <CheckIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium">{feature}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Certifications & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Compliance</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                    Tested, certified and approved by global regulatory bodies for complete compliance.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                            {certifications.map((cert, index) => (
                                <Reveal key={cert.name} delayMs={index * 50}>
                                    <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <ShieldIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">{cert.name}</h3>
                                        <p className="text-xs text-slate-500">{cert.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    How It <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Works</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {[
                                { step: "1", title: "Boot from USB/PXE", desc: "Create bootable USB or deploy via network PXE boot" },
                                { step: "2", title: "Select Drive", desc: "Choose drives to erase with automatic detection" },
                                { step: "3", title: "Choose Standard", desc: "Select from 26+ international erasure standards" },
                                { step: "4", title: "Get Certificate", desc: "Receive tamper-proof erasure certificate" },
                            ].map((item, index) => (
                                <Reveal key={item.step} delayMs={index * 100}>
                                    <div className="text-center">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600 text-sm">{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-14 shadow-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Secure Your Data?
                                </h2>
                                <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
                                    Get started with D-Secure Drive Eraser and ensure complete data destruction
                                    with certified, tamper-proof documentation.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/contact?request=free-demo&product=drive-eraser"
                                        className="group bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                                    >
                                        <span>Request Free Demo</span>
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/pricing-and-plan?product=drive-eraser"
                                        className="group border-2 border-white/50 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <span>View Pricing</span>
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </>
    );
};

export default DriveEraserPage;
