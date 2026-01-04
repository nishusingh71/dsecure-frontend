import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface Issue {
  id: number;
  title: string;
  description: string;
  solution: string;
  category: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

const CommonIssuesPage: React.FC = memo(() => {
  const [activeIssue, setActiveIssue] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const issues: Issue[] = [
    {
      id: 1,
      title: "D-Secure Installation Fails on Windows",
      description: "Installation process stops with error code 1603, 1605, or similar Windows installer errors during setup.",
      solution: "Step 1: Right-click installer and select 'Run as administrator'. Step 2: Temporarily disable Windows Defender and third-party antivirus. Step 3: Ensure .NET Framework 4.8+ is installed via Windows Features. Step 4: Run Windows Update and install all pending updates. Step 5: Clear Windows Installer cache using 'msiexec /unregister' then 'msiexec /regserver'. Step 6: If issue persists, use Windows Installer CleanUp utility and retry installation.",
      category: "Installation",
      severity: "High",
    },
    {
      id: 2,
      title: "Drive Not Detected by D-Secure",
      description: "Target drive appears in Windows Disk Management but not visible in D-Secure interface or device selection.",
      solution: "Step 1: Run D-Secure as administrator with elevated privileges. Step 2: Check if drive is mounted and assigned a drive letter in Disk Management. Step 3: Verify drive is not in use by other applications using Resource Monitor. Step 4: For USB drives, try different USB ports (preferably USB 3.0+). Step 5: For SATA drives, check cable connections and power supply. Step 6: Restart D-Secure service from Services.msc. Step 7: If drive has bad sectors, run CHKDSK /f first.",
      category: "Hardware",
      severity: "Medium",
    },
    {
      id: 3,
      title: "Erasure Process Stops at 50% or Mid-Process",
      description: "Data erasure operation halts unexpectedly during execution, often at specific percentage points.",
      solution: "Step 1: Check drive health using CrystalDiskInfo or built-in SMART tools. Step 2: Run CHKDSK /f /r to identify and fix bad sectors. Step 3: Ensure stable power supply - use UPS for critical operations. Step 4: Close all unnecessary applications to free system resources. Step 5: Try single-pass erasure method instead of multi-pass. Step 6: For SSDs, enable TRIM support and try ATA Secure Erase. Step 7: Check system logs for hardware errors. Step 8: If drive is failing, consider physical destruction instead.",
      category: "Erasure",
      severity: "High",
    },
    {
      id: 4,
      title: "D-Secure License Activation Failed",
      description: "License key is rejected, activation server cannot be reached, or 'Invalid License' error appears.",
      solution: "Step 1: Verify internet connectivity by accessing dsecuretech.com. Step 2: Check Windows Firewall and allow D-Secure through firewall (ports 80, 443). Step 3: Temporarily disable proxy servers or configure proxy settings in D-Secure. Step 4: Ensure license key is entered exactly as provided (25 characters, no spaces). Step 5: Check system date/time - incorrect time can cause SSL certificate errors. Step 6: For corporate networks, whitelist *.dsecuretech.com domains. Step 7: Try offline activation if available. Step 8: Contact support with license key and error details.",
      category: "Licensing",
      severity: "Critical",
    },
    {
      id: 5,
      title: "Slow Erasure Performance (Under 50 MB/s)",
      description: "Data erasure is significantly slower than expected speeds, taking hours for small drives.",
      solution: "Step 1: Close all unnecessary applications and background processes. Step 2: Check drive health - failing drives erase slowly. Step 3: For USB drives, use USB 3.0+ ports and high-quality cables. Step 4: Disable real-time antivirus scanning temporarily. Step 5: Use single-pass method instead of multi-pass for speed. Step 6: Ensure adequate RAM (8GB+ recommended). Step 7: For SSDs, use hardware-based secure erase commands. Step 8: Check for thermal throttling - ensure proper cooling. Step 9: Consider using faster overwrite patterns.",
      category: "Performance",
      severity: "Low",
    },
    {
      id: 6,
      title: "Regulatory Document Generation Error or Missing Reports",
      description: "Unable to generate regulatory document of destruction after successful erasure, or reports are corrupted.",
      solution: "Step 1: Ensure adequate disk space (minimum 1GB free) in output directory. Step 2: Check write permissions for D-Secure in Documents folder. Step 3: Verify system date/time is correct for regulatory document timestamps. Step 4: Restart D-Secure service from Windows Services. Step 5: Try changing output directory to different location. Step 6: Disable antivirus real-time protection temporarily. Step 7: Run D-Secure as administrator. Step 8: Check Windows Event Viewer for detailed error messages.",
      category: "Reporting",
      severity: "Medium",
    },
    {
      id: 7,
      title: "BitLocker Encrypted Drive Access Denied",
      description: "Cannot access BitLocker encrypted drives for erasure, receiving 'Access Denied' or 'Drive Locked' errors.",
      solution: "Step 1: Unlock BitLocker using 'manage-bde -unlock X: -password' command. Step 2: Alternatively, suspend BitLocker: 'manage-bde -protectors -disable X:'. Step 3: For recovery key unlock: 'manage-bde -unlock X: -recoverykey'. Step 4: Use D-Secure cryptographic erasure method for encrypted drives. Step 5: Ensure you have administrator privileges. Step 6: For TPM-protected drives, ensure TPM is accessible. Step 7: Consider using 'cipher /w:X:' command as alternative. Step 8: Document encryption keys before erasure for compliance.",
      category: "Encryption",
      severity: "High",
    },
    {
      id: 8,
      title: "Network Drive or NAS Erasure Fails",
      description: "Cannot perform erasure operations on network-attached storage, mapped drives, or shared folders.",
      solution: "Step 1: Ensure stable network connection with sufficient bandwidth (1Gbps+ recommended). Step 2: Check SMB/NFS permissions - need full control access. Step 3: Map network drive with persistent connection. Step 4: Verify sufficient network bandwidth for large operations. Step 5: Consider local mounting using iSCSI for better performance. Step 6: Check for network timeouts and increase timeout values. Step 7: Use wired connection instead of WiFi for stability. Step 8: For large operations, perform during off-peak hours.",
      category: "Network",
      severity: "Medium",
    },
    {
      id: 9,
      title: "SSD Secure Erase Command Not Supported",
      description: "ATA Secure Erase command fails or is not supported by the SSD, preventing hardware-level erasure.",
      solution: "Step 1: Check if SSD supports ATA Secure Erase using 'hdparm -I /dev/sdX' (Linux) or manufacturer tools. Step 2: Ensure SSD is not frozen - may require system reboot. Step 3: Use manufacturer-specific tools (Samsung Magician, Intel SSD Toolbox). Step 4: Try NVMe Format command for NVMe SSDs. Step 5: Use cryptographic erasure if SSD has hardware encryption. Step 6: Fall back to software overwrite with TRIM enabled. Step 7: For enterprise SSDs, check for Instant Secure Erase (ISE) support.",
      category: "Hardware",
      severity: "Medium",
    },
    {
      id: 10,
      title: "macOS System Integrity Protection (SIP) Blocking Access",
      description: "Cannot access system drives or protected areas on macOS due to SIP restrictions.",
      solution: "Step 1: Boot into Recovery Mode (Cmd+R during startup). Step 2: Open Terminal from Utilities menu. Step 3: Temporarily disable SIP: 'csrutil disable'. Step 4: Reboot and perform erasure operations. Step 5: Re-enable SIP after completion: 'csrutil enable'. Step 6: For FileVault drives, unlock first using Disk Utility. Step 7: Consider using Apple Configurator for enterprise deployments. Step 8: Use cryptographic erasure for encrypted APFS volumes.",
      category: "Encryption",
      severity: "High",
    },
    {
      id: 11,
      title: "Linux Permission Denied Errors",
      description: "Cannot access drives or perform erasure operations on Linux systems due to permission restrictions.",
      solution: "Step 1: Run D-Secure with sudo privileges: 'sudo dsecure'. Step 2: Check drive ownership: 'ls -la /dev/sdX'. Step 3: Add user to disk group: 'sudo usermod -a -G disk username'. Step 4: Unmount drive before erasure: 'sudo umount /dev/sdX'. Step 5: Check for active swap on target drive: 'sudo swapoff -a'. Step 6: Verify drive is not part of LVM or RAID array. Step 7: For encrypted drives, use LUKS commands to unlock first. Step 8: Check SELinux policies if enabled.",
      category: "Installation",
      severity: "Medium",
    },
    {
      id: 12,
      title: "Memory or Resource Exhaustion During Large Operations",
      description: "System becomes unresponsive or D-Secure crashes when erasing large drives or multiple drives simultaneously.",
      solution: "Step 1: Ensure minimum 8GB RAM for large operations (16GB+ recommended). Step 2: Close all unnecessary applications before starting. Step 3: Increase virtual memory/page file size. Step 4: Process drives sequentially instead of simultaneously. Step 5: Use single-pass method to reduce memory usage. Step 6: Monitor system resources using Task Manager. Step 7: Consider breaking large operations into smaller chunks. Step 8: Ensure adequate cooling to prevent thermal throttling.",
      category: "Performance",
      severity: "Medium",
    },
    {
      id: 13,
      title: "Verification Failures After Erasure",
      description: "Post-erasure verification reports failures or finds residual data patterns on the drive.",
      solution: "Step 1: Check for bad sectors that cannot be overwritten using SMART tools. Step 2: Verify drive is not using wear-leveling that hides sectors. Step 3: For SSDs, ensure TRIM is enabled and supported. Step 4: Try multiple verification passes with different patterns. Step 5: Use manufacturer tools for low-level format. Step 6: Check for hidden protected areas (HPA/DCO). Step 7: For critical data, consider physical destruction. Step 8: Document any verification failures for compliance records.",
      category: "Erasure",
      severity: "High",
    },
    {
      id: 14,
      title: "USB Drive Write Protection or Read-Only Errors",
      description: "USB drives appear as read-only or have write protection enabled, preventing erasure operations.",
      solution: "Step 1: Check for physical write-protect switch on USB drive. Step 2: Use diskpart to remove read-only attribute: 'attributes disk clear readonly'. Step 3: Check Windows Registry for StorageDevicePolicies. Step 4: Try different USB ports and cables. Step 5: Format drive using Disk Management first. Step 6: Use manufacturer tools to remove write protection. Step 7: For corrupted drives, try low-level format tools. Step 8: Some drives may require firmware update to remove protection.",
      category: "Hardware",
      severity: "Medium",
    },
    {
      id: 15,
      title: "Enterprise Domain Policy Restrictions",
      description: "Corporate group policies prevent D-Secure installation or operation in enterprise environments.",
      solution: "Step 1: Contact IT administrator to whitelist D-Secure executable. Step 2: Request temporary policy exemption for installation. Step 3: Use enterprise deployment tools (SCCM, GPO) for installation. Step 4: Configure firewall exceptions for license activation. Step 5: Add D-Secure to approved software list. Step 6: Use local administrator account if available. Step 7: Consider using portable version if policies allow. Step 8: Document business justification for security team approval.",
      category: "Installation",
      severity: "High",
    }
  ];

  const categories = ["All", "Installation", "Hardware", "Erasure", "Licensing", "Performance", "Reporting", "Encryption", "Network"];

  const filteredIssues = selectedCategory === "All"
    ? issues
    : issues.filter(issue => issue.category === selectedCategory);

  const toggleIssue = (id: number) => {
    setActiveIssue(activeIssue === id ? null : id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support/manual/common-issues" />
        <title>D-Secure Common Issues | Comprehensive Troubleshooting Guide</title>
        <meta name="description" content="Comprehensive troubleshooting guide with step-by-step solutions for D-Secure installation, erasure operations, licensing, and performance optimization issues." />
        <meta name="keywords" content="D-Secure troubleshooting, common issues, installation problems, erasure errors, support guide, step-by-step solutions" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    D-Secure Common{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">Issues & Solutions</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Comprehensive troubleshooting guide with step-by-step solutions for D-Secure installation, erasure operations, licensing, and performance optimization issues.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">
                    15
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Common Issues
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-1 sm:mb-2">
                    8
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Categories
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">
                    95%
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Resolution Rate
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-slate-600">
                    Support Available
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${selectedCategory === category
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-4 sm:space-y-6">
              {filteredIssues.map((issue, index) => (
                <Reveal key={issue.id} delayMs={index * 50}>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleIssue(issue.id)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)} flex-shrink-0`}></div>
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                            {issue.title}
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm">
                            {issue.description}
                          </p>
                          <div className="flex items-center gap-2 sm:gap-4 mt-2">
                            <span className="text-xs text-slate-500">{issue.category}</span>
                            <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)} text-white`}>
                              {issue.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${activeIssue === issue.id ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {activeIssue === issue.id && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="border-t border-slate-200 pt-4">
                          <h4 className="font-semibold text-slate-900 mb-3 text-sm sm:text-base flex items-center">
                            <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Step-by-Step Solution:
                          </h4>
                          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                            {issue.solution.split('Step ').filter(step => step.trim()).map((step, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  {step.replace(/^\d+:\s*/, '')}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800 text-xs sm:text-sm">
                              <strong>💡 Pro Tip:</strong> If these steps don't resolve your issue, contact D-Secure support with your error details and system information for personalized assistance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Still Need Help?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Can't find a solution? Our expert D-Secure support team provides 24/7 assistance with detailed diagnostics and personalized troubleshooting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/support/contact" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact D-Secure Support
                  </Link>
                  <a href="mailto:support@dsecuretech.com" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Support Team
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default CommonIssuesPage;