import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DataPrivacyObligationsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Global Data Privacy Obligations",
        excerpt: "Understanding your data privacy obligations across different jurisdictions.",
        slug: "data-privacy-obligations",
        author: "Prashant Saini",
        publishDate: "July 2, 2025",
        keywords: "data privacy, GDPR, CCPA, global compliance",
        category: "Regulatory",
        tag: "Compliance"
      })} />

            {/* Hero Section - Full Width */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Data Privacy Compliance
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            Your Responsibility for Data Privacy and Protection
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Whether disposing assets through charities, recyclers, or returning leased equipment — your organization has legal obligations to prevent data breaches.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Main Content - Full Width */}
            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">

                        {/* Introduction */}
                        <div className="space-y-6">
                            <p className="text-slate-700 leading-loose text-xl">
                                Whether an organization is disposing of storage assets by donating to charity, working with responsible recyclers, or returning leased IT assets — there exists a <strong className="text-emerald-600">legal and ethical obligation</strong> to ensure no incident of data breach occurs. These obligations fall under various international laws and company policies that demand strict compliance.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                In an event of data compromise, the organization and its officers face severe financial penalties and risk imprisonment. Understanding and fulfilling these obligations is not optional — it's a fundamental requirement for responsible data stewardship.
                            </p>
                        </div>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                            <h3 className="font-bold text-slate-900 text-xl mb-3">Internal Reassignment Risks</h3>
                            <p className="text-slate-700 text-lg leading-loose">
                                Organizations should also exercise care when IT assets are reassigned internally due to transfers, resignations, or project completions. This becomes particularly important when the same level of confidentiality is NOT maintained across various departments. Data from sensitive projects could inadvertently be exposed to unauthorized personnel.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* Compliance Frameworks */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Global Compliance Requirements</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-xl mb-3">United States Regulations</h4>
                                <p className="text-white/90 text-lg leading-loose mb-4">
                                    It is a standard compliance requirement for organizations to completely erase data beyond recovery scope from all IT assets before recycling or reassignment.
                                </p>
                                <ul className="space-y-2 text-white/85">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>SOX (Sarbanes-Oxley Act)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>HIPAA (Healthcare)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>GLBA (Financial Services)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>PCI-DSS (Payment Card Industry)</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-xl mb-3">European Union Regulations</h4>
                                <p className="text-white/90 text-lg leading-loose mb-4">
                                    EU-GDPR mandates strict data protection with significant penalties for non-compliance — up to €20 million or 4% of annual global revenue.
                                </p>
                                <ul className="space-y-2 text-white/85">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Right to erasure (Right to be forgotten)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Data minimization requirements</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Accountability obligations</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Breach notification requirements</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-xl mb-3">India Data Protection</h4>
                                <p className="text-white/90 text-lg leading-loose">
                                    Under Section 43A of the Indian Information Technology Act, 2000, any body corporate possessing, dealing with, or handling sensitive personal data — that is negligent in implementing reasonable security practices resulting in wrongful loss or gain — may be held liable to pay damages to affected persons.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-xl mb-3">International Standards</h4>
                                <p className="text-white/90 text-lg leading-loose mb-4">
                                    Global security standards require documented proof of data sanitization:
                                </p>
                                <ul className="space-y-2 text-white/85">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>ISO 27001 (Information Security)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>ISAE 3402/3416 (Service Organization Controls)</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>NIST SP 800-88 (Media Sanitization)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Consequences */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Implications of Non-Compliance
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Beyond direct legal penalties, organizations face additional significant consequences that may cause permanent or long-term impact on sustainability:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Financial Impact</h3>
                                <ul className="space-y-3 text-slate-700 text-lg">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>High costs of lawsuits and legal defense</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Regulatory fines and penalties</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Settlement costs for affected parties</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Remediation and notification expenses</li>
                                </ul>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Reputational Damage</h3>
                                <ul className="space-y-3 text-slate-700 text-lg">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Loss of customer trust</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Damage to brand equity and goodwill</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Negative media coverage</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2.5"></span>Loss of business partnerships</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Disposal Scenarios */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            When Data Protection Obligations Apply
                        </h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Charitable Donations</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    When donating IT equipment to charities, schools, or non-profits, all organizational data must be completely erased. The receiving organization does not inherit responsibility for your data — you remain liable for any breaches resulting from residual information.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Recycling and Disposal</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Working with IT asset recyclers doesn't absolve your obligation. Before equipment leaves your custody, data must be verifiably destroyed. Relying solely on recyclers' sanitization processes creates unacceptable risk.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Lease Returns</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Returning leased IT assets requires the same level of data sanitization. Whether the equipment returns to leasing companies, is reassigned to other customers, or is resold — your data must be completely eliminated first.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Internal Reassignment</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Even when equipment stays within the organization, different departments may have varying confidentiality requirements. HR data, financial records, or strategic plans must not be accessible when devices move between teams with different access levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Solution */}
                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Meeting Your Data Protection Obligations</h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Professional data erasure software provides the only reliable method for fulfilling your data protection obligations while generating documented proof of compliance.
                        </p>

                        <div className="bg-white rounded-xl p-8 shadow-md mt-6">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">D-Secure Compliance Features</h3>
                            <ul className="space-y-4 text-slate-700 text-lg">
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>Complete Data Destruction:</strong> Overwrites all data beyond any recovery possibility</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>Tamper-Proof Certificates:</strong> Digital proof of erasure for audit trails and legal documentation</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>Multi-Standard Support:</strong> Complies with NIST, DoD, GDPR, HIPAA, SOX, and more</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>Centralized Reporting:</strong> Cloud-based certificate storage for enterprise compliance management</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>Universal Device Support:</strong> Works with all storage media types across manufacturers</li>
                            </ul>
                        </div>
                    </div>
                </Reveal>
            </section>
      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="data-privacy-obligations" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="data-privacy-obligations" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="data-privacy-obligations" 
            blogTitle="Data Privacy Obligations" 
          />
        </Reveal>
      </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Fulfill Your Data Protection Obligations with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Don't risk penalties and reputation damage. Ensure verifiable compliance with global data protection regulations.
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

export default DataPrivacyObligationsBlog;
