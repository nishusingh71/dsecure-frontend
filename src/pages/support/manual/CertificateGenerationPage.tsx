import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";

const CertificateGenerationPage: React.FC = memo(() => {
  return (
    <>
      <SEOHead seo={getSEOForPage('help-manual')} />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Regulatory Document <span className="text-emerald-600">Generation</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Generate tamper-proof regulatory documents of data destruction with D-Secure's comprehensive documentation system. Create legally admissible, compliance-ready regulatory documents with advanced security features.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="space-y-12">
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                    Regulatory Document Types & Use Cases
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-3">Standard Regulatory Document</h3>
                      <p className="text-sm text-slate-700 mb-4">Basic erasure completion regulatory document with essential details for routine operations</p>
                      <div className="text-xs text-emerald-700">
                        <div className="font-medium mb-2">Includes:</div>
                        <ul className="space-y-1">
                          <li>• Device serial numbers</li>
                          <li>• Erasure timestamps</li>
                          <li>• Method verification</li>
                          <li>• Operator signature</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-3">Compliance Regulatory Document</h3>
                      <p className="text-sm text-slate-700 mb-4">Detailed regulatory document meeting specific regulatory requirements (GDPR, HIPAA, PCI-DSS)</p>
                      <div className="text-xs text-teal-700">
                        <div className="font-medium mb-2">Includes:</div>
                        <ul className="space-y-1">
                          <li>• Regulatory compliance mapping</li>
                          <li>• Chain of custody documentation</li>
                          <li>• Witness attestations</li>
                          <li>• Audit trail references</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-3">Forensic Regulatory Document</h3>
                      <p className="text-sm text-slate-700 mb-4">Court-admissible regulatory document with cryptographic verification for legal proceedings</p>
                      <div className="text-xs text-cyan-700">
                        <div className="font-medium mb-2">Includes:</div>
                        <ul className="space-y-1">
                          <li>• Cryptographic signatures</li>
                          <li>• Blockchain timestamping</li>
                          <li>• Expert witness statements</li>
                          <li>• Legal admissibility attestation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                    Regulatory Document Components & Security Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-600 mb-4">Essential Information</h3>
                        <div className="space-y-3">
                          <div className="bg-emerald-50 rounded-lg p-4">
                            <h4 className="font-medium text-emerald-900 mb-2">Device Identification</h4>
                            <ul className="space-y-1 text-sm text-emerald-800">
                              <li>• Serial numbers and model information</li>
                              <li>• Asset tags and inventory numbers</li>
                              <li>• Storage capacity and type</li>
                              <li>• Previous owner/custodian details</li>
                            </ul>
                          </div>
                          <div className="bg-teal-50 rounded-lg p-4">
                            <h4 className="font-medium text-teal-900 mb-2">Erasure Process Details</h4>
                            <ul className="space-y-1 text-sm text-teal-800">
                              <li>• Erasure method and algorithm used</li>
                              <li>• Number of passes and patterns</li>
                              <li>• Start and completion timestamps</li>
                              <li>• Duration and performance metrics</li>
                            </ul>
                          </div>
                          <div className="bg-cyan-50 rounded-lg p-4">
                            <h4 className="font-medium text-cyan-900 mb-2">Verification Results</h4>
                            <ul className="space-y-1 text-sm text-cyan-800">
                              <li>• Verification method employed</li>
                              <li>• Success/failure status</li>
                              <li>• Sampling percentage and results</li>
                              <li>• Error logs and exceptions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-teal-600 mb-4">Security & Authentication</h3>
                        <div className="space-y-3">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-medium text-blue-900 mb-2">Digital Signatures</h4>
                            <ul className="space-y-1 text-sm text-blue-800">
                              <li>• RSA-4096 or ECDSA-P384 signatures</li>
                              <li>• Certificate authority validation</li>
                              <li>• Timestamp authority integration</li>
                              <li>• Non-repudiation guarantees</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-4">
                            <h4 className="font-medium text-purple-900 mb-2">Tamper Evidence</h4>
                            <ul className="space-y-1 text-sm text-purple-800">
                              <li>• Cryptographic hash verification</li>
                              <li>• Blockchain anchoring (optional)</li>
                              <li>• QR code integrity checks</li>
                              <li>• Watermark and security printing</li>
                            </ul>
                          </div>
                          <div className="bg-indigo-50 rounded-lg p-4">
                            <h4 className="font-medium text-indigo-900 mb-2">Audit Trail Integration</h4>
                            <ul className="space-y-1 text-sm text-indigo-800">
                              <li>• Complete chain of custody</li>
                              <li>• Operator identification and roles</li>
                              <li>• Environmental conditions logging</li>
                              <li>• Witness and supervisor attestations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                    Regulatory Document Formats & Distribution
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Formats</h3>
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                          </div>
                          <div className="text-xl font-bold text-emerald-600 mb-2">PDF</div>
                          <p className="text-sm text-slate-700 mb-2">Printable & Archival</p>
                          <div className="text-xs text-slate-600">
                            <div>• PDF/A compliance</div>
                            <div>• Digital signatures</div>
                            <div>• Print-ready format</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                          </div>
                          <div className="text-xl font-bold text-teal-600 mb-2">XML</div>
                          <p className="text-sm text-slate-700 mb-2">Machine Readable</p>
                          <div className="text-xs text-slate-600">
                            <div>• Schema validation</div>
                            <div>• System integration</div>
                            <div>• Automated processing</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-xl font-bold text-cyan-600 mb-2">JSON</div>
                          <p className="text-sm text-slate-700 mb-2">API Integration</p>
                          <div className="text-xs text-slate-600">
                            <div>• REST API compatible</div>
                            <div>• Web application ready</div>
                            <div>• Lightweight format</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-slate-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-xl font-bold text-slate-600 mb-2">HTML</div>
                          <p className="text-sm text-slate-700 mb-2">Web Display</p>
                          <div className="text-xs text-slate-600">
                            <div>• Browser compatible</div>
                            <div>• Interactive elements</div>
                            <div>• Responsive design</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-xl p-8 text-white">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Generate Regulatory Documents?</h2>
                    <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                      Create tamper-proof regulatory documents of data destruction that meet the highest compliance and legal standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors">
                        Start Regulatory Document Generation
                      </button>
                      <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors">
                        Download Sample Regulatory Document
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

export default CertificateGenerationPage;