import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const MarriottSettlementBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Marriott Data Breach Settlement",
        excerpt: "Lessons from the Marriott data breach and settlement for data security.",
        slug: "marriott-settlement",
        author: "Prashant Saini",
        publishDate: "December 27, 2025",
        keywords: "Marriott, data breach, settlement",
        category: "Breach Analysis",
        tag: "Case Study"
      })} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Data Breach
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Marriott's $52M Settlement: The Cost of Improper Data Handling
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            A wake-up call for the hospitality industry — how poor cybersecurity and data disposal led to one of the largest data breach settlements.
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
                                Hospitality giant Marriott International's recent settlement in October 2024 — worth <strong className="text-emerald-600">$52 Million</strong> with the Federal Trade Commission (FTC) — is a wake-up call for the hospitality industry. Marriott and its subsidiary Starwood Hotel's poor cybersecurity setup, non-adherence to data minimization principles, and failure to implement reasonable data security led to 3 data breach episodes between 2014 and 2020.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                These breaches impacted more than <strong>344 million customers worldwide</strong>. Marriott was also fined £18.4 Million by the UK's Information Commissioner's Office (ICO) in 2020 for violating GDPR. The FTC finalized the order on December 20th, 2024.
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                                <p className="text-slate-700 leading-loose text-lg">
                                    <strong>Warning:</strong> Troubles for Marriott might not be over. More investigations could be initiated by regulatory bodies, class action suits could be filed by affected parties, and additional penalties could follow.
                                </p>
                            </div>
                        </div>

                    </div>
                </Reveal>

                {/* Chronology of Breaches */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            The Chronology of Breaches
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Marriott acquired Starwood Hotels & Resorts in 2016 for $12.2 Billion, making it a 100% subsidiary. They then took over Starwood's computer network and began integrating systems. However, approximately 4 days after announcing the acquisition, Starwood notified customers of a 14-month long data breach exposing over 40,000 customers' personal data.
                        </p>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-r-lg">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Breach #1 - Starwood (Pre-Acquisition)</h3>
                                <ul className="space-y-2 text-slate-700 text-lg">
                                    <li>• Unprotected admin accounts and weak credentials allowed hackers to install malware</li>
                                    <li>• Malware accessed customer names, payment information, and more</li>
                                    <li>• Forensic examination revealed inadequate firewalls, outdated software, no MFA, and weak access controls</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-r-lg">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Breach #2 - Starwood (Post-Acquisition)</h3>
                                <ul className="space-y-2 text-slate-700 text-lg">
                                    <li>• Marriott failed to detect the existing intrusion in Starwood's network for almost two years</li>
                                    <li>• <strong>339 million customers'</strong> personal data leaked including names, DOB, addresses, emails, loyalty program info, and payment details</li>
                                    <li>• Same root causes: inadequate firewalls, unencrypted payment data, insecure storage</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-r-lg">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Breach #3 - Marriott's Own Network</h3>
                                <ul className="space-y-2 text-slate-700 text-lg">
                                    <li>• In 2020, malicious actors gained access using compromised credentials of franchised property employees</li>
                                    <li>• Intrusion continued until discovered in February 2022</li>
                                    <li>• <strong>5.2 million guest records</strong> accessed, including 1.8 million US customers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Reasons Behind Breaches */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Root Causes Identified by FTC</h2>

                        <p className="leading-loose text-lg mb-6">
                            The FTC complaint severely criticized Marriott's Information Security practices, stating they "failed to provide reasonable or appropriate security for the personal information collected and maintained."
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">Weak Password Policy</h4>
                                <p className="text-white/90 text-xs">Employees allowed to use weak, default, or blank passwords</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">Outdated Software</h4>
                                <p className="text-white/90 text-xs">Failed to regularly update patches; used unsupported systems</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">No Network Monitoring</h4>
                                <p className="text-white/90 text-xs">Could not distinguish between authorized and unauthorized activity</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">Inappropriate Access Controls</h4>
                                <p className="text-white/90 text-xs">Ex-employee accounts not deactivated timely</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">Weak Firewalls</h4>
                                <p className="text-white/90 text-xs">Failed to block unauthorized network intrusions</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">No Network Segregation</h4>
                                <p className="text-white/90 text-xs">Hackers could roam freely between hotel and corporate networks</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">No Multifactor Authentication</h4>
                                <p className="text-white/90 text-xs">Sensitive data and payment systems lacked MFA</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-bold text-sm mb-2">Data Minimization Overlooked</h4>
                                <p className="text-white/90 text-xs">Excessive data retention amplified breach magnitude</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Key Settlement Provisions */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Key Settlement Provisions
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Apart from monetary fines, the settlement requires Marriott to strengthen cybersecurity practices:
                        </p>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Transparency Requirements</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Must clearly inform customers how personal information is collected, stored, processed, deleted, and shared. Must accurately inform about security measures implemented.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Information Security Program</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Must document, implement, and maintain an annually assessed security program with data access controls, strong password policies, least privilege principles, incident response plans, and regular security reporting to top management including the CEO.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Asset Inventory & Data Erasure</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Must inventorize and classify IT assets containing personal data. When any device leaves company control, sensitive data must be erased, encrypted, or the device destroyed.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Data Minimization & Disposal</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Must implement data minimization and disposal policies so less data is collected and retained.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Third-Party Assessments</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The Information Security Program must be assessed by a third party every two years for a period of 20 years.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Customer Data Deletion</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Must provide customers with a clear and explicit link on their website and mobile application to request deletion of their personal data.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Conclusion */}
                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">A Wake-Up Call for the Industry</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            The hospitality industry spans multiple geographies, each with local, state, and federal data privacy laws. Complying with them can be daunting, but the basic premise is to ensure the security of confidential data and allow customers control over how their personal data is collected, stored, processed, and disposed.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Using professional data wiping tools like D-Secure can help the hospitality industry erase sensitive data beyond recovery, eliminating data leakage chances and staying compliant with EU-GDPR, CCPA, FTC, and other state laws.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg font-semibold">
                            As data security gains more prominence, these types of incidents will keep happening unless proactive action is taken. It doesn't matter what size your organization is — data privacy is your moral, legal, and ethical responsibility.
                        </p>
                    </div>
                </Reveal>
            </section>
      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="marriott-settlement" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="marriott-settlement" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="marriott-settlement" 
            blogTitle="Marriott Settlement" 
          />
        </Reveal>
      </section>


            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Don't Become the Next Data Breach Headline
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Implement proper data disposal practices with D-Secure to prevent costly settlements and protect your customers' trust.
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

export default React.memo(MarriottSettlementBlog);






