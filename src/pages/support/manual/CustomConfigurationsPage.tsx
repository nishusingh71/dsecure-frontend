import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const CustomConfigurationsPage: React.FC = memo(() => {
    return (
        <>
            <Helmet>
                <title>Custom Configurations | D-Secure Manual</title>
                <meta
                    name="description"
                    content="D-Secure custom configurations guide for creating custom erasure profiles and organization policies."
                />
            </Helmet>

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <Reveal>
                            <div className="text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                    Custom <span className="text-emerald-600">Configurations</span>
                                </h1>
                                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                                    Create custom D-Secure erasure profiles and organization policies tailored to your specific requirements
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="space-y-12">
                            {/* Profile Creation */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                                        Custom Erasure Profiles
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-emerald-600">Profile Components</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Erasure algorithm selection</li>
                                                <li>• Number of overwrite passes</li>
                                                <li>• Verification requirements</li>
                                                <li>• Reporting preferences</li>
                                                <li>• Regulatory document generation</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-teal-600">Industry Templates</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Healthcare (HIPAA)</li>
                                                <li>• Financial (PCI DSS)</li>
                                                <li>• Government (FISMA)</li>
                                                <li>• Education (FERPA)</li>
                                                <li>• Legal (Attorney-Client)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Policy Management */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                                        Organization Policies
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Policy Hierarchy</h3>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">1</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">Global Policies</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">2</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">Department Policies</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-white font-bold">3</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">User Policies</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Configuration Builder */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                                        Configuration Builder
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Visual Configuration Tool</h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                                    <h4 className="font-medium text-emerald-600 mb-3">Step 1: Algorithm Selection</h4>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <input type="radio" className="text-emerald-500" />
                                                            <span className="text-sm text-slate-700">DoD 5220.22-M (3 passes)</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <input type="radio" className="text-emerald-500" />
                                                            <span className="text-sm text-slate-700">NIST 800-88 (1 pass)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                                    <h4 className="font-medium text-teal-600 mb-3">Step 2: Verification</h4>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <input type="checkbox" className="text-teal-500" />
                                                            <span className="text-sm text-slate-700">Enable verification</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <input type="checkbox" className="text-teal-500" />
                                                            <span className="text-sm text-slate-700">Generate regulatory document</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Advanced Settings */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                                        Advanced Configuration Options
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-emerald-600">Performance Tuning</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Buffer size optimization</li>
                                                <li>• Thread count configuration</li>
                                                <li>• I/O  settings</li>
                                                <li>• Memory usage limits</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-teal-600">Security Options</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Encryption key management</li>
                                                <li>• Access control lists</li>
                                                <li>• Audit trail settings</li>
                                                <li>• Compliance reporting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Deployment */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                                        Configuration Deployment
                                    </h2>
                                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
                                        <div className="grid md:grid-cols-3 gap-6 text-center">
                                            <div>
                                                <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
                                                <p className="text-sm text-slate-700">Custom Templates</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-teal-600 mb-2">1000+</div>
                                                <p className="text-sm text-slate-700">Deployed Policies</p>
                                            </div>
                                            <div>
                                                <div className="text-3xl font-bold text-cyan-600 mb-2">99%</div>
                                                <p className="text-sm text-slate-700">Compliance Rate</p>
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

export default CustomConfigurationsPage;