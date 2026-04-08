import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import SolutionContactSection from "@/components/SolutionContactSection";
import { useState } from "react";

const WindowsCompliancePage: React.FC = memo(() => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Can D-Secure wipe multiple Windows PCs at once?",
      answer: "Absolutely. By utilizing our PXE Network Boot deployment, you can trigger simultaneous erasures on hundreds of Windows workstations or servers over your corporate LAN without manual intervention on each device."
    },
    {
      id: 2,
      question: "What happens to the Windows license key after a wipe?",
      answer: "For modern devices with digital licenses (OEM keys embedded in BIOS/UEFI), the key remains intact in the hardware. Once a new OS is installed, Windows will automatically reactivate. The erasure only targets the data stored on the NAND/platter."
    },
    {
      id: 3,
      question: "Does D-Secure handle RAID configurations for Windows Servers?",
      answer: "Yes, D-Secure supports hardware RAID controllers from major vendors like Dell, HP, and Lenovo. We recommend using 'Pass-through' (JBOD) mode to wipe individual physical disks for the most granular audit certificates."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        seo={getSEOForPage("support-manual-windows-compliance", { 
          title: "Windows Server & PC Enterprise Erasure Guide | D-Secure Manual", 
          canonicalUrl: "/support/manual/windows-compliance",
          description: "An incredibly detailed technical manual for comprehensively erasing Windows PCs, Hyper-V, bypassing BitLocker, neutralizing OEM partitions, and executing massive PXE network wipes."
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
                Windows Environment <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">Security Erasure</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-4xl leading-relaxed">
                A highly comprehensive, low-level technical guide for sanitizing the complexities of Windows environments, bypassing NTFS abstractions, handling BitLocker key-shreds, and executing wide-scale PXE operations.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-emerald prose-lg md:prose-xl max-w-none text-slate-700">
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-0">1. Destroying the Abstracion: Beyond the C:\ Drive</h2>
                <p>
                  To the amateur technician, deleting a Windows environment is as simple as launching a format command against the primary <code>C:\</code> volume. To a forensics penetration tester or compliance auditor, this is considered a critical data leak.
                </p>
                <p>
                  Modern Windows OEM installations—dictated by Microsoft's WHQL logic—are heavily partitioned ecosystems. An out-of-the-box Windows 11 Dell or Lenovo laptop will contain an EFI System Partition, a Microsoft Reserved Partition (MSR), the primary NTFS OS volume, and multiple gigabytes of hidden OEM Recovery partitions. Furthermore, hardware manufacturers utilize Host Protected Areas (HPA) and Device Configuration Overlays (DCO) to stash diagnostics that Windows disk manager cannot even detect.
                </p>
                <p>
                  D-Secure operates entirely outside the Windows kernel abstraction. By utilizing our custom Linux-based micro-kernel deployment, D-Secure accesses the raw ATA, NVMe, and SCSI controllers sequentially, ensuring 100% addressable storage access—destroying recovery partitions, malwares in DCO sectors, and the main OS in a single sweep to guarantee NIST 800-88 compliance.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6">2. Navigating BitLocker Encryption Architectures</h2>
                <p>
                  Microsoft's BitLocker drive encryption is ubiquitous across enterprise Active Directory environments. When encountering a BitLocker-encrypted volume during ITAD processing, D-Secure employs highly optimized workflows based on the hardware constraints of the drive.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">OPAL 2.0 SED (Self-Encrypting Drive) Integration</h3>
                <p>
                  If BitLocker was configured to use hardware-based encryption (utilizing the drive's internal OPAL 2.0 controller) rather than software encryption via the CPU, D-Secure leverages this for extreme speed. We send a direct cryptographic erasure (Crypto-E) command, taking mere seconds to permanently dump the hardware keys and shred the volume into high-entropy noise.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Fallback: Software Encryption Overwrites</h3>
                <p>
                  If BitLocker software encryption was utilized (CPU overhead), D-Secure ignores the encrypted payload entirely. We treat the ciphertext exactly the same as plaintext, performing a multi-pass block-level overwrite (e.g., NIST Clear or Purge) sequentially over the encrypted volume. Because we are overwriting already perfectly encrypted ciphertext with pseudo-random high-entropy data, the resulting security footprint is exponentially profound.
                </p>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6">3. Addressing Hidden BIOS Sectors (HPA & DCO)</h2>
                <p>
                  State-sponsored rootkits, advanced persistent threats (APTs), and highly unauthorized exfiltrated data files are frequently tucked away in the Host Protected Area (HPA) or Device Configuration Overlay (DCO). These are physical sectors on the platter or flash cells that the motherboard's BIOS deliberately hides from the Windows operating system.
                </p>
                <p>
                  D-Secure's low-level hardware drivers automatically detect these geometries. We issue raw <code>ATA SET MAX ADDRESS</code> and <code>ATA UNFREEZE</code> commands directly to the drive controller to force these restricted zones to become visibly addressable, exposing them to our overwriting logic.
                </p>
                <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl my-6">
                  <h4 className="font-bold text-slate-900 text-lg m-0 mb-2">Compliance Imperative</h4>
                  <p className="m-0 text-slate-600 text-base">
                    NIST 800-88 mandates that any tools utilized for "Purge" sanitization must be capable of identifying and accessing HPA/DCO zones. D-Secure explicitly records the successfully un-hidden sector count, the bytes freed, and the algorithm used to over-write them natively on all generated PDF compliance certificates for your auditors.
                  </p>
                </div>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6">4. Enterprise Deployments via PXE (Network Boot)</h2>
                <p>
                  For large-scale corporate environments (e.g., global call centers, remote offices, or vast bare-metal server farms), deploying technicians with USB drives is not economically scalable. D-Secure engineered a fully automated Network Boot (PXE) image formatted specifically for Windows Server WDS environments.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The PXE Execution Workflow</h3>
                <ol className="list-decimal space-y-4 pl-6 text-slate-700">
                  <li><strong>Image Deployment:</strong> Deploy the lightweight D-Secure `boot.wim` or ISO file directly into your internal Windows Deployment Services (WDS), Microsoft Endpoint Configuration Manager (MECM), or any third-party TFTP server.</li>
                  <li><strong>Target Configuration:</strong> From your central management plane, push a script configuring the target machines’ BIOS/UEFI architectures to boot preferentially from the network via IPv4 or IPv6 PXE protocols upon next restart.</li>
                  <li><strong>RAM-Disk Initialization:</strong> Upon network boot, the target machines pull the minuscule D-Secure Micro-OS solely into RAM memory. It executes independent of the hard drives.</li>
                  <li><strong>Autonomous Execution:</strong> The payload queries your D-Secure Master Server for its mandated policy rule, and instantly executes the erasure policy completely automatically without requiring any keyboard or mouse intervention.</li>
                  <li><strong>Network Telemetry:</strong> Upon successful sanitization, the cryptographic audit logs are seamlessly posted back to your central D-Secure dashboard instantly via the network, turning the machine off thereafter to signal task completion.</li>
                </ol>

                <hr className="my-12 border-slate-200" />

                <h2 className="text-3xl font-bold text-slate-900 mb-6">5. Handling Windows Server RAID Configurations</h2>
                <p>
                  Data destruction in datacenter environments poses the complexity of RAID (Redundant Array of Independent Disks) controllers spanning data probabilistically across multiple physical drives.
                </p>
                <p>
                  When decommissioning physical Windows Servers operating high-end hardware RAID controllers (such as Dell PERC or HP SmartArray series), D-Secure communicates via OEM-specific APIs. 
                </p>
                <p>
                  Administrators have two technical avenues:
                </p>
                <ul className="pl-6 space-y-4">
                  <li><strong>Logical Volume Erasure:</strong> D-Secure addresses the RAID array as a single massive logical volume (e.g., a 10TB LUN). The overwrite occurs via the RAID controller, relying on the controller to disperse the sanitization data evenly. This is fast, but lacks hyper-granularity.</li>
                  <li><strong>Pass-Through JBOD Mode (Recommended):</strong> D-Secure computationally fractures the RAID hierarchy, breaking the Logical Units back into a JBOD (Just a Bunch Of Disks) topology. We then independently execute simultaneous, multi-threaded wipes against each physical disk natively. NIST 800-88 highly recommends this method for maximum security footprint and granularity.</li>
                </ul>

                <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Final Sign-off</h3>
                <p>
                  The Windows operating system possesses a vastly sprawling ecosystem of permutations, encompassing everything from cheap eMMC flash tablets to incredibly dense virtualization clusters running Hyper-V. By leveraging D-Secure’s low-level hardware access methodologies detailed in this manual, IT teams ensure that non-compliance liability is categorically eliminated across every edge case.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-100 italic-font border-t border-slate-200">
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
                      <div className="px-6 pb-4 text-slate-600 border-t border-slate-100 pt-4 text-left">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <SolutionContactSection source="WindowsComplianceManual" subjectPrefix="Inquiry: Windows Compliance Manual" />
      </div>
    </>
  );
});

export default WindowsCompliancePage;
