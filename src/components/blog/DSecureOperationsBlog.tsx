import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DSecureOperationsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "D-Secure Operations Guide",
        excerpt: "Comprehensive operational guide for maximizing D-Secure data erasure efficiency.",
        slug: "dsecure-operations",
        author: "Prashant Saini",
        publishDate: "May 11, 2025",
        keywords: "D-Secure, operations, best practices",
        category: "Guide",
        tag: "Product"
      })} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Company Update
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            D-Secure: Growing Stronger and Expanding Operations
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            We're fully operational, continuously innovating, and committed to delivering world-class data erasure and diagnostic solutions to organizations worldwide.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Main Content */}
            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">

                        {/* Introduction */}
                        <div className="space-y-6">
                            <p className="text-slate-700 leading-loose text-xl">
                                D-Secure remains <strong className="text-emerald-600">fully operational and thriving</strong>, providing secure, reliable, and certified data erasure and diagnostic solutions to customers across the globe. Our operations and commitment remain steadfast as we continue to grow and expand our services.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                We have always been committed to supporting businesses in putting their best foot forward — whether by ensuring data security for their customers or by helping them achieve compliance with data protection laws and regulations. Our revolutionary data erasure, diagnostics, and verification software products continue to set industry standards.
                            </p>
                        </div>

                        {/* Company Background */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">About D-Secure</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                D-Secure has empowered thousands of organizations to ensure data privacy, maintain regulatory compliance, and support sustainability through secure device reuse. As a trusted data care expert, we provide comprehensive software solutions for Data Erasure, Hardware Diagnostics, and Drive Verification.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* Why D-Secure Section */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Why Organizations Choose D-Secure
                        </h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Offering a diverse product line in Data Erasure, Device Diagnostics, and Drive Verification, D-Secure is centered around empowering enterprises, ITADs, MSPs, SMBs, and government institutions to safeguard their data and ensure safe disposal while promoting device reuse.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Comprehensive Device Support</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Erasure compatibility with SSDs, HDDs, Mac devices, Chromebooks, servers, PCs, and laptops — D-Secure Drive Eraser handles all your storage media.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Global Standards Compliance</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Utilizing recognized data-wiping methods including US DoD 5220.22, NIST 800-88 Clear, and NIST SP 800-88 Purge for complete and permanent data erasure.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Remote Wiping Solutions</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Keep data secure when employee journeys end, work-from-home projects close, or remotely located devices get upgraded with our remote erasure capabilities.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Centralized Cloud Management</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Erasure reports saved in a centralized cloud console with anytime access. Digitally signed reports help achieve compliance with CCPA, HIPAA, SOX, GLBA, and EU-GDPR.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Additional Solutions */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Complete Solution Portfolio
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Hardware Diagnostics</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure Hardware Diagnostics aids in identifying faulty components, saving time and resources, and promoting device reuse. Our Mobile Diagnostics tool helps test mobile components like GPS, battery, and Bluetooth with 50+ automated and assisted tests for iOS and Android devices.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Drive Verification</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure Drive Verifier validates the effectiveness of data erasure by checking erased drives for any remaining data traces across PCs and laptops, ensuring complete sanitization confidence.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">ESG Sustainability Reporting</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Our ESG report helps organizations quantify environmental benefits of secure data erasure, highlighting CO₂ emission reductions achieved through devices wiped and eventually reused. Measure sustainability impact, enhance brand reputation, and build stakeholder trust.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Milestones */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Achievements and Milestones
                        </h2>

                        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl p-8 text-white">
                            <div className="text-center mb-6">
                                <span className="text-5xl font-bold">70.4%</span>
                                <p className="text-xl mt-2 text-white/90">Net Promoter Score (NPS)</p>
                            </div>
                            <p className="text-lg leading-relaxed text-center text-white/90">
                                This 'World Class' rating reflects our dedication to delivering exceptional customer service and tailored data erasure solutions, showing improvement from previous years and our commitment to continuous enhancement.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Trusted by Industry Leaders</h3>
                            <p className="text-slate-700 text-lg leading-loose">
                                Our clientele spans virtually all industries including healthcare, banking, finance, insurance, ITES, automobile, and consulting. Organizations across the globe rely on D-Secure data erasure software for their data sanitization needs — from small businesses to multinational enterprises and government agencies.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Future Vision */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Growing, Expanding, and Innovating
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            D-Secure isn't just operational — we're thriving. From new partnerships to enhanced solutions, we're scaling new heights in secure data erasure, device diagnostics, and verification. The journey continues, stronger and more impactful each day.
                        </p>

                        <div className="bg-slate-100 rounded-xl p-8 mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Upcoming Innovations</h3>
                            <ul className="space-y-3 text-slate-700 text-lg">
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-3 mt-1">→</span>
                                    Solutions for erasing virtual machines and LUNs
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-3 mt-1">→</span>
                                    Automated workflows and autopilot MDM detection
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-3 mt-1">→</span>
                                    Support for newer standards like IEEE 2833:2022 Purge and Clear
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-3 mt-1">→</span>
                                    Continuous platform enhancements and feature releases
                                </li>
                            </ul>
                        </div>
                    </div>
                </Reveal>
            </section>
      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="d-secure-operations" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="d-secure-operations" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="d-secure-operations" 
            blogTitle="D Secure Operations" 
          />
        </Reveal>
      </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Experience D-Secure Today
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of organizations worldwide who trust D-Secure for secure data erasure, device diagnostics, and compliance documentation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Request Free Demo
                            </Link>
                            <Link
                                to="/products"
                                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                            >
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default React.memo(DSecureOperationsBlog);






