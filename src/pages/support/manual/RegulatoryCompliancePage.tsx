import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo, useState } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import SolutionContactSection from "@/components/SolutionContactSection";

const RegulatoryCompliancePage: React.FC = memo(() => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How does D-Secure help with GDPR Article 17?",
      answer: "GDPR Article 17 (Right to Erasure) requires that organizations completely delete personal data upon request. D-Secure provides the necessary tamper-proof certificates of destruction that legally prove the data was erased according to state-of-the-art standards, satisfying DPO audit requirements."
    },
    {
      id: 2,
      question: "Is D-Secure HIPAA compliant for healthcare data?",
      answer: "Yes. D-Secure meets the 'Standard for Security' under HIPAA (45 CFR § 164.310(d)(2)(i)) regarding the disposal of workstations and electronic media, ensuring that Protected Health Information (PHI) is unrecoverable before hardware leaves the clinical environment."
    },
    {
      id: 3,
      question: "Can D-Secure be used for PCI DSS 9.8.1 requirement?",
      answer: "Absolutely. PCI DSS Requirement 9.8.1 mandates that hard-copy and electronic media must be rendered unreadable before disposal. D-Secure's NIST 800-88 Purge method exceeds this requirement and provides the required audit trail for QSA assessments."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        seo={getSEOForPage("support-manual-regulatory-compliance", { 
          title: "Legal & Regulatory Compliance Frameworks | D-Secure Manual", 
          canonicalUrl: "/support/manual/regulatory-compliance",
          description: "A comprehensive legal mapping for DPOs and CISOs. How D-Secure automates compliance for GDPR, HIPAA, PCI DSS, SOX, and international data privacy laws."
        })} 
      />
      
      <div className="min-h-screen bg-slate-50 text-left">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24 border-b border-emerald-100 text-left">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/help-manual" className="inline-flex items-center text-emerald-800 hover:text-emerald-700 font-medium mb-6 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Manual Directory
              </Link>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Regulatory Compliance <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">& Legal Frameworks</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-4xl leading-relaxed">
                A high-authority mapping guide for Data Protection Officers (DPOs) and Chief Information Security Officers (CISOs) to automate adherence to global privacy laws and commercial data security standards.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none text-slate-700">
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-0">GDPR Compliance: Navigating "Right to Erasure"</h2>
                <p>
                  The General Data Protection Regulation (GDPR) is arguably the most stringent data privacy regime on the planet. For enterprises operating in or serving the European Union, data sanitization is no longer a "best practice"—it is a legal mandate with non-compliance penalties reaching up to €20 million or 4% of global annual turnover.
                </p>
                <p>
                  Specific focus is placed on <strong>Article 17 (Right to Erasure)</strong> and <strong>Article 32 (Security of Processing)</strong>. D-Secure solves the GDPR gap by replacing the "deletion" myth (which leaves file pointers on disk) with certified cryptographic erasure that satisfies the most conservative EU Data Protection Authorities (DPAs).
                </p>

                <div className="bg-slate-50 border-l-4 border-emerald-500 p-8 rounded-r-xl my-10">
                  <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-4 text-left">Article 17 Execution Strategy</h3>
                  <p className="text-base text-slate-700 mb-6">
                    When a data subject invokes Article 17, the organization must act without "undue delay". For hardware-bound data (e.g., local database caches on employee machines or decommissioned edge servers), D-Secure offers two pathways:
                  </p>
                  <ul className="pl-6 space-y-4 text-slate-700 text-base">
                    <li><strong>Recommended Policy:</strong> Mandate that all tier-one database servers and end-user laptops utilize the <strong>D-Secure Network PXE Deploy</strong> method upon decommissioning. This prevents employees from bypassing Deep-Sanitization routines.</li>
                    <li><strong>Active File Constraints:</strong> When servers cannot be entirely decommissioned but specific files must go, utilize the <strong>D-Secure File Eraser</strong>. Configure active directory policies requiring the use of D-Secure context menus (`Right Click -&gt; Secure Wipe Data`) rather than standard Windows deletes.</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Article 32: "Security of Processing"</h3>
                <p>
                  Article 32 requires technical and organizational measures to ensure a level of security appropriate to the risk. D-Secure provides the "Organizational Measure" by automating the generation of digital audit trails. Each PDF certificate acts as a legal artifact that can be presented during a GDPR audit to prove that data was handled with "state-of-the-art" sanitization methods like NIST 800-88 Purge.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">The HIPAA Framework (Health Insurance Portability and Accountability Act)</h2>
                <p>
                  For US healthcare providers, insurers, and business associates, the protection of Patient Health Information (PHI) is governed by the HIPAA Security Rule. Section <strong>45 CFR § 164.310(d)(2)(i)</strong> explicitly mandates that PHI must be rendered unrecoverable before the final disposal of electronic media.
                </p>
                <div className="bg-red-50 border border-red-100 p-6 rounded-xl my-8">
                  <h4 className="text-red-900 font-bold m-0 mb-2">Audit Risk Warning</h4>
                  <p className="m-0 text-red-800 text-base">
                    Simply reformatting a drive or using the "Reset this PC" feature in Windows does NOT satisfy HIPAA requirements. HHS (Department of Health and Human Services) auditors have issued significant fines where "erased" drives were later found with residual patient data.
                  </p>
                </div>
                <p>
                  D-Secure ensures HIPPA compliance by performing <em>Cryptographic Key Shredding</em> on SSDs and multi-pass overwriting on HDDs, accompanied by a certificate that documents the drive's serial number, matching it to the patient database decommissioning logs.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">PCI DSS: Requirement 9.8.1</h2>
                <p>
                  The Payment Card Industry Data Security Standard (PCI DSS) Requirement 9.8.1 dictates that electronic media containing cardholder data (CHD) must be destroyed such that CHD cannot be reconstructed.
                </p>
                <p>
                  D-Secure satisfies PCI DSS by ensuring:
                </p>
                <ul className="pl-6 space-y-4 text-slate-700">
                  <li><strong>LUN Sanitization:</strong> Securely wiping specific logical storage units in SAN/NAS environments where card databases resided.</li>
                  <li><strong>Endpoint Hardening:</strong> Ensuring POS (Point of Sale) terminal disks are completely neutralized before being replaced or upgraded.</li>
                  <li><strong>Vendor Neutrality:</strong> Works across all hardware vendors (HP, Dell, IBM) ensuring consistent PCI auditing across the entire global retail footprint.</li>
                </ul>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">SOX Compliance (Sarbanes-Oxley Act)</h2>
                <p className="pb-12 text-left">
                  For publicly traded companies, SOX Section 404 requires internal controls for financial reporting. This includes the security of the systems that process financial data. D-Secure’s <strong>Cloud Management Console</strong> provides the centralized oversight required for SOX auditors, allowing them to verify from one dashboard that every server decommissioned across the company’s worldwide operations followed the mandated data destruction policy without exception.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-100 border-t border-slate-200 text-left">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
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

        <SolutionContactSection source="RegulatoryComplianceManual" subjectPrefix="Inquiry: Regulatory Compliance Manual" />
      </div>
    </>
  );
});

export default RegulatoryCompliancePage;
