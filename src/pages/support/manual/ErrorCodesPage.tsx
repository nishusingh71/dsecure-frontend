import React, { useState, memo } from "react";
import { Helmet } from 'react-helmet-async';
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface ErrorCode {
  id: number;
  code: string;
  title: string;
  description: string;
  solution: string;
  category: string;
  severity: "Info" | "Warning" | "Error" | "Critical";
  causes?: string[];
  prevention?: string;
}

const ErrorCodesPage: React.FC = memo(() => {
  const [activeError, setActiveError] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const errorCodes: ErrorCode[] = [
    {
      id: 1,
      code: "DSE-001",
      title: "Drive Access Denied",
      description: "D-Secure cannot access the target drive due to insufficient permissions or system restrictions.",
      solution: "Step 1: Run D-Secure as administrator with elevated privileges. Step 2: Check drive permissions in Disk Management. Step 3: Ensure drive is not in use by other applications using Resource Monitor. Step 4: Verify hardware connections are secure. Step 5: For encrypted drives, unlock encryption first. Step 6: Disable real-time antivirus scanning temporarily. Step 7: Check Windows Event Viewer for detailed access errors.",
      category: "Access",
      severity: "Error",
      causes: ["Insufficient user privileges", "Drive in use by another process", "Hardware connection issues", "Drive encryption locked", "Antivirus interference"],
      prevention: "Always run D-Secure as administrator and ensure target drives are not mounted or in use before starting operations."
    },
    {
      id: 2,
      code: "DSE-002",
      title: "License Validation Failed",
      description: "D-Secure license key is invalid, expired, or cannot be validated with the activation server.",
      solution: "Step 1: Verify license key format (25 characters, no spaces). Step 2: Check license expiration date in account portal. Step 3: Ensure internet connectivity by accessing dsecuretech.com. Step 4: Check Windows Firewall and allow D-Secure (ports 80, 443). Step 5: Temporarily disable proxy servers or configure proxy settings. Step 6: Verify system date/time is correct. Step 7: Try offline activation if available. Step 8: Contact support with license key and error details.",
      category: "Licensing",
      severity: "Critical",
      causes: ["Invalid license key format", "Expired license", "No internet connectivity", "Firewall blocking activation", "Incorrect system time"],
      prevention: "Keep license keys secure, monitor expiration dates, and ensure network connectivity for periodic validation."
    },
    {
      id: 3,
      code: "DSE-003",
      title: "Insufficient Disk Space",
      description: "Not enough free space available for temporary files, logging, or regulatory document generation.",
      solution: "Step 1: Free up disk space on system drive (minimum 2GB recommended). Step 2: Clean temporary files using Disk Cleanup. Step 3: Check available space in D-Secure working directory. Step 4: Change temporary file location to drive with more space. Step 5: Clear old log files and reports. Step 6: Consider moving D-Secure installation to larger drive. Step 7: Monitor disk usage during operations.",
      category: "Storage",
      severity: "Warning",
      causes: ["Low disk space on system drive", "Large temporary files", "Excessive logging", "Full working directory"],
      prevention: "Regularly monitor disk space and maintain at least 5GB free space on the system drive for D-Secure operations."
    },
    {
      id: 4,
      code: "DSE-004",
      title: "Hardware Communication Error",
      description: "Unable to establish communication with target storage device due to hardware or driver issues.",
      solution: "Step 1: Check all cable connections are secure. Step 2: Try different USB port (preferably USB 3.0+). Step 3: Verify device power supply is adequate. Step 4: Test with different USB cable. Step 5: Check Device Manager for hardware issues or driver problems. Step 6: Update storage device drivers. Step 7: Try device on different computer to isolate issue. Step 8: For SATA drives, check motherboard connections.",
      category: "Hardware",
      severity: "Error",
      causes: ["Loose cable connections", "Faulty USB port", "Insufficient power supply", "Driver issues", "Hardware failure"],
      prevention: "Use high-quality cables, ensure adequate power supply, and keep device drivers updated."
    },
    {
      id: 5,
      code: "DSE-005",
      title: "Erasure Pattern Verification Failed",
      description: "Written data pattern does not match expected verification pattern, indicating potential erasure failure.",
      solution: "Step 1: Check for bad sectors using CHKDSK /f /r. Step 2: Verify drive health with CrystalDiskInfo or SMART tools. Step 3: Retry with single-pass method instead of multi-pass. Step 4: For SSDs, ensure TRIM is enabled and try ATA Secure Erase. Step 5: Check for wear-leveling issues on flash storage. Step 6: Try different erasure pattern or method. Step 7: Consider physical destruction if verification continues to fail. Step 8: Document verification failures for compliance records.",
      category: "Verification",
      severity: "Critical",
      causes: ["Bad sectors on drive", "SSD wear-leveling", "Hardware failure", "Insufficient erasure method", "Drive controller issues"],
      prevention: "Test drive health before erasure and use appropriate methods for different storage types (HDD vs SSD)."
    },
    {
      id: 6,
      code: "DSE-006",
      title: "Network Connection Timeout",
      description: "Connection to D-Secure cloud services, license server, or remote management timed out.",
      solution: "Step 1: Check internet connectivity by pinging dsecuretech.com. Step 2: Verify firewall settings allow D-Secure traffic. Step 3: Configure proxy settings if behind corporate proxy. Step 4: Increase network timeout values in D-Secure settings. Step 5: Try connection during off-peak hours. Step 6: Use wired connection instead of WiFi. Step 7: Contact network administrator for firewall exceptions. Step 8: Try offline mode if available.",
      category: "Network",
      severity: "Warning",
      causes: ["Poor internet connectivity", "Firewall restrictions", "Proxy configuration issues", "Network congestion", "Server maintenance"],
      prevention: "Ensure stable internet connection and configure firewall exceptions for D-Secure domains."
    },
    {
      id: 7,
      code: "DSE-007",
      title: "Encryption Key Not Found",
      description: "Required encryption key for cryptographic erasure is missing, corrupted, or in wrong format.",
      solution: "Step 1: Verify key file location and path. Step 2: Check key file permissions (read access required). Step 3: Ensure correct key format (PEM, DER, or proprietary). Step 4: Validate key file integrity with checksum. Step 5: Regenerate key using D-Secure key management tools. Step 6: Import key from secure backup location. Step 7: Check key expiration date. Step 8: Contact administrator for key recovery procedures.",
      category: "Encryption",
      severity: "Error",
      causes: ["Missing key file", "Corrupted key data", "Wrong key format", "Insufficient permissions", "Expired key"],
      prevention: "Maintain secure backups of encryption keys and implement proper key management procedures."
    },
    {
      id: 8,
      code: "DSE-008",
      title: "Process Interrupted",
      description: "Erasure operation was interrupted by user action, system event, or external interference.",
      solution: "Step 1: Restart erasure operation from beginning. Step 2: Ensure stable power supply using UPS. Step 3: Close unnecessary applications to free resources. Step 4: Check system logs for interruption cause. Step 5: Disable power management settings. Step 6: Run operation during maintenance window. Step 7: Monitor system resources during operation. Step 8: Enable process priority settings in D-Secure.",
      category: "Process",
      severity: "Warning",
      causes: ["User cancellation", "Power interruption", "System shutdown", "Resource exhaustion", "External interference"],
      prevention: "Use UPS for power protection, run during maintenance windows, and avoid interrupting operations."
    },
    {
      id: 9,
      code: "DSE-009",
      title: "Regulatory Document Generation Failed",
      description: "Unable to generate regulatory document of destruction due to system, permission, or configuration issues.",
      solution: "Step 1: Check output directory permissions (write access required). Step 2: Verify system date/time settings are correct. Step 3: Ensure adequate disk space (minimum 100MB). Step 4: Restart D-Secure regulatory document service. Step 5: Try different output directory location. Step 6: Disable antivirus real-time protection temporarily. Step 7: Check Windows Event Viewer for detailed errors. Step 8: Verify regulatory document template configuration.",
      category: "Reporting",
      severity: "Error",
      causes: ["Insufficient permissions", "Incorrect system time", "Low disk space", "Service failure", "Template corruption"],
      prevention: "Ensure proper permissions, maintain accurate system time, and regularly test regulatory document generation."
    },
    {
      id: 10,
      code: "DSE-010",
      title: "Database Connection Error",
      description: "Cannot connect to D-Secure database for logging, configuration, or audit trail storage.",
      solution: "Step 1: Check database service status in Services.msc. Step 2: Verify connection string configuration. Step 3: Test database connectivity with admin tools. Step 4: Ensure database permissions for D-Secure user. Step 5: Restart database service if needed. Step 6: Check network connectivity to database server. Step 7: Verify database server is running and accessible. Step 8: Review database logs for connection errors.",
      category: "Database",
      severity: "Critical",
      causes: ["Database service stopped", "Network connectivity issues", "Authentication failure", "Database corruption", "Configuration errors"],
      prevention: "Monitor database health, maintain proper backups, and ensure network connectivity to database servers."
    },
    {
      id: 11,
      code: "DSE-011",
      title: "Memory Allocation Failed",
      description: "D-Secure cannot allocate sufficient memory for large operations or multiple concurrent tasks.",
      solution: "Step 1: Close unnecessary applications to free RAM. Step 2: Increase virtual memory/page file size. Step 3: Process drives sequentially instead of parallel. Step 4: Restart D-Secure to clear memory leaks. Step 5: Upgrade system RAM if consistently low. Step 6: Reduce concurrent operation limits. Step 7: Monitor memory usage during operations. Step 8: Check for memory leaks in system processes.",
      category: "System",
      severity: "Error",
      causes: ["Insufficient RAM", "Memory leaks", "Too many concurrent operations", "Large file operations", "System resource limits"],
      prevention: "Ensure adequate RAM (8GB+ recommended), monitor memory usage, and limit concurrent operations."
    },
    {
      id: 12,
      code: "DSE-012",
      title: "SSD Secure Erase Not Supported",
      description: "Target SSD does not support ATA Secure Erase command or command execution failed.",
      solution: "Step 1: Check SSD specifications for ATA Secure Erase support. Step 2: Ensure SSD is not in frozen state (may require reboot). Step 3: Use manufacturer-specific tools (Samsung Magician, Intel SSD Toolbox). Step 4: Try NVMe Format command for NVMe SSDs. Step 5: Use cryptographic erasure if SSD has hardware encryption. Step 6: Fall back to software overwrite with TRIM enabled. Step 7: Update SSD firmware if available. Step 8: For enterprise SSDs, check for Instant Secure Erase (ISE).",
      category: "Hardware",
      severity: "Warning",
      causes: ["Unsupported SSD model", "Frozen drive state", "Firmware limitations", "Controller restrictions", "Legacy hardware"],
      prevention: "Verify SSD capabilities before operations and keep firmware updated for optimal support."
    },
    {
      id: 13,
      code: "DSE-013",
      title: "BitLocker Drive Locked",
      description: "Cannot access BitLocker encrypted drive because it is locked or encryption keys are unavailable.",
      solution: "Step 1: Unlock BitLocker using 'manage-bde -unlock X: -password'. Step 2: Use recovery key: 'manage-bde -unlock X: -recoverykey'. Step 3: Suspend BitLocker: 'manage-bde -protectors -disable X:'. Step 4: Ensure TPM is accessible for TPM-protected drives. Step 5: Use D-Secure cryptographic erasure method. Step 6: Check BitLocker status with 'manage-bde -status'. Step 7: Verify user has BitLocker management permissions. Step 8: Document keys before erasure for compliance.",
      category: "Encryption",
      severity: "Error",
      causes: ["Drive locked by BitLocker", "Missing recovery keys", "TPM issues", "Insufficient permissions", "Corrupted encryption"],
      prevention: "Maintain secure backups of BitLocker recovery keys and ensure proper permissions for drive access."
    },
    {
      id: 14,
      code: "DSE-014",
      title: "USB Write Protection Enabled",
      description: "USB drive has write protection enabled, preventing erasure operations from proceeding.",
      solution: "Step 1: Check for physical write-protect switch on USB drive. Step 2: Use diskpart: 'attributes disk clear readonly'. Step 3: Check Windows Registry for StorageDevicePolicies. Step 4: Try different USB ports and cables. Step 5: Format drive using Disk Management first. Step 6: Use manufacturer tools to remove protection. Step 7: Try low-level format tools for corrupted drives. Step 8: Some drives may require firmware update.",
      category: "Hardware",
      severity: "Warning",
      causes: ["Physical write-protect switch", "Registry policies", "Drive corruption", "Firmware protection", "Group policy restrictions"],
      prevention: "Check for physical switches and verify group policies don't restrict USB write access."
    },
    {
      id: 15,
      code: "DSE-015",
      title: "RAID Array Detection Error",
      description: "Cannot properly detect or access drives in RAID configuration for individual erasure.",
      solution: "Step 1: Break RAID array using RAID controller utilities. Step 2: Access individual drives through controller management. Step 3: Use manufacturer-specific RAID tools. Step 4: Boot from RAID controller BIOS/UEFI. Step 5: Consider whole-array erasure instead of individual drives. Step 6: Document RAID configuration before breaking. Step 7: Ensure RAID controller drivers are installed. Step 8: Use hardware-based RAID erasure if supported.",
      category: "Hardware",
      severity: "Error",
      causes: ["RAID controller restrictions", "Array configuration", "Driver issues", "Hardware limitations", "Firmware restrictions"],
      prevention: "Plan RAID erasure procedures in advance and have proper controller documentation available."
    },
    {
      id: 16,
      code: "DSE-016",
      title: "macOS System Integrity Protection",
      description: "macOS System Integrity Protection (SIP) is blocking access to system drives or protected areas.",
      solution: "Step 1: Boot into Recovery Mode (Cmd+R during startup). Step 2: Open Terminal from Utilities menu. Step 3: Temporarily disable SIP: 'csrutil disable'. Step 4: Reboot and perform erasure operations. Step 5: Re-enable SIP after completion: 'csrutil enable'. Step 6: For FileVault drives, unlock first using Disk Utility. Step 7: Consider using Apple Configurator for enterprise. Step 8: Use cryptographic erasure for encrypted APFS volumes.",
      category: "Access",
      severity: "Error",
      causes: ["SIP protection enabled", "System drive access", "APFS encryption", "macOS security policies", "FileVault protection"],
      prevention: "Plan macOS operations to account for SIP restrictions and have proper administrator access."
    },
    {
      id: 17,
      code: "DSE-017",
      title: "Linux Permission Denied",
      description: "Linux system denying access to storage devices due to insufficient user permissions or security policies.",
      solution: "Step 1: Run D-Secure with sudo: 'sudo dsecure'. Step 2: Check drive ownership: 'ls -la /dev/sdX'. Step 3: Add user to disk group: 'sudo usermod -a -G disk username'. Step 4: Unmount drive: 'sudo umount /dev/sdX'. Step 5: Check for active swap: 'sudo swapoff -a'. Step 6: Verify not part of LVM/RAID. Step 7: For encrypted drives, unlock with LUKS first. Step 8: Check SELinux policies if enabled.",
      category: "Access",
      severity: "Error",
      causes: ["Insufficient user permissions", "Drive mounted", "Active swap partition", "SELinux restrictions", "Group membership issues"],
      prevention: "Ensure proper user permissions and group memberships for storage device access on Linux systems."
    },
    {
      id: 18,
      code: "DSE-018",
      title: "Temperature Threshold Exceeded",
      description: "Drive temperature has exceeded safe operating limits during intensive erasure operations.",
      solution: "Step 1: Pause operation to allow drive cooling. Step 2: Improve system ventilation and airflow. Step 3: Reduce erasure speed to lower heat generation. Step 4: Monitor drive temperature with SMART tools. Step 5: Use external cooling if necessary. Step 6: Check for dust buildup in system. Step 7: Consider thermal throttling settings. Step 8: Schedule operations during cooler periods.",
      category: "Hardware",
      severity: "Warning",
      causes: ["Intensive operations", "Poor ventilation", "High ambient temperature", "Drive age/wear", "Dust accumulation"],
      prevention: "Ensure adequate cooling, monitor temperatures, and schedule intensive operations during cooler periods."
    },
    {
      id: 19,
      code: "DSE-019",
      title: "Audit Log Corruption",
      description: "D-Secure audit log files are corrupted or cannot be written to, affecting compliance tracking.",
      solution: "Step 1: Check log file permissions and ownership. Step 2: Verify adequate disk space for logging. Step 3: Repair corrupted log files if possible. Step 4: Create new log directory with proper permissions. Step 5: Backup existing logs before repair attempts. Step 6: Check filesystem integrity with CHKDSK/fsck. Step 7: Configure log rotation to prevent large files. Step 8: Enable log redundancy if available.",
      category: "Logging",
      severity: "Critical",
      causes: ["File corruption", "Insufficient permissions", "Disk space issues", "Filesystem errors", "Hardware problems"],
      prevention: "Implement log rotation, maintain adequate disk space, and regularly backup audit logs."
    },
    {
      id: 20,
      code: "DSE-020",
      title: "Enterprise Policy Violation",
      description: "Operation violates configured enterprise security policies or compliance requirements.",
      solution: "Step 1: Review enterprise policy configuration. Step 2: Verify user has appropriate permissions for operation. Step 3: Check compliance requirements for erasure method. Step 4: Obtain necessary approvals or overrides. Step 5: Use policy-compliant erasure methods. Step 6: Document policy exceptions if authorized. Step 7: Contact security administrator for guidance. Step 8: Update user training on policy requirements.",
      category: "Policy",
      severity: "Error",
      causes: ["Policy restrictions", "Insufficient permissions", "Compliance violations", "Unauthorized methods", "Missing approvals"],
      prevention: "Ensure users understand enterprise policies and have appropriate permissions for their roles."
    }
  ];

  const categories = ["All", "Access", "Licensing", "Storage", "Hardware", "Verification", "Network", "Encryption", "Process", "Reporting", "Database", "System", "Logging", "Policy"];

  const filteredErrors = errorCodes.filter(error => {
    const matchesCategory = selectedCategory === "All" || error.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      error.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      error.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      error.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleError = (id: number) => {
    setActiveError(activeError === id ? null : id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "Error": return "bg-orange-500";
      case "Warning": return "bg-yellow-500";
      case "Info": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical": return "🚨";
      case "Error": return "❌";
      case "Warning": return "⚠️";
      case "Info": return "ℹ️";
      default: return "❓";
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-error-codes")} />
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support/manual/error-codes" />
        <title>D-Secure Error Codes | Complete Reference Guide & Solutions</title>
        <meta name="description" content="Complete reference guide for D-Secure error codes with detailed explanations, step-by-step solutions, and prevention tips for all error conditions." />
        <meta name="keywords" content="D-Secure error codes, error messages, troubleshooting, support reference, error solutions, DSE codes" />
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
                    D-Secure Error{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline">Codes Reference</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Complete reference guide for D-Secure error codes with detailed explanations, step-by-step solutions, and prevention strategies for all error conditions.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search error codes (e.g., DSE-001)..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                      />
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center mb-8">
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-2">
                    {errorCodes.filter(e => e.severity === "Critical").length}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Critical Errors</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                    {errorCodes.filter(e => e.severity === "Error").length}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Errors</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    {errorCodes.filter(e => e.severity === "Warning").length}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Warnings</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                    {errorCodes.filter(e => e.severity === "Info").length}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">Info Messages</div>
                </div>
              </div>
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
              {filteredErrors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No Error Codes Found</h3>
                  <p className="text-slate-600 text-sm sm:text-base">Try adjusting your search terms or category filter.</p>
                </div>
              ) : (
                filteredErrors.map((error, index) => (
                  <Reveal key={error.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleError(error.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 flex-1">
                          <div className="text-lg sm:text-xl">{getSeverityIcon(error.severity)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm sm:text-base font-bold text-emerald-600">
                                {error.code}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(error.severity)} text-white`}>
                                {error.severity}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {error.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm">
                              {error.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-slate-500">{error.category}</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${activeError === error.id ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {activeError === error.id && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="border-t border-slate-200 pt-4 space-y-4">
                            {/* Solution */}
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-3 text-sm sm:text-base flex items-center">
                                <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Step-by-Step Solution:
                              </h4>
                              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                                {error.solution.split('Step ').filter(step => step.trim()).map((step, index) => (
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
                            </div>

                            {/* Common Causes */}
                            {error.causes && (
                              <div className="bg-orange-50 rounded-lg p-4">
                                <h5 className="font-medium text-orange-900 mb-2 flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                  </svg>
                                  Common Causes:
                                </h5>
                                <ul className="text-sm text-orange-800 space-y-1">
                                  {error.causes.map((cause, index) => (
                                    <li key={index}>• {cause}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Prevention */}
                            {error.prevention && (
                              <div className="bg-green-50 rounded-lg p-4">
                                <h5 className="font-medium text-green-900 mb-2 flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Prevention:
                                </h5>
                                <p className="text-sm text-green-800">{error.prevention}</p>
                              </div>
                            )}

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-blue-800 text-xs sm:text-sm">
                                <strong>💡 Pro Tip:</strong> If this solution doesn't resolve your issue, contact D-Secure support with the error code, system details, and steps you've already tried.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Error Not Listed?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  If you encounter an error code not listed here, our D-Secure support team provides 24/7 assistance with detailed diagnostics and immediate solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/support/contact" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Report New Error Code
                  </Link>
                  <a href="mailto:support@dsecuretech.com" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg inline-flex items-center gap-2 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact D-Secure Support
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

export default ErrorCodesPage;