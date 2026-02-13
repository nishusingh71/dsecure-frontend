import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const RightToRepairBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Hardware Diagnostics
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Supporting Right to Repair with Hardware Diagnostics
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn how hardware diagnostics tools empower the Right to Repair movement by providing accurate device diagnosis for efficient repairs.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Right to Repair Movement</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            The <strong>Right to Repair</strong> movement advocates for consumers' ability to repair their own electronic devices without being forced to use manufacturer-authorized services. This movement promotes sustainability, reduces e-waste, and gives consumers more control over their devices.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Hardware diagnostics tools play a crucial role in this movement by enabling independent repair shops and consumers to accurately diagnose device issues without proprietary manufacturer tools.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">How Hardware Diagnostics Supports Right to Repair</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Accurate Diagnosis</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Identify hardware issues quickly without manufacturer-specific tools or expensive diagnostic equipment.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">️ Reduces E-Waste</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Enable repairs that extend device life, reducing the number of devices ending up in landfills.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Cost Savings</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Independent repairs are often more affordable than manufacturer services, saving consumers money.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3"> Empowers Small Businesses</h4>
                                <p className="text-white/90 leading-relaxed">
                                    Independent repair shops can compete fairly with manufacturer-authorized service centers.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Diagnose with D-Secure Hardware Diagnostics
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Empower your repair business with comprehensive hardware diagnostics. Test drives, memory, displays, and more without proprietary tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default RightToRepairBlog;






