import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, LightningIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const AutomatedErasureBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-automated-erasure')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4">
                    Automation & Efficiency
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Automate Data Erasure</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Scale your data sanitization operations with intelligent automation that reduces human error and accelerates device disposition.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Why Automate */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Why Automate Data Erasure?</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Manual data erasure processes are time-consuming, error-prone, and don't scale. Automation eliminates these bottlenecks while improving security and compliance.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <h4 className="font-bold text-red-900 mb-2">❌ Manual Process Problems</h4>
                            <ul className="text-sm text-red-800 space-y-1">
                                <li>• Operator mistakes and inconsistency</li>
                                <li>• Time-intensive setup per device</li>
                                <li>• Difficulty tracking 100s of devices</li>
                                <li>• Certificate generation delays</li>
                                <li>• No real-time visibility</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <h4 className="font-bold text-green-900 mb-2">✅ Automation Benefits</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Consistent, repeatable results</li>
                                <li>• Hands-off operation after setup</li>
                                <li>• Centralized dashboard for all devices</li>
                                <li>• Instant certificate generation</li>
                                <li>• Live status updates and alerts</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Key Automation Features */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Key Automation Capabilities</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-purple-900 mb-3">1. Batch Processing</h3>
                            <p className="text-slate-700 mb-3">
                                Process multiple devices simultaneously without manual intervention. Set policies once and apply them to thousands of devices.
                            </p>
                            <div className="bg-slate-900 text-slate-100 p-4 rounded font-mono text-sm">
                                <p className="text-purple-400 mb-2">// Example: Batch Configuration</p>
                                <p>Devices: 500 laptops</p>
                                <p>Method: DoD 3-pass</p>
                                <p>Parallel Operations: 50 devices</p>
                                <p className="text-green-400 mt-2">→ Complete in 4 hours vs 2 weeks manual</p>
                            </div>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">2. Policy-Based Automation</h3>
                            <p className="text-slate-700 mb-3">
                                Define erasure policies based on device type, data classification, or regulatory requirements. Policies automatically apply to matching devices.
                            </p>
                            <ul className="space-y-2 text-slate-700">
                                <li className="flex items-start gap-2">
                                    <CheckIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" filled={true} />
                                    <span><strong>By Device Type:</strong> Laptops get DoD 3-pass, servers get DoD 7-pass</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" filled={true} />
                                    <span><strong>By Department:</strong> Finance devices require additional verification</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" filled={true} />
                                    <span><strong>By Compliance Need:</strong> HIPAA devices trigger specific audit trails</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">3. Intelligent Scheduling</h3>
                            <p className="text-slate-700 mb-3">
                                Schedule erasure operations during off-hours to maximize resource utilization without impacting business operations.
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded border border-blue-200">
                                    <p className="text-sm font-semibold text-blue-900 mb-1">Queue Management</p>
                                    <p className="text-xs text-slate-600">Auto-prioritize based on SLA requirements</p>
                                </div>
                                <div className="bg-white p-3 rounded border border-blue-200">
                                    <p className="text-sm font-semibold text-blue-900 mb-1">Load Balancing</p>
                                    <p className="text-xs text-slate-600">Distribute workload across available resources</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-teal-900 mb-3">4. Automated Verification & Certification</h3>
                            <p className="text-slate-700 mb-3">
                                Automatically verify erasure success and generate compliance certificates without manual review.
                            </p>
                            <ul className="space-y-1 text-sm text-slate-700 ml-4">
                                <li>• Real-time verification during erasure</li>
                                <li>• Automatic retry on verification failure</li>
                                <li>• Instant certificate generation upon success</li>
                                <li>• Automated email delivery to stakeholders</li>
                                <li>• Integration with asset management systems</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Workflow Automation */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Automated Workflow Example</h2>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Device Check-In</h4>
                                    <p className="text-sm text-slate-600">Scan barcode/serial number → System automatically identifies device and assigns policy</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Hardware Detection</h4>
                                    <p className="text-sm text-slate-600">System detects all storage devices, checks for encryption, selects optimal method</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Erasure Execution</h4>
                                    <p className="text-sm text-slate-600">Automated erasure begins immediately or queues for scheduled time slot</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Verification & Certification</h4>
                                    <p className="text-sm text-slate-600">Auto-verify success → Generate certificate → Update asset inventory → Send notifications</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Complete</h4>
                                    <p className="text-sm text-slate-600">Device ready for reuse or disposal with full audit trail</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROI */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Automation ROI</h2>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <h4 className="font-bold text-green-900 mb-4">Typical Cost Savings</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="text-3xl font-bold text-green-600 mb-1">90%</p>
                                <p className="text-sm text-slate-600">Reduction in labor hours</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="text-3xl font-bold text-green-600 mb-1">75%</p>
                                <p className="text-sm text-slate-600">Faster processing time</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="text-3xl font-bold text-green-600 mb-1">99.9%</p>
                                <p className="text-sm text-slate-600">Error reduction rate</p>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Automation */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Automation Platform</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure provides enterprise-grade automation with Cloud Console for centralized management and API integration for seamless workflow embedding.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-slate-900 mb-3">Cloud Console</h4>
                        <p className="text-sm text-slate-600 mb-3">
                            Web-based central hub to manage all erasure operations across your organization from anywhere.
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>✓ Real-time dashboards</li>
                            <li>✓ Policy management</li>
                            <li>✓ Automated reporting</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-slate-900 mb-3">API Integration</h4>
                        <p className="text-sm text-slate-600 mb-3">
                            Integrate erasure directly into your existing IT asset management and ticketing systems.
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>✓ RESTful API</li>
                            <li>✓ Webhook notifications</li>
                            <li>✓ ServiceNow/Jira connectors</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Start Automating Today</h2>
                <p className="leading-relaxed mb-6">
                    Transform your data erasure operations with intelligent automation. See how much time and money you can save.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <LightningIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Get ROI Calculator
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      {/* Engagement Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="automated-erasure" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="automated-erasure" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="automated-erasure" 
            blogTitle="Automate Data Erasure" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default React.memo(AutomatedErasureBlog);
