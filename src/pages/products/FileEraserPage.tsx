import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEOHead";
import Reveal from "@/components/Reveal";
import {
    ServerIcon,
    ShieldIcon,
    CheckIcon,
    ArrowRightIcon,
    ClipboardIcon,
    CloudIcon,
} from "@/components/FlatIcons";

const FileEraserPage: React.FC = () => {
    const { t } = useTranslation();

    const platforms = [
        { name: "Windows", desc: "Windows 10, 11, Server 2016+" },
        { name: "macOS", desc: "Monterey, Ventura, Sonoma" },
        { name: "Linux", desc: "Ubuntu, CentOS, Debian" },
        { name: "Cloud", desc: "Google Drive, OneDrive, Dropbox" },
    ];

    const eraseTypes = [
        { name: "Files & Folders", desc: "Permanently erase specific files and folders", icon: "📄" },
        { name: "System Traces", desc: "Remove browser history, cache, temp files", icon: "🔍" },
        { name: "Deleted Data", desc: "Erase previously deleted recoverable data", icon: "🗑️" },
        { name: "Cloud Storage", desc: "Securely wipe Google Drive, OneDrive content", icon: "☁️" },
        { name: "Application Data", desc: "Clear application logs and user data", icon: "📱" },
        { name: "Free Space", desc: "Sanitize unused disk space completely", icon: "💾" },
    ];

    const features = [
        "30+ International Erasure Algorithms",
        "Multi-Language User Interface",
        "Google Drive & Cloud Storage Erasure",
        "Scheduled Automatic Erasure",
        "Drag & Drop File Selection",
        "PDF Erasure Reports with Audit Trail",
        "Network Deployment Support",
        "White-Label Customization",
    ];

    const useCases = [
        { title: "Individual Users", desc: "Protect personal privacy when selling or disposing of computers" },
        { title: "Corporate Data Protection", desc: "Ensure confidential business data cannot be recovered" },
        { title: "Cloud Data Erasure", desc: "Permanently remove sensitive files from cloud services" },
        { title: "Compliance & Audit", desc: "Meet GDPR, HIPAA, PCI-DSS data destruction requirements" },
    ];

    const downloadCatalog = () => {
        const link = document.createElement('a');
        link.href = '/downloads/D-Secure-file-eraser-catalog.pdf';
        link.download = 'D-Secure-File-Eraser-Catalog.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <SEOHead
                seo={{
                    title: "D-Secure File Eraser | Permanently Wipe Files, Folders & Cloud Data",
                    description: "D-Secure File Eraser permanently wipes files, folders, traces, browser history, and cloud storage data. 30+ erasure algorithms with detailed audit reports.",
                    keywords: "file eraser, secure file deletion, wipe files, erase browser history, cloud data erasure, GDPR compliance, data sanitization",
                    canonicalUrl: "https://dsecuretech.com/products/file-eraser",
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
                                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                            <ShieldIcon className="w-4 h-4" />
                                            Secure File Deletion
                                        </div>
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                                            D-Secure{" "}
                                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                File Eraser
                                            </span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                                            Permanently wipe files, folders, traces, browser history & cloud storage data.
                                            Ensure complete data privacy with 30+ erasure algorithms and detailed audit trails.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                to="/contact?request=free-demo&product=file-eraser"
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
                                                    <ServerIcon className="w-12 h-12 text-white" />
                                                </div>
                                            </div>
                                            <div className="text-center mb-6">
                                                <p className="text-3xl font-bold text-slate-900 mb-2">Starting at $40</p>
                                                <p className="text-slate-600">Flexible Licensing Options</p>
                                            </div>
                                            <ul className="space-y-3 mb-6">
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    30+ Erasure Algorithms
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    Cloud Storage Support
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    Scheduled Erasure
                                                </li>
                                                <li className="flex items-center gap-3 text-slate-700">
                                                    <CheckIcon className="w-5 h-5 text-emerald-600" />
                                                    PDF Audit Reports
                                                </li>
                                            </ul>
                                            <Link
                                                to="/pricing-and-plan?product=file-eraser"
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

                {/* What Can You Erase Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    What Can You <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erase?</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                    Permanently remove any type of data from your system with complete verification.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                            {eraseTypes.map((type, index) => (
                                <Reveal key={type.name} delayMs={index * 50}>
                                    <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{type.icon}</div>
                                        <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">{type.name}</h3>
                                        <p className="text-xs text-slate-500">{type.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform Support Section */}
                <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Platform <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Support</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                    Works seamlessly across all major operating systems and cloud platforms.
                                </p>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {platforms.map((platform, index) => (
                                <Reveal key={platform.name} delayMs={index * 100}>
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <CloudIcon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{platform.name}</h3>
                                        <p className="text-sm text-slate-500">{platform.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Key <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Features</span>
                                </h2>
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

                {/* Use Cases Section */}
                <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    Use <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Cases</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {useCases.map((useCase, index) => (
                                <Reveal key={useCase.title} delayMs={index * 100}>
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <CheckIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{useCase.title}</h3>
                                                <p className="text-slate-600">{useCase.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 md:py-20 bg-white">
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
                                { step: "1", title: "Select Files", desc: "Drag & drop or browse to select files, folders, or traces" },
                                { step: "2", title: "Choose Algorithm", desc: "Select from 30+ secure erasure algorithms" },
                                { step: "3", title: "Erase Data", desc: "Permanently wipe selected data beyond recovery" },
                                { step: "4", title: "Get Report", desc: "Receive detailed PDF erasure report with audit trail" },
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
                <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-14 shadow-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Protect Your Privacy Today
                                </h2>
                                <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
                                    Get started with D-Secure File Eraser and ensure your sensitive files
                                    are permanently deleted beyond any possibility of recovery.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/contact?request=free-demo&product=file-eraser"
                                        className="group bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                                    >
                                        <span>Request Free Demo</span>
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/pricing-and-plan?product=file-eraser"
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

export default FileEraserPage;
