import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const EnterpriseServersPage: React.FC = memo(() => {
    return (
        <>
            <SEOHead seo={getSEOForPage('help-manual')} />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <Reveal>
                            <div className="text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                    Enterprise <span className="text-emerald-600">Servers</span>
                                </h1>
                                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                                    Comprehensive guide to D-Secure enterprise server erasure for data centers and virtualization platforms
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="space-y-12">
                            {/* Server Types */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                                        Supported Server Types
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-emerald-600">Physical Servers</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Dell PowerEdge Series</li>
                                                <li>• HP ProLiant Servers</li>
                                                <li>• IBM Power Systems</li>
                                                <li>• Cisco UCS Servers</li>
                                                <li>• Supermicro Systems</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-teal-600">Virtualization Platforms</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• VMware vSphere/ESXi</li>
                                                <li>• Microsoft Hyper-V</li>
                                                <li>• Citrix XenServer</li>
                                                <li>• KVM/QEMU</li>
                                                <li>• Docker Containers</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* RAID Systems */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                                        RAID and Storage Arrays
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">RAID Configuration Support</h3>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">R0</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">RAID 0 Striping</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">R1</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">RAID 1 Mirroring</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">R5</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">RAID 5 Parity</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Deployment Methods */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                                        Enterprise Deployment
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-emerald-50 rounded-lg p-6">
                                                <h3 className="text-lg font-semibold text-emerald-600 mb-4">Network Boot (PXE)</h3>
                                                <ul className="space-y-2 text-slate-700 text-sm">
                                                    <li>• Centralized deployment</li>
                                                    <li>• No local installation required</li>
                                                    <li>• Automated server discovery</li>
                                                    <li>• Batch processing capabilities</li>
                                                </ul>
                                            </div>
                                            <div className="bg-teal-50 rounded-lg p-6">
                                                <h3 className="text-lg font-semibold text-teal-600 mb-4">Remote Management</h3>
                                                <ul className="space-y-2 text-slate-700 text-sm">
                                                    <li>• IPMI/BMC integration</li>
                                                    <li>• Out-of-band management</li>
                                                    <li>• Remote console access</li>
                                                    <li>• Scheduled operations</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Performance Considerations */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                                        Performance Optimization
                                    </h2>
                                    <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg p-6">
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-emerald-600 mb-2">15TB/hr</div>
                                                <p className="text-sm text-slate-700">Average Throughput</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-teal-600 mb-2">99.9%</div>
                                                <p className="text-sm text-slate-700">Success Rate</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-cyan-600 mb-2">24/7</div>
                                                <p className="text-sm text-slate-700">Operation Support</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Compliance */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                                        Enterprise Compliance
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-slate-700">
                                            D-Secure enterprise server erasure meets the highest compliance standards for data center operations.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-700">SOC 2 Type II regulated</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-700">NIST 800-88 Compliant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
});

export default EnterpriseServersPage;