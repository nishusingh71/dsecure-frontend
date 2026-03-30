import { SEOMetadata, generateKeywords, getCanonicalUrl, generateSoftwareProductSchema } from "./seo.core";

export const PRODUCT_SEO: Record<string, Partial<SEOMetadata>> = {
  "drive-eraser": {
    title: "Drive Eraser - #1 Secure Data Erasure Software for HDD & SSD | D-Secure",
    description: "Securely erase hard drives (HDD) and solid-state drives (SSD) with D-Secure. NIST 800-88 and DoD 5220.22-M compliant enterprise data erasure.",
    keywords: generateKeywords(["drive eraser", "HDD wiping", "SSD secure erase", "NIST compliant", "hard drive destruction", "secure data erasure software"]),
    canonicalUrl: getCanonicalUrl("/products/drive-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Eraser", item: "/products/drive-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Eraser",
      "Enterprise-grade data erasure for HDD and SSD. NIST 800-88 compliant.",
      { category: "SecurityApplication", ratingValue: 4.9, reviewCount: 850 }
    ),
  },
  "drive-eraser-diagnostic": {
    title: "Drive Eraser Diagnostic - Wiping & Hardware Testing | D-Secure Tech",
    description: "Combine secure data erasure with comprehensive hardware diagnostics. Ensure drive health and data security in one seamless process.",
    keywords: generateKeywords(["drive diagnostics", "hard drive testing", "secure wiping diagnostic", "health checkup"]),
    canonicalUrl: getCanonicalUrl("/products/drive-eraser-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Eraser Diagnostic", item: "/products/drive-eraser-diagnostic" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Eraser Diagnostic",
      "Combined data erasure and hardware diagnostic tool for enterprises.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 320 }
    ),
  },
  "file-eraser": {
    title: "File Eraser - Secure File Deletion & Enterprise Data Sanitization | D-Secure",
    description: "Permanently delete sensitive files and folders with D-Secure File Eraser. Compliance enterprise data sanitization with Tamper-proof audit reports (Page 1: Certificate, Page 2+: Summary).",
    keywords: generateKeywords(["file eraser", "secure file deletion", "file shredder", "folder wiping", "privacy protection", "enterprise data erasure"]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser", item: "/products/file-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure File Eraser",
      "Securely erase individual files and folders with audit-proof reporting.",
      { category: "SecurityApplication", ratingValue: 4.7, reviewCount: 410 }
    ),
  },
  "file-eraser-network": {
    title: "File Eraser Network - Enterprise Network Data Sanitization | D-Secure",
    description: "Securely erase files and folders across your entire network with D-Secure File Eraser Network. Centralized management for enterprise data destruction.",
    keywords: generateKeywords(["file eraser network", "network data wiping", "remote file deletion", "enterprise network security", "centralized data erasure"]),
    canonicalUrl: getCanonicalUrl("/products/file-eraser-network"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "File Eraser Network", item: "/products/file-eraser-network" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure File Eraser Network",
      "Centralized network file erasure for large enterprise environments.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 156 }
    ),
  },
  "hardware-diagnostics": {
    title: "Hardware Diagnostics - Complete System Health Test | D-Secure Tech",
    description: "Identify hardware failures before they happen. Professional-grade diagnostic tools for CPU, Memory, Storage, and more.",
    keywords: generateKeywords(["hardware diagnostics", "system health test", "PC diagnostic tool", "hardware failure testing"]),
    canonicalUrl: getCanonicalUrl("/products/hardware-diagnostics"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hardware Diagnostics", item: "/products/hardware-diagnostics" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Hardware Diagnostics",
      "Comprehensive hardware testing and system health diagnostic suite.",
      { category: "UtilitiesApplication", ratingValue: 4.6, reviewCount: 220 }
    ),
  },
  "hard-drive-monitor": {
    title: "Hard Drive Monitor - S.M.A.R.T Health Tracking | D-Secure Tech",
    description: "Monitor hard drive health, temperature, and performance in real-time with D-Secure Hard Drive Monitor. S.M.A.R.T. tracking and disk cloning support.",
    keywords: generateKeywords(["hard drive monitor", "disk health", "SMART status", "disk cloning", "bad sector scan"]),
    canonicalUrl: getCanonicalUrl("/products/hard-drive-monitor"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Hard Drive Monitor", item: "/products/hard-drive-monitor" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Hard Drive Monitor",
      "Real-time S.M.A.R.T monitoring and health tracking for storage drives.",
      { category: "UtilitiesApplication", ratingValue: 4.7, reviewCount: 185 }
    ),
  },
  "autopilot-detection": {
    title: "Autopilot Detection - Automated Device Provisioning | D-Secure Tech",
    description: "Detect and manage Windows Autopilot devices with ease. Ideal for ITADs and refurbishers to ensure secure device lifecycle management.",
    keywords: generateKeywords(["autopilot detection", "Windows Autopilot", "device provisioning", "ITAD tools"]),
    canonicalUrl: getCanonicalUrl("/products/autopilot-detection"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Autopilot Detection", item: "/products/autopilot-detection" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Autopilot Detection",
      "Automated detection tool for Windows Autopilot deployment status.",
      { category: "BusinessApplication", os: "Windows", ratingValue: 4.8, reviewCount: 94 }
    ),
  },
  "smartphone-eraser": {
    title: "Smartphone Eraser - Secure Wiping for iOS & Android | D-Secure Tech",
    description: "Compliance data erasure for mobile devices. Completely wipe personal data from iPhones, iPads, and Android smartphones with Tamper-proof audit reports (Page 1: Certificate, Page 2+: Summary).",
    keywords: generateKeywords(["smartphone eraser", "iPhone data wipe", "Android wiping", "mobile data destruction", "tablet eraser"]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Smartphone Eraser", item: "/products/smartphone-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Smartphone Eraser",
      "Secure mobile data wiping for iPhones, iPads, and Android devices.",
      { category: "SecurityApplication", os: "Android, iOS", ratingValue: 4.9, reviewCount: 612 }
    ),
  },
  "smartphone-diagnostic": {
    title: "Smartphone Diagnostic - Professional Mobile Testing | D-Secure Tech",
    description: "Over 60+ automated hardware tests for mobile devices. Verify screen, battery, camera, and sensor health for better resale value.",
    keywords: generateKeywords(["smartphone diagnostic", "mobile health check", "iPhone testing", "Android diagnostic"]),
    canonicalUrl: getCanonicalUrl("/products/smartphone-diagnostic"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Smartphone Diagnostic", item: "/products/smartphone-diagnostic" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Smartphone Diagnostic",
      "Automated hardware diagnostic suite for mobile devices.",
      { category: "UtilitiesApplication", os: "Android, iOS", ratingValue: 4.7, reviewCount: 305 }
    ),
  },
  "forensic-imaging": {
    title: "Forensic Imaging - Precise Bit-for-Bit Data Capture | D-Secure Tech",
    description: "Create forensically sound images of storage media. Preserve evidence with bit-by-bit imaging for digital investigations.",
    keywords: generateKeywords(["forensic imaging", "digital forensics", "bit-for-bit capture", "data preservation"]),
    canonicalUrl: getCanonicalUrl("/products/forensic-imaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Forensic Imaging", item: "/products/forensic-imaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Forensic Imaging",
      "Bit-for-bit data capture and imaging for digital forensic investigations.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 112 }
    ),
  },
  "freeze-state": {
    title: "Freeze State - System Configuration Protection | D-Secure Tech",
    description: "Lock your system state to prevent unauthorized changes. Ideal for public kiosks, school labs, and enterprise workstations.",
    keywords: generateKeywords(["freeze state", "Deep Freeze alternative", "system protection", "kiosk mode"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State", item: "/products/freeze-state" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State",
      "System state locking and configuration protection for workstations.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.7, reviewCount: 284 }
    ),
  },
  "freeze-state-smart": {
    title: "Freeze State Smart - Intelligent State Management | D-Secure Tech",
    description: "Advanced system protection with automated updates and maintenance windows. Secure your devices without sacrificing performance.",
    keywords: generateKeywords(["smart freeze", "automated system protection", "maintenance mode", "secure workstations"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-smart"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State Smart", item: "/products/freeze-state-smart" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Smart",
      "Intelligent system protection with automated maintenance features.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.8, reviewCount: 142 }
    ),
  },
  "freeze-state-advanced": {
    title: "Freeze State Advanced - Enterprise-Grade System Locking | D-Secure Tech",
    description: "The ultimate solution for large-scale device security. Centralized management for frozen states across your entire network.",
    keywords: generateKeywords(["advanced freeze state", "enterprise system locking", "centralized management", "node security"]),
    canonicalUrl: getCanonicalUrl("/products/freeze-state-advanced"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Freeze State Advanced", item: "/products/freeze-state-advanced" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Freeze State Advanced",
      "Enterprise-grade system locking with centralized network management.",
      { category: "SecurityApplication", os: "Windows", ratingValue: 4.9, reviewCount: 88 }
    ),
  },
  "data-migration": {
    title: "Data Migration - Secure File Transfer & Sync | D-Secure Tech",
    description: "Transfer data seamlessly across devices and platforms. Bit-perfect migration ensures your data arrives exactly as it should.",
    keywords: generateKeywords(["data migration", "file transfer", "secure sync", "system migration"]),
    canonicalUrl: getCanonicalUrl("/products/data-migration"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Data Migration", item: "/products/data-migration" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Data Migration",
      "Secure and bit-perfect data migration across heterogeneous systems.",
      { category: "UtilitiesApplication", ratingValue: 4.5, reviewCount: 124 }
    ),
  },
  "asset-reimaging": {
    title: "Asset Reimaging - Zero-Touch OS Deployment | D-Secure Tech",
    description: "Deploy custom OS images to hundreds of devices simultaneously. Streamline your IT operations with automated reimaging.",
    keywords: generateKeywords(["asset reimaging", "OS deployment", "zero-touch deployment", "IT automation"]),
    canonicalUrl: getCanonicalUrl("/products/asset-reimaging"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Asset Reimaging", item: "/products/asset-reimaging" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Asset Reimaging",
      "Zero-touch automated OS deployment and asset reimaging tool.",
      { category: "BusinessApplication", os: "Windows", ratingValue: 4.7, reviewCount: 65 }
    ),
  },
  "virtual-machine-eraser": {
    title: "Virtual Machine Eraser - Secure Cloud Data Deletion | D-Secure Tech",
    description: "Erase virtual disks and cloud instances with precision. Compliant data destruction for AWS, Azure, and Google Cloud environments.",
    keywords: generateKeywords(["VM eraser", "cloud data deletion", "virtual disk wiping", "Azure data erasure"]),
    canonicalUrl: getCanonicalUrl("/products/virtual-machine-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Virtual Machine Eraser", item: "/products/virtual-machine-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Virtual Machine Eraser",
      "Secure data destruction for virtual disks and cloud environments.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 77 }
    ),
  },
  "removable-media-eraser": {
    title: "Removable Media Eraser - Wipe USBs & SD Cards | D-Secure Tech",
    description: "Compliance-grade erasure for all types of removable storage. Securely wipe USB drives, SD cards, and external hard disks with Tamper-proof audit reports (Page 1: Certificate, Page 2+: Summary).",
    keywords: generateKeywords(["USB eraser", "SD card wiping", "removable media destruction", "portable drive eraser"]),
    canonicalUrl: getCanonicalUrl("/products/removable-media-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Removable Media Eraser", item: "/products/removable-media-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Removable Media Eraser",
      "Secure data wiping for USB drives, SD cards, and portable media.",
      { category: "SecurityApplication", ratingValue: 4.7, reviewCount: 142 }
    ),
  },
  "lun-eraser": {
    title: "LUN Eraser - Secure Storage Area Network Wiping | D-Secure Tech",
    description: "Compliance-grade data erasure for active storage environments. Securely wipe logical units (LUNs) in SAN and NAS architectures with Tamper-proof audit reports (Page 1: Certificate, Page 2+: Summary).",
    keywords: generateKeywords(["LUN eraser", "SAN wiping", "NAS data destruction", "active storage erasure"]),
    canonicalUrl: getCanonicalUrl("/products/lun-eraser"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "LUN Eraser", item: "/products/lun-eraser" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure LUN Eraser",
      "High-performance LUN erasure for enterprise storage systems.",
      { category: "SecurityApplication", ratingValue: 4.9, reviewCount: 56 }
    ),
  },
  "drive-verifier": {
    title: "Drive Verifier - Accurately Verify Erased Drives | D-Secure Tech",
    description: "Verify drives for complete data erasure and confirm if any data traces exist. Compliant with R2, e-Stewards, and NAID AAA standards.",
    keywords: generateKeywords(["drive verifier", "data erasure verification", "R2v3 compliance", "NAID AAA verification", "e-Stewards audit", "PXE boot verification"]),
    canonicalUrl: getCanonicalUrl("/products/drive-verifier"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Drive Verifier", item: "/products/drive-verifier" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Drive Verifier",
      "Compliance verification tool for data erasure validation.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 128 }
    ),
  },
  "data-eraser-software": {
    title: "Data Erasure Software - Secure Wiping for All Devices | D-Secure Tech",
    description: "The ultimate suite for secure data destruction. Erase files, drives, smartphones, and servers with enterprise-grade security and compliance.",
    keywords: generateKeywords(["data erasure software", "secure wiping", "data destruction", "compliance software"]),
    canonicalUrl: getCanonicalUrl("/products/data-eraser-software"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Data Erasure Software", item: "/products/data-eraser-software" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Data Erasure Suite",
      "Complete suite for secure data sanitization across all device types.",
      { category: "SecurityApplication", ratingValue: 4.9, reviewCount: 1250 }
    ),
  },
  "mobile-erasure-solutions": {
    title: "Mobile Erasure Solutions - Secure Smartphone Wiping | D-Secure Tech",
    description: "Professional solutions for large-scale mobile device erasure. Securely wipe iPhones, iPads, and Android devices for ITAD and resale.",
    keywords: generateKeywords(["mobile erasure", "smartphone wiping", "secure mobile disposal", "ITAD mobile solutions"]),
    canonicalUrl: getCanonicalUrl("/products/mobile-erasure-solutions"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Mobile Erasure Solutions", item: "/products/mobile-erasure-solutions" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mobile Erasure Solutions",
      "High-volume mobile device sanitization for iOS and Android.",
      { category: "SecurityApplication", os: "Android, iOS", ratingValue: 4.8, reviewCount: 432 }
    ),
  },
  "wipe-mac-m1": {
    title: "How to Wipe M1 Mac - Secure Data Erasure Guide | D-Secure Tech",
    description: "Learn how to securely erase your Apple Silicon (M1/M2/M3) Mac. Professional guide for data destruction on modern macOS hardware.",
    keywords: generateKeywords(["wipe M1 Mac", "Apple Silicon erasure", "macOS secure wipe", "Mac data destruction"]),
    canonicalUrl: getCanonicalUrl("/products/wipe-mac-m1"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Wipe M1 Mac", item: "/products/wipe-mac-m1" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure Mac Eraser Guide",
      "Professional guide and tool for erasing Apple Silicon Macs.",
      { category: "SecurityApplication", os: "macOS", ratingValue: 4.9, reviewCount: 224 }
    ),
  },
  "wipe-sas-drive": {
    title: "How to Wipe SAS Drives - Enterprise Data Security | D-Secure Tech",
    description: "Professional guide for securely erasing enterprise SAS and hardware RAID drives. Ensure data security in your data center environments.",
    keywords: generateKeywords(["wipe SAS drive", "enterprise data erasure", "RAID wiping", "SAS disk destruction"]),
    canonicalUrl: getCanonicalUrl("/products/wipe-sas-drive"),
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: "Wipe SAS Drive", item: "/products/wipe-sas-drive" },
    ],
    structuredData: generateSoftwareProductSchema(
      "D-Secure SAS Drive Eraser Guide",
      "Enterprise guide and tool for secure SAS drive destruction.",
      { category: "SecurityApplication", ratingValue: 4.8, reviewCount: 110 }
    ),
  },
};
