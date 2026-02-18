import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const MorganStanleyDataBreachBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
            <SEOHead seo={getBlogSEO({
        title: "Morgan Stanley Data Breach Analysis",
        excerpt: "Lessons from Morgan Stanley's data breach involving improper device disposal.",
        slug: "morgan-stanley-data-breach",
        author: "Nitesh Kushwaha",
        publishDate: "March 19, 2025",
        keywords: "Morgan Stanley, data breach, disposal",
        category: "Financial",
        tag: "Case Study"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full mb-4">
                            Data Breach Case Study
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            Morgan Stanley Pays $60 Million to Settle Data Breach Suit
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            American banking giant faced class-action lawsuit over data breach from improper wiping of decommissioned data center equipment — a cautionary tale for every organization.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl shadow-lg p-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">The Breach at a Glance</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">$60M</p>
                                <p className="text-white/90">Settlement Amount</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">15M</p>
                                <p className="text-white/90">Customers Affected</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">2016</p>
                                <p className="text-white/90">First Incident</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <p className="text-4xl font-bold text-white mb-2">2019</p>
                                <p className="text-white/90">Second Incident</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happened?</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            The breach compromised personal data of approximately <strong>15 million customers</strong>. In July 2020, the bank faced a class-action lawsuit from customers whose data was allegedly compromised due to <strong>improper wiping of decommissioned data center equipment</strong>.
                        </p>
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                            <h4 className="font-bold text-red-700 text-xl mb-3">Compromised Data Included</h4>
                            <p className="text-lg text-slate-700 leading-loose">
                                Customer names and account numbers, Social Security numbers, passport details, contact information, and date of birth — all personally identifiable information (PII).
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Two Major Incidents</h2>

                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h4 className="font-bold text-slate-900 text-xl mb-3">2016 Data Center Incident</h4>
                                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                                    Two data centers were not properly decommissioned due to:
                                </p>
                                <ul className="text-slate-700 text-lg space-y-2">
                                    <li>• Malpractice in vendor selection</li>
                                    <li>• Failure to properly monitor third-party vendor</li>
                                    <li>• Vendor failed to wipe complete data from servers</li>
                                    <li>• Equipment sold to downstream recycler with data intact</li>
                                    <li>• Bank wasn't informed until 2019</li>
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h4 className="font-bold text-slate-900 text-xl mb-3">2019 Missing Server Incident</h4>
                                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                                    A decommissioned server at local branches went missing:
                                </p>
                                <ul className="text-slate-700 text-lg space-y-2">
                                    <li>• Server disappeared from inventory</li>
                                    <li>• Data on hard disk was unencrypted</li>
                                    <li>• Open to access by unauthorized parties</li>
                                    <li>• No documented evidence of data wiping</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">OCC Findings</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            The Office of Comptroller of Currency (OCC) in 2020 found critical failures in Morgan Stanley's decommissioning process:
                        </p>
                        <div className="space-y-6">
                            <div className="border-l-4 border-red-500 pl-8 py-2">
                                <h4 className="font-bold text-red-700 text-xl mb-2">Failed Risk Assessment</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Failed to effectively assess or address risks associated with decommissioning hardware.
                                </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-8 py-2">
                                <h4 className="font-bold text-red-700 text-xl mb-2">Vendor Selection Failure</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Failed to adequately assess subcontracting risks, including due diligence in selecting a vendor.
                                </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-8 py-2">
                                <h4 className="font-bold text-red-700 text-xl mb-2">No Vendor Monitoring</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Failed to monitor vendor performance throughout the decommissioning process.
                                </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-8 py-2">
                                <h4 className="font-bold text-red-700 text-xl mb-2">No Inventory Tracking</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Failed to maintain appropriate inventory of customer data stored on decommissioned devices.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">What Could Have Prevented This Breach?</h2>
                        <p className="text-lg leading-loose mb-8">
                            Adopting professional data erasure software would have resolved the matter in multiple ways:
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">DIY Tool for Onsite Erasure</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Modern certified data erasure software like D-Secure provides DIY utility for onsite erasure of legacy storage media. The IT asset management team could wipe hard drives at their own premises before equipment leaves the facility — preventing any breach of chain of custody.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Tamper-Free Audit Trails</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Certified data erasure software generates digital records for every wiped hard drive that act as secure and reliable tamper-free audit trails. Systematic records serve as documented evidence of data wiping for every decommissioned device.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">GLBA Compliance Adherence</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Data erasure technology helps businesses adhere to banking regulations such as GLBA by complying with the Information Systems provision in the Safeguards Rule. Permanent erasure prevents unwanted exposure of non-public personal information (NPI) beyond any scope of recovery.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Settlement Details</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            If the $60 million settlement is approved by Manhattan federal court, it will be awarded to all those potentially impacted by the breach:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <p className="text-emerald-700 font-bold text-3xl mb-2">Up to $10,000</p>
                                <p className="text-slate-700 font-semibold">Out-of-pocket expenses</p>
                                <p className="text-slate-600 text-sm mt-2">Per class member claim</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <p className="text-emerald-700 font-bold text-3xl mb-2">24 Months</p>
                                <p className="text-slate-700 font-semibold">Fraud insurance services</p>
                                <p className="text-slate-600 text-sm mt-2">Identity protection coverage</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <p className="text-emerald-700 font-bold text-3xl mb-2">$100</p>
                                <p className="text-slate-700 font-semibold">Lost time compensation</p>
                                <p className="text-slate-600 text-sm mt-2">Additional benefit</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Takeaways</h2>
                        <p className="text-lg text-slate-700 leading-loose">
                            Growing data breach incidents underscore that every organization must have reinforced and robust data protection policies. The only way to get rid of sensitive data is to permanently wipe it beyond recovery.
                        </p>
                        <ul className="space-y-4 text-slate-700 text-lg leading-loose mt-4">
                            <li className="border-l-4 border-emerald-500 pl-8 py-2">Due diligence in vendor selection is critical for data protection</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2">Always maintain documented evidence of data wiping</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2">Use onsite erasure to prevent chain of custody breaches</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2">Tamper-free audit trails are essential for compliance</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2">Professional erasure software could have prevented both incidents</li>
                        </ul>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Prevent Data Breaches with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            D-Secure provides professional data erasure solutions with tamper-proof audit trails — ensuring complete protection against data breaches like the Morgan Stanley incident.
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

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="morgan-stanley-data-breach" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="morgan-stanley-data-breach" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="morgan-stanley-data-breach" 
            blogTitle="Morgan Stanley Data Breach" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(MorganStanleyDataBreachBlog);
