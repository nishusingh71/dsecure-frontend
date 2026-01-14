import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const RemoteManagementPage: React.FC = memo(() => {
    return (
        <>
            <SEOHead seo={getSEOForPage('help-manual')} />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <Reveal>
                            <div className="text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                    Remote <span className="text-emerald-600">Management</span>
                                </h1>
                                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                                    Manage D-Secure operations remotely through cloud console and distributed deployment capabilities
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="space-y-12">
                            {/* Cloud Console */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                                        D-Secure Cloud Console
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Centralized Management</h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-emerald-600">Device Management</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• Real-time device status</li>
                                                        <li>• Remote agent deployment</li>
                                                        <li>• Policy distribution</li>
                                                        <li>• Inventory management</li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-teal-600">Operation Control</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• Remote erasure initiation</li>
                                                        <li>• Progress monitoring</li>
                                                        <li>• Schedule management</li>
                                                        <li>• Emergency stop controls</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Deployment Methods */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                                        Remote Deployment Methods
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-emerald-50 rounded-lg p-6 text-center">
                                            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">Group Policy</h3>
                                            <p className="text-sm text-slate-700">Deploy through Active Directory Group Policy Objects</p>
                                        </div>
                                        <div className="bg-teal-50 rounded-lg p-6 text-center">
                                            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">SCCM Integration</h3>
                                            <p className="text-sm text-slate-700">Microsoft System Center Configuration Manager deployment</p>
                                        </div>
                                        <div className="bg-cyan-50 rounded-lg p-6 text-center">
                                            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">Direct Download</h3>
                                            <p className="text-sm text-slate-700">Secure agent download with authentication tokens</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Security Features */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                                        Security & Authentication
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Multi-Factor Authentication</h3>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-emerald-600">Authentication Methods</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• SAML 2.0 SSO integration</li>
                                                        <li>• LDAP/Active Directory</li>
                                                        <li>• Time-based OTP (TOTP)</li>
                                                        <li>• Hardware security keys</li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-teal-600">Access Control</h4>
                                                    <ul className="space-y-1 text-sm text-slate-700">
                                                        <li>• Role-based permissions</li>
                                                        <li>• IP address restrictions</li>
                                                        <li>• Session timeout controls</li>
                                                        <li>• Audit trail logging</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Monitoring Dashboard */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                                        Real-time Monitoring
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Global Operations Dashboard</h3>
                                            <div className="grid md:grid-cols-4 gap-4">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-emerald-600 mb-1">1,247</div>
                                                    <p className="text-xs text-slate-600">Active Agents</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-teal-600 mb-1">89</div>
                                                    <p className="text-xs text-slate-600">Running Operations</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-cyan-600 mb-1">15.2TB</div>
                                                    <p className="text-xs text-slate-600">Data Processed Today</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-slate-600 mb-1">99.8%</div>
                                                    <p className="text-xs text-slate-600">Success Rate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* API Integration */}
                            <Reveal>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                                        API & Integrations
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-emerald-600">REST API Features</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• Device management endpoints</li>
                                                <li>• Operation control APIs</li>
                                                <li>• Real-time status webhooks</li>
                                                <li>• Regulatory document generation</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-teal-600">Third-party Integrations</h3>
                                            <ul className="space-y-2 text-slate-700">
                                                <li>• ServiceNow ITSM</li>
                                                <li>• Jira Service Management</li>
                                                <li>• Slack/Teams notifications</li>
                                                <li>• Custom webhook endpoints</li>
                                            </ul>
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

export default RemoteManagementPage;