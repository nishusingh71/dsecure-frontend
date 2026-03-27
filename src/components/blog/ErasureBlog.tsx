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
import { ShieldIcon, CheckIcon, AlertTriangleIcon, BriefcaseIcon, DatabaseIcon } from "@/components/FlatIcons";

const ErasureBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEOHead seo={getBlogSEO({ title: "Understanding Data Erasure Standards", excerpt: "A deep dive into NIST 800-88, DoD 5220.22-M, and other global sanitization standards.", slug: "erasure-blog", author: "Prashant Saini", publishDate: "August 20, 2025", keywords: "data erasure standards, NIST 800-88 Purge, DoD sanitization method, secure drive wiping laws, certified data destruction", category: "Standard", tag: "Security" })} />
            <section className="py-20 bg-white border-b border-slate-200"><div className="max-w-7xl mx-auto px-4 md:px-8"><Reveal><div className="max-w-3xl space-y-6 text-justify"><div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-sm font-medium"><ShieldIcon className="w-4 h-4" /><span>Sanitization Standards</span></div><h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">Erasure Standards</h1><p className="text-xl text-slate-600 leading-relaxed text-justify">Not all data erasure is created equal. Understanding the nuance between 'Clear', 'Purge', and 'Destroy' is the difference between a secure environment and a regulatory breach.</p></div></Reveal></div></section>
            <section className="py-20 max-w-4xl mx-auto px-4 text-justify"><Reveal><div className="prose prose-slate prose-lg max-w-none space-y-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-justify"><h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3 underline"><BriefcaseIcon className="w-8 h-8 text-slate-600" />NIST 800-88 Purge</h2><p className="text-slate-700 leading-relaxed text-justify">The NIST 800-88 Purge represents the modern gold standard. It triggers media-specific firmware commands that address the entire logical storage space — including areas like HPA, DCO, and remapped sectors that software overwrites often miss.</p></div>
                <div className="bg-slate-900 rounded-2xl p-10 text-white shadow-xl relative overflow-hidden text-justify"><div className="absolute top-0 right-0 p-8 opacity-10"><DatabaseIcon className="w-32 h-32" /></div><h2 className="text-3xl font-bold mb-6">Standard Selection</h2><ul className="space-y-4"><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-slate-400 mt-1" /><span>DoD 5220.22-M for legacy HDD media</span></li><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-slate-400 mt-1" /><span>NIST Purge for high-density NVMe/SSDs</span></li><li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-slate-400 mt-1" /><span>ADISA tested for Forensic recovery resistance</span></li></ul></div>
            </div></Reveal></section>
            <section className="w-full px-4 md:px-8 lg:px-16 py-8"><Reveal><FAQSection faqs={blogFaqs["erasure-standards"]} /></Reveal><Reveal><EngagementSection blogId="erasure-blog" /></Reveal><Reveal><CommentSection blogId="erasure-blog" /></Reveal><Reveal><EnquiryForm blogId="erasure-blog" blogTitle="Erasure Standards" /></Reveal></section>
            <section className="py-20 bg-white text-center"><Reveal><div className="max-w-4xl mx-auto px-4"><h2 className="text-4xl font-bold text-slate-900 mb-6">Choose Your Standard</h2><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link to="/contact" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">Erasure Standard Guide</Link></div></div></Reveal></section>
        </div>
    );
};
export default ErasureBlog;
