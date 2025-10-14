import React from "react";
import { Helmet } from "react-helmet-async";
import ManualPageTemplate from "@/components/ManualPageTemplate";

const WindowsSoftwareErasurePage: React.FC = () => {
  const sections = [
    {
      title: "Single-Pass Overwrite Methods",
      content: `Modern single-pass overwrite techniques for Windows:
      
      **NIST SP 800-88 Single Pass**
      • Random data overwrite pattern
      • Suitable for modern HDDs and SSDs
      • Cryptographically secure random generation
      • Verification of overwrite completion
      
      **Zero Fill Method**
      • Simple all-zeros overwrite pattern
      • Fast execution on modern hardware
      • Effective for most security requirements
      • Compatible with SSD TRIM commands
      
      **D-Secure Implementation**
      \`\`\`
      # Using cipher command for single pass
      cipher /w:C:\\
      
      # Using sdelete for zero fill
      sdelete -p 1 -z -c C:
      
      # PowerShell random overwrite
      $bytes = New-Object byte[] 1048576
      (New-Object Random).NextBytes($bytes)
      [System.IO.File]::WriteAllBytes("C:\\temp\\random.dat", $bytes)
      \`\`\``
    },
    {
      title: "Multi-Pass DoD Methods",
      content: `Department of Defense multi-pass overwrite standards:
      
      **DoD 5220.22-M (3-Pass)**
      • Pass 1: Write complement of previous data
      • Pass 2: Write random data pattern
      • Pass 3: Write known data pattern and verify
      • Verification of each pass completion
      
      **DoD 5220.22-M (7-Pass)**
      • Enhanced security for classified data
      • Multiple random and pattern overwrites
      • Comprehensive verification process
      • Suitable for high-security environments
      
      **Implementation Example**
      \`\`\`
      # 3-pass DoD method with sdelete
      sdelete -p 3 -s -z C:\\sensitive_folder
      
      # 7-pass DoD method
      sdelete -p 7 -s -z C:\\classified_data
      
      # Verify erasure completion
      sdelete -p 1 -c C:
      \`\`\``
    },
    {
      title: "NIST Guidelines Implementation",
      content: `National Institute of Standards and Technology recommendations:
      
      **NIST SP 800-88 Rev. 1**
      • Clear: Logical sanitization techniques
      • Purge: Physical or cryptographic sanitization
      • Destroy: Physical destruction of media
      
      **Windows Clear Methods**
      • File system formatting with overwrite
      • Block-level overwrite of allocated space
      • Metadata and file allocation table clearing
      
      **Windows Purge Methods**
      • Cryptographic erasure for encrypted drives
      • Secure erase commands for SSDs
      • Degaussing for magnetic media
      
      **D-Secure NIST Compliance**
      \`\`\`
      # Format with overwrite
      format C: /fs:NTFS /p:1 /y
      
      # Secure erase for SSDs
      hdparm --user-master u --security-set-pass p /dev/sdX
      hdparm --user-master u --security-erase p /dev/sdX
      
      # Cryptographic erasure
      manage-bde -delete C:
      \`\`\``
    }
  ];

  const quickAccess = [
    { title: "Built-in Tools", url: "/support/manual/windows-builtin-tools" },
    { title: "Command Line", url: "/support/manual/windows-command-line" },
    { title: "Crypto Erasure", url: "/support/manual/windows-crypto-erasure" },
    { title: "Methods Comparison", url: "/support/manual/windows-methods-comparison" }
  ];

  return (
    <>
      <Helmet>
        <title>Windows Software-Based Overwrite | DoD & NIST Methods</title>
        <meta name="description" content="Software-based overwrite methods for Windows including single-pass, multi-pass DoD, and NIST guidelines implementation." />
      </Helmet>
      
      <ManualPageTemplate
        title="Software-Based Overwrite"
        subtitle="Single-pass and multi-pass DoD/NIST methods"
        sections={sections}
        quickAccess={quickAccess}
        backUrl="/support/manual/windows"
        ctaTitle="Professional Software Erasure"
        ctaDescription="Implement industry-standard software overwrite methods with D-Secure Windows erasure tools."
        ctaButtonText="Get Software Erasure Tools"
        ctaButtonUrl="/products"
      />
    </>
  );
};

export default WindowsSoftwareErasurePage;