import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const HardwareDiagnosticsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            ITAD Solutions
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Hardware Diagnostics for ITADs: Comply with R2v3 & eStewards
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn how hardware diagnostics helps IT Asset Disposition companies meet compliance, optimize performance, and maximize residual value.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">How Does Hardware Diagnostics Work?</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Hardware Diagnostics involves conducting a series of automated and manual tests performed by software to gauge the condition, operational efficiency, and performance of various hardware components and peripherals. These tests check various parameters of the hardware component and, based on the result, can mark it as working or faulty.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8">
                            <h4 className="font-bold text-emerald-700 text-xl mb-4">Example: CPU Diagnosis</h4>
                            <p className="text-slate-700 text-lg leading-loose mb-3">
                                Parameters like cache, MMX (multimedia tasks), AVX (complex calculations), SSE (process multiple data), SSE2, SSE3, and register are checked. If any parameter is not working properly, the diagnostic test software will show the result as 'Failed', allowing technicians to pinpoint the faulty part for replacement or repair.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Benefits of Hardware Diagnostics for ITADs</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Helps Meet Compliance</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Hardware Diagnostics is a mandatory requirement in standards such as <strong>e-Stewards, R2V3, and WEEE</strong>. These recycling and environmental standards require ITADs to perform hardware diagnostic tests to identify devices that need to be refurbished and repaired before reuse.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Promotes Reusability</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Accurate diagnosis of system hardware promotes reusability by increasing the lifespan of laptops, desktops, and PCs. Defective parts can be replaced by new parts, and devices can be used for much longer, thereby promoting a circular economy. Even old devices can be donated to non-profit and charitable organizations.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Maximizes Residual Value</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Diagnosing used IT hardware helps in maximizing its residual value. Repairing and refurbishing these devices enables resellers to maximize the efficiency of used devices, thus getting top market value by selling them in the second-hand market. If the device is not reusable, hardware components can be sold separately.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Helps Reduce e-waste</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Reusing IT assets post hardware diagnostics increases the longevity of the equipment. When IT devices are used for longer durations, they do not end up in landfills, reducing e-waste significantly.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Increases Customer Satisfaction</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    ITADs that offer pre-tested, high-quality used IT equipment to organizations and businesses not only ensure reliability but also build customer trust and satisfaction through the provision of dependable devices.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">D-Secure Hardware Diagnostics</h2>
                        <p className="leading-loose text-lg mb-6">
                            For ITADs to make the most out of used IT equipment, choosing the right hardware diagnostic tool is crucial. D-Secure Hardware Diagnostics is a professional tool designed to help ITADs, recyclers, and refurbishers perform comprehensive testing.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Comprehensive Testing</h4>
                                <p className="text-white/90 text-sm">Test PCs, laptops, desktops, and Mac devices thoroughly</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Compliance Reports</h4>
                                <p className="text-white/90 text-sm">Generate detailed diagnostic reports for R2v3 and e-Stewards certification</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Component Analysis</h4>
                                <p className="text-white/90 text-sm">Identify faulty components for targeted repair or replacement</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Value Maximization</h4>
                                <p className="text-white/90 text-sm">Optimize residual value through accurate device assessment</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Hardware diagnostics is essential for IT Asset Disposition companies to meet compliance requirements, promote device reusability, maximize residual value, reduce e-waste, and increase customer satisfaction. D-Secure provides professional hardware diagnostic tools that support R2v3 and e-Stewards certification standards.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Optimize Your ITAD Operations
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Implement comprehensive hardware diagnostics to meet compliance and maximize asset value.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/#products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="hardware-diagnostics" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="hardware-diagnostics" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="hardware-diagnostics" 
            blogTitle="Hardware Diagnostics" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default HardwareDiagnosticsBlog;






