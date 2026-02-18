import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WorldClassNPSBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Achieving World-Class NPS in ITAD",
        excerpt: "How data erasure contributes to world-class customer satisfaction in ITAD.",
        slug: "world-class-nps",
        author: "Prashant Saini",
        publishDate: "December 25, 2025",
        keywords: "NPS, customer satisfaction, ITAD",
        category: "Strategy",
        tag: "Business"
      })} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Customer Success
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            The Journey to Excellence: Achieving a World-Class NPS
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Discover how D-Secure achieved a high Net Promoter Score of 70.4% — rated by customers on a scale of 0-10 — through continuous innovation and exceptional support.
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
                                The secret to building a successful business lies in <strong className="text-emerald-600">consistently understanding and mapping the customer journey</strong> at every stage through an effective feedback mechanism. Regular feedback through surveys enables organizations to identify customer concerns, providing opportunities to improve, innovate, and establish long-term relationships.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                Such surveys not only help businesses address customer needs but also reinforce trust in the brand's authenticity and commitment to excellence. This process becomes more organized when using measurable parameters on a discrete scale to evaluate how well a business meets customer expectations regarding products and services.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* What is NPS */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Understanding the Net Promoter Score
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Bain and Company innovated a metric called the Net Promoter Score (NPS). It helps businesses understand customer satisfaction and loyalty levels toward their brand. The NPS is calculated based on ratings submitted through customer surveys, with questions designed to capture customer sentiment.
                        </p>

                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">How NPS Works</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                Customers rate their inclination to recommend the brand to friends and colleagues on a scale from 0 (not at all likely) to 10 (extremely likely). The formula is simple: <strong>% Promoters – % Detractors</strong>, resulting in a score between -100 and +100.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center">
                                <h4 className="font-bold text-2xl mb-2">9-10</h4>
                                <p className="font-semibold text-lg mb-2">Promoters</p>
                                <p className="text-white/90 text-sm">Enthusiastic customers who actively recommend the brand</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-500 to-teal-500 rounded-xl p-6 text-white text-center">
                                <h4 className="font-bold text-2xl mb-2">7-8</h4>
                                <p className="font-semibold text-lg mb-2">Passives</p>
                                <p className="text-white/90 text-sm">Satisfied but not enthusiastic; potential to decrease NPS</p>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white text-center">
                                <h4 className="font-bold text-2xl mb-2">0-6</h4>
                                <p className="font-semibold text-lg mb-2">Detractors</p>
                                <p className="text-white/90 text-sm">Unhappy customers who may share negative experiences</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* NPS Achievement */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">D-Secure Achieves NPS of 70.4%</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <p className="text-5xl font-bold mb-2">60%</p>
                                <p className="text-lg">NPS in 2023</p>
                            </div>
                            <div className="bg-white/20 rounded-xl p-6 text-center border-2 border-white/30">
                                <p className="text-5xl font-bold mb-2">70.4%</p>
                                <p className="text-lg">NPS in January 2025</p>
                            </div>
                        </div>

                        <p className="leading-loose text-lg">
                            At D-Secure, we are always listening to our customers. We recognize their needs to fine-tune our solutions for data erasure and diagnostics. The company's approach is built on understanding the diverse data-wiping requirements of our clientele — whether serving large IT Asset Disposition (ITAD) companies, MSPs offering Erasure as a Service (EaaS), or organizations focusing on compliance and risk mitigation.
                        </p>
                    </div>
                </Reveal>

                {/* What Helped Achieve This */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            How We Achieved Customer Success
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Open Communication</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Establishing multiple communication channels enables meaningful interaction with customers as the first step toward loyal brand relationships. Customers can reach us via chat, message, or audio call for product inquiries, suggestions, or deployment issues. Our support team pre-schedules video conference calls for product demonstrations or issue resolution. For ITAD partners, premium support ensures no gap in service with tailored software solutions.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Continuous Innovation</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Our R&D team constantly seeks opportunities to improve products, automate data-wiping workflows, and support newer devices like Apple Silicon Chip-based Macs (M3, M2, M1). Continuous product updates are released with customers informed proactively. This approach has won customer trust and transformed connections into long-term partnerships.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Unmatched Technical Support</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure provides technical support without any extra charges, unlike other industry players. Customer issues are resolved with prompt responses regardless of complexity, with periodic progress updates throughout the resolution process.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Customer Testimonials */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            What Our Customers Are Saying
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                        HP
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-slate-900">Enterprise Client</p>
                                        <p className="text-sm text-slate-500">Technology Sector</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-lg leading-relaxed italic">
                                    "The wiping capability with built-in system diagnostics has been very helpful. The software helped us wipe multiple drives flawlessly with verifiable reports and certificates — really helpful for audit and compliance needs."
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                        AIA
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-slate-900">Insurance Leader</p>
                                        <p className="text-sm text-slate-500">Financial Services</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-lg leading-relaxed italic">
                                    "A remarkable solution showcasing impressive features, competitive edge, product certifications, and complimentary 24/5 customer service. DOD compliance is a notable benefit. Fulfills its commitments as a valuable option for reliable data erasure."
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                        NA
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-slate-900">Storage Solutions</p>
                                        <p className="text-sm text-slate-500">Data Infrastructure</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-lg leading-relaxed italic">
                                    "Great experience with secure erasure of hard drives and SSDs. Technical and customer support team were very prompt in resolving queries, and the detailed product demo was superb. The certified software is simple to use and highly recommended."
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                        WW
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-slate-900">MSP Partner</p>
                                        <p className="text-sm text-slate-500">ITAD Services</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-lg leading-relaxed italic">
                                    "As an MSP partner, we provide services to ITAD companies, financial and government institutions. Valid certification minimizes risks and ensures GDPR and ISO 27001 compliance. Tech and sales support is always efficient — a real partner we can count on."
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Way Ahead */}
                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Way Forward</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            By listening to customers, D-Secure stays focused on exceeding expectations through continuous enhancements in data erasure and diagnostics solutions and support. Our high NPS is the authentic badge of honor earned through steady actions and regular communication with customers — and we strive to go even higher.
                        </p>
                    </div>
                </Reveal>

                {/* FAQs */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-8">
                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is a Net Promoter Score?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Net Promoter Score (NPS) is a metric developed by Bain and Company that measures customer satisfaction and loyalty. Customers rate their likelihood to recommend a brand on a 0-10 scale, and the score is calculated as the percentage of Promoters (9-10) minus Detractors (0-6).
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">How is NPS helpful?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    NPS helps businesses understand customers' perception of their brand. It identifies gaps and opportunities to improve products and services, predict business growth, and build stronger customer relationships through continuous improvement.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">How has D-Secure scored on the NPS scale?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure achieved an NPS of 70.4% in January 2025, up from 60% in 2023. This world-class score reflects our commitment to customer success through open communication, continuous innovation, and unmatched technical support.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">Who are the "passives" according to NPS?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Passives are customers who rate a brand 7 or 8 on the NPS scale. While seemingly satisfied, they are not enthusiastic advocates and could potentially decrease the overall NPS. Converting passives into promoters is a key goal for customer-focused organizations.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="world-class-n-p-s" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="world-class-n-p-s" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="world-class-n-p-s" 
            blogTitle="World Class N P S" 
          />
        </Reveal>
      </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Experience World-Class Service with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of satisfied customers who trust D-Secure for certified data erasure and diagnostics solutions with unmatched support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Get Started Today
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

export default React.memo(WorldClassNPSBlog);






