import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const MorganStanleyFineBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
            <SEOHead seo={getBlogSEO({
        title: "Morgan Stanley Fine Analysis",
        excerpt: "Understanding the Morgan Stanley fine and its implications for data disposal.",
        slug: "morgan-stanley-fine",
        author: "Nitish",
        publishDate: "October 13, 2025",
        keywords: "Morgan Stanley, fine, regulatory penalty",
        category: "Financial",
        tag: "Case Study"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Case Study & Compliance
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            Major Bank Faces $35 Million SEC Penalty for Data Protection Failures
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            A detailed analysis of how improper IT asset disposition led to massive regulatory penalties and exposed millions of customer records. Learn critical lessons for your organization.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Case Background: What Went Wrong?</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            This case demonstrates how a major financial institution's failure to properly oversee data center decommissioning resulted in one of the largest data protection fines in financial services history. The series of failures began in 2014 and had repercussions that lasted nearly a decade.
                        </p>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                            <h4 className="font-bold text-slate-900 text-xl mb-3">The Initial Agreement</h4>
                            <p className="text-lg text-slate-700 leading-loose">
                                The bank signed a contract with a moving company for data center decommissioning. The agreement specified that an IT company would provide <strong>data wiping or degaussing services</strong> before selling devices, and detailed reports with <strong>certificates of destruction (COD)</strong> would be provided for audit purposes.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Timeline of Critical Failures</h2>
                        <p className="text-lg leading-loose mb-8">
                            The decommissioning process in 2016 revealed a chain of oversight failures that ultimately led to the massive data breach:
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Vendor Switch Without Notification</h3>
                                <p className="text-white/90 leading-relaxed">
                                    The moving company stopped working with the original certified IT company and engaged a different vendor without notifying the bank. Inventory tracking and certificates of destruction stopped being provided, but the bank failed to notice this critical change.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">No Data Wiping Performed</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Despite having data destruction capabilities, the new IT company was never asked to wipe the drives. They were under the impression that data had already been erased. The drives were sold at online auctions still containing sensitive customer information.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Failure to Review Documentation</h3>
                                <p className="text-white/90 leading-relaxed">
                                    The new vendor provided Certificates of Indemnification (COIs) instead of Certificates of Destruction (CODs). The bank should have noticed the different logo and letterhead, but never reviewed the documents. If reviewed, they would have known drives were not being wiped.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Encryption Not Activated</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Most devices came with encryption features that the bank did not activate until 2018 — two years after the problematic decommissioning began. This meant data on older devices remained completely unprotected.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Whistleblower Alert</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            On October 25, 2017, the bank received an email from an IT consultant in Oklahoma who had purchased hard drives through an online auction. The consultant's message was direct and damning:
                        </p>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                            <p className="text-lg text-slate-700 leading-loose italic">
                                "You are a major financial institution and should be following some very stringent guidelines on how to deal with retiring hardware. Or at the very least getting some kind of verification of data destruction from the vendors you sell equipment to."
                            </p>
                        </div>
                        <p className="text-lg text-slate-700 leading-loose mt-6">
                            It was only after this alert that the bank finally launched an investigation into the 2016 data center decommissioning activities.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Scale of the Data Exposure</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            The scope of the breach was staggering:
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">4,900</h4>
                                <p className="text-slate-700">Devices handled by moving company</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">8,000</h4>
                                <p className="text-slate-700">Backup tapes removed from data centers</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">140,000+</h4>
                                <p className="text-slate-700">Pieces of consumer PII on recovered drives</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">15M</h4>
                                <p className="text-slate-700">Customers notified of potential exposure</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-700 leading-loose mt-6">
                            In July 2020, the bank notified approximately <strong>15 million affected customers</strong> that "some devices assumed to have been erased of all information nonetheless included some unencrypted data" potentially containing PII. The great bulk of the hard drives from the 2016 decommissioning remain missing to this day.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Regulatory Violations and Penalties</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            The SEC cited violations of two critical rules that have been in effect since 2005:
                        </p>
                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Safeguards Rule (Rule 30(a) of Regulation S-P)</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Requires covered entities to adopt written policies and procedures addressing administrative, technical, and physical safeguards for the protection of customer records and information. The bank failed to develop written policies for protecting customer data during decommissioning.
                                </p>
                            </div>
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Disposal Rule (Rule 30(b) of Regulation S-P)</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Requires entities that maintain consumer report information to take reasonable measures to protect against unauthorized access during disposal. The bank kept devices with consumer data but did not take reasonable precautions during decommissioning.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Total Financial Impact</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            This single data breach incident resulted in multiple regulatory and legal actions:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">$60M</h4>
                                <p className="text-slate-700">OCC penalty for data protection lapses</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">$60M</h4>
                                <p className="text-slate-700">Data breach lawsuit settlement</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-3xl mb-2">$35M</h4>
                                <p className="text-slate-700">SEC fine for continuing violations</p>
                            </div>
                        </div>
                        <p className="text-lg text-slate-700 leading-loose mt-6 font-semibold">
                            Total penalties: <strong>$155 Million</strong> — and this doesn't include the cost of customer notifications, remediation efforts, legal fees, and reputational damage.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Regulatory Message and Industry Implications</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            The SEC Enforcement Division's Director stated in the press release:
                        </p>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                            <p className="text-lg text-slate-700 leading-loose italic">
                                "The failures in this case are astonishing. Customers entrust their personal information to financial professionals with the understanding and expectation that it will be protected. If not properly safeguarded, this sensitive information can end up in the wrong hands and have disastrous consequences for investors. Today's action sends a clear message to financial institutions that they must take seriously their obligation to safeguard such data."
                            </p>
                        </div>
                        <p className="text-lg text-slate-700 leading-loose mt-6">
                            This enforcement action signals that regulators will not tolerate any infringement of personal data protection, and violations will not go unpunished. Privacy and data protection laws continue to strengthen, and businesses must be extra cautious with data security.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Critical Lessons for Your Organization</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-4">
                            This incident serves as a stark warning for all businesses that data sanitization and destruction are as crucial as data management:
                        </p>
                        <ul className="space-y-4 text-slate-700 text-lg leading-loose">
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Develop Written Policies:</strong> Create standardized data destruction policies and implement them as part of data management</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Verify Vendor Compliance:</strong> Actively monitor third-party vendors and verify they follow agreed-upon procedures</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Review All Documentation:</strong> Carefully examine all certificates and reports provided by disposal vendors</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Maintain Chain of Custody:</strong> Keep detailed records of all IT assets from acquisition to final disposal</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Enable Encryption:</strong> Activate encryption features on all devices as an additional layer of protection</li>
                            <li className="border-l-4 border-emerald-500 pl-8 py-2"><strong>Choose Certified Partners:</strong> Work only with certified ITAD vendors who provide verifiable proof of destruction</li>
                        </ul>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Protect Your Organization from Similar Penalties
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            D-Secure provides certified data erasure solutions with verifiable proof of destruction, helping you avoid the costly mistakes that led to this historic penalty.
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
          <EngagementSection blogId="morgan-stanley-fine" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="morgan-stanley-fine" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="morgan-stanley-fine" 
            blogTitle="Morgan Stanley Fine" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default MorganStanleyFineBlog;
