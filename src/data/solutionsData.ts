export interface SolutionVertical {
  slug: string;
  title: string;
  industry: string;
  heroDescription: string;
  regulatoryLandscape: string;
  alignmentTable: {
    regulation: string;
    requirement: string;
    capability: string;
  }[];
  proceduralContent: string[];
  technicalSpecs: string[];
  seoTitle: string;
  seoDescription: string;
}

export const solutionsData: SolutionVertical[] = [
  {
    slug: "financial-services",
    industry: "Financial Services & Fintech",
    title: "Data Lifecycle Governance for Global Financial Institutions",
    heroDescription: "Eliminate residual data risk in high-frequency trading environments and retail banking infrastructure with programmatic, audit-ready sanitization.",
    regulatoryLandscape: "Financial institutions operate under a complex matrix of global regulations including GLBA (Gramm-Leach-Bliley Act), PCI DSS 4.0, and SOX. Central to these mandates is the requirement for 'secure disposal'—a term often underspecified in legacy protocols but strictly enforced during audits. D-Secure transforms this from a manual checklist into a verifiable governance layer.",
    alignmentTable: [
      {
        regulation: "GLBA Section 501(b)",
        requirement: "Safeguarding Customer Information",
        capability: "Cryptographic erasure and multi-pass overwrite standards applied to all decommissioned endpoints."
      },
      {
        regulation: "PCI DSS 4.0 (Req. 9.6)",
        requirement: "Physical Media Destruction verify",
        capability: "Automated verification logs mapping physical drive serials to Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary/Annexure)."
      },
      {
        regulation: "SOX Section 404",
        requirement: "Internal Controls Integrity",
        capability: "Tamper-proof audit trails for all data destruction events integrated into enterprise GRC systems."
      },
      {
        regulation: "NYDFS 23 NYCRR 500",
        requirement: "Data Retention & Disposal",
        capability: "Centrally governed policies ensuring data is sanitized immediately upon reaching end-of-retention period."
      }
    ],
    proceduralContent: [
      "In the financial sector, data resides in diverse states—from high-speed NVMe flash in trading servers to legacy tape backups in cold storage. A singular tool rarely suffices. D-Secure's Financial Solution Bundle provides a unified control plane for multi-architecture environments, allowing for the simultaneous management of disparate storage types. This is particularly crucial during data center consolidation or migration to the cloud, where 'zombie data' on abandoned arrays represents a dormant liability.",
      "Implementation begins with 'The Discovery Phase', where our SDK scans for unmapped storage nodes across the network, identifying shadow IT and orphaned volumes often missed by standard enterprise asset management tools. Once mapped, the 'Policy Enforcement' phase applies NIST 800-88 Purge or Clear relative to the data classification level. For high-volume SSD decommissioning, D-Secure utilizes proprietary firmware-level commands to reset cells without unnecessary cell-wear, ensuring hardware circularity and increasing the resale value of sanitized assets.",
      "The architectural complexity of modern fintech—utilizing microservices and distributed databases—means that 'destruction' must also happen at the logical level. D-Secure's logical sanitization agents can be injected into CI/CD pipelines to ensure that development and staging environments are purged of production-clone data according to a strict schedule, preventing 'data leakage' into less secure non-production zones.",
      "The final and most critical stage for financial auditors is 'Verification'. D-Secure generates a 2048-bit RSA-signed Tamper-proof audit report with certificate (Page 1: Certificate, Page 2+: Summary/Annexure) for every erasure event. These reports include metadata on sector-level verification (10% or 100% checks), hardware health metrics, and the identity of the triggering agent, creating an undeniable chain of custody that withstands the scrutiny of the OCC, SEC, and global regulatory bodies."
    ],
    technicalSpecs: [
      "Support for 24+ global standards including NIST, DoD, and HMG.",
      "Active Directory integration for role-based erasure triggering.",
      "Restful API for integration into Banking ERPs (e.g., SAP, Oracle).",
      "Network-bootable PXE environment for bulk server sanitization."
    ],
    seoTitle: "Financial Data Sanitization & GLBA Compliance | D-Secure",
    seoDescription: "Comprehensive data lifecycle governance for banks and fintech. Meet GLBA, PCI DSS, and SOX requirements with programmatic, auditable data sanitization solutions."
  },
  {
    slug: "healthcare-compliance",
    industry: "Healthcare & Life Sciences",
    title: "HIPAA-Aligned Data Sanitization for Healthcare Infrastructure",
    heroDescription: "Protect Protected Health Information (PHI) with medical-grade data destruction. Verifiable hygiene for hospitals, labs, and health-tech platforms.",
    regulatoryLandscape: "Healthcare organizations are primary targets for ransomware and data breaches. HIPAA (Health Insurance Portability and Accountability Act) and HITECH requirements mandate that ePHI must be rendered 'unusable, unreadable, or indecipherable' to unauthorized individuals. D-Secure provides the programmatic evidence required to prove this state during HHS audits.",
    alignmentTable: [
      {
        regulation: "HIPAA 164.310(d)(2)(i)",
        requirement: "Disposal of ePHI",
        capability: "Compliance software-based erasure that meets HHS requirements for making ePHI unrecoverable."
      },
      {
        regulation: "HITECH Act",
        requirement: "Breach Notification Exemption",
        capability: "Safe-harbor achieving sanitization via encryption-key destruction (Cryptographic Erasure)."
      },
      {
        regulation: "GDPR (Health Data)",
        requirement: "Article 17: Right to Erasure",
        capability: "Deterministic removal of specific patient records from complex enterprise storage arrays."
      }
    ],
    proceduralContent: [
      "Healthcare data ecosystems are characterized by 'data sprawl'—where PHI drifts from core Electronic Health Record (EHR) systems into peripheral medical imaging devices, nurse stations, and mobile diagnostic tablets. D-Secure's Healthcare vertical is optimized for this sprawl, providing endpoint-specific agents that can be deployed remotely to sanitize decentralized assets before they leave the hospital's secure perimeter.",
      "Our 'Diagnostic Sanitization' module is specifically built to handle the unique storage controllers found in MRI, CT, and Ultrasound equipment. Often, these devices use proprietary Linux or VxWorks kernels that standard tools fail to address. D-Secure provides the low-level drivers necessary to execute NIST-grade purging on medical-specific hardware, ensuring that even deep-seated metadata in the diagnostic buffer is permanently destroyed.",
      "Beyond physical hardware, healthcare providers must manage the 'Digital Right to be Forgotten'. For telemedicine platforms and HIEs (Health Information Exchanges), the platform offers 'Cloud Discovery'—identifying orphaned data volumes in AWS or Azure that still contain patient identifiers. Programmatic cleanup ensures that 'deleting' a record in the UI translates to a structural zeroing of the underlying storage block across multi-region clusters.",
      "The result of a D-Secure healthcare deployment is an 'Audit-Ready EHR Decommissioning' Tamper-proof audit report with certificate (Page 1: Certificate, Page 2+: Summary/Annexure). This document, signed and encrypted, serves as proof of HIPAA compliance during regulatory reviews, demonstrating that the organizational 'Chain of Hygiene' remained unbroken from asset usage to final sanitization."
    ],
    technicalSpecs: [
      "DICOM-compatible metadata handling for asset tracking.",
      "Headless execution for remote clinic hardware decommissioning.",
      "Tamper-proof logs compliant with digital signature laws.",
      "Support for legacy medical imaging storage architectures.",
      "Cryptographic erasure for SSD-based medical diagnostic tablets."
    ],
    seoTitle: "Healthcare Data Sanitization & HIPAA Compliance | D-Secure",
    seoDescription: "Medical-grade data destruction for HIPAA and HITECH compliance. Secure your patient data (PHI) during hardware disposal with D-Secure's verifiable erasure."
  },
  {
    slug: "government-defense",
    industry: "Government & Defense",
    title: "National Security Grade Data Sanitization & NIST Compliance",
    heroDescription: "Mission-critical data destruction for public sector agencies, military contractors, and intelligence entities. Verified to NIST 800-88 and DoD standards.",
    regulatoryLandscape: "Government and defense sectors handle Controlled Unclassified Information (CUI) and Classified data that require the highest levels of sanitization assurance. NIST Special Publication 800-88 Rev. 1 is the 'gold standard' for these operations, mandating specific Clear, Purge, and Destroy methods relative to the sensitivity of the media. D-Secure provides the programmatic execution and cryptographic evidence required to satisfy these rigid federal mandates while maintaining efficiency in large-scale deployments.",
    alignmentTable: [
      {
        regulation: "NIST 800-88 Rev. 1",
        requirement: "Media Sanitization Guidelines",
        capability: "Full implementation of Purge and Clear protocols with sector-level verification passes."
      },
      {
        regulation: "DoD 5220.22-M",
        requirement: "National Industrial Security",
        capability: "Standardized 3-pass and 7-pass overwrite algorithms for high-security environments."
      },
      {
        regulation: "FOIA (Data Protection)",
        requirement: "Prevention of Unauthorized Disclosure",
        capability: "Irreversible data destruction ensures zero data remanence for decommissioned federal assets."
      }
    ],
    proceduralContent: [
      "Operating in a defense context requires 'Air-Gapped Authority'. D-Secure's platform is uniquely architected to run in fully disconnected environments, where many cloud-based tools fail. Our government-grade ISO distributions allow agencies to boot from local arrays or PXE servers without needing external internet access for license check-ins, ensuring that the 'Secret' remains within the secure facility.",
      "The 'Purge' protocol for SSDs is a particular focus. Unlike basic overwriting, D-Secure interacts with the internal controller via the Secure Erase command or Sanitize block-erase, ensuring that data in over-provisioned areas and wear-leveling pools is structurally zeroed. This is followed by a firmware-level verification that queries the controller for sanitization status, as prescribed by NIST 800-88 Rev. 1.",
      "For intelligence entities, the 'Triple-Pass Verification' provides an additional layer of security. The platform writes random patterns, verifies, then writes zeros, and performs a final 100% sector verification. While time-intensive, this satisfies the most stringent requirements for 'High-Security' media disposal where physical shredding is not feasible due to logistical or environmental constraints.",
      "Every event is logged to a local, encrypted SQLite database that can be exported via secure channels for ingestion into government oversight portals. These logs include the hardware serial number (UID), the specific algorithm used, the verification percentage, and the NIST classification achieved, providing a ready-to-file artifact for compliance officers during FISMA or FedRAMP audits."
    ],
    technicalSpecs: [
      "FIPS-compliant encryption for all local log storage.",
      "Air-gapped licensing and execution support.",
      "Support for classified media types (NVMe, SAS, Fibre Channel).",
      "Tamper-proof metadata with hardware-level identification.",
      "Command-line interface (CLI) for integration into secure automated workflows."
    ],
    seoTitle: "Government Data Sanitization & NIST Compliance | D-Secure",
    seoDescription: "Defense-grade data destruction for government agencies and contractors. NIST 800-88 and DoD 5220.22-M compliant sanitization solutions."
  },
  {
    slug: "enterprise-itad",
    industry: "Enterprise ITAD & Recyclers",
    title: "Scalable Data Sanitization for IT Asset Disposition (ITAD)",
    heroDescription: "High-volume data erasure for recyclers, refurbishers, and enterprise ITAD departments. Optimize throughput while maintaining R2v3 and e-Stewards compliance.",
    regulatoryLandscape: "For ITAD providers, data sanitization is a production-line requirement. High volume and high variability are the primary challenges. Certifications like R2v3 and e-Stewards require rigorous documentation of every asset's sanitization status. D-Secure is built to scale, providing the parallel execution and automated reporting necessary to handle thousands of drives per shift with zero human error, maximizing both compliance and operational profit.",
    alignmentTable: [
      {
        regulation: "R2v3 Standard",
        requirement: "Data Security Strategy",
        capability: "Automated asset tracking and verifiable sanitization logs for every processed drive."
      },
      {
        regulation: "e-Stewards 4.1",
        requirement: "Verified Data Destruction",
        capability: "Programmatic verification ensuring that 100% of sectors are checked for data remanence."
      },
      {
        regulation: "ADISA Standard",
        requirement: "Product Claims Guarantee",
        capability: "Compliance erasure software tested against forensic-level recovery tools (Includes Page 1: Certificate, Page 2+: Summary)."
      }
    ],
    proceduralContent: [
      "In a high-intensity ITAD environment, manual drive interaction is the enemy of profitability. D-Secure's 'Mass Parallel' architecture allows a single technician to manage hundreds of simultaneous erasure tasks from a centralized dashboard. The platform automatically detects the drive type (SSD vs HDD vs NVMe) and recommends the most efficient compliant standard (e.g., Cryptographic Erasure for SEDs vs Multi-pass Overwrite for legacy HDDs).",
      "The integration layer is where D-Secure provides the most value to recyclers. VIA our RESTful API, D-Secure pushes Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary/Annexure) directly into ERP systems like IQity or RazorERP. This eliminates manual data entry and ensures that an asset cannot be 'cleared for resale' unless a successful, signed report is present, preventing accidental leak of customer data through the resale channel.",
      "Beyond just 'erasing', we provide 'Value Recovery' metrics. During the sanitization process, D-Secure extracts SMART health data, capacity, and model info. This data is exported alongside the certificate, allowing ITAD providers to automatically grade and price their inventory for secondary markets while the drive is still on the wipe-bench, effectively turning sanitization from a cost-center into a data-entry hub.",
      "For global ITAD players, the D-Secure platform supports 'Centralized Chain of Custody'. No matter where in the world an asset is sanitized—at a client site or a central processing facility—the record is synced to a global tenant, giving the enterprise client a unified view of their entire global decommissioning footprint."
    ],
    technicalSpecs: [
      "Parallel processing for 100+ drives per controller node.",
      "ERP/WMS integration via webhooks and REST API.",
      "Automatic asset labeling and grading based on SMART data.",
      "R2v3 and e-Stewards ready reporting templates.",
      "Support for bulk network boot (PXE) deployment."
    ],
    seoTitle: "Enterprise ITAD Data Sanitization & Recycler Asset Management | D-Secure",
    seoDescription: "Scale your ITAD operations with D-Secure's high-volume data sanitization software. R2v3 and e-Stewards compliant reporting with ERP integration."
  }
];
