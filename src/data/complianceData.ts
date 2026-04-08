export type ClauseRequirement = {
  clause: string;
  requirement: string;
  evidence: string;
};

export type Standard = {
  title: string;
  fullName: string;
  description: string;
  icon: string;
  details: string;
  clauseRequirements: ClauseRequirement[];
  implementation: string;
  deepDiveUrl?: string;
};

export type Standards = {
  [key: string]: Standard;
};

export const standards: Standards = {
  nist: {
    title: "NIST 800-88",
    fullName: "National Institute of Standards and Technology",
    description: "Guidelines for Media Sanitization",
    icon: "🇺🇸",
    details:
      "NIST Special Publication 800-88 Rev. 1 provides guidance for sanitizing information system media to prevent the unauthorized disclosure of information.",
    clauseRequirements: [
      {
        clause: "Section 2.1",
        requirement: "Information Disposition & Sanitization",
        evidence: "Verification Receipt (Bit-Level)",
      },
      {
        clause: "Section 4.1",
        requirement: "Clear: Logical techniques to sanitize data",
        evidence: "Internal Sanitization Log",
      },
      {
        clause: "Section 4.2",
        requirement: "Purge: Physical/Logical rendering unrecoverable",
        evidence: "Cryptographic Erasure Key Deletion Record",
      },
      {
        clause: "Section 4.3",
        requirement: "Documentation of Sanitization",
        evidence: "Tamper-Proof Certificate of Destruction",
      },
    ],
    implementation:
      "D-Secure implements all NIST 800-88 Rev. 1 sanitization categories with automated verification and regulatory document generation.",
    deepDiveUrl: "/compliance/nist-800-88"
  },
  iso27001: {
    title: "ISO 27001",
    fullName: "International Organization for Standardization",
    description: "Information Security Management Systems",
    icon: "🌐",
    details:
      "ISO/IEC 27001 specifies requirements for establishing, implementing, maintaining and continually improving an ISMS.",
    clauseRequirements: [
      {
        clause: "Annex A.8.3.2",
        requirement: "Disposal of media",
        evidence: "Chain of Custody Report",
      },
      {
        clause: "Annex A.11.2.7",
        requirement: "Removal of Property",
        evidence: "Asset Exit Authorization Log",
      },
      {
        clause: "Annex A.18.1.3",
        requirement: "Protection of Records",
        evidence: "Immutable Session Audit Trail",
      },
    ],
    implementation:
      "D-Secure supports ISO 27001 compliance through comprehensive asset tracking, access controls, and audit trail generation.",
  },
  gdpr: {
    title: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "European Union Data Protection Law",
    icon: "🇪🇺",
    details:
      "The GDPR requires organizations to implement appropriate technical and organizational measures to ensure data protection.",
    clauseRequirements: [
      {
        clause: "Article 17",
        requirement: 'Right to erasure ("Right to be Forgotten")',
        evidence: "Verification of Destruction Receipt",
      },
      {
        clause: "Article 25",
        requirement: "Data protection by design and default",
        evidence: "Automated Lifecycle API Logs",
      },
      {
        clause: "Article 32",
        requirement: "Security of processing",
        evidence: "Cryptographic Erasure Validation",
      },
    ],
    implementation:
      "D-Secure ensures GDPR compliance with verifiable data erasure, detailed logging, and automated reporting capabilities.",
    deepDiveUrl: "/compliance/gdpr"
  },
  hipaa: {
    title: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "Healthcare Information Privacy and Security",
    icon: "🏥",
    details:
      "HIPAA requires covered entities to implement safeguards to protect the privacy and security of protected health information (PHI).",
    clauseRequirements: [
      {
        clause: "§ 164.310(d)(2)(i)",
        requirement: "Disposal: Final disposition of electronic PHI",
        evidence: "Media Sanitization Certification",
      },
      {
        clause: "§ 164.310(d)(2)(ii)",
        requirement: "Media Re-use: Proper sanitization before reuse",
        evidence: "Verification Log (Post-Write-Test)",
      },
      {
        clause: "§ 164.312(c)(1)",
        requirement: "Integrity: Protecting PHI from alteration",
        evidence: "JSON-LD Immutable Audit Trail",
      },
    ],
    implementation:
      "D-Secure provides HIPAA-compliant sanitization with PHI-specific protocols and comprehensive audit documentation.",
  },
  sox: {
    title: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description: "Financial Reporting and Corporate Governance",
    icon: "📊",
    details:
      "The Sarbanes-Oxley Act requires public companies to maintain accurate financial records and implement internal controls.",
    clauseRequirements: [
      {
        clause: "Section 404",
        requirement: "Data integrity and accuracy controls",
        evidence: "SOX Compliance Report",
      },
      {
        clause: "Section 802",
        requirement: "Secure retention and disposal of records",
        evidence: "Tamper-Proof Audit Trail",
      },
      {
        clause: "Section 302",
        requirement: "Management regulation of controls",
        evidence: "Role-Based Access Logs",
      },
    ],
    implementation:
      "D-Secure supports SOX compliance through tamper-proof audit trails, secure data handling, and management reporting.",
  },
  pci: {
    title: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description: "Credit Card Data Protection Requirements",
    icon: "💳",
    details:
      "PCI DSS is a set of security standards designed to ensure that companies that process credit card information maintain a secure environment.",
    clauseRequirements: [
      {
        clause: "Req 3",
        requirement: "Secure storage and transmission of cardholder data",
        evidence: "Encryption Certificates",
      },
      {
        clause: "Req 7",
        requirement: "Implement strong access control measures",
        evidence: "Access Control Logs",
      },
      {
        clause: "Req 9",
        requirement: "Secure disposal of cardholder data",
        evidence: "Media Sanitization Certificate",
      },
    ],
    implementation:
      "D-Secure ensures PCI DSS compliance with Compliant sanitization methods and detailed compliance reporting.",
  },
};
