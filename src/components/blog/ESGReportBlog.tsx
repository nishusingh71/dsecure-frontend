import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ESGReportBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "ESG Reporting and Data Erasure",
        excerpt: "How data erasure contributes to ESG goals and reporting requirements.",
        slug: "esg-report",
        author: "Nitesh Kushwaha",
        publishDate: "August 17, 2025",
        keywords: "ESG, reporting, sustainability metrics",
        category: "Sustainability",
        tag: "ESG"
      })} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Sustainability
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            ESG Reporting: Measuring CO₂ Reduction Through Data Erasure
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn how D-Secure's ESG report helps organizations gain competitive advantage, enhance brand reputation, and build stakeholder trust through measurable sustainability impact.
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
                                According to the Deloitte 2024 CxO Sustainability Report, based on insights from over 2,100 executives across 27 countries, <strong className="text-emerald-600">climate change ranks among the top organizational priorities</strong>. While 70% of organizations anticipate environmental impact on their operations, 60% report pressure from leadership to take action on climate issues.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                When organizations implement policies to eliminate e-waste, they take significant steps in reducing their carbon footprint. Software-based media sanitization is an environmentally conscious measure that securely erases data while extending IT asset lifespan — promoting reuse and preventing e-waste generation.
                            </p>
                        </div>

                        {/* Key Insight */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">The Environmental Cost of Physical Destruction</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                Traditional physical destruction methods like shredding, incinerating, and disintegrating create massive amounts of e-waste and hinder sustainability progress. In contrast, data erasure enables device reuse, supporting the circular economy and reducing environmental impact.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* Data Erasure & Carbon Emissions */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            How Data Erasure Prevents Carbon Emissions
                        </h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Physical disposal of IT assets creates e-waste, but environmental damage extends beyond that. Rare Earth Elements (REE) are mined for manufacturing IT assets. Acquiring raw materials, manufacturing, assembling, transporting, and distributing ICT goods all release harmful emissions.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center">
                                <span className="text-4xl font-bold">200 kg</span>
                                <p className="text-white/90 mt-2">CO₂e per Laptop</p>
                            </div>
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl p-6 text-white text-center">
                                <span className="text-4xl font-bold">350 kg</span>
                                <p className="text-white/90 mt-2">CO₂e per Desktop</p>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-xl p-6 text-white text-center">
                                <span className="text-4xl font-bold">50 kg</span>
                                <p className="text-white/90 mt-2">CO₂e per Smartphone</p>
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm mt-4 text-center italic">
                            Based on research published in ScienceDirect — embodied emissions per device before reaching end customers.
                        </p>

                        <div className="mt-8 space-y-6">
                            <p className="text-slate-700 leading-loose text-lg">
                                The longer an IT asset remains in the usage cycle, the better for the environment. Affordable data erasure ensures data security while enabling IT asset repurposing. Reuse supports the circular economy, maximizing device lifespan and minimizing e-waste.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                According to the EU Waste Framework Directive (Directive 2008/98/EC), waste prevention ranks highest in the priority order, followed by reuse preparation, which precedes recycling. Higher IT asset reuse rates mean lower waste production and reduced CO₂e release.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* D-Secure ESG Report */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            D-Secure ESG Report and Sustainability
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            The D-Secure ESG report is a comprehensive document showcasing the number of IT assets securely erased over twelve months, with corresponding CO₂ equivalent emissions saved. Monthly graphical representations make environmental impact easy to understand and communicate.
                        </p>

                        <div className="bg-slate-100 rounded-xl p-8 mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Example Impact Calculation</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                An organization that wiped 351 laptops, 5 desktops, and 47 mobile devices over one year would reflect <strong className="text-emerald-600">116.38 tons of CO₂ equivalent emissions saved</strong> in their D-Secure ESG report. Each wipe gets recorded regardless of the device being wiped multiple times.
                            </p>
                        </div>

                        <p className="text-slate-700 leading-loose text-lg mt-6">
                            This data can be viewed through the Environmental Protection Agency's (EPA) Greenhouse Gas Equivalencies Calculator, showing estimated GHG emissions produced, avoided, and carbon sequestered — defined by the US Geological Survey as "the process of capturing and storing atmospheric CO₂."
                        </p>
                    </div>
                </Reveal>

                {/* Benefits Section */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Benefits of ESG Reporting
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Accurate ESG Representation</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    According to the PwC Global CSRD Survey 2024, 84% of organizations are currently using or planning to use carbon calculation tools. D-Secure's ESG report provides transparent representation of CO₂e prevention on monthly and annual basis, categorized by device type.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Addressing Double Materiality</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Sustainability directives like CSRD emphasize double materiality — reporting not only on business performance but also on environmental impact. The D-Secure ESG Report provides data on devices erased and corresponding carbon dioxide equivalent emissions reduced by choosing data erasure over physical destruction.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Competitive Edge</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Per PwC's Global Workforce ESG Preferences Study 2024, over 60% of employees consider environmental policies key factors when choosing employers. Deloitte reports that 83% of investors incorporate sustainability information into analyses. Organizations achieving ESG goals with documented proof gain competitive advantage and higher financial returns.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Monetary Benefits</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The UNFCCC issues Certified Emission Reductions (CERs) measured in tonnes of CO₂e. Organizations achieving carbon neutrality can sell carbon credits to other entities, providing dual benefits of reducing global carbon emissions while increasing profits.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Building Brand Reputation & Stakeholder Trust</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Deloitte's 2024 surveys revealed that 20% of executives expected brand reputation enhancement, 17% anticipated increased stakeholder trust, and 15% saw improved talent attraction. Over 40% cited greater efficiency, reduced risk, and increased ROI as top internal benefits of ESG reporting.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* How to Access */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Access Your D-Secure ESG Report</h2>
                        <p className="leading-loose text-lg mb-6">
                            D-Secure ESG reports are available post-purchase of licenses for Drive, Mobile, Chromebook, and Mac devices. IT administrators can request feature activation in their Cloud Console to view and download reports.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Multi-Device Support</h4>
                                <p className="text-white/90">
                                    Generate ESG reports for laptops, desktops, mobile devices, Chromebooks, and Mac devices.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Cloud Console Access</h4>
                                <p className="text-white/90">
                                    View and download ESG reports anytime through your centralized D-Secure Cloud Console.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/#products"
                            className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
                        >
                            Explore D-Secure Solutions
                        </Link>
                    </div>
                </Reveal>

                {/* FAQs */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-8">
                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">Do organizations have to comply with environmental sustainability directives?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Regulations like the EU Corporate Sustainability Reporting Directive (EU-CSRD) mandate transparent reporting on environment, sustainability, and governance factors. Voluntary initiatives like the Global Reporting Initiative (GRI) have also become widely accepted standards for sustainability reporting.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What should organizations report for sustainability compliance?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations must report on environmental impact, sustainability initiatives, and governance factors. This includes carbon footprint data, waste reduction efforts, and measures taken to extend IT asset lifecycles through responsible data disposal methods.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is the D-Secure ESG report?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The D-Secure ESG report is a comprehensive document that quantifies the environmental benefits of secure data erasure. It shows CO₂ equivalent emissions saved by device type over a twelve-month period, providing organizations with verifiable proof of their sustainability contributions.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Takeaway */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Takeaway</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Sustainability reporting is key to brand reputation, stakeholder trust, and financial gains. Regulations and investors expect organizations to adopt ESG initiatives. D-Secure enables secure data erasure across device types, extending lifecycles and reducing carbon footprints.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Our ESG report features quantified carbon dioxide equivalent emissions saved, offering businesses a mechanism to demonstrate environmental impact. Organizations devoted to sustainability gain the D-Secure advantage of transparent, verifiable reporting.
                        </p>
                    </div>
                </Reveal>
            </section>
      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="e-s-g-report" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="e-s-g-report" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="e-s-g-report" 
            blogTitle="E S G Report" 
          />
        </Reveal>
      </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Measure Your Sustainability Impact with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join organizations worldwide using D-Secure ESG reports to demonstrate environmental commitment, build stakeholder trust, and gain competitive advantage.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Request Free Demo
                            </Link>
                            <Link
                                to="/#products"
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

export default ESGReportBlog;






