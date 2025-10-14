import React from "react";
import { Helmet } from "react-helmet-async";
import ManualPageTemplate from "@/components/ManualPageTemplate";

const WindowsCryptoErasurePage: React.FC = () => {
  const sections = [
    {
      title: "BitLocker Cryptographic Erasure",
      content: `Secure key destruction for BitLocker encrypted drives:
      
      **Key Destruction Process**
      • Remove BitLocker protection from drive
      • Delete encryption keys from TPM/USB
      • Clear key protectors and recovery information
      • Verify cryptographic erasure completion
      
      **BitLocker Commands**
      \`\`\`
      # Remove BitLocker protection
      manage-bde -off C:
      
      # Delete all key protectors
      manage-bde -protectors -delete C: -type all
      
      # Remove BitLocker completely
      manage-bde -delete C:
      
      # Verify removal
      manage-bde -status C:
      \`\`\`
      
      **Advantages**
      • Instantaneous erasure of encrypted data
      • No physical overwrite required
      • Effective for SSDs with wear leveling
      • Maintains drive performance characteristics`
    },
    {
      title: "Self-Encrypting Drive (SED) Erasure",
      content: `Hardware-based cryptographic erasure for SED drives:
      
      **SED Capabilities**
      • Hardware-level encryption built into drive
      • OPAL 2.0 and Enterprise SSC standards
      • Instant secure erase through key destruction
      • No performance impact during normal operation
      
      **D-Secure SED Process**
      • Authenticate with drive administrator password
      • Issue cryptographic erase command
      • Generate new encryption keys
      • Verify erasure completion and drive status
      
      **SED Commands**
      \`\`\`
      # Check SED support
      sedutil-cli --scan
      
      # Cryptographic erase
      sedutil-cli --cryptoerase password /dev/nvme0n1
      
      # Verify erasure
      sedutil-cli --query /dev/nvme0n1
      \`\`\``
    },
    {
      title: "Third-Party Encryption Erasure",
      content: `Handling various encryption solutions in Windows:
      
      **VeraCrypt/TrueCrypt**
      • Delete container files and keyfiles
      • Clear volume headers and backup headers
      • Remove encryption software and traces
      • Overwrite free space on host drive
      
      **Symantec Endpoint Encryption**
      • Remove encryption client software
      • Delete authentication tokens and certificates
      • Clear encryption policy configurations
      • Secure deletion of log files
      
      **McAfee Drive Encryption**
      • Decrypt drive using administrative credentials
      • Remove encryption agent and policies
      • Clear pre-boot authentication data
      • Verify complete decryption process
      
      **General Process**
      \`\`\`
      # Decrypt encrypted volumes
      veracrypt /dismount /force /quit
      
      # Remove encryption software
      wmic product where name="Encryption Software" call uninstall
      
      # Clear encryption traces
      cipher /w:C:\\
      \`\`\``
    }
  ];

  const quickAccess = [
    { title: "Software Erasure", url: "/support/manual/windows-software-erasure" },
    { title: "BitLocker Management", url: "/support/manual/windows-bitlocker" },
    { title: "SED Drives", url: "/support/manual/windows-sed-drives" },
    { title: "Methods Comparison", url: "/support/manual/windows-methods-comparison" }
  ];

  return (
    <>
      <Helmet>
        <title>Windows Cryptographic Erasure | BitLocker & SED Key Destruction</title>
        <meta name="description" content="Cryptographic erasure methods for Windows including BitLocker key destruction and self-encrypting drive procedures." />
      </Helmet>
      
      <ManualPageTemplate
        title="Cryptographic Erasure"
        subtitle="Encrypted drive key destruction procedures"
        sections={sections}
        quickAccess={quickAccess}
        backUrl="/support/manual/windows"
        ctaTitle="Cryptographic Erasure Services"
        ctaDescription="Implement secure cryptographic erasure for encrypted Windows drives with D-Secure expertise."
        ctaButtonText="Get Crypto Erasure Help"
        ctaButtonUrl="/contact"
      />
    </>
  );
};

export default WindowsCryptoErasurePage;