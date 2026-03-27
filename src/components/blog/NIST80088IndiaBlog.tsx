import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import FAQSection from "./FAQSection";
import { blogFaqs } from "@/data/blogFaqs";
import SEOHead from "@/components/SEOHead";
import { getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, DatabaseIcon } from "@/components/FlatIcons";

const NIST80088IndiaBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEOHead seo={getBlogSEO({ title: "NIST 800-88 Compliance in India", excerpt: "How NIST 800-88 standards help Indian enterprises achieve DPDP Act compliance and secure media sanitization.", slug: "nist-800-88-india", author: "Nitesh Kushwaha", publishDate: "January 12, 2026", keywords: "NIST 800-88 India, DPDP Act compliance, CERT-In erasure, RBI data disposal, India data privacy standards", category: "Compliance", tag: "India" })} />
            <section className="py-20 bg-white border-b border-slate-200"><div className="max-w-7xl mx-auto px-4 md:px-8"><Reveal><div className="max-w-3xl space-y-6 text-justify"><div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium"><GlobeIcon className="w-4 h-4" /><span>India Compliance</span></div><h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">NIST 800-88 in India</h1><p className="text-xl text-slate-600 leading-relaxed text-justify">NIST 800-88 is recognized by Indian regulators (MeitY, CERT-In, RBI) as the gold standard for media sanitization, essential for meeting the Right to Erasure under the DPDP Act 2023.</p></div></Reveal></div></section>
            <section className="py-20 max-w-4xl mx-auto px-4 text-justify"><Reveal><div className="prose prose-slate prose-lg max-w-none space-y-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-justify"><h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3 underline"><ShieldIcon className="w-8 h-8 text-cyan-600" />DPDP Act Alignment</h2><p className="text-slate-700 leading-relaxed text-justify">The Digital Personal Data Protection (DPDP) Act necessitates 'Defensible Deletion'. Implementing NIST-compliant erasure ensures Indian businesses can demonstrate verified data destruction to regulators with tamper-proof certificates.</p></div>
                <div className="bg-cyan-900 rounded-2xl p-10 text-white shadow-xl relative overflow-hidden text-justify"><div className="absolute top-0 right-0 p-8 opacity-10"><DatabaseIcon className="w-32 h-32" /></div><h2 className="text-3xl font-bold mb-6">India Requirements</h2><ul className="space-y-4"><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-cyan-400 mt-1" /><span>DPDP Act Right to Erasure compliance</span></li><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-cyan-400 mt-1" /><span>RBI & CERT-In audit alignment</span></li><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-cyan-400 mt-1" /><span>NIST Clear & Purge for local OEMs</span></li></ul></div>
            </div></Reveal></section>
            <section className="w-full px-4 md:px-8 lg:px-16 py-8"><Reveal><FAQSection faqs={blogFaqs["nist-800-88-india"]} /></Reveal><Reveal><EngagementSection blogId="nist-800-88-india" /></Reveal><Reveal><CommentSection blogId="nist-800-88-india" /></Reveal><Reveal><EnquiryForm blogId="nist-800-88-india" blogTitle="NIST 800-88 India" /></Reveal></section>
            <section className="py-20 bg-white text-center"><Reveal><div className="max-w-4xl mx-auto px-4"><h2 className="text-4xl font-bold text-slate-900 mb-6">India's Compliance Partner</h2><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/contact" className="inline-flex items-center justify-center bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg">DPDP Compliance Demo</Link></div></div></Reveal></section>
        </div>
    );
};
export default NIST80088IndiaBlog;
