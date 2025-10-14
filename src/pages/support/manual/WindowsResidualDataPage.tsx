import React from "react";
import { Helmet } from "react-helmet-async";
import ManualPageTemplate from "@/components/ManualPageTemplate";

const WindowsResidualDataPage: React.FC = () => {
  const sections = [
    {
      title: "Shadow Copies (VSS)",
      content: `Volume Shadow Copy Service creates point-in-time snapshots:
      
      **Data Persistence Risks**
      • Automatic snapshots of entire volumes
      • Contains deleted files and previous versions
      • Created during system updates and backups
      • Accessible through Previous Versions feature
      
      **D-Secure VSS Management**
      • Enumerate all shadow copies on system
      • Delete shadow copies before erasure
      • Disable VSS service temporarily
      • Clear shadow storage areas
      
      **VSS Commands**
      \`\`\`
      # List all shadow copies
      vssadmin list shadows
      
      # Delete all shadow copies
      vssadmin delete shadows /all /quiet
      
      # Resize shadow storage to minimum
      vssadmin resize shadowstorage /for=C: /on=C: /maxsize=1MB
      \`\`\``
    },
    {
      title: "Temporary Files",
      content: `Various temporary file locations containing sensitive data:
      
      **System Temp Locations**
      • \`%TEMP%\` and \`%TMP%\` user temporary folders
      • \`C:\\Windows\\Temp\` system temporary folder
      • \`C:\\Windows\\Prefetch\` application prefetch files
      • \`C:\\Windows\\SoftwareDistribution\` update cache
      
      **Application Temp Data**
      • Browser cache and download history
      • Office temporary and recovery files
      • Application crash dumps and logs
      • Print spooler temporary files
      
      **D-Secure Temp File Cleanup**
      \`\`\`
      # Clear user temp files
      del /q /f /s "%TEMP%\\*"
      
      # Clear system temp files
      del /q /f /s "C:\\Windows\\Temp\\*"
      
      # Clear prefetch files
      del /q /f /s "C:\\Windows\\Prefetch\\*"
      \`\`\``
    },
    {
      title: "Registry Remnants",
      content: `Windows Registry contains sensitive configuration data:
      
      **Sensitive Registry Data**
      • User passwords and authentication tokens
      • Application configuration and license keys
      • Network credentials and certificates
      • Recently accessed files and folders
      
      **Registry Hive Locations**
      • \`HKEY_CURRENT_USER\` (NTUSER.DAT)
      • \`HKEY_LOCAL_MACHINE\\SAM\` (SAM database)
      • \`HKEY_LOCAL_MACHINE\\SECURITY\` (SECURITY hive)
      • \`HKEY_LOCAL_MACHINE\\SOFTWARE\` (SOFTWARE hive)
      
      **Registry Cleanup Process**
      • Export critical registry settings
      • Clear user-specific registry entries
      • Remove application remnants
      • Secure deletion of registry hive files
      
      **Registry Commands**
      \`\`\`
      # Clear recent documents
      reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs" /f
      
      # Clear run history
      reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU" /f
      \`\`\``
    }
  ];

  const quickAccess = [
    { title: "System Files", url: "/support/manual/windows-system-files" },
    { title: "File Systems", url: "/support/manual/windows-filesystems" },
    { title: "Command Line", url: "/support/manual/windows-command-line" },
    { title: "Built-in Tools", url: "/support/manual/windows-builtin-tools" }
  ];

  return (
    <>
      <Helmet>
        <title>Windows Residual Data Locations | Shadow Copies, Temp Files, Registry</title>
        <meta name="description" content="Identifying and removing residual data from Windows shadow copies, temporary files, and registry remnants." />
      </Helmet>
      
      <ManualPageTemplate
        title="Residual Data Locations"
        subtitle="Shadow copies, temp files, and registry remnants"
        sections={sections}
        quickAccess={quickAccess}
        backUrl="/support/manual/windows"
        ctaTitle="Complete Residual Data Removal"
        ctaDescription="Ensure no sensitive data remains in Windows system locations with D-Secure comprehensive erasure."
        ctaButtonText="Get Residual Data Assessment"
        ctaButtonUrl="/contact"
      />
    </>
  );
};

export default WindowsResidualDataPage;