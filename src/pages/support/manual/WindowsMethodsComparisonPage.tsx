import React from "react";
import { Helmet } from "react-helmet-async";
import ManualPageTemplate from "@/components/ManualPageTemplate";

const WindowsMethodsComparisonPage: React.FC = () => {
  const sections = [
    {
      title: "Software Overwrite Methods",
      content: `Comparison of software-based erasure approaches:
      
      **Single-Pass Overwrite**
      ✅ **Pros:**
      • Fast execution time
      • Suitable for modern drives
      • NIST SP 800-88 compliant
      • Low system resource usage
      
      ❌ **Cons:**
      • May not meet legacy security requirements
      • Limited effectiveness on damaged sectors
      • Requires functional drive electronics
      
      **Multi-Pass DoD Methods**
      ✅ **Pros:**
      • High security assurance
      • Meets DoD 5220.22-M standards
      • Effective against advanced recovery
      • Comprehensive verification
      
      ❌ **Cons:**
      • Time-intensive process
      • Increased wear on SSDs
      • Higher power consumption
      • May not be necessary for modern drives`
    },
    {
      title: "Cryptographic Erasure",
      content: `Key destruction approach for encrypted drives:
      
      **BitLocker Cryptographic Erasure**
      ✅ **Pros:**
      • Instantaneous completion
      • No physical wear on drive
      • Effective for all drive types
      • Maintains drive performance
      
      ❌ **Cons:**
      • Requires prior encryption
      • Trust in encryption implementation
      • Key recovery risks if not properly managed
      • May not meet all compliance requirements
      
      **Self-Encrypting Drive (SED)**
      ✅ **Pros:**
      • Hardware-level security
      • OPAL 2.0 standard compliance
      • Instant secure erase capability
      • No software dependencies
      
      ❌ **Cons:**
      • Limited drive compatibility
      • Requires SED-capable hardware
      • Potential firmware vulnerabilities
      • Higher initial cost`
    },
    {
      title: "Method Selection Guidelines",
      content: `Choosing the appropriate erasure method for Windows:
      
      **High Security Requirements**
      • Use multi-pass DoD methods (3-7 passes)
      • Combine with cryptographic erasure
      • Physical destruction for classified data
      • Comprehensive audit trail documentation
      
      **Standard Business Use**
      • Single-pass NIST method sufficient
      • Cryptographic erasure for encrypted drives
      • Built-in Windows tools acceptable
      • Cost-effective and time-efficient
      
      **Compliance Considerations**
      • **GDPR**: Single-pass generally sufficient
      • **HIPAA**: Multi-pass recommended for PHI
      • **PCI DSS**: Cryptographic or multi-pass required
      • **DoD**: Multi-pass mandatory for classified
      
      **Drive Type Recommendations**
      \`\`\`
      HDD (Traditional):
      - Single-pass: NIST SP 800-88
      - Multi-pass: DoD 5220.22-M (3-pass)
      
      SSD (Solid State):
      - Cryptographic erasure preferred
      - ATA Secure Erase command
      - Manufacturer utilities
      
      Encrypted Drives:
      - Key destruction (cryptographic)
      - Combined with overwrite if required
      - Verify encryption key removal
      \`\`\``
    }
  ];

  const quickAccess = [
    { title: "Software Erasure", url: "/support/manual/windows-software-erasure" },
    { title: "Crypto Erasure", url: "/support/manual/windows-crypto-erasure" },
    { title: "SSD Erasure", url: "/support/manual/windows-ssd-erasure" },
    { title: "Best Practices", url: "/support/manual/windows-best-practices" }
  ];

  return (
    <>
      <Helmet>
        <title>Windows Erasure Methods Comparison | Software vs Cryptographic</title>
        <meta name="description" content="Comprehensive comparison of Windows data erasure methods including pros, cons, and selection guidelines." />
      </Helmet>
      
      <ManualPageTemplate
        title="Method Comparison"
        subtitle="Pros and cons of each erasure approach"
        sections={sections}
        quickAccess={quickAccess}
        backUrl="/support/manual/windows"
        ctaTitle="Method Selection Consultation"
        ctaDescription="Get expert guidance on selecting the optimal erasure method for your Windows environment."
        ctaButtonText="Consult D-Secure Experts"
        ctaButtonUrl="/contact"
      />
    </>
  );
};

export default WindowsMethodsComparisonPage;