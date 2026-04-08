import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo, useState } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import SolutionContactSection from "@/components/SolutionContactSection";

const ComplianceStandardsPage: React.FC = memo(() => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Which erasure standard is best for SSDs?",
      answer: "For modern SSDs, NIST 800-88 Purge (Cryptographic Erasure) is the most efficient and secure method. It targets the encryption keys within the Secure Enclave, rendering data instantly unrecoverable without the wear and tear of multiple overwrite passes."
    },
    {
      id: 2,
      question: "Is DoD 5220.22-M still relevant for modern enterprises?",
      answer: "While frequently requested for legacy compliance, DoD 5220.22-M was designed specifically for magnetic media (HDDs). For high-performance flash storage, we recommend transitioning to media-specific NIST guidelines."
    },
    {
      id: 3,
      question: "Can I define a custom 7-pass or 35-pass algorithm?",
      answer: "Yes, D-Secure allows Senior Administrators to define bespoke hexadecimal and random-pattern overwrite sequences (up to 100 passes) to satisfy highly specialized military or proprietary security requirements."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        seo={getSEOForPage("support-manual-compliance-standards", { 
          title: "Complete Erasure Standards & Algorithm Mapping Guide | D-Secure Manual", 
          canonicalUrl: "/support/manual/compliance-standards",
          description: "An exhaustive technical breakdown of DoD 5220.22-M, NIST 800-88, HMG Infosec, BSI, and Cryptographic algorithms seamlessly integrated into D-Secure."
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
                Erasure Algorithms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">Standard Mappings</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-4xl leading-relaxed">
                A definitive technical directory mapping D-Secure's 24+ integrated cryptographic and block-level algorithms to global governmental, defense, and industry-specific regulations.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none text-slate-700">
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-0">1. Navigating the Complexity of Security Standards</h2>
                <p>
                  As multi-national enterprises look to decommission and dispose of End-of-Life (EOL) hardware, the landscape of data sanitization is immensely fragmented. Government intelligence agencies mandate completely different overwrite paradigms than private EU healthcare consortiums.
                </p>
                <p>
                  A wiping utility that simply writes "zeroes" to a drive might securely erase old magnetic hard drives (HDDs), but utilizing that same generic algorithm on modern NVMe solid-state drives (SSDs) will fail to overwrite wear-leveling pools and over-provisioned sectors—amounting to a critical security breach under standards like NIST 800-88.
                </p>
                <p>
                  D-Secure natively ships with over 24 international erasure algorithms. This guide serves to deeply explain the engineering behind the most commonly used standards, empowering Chief Information Security Officers (CISOs) to select the correct policy frameworks for their infrastructure deployments.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6">2. Technical Breakdown of Primary Algorithms</h2>
                
                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">NIST Special Publication 800-88 (Rev. 1)</h3>
                <p>
                  The US National Institute of Standards and Technology (NIST) practically dictates modern data sanitization. NIST is unique because it is a <em>guideline based on media type</em> rather than a strict rigid algorithm like DoD. It is currently the "Gold Standard" requested by most auditors.
                </p>
                <ul className="pl-6 space-y-4">
                  <li><strong>NIST Clear:</strong> Designed to protect against non-invasive keyboard attacks. D-Secure fulfills this by writing a single pass of pseudo-random data across all user-addressable LBAs (Logical Block Addresses). Best suited for older HDDs and low-risk asset redeployment within the same organization.</li>
                  <li><strong>NIST Purge:</strong> Designed to protect against state-sponsored laboratory attacks (e.g., removing platters and using magnetic force microscopy). D-Secure fulfills this on SSDs by issuing native firmware commands (`ATA Secure Erase`, `NVMe Format`), engaging self-encryption key shredding (Crypto-E), and targeting hidden HPA/DCO zones. Essential for high-risk assets leaving organizational custody.</li>
                </ul>

                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 text-left">DoD 5220.22-M (National Industrial Security Program)</h3>
                <p>
                  Originally published in 1995 by the United States Department of Defense, this is the most famous standard in the world. It was designed primarily for magnetic media (floppy disks, IDE drives).
                </p>
                <div className="bg-slate-50 border-l-4 border-amber-500 p-6 rounded-r-xl my-6">
                  <h4 className="font-bold text-slate-900 text-lg m-0 mb-2">Modern Obsolescence Warning</h4>
                  <p className="m-0 text-slate-600 text-base">
                    While clients frequently request the "DoD Wipe", utilizing multi-pass writes on modern SSDs damages the flash cells unnecessarily without actually increasing the security footprint. D-Secure includes it primarily for legacy compliance and explicit contractual requirements, but heavily recommends steering clients toward NIST 800-88 Purge.
                  </p>
                </div>
                <ul className="pl-6 space-y-4">
                  <li><strong>DoD 3-Pass (ECE):</strong> 
                    <ul>
                      <li>Pass 1: Overwrites all locations with a predetermined character (e.g., 0x00).</li>
                      <li>Pass 2: Overwrites all locations with the complement of the first character (e.g., 0xFF).</li>
                      <li>Pass 3: Overwrites with a pseudo-random character and verifies the final pass.</li>
                    </ul>
                  </li>
                  <li><strong>DoD 7-Pass:</strong> An extensive variant of the 3-pass process, utilizing complex magnetic flux reversals. A 1TB drive could take several days to complete this algorithm.</li>
                </ul>

                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 text-left">HMG IS5 (Infosec Standard 5)</h3>
                <p>
                  Authored by the UK's CESG (now the National Cyber Security Centre). Required for UK government departments and agencies.
                </p>
                <ul className="pl-6 space-y-4">
                  <li><strong>HMG IS5 (Baseline):</strong> A fast, single pass of zeroes combined with a 100% verification pass. Efficient for 'OFFICIAL' classified material.</li>
                  <li><strong>HMG IS5 (Enhanced):</strong> A 3-pass algorithm: Pass 1 writes `0x00`, Pass 2 writes `0xFF`, Pass 3 writes a random character followed by verification. Authorized for 'SECRET' and 'TOP SECRET' classifications on specific older media.</li>
                </ul>

                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 text-left">BSI-GS (Guttman & BSI VSITR)</h3>
                <p>
                  Governed by the German Federal Office for Information Security (BSI). 
                </p>
                <p>
                  The VSITR standard requires overwriting the data 7 times with alternating bit patterns (`0x00`, `0xFF`, `0x00`, `0xFF`, `0x00`, `0xFF`, `0xAA`). D-Secure implements this robustly ensuring European localized compliance. We also support the extreme <strong>Gutmann 35-pass</strong> algorithm for theoretical, academic-tier security, although its use in modern ITAD operations is generally considered theatrical rather than practical.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-left">3. Setting the Default Organizational Standard</h2>
                <p>
                  In large enterprise deployments involving dozens of technicians or automated PXE boot servers, leaving algorithm selection to a drop-down menu introduces massive human error risks. A technician might accidentally execute a "fast 1-pass" wipe on a high-risk server containing PCI-DSS data.
                </p>
                <p>
                  To eliminate human error and ensure strict compliance governance:
                </p>
                <ol className="list-decimal pl-6 space-y-4 text-slate-700 bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                  <li>Log into the <strong>D-Secure Admin Console</strong> as a Master System Administrator.</li>
                  <li>Navigate to <strong>Settings &gt; Compliance Controls &gt; Policies</strong>.</li>
                  <li>Toggle the <strong className="text-emerald-800">Lock Global Algorithm</strong> switch.</li>
                  <li>Select your mandated overarching standard (e.g., <em>NIST 800-88 Purge</em>).</li>
                  <li>Check the <em>Bypass on Firmware Unsupported</em> box. This ensures that if D-Secure encounters an old drive that completely rejects modern firmware erase commands, it will elegantly fail-over to a highly secure DoD 3-Pass overwrite rather than crashing the workflow.</li>
                </ol>

                <h3 className="text-2xl font-semibold text-slate-800 mt-10 mb-4 text-left">Designing Custom Hexadecimal Overwrites</h3>
                <p className="pb-12">
                  Occasionally, specialized environments like classified air-gapped military networks or proprietary SCADA systems require completely bespoke byte overwrite patterns not found in commercial algorithms.
                  D-Secure affords Senior Engineers the capability to define their own algorithms via the <code>/settings/custom-algorithms</code> panel. Through our GUI, you can construct an algorithm up to 100 passes deep, defining the exact hexadecimal payload (e.g., `0xAB`, `0xCD`, `RANDOM`) for each pass, and configuring exactly which passes require checksum verification.
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

        <SolutionContactSection source="ComplianceStandardsManual" subjectPrefix="Inquiry: Compliance Standards Manual" />
      </div>
    </>
  );
});

export default ComplianceStandardsPage;