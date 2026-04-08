import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo, useState } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import SolutionContactSection from "@/components/SolutionContactSection";

const ComplianceExportPage: React.FC = memo(() => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Are D-Secure certificates tamper-proof?",
      answer: "Yes. Every PDF certificate is digitally signed with an X.509 certificate. Any unauthorized modification to the document text will immediately invalidate the digital signature, alerting auditors of tampering."
    },
    {
      id: 2,
      question: "Can I export data directly to ServiceNow or Splunk?",
      answer: "Certainly. D-Secure provides raw JSON-LD exports and real-time Webhooks that allow your DevOps team to automatically push sanitization telemetry into your centralized SIEM or Asset Management platforms."
    },
    {
      id: 3,
      question: "Do the certificates contain the technician's identity?",
      answer: "Yes, every certificate captures the unique ID of the technician who executed the wipe, along with the device serial number, precise timestamps, and the specific erasure algorithm used."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        seo={getSEOForPage("support-manual-compliance-export", { 
          title: "Enterprise Compliance Reporting & Audit Exports | D-Secure Manual", 
          canonicalUrl: "/support/manual/compliance-export",
          description: "An exhaustive technical guide to generating, exporting, and mathematically verifying tamper-proof regulatory audit trails using JSON-LD, PDF, and Cryptographic Signatures."
        })} 
      />
      
      <div className="min-h-screen bg-slate-50 text-left">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24 border-b border-emerald-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/help-manual" className="inline-flex items-center text-emerald-800 hover:text-emerald-700 font-medium mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Manual Directory
              </Link>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Audit & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">Compliance Exports</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-4xl leading-relaxed">
                Mastering the generation, management, and verification of completely immutable verification certificates. Protect your enterprise from liability with mathematically proven data destruction logs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none text-slate-700">
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-0 text-left">1. The Role of Evidence in ITAD</h2>
                <p>
                  In the domain of Information Technology Asset Disposition (ITAD) and enterprise data security, executing a wipe is only 50% of the job. The remaining 50%—and arguably the more legally precarious half—is <strong>proving unequivocally</strong> that the wipe occurred, that it was successful, and that the record of the wipe has not been manipulated.
                </p>
                <p>
                  Whether your organization is defending against a GDPR Article 17 ("Right to be Forgotten") audit request from an EU Data Protection Authority, or satisfying a strict SOC 2 Type II or ISO 27001 ISMS surveillance audit, "trust us" is not a valid compliance stance. D-Secure engineered its audit reporting engine around the principles of <em>Zero-Trust Cryptographic Verifiability</em>.
                </p>
                <p>
                  This manual provides a deep-dive into the technical export types supported by D-Secure, how to automate their ingestion into Centralized Log Management (CLM) systems, and how independent third-party auditors can verify the mathematical integrity of your certificates offline.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">2. Export Topologies: Choosing the Right Format</h2>
                <p>
                  D-Secure generates reports simultaneously across several distinct data formats. Choosing the correct export format depends entirely on the consumer of the data—be it an external auditor, an internal ERP system, or an archival tape drive.
                </p>

                <div className="space-y-8 my-8 not-prose">
                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-800 px-6 py-3 border-b">
                      <h4 className="text-white font-bold m-0 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        PDF Secure Certificates
                      </h4>
                    </div>
                    <div className="p-6 bg-slate-50">
                      <p className="mt-0 text-slate-600">
                        <strong>Primary Consumer:</strong> Legal teams, external auditors, clients (if acting as an ITAD DSP).
                      </p>
                      <p className="text-slate-600">
                        The PDF export acts as the visual, human-centric "Certificate of Destruction". It details the hard drive serial numbers, the exact wiping standard used (e.g., NIST 800-88 Purge), the technician's logged identity, the start/end timestamps down to the millisecond, and the final volumetric hashing output. 
                      </p>
                      <p className="mb-0 text-slate-600">
                        Crucially, every PDF generated by D-Secure is digitally signed at the time of creation using an X.509 cryptographic certificate. If a user attempts to alter the PDF text using Adobe Acrobat, the digital signature will immediately break.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-800 px-6 py-3 border-b">
                      <h4 className="text-white font-bold m-0 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                        JSON-LD (Linked Data)
                      </h4>
                    </div>
                    <div className="p-6 bg-slate-50">
                      <p className="mt-0 text-slate-600">
                        <strong>Primary Consumer:</strong> ServiceNow, Splunk, ElasticSearch, Custom ERPs.
                      </p>
                      <p className="text-slate-600">
                        For large-scale enterprise automation, PDFs are notoriously difficult to index and search. D-Secure exports raw, unadulterated session data using the schema.org standard in JSON-LD format. This allows DevOps engineers to seamlessly pipe erasure telemetry into their existing SIEM (Security Information and Event Management) platforms.
                      </p>
                      <p className="mb-0 text-slate-600">
                        Like the PDFs, the JSON payloads contain an appended HMAC (Hash-Based Message Authentication Code) to guarantee transit integrity.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-800 px-6 py-3 border-b">
                      <h4 className="text-white font-bold m-0 flex items-center">
                        <svg className="w-5 h-5 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        CSV Bulk Ledgers
                      </h4>
                    </div>
                    <div className="p-6 bg-slate-50">
                      <p className="mt-0 text-slate-600">
                        <strong>Primary Consumer:</strong> Financial controllers, high-level project management logic.
                      </p>
                      <p className="mb-0 text-slate-600">
                        When an ITAD facility processes 5,000 laptops in a single week for a datacenter decommissioning project, individual PDFs become cumbersome. The CSV Bulk Ledger provides a flattened, tabulated matrix of every serial number processed, its binary pass/fail status, sector-count discrepancies, and the applied wiping algorithm. Ideal for cross-referencing against internal asset manifests via VLOOKUPs.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">3. Understanding the Blockchain/Immutable Audit Trail</h2>
                <p>
                  To combat internal fraud or severe data liability claims, D-Secure can be configured to write a cryptographic hash of every successful wipe to a localized immutable ledger (or an external WORM—Write Once Read Many—storage bucket like AWS S3 Object Lock).
                </p>
                <p>
                  Here is how the underlying mechanism functions:
                </p>
                <ol className="list-decimal pl-6 space-y-4 text-slate-700">
                  <li>Upon completion of the wipe, D-Secure calculates a deep SHA-256 hash of the target drive's final geometric state.</li>
                  <li>This hash, combined with the timestamp, drive serial number, and technician ID, creates a unique "Transaction Payload".</li>
                  <li>This payload is hashed again, and digitally signed by the central D-Secure Master Server's private key.</li>
                  <li>The final signed blob is injected into the PDF metadata and locked into the primary cloud database.</li>
                </ol>

                <h3 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 text-left">Offline Verifiability for Auditors</h3>
                <p>
                  During an ISO 27001 audit, the auditor may demand proof that the PDF certificates generated 14 months ago have not been tampered with since creation. D-Secure provides a standalone, open-source command-line utility for offline verification. This ensures you do not strictly rely solely on our vendor servers for truth.
                </p>

                <div className="bg-slate-900 text-emerald-400 p-6 rounded-xl font-mono text-sm leading-relaxed my-6 shadow-lg overflow-x-auto text-left">
                  <span className="text-slate-500"># Verify a certificate offline using the D-Secure auditor CLI tool</span><br/>
                  <span className="text-pink-400">$</span> dsecure-auditor verify --target ./sanitization-report-HW9283.pdf --strict<br/>
                  <br/>
                  <span className="text-blue-300">[INFO]</span> Extracting X.509 Digital Signature...<br/>
                  <span className="text-blue-300">[INFO]</span> Validating against root Certificate Authority (CA)...<br/>
                  <span className="text-emerald-400">[OK]</span> Signature is VALID.<br/>
                  <br/>
                  <span className="text-blue-300">[INFO]</span> Extracting Asset JSON-LD Payload payload from PDF metadata...<br/>
                  <span className="text-blue-300">[INFO]</span> Recalculating SHA-256 Checksums...<br/>
                  <span className="text-emerald-400">[OK]</span> Checksums match. Payload is unaltered.<br/>
                  <br/>
                  <span className="text-teal-300 font-bold">===================================================</span><br/>
                  <span className="text-white font-bold">VERDICT: CERTIFICATE IS IMMUTABLE AND AUTHENTIC</span><br/>
                  <span className="text-teal-300 font-bold">===================================================</span>
                </div>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">4. Automating Exports & API Webhooks</h2>
                <p>
                  For mature IT engineering teams, relying on manual PDF downloads via the web UI is an anti-pattern. D-Secure supports robust Push/Pull mechanics for report consolidation.
                </p>
                <p>
                  Alternatively, generate a long-lived Bearer API Token. Your internal scripts can query our endpoints daily at midnight:
                </p>
                <div className="bg-slate-800 text-blue-300 p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto text-left">
                  GET https://api.dsecuretech.com/v1/reports/export?startDate=2026-04-01&endDate=2026-04-07&format=csv
                </div>

                <h3 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 text-left">Final Considerations on Data Retention</h3>
                <p className="pb-12 text-left">
                  D-Secure stores your destruction certificates securely in the cloud via AES-256-GCM encryption on the backend infrastructure. However, adherence to SOC 2 Type II controls requires robust data durability. If you operate in highly litigious industries (e.g., defense or healthcare), it is absolutely critical that you utilize the automated export tools mentioned in this guide to archive a secondary cold-storage backup of all your destruction records—preferably to an immutable internal WORM drive.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-100 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-left">Frequently Asked Questions</h2>
              <div className="space-y-4 text-left">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-slate-500 transform transition-transform ${openFAQ === faq.id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-4 text-slate-600 border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <SolutionContactSection source="ComplianceExportManual" subjectPrefix="Inquiry: Compliance Export Manual" />
      </div>
    </>
  );
});

export default ComplianceExportPage;
