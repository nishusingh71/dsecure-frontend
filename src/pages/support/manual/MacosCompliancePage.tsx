import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import SolutionContactSection from "@/components/SolutionContactSection";
import { useState } from "react";

const MacosCompliancePage: React.FC = memo(() => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Does D-Secure support the latest Apple M3 chips?",
      answer: "Yes, D-Secure's Mac Processing Suite fully supports all Apple Silicon generations, including M1, M2, and M3 series, utilizing native Secure Enclave cryptographic erasure."
    },
    {
      id: 2,
      question: "Is an internet connection required to wipe a Mac?",
      answer: "For standard cryptographic erasure, no internet is required. However, an internet connection is recommended if you need to use our MDM API integration to automatically bypass Activation Locks via Apple Business Manager."
    },
    {
      id: 3,
      question: "Can I wipe a MacBook without a secondary 'Host' machine?",
      answer: "Legacy Intel Macs (pre-2018) can be wiped via a bootable USB. However, for T2 and Apple Silicon (M-series) Macs, a Host-Tethered connection via Thunderbolt is required to securely communicate with the hardware security modules."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        seo={getSEOForPage("support-manual-macos-compliance", { 
          title: "Complete macOS Sanitization & Compliance Guide | D-Secure Manual", 
          canonicalUrl: "/support/manual/macos-compliance",
          description: "An exhaustive 2000-word technical guide covering Apple Silicon M1/M2/M3, T2 Security Chips, APFS encryption, and NIST 800-88 compliance for macOS devices."
        })} 
      />
      
      <div className="min-h-screen bg-slate-50">
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
                Enterprise Data Erasure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">macOS & Apple Silicon</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-4xl leading-relaxed">
                A definitive, deeply technical framework for achieving verifiable NIST 800-88 compliance across Apple's T2 Security Chips, M-Series ARM architectures, and legacy Intel hardware environments.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none text-slate-700">
                
                {/* Section 1: Introduction */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-0">1. The Paradigm Shift in Mac Data Erasure</h2>
                <p>
                  For over two decades, the IT Asset Disposition (ITAD) industry relied on a standardized approach to data destruction: booting a machine via a USB drive containing a Linux-based wiping utility and sequentially overwriting the hard drive with zeroes, ones, or pseudorandom data. Frameworks like the famous DoD 5220.22-M were built entirely around this mechanical methodology.
                </p>
                <p>
                  However, the introduction of Apple's APFS (Apple File System) alongside hardware-level encryption entirely disrupted this workflow. Today, standard bit-level overwriting on a modern Mac is not only inefficient and destructive to the lifespan of solid-state drives (SSDs), but it is physically restricted by the machine's architecture. 
                </p>
                <p>
                  Apple devices now encrypt user data at rest by default. To sanitize these devices in accordance with modern NIST 800-88 "Purge" guidelines, D-Secure has engineered a completely different methodology: interacting directly with the Secure Enclave processor to utilize <strong>Cryptographic Erasure (Crypto-E)</strong>. This 2,000-word manual serves as your exhaustive guide to navigating the complexities of modern Mac sanitization within an enterprise scale.
                </p>

                <hr className="my-12 border-slate-200" />

                {/* Section 2: Hardware Architecture */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">2. Understanding Mac Hardware Architectures</h2>
                <p>
                  Before initiating a wipe procedure, an IT technician must accurately classify the target machine. D-Secure handles these environments differently based on their foundational hardware. The three primary epochs of Apple computer architecture are:
                </p>

                <div className="grid grid-cols-1 gap-6 my-8">
                  <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl">
                    <h4 className="font-bold text-slate-900 text-xl m-0 mb-2">Epoch A: Legacy Intel (Pre-2018)</h4>
                    <p className="m-0 text-slate-600 text-base">
                      These machines rely on traditional x86 architecture without dedicated Apple Security chips. Data on these machines may or may not be encrypted (FileVault 2 must have been manually enabled). For these devices, D-Secure utilizes traditional Block-Level overwriting techniques (Clear) via a bootable USB drive, accessing the SATA or PCIe storage controllers directly.
                    </p>
                  </div>
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                    <h4 className="font-bold text-slate-900 text-xl m-0 mb-2">Epoch B: Intel with T2 Security Chip (2018 - 2020)</h4>
                    <p className="m-0 text-slate-600 text-base">
                      The introduction of the Apple T2 Security Chip revolutionized Mac security. The T2 chip acts as a coprocessor that handles all storage encryption independently of the Intel CPU. The internal SSD is cryptographically tied to the T2 chip. Standard USB-booted wiping tools cannot bypass the T2 chip to write zeroes to the NAND flash. D-Secure must negotiate with bridgeOS on the T2 chip to execute a cryptographic wipe.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                    <h4 className="font-bold text-slate-900 text-xl m-0 mb-2">Epoch C: Apple Silicon M1 / M2 / M3 (2020 - Present)</h4>
                    <p className="m-0 text-slate-600 text-base">
                      Apple transitioned entirely to their proprietary ARM-based M-Series Systems on a Chip (SoC). In this architecture, the CPU, GPU, Neural Engine, and Secure Enclave are integrated into a single unified package. Storage encryption is hard-wired. There is no concept of a discrete "hard drive" that can be removed. These devices must be wiped exclusively via Cryptographic Erasure triggered within D-Secure's Mac Processing Suite over a Thunderbolt connection.
                    </p>
                  </div>
                </div>

                <hr className="my-12 border-slate-200" />

                {/* Section 3: The Cryptographic Erasure Mechanism */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">3. The Cryptographic Erasure (Crypto-E) Mechanism</h2>
                <p>
                  How does one permanently destroy data without overwriting the bits on the disk?
                </p>
                <p>
                  On T2 and Apple Silicon devices, every piece of user data written to the NAND flash is encrypted using an AES-256 Volume Encryption Key (VEK). This VEK is, in turn, wrapped (encrypted) by a hardware-bound Key Encryption Key (KEK) locked inside the Secure Enclave.
                </p>
                <p>
                  When a D-Secure technician issues the "Erase All Content and Settings" or "Cryptographic Wipe" command through our suite, we are sending a verified, privileged instruction to the Secure Enclave processor. The processor permanently destroys the cryptographic material needed to unlock the VEK. 
                </p>
                <p>
                  The moment that key is shredded, the terabytes of data resting on the NAND flash instantly become mathematically indistinguishable from random noise. Because AES-256 encryption is practically unbreakable without the key, the data is irrevocably destroyed. This complies with the NIST 800-88 standard for <strong>Purge</strong> sanitization.
                </p>
                
                <h4 className="text-xl font-bold text-slate-800 mt-6">D-Secure Cryptocpys Verification</h4>
                <p>
                  A significant challenge for IT auditors is proving that a cryptographic wipe was successful. How do you prove a key no longer exists? D-Secure employs a patented <em>Statistical Entropy Verification</em> method post-wipe. We sample random sectors across the NAND flash and analyze the data density. If the key was successfully destroyed, the returned data exhibits high-entropy characteristics consistent with encrypted ciphertext that lacks a decryption key. This verification is attached to the final audit certificate.
                </p>

                <hr className="my-12 border-slate-200" />

                {/* Section 4: Operational Workflow for Host-Tethered Erasure */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">4. Operational Workflow: Host-Tethered Erasure</h2>
                <p>
                  Because you cannot easily boot a third-party Linux USB on a modern Mac due to Secure Boot restrictions, D-Secure utilizes a Host-Tethered model for high-volume Mac processing.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">Step-by-Step Execution</h3>
                <ol className="pl-6 space-y-6">
                  <li className="relative pl-6">
                    <span className="absolute left-0 font-bold text-emerald-600">1.</span>
                    <strong className="text-slate-900 block mb-1">Establish the Host Machine</strong>
                    Configure a dedicated Mac computer (Mac Mini or Mac Studio) running the D-Secure Processing Node application. Ensure it has stable internet connectivity to communicate with your central D-Secure dashboard.
                  </li>
                  <li className="relative pl-6">
                    <span className="absolute left-0 font-bold text-emerald-600">2.</span>
                    <strong className="text-slate-900 block mb-1">Target Disk Mode / Mac Sharing Mode</strong>
                    Place the target Macs to be wiped into sharing mode. For T2 Intel Macs, hold the 'T' key during startup. For Apple Silicon Macs, hold the power button until 'Startup Options' appear, click 'Options', authenticate if necessary, and select 'Share Disk' from the Utilities menu.
                  </li>
                  <li className="relative pl-6">
                    <span className="absolute left-0 font-bold text-emerald-600">3.</span>
                    <strong className="text-slate-900 block mb-1">Tether via Thunderbolt</strong>
                    Connect the target machines to the D-Secure Host using high-bandwidth Thunderbolt 3/4 cables or USB-C. D-Secure handles up to 30 simultaneous tethered Macs connected through powered Thunderbolt hubs.
                  </li>
                  <li className="relative pl-6">
                    <span className="absolute left-0 font-bold text-emerald-600">4.</span>
                    <strong className="text-slate-900 block mb-1">Execute the Purge Command</strong>
                    Within the D-Secure Host UI, the attached devices will appear as logical targets. Select the devices, apply your company's mandated regulatory profile (e.g., GDPR Right to Erasure), and click 'Execute'.
                  </li>
                  <li className="relative pl-6">
                    <span className="absolute left-0 font-bold text-emerald-600">5.</span>
                    <strong className="text-slate-900 block mb-1">Certificate Retrieval</strong>
                    The Host node sends the crypt-shred command over the Thunderbolt bridge. Upon success, the Host pulls the device hardware metadata (Serial Number, Wi-Fi MAC Address, SSD Health) and generates a digitally signed JSON-LD and PDF certificate.
                  </li>
                </ol>

                <hr className="my-12 border-slate-200" />

                {/* Section 5: Bypassing MDM, iCloud & Activation Locks */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">5. Breaking the Chains: MDM & Activation Lock</h2>
                <p>
                  A flawlessly erased MacBook is completely useless (and poses a financial loss to an ITAD facility) if it suffers from <strong>Activation Lock</strong>. When a user binds a Mac to their personal iCloud account (Find My Mac), or when a corporation binds it via Apple Business Manager (ABM), Apple's activation servers will refuse to let a new user set up the machine after a wipe.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">The MDM API Integration</h3>
                <p>
                  D-Secure directly integrates with enterprise Mobile Device Management (MDM) platforms. By configuring API keys for Jamf Pro, Microsoft Intune, VMware Workspace ONE, or Kandji within your D-Secure settings, you unlock automated de-provisioning.
                </p>
                <div className="bg-slate-900 text-emerald-400 p-5 rounded-xl font-mono text-sm leading-relaxed my-6 shadow-lg">
                  <span className="text-slate-500">// Pseudo-flow of D-Secure ABM Integration</span><br/>
                  Target_Serial = FETCH_BRIDGE_SERIAL(Thunderbolt_Port_4);<br/>
                  <br/>
                  <span className="text-slate-500">// Check enterprise lock</span><br/>
                  IF (MDM_Check(Target_Serial) == LOCKED) &#123;<br/>
                  &nbsp;&nbsp;API_POST(Jamf_Tenant_URL, "/api/v1/computers/unassign", Target_Serial);<br/>
                  &nbsp;&nbsp;WAIT(15s);<br/>
                  &#125;<br/>
                  <br/>
                  EXECUTE_CRYPTO_ERASE();
                </div>
                <p>
                  The system automatically cross-references the connected hardware serial against your company's tenant, issues a remote wipe and un-enrollment command, and then proceeds with the physical tethered cryptographic verification. 
                </p>
                <p>
                  <em>Note: For personal iCloud Activation Locks, there is no API bypass. The original user must remove the device from their iCloud.com profile. D-Secure will flag iCloud-locked devices with a critical red warning in the UI before attempting destruction to prevent the creation of administrative "bricks".</em>
                </p>

                <hr className="my-12 border-slate-200" />

                {/* Section 6: Handling Firmware Passwords */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">6. Firmware Passwords and Recovery Options</h2>
                <p>
                  Intel Macs utilizing the T2 chip may possess a Firmware Password. This password prevents the Mac from starting up from any disk other than the designated startup disk, completely blocking Target Disk Mode and external USB booting.
                </p>
                <p>
                  If you encounter a Firmware Password wall during ITAD processing, your operational team must coordinate with the original enterprise owner to supply the master firmware password. D-Secure includes an automated script parameter that can automatically inject a list of known corporate firmware passwords over a custom USB HID emulator to unlock batches of laptops quickly without manual keyboard typing.
                </p>

                <hr className="my-12 border-slate-200" />

                {/* Section 7: NIST Mappings and Audit Trails */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">7. NIST 800-88 Mappings for Auditors</h2>
                <p>
                  When your legal or compliance team asks for proof that Apple Silicon securely complies with government standards, you can present the following D-Secure architectural mappings.
                </p>

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm my-8">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="py-4 px-6 font-bold text-slate-800 w-1/3">NIST 800-88 Rev 1. Requirement</th>
                        <th className="py-4 px-6 font-bold text-slate-800 w-2/3">D-Secure / Apple Technical Execution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-4 px-6 font-medium">Table A-1: Cryptographic Erase (CE) Definition</td>
                        <td className="py-4 px-6 text-slate-600">The erasure utilizes Apple's standardized API instructions (`diskutil resetUser`) to destroy the wrapped Class Keys within the isolated Secure Enclave.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium">Verifiability (Section 4.3)</td>
                        <td className="py-4 px-6 text-slate-600">D-Secure performs a 400MB statistical sample across the APFS volume ensuring high-entropy noise patterns. A cryptographic hash of the resulting sector state is recorded.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium">Documentation Details (Section 4.8)</td>
                        <td className="py-4 px-6 text-slate-600">D-Secure pulls specific M-Series metadata including Device Name, Model Identifier (e.g., Mac14,2), SoC Type (M2 Pro), Memory Configuration, and Serial Number for the PDF/JSON-LD certificate.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium">Clear vs Purge Clarifications</td>
                        <td className="py-4 px-6 text-slate-600">Because the media is a non-removable NVMe storage medium that cannot be physically shredded without destroying the entire motherboard, Crypto-E is legally and technically classified as the highest possible <strong>Purge</strong> sanitization level.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr className="my-12 border-slate-200" />

                {/* Section 8: Troubleshooting T2 bridgeOS Failures */}
                <h2 className="text-3xl font-bold text-slate-900 mb-6">8. Troubleshooting T2 and bridgeOS Failures</h2>
                <p>
                  The T2 chip runs its own embedded operating system known as bridgeOS. Occasionally, bridgeOS can become corrupted, preventing the Mac from entering Target Disk Mode or even booting into Recovery Mode. This presents a challenge because you cannot communicate with the disk to execute an erase command.
                </p>
                <p>
                  In these enterprise edge cases, D-Secure operators must utilize <strong>Apple Configurator 2 (AC2)</strong>.
                </p>
                <ol className="list-decimal pl-6 space-y-4 max-w-3xl text-slate-700">
                  <li>Connect the corrupted target Mac to the D-Secure Host using the specifically designated "Master" Thunderbolt port (usually the one closest to the hinge on laptops, or the furthest right on desktops).</li>
                  <li>Boot the corrupted Mac into DFU (Device Firmware Update) mode using the required key combination (Right Shift + Left Option + Left Control + Power for 10 seconds).</li>
                  <li>Within Apple Configurator running alongside D-Secure on the host, execute a <em>"Restore"</em> command.</li>
                  <li><strong>Critically important:</strong> A "Revive" command preserves data. A "Restore" command wipes the SSD and reinstalls bridgeOS. The Restore command triggers a Cryptographic Erasure automatically as part of its reinstall path.</li>
                  <li>Following the AC2 Restore, D-Secure can be run to interrogate the fresh macOS installation and generate an after-the-fact compliance certificate.</li>
                </ol>

                <h3 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">Conclusion & Final Thoughts</h3>
                <p>
                  Navigating the modern Apple ecosystem requires pivoting away from legacy 1990s disk-wiping mentalities. By embracing the Secure Enclave and leaning into verifiable cryptographic destruction, enterprise ITADs can process macOS hardware significantly faster—slashing average wipe times from hours to literal seconds—while simultaneously achieving ironclad compliance with GDPR, HIPAA, and NIST 800-88.
                </p>
                <p className="pb-16">
                  For further programmatic configurations, consult our <Link to="/support/manual/scripting" className="text-emerald-600 hover:underline">Scripting and RESTful API Automation guide</Link> to integrate the workflows described in this manual directly into your ServiceNow or localized warehouse dashboard.
                </p>

              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-100 italic-font">
          <div className="container mx-auto px-4 max-w-4xl text-left">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
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

        <SolutionContactSection source="MacosComplianceManual" subjectPrefix="Inquiry: macOS Compliance Manual" />
      </div>
    </>
  );
});

export default MacosCompliancePage;
