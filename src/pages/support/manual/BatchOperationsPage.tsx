import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const BatchOperationsPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-batch-operations")} />
      <Helmet>
        <title>Batch Operations | D-Secure Manual</title>
        <meta
          name="description"
          content="D-Secure batch operations guide for automating erasure across multiple devices simultaneously with enterprise-grade efficiency."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Batch <span className="text-emerald-600">Operations</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Automate D-Secure erasure operations across thousands of devices simultaneously with enterprise-grade efficiency, intelligent scheduling, and comprehensive monitoring.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="space-y-12">
              {/* Batch Setup */}
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                    Advanced Batch Configuration
                  </h2>
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Device Discovery & Import Methods</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-emerald-600 flex items-center">
                            <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</span>
                            Network Scanning
                          </h4>
                          <ul className="space-y-2 text-sm text-slate-700">
                            <li>• IP range discovery (CIDR notation)</li>
                            <li>• Active Directory integration</li>
                            <li>• DHCP lease table scanning</li>
                            <li>• Custom port scanning protocols</li>
                            <li>• SNMP device enumeration</li>
                            <li>• WMI remote device queries</li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium text-teal-600 flex items-center">
                            <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
                            Manual Import
                          </h4>
                          <ul className="space-y-2 text-sm text-slate-700">
                            <li>• CSV/Excel file import with validation</li>
                            <li>• Asset management system integration</li>
                            <li>• Barcode/QR code scanning support</li>
                            <li>• Manual device entry with templates</li>
                            <li>• RFID tag reading capabilities</li>
                            <li>• Database connector for CMDB</li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium text-cyan-600 flex items-center">
                            <span className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
                            API Integration
                          </h4>
                          <ul className="space-y-2 text-sm text-slate-700">
                            <li>• REST API endpoints for device lists</li>
                            <li>• ServiceNow CMDB integration</li>
                            <li>• Microsoft SCCM connector</li>
                            <li>• Lansweeper asset discovery</li>
                            <li>• Custom webhook integrations</li>
                            <li>• Real-time inventory synchronization</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Batch Job Configuration</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-cyan-600">Scheduling Options</h4>
                          <ul className="space-y-1 text-sm text-slate-700">
                            <li>• Immediate execution</li>
                            <li>• Scheduled start times</li>
                            <li>• Recurring batch operations</li>
                            <li>• Maintenance window alignment</li>
                            <li>• Business hours restrictions</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-blue-600">Resource Management</h4>
                          <ul className="space-y-1 text-sm text-slate-700">
                            <li>• CPU and memory allocation</li>
                            <li>• Network bandwidth throttling</li>
                            <li>• Concurrent operation limits</li>
                            <li>• Priority queue management</li>
                            <li>• Load balancing across agents</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Operation Types */}
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                    Batch Operation Types & Execution Modes
                  </h2>
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-emerald-50 rounded-lg p-6">
                        <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-3">Sequential Processing</h3>
                        <p className="text-sm text-slate-700 mb-4">Process devices one after another for maximum reliability and detailed logging</p>
                        <div className="text-xs text-emerald-700">
                          <div className="font-medium mb-2">Best for:</div>
                          <ul className="space-y-1">
                            <li>• High-security environments</li>
                            <li>• Detailed audit requirements</li>
                            <li>• Limited system resources</li>
                            <li>• Critical data verification</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-6">
                        <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-3">Parallel Processing</h3>
                        <p className="text-sm text-slate-700 mb-4">Process multiple devices simultaneously for maximum speed and efficiency</p>
                        <div className="text-xs text-teal-700">
                          <div className="font-medium mb-2">Best for:</div>
                          <ul className="space-y-1">
                            <li>• Large-scale operations</li>
                            <li>• Time-sensitive projects</li>
                            <li>• High-performance systems</li>
                            <li>• Bulk device processing</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-6">
                        <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-3">Scheduled Automation</h3>
                        <p className="text-sm text-slate-700 mb-4">Automate operations during off-peak hours with intelligent scheduling</p>
                        <div className="text-xs text-cyan-700">
                          <div className="font-medium mb-2">Best for:</div>
                          <ul className="space-y-1">
                            <li>• Maintenance windows</li>
                            <li>• Recurring operations</li>
                            <li>• Business hour restrictions</li>
                            <li>• Automated workflows</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Advanced Execution Features</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-blue-600">Smart Queue Management</h4>
                          <ul className="space-y-1 text-sm text-slate-700">
                            <li>• Priority-based device ordering</li>
                            <li>• Dynamic resource allocation</li>
                            <li>• Dependency-aware scheduling</li>
                            <li>• Failure-resilient queue processing</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-indigo-600">Performance Optimization</h4>
                          <ul className="space-y-1 text-sm text-slate-700">
                            <li>• Adaptive concurrency scaling</li>
                            <li>• Network bandwidth optimization</li>
                            <li>• Memory usage monitoring</li>
                            <li>• CPU utilization balancing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Progress Monitoring */}
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                    Real-Time Progress Monitoring
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Live Dashboard Metrics</h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600 mb-1">1,247</div>
                          <p className="text-xs text-slate-600">Devices Queued</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-teal-600 mb-1">89</div>
                          <p className="text-xs text-slate-600">In Progress</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-600 mb-1">3,456</div>
                          <p className="text-xs text-slate-600">Completed</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-600 mb-1">12</div>
                          <p className="text-xs text-slate-600">Failed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Error Handling */}
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                    Error Handling & Recovery
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-600">Automatic Recovery</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Intelligent retry mechanisms with exponential backoff</li>
                        <li>• Skip problematic devices and continue processing</li>
                        <li>• Continue with remaining queue after failures</li>
                        <li>• Generate detailed failure reports and analysis</li>
                        <li>• Automatic rollback for critical failures</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-teal-600">Notification System</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Real-time email alerts for failures and completions</li>
                        <li>• SMS notifications for critical issues</li>
                        <li>• Webhook integrations for third-party systems</li>
                        <li>• SNMP trap support for network monitoring</li>
                        <li>• Slack and Teams integration for team alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Performance Metrics */}
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                    Performance Metrics & Optimization
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">Enterprise Performance Benchmarks</h3>
                      <div className="grid md:grid-cols-4 gap-6 text-center">
                        <div>
                          <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
                          <p className="text-sm text-slate-700 font-medium">Concurrent Devices</p>
                          <p className="text-xs text-slate-600 mt-1">Maximum parallel processing</p>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
                          <p className="text-sm text-slate-700 font-medium">Time Reduction</p>
                          <p className="text-xs text-slate-600 mt-1">vs. individual operations</p>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
                          <p className="text-sm text-slate-700 font-medium">Automated Operations</p>
                          <p className="text-xs text-slate-600 mt-1">Unattended processing</p>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                          <p className="text-sm text-slate-700 font-medium">Success Rate</p>
                          <p className="text-xs text-slate-600 mt-1">Enterprise reliability</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-lg p-6">
                        <h4 className="font-semibold text-green-900 mb-4">Throughput Optimization</h4>
                        <ul className="space-y-2 text-sm text-green-800">
                          <li>• Dynamic load balancing across agents</li>
                          <li>• Intelligent queue prioritization</li>
                          <li>• Resource-aware task distribution</li>
                          <li>• Network bandwidth optimization</li>
                          <li>• Memory usage monitoring and control</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-4">Scalability Features</h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li>• Horizontal scaling with agent clusters</li>
                          <li>• Auto-scaling based on queue depth</li>
                          <li>• Geographic distribution support</li>
                          <li>• Cloud and on-premises hybrid</li>
                          <li>• Enterprise-grade fault tolerance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-xl p-8 text-white">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready for Enterprise-Scale Batch Operations?</h2>
                    <p className="text-emerald-100 mb-6 max-w-3xl mx-auto">
                      Transform your data erasure operations with D-Secure's advanced batch processing capabilities. Process thousands of devices efficiently with enterprise-grade reliability and compliance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">
                        Start Batch Configuration
                      </button>
                      <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">
                        Schedule Demo
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                        Download Guide
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default BatchOperationsPage;