/**
 * SEO Utility - Centralized SEO metadata management for D-Secure Tech
 * Provides consistent, optimized meta tags and structured data across all pages
 */

/**
 * SEO Utility - Centralized SEO metadata management for D-Secure Tech
 * Provides consistent, optimized meta tags and structured data across all pages
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
}

// Base configuration
export const SEO_CONFIG = {
  siteName: 'D-Secure Tech',
  baseUrl: 'https://D-Securetech.com',
  defaultImage: 'https://D-Securetech.com/logo-white.svg',
  author: 'D-Secure Tech',
  language: 'en',
  locale: 'en_US',
  twitterHandle: '@D-Securetech',
};

// Comprehensive keywords for data erasure and security - EXTENSIVELY EXPANDED
export const BASE_KEYWORDS = [
  // Core Data Erasure Keywords
  'data erasure software',
  'data erasure tool',
  'data erasure solution',
  'data erasure platform',
  'data wiping software',
  'data destruction software',
  'data sanitization tool',
  'data erasure application',
  'secure data erasure',
  'permanent data erasure',

  // Compliance & Standards
  'NIST 800-88 compliance',
  'NIST data erasure',
  'NIST compliant wiping',
  'GDPR data erasure',
  'GDPR compliance software',
  'HIPAA data erasure',
  'HIPAA compliant data destruction',
  'PCI DSS data protection',
  'PCI DSS compliance',
  'ISO 27001 data security',
  'ISO 27001 regulated',
  'ISO 27001 compliance',
  'DoD 5220.22-M standard',
  'DoD data wiping',
  'DoD compliant erasure',
  'SOX compliance',
  'FERPA data protection',
  'CCPA compliance',
  'GLBA data security',

  // Enterprise Solutions
  'enterprise data erasure',
  'enterprise data destruction',
  'enterprise data sanitization',
  'business data wiping',
  'corporate data erasure',
  'organization data security',
  'company data destruction',
  'enterprise data management',
  'business data security',

  // regulated Solutions
  'regulated data destruction',
  'regulated data erasure',
  'verified data wiping',
  'audited data sanitization',
  'compliant data erasure',
  'approved data destruction',
  'regulated data removal',
  'validated data wiping',

  // Hardware Specific
  'hard drive wiping software',
  'HDD data erasure',
  'SSD data erasure',
  'solid state drive erasure',
  'hard drive destruction',
  'SSD secure erase',
  'hard drive sanitization',
  'SSD data wiping',
  'hard drive erasure tool',
  'SSD secure wiping',

  // Device Types
  'laptop data erasure',
  'desktop data wiping',
  'server data destruction',
  'mobile device erasure',
  'tablet data wiping',
  'USB drive erasure',
  'external drive wiping',
  'RAID array erasure',
  'NAS data destruction',
  'SAN data wiping',

  // Security Focused
  'secure data destruction',
  'military grade wiping',
  'government data erasure',
  'classified data destruction',
  'sensitive data erasure',
  'confidential data wiping',
  'secure file deletion',
  'permanent data removal',
  'irreversible data destruction',
  'complete data eradication',

  // Digital Forensics & Recovery Prevention
  'digital forensics',
  'data recovery prevention',
  'forensic data erasure',
  'anti-forensics tool',
  'data remanence prevention',
  'secure delete',
  'unrecoverable data deletion',
  'forensic wiping',
  'evidence erasure',

  // Data Privacy
  'data privacy compliance',
  'data protection software',
  'privacy data erasure',
  'personal data destruction',
  'private data wiping',
  'confidential information erasure',
  'sensitive information destruction',
  'personal information wiping',

  // Industry Specific
  'healthcare data erasure',
  'medical data destruction',
  'financial data wiping',
  'banking data erasure',
  'government data destruction',
  'military data wiping',
  'education data erasure',
  'research data destruction',

  // Technical Keywords
  'data overwriting software',
  'multiple pass wiping',
  'secure erase algorithm',
  'data sanitization method',
  'wipe cycle technology',
  'erasure verification',
  'destruction regulatory document',
  'audit trail erasure',
  'compliance reporting',

  // Software Features
  'automated data erasure',
  'scheduled data wiping',
  'batch data destruction',
  'remote data erasure',
  'network data wiping',
  'cloud data erasure',
  'virtual machine wiping',
  'multiple drive erasure',

  // Business Benefits
  'cost-effective data destruction',
  'time-saving data erasure',
  'efficient data wiping',
  'reliable data sanitization',
  'scalable data destruction',
  'flexible erasure solution',
  'easy-to-use data wiping',
  'user-friendly erasure tool',

  // Additional Security
  'cybersecurity solution',
  'information security',
  'data breach prevention',
  'risk management tool',
  'compliance management',
  'regulatory compliance',
  'data security software',
  'information protection',

  // Brand Variations
  'D-Secure',
  'D-secure',
  'iD-Secure',
  'dsecur',
  'D-Secured',
  ' erase',

  // Industry-Specific Solutions
  'data erasure solutions for enterprise',
  'data erasure solutions for government',
  'data erasure solutions for smb',
  'data erasure solutions for service providers',
  'data erasure solutions for itad',
  'data erasure solutions for individuals',

  // Cryptographic & Advanced Erasure Methods
  'ssd cryptographic erasure',
  'cryptographic erasure on ssd',
  'cryptographic erasure',
  'block erase',
  'zero pass erasure',
  'one pass zeros data destruction method',
  'multiple overwriting passes',
  'overwriting passes',

  // Secure Erasure Variants
  'secure data erase',
  'secure erasure',

  // Certification & Compliance
  'certified data erasure software',
  'certified data erasure services',
  'certified data erasure platforms windows macos integration',
  'certified data erasure solutions diagnostic features',
  'adisa-certified data erasure solutions providers',
  'adisa compliant data erasure providers mobile device certification',
  'certified data erasure providers android ios',
  'phone diagnostic software secure data erasure certification',
  'vendors certified data erasure diagnostic software repair technicians',

  // Automation & Scheduling
  'automate data erasure',
  'schedule data erasure',
  'schedule file erasure',

  // Server & Data Center
  'securely erase servers',
  'data erasure for data center',
  'erasure of data center loose drives',

  // Standards & Protocols
  'data erasure iso',
  'data erasure standards',
  'data erasure for compliance',
  'dod zero trust',
  'ieee 2883-2022',

  // Sanitization & Audit
  'data sanitization software',
  'tamper-proof audit trail data sanitisation',

  // Enterprise Solutions Expansion
  'enterprise data erasure software',
  'data erasure solutions',
  'data erasure solution market',

  // ITAD Services
  'secure itad services for it distributors',
  'secure itad services for military',

  // Data Wiping & Certification
  'data wiping types',
  'data wipe software with certificate',
  'knowledge series for data destruction',

  // Banking & Financial
  'banking data integrity solutions',

  // Protocol & Technology Solutions
  'extreme protocol solutions',
  'secure data technologies',
  'secure processing solutions encrypted health data transmission medical devices',

  // File-Specific Erasure
  'file erasure',
  'secure erase llc',

  // Professional Services
  'accounting firm secure data wiping services',

  // API & Integration
  'are there certified data erasure services that provide api integration for custom workflows?',

  // Product Names & Competitors
  'tpr tec eraser enterprise',
  'BitRaser',
  'Data Eraser Software',
  'Drive Eraser',

  // Wiping & Erasure Methods
  'Mobile Wiping',
  'File Erasure',
  'Data Wiping',
  'Secure Erasure',
  'HDD Wiping',
  'SSD Wiping',
  'Mac Erasure',
  'Chromebook Eraser',

  // Compliance Standards Extended
  'NIST 800-88',
  'DoD Standard',
  'R2v3 Compliance',
  'GDPR Data Wiping',
  'HIPAA Compliance',

  // ITAD & Bulk Operations
  'ITAD Software',
  'Bulk Drive Erasure',
  'Remote Wiping',

  // Diagnostics & Verification
  'Hardware Diagnostics',
  'Data Sanitization',
  'Erasure Verification',
  'Certified Data Erasure',

  // Diagram & Visualization Tools
  'Eraser.io',
  'Eraser',
  'DiagramGPT',
  'AI Diagrams',
  'AI Diagram Tool',
  'AI Diagram Generator',
  'Text to Diagram',
  'Prompt to Diagram',
  'Auto Diagram Generator',
  'Auto Diagram Creation',

  // Architecture Diagrams
  'Architecture Diagrams',
  'System Architecture Diagram',
  'Software Architecture Diagram',
  'Cloud Architecture Diagram',
  'AWS Architecture Diagram',
  'Azure Architecture Diagram',
  'GCP Architecture Diagram',
  'Microservices Architecture',
  'Microservices Architecture Diagram',
  'Distributed Systems Diagram',
  'Distributed System Diagram',

  // Sequence & ER Diagrams
  'Sequence Diagrams',
  'ER Diagrams',
  'Entity Relationship Diagram',
  'Database Design Diagram',
  'Database Diagram',
  'Schema Diagram',

  // UML & Flow Diagrams
  'UML Diagrams',
  'Class Diagram',
  'Component Diagram',
  'Flowcharts',
  'Process Flow Diagram',
  'Workflow Diagram',

  // Diagram as Code
  'Diagram as Code',
  'Diagram-as-Code',
  'Markdown Diagrams',
  'Markdown to Diagram',
  'Code Based Diagrams',
  'Text Based Diagrams',
  'Infrastructure as Code Diagrams',

  // Engineering & Technical Documentation
  'Engineering Documentation',
  'Technical Documentation',
  'Software Documentation Tool',
  'System Design Documentation',
  'Technical Design',
  'Technical Design Tool',
  'Engineering Notes',

  // Design & Architecture Tools
  'System Design Tool',
  'Software Design Tool',
  'Software Architecture Tool',
  'Architecture Design Tool',

  // AI Assistants
  'Eraserbot',
  'AI Assistant for Diagrams',
  'AI for System Design',
  'AI for Architecture',
  'AI for Software Architecture',
  'AI Documentation Assistant',

  // Code Visualization
  'Codebase Visualization',
  'Code Architecture Visualization',
  'Repository Visualization',
  'Project Structure Diagram',
  'Code to Diagram',

  // GitHub Integration
  'GitHub Integration',
  'GitHub Sync',
  'GitHub Diagram Generator',
  'GitHub Documentation Tool',
  'GitHub Documentation',
  'GitHub Diagram Tool',

  // VS Code & Developer Tools
  'VS Code Extension',
  'VS Code Diagram Tool',
  'Developer Tools',
  'Developer Productivity Tool',

  // Collaboration Tools
  'Collaboration Tool for Engineers',
  'Team Documentation Tool',
  'Design Collaboration',
  'Real-time Collaboration',
  'Team Collaboration Tool',
  'Engineering Collaboration',
  'Shared Diagrams',

  // Cloud & Infrastructure
  'Cloud Architecture',
  'Cloud Infrastructure Visualization',

  // DevOps & CI/CD
  'DevOps Diagrams',
  'CI/CD Pipeline Diagram',
  'Infrastructure Diagram',

  // Enterprise & Planning
  'Startup Engineering Tool',
  'Enterprise Architecture Tool',
  'Technical Planning Tool',
  'System Planning Tool',
  'Product Design Tool',

  // Heidi Eraser & AI Writing Tools
  'Heidi Eraser',
  'Heidi AI',
  'Heidi Eraser Tool',
  'AI Writing Tool',
  'AI Text Editor',
  'AI Note Cleaner',
  'AI Content Refiner',
  'AI Text Eraser',
  'Remove Filler Words',
  'Remove Repetition',
  'Remove Redundancy',
  'Clean Writing Tool',
  'Text Cleanup Tool',
  'Sentence Simplifier',
  'Clarity Improvement Tool',
  'Rewrite Text',
  'Rephrase Sentences',
  'Paraphrasing Tool',
  'Sentence Rewriter',
  'Content Polishing Tool',
  'AI Editing Tool',
  'Grammar Improvement Tool',
  'Readability Improvement',
  'Clear Writing Assistant',
  'Medical Documentation Tool',
  'Clinical Notes Editor',
  'Doctor Notes Cleaner',
  'Healthcare Documentation AI',
  'Medical Writing Assistant',
  'Meeting Notes Cleaner',
  'Transcription Cleanup Tool',
  'AI for Notes Editing',
  'AI for Summaries',
  'Productivity Tool',
  'Professional Writing Tool',
  'Academic Writing Tool',
  'Research Notes Cleaner',
  'Web-based AI Tool',
  'Online Text Editor',
  'Browser-based AI Tool',
  'Privacy-focused AI Tool',
  'Secure AI Writing Tool',
  'No Data Storage AI Tool',
  'Minimal UI AI Tool',
  'Fast AI Text Processing',
  'Lightweight AI Tool',
  'Natural Language Processing Tool',
  'NLP-based Text Editing',
  'AI Language Model Tool',
  'Content Optimization Tool',
  'Clear Communication Tool',
  'Effective Writing Tool',

  // Blancco - Industry Leader Keywords
  'Blancco',
  'Blancco Technology Group',
  'Blancco Data Erasure',
  'Blancco Data Sanitization',
  'Blancco Secure Erasure',
  'Blancco Certified Data Erasure',
  'Blancco Drive Eraser',
  'Blancco File Eraser',
  'Blancco Mobile Eraser',
  'Blancco Cloud Eraser',
  'Blancco Network Eraser',
  'Blancco Removable Media Eraser',
  'Blancco Virtual Machine Eraser',
  'Permanent Data Deletion',
  'End-of-Life Data Erasure',
  'Data Beyond Recovery',
  'NVMe Data Wipe',
  'Laptop Data Wipe',
  'PC Data Wipe',
  'Desktop Data Erasure',
  'Server Data Erasure',
  'Mac Data Erasure',
  'Windows Data Wipe',
  'Linux Data Erasure',
  'iPhone Data Wipe',
  'Android Data Wipe',
  'Tablet Data Erasure',
  'Folder Erasure',
  'Sensitive Data Removal',
  'Confidential Data Wipe',
  'IT Asset Disposition',
  'ITAD Data Erasure',
  'Device Lifecycle Management',
  'Asset Reuse Enablement',
  'Sustainable IT Solutions',
  'Circular Economy IT',
  'Cloud Data Erasure',
  'Hybrid Environment Data Wipe',
  'On-Premise Data Erasure',
  'Remote Data Erasure',
  'Offline Data Wiping',
  'Compliance Ready Data Erasure',
  'Audit-Ready Reports',
  'Certificate of Data Erasure',
  'Tamper-Proof Erasure Reports',
  'Data Erasure Verification',
  'CCPA Compliance',
  'NIST 800-53',
  'PCI-DSS',
  'SOX Compliance',
  'GLBA Compliance',
  'Data Protection Regulations',
  'Enterprise Data Security',
  'Government Data Erasure',
  'Defense & Public Sector Data Security',
  'Healthcare Data Protection',
  'Banking & Financial Data Security',
  'Telecom Data Erasure',
  'Education Sector Data Erasure',
  'Automation Data Erasure',
  'Scalable Data Erasure Solution',
  'Centralized Erasure Management',
  'API Integration',
  'Asset Management Integration',
  'ERP Integration',
  'Managed Service Provider Data Erasure',
  'Global Data Erasure Solution',
  'Multinational Compliance Solution',
  'Data Risk Mitigation',
  'Information Security Management',
  'Cybersecurity Data Erasure',
  'Product Datasheets',
  'Case Studies',
  'Whitepapers',
  'Compliance Guides',

  // SayMine & Privacy Tools
  'SayMine',
  'Mine Privacy',
  'Mine App',
  'Mine Privacy Protection',
  'Digital Privacy Platform',
  'Personal Data Removal Tool',
  'Personal Data Cleanup',
  'Delete Personal Data',
  'Data Privacy Management',
  'Privacy Automation Tool',
  'Automated Privacy Requests',
  'Automated Data Deletion',
  'Data Deletion Requests',
  'Opt-Out Automation',
  'GDPR Data Removal',
  'CCPA Data Removal',
  'Privacy Compliance Tool',
  'Data Subject Access Requests',
  'DSAR Automation',
  'Right to be Forgotten',
  'Personal Information Removal',
  'PII Removal Tool',
  'Sensitive Data Cleanup',
  'Online Privacy Protection',
  'Email Privacy Scanner',
  'Inbox Data Scan',
  'Digital Footprint Scanner',
  'Find Where Your Data Is Stored',
  'Third-Party Data Removal',
  'Remove Data from Companies',
  'Unsubscribe from Data Brokers',
  'Data Broker Removal Tool',
  'Privacy Dashboard',
  'Privacy Control Center',
  'Consent Management Tool',
  'Privacy Monitoring Tool',
  'Consumer Privacy Tool',
  'Individual Privacy Protection',
  'Family Privacy Protection',
  'Business Privacy Solutions',
  'Enterprise Privacy Management',
  'Privacy for Employees',
  'Cybersecurity Privacy Tool',
  'Identity Protection Tool',
  'Data Exposure Reduction',
  'Cloud-Based Privacy Platform',
  'Web-Based Privacy Tool',
  'AI-Powered Privacy Automation',
  'Privacy Reports',
  'Privacy Insights',
  'Privacy Risk Assessment',
  'Digital Safety Tool',
  'Online Data Control',
  'Trust & Transparency Tool',

  // Eraser for Windows - Open Source
  'Eraser for Windows',
  'Eraser Software',
  'Eraser SourceForge',
  'Open Source Data Eraser',
  'Free Data Erasure Tool',
  'Secure File Deletion',
  'Secure Data Deletion',
  'Permanent File Deletion',
  'Permanent Data Removal',
  'Disk Eraser',
  'Drive Wiping Tool',
  'Free Space Wipe',
  'Hard Drive Data Wipe',
  'USB Drive Eraser',
  'External Drive Data Erasure',
  'Delete Sensitive Files',
  'Delete Confidential Data',
  'Privacy Protection Tool',
  'Windows Data Wipe',
  'Windows Privacy Tool',
  'Windows Security Tool',
  'File Shredding Tool',
  'File Shredder',
  'Disk Shredder',
  'Scheduling Data Erasure',
  'Scheduled File Deletion',
  'Background Data Wipe',
  'Multiple Data Erasure Methods',
  'Custom Erasure Methods',
  'DoD 5220.22-M',
  'Gutmann Method',
  'Random Data Overwrite',
  'US Air Force Erasure Standard',
  'Right Click Erase',
  'Shell Integration',
  'Context Menu Erase',
  'Command Line Data Erasure',
  'CLI Eraser Tool',
  'Open Source Security Tool',
  'Community Supported Software',
  'Data Sanitization Tool',
  'Secure Delete Utility',
  'IT Privacy Tool',
  'Personal Data Protection Tool',

  // DeleteMe Privacy Service
  'DeleteMe',
  'JoinDeleteMe',
  'DeleteMe Privacy',
  'DeleteMe Data Removal Service',
  'Personal Data Removal Service',
  'Data Broker Removal',
  'Data Broker Opt-Out',
  'Remove Data from Data Brokers',
  'Data Aggregator Removal',
  'PII Removal Service',
  'Personally Identifiable Information Removal',
  'Identity Protection Service',
  'Identity Theft Prevention',
  'Online Identity Protection',
  'Privacy Compliance Service',
  'Right to be Forgotten Service',
  'Automated Data Removal',
  'Manual Data Removal Requests',
  'Privacy Request Management',
  'Search Engine Data Removal',
  'People Search Site Removal',
  'Background Check Site Removal',
  'Ongoing Privacy Monitoring',
  'Continuous Data Removal',
  'Privacy Monitoring Service',
  'Executive Privacy Protection',
  'Employee Data Protection',
  'Cybersecurity Privacy Service',
  'Digital Footprint Reduction',
  'Online Exposure Reduction',
  'Data Removal Reports',
  'Privacy Status Dashboard',
  'Subscription Privacy Service',
  'Premium Privacy Protection',
  'Trust & Safety Tool',
  'Online Safety Service',

  // Stellar & BitRaser
  'Stellar Data Eraser Software',
  'Stellar BitRaser',
  'BitRaser Data Eraser',
  'BitRaser Data Erasure Software',
  'Secure Data Eraser',
  'Certified Data Erasure Tool',
  'DIY Data Eraser Software',
  'Permanent Data Wipe Software',
  'Wipe Data Permanently',
  'Erase Data Beyond Recovery',
  'Certified Data Wiping Software',
  'Tamper Proof Erasure Reports',
  'Audit Trail Reports',
  'Drive Eraser Software',
  'File Eraser Software',
  'Mobile Eraser Software',
  'Drive & File Data Eraser',
  'Bulk Drive Eraser',
  'Mobile Wiping & Diagnostics',
  'iOS Device Erasure',
  'Android Device Erasure',
  'Mobile Diagnostics Tool',
  'Certified Mobile Eraser',
  'Cloud Integration for Data Erasure',
  'Central Cloud Console',
  'Cloud-based Erasure Reports',
  'License Management Console',
  'International Data Erasure Standards',
  'NIST 800-88 Compliance',
  'DoD 5220.22-M Erasure',
  'HMG Data Erasure Standard',
  'Global Erasure Standards',
  'Scalable Data Erasure Software',
  'Manageable Data Erasure Solution',
  'Cost Effective Data Eraser',
  'Data Storage Device Wipe',
  'Device Lifecycle Data Wipe',
  'Network Data Erasure',
  'Erasure Over LAN',
  'Admin Console for Erasure',
  'PXE Network Erase Support',
  'Certified Erasure Certificate',
  'Certificate of Erasure',
  'Audit Compliance Reports',
  'PDF Erasure Report',
  'CSV Erasure Report',
  'XML Erasure Report',
  'International Compliance Data Erasure',
  'IT Asset Disposal Tool',
  'ITAD Data Erasure Solution',
  'Enterprise Data Erasure Software',
  'Storage Media Support',
  'SATA Erasure',
  'SCSI Erasure',
  'USB Erase',
  'NVMe Data Wipe',
  'M.2 Drive Wipe',
  'Secure Erasure Algorithms',
  'High Speed Data Erasure',
  'Multi-device Erasure',
  'Simultaneous Drive Erasure',
  'Data Security Software',
  'Data Protection Software',
  'Enterprise Data Security Solution',

  // CubexSoft Data Wipe
  'CubexSoft Data Wipe',
  'CubexSoft Data Wipe Software',
  'Data Wipe Tool',
  'Data Wipe Software',
  'Erase Data from Hard Drive',
  'Erase All Data',
  'Data Wipe for Windows',
  'HDD Data Wipe',
  'SSD Data Wipe',
  'USB Drive Data Wipe',
  'External Drive Wipe',
  'Portable Drive Erase',
  'Desktop Data Wipe',
  'Server Data Wipe',
  'Delete Files Permanently',
  'Erase Files & Folders',
  'Folder Wipe',
  'File Wipe',
  'Remove Sensitive Files',
  'Remove Confidential Data',
  'Complete Data Wipe',
  'Full Drive Erasure',
  'Secure Drive Clean',
  'No Data Recovery',
  'Wipe Free Space',
  'Clean Free Space',
  'Secure Space Wipe',
  'Remove Residual Data',
  'Quick Data Wipe',
  'Fast Data Eraser',
  'Easy Data Wipe Tool',
  'User Friendly Data Wipe',
  'Windows Compatible Data Wipe',
  'All Windows Versions Support',
  'Desktop & Laptop Wipe',
  'File Security Software',
  'One-Click Data Wipe',
  'Batch Data Wipe',
  'Multiple Drive Wipe',
  'Bulk Data Erase',
  'Partition Wipe',
  'Partition Data Erasure',
  'Format Drive Securely',
  'Erase Partition Data',
  'Data Erasure Solution',
  'Corporate Data Wipe',
  'Business Data Erase Tool',
  'Enterprise Data Wiping Solution',
  'Backup Data Removal',
  'Remove Old Backups',
  'Clean Backup Drive',
  'Secure Backup Erase',
  'Lifetime License Data Wipe',
  'Affordable Data Erasure Software',
  'Download Data Wipe Tool',
  'CubexSoft Tools',
  'CubexSoft Data Software',
  'CubexSoft Utilities',
  'Data Cleanup Software',
  'Secure File Wipe',
  'File & Folder Wipe',
  'Bulk File Removal',
  'Selective File Deletion',
  'Erase Sensitive Files',
  'Wipe Unwanted Files',
  'Hard Drive Data Wiping',
  'SSD Data Wiping',
  'Memory Card Data Wipe',
  'Pen Drive Data Wipe',
  'Windows File Eraser',
  'NTFS File Wipe',
  'FAT32 File Eraser',
  'Fast Data Wipe',
  'High Speed File Erasure',
  'Deep Data Wiping',
  'Advanced File Deletion',
  'Permanent File Erase Utility',
  'System Data Cleanup',
  'Free Up Disk Space',
  'Remove Junk Files',
  'Delete Temporary Files',
  'Erase Internet Files',
  'Browser Cache Wipe',
  'History Removal Tool',
  'Safe Disk Cleanup',
  'Secure Disk Utility',
  'Disk Cleanup Software',
  'User Friendly Data Wipe Tool',
  'Easy to Use Data Wipe Software',
  'Windows Compatible Wipe Tool',
  'File Removal for Privacy',
  'Sensitive Data Protection',
  'Batch File Erase',
  'Multiple File Wipe',
  'Bulk Data Removal',
  'Multi-File Eraser Tool',
  'Quick File Deletion',
  'Instant Data Wipe',
  'Offline Data Wipe',
  'Local System Data Erase',
  'Standalone Data Erasure Tool',
  'Data Wipe Utility for PC',
  'secure erase utility',
      'data cleaner software',
      'privacy protection tool',
      'file eraser D-Secure',
      'heady eraser',
      'remap ssd partition',
      'audit data sanitization',
      'D-Secure technology',
      'device sanitization',
  'System Optimization Tool',
  'Disk Space Reclaim Tool',
  
];

// Generate canonical URL
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.baseUrl}${cleanPath}`;
};

// Generate keywords string
export const generateKeywords = (pageSpecificKeywords: string[] = []): string => {
  return [...BASE_KEYWORDS, ...pageSpecificKeywords].join(', ');
};

// Common structured data schemas
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "D-Secure Tech",
  "url": SEO_CONFIG.baseUrl,
  "logo": `${SEO_CONFIG.baseUrl}/logo-white.svg`,
  "description": "Leading provider of enterprise data erasure and sanitization solutions for GDPR, HIPAA, and compliance requirements.",
  "sameAs": [
    "https://linkedin.com/company/D-Securetech",
    "https://twitter.com/D-Securetech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-0123",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  }
});

export const generateSoftwareProductSchema = (productName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": productName,
  "description": description,
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "D-Secure Tech"
  }
});

// Default SEO metadata for all pages
export const getDefaultSEO = (): SEOMetadata => ({
  title: 'Eraser – Secure Erase Files from Hard Drives',
  description: 'Leading data erasure software for GDPR, HIPAA & compliance. Secure data destruction with NIST 800-88 regulation. Enterprise data sanitization solutions.',
  keywords: generateKeywords(),
  canonicalUrl: SEO_CONFIG.baseUrl,
  ogTitle: 'D-Secure Tech - Secure Data Erasure Solutions',
  ogDescription: 'Professional data erasure and sanitization software for enterprise compliance and security.',
  ogImage: SEO_CONFIG.defaultImage,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'D-Secure Tech - Data Erasure Solutions',
  twitterDescription: 'Secure data destruction and sanitization for enterprise compliance.',
  twitterImage: SEO_CONFIG.defaultImage,
  structuredData: generateOrganizationSchema()
});

// Page-specific SEO configurations with EXTENSIVE additional keywords
export const PAGE_SEO: Record<string, Partial<SEOMetadata>> = {
  home: {
    title: 'D-Secure Tech - Enterprise Data Erasure & Sanitization Software',
    description: 'Professional data erasure solutions for GDPR, HIPAA & compliance. Secure data destruction with NIST 800-88 regulation. Download free trial.',
    keywords: generateKeywords([
      'data erasure software download',
      'free data destruction tool',
      'enterprise data wiping',
      'technology',
      'technologies',
      'D-Secure technology',
      'D-secure technology',
      'compliance data erasure',
      'secure data erasure download',
      'file eraser',
      'data eraser',
      'data wiping tool',
      'data erasure tool',
      'data erasure software',
      'data erasure utility',
      'data erasure application',
      'data erasure service',
      'data erasure provider',
      'data erasure company',
      'free trial data wiping',
      'data sanitization software free',
      'professional data destruction tool',
      'enterprise grade erasure software',
      'business data erasure solution',
      'D-Secure Tech',
      'D-Secure Tech',
      'data sanitization',
      'secure data deletion',
      'permanent data removal',
      'GDPR compliant erasure',
      'HIPAA data wiping',
      'NIST 800-88 software',
      'DoD data erasure',
      'certified data destruction',
      'secure wipe software',
      'hard drive eraser',
      'SSD data wipe',
      'data shredding software',
      'disk wiping tool',
      'secure erase utility',
      'data cleaner software',
      'privacy protection tool',
      'file eraser D-Secure',
      'heady eraser',
      'remap ssd partition',
      'audit data sanitization',
      'D-Secure technology',
      'device sanitization'
    ]),
    canonicalUrl: getCanonicalUrl('/'),
  },

  services: {
    title: 'Data Erasure Services - Secure Data Destruction | D-Secure Tech',
    description: 'Comprehensive data erasure services including hard drive wiping, SSD sanitization, and regulated data destruction for enterprise compliance.',
    keywords: generateKeywords([
      'data erasure services',
      'hard drive destruction',
      'SSD data wiping',
      'regulated data destruction',
      'on-site data erasure',
      'professional data wiping service',
      'managed data destruction',
      'data sanitization service',
      'regulated erasure service',
      'enterprise data erasure',
      'data destruction for compliance',
      'secure data erasure',
      'data erasure for business',
      'data erasure for enterprise',
      'data erasure for GDPR',
      'data erasure for HIPAA',
      'data erasure for compliance',
      'data erasure for NIST 800-88',
      'data erasure for ISO 27001',
      'data erasure for SOC 2',
      'data erasure for PCI DSS',
      'data erasure for DoD 5220.22-M',
      'off-site data wiping',
      'on-premise data wiping',
      'professional erasure services',
      'certified data destruction',
      'compliant data erasure',
      'IT asset disposal services',
      'ITAD services',
      'device disposal services',
      'storage erasure services',
      'server erasure services',
      'data center erasure',
      'mobile device erasure services',
      'cloud data erasure services',
      'network erasure services',
      'business data services',
      'enterprise destruction services',
      'secure disposal services',
      'wiping services',
      'sanitization consulting'
    ]),
    canonicalUrl: getCanonicalUrl('/services'),
  },

  solutions: {
    title: 'Enterprise Data Erasure Solutions - GDPR & HIPAA Compliance | D-Secure',
    description: 'Complete data sanitization solutions for enterprises. GDPR, HIPAA, and ISO 27001 compliant data erasure software and services.',
    keywords: generateKeywords([
      'enterprise data solutions',
      'GDPR compliance software',
      'HIPAA data erasure',
      'ISO 27001 data security',
      'enterprise data management',
      'data erasure for compliance',
      'data sanitization for GDPR',
      'data sanitization for HIPAA',
      'data sanitization for compliance',
      'data sanitization for NIST 800-88',
      'data sanitization for ISO 27001',
      'data sanitization for SOC 2',
      'data sanitization for PCI DSS',
      'data sanitization for DoD 5220.22-M',
      'corporate data erasure',
      'corporate data solutions',
      'business data security',
      'organization data management',
      'enterprise compliance solution',
      'business data protection',
      'industry solutions',
      'sector-specific solutions',
      'vertical solutions',
      'enterprise erasure solutions',
      'business erasure solutions',
      'complete data solutions',
      'end-to-end solutions',
      'comprehensive solutions',
      'integrated solutions',
      'tailored solutions',
      'custom solutions',
      'scalable solutions',
      'secure solutions',
      'compliant solutions'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions'),
  },

  about: {
    title: 'About D-Secure Tech - Data Erasure & Security Experts',
    description: 'Learn about D-Secure Tech, industry leaders in data erasure and sanitization solutions. Our mission to secure enterprise data worldwide.',
    keywords: generateKeywords([
      'data security company',
      'data erasure experts',
      'cybersecurity solutions',
      'data protection specialists',
      'data destruction company',
      'erasure technology experts',
      'security solution provider',
      'data protection company',
      'erasure software developer',
      'security technology firm',
      'about D-Secure',
      'company information',
      'who we are',
      'our mission',
      'our vision',
      'company profile',
      'about us',
      'company overview',
      'D-Secure Tech company',
      'data security leader',
      'industry leader erasure',
      'trusted data erasure',
      'company history',
      'our story',
      'our values',
      'corporate information',
      'enterprise data security company',
      'global data erasure provider',
      'leading erasure company',
      'certified data security'
    ]),
    canonicalUrl: getCanonicalUrl('/about'),
  },

  contact: {
    title: 'Contact D-Secure Tech - Data Erasure Support & Sales',
    description: 'Contact D-Secure Tech for data erasure solutions, technical support, and enterprise sales. Get expert help with data sanitization needs.',
    keywords: generateKeywords([
      'data erasure support',
      'contact data security experts',
      'enterprise sales',
      'technical support',
      'erasure software contact',
      'data destruction support',
      'customer service erasure',
      'technical assistance wiping',
      'sales consultation erasure',
      'support team data destruction',
      'contact D-Secure',
      'get in touch',
      'contact us',
      'reach out',
      'customer support contact',
      'sales contact',
      'support email',
      'contact form',
      'phone support',
      'email support',
      'live chat',
      'contact sales team',
      'speak to expert',
      'contact information',
      'help desk contact',
      'technical support contact',
      'customer service phone',
      'sales inquiry',
      'support ticket',
      'contact details'
    ]),
    canonicalUrl: getCanonicalUrl('/contact'),
  },

  support: {
    title: 'Support Center - Data Erasure Help & Resources | D-Secure Tech',
    description: 'Comprehensive support for D-Secure data erasure software. Find guides, documentation, and get technical assistance.',
    keywords: generateKeywords([
      'data erasure support',
      'technical documentation',
      'user guides',
      'software help',
      'erasure software support',
      'data destruction help',
      'technical assistance',
      'customer support erasure',
      'software documentation',
      'user manual data wiping',
      'help center',
      'support portal',
      'customer help',
      'technical help',
      'online support',
      'help desk',
      'support resources',
      'troubleshooting',
      'how to guides',
      'tutorials',
      'support articles',
      'knowledge center',
      'FAQ support',
      'help documentation',
      'user assistance',
      '24/7 support',
      'live support',
      'product support',
      'software assistance',
      'customer care'
    ]),
    canonicalUrl: getCanonicalUrl('/support'),
  },

  status: {
    title: 'System Status - D-Secure Tech Service Health Dashboard',
    description: 'Real-time status of D-Secure Tech services and infrastructure. Monitor uptime and performance of our data erasure solutions.',
    keywords: generateKeywords([
      'system status',
      'service uptime',
      'infrastructure monitoring',
      'service health dashboard',
      'erasure service status',
      'system monitoring',
      'service availability',
      'uptime monitoring',
      'performance dashboard',
      'service health check',
      'status page',
      'status dashboard',
      'service status',
      'real-time status',
      'uptime status',
      'server status',
      'API status',
      'system health',
      'service health',
      'availability status',
      'downtime monitoring',
      'incident status',
      'maintenance status',
      'system availability',
      'service monitoring',
      'live status',
      'status updates',
      'service incidents',
      'outage status',
      'operational status'
    ]),
    canonicalUrl: getCanonicalUrl('/status'),
  },

  pricing: {
    title: 'Pricing - Data Erasure Software Plans | D-Secure Tech',
    description: 'Flexible pricing for D-Secure Tech data erasure software. Enterprise licenses, volume discounts, and free trial available.',
    keywords: generateKeywords([
      'data erasure pricing',
      'software licensing',
      'enterprise plans',
      'volume discounts',
      'erasure software cost',
      'data destruction pricing',
      'license pricing erasure',
      'enterprise license cost',
      'software subscription pricing',
      'business plan pricing',
      'D-Secure pricing',
      'software price',
      'license cost',
      'pricing plans',
      'subscription plans',
      'enterprise pricing',
      'business pricing',
      'volume licensing',
      'bulk pricing',
      'annual license cost',
      'monthly subscription',
      'yearly pricing',
      'license packages',
      'pricing tiers',
      'affordable pricing',
      'competitive pricing',
      'license options',
      'pricing details',
      'cost calculator',
      'buy license'
    ]),
    canonicalUrl: getCanonicalUrl('/pricing'),
  },

  'order-success': {
    title: 'Order Confirmed - D-Secure Tech Purchase Complete',
    description: 'Review your confirmed D-Secure Tech order, access downloads, and find next steps for onboarding and support.',
    keywords: generateKeywords([
      'order confirmation',
      'purchase complete',
      'data erasure order summary',
      'license delivery timeline',
      'customer onboarding support',
      'download center access',
      'post purchase checklist',
      'order success page',
      'subscription confirmation',
      'enterprise order receipt'
    ]),
    canonicalUrl: getCanonicalUrl('/order-success'),
  },

  partners: {
    title: 'Partners - Join D-Secure Tech Partner Program',
    description: 'Become a D-Secure Tech partner. Reseller, integration, and technology partnership opportunities in data erasure market.',
    keywords: generateKeywords([
      'partner program',
      'reseller opportunities',
      'technology partnerships',
      'channel partners',
      'erasure software partners',
      'reseller program',
      'technology alliance',
      'channel partnership',
      'solution provider program',
      'integration partnership',
      'become a partner',
      'partner with us',
      'strategic partners',
      'technology partners',
      'business partners',
      'partnership opportunities',
      'partner ecosystem',
      'alliance program',
      'partner network',
      'value added reseller',
      'VAR program',
      'distributor program',
      'OEM partners',
      'integration partners',
      'referral partners',
      'strategic alliances',
      'partner benefits',
      'partner portal',
      'our partners',
      'trusted partners'
    ]),
    canonicalUrl: getCanonicalUrl('/partners'),
  },

  security: {
    title: 'Security & Compliance - NIST 800-88 & GDPR | D-Secure Tech',
    description: 'D-Secure Tech security standards and compliance regulations. NIST 800-88, GDPR, HIPAA, and ISO 27001 compliant data erasure.',
    keywords: generateKeywords([
      'security standards',
      'compliance regulations',
      'NIST 800-88 compliance',
      'security framework',
      'erasure security standards',
      'compliance framework',
      'security regulation',
      'regulatory standards',
      'compliance requirements',
      'security best practices',
      'data security',
      'information security',
      'cybersecurity',
      'security compliance',
      'ISO 27001',
      'GDPR compliance',
      'HIPAA compliance',
      'PCI DSS',
      'SOC 2',
      'DoD compliance',
      'security certifications',
      'compliance certifications',
      'security audit',
      'compliance audit',
      'security policy',
      'data protection',
      'privacy security',
      'enterprise security',
      'security measures',
      'compliance measures'
    ]),
    canonicalUrl: getCanonicalUrl('/security'),
  },

  // Resource and feature pages
  resources: {
    title: 'Resources - Data Erasure Guides & Documentation | D-Secure Tech',
    description: 'Comprehensive resources for data erasure including guides, whitepapers, compliance documents, and best practices.',
    keywords: generateKeywords([
      'data erasure resources',
      'compliance guides',
      'security documentation',
      'best practices',
      'erasure guides',
      'technical resources',
      'documentation library',
      'knowledge base',
      'educational resources',
      'learning materials',
      'resource center',
      'resource library',
      'download resources',
      'free resources',
      'technical guides',
      'how-to guides',
      'whitepapers',
      'case studies',
      'datasheets',
      'brochures',
      'ebooks',
      'webinars',
      'videos',
      'tutorials',
      'compliance resources',
      'training resources',
      'support resources',
      'help resources',
      'developer resources',
      'partner resources'
    ]),
    canonicalUrl: getCanonicalUrl('/resources'),
  },

  features: {
    title: 'Features - Data Erasure Software Capabilities | D-Secure Tech',
    description: 'Advanced features of D-Secure data erasure software including multi-platform support, compliance reporting, and enterprise management.',
    keywords: generateKeywords([
      'data erasure features',
      'software capabilities',
      'enterprise features',
      'compliance reporting',
      'erasure software features',
      'advanced capabilities',
      'software functionality',
      'enterprise capabilities',
      'feature set erasure',
      'software tools features',
      'product features',
      'key features',
      'feature list',
      'software features',
      'advanced features',
      'premium features',
      'core features',
      'feature overview',
      'feature highlights',
      'capabilities overview',
      'functionality',
      'feature benefits',
      'feature comparison',
      'all features',
      'complete features',
      'feature description',
      'technical features',
      'security features',
      'enterprise functions',
      'software tools'
    ]),
    canonicalUrl: getCanonicalUrl('/features'),
  },

  // Guide pages
  'file-eraser-guide': {
    title: 'File Eraser Guide - Secure File Deletion | D-Secure Tech',
    description: 'Complete guide to secure file deletion and erasure. Learn how to permanently delete files and folders with D-Secure.',
    keywords: generateKeywords([
      'file eraser guide',
      'secure file deletion',
      'permanent file removal',
      'file wiping',
      'secure file erasure',
      'file destruction guide',
      'permanent deletion tutorial',
      'secure erase files',
      'file sanitization guide',
      'secure delete tutorial',
      'how to delete files permanently',
      'file shredding guide',
      'secure file remover',
      'file wipe tutorial',
      'delete files securely',
      'file eraser manual',
      'secure file deletion software',
      'permanent file eraser',
      'file sanitization tutorial',
      'secure delete guide',
      'file destruction tutorial',
      'how to erase files',
      'file wiping tutorial',
      'secure file disposal',
      'file erase methods',
      'permanent file deletion',
      'file security guide',
      'secure file removal guide',
      'file erasure methods',
      'file deletion best practices'
    ]),
    canonicalUrl: getCanonicalUrl('/file-eraser-guide'),
  },

  'mac-erase-guide': {
    title: 'Mac Data Erasure Guide - Secure Mac Hard Drive Wiping',
    description: 'Step-by-step guide for securely erasing Mac hard drives and SSDs. Complete data destruction for macOS systems.',
    keywords: generateKeywords([
      'Mac data erasure',
      'macOS hard drive wiping',
      'Mac SSD erasure',
      'Apple computer data destruction',
      'macOS data wiping',
      'Apple data erasure',
      'Mac secure erase',
      'macOS sanitization',
      'Apple device wiping',
      'Mac data destruction guide',
      'how to erase Mac',
      'MacBook data wipe',
      'iMac data erasure',
      'Mac Pro data wipe',
      'macOS secure delete',
      'erase Mac hard drive',
      'wipe Mac SSD',
      'Mac factory reset secure',
      'macOS disk utility erase',
      'Apple secure erase',
      'Mac storage wipe',
      'macOS drive erasure',
      'erase MacBook Pro',
      'wipe iMac',
      'Mac data sanitization',
      'macOS permanent delete',
      'Apple device sanitization',
      'Mac hard drive wipe guide',
      'erase Mac before selling',
      'Mac data removal guide'
    ]),
    canonicalUrl: getCanonicalUrl('/mac-erase-guide'),
  },

  'overwrite-guide': {
    title: 'Data Overwrite Guide - Secure Data Destruction Methods',
    description: 'Comprehensive guide to data overwriting techniques and secure data destruction methods for various storage devices.',
    keywords: generateKeywords([
      'data overwrite guide',
      'secure data destruction',
      'overwriting methods',
      'data sanitization techniques',
      'secure overwrite methods',
      'data wiping techniques',
      'erasure algorithms guide',
      'secure deletion methods',
      'overwrite patterns guide',
      'data destruction techniques',
      'NIST overwrite method',
      'DoD overwrite standard',
      'Gutmann method',
      'overwrite passes',
      'multi-pass overwrite',
      'single-pass overwrite',
      'random overwrite',
      'zero-fill method',
      'data sanitization methods',
      'secure wipe patterns',
      'erasure standards guide',
      'overwrite algorithms',
      'data destruction standards',
      'secure overwrite guide',
      'overwrite verification',
      'compliant overwrite',
      'data wiping methods',
      'overwrite best practices',
      'secure erasure techniques',
      'certified overwrite methods'
    ]),
    canonicalUrl: getCanonicalUrl('/overwrite-guide'),
  },

  'ssd-cryptographic-erasure-guide': {
    title: 'SSD Cryptographic Erasure Guide - CryptoEraseSSD',
    description: 'Step-by-step cryptographic erasure guide for SSDs to meet enterprise security and compliance requirements.',
    keywords: generateKeywords([
      'SSD cryptographic erase',
      'crypto erase guide',
      'secure SSD erasure',
      'enterprise SSD wiping',
      'NIST SSD erasure',
      'cryptographic sanitization',
      'fast SSD wiping',
      'data destruction SSD',
      'compliant SSD erasure',
      'secure wipe solid state drive',
      'SSD crypto erase',
      'instant SSD erase',
      'cryptographic wipe',
      'SSD encryption erase',
      'secure erase SSD',
      'ATA secure erase',
      'NVMe secure erase',
      'SSD sanitization guide',
      'crypto erasure method',
      'SSD fast wipe',
      'enterprise SSD sanitization',
      'SSD compliance erasure',
      'cryptographic destruction',
      'SSD security erase',
      'instant secure erase SSD',
      'SSD data sanitization',
      'crypto erase SSD tutorial',
      'SSD erasure standards',
      'NIST crypto erase',
      'SSD wipe guide'
    ]),
    canonicalUrl: getCanonicalUrl('/support/ssd-cryptographic-erasure-guide'),
  },

  'cloud-console-guide': {
    title: 'Cloud Console Guide - Remote Data Erasure Management',
    description: 'Learn to use D-Secure cloud console for remote data erasure management and enterprise deployment.',
    keywords: generateKeywords([
      'cloud console guide',
      'remote data erasure',
      'enterprise management',
      'cloud deployment',
      'remote management console',
      'cloud-based erasure',
      'enterprise console guide',
      'remote wiping management',
      'cloud administration guide',
      'remote deployment console',
      'cloud console tutorial',
      'remote erasure management',
      'cloud management platform',
      'enterprise cloud console',
      'remote administration',
      'cloud-based management',
      'centralized erasure management',
      'cloud platform guide',
      'remote console access',
      'cloud dashboard guide',
      'enterprise deployment guide',
      'cloud console features',
      'remote wipe management',
      'cloud administration',
      'management console guide',
      'cloud erasure platform',
      'remote management guide',
      'centralized console',
      'cloud management guide',
      'enterprise remote management'
    ]),
    canonicalUrl: getCanonicalUrl('/cloud-console-guide'),
  },

  'secure-erase-hdd-ssd': {
    title: 'HDD & SSD Secure Erase Guide - Hard Drive Data Destruction',
    description: 'Complete guide to securely erasing HDDs and SSDs. Hardware-based and software-based data destruction methods.',
    keywords: generateKeywords([
      'HDD secure erase',
      'SSD data destruction',
      'hard drive wiping',
      'storage device erasure',
      'hard disk secure erase',
      'SSD secure wiping',
      'storage device destruction',
      'drive erasure guide',
      'hardware-based erasure',
      'storage media wiping',
      'how to erase hard drive',
      'how to wipe SSD',
      'secure delete hard drive',
      'erase SSD completely',
      'hard drive sanitization',
      'SSD sanitization guide',
      'drive wipe tutorial',
      'storage erasure methods',
      'secure erase guide',
      'HDD wipe guide',
      'SSD erase guide',
      'disk erasure tutorial',
      'storage wipe methods',
      'hard drive destruction guide',
      'SSD destruction guide',
      'drive sanitization guide',
      'secure storage wipe',
      'erase storage device',
      'storage media sanitization',
      'complete drive erasure'
    ]),
    canonicalUrl: getCanonicalUrl('/secure-erase-hdd-ssd'),
  },

  // Legal and policy pages
  'privacy-policy': {
    title: 'Privacy Policy - D-Secure Tech Data Protection Commitment',
    description: 'D-Secure Tech privacy policy outlining our commitment to protecting your personal data and privacy rights.',
    keywords: generateKeywords([
      'privacy policy',
      'data protection',
      'personal information',
      'privacy rights',
      'data privacy policy',
      'information protection',
      'privacy commitment',
      'data security policy',
      'personal data protection',
      'privacy guidelines',
      'GDPR privacy policy',
      'privacy statement',
      'data collection policy',
      'user privacy',
      'privacy practices',
      'information security',
      'privacy compliance',
      'data handling policy',
      'privacy terms',
      'confidentiality policy',
      'privacy notice',
      'data usage policy',
      'privacy disclosure',
      'personal information protection',
      'privacy regulations',
      'data protection policy',
      'privacy rights protection',
      'user data policy',
      'privacy framework',
      'data privacy compliance'
    ]),
    canonicalUrl: getCanonicalUrl('/privacy-policy'),
  },

  'terms-of-service': {
    title: 'Terms of Service - D-Secure Tech Software License Agreement',
    description: 'Terms of service and software license agreement for D-Secure Tech data erasure software and services.',
    keywords: generateKeywords([
      'terms of service',
      'software license',
      'service agreement',
      'usage terms',
      'license agreement',
      'software terms',
      'service terms',
      'user agreement',
      'legal terms',
      'software license terms',
      'terms and conditions',
      'TOS',
      'EULA',
      'end user license agreement',
      'service conditions',
      'usage agreement',
      'legal agreement',
      'software EULA',
      'license terms',
      'terms of use',
      'service license',
      'user terms',
      'acceptable use policy',
      'software agreement',
      'licensing terms',
      'service contract',
      'user license',
      'legal notice',
      'terms document',
      'service policy'
    ]),
    canonicalUrl: getCanonicalUrl('/terms-of-service'),
  },

  'cookie-policy': {
    title: 'Cookie Policy - D-Secure Tech Website Cookie Usage',
    description: 'Information about how D-Secure Tech uses cookies on our website to improve user experience and analytics.',
    keywords: generateKeywords([
      'cookie policy',
      'website cookies',
      'tracking policy',
      'user privacy',
      'cookie usage policy',
      'website tracking',
      'privacy cookies',
      'cookie management',
      'tracking cookies',
      'cookie consent'
    ]),
    canonicalUrl: getCanonicalUrl('/cookie-policy'),
  },

  'legal-policy': {
    title: 'Legal Information - D-Secure Tech Compliance & Regulations',
    description: 'Legal information about D-Secure Tech compliance with data protection regulations and industry standards.',
    keywords: generateKeywords([
      'legal information',
      'compliance regulations',
      'data protection laws',
      'industry standards',
      'regulatory compliance',
      'legal compliance',
      'industry regulations',
      'compliance information',
      'legal standards',
      'regulatory information'
    ]),
    canonicalUrl: getCanonicalUrl('/legal-policy'),
  },

  // Payment and plan pages
  'payment': {
    title: 'Payment - Secure Checkout for D-Secure Tech Software',
    description: 'Secure payment processing for D-Secure Tech data erasure software licenses and enterprise plans.',
    keywords: generateKeywords([
      'secure payment',
      'software purchase',
      'license payment',
      'enterprise pricing',
      'payment processing',
      'software checkout',
      'license purchase',
      'secure checkout',
      'payment gateway',
      'software licensing payment'
    ]),
    canonicalUrl: getCanonicalUrl('/payment'),
  },

  'checkout': {
    title: 'Secure Checkout - Complete Your D-Secure Tech Purchase',
    description: 'Finalize your D-Secure Tech software purchase with secure payment, order review, and customer details.',
    keywords: generateKeywords([
      'secure checkout',
      'software purchase',
      'order payment',
      'license checkout',
      'payment review',
      'order confirmation step',
      'billing information form',
      'checkout process',
      'online payment',
      'software order review'
    ]),
    canonicalUrl: getCanonicalUrl('/checkout'),
  },





  // Utility pages
  'not-found': {
    title: 'Page Not Found - D-Secure Tech',
    description: 'The requested page could not be found. Return to D-Secure Tech homepage or browse our data erasure solutions.',
    keywords: generateKeywords([
      '404 error',
      'page not found',
      'missing page',
      'error page',
      'page unavailable',
      'broken link',
      'missing content',
      'page error',
      'URL not found',
      'dead link'
    ]),
    canonicalUrl: getCanonicalUrl('/404'),
  },

  'diagnostics': {
    title: 'Diagnostics - System Health Check | D-Secure Tech',
    description: 'Run system diagnostics and health checks for D-Secure Tech data erasure software and hardware compatibility.',
    keywords: generateKeywords([
      'system diagnostics',
      'health check',
      'compatibility test',
      'system requirements',
      'diagnostic tool',
      'system health',
      'compatibility check',
      'system verification',
      'hardware diagnostics',
      'software diagnostics'
    ]),
    canonicalUrl: getCanonicalUrl('/diagnostics'),
  },

  'api-test': {
    title: 'API Test Dashboard - D-Secure Tech Integration Tools',
    description: 'Monitor API availability, sample data, and integration health for D-Secure Tech services in real time.',
    keywords: generateKeywords([
      'API test dashboard',
      'integration diagnostics',
      'API status monitor',
      'developer tools',
      'API connectivity test',
      'system integration check',
      'service availability monitor',
      'API troubleshooting',
      'development utilities',
      'API health status'
    ]),
    canonicalUrl: getCanonicalUrl('/api-test'),
  },

  'compliance': {
    title: 'Compliance Center - Data Erasure Standards | D-Secure Tech',
    description: 'Comprehensive compliance information for data erasure standards including NIST, ISO, GDPR, HIPAA, and industry regulations.',
    keywords: generateKeywords([
      'compliance center',
      'data erasure standards',
      'regulatory compliance',
      'regulation requirements',
      'compliance information',
      'regulatory standards',
      'regulation center',
      'compliance guidelines',
      'industry compliance',
      'regulatory requirements',
      'NIST compliance',
      'ISO compliance',
      'GDPR compliance',
      'HIPAA compliance',
      'PCI DSS compliance',
      'SOX compliance',
      'DoD compliance',
      'FERPA compliance',
      'compliance management',
      'compliance framework',
      'compliance certification',
      'compliance standards',
      'regulatory framework',
      'compliance documentation',
      'audit compliance',
      'compliance portal',
      'regulatory audit',
      'compliance tools',
      'compliance reporting',
      'compliance validation'
    ]),
    canonicalUrl: getCanonicalUrl('/compliance'),
  },

  'icon-showcase': {
    title: 'Icon Showcase - D-Secure Tech Design Assets',
    description: 'Preview the FlatIcons set used across D-Secure Tech for consistent UI and branding elements.',
    keywords: generateKeywords([
      'icon showcase',
      'UI icon set',
      'FlatIcons gallery',
      'design assets',
      'brand icons',
      'interface icons',
      'icon preview',
      'design system icons',
      'product iconography',
      'UI component icons'
    ]),
    canonicalUrl: getCanonicalUrl('/icon-showcase'),
  },

  'healthcare-solutions': {
    title: 'Healthcare Data Security Solutions - HIPAA Compliant | D-Secure Tech',
    description: 'HIPAA-compliant data erasure solutions for healthcare organizations. Secure patient data destruction and medical device sanitization.',
    keywords: generateKeywords([
      'healthcare data security',
      'HIPAA compliant erasure',
      'medical data destruction',
      'patient data protection',
      'healthcare data erasure',
      'medical device sanitization',
      'PHI data destruction',
      'healthcare compliance',
      'medical data wiping',
      'hospital data security',
      'healthcare IT security',
      'medical records erasure',
      'patient information security',
      'healthcare data protection',
      'medical compliance software',
      'hospital IT security',
      'clinical data erasure',
      'healthcare device wiping',
      'medical facility security',
      'health system compliance',
      'EMR data erasure',
      'EHR security',
      'medical practice security',
      'healthcare sector erasure',
      'patient privacy compliance',
      'medical device disposal',
      'healthcare asset management',
      'hospital device sanitization',
      'medical IT compliance',
      'healthcare data sanitization'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/healthcare'),
  },

  'login': {
    title: 'Login - D-Secure Tech | Data Erasure Management Platform',
    description: 'Login to your D-Secure Tech account to manage data erasure tasks, view compliance reports, and ensure enterprise security.',
    keywords: generateKeywords([
      'D-Secure login',
      'account login',
      'user dashboard',
      'erasure management',
      'compliance portal',
      'secure login',
      'enterprise access',
      'client portal',
      'erasure reports login',
      'management console',
      'sign in D-Secure',
      'user login',
      'customer portal login',
      'account access',
      'login dashboard',
      'secure sign in',
      'user authentication',
      'member login',
      'client login',
      'enterprise login',
      'business account login',
      'admin login',
      'user portal access',
      'login to account',
      'account sign in',
      'customer login portal',
      'data erasure login',
      'compliance dashboard login',
      'management platform login',
      'secure authentication'
    ]),
    canonicalUrl: getCanonicalUrl('/login'),
  },

  'register': {
    title: 'Create Account | D-Secure Tech - Secure Data Erasure Solutions',
    description: 'Create your D-Secure Tech account to access professional data erasure solutions. Join thousands of enterprises securing their data with compliant erasure.',
    keywords: generateKeywords([
      'D-Secure register',
      'create account',
      'data erasure signup',
      'enterprise data security',
      'secure erasure account',
      'signup form',
      'new user registration',
      'get started',
      'enterprise account',
      'compliance platform signup',
      'sign up D-Secure',
      'register account',
      'join D-Secure',
      'create D-Secure account',
      'new account registration',
      'account signup',
      'register now',
      'free account creation',
      'D-Secure signup',
      'register for free',
      'account creation form',
      'sign up now',
      'create new account',
      'register free account',
      'enterprise signup',
      'business account registration',
      'professional account signup',
      'secure account creation',
      'data erasure account',
      'compliance account signup'
    ]),
    canonicalUrl: getCanonicalUrl('/register'),
  },

  'cloud-erasure': {
    title: 'Cloud Erasure Service | Multi-Cloud Data Protection',
    description: 'Comprehensive cloud erasure service for AWS, Azure, GCP, and SaaS applications. Secure cloud data removal with blockchain verification.',
    keywords: generateKeywords([
      'cloud erasure',
      'cloud data removal',
      'AWS data sanitization',
      'Azure data deletion',
      'GCP data protection',
      'SaaS data erasure',
      'multi-cloud erasure',
      'cloud storage wiping',
      'virtual machine erasure',
      'cloud compliance'
    ]),
    canonicalUrl: getCanonicalUrl('/services/cloud-erasure'),
  },

  'pricing-and-plan': {
    title: 'Pricing & Plans - D-Secure Data Erasure Software | Professional Licenses',
    description: 'Choose the perfect D-Secure data erasure license plan. Drive Eraser, Admin Console, Mobile Eraser & File Eraser. Volume discounts available. Free shipping worldwide.',
    keywords: generateKeywords([
      'data erasure pricing',
      'secure delete software cost',
      'NIST compliant erasure license',
      'enterprise data wiping plans',
      'drive eraser price',
      'license cost',
      'volume licensing',
      'enterprise pricing'
    ]),
    canonicalUrl: getCanonicalUrl('/pricing-and-plan'),
  },

  'payment-setup': {
    title: 'Payment & License Setup | D-Secure Tech - Complete Your Setup',
    description: 'Complete your D-Secure Tech payment and license setup. Configure billing details and license requirements to access all data erasure features.',
    keywords: generateKeywords([
      'D-Secure payment setup',
      'license configuration',
      'billing setup',
      'enterprise license',
      'data erasure license',
      'payment portal',
      'checkout configuration',
      'license activation'
    ]),
    canonicalUrl: getCanonicalUrl('/payment'),
  },

  // Services - Device Erasure
  'device-erasure': {
    title: 'Device Erasure - Secure Hard Drive & SSD Wiping | D-Secure Tech',
    description: 'Professional device erasure solutions for HDDs, SSDs, laptops, and desktops. NIST 800-88 compliant secure data destruction.',
    keywords: generateKeywords([
      'device erasure',
      'hard drive wiping',
      'SSD erasure',
      'laptop data wipe',
      'desktop erasure',
      'secure device wiping',
      'hardware data destruction',
      'device sanitization',
      'storage device erasure',
      'NIST device wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/services/device-erasure'),
  },

  // Services - Network Erasure
  'network-erasure': {
    title: 'Network Erasure - Remote Data Wiping Solutions | D-Secure Tech',
    description: 'Enterprise network erasure solutions for remote data wiping across multiple devices. Centralized management and compliance reporting.',
    keywords: generateKeywords([
      'network erasure',
      'remote data wiping',
      'LAN erasure',
      'PXE boot erasure',
      'centralized wiping',
      'enterprise network wipe',
      'remote device erasure',
      'network data destruction',
      'bulk network erasure',
      'remote sanitization'
    ]),
    canonicalUrl: getCanonicalUrl('/services/network-erasure'),
  },

  // Products
  'products': {
    title: 'Data Erasure Products - Software Solutions | D-Secure Tech',
    description: 'Complete range of data erasure products including Drive Eraser, File Eraser, Mobile Eraser, and Cloud solutions for enterprise security.',
    keywords: generateKeywords([
      'data erasure products',
      'erasure software',
      'drive eraser',
      'file eraser',
      'mobile eraser',
      'cloud eraser',
      'data wiping products',
      'enterprise erasure software',
      'professional erasure tools',
      'certified erasure products',
      'D-Secure products',
      'data destruction products',
      'sanitization software',
      'disk wipe products',
      'secure erase products',
      'data shredding products',
      'hard drive eraser product',
      'SSD erasure product',
      'storage eraser',
      'device wiping products',
      'data removal products',
      'erasure suite',
      'complete erasure solution',
      'all-in-one data erasure',
      'data security products',
      'privacy products',
      'compliance products',
      'NIST certified products',
      'enterprise data products',
      'business erasure products'
    ]),
    canonicalUrl: getCanonicalUrl('/products'),
  },

  // Products - Mobile Erasure
  'mobile-erasure': {
    title: 'Mobile Erasure - iOS & Android Data Wiping | D-Secure Tech',
    description: 'Certified mobile device erasure for iOS and Android. Secure smartphone and tablet data destruction with compliance certificates.',
    keywords: generateKeywords([
      'mobile erasure',
      'iOS data wipe',
      'Android erasure',
      'smartphone wiping',
      'tablet data destruction',
      'mobile device sanitization',
      'certified mobile erasure',
      'phone data removal',
      'mobile diagnostics',
      'device reset secure'
    ]),
    canonicalUrl: getCanonicalUrl('/products/mobile-erasure'),
  },

  // Solutions - Enterprise
  'enterprise-solutions': {
    title: 'Enterprise Data Erasure Solutions | D-Secure Tech',
    description: 'Scalable enterprise data erasure solutions for large organizations. Centralized management, compliance reporting, and API integration.',
    keywords: generateKeywords([
      'enterprise data erasure',
      'corporate data wiping',
      'scalable erasure solution',
      'enterprise compliance',
      'large scale wiping',
      'corporate sanitization',
      'business data destruction',
      'enterprise security',
      'organization data erasure',
      'bulk enterprise wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/enterprise'),
  },

  // Solutions - Healthcare
  'healthcare': {
    title: 'Healthcare Data Erasure - HIPAA Compliant | D-Secure Tech',
    description: 'HIPAA compliant data erasure for healthcare organizations. Secure patient data destruction and medical device sanitization.',
    keywords: generateKeywords([
      'healthcare data erasure',
      'HIPAA compliance',
      'medical data destruction',
      'patient data wiping',
      'hospital data security',
      'healthcare sanitization',
      'PHI data erasure',
      'medical device wiping',
      'healthcare compliance',
      'clinical data destruction'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/healthcare'),
  },

  // Solutions - Financial
  'financial': {
    title: 'Financial Services Data Erasure - PCI DSS Compliant | D-Secure Tech',
    description: 'Secure data erasure for financial institutions. PCI DSS and SOX compliant data destruction for banks and financial services.',
    keywords: generateKeywords([
      'financial data erasure',
      'banking data wiping',
      'PCI DSS compliance',
      'SOX data destruction',
      'financial compliance',
      'bank data security',
      'financial institution erasure',
      'secure banking wipe',
      'financial services security',
      'investment data destruction',
      'banking sector erasure',
      'credit card data erasure',
      'financial regulatory compliance',
      'secure financial data',
      'bank compliance software',
      'financial industry security',
      'payment data destruction',
      'financial audit trails',
      'banking IT security',
      'financial data protection',
      'ATM data erasure',
      'POS data wiping',
      'financial institution compliance',
      'banking security solutions',
      'investment firm erasure',
      'financial service provider security',
      'GLBA compliance',
      'financial sector wiping',
      'bank data sanitization',
      'secure banking solutions'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/financial'),
  },

  // Solutions - Financial Services
  'financial-services': {
    title: 'Financial Services Data Security Solutions | D-Secure Tech',
    description: 'Comprehensive data security solutions for financial services industry. Regulatory compliant data erasure and audit trails.',
    keywords: generateKeywords([
      'financial services security',
      'banking compliance',
      'financial data protection',
      'regulatory erasure',
      'finance industry wiping',
      'financial audit trails',
      'banking data sanitization',
      'financial regulatory compliance',
      'secure financial erasure',
      'investment firm security'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/financial-services'),
  },

  // Solutions - ITAD
  'itad': {
    title: 'ITAD Data Erasure Solutions - IT Asset Disposition | D-Secure Tech',
    description: 'Professional ITAD data erasure solutions for IT asset disposition. Certified wiping for asset remarketing and recycling.',
    keywords: generateKeywords([
      'ITAD data erasure',
      'IT asset disposition',
      'asset remarketing',
      'IT recycling erasure',
      'certified ITAD wiping',
      'asset lifecycle management',
      'IT asset sanitization',
      'refurbishment erasure',
      'e-waste data destruction',
      'asset recovery wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/itad'),
  },

  // Solutions - Education
  'education': {
    title: 'Education Sector Data Erasure - FERPA Compliant | D-Secure Tech',
    description: 'FERPA compliant data erasure for educational institutions. Secure student data destruction for schools and universities.',
    keywords: generateKeywords([
      'education data erasure',
      'FERPA compliance',
      'school data wiping',
      'university data destruction',
      'student data protection',
      'academic data security',
      'education compliance',
      'school device wiping',
      'university IT security',
      'educational institution erasure',
      'school IT security',
      'student privacy protection',
      'campus data security',
      'educational data compliance',
      'school computer wiping',
      'university device erasure',
      'K-12 data security',
      'higher education security',
      'school district erasure',
      'college data wiping',
      'academic institution security',
      'education sector compliance',
      'school technology security',
      'student information security',
      'educational records protection',
      'school data compliance',
      'university compliance',
      'educational device disposal',
      'school IT asset management',
      'education data protection'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/education'),
  },

  // Solutions - Government
  'government': {
    title: 'Government Data Erasure - DoD Compliant | D-Secure Tech',
    description: 'DoD compliant data erasure for government agencies. Classified data destruction meeting federal security standards.',
    keywords: generateKeywords([
      'government data erasure',
      'DoD compliance',
      'federal data destruction',
      'classified data wiping',
      'government security',
      'federal compliance',
      'military grade erasure',
      'public sector wiping',
      'government sanitization',
      'defense data destruction',
      'DoD 5220.22-M standard',
      'federal agency erasure',
      'military data security',
      'government IT security',
      'federal device wiping',
      'classified information erasure',
      'defense contractor compliance',
      'government compliance software',
      'federal sector security',
      'military device sanitization',
      'government asset disposal',
      'federal data security',
      'public sector compliance',
      'government data protection',
      'defense industry erasure',
      'federal IT asset disposal',
      'government contract compliance',
      'military compliance',
      'federal security standards',
      'government wiping solutions'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/government'),
  },

  // Solutions - Service Providers
  'service-providers': {
    title: 'Service Provider Data Erasure Solutions | D-Secure Tech',
    description: 'Data erasure solutions for managed service providers and IT service companies. White-label options and volume licensing.',
    keywords: generateKeywords([
      'service provider erasure',
      'MSP data wiping',
      'IT service company',
      'white label erasure',
      'volume licensing',
      'managed service erasure',
      'IT partner solutions',
      'service provider tools',
      'MSP security solutions',
      'IT services data destruction',
      'managed service provider',
      'MSP tools',
      'IT service provider',
      'MSP software',
      'white label software',
      'OEM solutions',
      'partner solutions',
      'MSP data security',
      'service provider software',
      'MSP compliance',
      'IT services solutions',
      'managed security provider',
      'service provider compliance',
      'MSP platform',
      'IT service tools',
      'provider portal',
      'MSP licensing',
      'service provider licensing',
      'multi-tenant solutions',
      'MSP management'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/service-providers'),
  },

  // Industry Pages - Enterprise
  'enterprise': {
    title: 'Enterprise Data Security - Corporate Erasure Solutions | D-Secure Tech',
    description: 'Enterprise-grade data security and erasure solutions for corporations. Scalable deployment and centralized management.',
    keywords: generateKeywords([
      'enterprise security',
      'corporate data protection',
      'enterprise deployment',
      'corporate erasure',
      'large enterprise solutions',
      'corporate IT security',
      'enterprise data management',
      'business security solutions',
      'corporate compliance',
      'enterprise wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/enterprise'),
  },

  // Industry Pages - Healthcare Services
  'healthcare-services': {
    title: 'Healthcare IT Services - Medical Data Security | D-Secure Tech',
    description: 'Comprehensive healthcare IT services including data erasure, compliance management, and medical device sanitization.',
    keywords: generateKeywords([
      'healthcare IT services',
      'medical IT security',
      'healthcare technology',
      'medical compliance services',
      'healthcare data services',
      'medical device services',
      'healthcare IT solutions',
      'medical data management',
      'healthcare security services',
      'medical IT compliance'
    ]),
    canonicalUrl: getCanonicalUrl('/healthcare-services'),
  },

  // Industry Pages - ITAD Solution
  'itad-solution': {
    title: 'ITAD Solution - Complete IT Asset Disposition | D-Secure Tech',
    description: 'Complete ITAD solution for IT asset disposition lifecycle. Data erasure, asset tracking, and compliance documentation.',
    keywords: generateKeywords([
      'ITAD solution',
      'IT asset disposal',
      'asset disposition service',
      'complete ITAD',
      'asset tracking',
      'disposition compliance',
      'IT lifecycle management',
      'asset recovery solution',
      'ITAD compliance',
      'disposition documentation',
      'IT asset management',
      'asset remarketing',
      'IT recycling',
      'asset refurbishment',
      'ITAD service provider',
      'IT disposition process',
      'asset retirement',
      'IT equipment disposal',
      'hardware disposal',
      'asset liquidation',
      'IT asset tracking',
      'ITAD certification',
      'e-waste management',
      'IT asset recycling',
      'device retirement',
      'IT decommissioning',
      'asset disposal service',
      'ITAD software',
      'IT asset lifecycle',
      'secure asset disposal'
    ]),
    canonicalUrl: getCanonicalUrl('/itad-solution'),
  },

  // Resources - Documentation
  'documentation': {
    title: 'Documentation - User Guides & Manuals | D-Secure Tech',
    description: 'Comprehensive documentation for D-Secure Tech products. User guides, installation manuals, and technical references.',
    keywords: generateKeywords([
      'product documentation',
      'user guides',
      'installation manuals',
      'technical documentation',
      'product manuals',
      'software guides',
      'reference documentation',
      'help documentation',
      'product help',
      'technical guides',
      'user manual',
      'software documentation',
      'how-to guides',
      'setup documentation',
      'configuration guides',
      'online documentation',
      'PDF manuals',
      'downloadable guides',
      'product reference',
      'feature documentation',
      'admin guide',
      'user documentation',
      'software manual',
      'installation docs',
      'setup guides',
      'technical reference',
      'product knowledge',
      'software help',
      'documentation center',
      'docs library'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/documentation'),
  },

  // Resources - Case Studies
  'case-studies': {
    title: 'Case Studies - Data Erasure Success Stories | D-Secure Tech',
    description: 'Real-world case studies showcasing successful data erasure implementations across industries.',
    keywords: generateKeywords([
      'case studies',
      'success stories',
      'customer implementations',
      'erasure case studies',
      'industry examples',
      'client success',
      'implementation stories',
      'customer testimonials',
      'real world examples',
      'erasure implementations',
      'customer case studies',
      'success case studies',
      'enterprise case studies',
      'healthcare case studies',
      'financial case studies',
      'government case studies',
      'ITAD case studies',
      'implementation examples',
      'use case examples',
      'customer stories',
      'client testimonials',
      'deployment case studies',
      'industry success stories',
      'real-world implementations',
      'proven results',
      'customer experiences',
      'case study library',
      'success examples',
      'best practices case studies',
      'ROI case studies'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/case-studies'),
  },

  // Resources - Compliance
  'resources-compliance': {
    title: 'Compliance Resources - Regulatory Guides | D-Secure Tech',
    description: 'Comprehensive compliance resources for data erasure regulations. GDPR, HIPAA, NIST, and industry compliance guides.',
    keywords: generateKeywords([
      'compliance resources',
      'regulatory guides',
      'compliance documentation',
      'regulation guides',
      'compliance information',
      'regulatory resources',
      'compliance checklist',
      'regulation compliance',
      'industry compliance',
      'compliance standards'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/compliance'),
  },

  // Resources - Whitepapers
  'whitepapers': {
    title: 'Whitepapers - Data Erasure Research & Insights | D-Secure Tech',
    description: 'In-depth whitepapers on data erasure best practices, compliance requirements, and industry trends.',
    keywords: generateKeywords([
      'whitepapers',
      'research papers',
      'data erasure insights',
      'industry research',
      'technical whitepapers',
      'best practices papers',
      'compliance whitepapers',
      'security research',
      'erasure whitepapers',
      'industry insights',
      'data security whitepapers',
      'GDPR whitepapers',
      'HIPAA whitepapers',
      'NIST whitepapers',
      'compliance research',
      'data protection papers',
      'security whitepapers',
      'IT security research',
      'data erasure research',
      'industry analysis',
      'technical papers',
      'research documents',
      'thought leadership',
      'expert insights',
      'industry reports',
      'downloadable whitepapers',
      'free whitepapers',
      'whitepaper library',
      'research library',
      'data security research'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/whitepapers'),
  },

  // Technical Documentation
  'technical-documentation': {
    title: 'Technical Documentation - API & Developer Guides | D-Secure Tech',
    description: 'Technical documentation for developers and IT professionals. API references, integration guides, and technical specifications.',
    keywords: generateKeywords([
      'technical documentation',
      'API documentation',
      'developer guides',
      'integration documentation',
      'technical specs',
      'API reference',
      'developer resources',
      'technical guides',
      'integration specs',
      'developer documentation'
    ]),
    canonicalUrl: getCanonicalUrl('/technical-documentation'),
  },

  // Download
  'download': {
    title: 'Download - D-Secure Tech Data Erasure Software',
    description: 'Download D-Secure Tech data erasure software. Free trial available for Drive Eraser, File Eraser, and Mobile Eraser.',
    keywords: generateKeywords([
      'software download',
      'free trial download',
      'data erasure download',
      'drive eraser download',
      'file eraser download',
      'mobile eraser download',
      'trial software',
      'free download',
      'software trial',
      'erasure software download',
      'download D-Secure',
      'download data eraser',
      'free software download',
      'trial version download',
      'download now',
      'instant download',
      'software installer download',
      'exe download',
      'setup download',
      'download free trial',
      'get software',
      'download application',
      'Windows download',
      'Mac download',
      'Linux download',
      'download for PC',
      'download installer',
      'full version download',
      'latest version download',
      'secure download',
      'official download'
    ]),
    canonicalUrl: getCanonicalUrl('/download'),
  },

  // Support - FAQs
  'faqs': {
    title: 'FAQs - Frequently Asked Questions | D-Secure Tech',
    description: 'Find answers to frequently asked questions about D-Secure Tech data erasure software and services.',
    keywords: generateKeywords([
      'FAQ',
      'frequently asked questions',
      'common questions',
      'help questions',
      'support FAQ',
      'product questions',
      'erasure FAQ',
      'data wiping FAQ',
      'customer questions',
      'help answers',
      'Q&A',
      'questions and answers',
      'common issues',
      'popular questions',
      'customer FAQ',
      'product FAQ',
      'software FAQ',
      'technical FAQ',
      'troubleshooting FAQ',
      'installation FAQ',
      'licensing FAQ',
      'pricing FAQ',
      'compliance FAQ',
      'security FAQ',
      'support questions',
      'help section',
      'answers',
      'quick answers',
      'FAQ section',
      'frequently asked'
    ]),
    canonicalUrl: getCanonicalUrl('/support/faqs'),
  },

  // Support - Knowledge Base
  'knowledge-base': {
    title: 'Knowledge Base - Help Articles & Guides | D-Secure Tech',
    description: 'Comprehensive knowledge base with help articles, how-to guides, and troubleshooting tips for D-Secure Tech products.',
    keywords: generateKeywords([
      'knowledge base',
      'help articles',
      'how-to guides',
      'troubleshooting',
      'support articles',
      'help center',
      'support knowledge',
      'product help',
      'user assistance',
      'help documentation',
      'knowledge center',
      'help library',
      'support library',
      'tutorials',
      'how to articles',
      'step-by-step guides',
      'troubleshooting guides',
      'fix issues',
      'problem solving',
      'solutions articles',
      'help resources',
      'learning center',
      'self-help',
      'support resources',
      'knowledge articles',
      'help database',
      'support database',
      'how-to tutorials',
      'user guides',
      'instructional articles'
    ]),
    canonicalUrl: getCanonicalUrl('/support/knowledge-base'),
  },

  // Support - Get Started
  'get-started': {
    title: 'Get Started - Quick Start Guide | D-Secure Tech',
    description: 'Quick start guide to get started with D-Secure Tech data erasure software. Step-by-step installation and setup instructions.',
    keywords: generateKeywords([
      'get started',
      'quick start',
      'setup guide',
      'installation guide',
      'getting started',
      'beginner guide',
      'first steps',
      'onboarding guide',
      'start using',
      'initial setup'
    ]),
    canonicalUrl: getCanonicalUrl('/support/get-started'),
  },

  // Support - Help Manual
  'help-manual': {
    title: 'Help Manual - Complete User Guide | D-Secure Tech',
    description: 'Complete help manual and user guide for D-Secure Tech data erasure products. Detailed instructions and feature explanations.',
    keywords: generateKeywords([
      'help manual',
      'user manual',
      'product manual',
      'complete guide',
      'user guide',
      'instruction manual',
      'detailed help',
      'full manual',
      'comprehensive guide',
      'product instructions'
    ]),
    canonicalUrl: getCanonicalUrl('/support/help-manual'),
  },

  // Support - Product Videos
  'product-videos': {
    title: 'Product Videos - Tutorials & Demos | D-Secure Tech',
    description: 'Watch product videos, tutorials, and demonstrations of D-Secure Tech data erasure software features.',
    keywords: generateKeywords([
      'product videos',
      'video tutorials',
      'demo videos',
      'how-to videos',
      'training videos',
      'feature demos',
      'video guides',
      'tutorial videos',
      'software demos',
      'product demonstrations'
    ]),
    canonicalUrl: getCanonicalUrl('/support/product-videos'),
  },

  // Blog
  'blog': {
    title: 'Blog - Data Security News & Insights | D-Secure Tech',
    description: 'Stay updated with latest data security news, data erasure insights, compliance updates, and industry trends.',
    keywords: generateKeywords([
      'data security blog',
      'erasure news',
      'security insights',
      'industry blog',
      'compliance updates',
      'data protection blog',
      'security articles',
      'industry news',
      'erasure blog',
      'tech blog',
      'data erasure blog',
      'cybersecurity blog',
      'IT security blog',
      'compliance blog',
      'GDPR blog',
      'HIPAA blog',
      'data privacy blog',
      'security news',
      'blog articles',
      'tech articles',
      'security best practices',
      'data erasure tips',
      'security trends',
      'industry insights',
      'thought leadership',
      'expert blog',
      'security updates',
      'compliance news',
      'data security articles',
      'IT blog'
    ]),
    canonicalUrl: getCanonicalUrl('/blog'),
  },

  // News
  'news': {
    title: 'News - Company Updates & Announcements | D-Secure Tech',
    description: 'Latest news and announcements from D-Secure Tech. Product updates, company news, and industry developments.',
    keywords: generateKeywords([
      'company news',
      'announcements',
      'product updates',
      'company updates',
      'press releases',
      'news updates',
      'latest news',
      'company announcements',
      'product news',
      'industry news',
      'D-Secure news',
      'news feed',
      'breaking news',
      'recent news',
      'news articles',
      'company blog news',
      'business news',
      'tech news',
      'security news',
      'data erasure news',
      'news archive',
      'news center',
      'newsroom',
      'media news',
      'corporate news',
      'product announcements',
      'feature announcements',
      'partnership news',
      'customer news',
      'industry announcements'
    ]),
    canonicalUrl: getCanonicalUrl('/news'),
  },

  // Press
  'press': {
    title: 'Press Room - Media Resources & Press Releases | D-Secure Tech',
    description: 'Press room with media resources, press releases, and press kit for journalists and media professionals.',
    keywords: generateKeywords([
      'press room',
      'press releases',
      'media resources',
      'press kit',
      'media contact',
      'news releases',
      'media room',
      'journalist resources',
      'press information',
      'media materials',
      'press center',
      'media center',
      'press materials',
      'media kit',
      'press announcements',
      'media announcements',
      'journalist contact',
      'media inquiries',
      'press inquiries',
      'media assets',
      'brand assets',
      'press photos',
      'media images',
      'press coverage',
      'media coverage',
      'press portal',
      'newsroom',
      'media relations',
      'public relations',
      'PR materials'
    ]),
    canonicalUrl: getCanonicalUrl('/press'),
  },

  // Careers
  'careers': {
    title: 'Careers - Join Our Team | D-Secure Tech',
    description: 'Explore career opportunities at D-Secure Tech. Join our team and help secure data worldwide.',
    keywords: generateKeywords([
      'careers',
      'job opportunities',
      'join our team',
      'employment',
      'job openings',
      'career opportunities',
      'work with us',
      'hiring',
      'open positions',
      'job listings',
      'jobs at D-Secure',
      'D-Secure careers',
      'current openings',
      'job vacancies',
      'career page',
      'jobs',
      'apply now',
      'we are hiring',
      'job application',
      'career growth',
      'job search',
      'employment opportunities',
      'tech jobs',
      'software jobs',
      'security jobs',
      'IT jobs',
      'remote jobs',
      'work opportunities',
      'join us',
      'career portal'
    ]),
    canonicalUrl: getCanonicalUrl('/careers'),
  },

  // Team
  'team': {
    title: 'Our Team - Meet the People Behind D-Secure Tech',
    description: 'Meet the talented team behind D-Secure Tech. Our experts in data security and erasure technology.',
    keywords: generateKeywords([
      'our team',
      'team members',
      'company team',
      'meet the team',
      'staff',
      'employees',
      'team page',
      'our people',
      'company staff',
      'team introduction',
      'D-Secure team',
      'about our team',
      'team profiles',
      'employee profiles',
      'our experts',
      'team expertise',
      'talented team',
      'professional team',
      'team bios',
      'employee directory',
      'who we are',
      'team culture',
      'company culture',
      'our values',
      'meet our experts',
      'expert team',
      'team photos',
      'team overview',
      'staff profiles',
      'company employees'
    ]),
    canonicalUrl: getCanonicalUrl('/team'),
  },

  // Leadership
  'leadership': {
    title: 'Leadership - Executive Team | D-Secure Tech',
    description: 'Meet the leadership team at D-Secure Tech. Our executives bringing expertise in data security and technology.',
    keywords: generateKeywords([
      'leadership',
      'executive team',
      'management team',
      'company leadership',
      'executives',
      'leaders',
      'management',
      'C-suite',
      'company executives',
      'leadership team',
      'CEO',
      'CTO',
      'CFO',
      'COO',
      'senior management',
      'executive leadership',
      'leadership profiles',
      'executive bios',
      'management bios',
      'leadership team bios',
      'senior executives',
      'company leaders',
      'executive profiles',
      'meet our leaders',
      'leadership experience',
      'executive expertise',
      'board of directors',
      'management structure',
      'corporate leadership',
      'senior leadership'
    ]),
    canonicalUrl: getCanonicalUrl('/leadership'),
  },

  // Free Trial
  'free-trial': {
    title: 'Free Trial - Try D-Secure Tech Data Erasure Software',
    description: 'Start your free trial of D-Secure Tech data erasure software. No credit card required. Full-featured trial.',
    keywords: generateKeywords([
      'free trial',
      'trial download',
      'try free',
      'software trial',
      'free evaluation',
      'trial version',
      'free demo',
      'test software',
      'evaluation copy',
      'trial offer',
      'start free trial',
      'no credit card trial',
      'free trial download',
      'trial signup',
      'try for free',
      '30-day trial',
      'free trial software',
      'trial activation',
      'evaluation license',
      'test drive',
      'try before buy',
      'instant trial',
      'trial registration',
      'trial license',
      'free trial access',
      'trial period',
      'trial key',
      'no risk trial',
      'free evaluation version',
      'trial account'
    ]),
    canonicalUrl: getCanonicalUrl('/free-trial'),
  },

  // Request Demo
  'request-demo': {
    title: 'Request Demo - Schedule a Product Demonstration | D-Secure Tech',
    description: 'Request a personalized demo of D-Secure Tech data erasure solutions. See how our software meets your needs.',
    keywords: generateKeywords([
      'request demo',
      'schedule demo',
      'product demonstration',
      'live demo',
      'demo request',
      'personalized demo',
      'software demo',
      'demo appointment',
      'book demo',
      'demo scheduling',
      'see demo',
      'watch demo',
      'demo presentation',
      'guided demo',
      'demo session',
      'demo meeting',
      'product showcase',
      'demo booking',
      'demo inquiry',
      'request presentation',
      'schedule consultation',
      'demo form',
      'software walkthrough',
      'demo call',
      'demo video call',
      'book presentation',
      'enterprise demo',
      'business demo',
      'custom demo',
      'personalized presentation'
    ]),
    canonicalUrl: getCanonicalUrl('/request-demo'),
  },

  // Live Demo
  'live-demo': {
    title: 'Live Demo - Interactive Product Tour | D-Secure Tech',
    description: 'Experience a live interactive demo of D-Secure Tech data erasure software. See features in action.',
    keywords: generateKeywords([
      'live demo',
      'interactive demo',
      'product tour',
      'live demonstration',
      'interactive tour',
      'real-time demo',
      'online demo',
      'virtual demo',
      'demo session',
      'live walkthrough',
      'hands-on demo',
      'browser demo',
      'instant access demo',
      'try now',
      'demo environment',
      'sandbox demo',
      'test environment',
      'demo platform',
      'practice demo',
      'training demo',
      'simulation demo',
      'cloud demo',
      'instant demo',
      'no download demo',
      'browser-based demo',
      'web demo',
      'interactive walkthrough',
      'live product demo',
      'online demonstration',
      'try software online'
    ]),
    canonicalUrl: getCanonicalUrl('/live-demo'),
  },

  // Certifications
  'certifications': {
    title: 'Certifications - Industry Certifications & Validations | D-Secure Tech',
    description: 'View D-Secure Tech certifications and industry validations. ADISA, Common Criteria, and compliance certifications.',
    keywords: generateKeywords([
      'certifications',
      'industry certifications',
      'compliance certifications',
      'ADISA certified',
      'Common Criteria',
      'validated software',
      'certified erasure',
      'industry validation',
      'certification badges',
      'certified products'
    ]),
    canonicalUrl: getCanonicalUrl('/certifications'),
  },

  // Standards
  'standards': {
    title: 'Data Erasure Standards - NIST, DoD, ISO | D-Secure Tech',
    description: 'Learn about data erasure standards including NIST 800-88, DoD 5220.22-M, and ISO 27001 compliance requirements.',
    keywords: generateKeywords([
      'erasure standards',
      'NIST 800-88',
      'DoD 5220.22-M',
      'ISO 27001',
      'compliance standards',
      'industry standards',
      'wiping standards',
      'sanitization standards',
      'regulatory standards',
      'data destruction standards'
    ]),
    canonicalUrl: getCanonicalUrl('/standards'),
  },

  // Use Cases
  'use-cases': {
    title: 'Use Cases - Data Erasure Applications | D-Secure Tech',
    description: 'Explore data erasure use cases across industries. Real-world applications and implementation scenarios.',
    keywords: generateKeywords([
      'use cases',
      'applications',
      'implementation scenarios',
      'real world uses',
      'erasure applications',
      'industry use cases',
      'practical applications',
      'deployment scenarios',
      'usage examples',
      'implementation examples'
    ]),
    canonicalUrl: getCanonicalUrl('/use-cases'),
  },

  // Comparison
  'comparison': {
    title: 'Comparison - Compare Data Erasure Solutions | D-Secure Tech',
    description: 'Compare D-Secure Tech with other data erasure solutions. Feature comparison and competitive analysis.',
    keywords: generateKeywords([
      'comparison',
      'compare solutions',
      'feature comparison',
      'competitive analysis',
      'product comparison',
      'vs competitors',
      'alternative comparison',
      'software comparison',
      'erasure comparison',
      'compare products'
    ]),
    canonicalUrl: getCanonicalUrl('/comparison'),
  },

  // Training
  'training': {
    title: 'Training - Data Erasure Certification Programs | D-Secure Tech',
    description: 'Professional training and certification programs for data erasure. Learn best practices and earn certifications.',
    keywords: generateKeywords([
      'training',
      'certification programs',
      'professional training',
      'erasure training',
      'learn data erasure',
      'training courses',
      'certification training',
      'professional development',
      'skill training',
      'erasure certification',
      'data security training',
      'IT training',
      'compliance training',
      'online training',
      'instructor-led training',
      'self-paced training',
      'technical training',
      'product training',
      'software training',
      'hands-on training',
      'training programs',
      'training workshops',
      'certified training',
      'professional certification',
      'training resources',
      'learning programs',
      'skill development',
      'training academy',
      'corporate training',
      'enterprise training'
    ]),
    canonicalUrl: getCanonicalUrl('/training'),
  },

  // Academy
  'academy': {
    title: 'D-Secure Academy - Learning Platform | D-Secure Tech',
    description: 'D-Secure Academy learning platform. Online courses, tutorials, and certifications for data erasure professionals.',
    keywords: generateKeywords([
      'academy',
      'learning platform',
      'online courses',
      'e-learning',
      'educational platform',
      'training academy',
      'learning center',
      'online training',
      'course platform',
      'educational resources'
    ]),
    canonicalUrl: getCanonicalUrl('/academy'),
  },

  // Webinars
  'webinars': {
    title: 'Webinars - Live & On-Demand Sessions | D-Secure Tech',
    description: 'Join D-Secure Tech webinars on data erasure, compliance, and security. Live sessions and on-demand recordings.',
    keywords: generateKeywords([
      'webinars',
      'online seminars',
      'live webinars',
      'on-demand webinars',
      'virtual events',
      'educational webinars',
      'training webinars',
      'webinar series',
      'online presentations',
      'webinar recordings',
      'free webinars',
      'upcoming webinars',
      'past webinars',
      'webinar library',
      'security webinars',
      'compliance webinars',
      'technical webinars',
      'product webinars',
      'expert webinars',
      'register webinar',
      'join webinar',
      'watch webinar',
      'webinar schedule',
      'live sessions',
      'recorded sessions',
      'virtual seminars',
      'online events',
      'webinar registration',
      'educational sessions',
      'industry webinars'
    ]),
    canonicalUrl: getCanonicalUrl('/webinars'),
  },

  // Events
  'events': {
    title: 'Events - Conferences & Trade Shows | D-Secure Tech',
    description: 'Upcoming events, conferences, and trade shows featuring D-Secure Tech. Meet us at industry events.',
    keywords: generateKeywords([
      'events',
      'conferences',
      'trade shows',
      'industry events',
      'upcoming events',
      'exhibitions',
      'tech events',
      'security conferences',
      'industry conferences',
      'company events'
    ]),
    canonicalUrl: getCanonicalUrl('/events'),
  },

  // Integrations
  'integrations': {
    title: 'Integrations - Connect with Your Tools | D-Secure Tech',
    description: 'Integrate D-Secure Tech with your existing tools. SIEM, asset management, and enterprise system integrations.',
    keywords: generateKeywords([
      'integrations',
      'API integration',
      'system integration',
      'third-party integration',
      'enterprise integration',
      'software integration',
      'connect tools',
      'SIEM integration',
      'asset management integration',
      'platform integration'
    ]),
    canonicalUrl: getCanonicalUrl('/integrations'),
  },

  // API
  'api': {
    title: 'API - Developer API & Documentation | D-Secure Tech',
    description: 'D-Secure Tech API for developers. RESTful API documentation, SDKs, and integration guides.',
    keywords: generateKeywords([
      'API',
      'developer API',
      'REST API',
      'API documentation',
      'SDK',
      'developer tools',
      'API integration',
      'programmatic access',
      'API reference',
      'developer portal',
      'RESTful API',
      'web API',
      'HTTP API',
      'JSON API',
      'API endpoints',
      'API authentication',
      'API keys',
      'API access',
      'developer resources',
      'API guide',
      'integration API',
      'API examples',
      'code samples',
      'API libraries',
      'API SDKs',
      'Python SDK',
      'JavaScript SDK',
      'API testing',
      'API playground',
      'developer docs'
    ]),
    canonicalUrl: getCanonicalUrl('/api'),
  },

  // API Documentation
  'api-documentation': {
    title: 'API Documentation - Developer Reference | D-Secure Tech',
    description: 'Complete API documentation for D-Secure Tech. Endpoints, authentication, code examples, and integration guides.',
    keywords: generateKeywords([
      'API documentation',
      'API reference',
      'developer docs',
      'API endpoints',
      'code examples',
      'authentication docs',
      'integration guide',
      'API guide',
      'developer reference',
      'technical API docs'
    ]),
    canonicalUrl: getCanonicalUrl('/api-documentation'),
  },

  // ROI Calculator
  'roi-calculator': {
    title: 'ROI Calculator - Data Erasure Cost Savings | D-Secure Tech',
    description: 'Calculate your ROI with D-Secure Tech data erasure solutions. Estimate cost savings and efficiency gains.',
    keywords: generateKeywords([
      'ROI calculator',
      'cost savings',
      'return on investment',
      'savings calculator',
      'cost analysis',
      'efficiency calculator',
      'value calculator',
      'business case',
      'cost benefit',
      'investment analysis',
      'ROI calculation',
      'cost savings calculator',
      'investment calculator',
      'financial calculator',
      'ROI estimator',
      'cost benefit analysis',
      'savings estimator',
      'value analysis',
      'profit calculator',
      'business value calculator',
      'TCO calculator',
      'total cost of ownership',
      'ROI tool',
      'investment return',
      'cost reduction calculator',
      'efficiency savings',
      'business case calculator',
      'financial ROI',
      'calculate savings',
      'calculate ROI'
    ]),
    canonicalUrl: getCanonicalUrl('/roi-calculator'),
  },

  // Assessment
  'assessment': {
    title: 'Security Assessment - Data Erasure Needs Analysis | D-Secure Tech',
    description: 'Free security assessment for your data erasure needs. Identify requirements and get personalized recommendations.',
    keywords: generateKeywords([
      'security assessment',
      'needs analysis',
      'free assessment',
      'requirement analysis',
      'security evaluation',
      'data audit',
      'erasure assessment',
      'compliance assessment',
      'risk assessment',
      'security review',
      'data security audit',
      'IT assessment',
      'security audit',
      'vulnerability assessment',
      'compliance audit',
      'security analysis',
      'data protection assessment',
      'security evaluation tool',
      'free security audit',
      'IT security assessment',
      'security gap analysis',
      'data security review',
      'erasure needs assessment',
      'compliance evaluation',
      'security health check',
      'data risk assessment',
      'security maturity assessment',
      'readiness assessment',
      'security questionnaire',
      'assessment tool'
    ]),
    canonicalUrl: getCanonicalUrl('/assessment'),
  },

  // Resources - Datasheets
  'datasheets': {
    title: 'Product Datasheets - Technical Specifications | D-Secure Tech',
    description: 'Download product datasheets with technical specifications, features, and requirements for D-Secure Tech solutions.',
    keywords: generateKeywords([
      'datasheets',
      'product datasheets',
      'technical specs',
      'specifications',
      'feature sheets',
      'product specs',
      'technical datasheets',
      'spec sheets',
      'product information',
      'detailed specifications',
      'technical specifications',
      'product documentation',
      'specification sheets',
      'download datasheets',
      'PDF datasheets',
      'product spec sheets',
      'technical details',
      'product features',
      'system requirements',
      'hardware specs',
      'software specs',
      'product capabilities',
      'feature specifications',
      'technical information',
      'product specifications PDF',
      'specification documents',
      'datasheet download',
      'technical product info',
      'spec documentation',
      'product tech specs'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/datasheets'),
  },

  // Resources - Brochures
  'brochures': {
    title: 'Product Brochures - Marketing Materials | D-Secure Tech',
    description: 'Download D-Secure Tech product brochures. Overview materials for data erasure solutions and services.',
    keywords: generateKeywords([
      'brochures',
      'product brochures',
      'marketing materials',
      'product overview',
      'sales materials',
      'company brochures',
      'solution brochures',
      'information brochures',
      'download brochures',
      'PDF brochures',
      'marketing brochures',
      'product literature',
      'sales brochures',
      'collateral',
      'marketing collateral',
      'sales literature',
      'product catalog',
      'company literature',
      'promotional materials',
      'sales materials PDF',
      'downloadable brochures',
      'product guides',
      'information sheets',
      'product flyers',
      'marketing PDFs',
      'sales PDFs',
      'brochure download',
      'company materials',
      'product marketing',
      'solution overview'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/brochures'),
  },

  // Resources - Ebooks
  'ebooks': {
    title: 'Ebooks - Data Security Guides & Reports | D-Secure Tech',
    description: 'Free ebooks on data security, erasure best practices, and compliance. Download comprehensive guides.',
    keywords: generateKeywords([
      'ebooks',
      'free ebooks',
      'security guides',
      'downloadable books',
      'digital books',
      'educational ebooks',
      'guide downloads',
      'security ebooks',
      'compliance ebooks',
      'best practice guides',
      'data security ebooks',
      'free security guides',
      'download ebooks',
      'IT ebooks',
      'cybersecurity ebooks',
      'compliance guides',
      'data erasure ebooks',
      'technical ebooks',
      'security reports',
      'industry reports',
      'white label ebooks',
      'educational guides',
      'free downloads',
      'PDF ebooks',
      'security books',
      'digital guides',
      'best practices ebooks',
      'ebook library',
      'free resources',
      'knowledge ebooks'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/ebooks'),
  },

  // Changelog
  'changelog': {
    title: 'Changelog - Product Updates & Version History | D-Secure Tech',
    description: 'View D-Secure Tech changelog. Product updates, new features, bug fixes, and version history.',
    keywords: generateKeywords([
      'changelog',
      'version history',
      'product updates',
      'release history',
      'update log',
      'version updates',
      'change log',
      'software updates',
      'feature updates',
      'bug fixes',
      'software changelog',
      'version changelog',
      'update history',
      'release log',
      'change history',
      'product changelog',
      'what\'s new',
      'new features',
      'improvements',
      'enhancements',
      'software changes',
      'version changes',
      'update notes',
      'release changelog',
      'revision history',
      'software revisions',
      'product revisions',
      'changelog archive',
      'historical changes',
      'software evolution'
    ]),
    canonicalUrl: getCanonicalUrl('/changelog'),
  },

  // Release Notes
  'release-notes': {
    title: 'Release Notes - Latest Updates & Features | D-Secure Tech',
    description: 'D-Secure Tech release notes with detailed information about new features, improvements, and fixes.',
    keywords: generateKeywords([
      'release notes',
      'software releases',
      'new features',
      'latest updates',
      'version notes',
      'release information',
      'update notes',
      'feature releases',
      'software versions',
      'release details',
      'release documentation',
      'version release notes',
      'software release notes',
      'product release notes',
      'release announcements',
      'version announcements',
      'new version',
      'latest version',
      'version information',
      'release updates',
      'version features',
      'release highlights',
      'what\'s new in version',
      'release summary',
      'version details',
      'major release',
      'minor release',
      'patch release',
      'release cycle',
      'update release'
    ]),
    canonicalUrl: getCanonicalUrl('/release-notes'),
  },

  // Community
  'community': {
    title: 'Community - User Forum & Discussions | D-Secure Tech',
    description: 'Join the D-Secure Tech community. Connect with users, share experiences, and get peer support.',
    keywords: generateKeywords([
      'community',
      'user community',
      'discussions',
      'user forum',
      'peer support',
      'community forum',
      'user network',
      'connect users',
      'community discussions',
      'user group',
      'online community',
      'user network',
      'community support',
      'community members',
      'join community',
      'user engagement',
      'community platform',
      'user collaboration',
      'community resources',
      'peer network',
      'community events',
      'user meetups',
      'community feedback',
      'user contributions',
      'community guidelines',
      'active community',
      'community portal',
      'user connections',
      'community hub',
      'collaborate'
    ]),
    canonicalUrl: getCanonicalUrl('/community'),
  },

  // Forum
  'forum': {
    title: 'Forum - Technical Discussions & Support | D-Secure Tech',
    description: 'D-Secure Tech user forum for technical discussions, troubleshooting, and community support.',
    keywords: generateKeywords([
      'forum',
      'discussion forum',
      'user forum',
      'technical forum',
      'support forum',
      'community forum',
      'help forum',
      'Q&A forum',
      'discussion board',
      'user discussions',
      'online forum',
      'forum threads',
      'forum topics',
      'forum posts',
      'forum community',
      'ask questions',
      'get answers',
      'troubleshooting forum',
      'technical discussions',
      'user help',
      'peer support forum',
      'forum members',
      'forum categories',
      'forum search',
      'active forum',
      'community discussions',
      'forum support',
      'discussion platform',
      'Q&A platform',
      'help community'
    ]),
    canonicalUrl: getCanonicalUrl('/forum'),
  },

  // Testimonials
  'testimonials': {
    title: 'Testimonials - Customer Reviews & Feedback | D-Secure Tech',
    description: 'Read customer testimonials and reviews about D-Secure Tech data erasure solutions. Real user experiences.',
    keywords: generateKeywords([
      'testimonials',
      'customer reviews',
      'user feedback',
      'customer feedback',
      'user testimonials',
      'client reviews',
      'success testimonials',
      'customer experiences',
      'review quotes',
      'user reviews'
    ]),
    canonicalUrl: getCanonicalUrl('/testimonials'),
  },

  // Customer Stories
  'customer-stories': {
    title: 'Customer Stories - Success Stories & Case Studies | D-Secure Tech',
    description: 'Read customer success stories showcasing how organizations use D-Secure Tech for data erasure.',
    keywords: generateKeywords([
      'customer stories',
      'success stories',
      'client stories',
      'customer case studies',
      'user stories',
      'implementation stories',
      'customer success',
      'real stories',
      'customer experiences',
      'business success'
    ]),
    canonicalUrl: getCanonicalUrl('/customer-stories'),
  },

  // Reviews
  'reviews': {
    title: 'Reviews - Product Reviews & Ratings | D-Secure Tech',
    description: 'Read verified reviews and ratings for D-Secure Tech data erasure products. Honest user feedback.',
    keywords: generateKeywords([
      'reviews',
      'product reviews',
      'user ratings',
      'software reviews',
      'customer ratings',
      'product ratings',
      'verified reviews',
      'honest reviews',
      'review ratings',
      'user opinions'
    ]),
    canonicalUrl: getCanonicalUrl('/reviews'),
  },

  // Partner Program
  'partner-program': {
    title: 'Partner Program - Become a D-Secure Tech Partner',
    description: 'Join the D-Secure Tech partner program. Benefits for resellers, integrators, and technology partners.',
    keywords: generateKeywords([
      'partner program',
      'become partner',
      'partnership program',
      'partner benefits',
      'channel program',
      'partner registration',
      'join partner program',
      'partner opportunities',
      'partnership benefits',
      'partner onboarding',
      'technology partner',
      'integration partner',
      'strategic partner',
      'partner network',
      'partner portal',
      'channel partner',
      'partner ecosystem',
      'partner rewards',
      'partner resources',
      'partner support',
      'alliance program',
      'partnership opportunities',
      'business partner',
      'partner levels',
      'partner tiers',
      'partner certification',
      'partner enablement',
      'partner marketing',
      'co-marketing',
      'partner sales'
    ]),
    canonicalUrl: getCanonicalUrl('/partner-program'),
  },

  // Resellers
  'resellers': {
    title: 'Reseller Program - Sell D-Secure Tech Solutions',
    description: 'Become a D-Secure Tech authorized reseller. Margins, support, and marketing resources for partners.',
    keywords: generateKeywords([
      'reseller program',
      'become reseller',
      'authorized reseller',
      'reseller benefits',
      'reseller margins',
      'sales partner',
      'reseller registration',
      'distribution partner',
      'reseller opportunities',
      'sell erasure software',
      'value added reseller',
      'VAR program',
      'reseller portal',
      'reseller pricing',
      'reseller discount',
      'reseller support',
      'reseller resources',
      'reseller training',
      'reseller marketing',
      'authorized distributor',
      'reseller agreement',
      'reseller certification',
      'channel sales',
      'dealer program',
      'distributor program',
      'reseller network',
      'wholesale pricing',
      'reseller commission',
      'reseller rewards',
      'become distributor'
    ]),
    canonicalUrl: getCanonicalUrl('/resellers'),
  },

  // Affiliates
  'affiliates': {
    title: 'Affiliate Program - Earn with D-Secure Tech',
    description: 'Join the D-Secure Tech affiliate program. Earn commissions by referring customers to our data erasure solutions.',
    keywords: generateKeywords([
      'affiliate program',
      'earn commissions',
      'affiliate marketing',
      'referral program',
      'affiliate earnings',
      'become affiliate',
      'affiliate commissions',
      'referral earnings',
      'affiliate partnership',
      'earn referring'
    ]),
    canonicalUrl: getCanonicalUrl('/affiliates'),
  },

  // Consulting
  'consulting': {
    title: 'Consulting Services - Data Erasure Expertise | D-Secure Tech',
    description: 'Professional consulting services for data erasure implementation. Expert guidance and best practices.',
    keywords: generateKeywords([
      'consulting services',
      'data erasure consulting',
      'expert consulting',
      'implementation consulting',
      'professional services',
      'advisory services',
      'security consulting',
      'compliance consulting',
      'erasure experts',
      'consultation services'
    ]),
    canonicalUrl: getCanonicalUrl('/consulting'),
  },

  // Professional Services
  'professional-services': {
    title: 'Professional Services - Implementation & Support | D-Secure Tech',
    description: 'Professional services for D-Secure Tech implementation. Deployment, training, and ongoing support.',
    keywords: generateKeywords([
      'professional services',
      'implementation services',
      'deployment services',
      'training services',
      'support services',
      'managed services',
      'enterprise services',
      'technical services',
      'onboarding services',
      'customer services',
      'consulting services',
      'expert services',
      'IT professional services',
      'integration services',
      'migration services',
      'configuration services',
      'optimization services',
      'maintenance services',
      'installation services',
      'setup services',
      'project services',
      'advisory services',
      'managed IT services',
      'professional support',
      'expert implementation',
      'technical consulting',
      'service packages',
      'premium support',
      'dedicated services',
      'enterprise support'
    ]),
    canonicalUrl: getCanonicalUrl('/professional-services'),
  },

  // Implementation
  'implementation': {
    title: 'Implementation Services - Deployment & Setup | D-Secure Tech',
    description: 'Data erasure implementation services. Expert deployment, configuration, and integration support.',
    keywords: generateKeywords([
      'implementation services',
      'deployment services',
      'setup services',
      'configuration services',
      'integration services',
      'installation services',
      'onboarding',
      'project implementation',
      'enterprise deployment',
      'software setup',
      'software implementation',
      'system deployment',
      'solution deployment',
      'enterprise implementation',
      'rollout services',
      'deployment planning',
      'implementation planning',
      'system integration',
      'migration services',
      'data migration',
      'deployment support',
      'implementation support',
      'professional deployment',
      'expert implementation',
      'custom implementation',
      'tailored deployment',
      'implementation consulting',
      'deployment consulting',
      'setup and configuration',
      'installation and setup'
    ]),
    canonicalUrl: getCanonicalUrl('/implementation'),
  },

  // Services - Cloud Erasure
  'services/cloud-erasure': {
    title: 'Cloud Data Erasure - Secure Cloud Storage Sanitization | D-Secure Tech',
    description: 'Secure cloud data erasure services. Sanitize data in AWS, Azure, Google Cloud, and other cloud platforms.',
    keywords: generateKeywords([
      'cloud erasure',
      'cloud data destruction',
      'cloud sanitization',
      'AWS data erasure',
      'Azure erasure',
      'Google Cloud wiping',
      'cloud security',
      'cloud compliance',
      'SaaS data erasure',
      'cloud storage wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/services/cloud-erasure'),
  },

  // Solutions - Financial Services
  'solutions/financial-services': {
    title: 'Financial Services Data Erasure - Banking & Finance Security | D-Secure Tech',
    description: 'Specialized data erasure for financial services. PCI DSS compliant solutions for banks and financial institutions.',
    keywords: generateKeywords([
      'financial services',
      'banking erasure',
      'finance data security',
      'PCI compliance',
      'financial data protection',
      'banking security',
      'fintech erasure',
      'financial compliance',
      'bank data wiping',
      'financial sector'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/financial-services'),
  },

  // Blog Posts
  'blog/overwrite-guide': {
    title: 'Complete Overwrite Guide - Data Wiping Methods | D-Secure Tech Blog',
    description: 'Comprehensive guide to data overwrite methods including DoD, NIST, and Gutmann patterns. Best practices for secure wiping.',
    keywords: generateKeywords([
      'overwrite guide',
      'data wiping methods',
      'overwrite patterns',
      'DoD wiping',
      'NIST overwrite',
      'Gutmann method',
      'secure overwrite',
      'wiping standards',
      'data sanitization methods',
      'erasure patterns'
    ]),
    canonicalUrl: getCanonicalUrl('/blog/overwrite-guide'),
  },

  'blog/ssd-wipe-guide': {
    title: 'SSD Wipe Guide - How to Securely Erase SSDs | D-Secure Tech Blog',
    description: 'Complete guide to SSD wiping. Learn about ATA Secure Erase, TRIM, cryptographic erasure, and best practices.',
    keywords: generateKeywords([
      'SSD wipe',
      'SSD erasure',
      'secure erase SSD',
      'TRIM command',
      'SSD sanitization',
      'solid state wiping',
      'ATA secure erase',
      'SSD destruction',
      'flash storage erasure',
      'SSD best practices'
    ]),
    canonicalUrl: getCanonicalUrl('/blog/ssd-wipe-guide'),
  },

  'blog/erasure-vs-destruction': {
    title: 'Data Erasure vs Physical Destruction - Which is Better? | D-Secure Tech',
    description: 'Compare data erasure and physical destruction methods. Cost analysis, environmental impact, and compliance considerations.',
    keywords: generateKeywords([
      'erasure vs destruction',
      'wiping vs shredding',
      'data sanitization comparison',
      'destruction methods',
      'erasure benefits',
      'cost comparison',
      'environmental impact',
      'compliance comparison',
      'erasure advantages',
      'destruction alternatives'
    ]),
    canonicalUrl: getCanonicalUrl('/blog/erasure-vs-destruction'),
  },

  'blog/data-deletion-myths': {
    title: 'Data Deletion Myths - Common Misconceptions Debunked | D-Secure Tech',
    description: 'Debunking common myths about data deletion. Learn the truth about file deletion, formatting, and secure erasure.',
    keywords: generateKeywords([
      'data deletion myths',
      'deletion misconceptions',
      'erasure myths',
      'formatting myths',
      'data recovery myths',
      'deletion facts',
      'secure deletion',
      'deletion truths',
      'common myths',
      'erasure facts'
    ]),
    canonicalUrl: getCanonicalUrl('/blog/data-deletion-myths'),
  },

  'blog/data-sanitization-compliance': {
    title: 'Data Sanitization Compliance Guide - GDPR, HIPAA, PCI | D-Secure Tech',
    description: 'Complete compliance guide for data sanitization. GDPR, HIPAA, PCI DSS, and other regulatory requirements.',
    keywords: generateKeywords([
      'sanitization compliance',
      'GDPR compliance',
      'HIPAA erasure',
      'PCI DSS requirements',
      'compliance guide',
      'regulatory compliance',
      'data protection laws',
      'compliance standards',
      'legal requirements',
      'compliance best practices'
    ]),
    canonicalUrl: getCanonicalUrl('/blog/data-sanitization-compliance'),
  },

  // Support Guides
  'support/product-videos': {
    title: 'Product Videos - Video Tutorials & Demos | D-Secure Tech',
    description: 'Watch video tutorials and product demonstrations. Learn D-Secure Tech features through step-by-step videos.',
    keywords: generateKeywords([
      'product videos',
      'video tutorials',
      'video demos',
      'how-to videos',
      'tutorial videos',
      'product demonstrations',
      'training videos',
      'instructional videos',
      'video guides',
      'demo videos'
    ]),
    canonicalUrl: getCanonicalUrl('/support/product-videos'),
  },

  'support/help-manual': {
    title: 'Help Manual - Complete D-Secure Tech User Manual',
    description: 'Complete user manual for D-Secure Tech products. Installation, configuration, and usage instructions.',
    keywords: generateKeywords([
      'help manual',
      'user manual',
      'product manual',
      'user guide',
      'manual documentation',
      'instruction manual',
      'reference manual',
      'complete guide',
      'manual pages',
      'documentation manual'
    ]),
    canonicalUrl: getCanonicalUrl('/support/help-manual'),
  },

  // Search Demo
  'search-demo': {
    title: 'Search Demo - Try D-Secure Tech Search Features',
    description: 'Interactive search demo. Test our powerful search capabilities and filtering options.',
    keywords: generateKeywords([
      'search demo',
      'search features',
      'interactive demo',
      'search capabilities',
      'demo search',
      'search test',
      'search functionality',
      'live demo',
      'search preview',
      'try search'
    ]),
    canonicalUrl: getCanonicalUrl('/search-demo'),
  },

  // Dashboard Pages (Low Priority)
  'dashboard': {
    title: 'User Dashboard - D-Secure Tech',
    description: 'Access your D-Secure Tech dashboard. Manage erasure tasks, view reports, and monitor operations.',
    keywords: generateKeywords(['user dashboard', 'my dashboard', 'account dashboard']),
    canonicalUrl: getCanonicalUrl('/dashboard'),
  },

  'dashboard/new-erasure': {
    title: 'New Erasure Task - D-Secure Tech Dashboard',
    description: 'Create new data erasure task. Configure devices, select standards, and start secure wiping.',
    keywords: generateKeywords(['new erasure', 'create task', 'start erasure']),
    canonicalUrl: getCanonicalUrl('/dashboard/new-erasure'),
  },

  'dashboard/reports': {
    title: 'Reports - D-Secure Tech Dashboard',
    description: 'View and download erasure reports. Compliance certificates and audit trails.',
    keywords: generateKeywords(['erasure reports', 'compliance reports', 'audit reports']),
    canonicalUrl: getCanonicalUrl('/dashboard/reports'),
  },

  'dashboard/download-agent': {
    title: 'Download Agent - D-Secure Tech Dashboard',
    description: 'Download D-Secure Tech erasure agent for your devices.',
    keywords: generateKeywords(['download agent', 'erasure agent', 'install agent']),
    canonicalUrl: getCanonicalUrl('/dashboard/download-agent'),
  },

  'dashboard/enhanced': {
    title: 'Enhanced Dashboard - D-Secure Tech',
    description: 'Enhanced dashboard with advanced features and analytics.',
    keywords: generateKeywords(['enhanced dashboard', 'advanced dashboard', 'dashboard analytics']),
    canonicalUrl: getCanonicalUrl('/dashboard/enhanced'),
  },

  // Admin Pages (Low Priority)
  'admin': {
    title: 'Admin Panel - D-Secure Tech',
    description: 'Administrator control panel. Manage users, licenses, and system settings.',
    keywords: generateKeywords(['admin panel', 'administration', 'admin dashboard']),
    canonicalUrl: getCanonicalUrl('/admin'),
  },

  // Support Manual Pages - Windows
  'support/manual/windows': {
    title: 'Windows Data Erasure Guide - Complete Manual | D-Secure Tech',
    description: 'Complete guide to data erasure on Windows systems. Methods, tools, and best practices.',
    keywords: generateKeywords(['Windows erasure', 'Windows wiping', 'Windows data destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows'),
  },

  'support/manual/windows-introduction': {
    title: 'Windows Data Erasure Introduction | D-Secure Tech Manual',
    description: 'Introduction to data erasure on Windows. Overview of methods and considerations.',
    keywords: generateKeywords(['Windows intro', 'Windows erasure basics', 'Windows wiping intro']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-introduction'),
  },

  'support/manual/windows-storage': {
    title: 'Windows Storage & Data Erasure | D-Secure Tech Manual',
    description: 'Understanding Windows storage systems for effective data erasure.',
    keywords: generateKeywords(['Windows storage', 'Windows drives', 'storage erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-storage'),
  },

  'support/manual/windows-preparation': {
    title: 'Windows Erasure Preparation Guide | D-Secure Tech Manual',
    description: 'Prepare Windows systems for data erasure. Pre-wipe checklist and best practices.',
    keywords: generateKeywords(['Windows prep', 'erasure preparation', 'pre-wipe steps']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-preparation'),
  },

  'support/manual/windows-builtin-tools': {
    title: 'Windows Built-in Erasure Tools | D-Secure Tech Manual',
    description: 'Using Windows native tools for data erasure. Format, Cipher, and Diskpart.',
    keywords: generateKeywords(['Windows tools', 'native erasure', 'built-in tools']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-builtin-tools'),
  },

  'support/manual/windows-third-party': {
    title: 'Third-Party Windows Erasure Tools | D-Secure Tech Manual',
    description: 'Professional third-party data erasure tools for Windows systems.',
    keywords: generateKeywords(['third-party tools', 'Windows erasure software', 'professional tools']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-third-party'),
  },

  'support/manual/windows-command-line': {
    title: 'Windows Command Line Erasure | D-Secure Tech Manual',
    description: 'Command-line data erasure on Windows. PowerShell and CMD methods.',
    keywords: generateKeywords(['Windows CLI', 'command line erasure', 'PowerShell wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-command-line'),
  },

  'support/manual/windows-software-erasure': {
    title: 'Windows Software-Based Erasure | D-Secure Tech Manual',
    description: 'Software methods for erasing data on Windows systems.',
    keywords: generateKeywords(['software erasure', 'Windows wiping software', 'erasure methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-software-erasure'),
  },

  'support/manual/windows-crypto-erasure': {
    title: 'Windows Cryptographic Erasure | D-Secure Tech Manual',
    description: 'Cryptographic erasure methods for Windows. BitLocker and encryption key destruction.',
    keywords: generateKeywords(['crypto erasure', 'BitLocker erasure', 'encryption wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-crypto-erasure'),
  },

  'support/manual/windows-verification': {
    title: 'Windows Erasure Verification | D-Secure Tech Manual',
    description: 'Verify data erasure on Windows systems. Validation methods and tools.',
    keywords: generateKeywords(['Windows verification', 'erasure validation', 'verify wipe']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-verification'),
  },

  'support/manual/windows-troubleshooting': {
    title: 'Windows Erasure Troubleshooting | D-Secure Tech Manual',
    description: 'Troubleshoot common Windows data erasure issues and errors.',
    keywords: generateKeywords(['Windows troubleshooting', 'erasure errors', 'fix issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-troubleshooting'),
  },

  'support/manual/windows-best-practices': {
    title: 'Windows Erasure Best Practices | D-Secure Tech Manual',
    description: 'Best practices for data erasure on Windows systems.',
    keywords: generateKeywords(['best practices', 'Windows tips', 'erasure guidelines']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-best-practices'),
  },

  'support/manual/windows-enterprise': {
    title: 'Windows Enterprise Erasure | D-Secure Tech Manual',
    description: 'Enterprise-scale data erasure for Windows environments.',
    keywords: generateKeywords(['enterprise Windows', 'bulk erasure', 'Windows deployment']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-enterprise'),
  },

  'support/manual/windows-compliance': {
    title: 'Windows Compliance Erasure | D-Secure Tech Manual',
    description: 'Compliance-focused data erasure for Windows. GDPR, HIPAA, and regulatory standards.',
    keywords: generateKeywords(['Windows compliance', 'regulatory erasure', 'compliant wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-compliance'),
  },

  'support/manual/windows-filesystems': {
    title: 'Windows Filesystems & Erasure | D-Secure Tech Manual',
    description: 'Understanding Windows filesystems (NTFS, FAT32, exFAT) for effective erasure.',
    keywords: generateKeywords(['Windows filesystems', 'NTFS erasure', 'filesystem wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-filesystems'),
  },

  'support/manual/windows-system-files': {
    title: 'Windows System Files Erasure | D-Secure Tech Manual',
    description: 'Erasing Windows system files and protected data.',
    keywords: generateKeywords(['system files', 'Windows files', 'protected data']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-system-files'),
  },

  'support/manual/windows-residual-data': {
    title: 'Windows Residual Data Cleanup | D-Secure Tech Manual',
    description: 'Cleaning residual data and temporary files on Windows.',
    keywords: generateKeywords(['residual data', 'temp files', 'data remnants']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-residual-data'),
  },

  'support/manual/windows-risks': {
    title: 'Windows Data Erasure Risks | D-Secure Tech Manual',
    description: 'Understanding risks and challenges in Windows data erasure.',
    keywords: generateKeywords(['erasure risks', 'Windows challenges', 'data risks']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-risks'),
  },

  'support/manual/windows-methods-comparison': {
    title: 'Windows Erasure Methods Comparison | D-Secure Tech Manual',
    description: 'Compare different Windows data erasure methods and their effectiveness.',
    keywords: generateKeywords(['method comparison', 'erasure methods', 'Windows comparison']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-methods-comparison'),
  },

  'support/manual/windows-ssd-erasure': {
    title: 'Windows SSD Erasure Guide | D-Secure Tech Manual',
    description: 'Specialized guide for erasing SSDs on Windows systems.',
    keywords: generateKeywords(['SSD erasure', 'Windows SSD', 'solid state wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-ssd-erasure'),
  },

  'support/manual/windows-bitlocker': {
    title: 'Windows BitLocker & Data Erasure | D-Secure Tech Manual',
    description: 'Using BitLocker encryption for cryptographic data erasure on Windows.',
    keywords: generateKeywords(['BitLocker', 'Windows encryption', 'crypto erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-bitlocker'),
  },

  'support/manual/windows-sed-drives': {
    title: 'Windows SED Drives Erasure | D-Secure Tech Manual',
    description: 'Erasing Self-Encrypting Drives (SED) on Windows systems.',
    keywords: generateKeywords(['SED drives', 'self-encrypting', 'hardware encryption']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-sed-drives'),
  },

  'support/manual/windows-bootable-usb': {
    title: 'Windows Bootable USB Erasure | D-Secure Tech Manual',
    description: 'Creating and using bootable USB for Windows data erasure.',
    keywords: generateKeywords(['bootable USB', 'USB erasure', 'boot disk']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-bootable-usb'),
  },

  'support/manual/windows-faq': {
    title: 'Windows Erasure FAQ | D-Secure Tech Manual',
    description: 'Frequently asked questions about Windows data erasure.',
    keywords: generateKeywords(['Windows FAQ', 'erasure questions', 'common questions']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-faq'),
  },

  'support/manual/windows-resources': {
    title: 'Windows Erasure Resources | D-Secure Tech Manual',
    description: 'Additional resources and references for Windows data erasure.',
    keywords: generateKeywords(['Windows resources', 'erasure references', 'additional help']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-resources'),
  },

  'support/manual/windows-D-Secure-eraser': {
    title: 'D-Secure Eraser for Windows | D-Secure Tech Manual',
    description: 'Using D-Secure Eraser software on Windows systems.',
    keywords: generateKeywords(['D-Secure Eraser', 'Windows software', 'erasure tool']),
    canonicalUrl: getCanonicalUrl('/support/manual/windows-D-Secure-eraser'),
  },

  // Support Manual Pages - macOS
  'support/manual/macos': {
    title: 'macOS Data Erasure Guide - Complete Manual | D-Secure Tech',
    description: 'Complete guide to data erasure on macOS and Apple systems.',
    keywords: generateKeywords(['macOS erasure', 'Mac wiping', 'Apple data destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos'),
  },

  'support/manual/macos-introduction': {
    title: 'macOS Data Erasure Introduction | D-Secure Tech Manual',
    description: 'Introduction to data erasure on macOS systems.',
    keywords: generateKeywords(['macOS intro', 'Mac erasure basics', 'Apple wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-introduction'),
  },

  'support/manual/macos-storage': {
    title: 'macOS Storage & Data Erasure | D-Secure Tech Manual',
    description: 'Understanding macOS storage for effective data erasure.',
    keywords: generateKeywords(['macOS storage', 'Mac drives', 'APFS erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-storage'),
  },

  'support/manual/macos-preparation': {
    title: 'macOS Erasure Preparation | D-Secure Tech Manual',
    description: 'Prepare Mac systems for data erasure.',
    keywords: generateKeywords(['macOS prep', 'Mac preparation', 'pre-wipe Mac']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-preparation'),
  },

  'support/manual/macos-builtin-tools': {
    title: 'macOS Built-in Erasure Tools | D-Secure Tech Manual',
    description: 'Using macOS native tools for data erasure. Disk Utility and secure erase.',
    keywords: generateKeywords(['macOS tools', 'Disk Utility', 'native Mac tools']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-builtin-tools'),
  },

  'support/manual/macos-third-party': {
    title: 'Third-Party macOS Erasure Tools | D-Secure Tech Manual',
    description: 'Professional third-party data erasure tools for macOS.',
    keywords: generateKeywords(['Mac third-party', 'macOS software', 'erasure apps']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-third-party'),
  },

  'support/manual/macos-software-erasure': {
    title: 'macOS Software-Based Erasure | D-Secure Tech Manual',
    description: 'Software methods for erasing data on macOS.',
    keywords: generateKeywords(['macOS software', 'Mac wiping apps', 'software methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-software-erasure'),
  },

  'support/manual/macos-crypto-erasure': {
    title: 'macOS Cryptographic Erasure | D-Secure Tech Manual',
    description: 'Cryptographic erasure on macOS using FileVault.',
    keywords: generateKeywords(['FileVault', 'macOS crypto', 'encryption erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-crypto-erasure'),
  },

  'support/manual/macos-verification': {
    title: 'macOS Erasure Verification | D-Secure Tech Manual',
    description: 'Verify data erasure on macOS systems.',
    keywords: generateKeywords(['macOS verification', 'Mac validation', 'verify erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-verification'),
  },

  'support/manual/macos-troubleshooting': {
    title: 'macOS Erasure Troubleshooting | D-Secure Tech Manual',
    description: 'Troubleshoot macOS data erasure issues.',
    keywords: generateKeywords(['macOS troubleshooting', 'Mac errors', 'fix issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-troubleshooting'),
  },

  'support/manual/macos-best-practices': {
    title: 'macOS Erasure Best Practices | D-Secure Tech Manual',
    description: 'Best practices for data erasure on macOS.',
    keywords: generateKeywords(['macOS best practices', 'Mac tips', 'erasure guidelines']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-best-practices'),
  },

  'support/manual/macos-enterprise': {
    title: 'macOS Enterprise Erasure | D-Secure Tech Manual',
    description: 'Enterprise-scale data erasure for macOS environments.',
    keywords: generateKeywords(['enterprise macOS', 'Mac deployment', 'bulk erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-enterprise'),
  },

  'support/manual/macos-compliance': {
    title: 'macOS Compliance Erasure | D-Secure Tech Manual',
    description: 'Compliance-focused data erasure for macOS systems.',
    keywords: generateKeywords(['macOS compliance', 'Mac regulatory', 'compliant wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-compliance'),
  },

  'support/manual/macos-filesystems': {
    title: 'macOS Filesystems & Erasure | D-Secure Tech Manual',
    description: 'Understanding macOS filesystems (APFS, HFS+) for erasure.',
    keywords: generateKeywords(['APFS', 'HFS+', 'macOS filesystems']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-filesystems'),
  },

  'support/manual/macos-ssd-considerations': {
    title: 'macOS SSD Erasure Considerations | D-Secure Tech Manual',
    description: 'Special considerations for erasing SSDs on macOS.',
    keywords: generateKeywords(['macOS SSD', 'Mac SSD erasure', 'SSD considerations']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-ssd-considerations'),
  },

  'support/manual/macos-filevault': {
    title: 'FileVault & macOS Erasure | D-Secure Tech Manual',
    description: 'Using FileVault for cryptographic erasure on macOS.',
    keywords: generateKeywords(['FileVault', 'macOS encryption', 'crypto wipe']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-filevault'),
  },

  'support/manual/macos-apple-silicon': {
    title: 'Apple Silicon Mac Erasure | D-Secure Tech Manual',
    description: 'Data erasure on Apple Silicon Macs (M1, M2, M3).',
    keywords: generateKeywords(['Apple Silicon', 'M1 Mac', 'M2 Mac', 'M3 erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-apple-silicon'),
  },

  'support/manual/macos-intel-procedures': {
    title: 'Intel Mac Erasure Procedures | D-Secure Tech Manual',
    description: 'Specific procedures for Intel-based Macs.',
    keywords: generateKeywords(['Intel Mac', 'x86 Mac', 'Intel erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-intel-procedures'),
  },

  'support/manual/macos-system-drive': {
    title: 'macOS System Drive Erasure | D-Secure Tech Manual',
    description: 'Erasing macOS system drives and startup disks.',
    keywords: generateKeywords(['system drive', 'startup disk', 'boot drive']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-system-drive'),
  },

  'support/manual/macos-external-media': {
    title: 'macOS External Media Erasure | D-Secure Tech Manual',
    description: 'Erasing external drives and media on macOS.',
    keywords: generateKeywords(['external drives', 'USB erasure', 'external media']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-external-media'),
  },

  'support/manual/macos-encryption': {
    title: 'macOS Encryption & Erasure | D-Secure Tech Manual',
    description: 'Encrypted storage erasure on macOS systems.',
    keywords: generateKeywords(['macOS encryption', 'encrypted erasure', 'secure storage']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-encryption'),
  },

  'support/manual/macos-architecture': {
    title: 'macOS Architecture for Erasure | D-Secure Tech Manual',
    description: 'Understanding macOS architecture for effective data erasure.',
    keywords: generateKeywords(['macOS architecture', 'system structure', 'Mac internals']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-architecture'),
  },

  'support/manual/macos-tool-selection': {
    title: 'macOS Erasure Tool Selection | D-Secure Tech Manual',
    description: 'Choosing the right erasure tools for macOS.',
    keywords: generateKeywords(['tool selection', 'choose tools', 'Mac software']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-tool-selection'),
  },

  'support/manual/macos-methods-comparison': {
    title: 'macOS Erasure Methods Comparison | D-Secure Tech Manual',
    description: 'Compare different macOS erasure methods.',
    keywords: generateKeywords(['method comparison', 'macOS methods', 'compare erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-methods-comparison'),
  },

  'support/manual/macos-risks': {
    title: 'macOS Data Erasure Risks | D-Secure Tech Manual',
    description: 'Understanding risks in macOS data erasure.',
    keywords: generateKeywords(['macOS risks', 'erasure challenges', 'Mac risks']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-risks'),
  },

  'support/manual/macos-resources': {
    title: 'macOS Erasure Resources | D-Secure Tech Manual',
    description: 'Additional resources for macOS data erasure.',
    keywords: generateKeywords(['macOS resources', 'Mac references', 'additional help']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-resources'),
  },

  'support/manual/macos-faq': {
    title: 'macOS Erasure FAQ | D-Secure Tech Manual',
    description: 'Frequently asked questions about macOS data erasure.',
    keywords: generateKeywords(['macOS FAQ', 'Mac questions', 'common issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/macos-faq'),
  },

  // Continue with remaining manual pages in next part...
  // (Due to length, adding key remaining pages)

  // Installation & Setup Pages
  'support/manual/first-time-setup': {
    title: 'First Time Setup - D-Secure Tech Manual',
    description: 'Initial setup guide for D-Secure Tech data erasure software.',
    keywords: generateKeywords(['first setup', 'initial configuration', 'getting started']),
    canonicalUrl: getCanonicalUrl('/support/manual/first-time-setup'),
  },

  'support/manual/installation': {
    title: 'Installation Guide - D-Secure Tech Manual',
    description: 'Complete installation guide for D-Secure Tech software.',
    keywords: generateKeywords(['installation', 'install software', 'setup guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/installation'),
  },

  'support/manual/system-requirements': {
    title: 'System Requirements - D-Secure Tech Manual',
    description: 'System requirements for running D-Secure Tech software.',
    keywords: generateKeywords(['system requirements', 'minimum specs', 'hardware requirements']),
    canonicalUrl: getCanonicalUrl('/support/manual/system-requirements'),
  },

  'support/manual/license-activation': {
    title: 'License Activation - D-Secure Tech Manual',
    description: 'Activate your D-Secure Tech license and manage subscriptions.',
    keywords: generateKeywords(['license activation', 'activate license', 'subscription management']),
    canonicalUrl: getCanonicalUrl('/support/manual/license-activation'),
  },

  // User Interface Pages
  'support/manual/user-interface': {
    title: 'User Interface Guide - D-Secure Tech Manual',
    description: 'Complete guide to D-Secure Tech user interface and navigation.',
    keywords: generateKeywords(['user interface', 'UI guide', 'navigation']),
    canonicalUrl: getCanonicalUrl('/support/manual/user-interface'),
  },

  'support/manual/main-dashboard': {
    title: 'Main Dashboard - D-Secure Tech Manual',
    description: 'Overview of the main dashboard and key features.',
    keywords: generateKeywords(['main dashboard', 'dashboard overview', 'UI dashboard']),
    canonicalUrl: getCanonicalUrl('/support/manual/main-dashboard'),
  },

  // Verification & Compliance Pages
  'support/manual/verification-methods': {
    title: 'Verification Methods - D-Secure Tech Manual',
    description: 'Data erasure verification methods and validation techniques.',
    keywords: generateKeywords(['verification', 'validation methods', 'verify erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-methods'),
  },

  'support/manual/compliance': {
    title: 'Compliance Standards - D-Secure Tech Manual',
    description: 'Compliance with GDPR, HIPAA, PCI DSS, and other regulations.',
    keywords: generateKeywords(['compliance', 'regulatory standards', 'data protection']),
    canonicalUrl: getCanonicalUrl('/support/manual/compliance'),
  },

  'support/manual/nist-800-88': {
    title: 'NIST 800-88 Guidelines - D-Secure Tech Manual',
    description: 'Complete guide to NIST 800-88 media sanitization guidelines.',
    keywords: generateKeywords(['NIST 800-88', 'NIST guidelines', 'sanitization standards']),
    canonicalUrl: getCanonicalUrl('/support/manual/nist-800-88'),
  },

  // Cryptographic & Physical Destruction
  'support/manual/cryptographic-erasure': {
    title: 'Cryptographic Erasure - D-Secure Tech Manual',
    description: 'Cryptographic erasure methods using encryption key destruction.',
    keywords: generateKeywords(['cryptographic erasure', 'crypto wipe', 'key destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/cryptographic-erasure'),
  },

  'support/manual/physical-destruction': {
    title: 'Physical Destruction Methods - D-Secure Tech Manual',
    description: 'Physical destruction methods for data storage devices.',
    keywords: generateKeywords(['physical destruction', 'device shredding', 'hardware destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/physical-destruction'),
  },

  // Overwrite Patterns
  'support/manual/overwrite-patterns': {
    title: 'Overwrite Patterns - D-Secure Tech Manual',
    description: 'Data overwrite patterns including DoD, NIST, and Gutmann.',
    keywords: generateKeywords(['overwrite patterns', 'wiping patterns', 'sanitization methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/overwrite-patterns'),
  },

  'support/manual/dod-3pass': {
    title: 'DoD 3-Pass Wipe - D-Secure Tech Manual',
    description: 'DoD 5220.22-M 3-pass data wiping standard.',
    keywords: generateKeywords(['DoD 3-pass', 'DoD standard', '3-pass wipe']),
    canonicalUrl: getCanonicalUrl('/support/manual/dod-3pass'),
  },

  'support/manual/dod-7pass': {
    title: 'DoD 7-Pass Wipe - D-Secure Tech Manual',
    description: 'DoD 5220.22-M 7-pass data wiping standard.',
    keywords: generateKeywords(['DoD 7-pass', 'DoD standard', '7-pass wipe']),
    canonicalUrl: getCanonicalUrl('/support/manual/dod-7pass'),
  },

  // Performance & Troubleshooting
  'support/manual/performance-optimization': {
    title: 'Performance Optimization - D-Secure Tech Manual',
    description: 'Optimize D-Secure Tech performance for faster data erasure.',
    keywords: generateKeywords(['performance', 'optimization', 'speed improvement']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance-optimization'),
  },

  'support/manual/common-issues': {
    title: 'Common Issues & Solutions - D-Secure Tech Manual',
    description: 'Common problems and their solutions in D-Secure Tech.',
    keywords: generateKeywords(['common issues', 'troubleshooting', 'problem solving']),
    canonicalUrl: getCanonicalUrl('/support/manual/common-issues'),
  },

  'support/manual/error-codes': {
    title: 'Error Codes Reference - D-Secure Tech Manual',
    description: 'Complete reference of error codes and their meanings.',
    keywords: generateKeywords(['error codes', 'error reference', 'error messages']),
    canonicalUrl: getCanonicalUrl('/support/manual/error-codes'),
  },

  // Support Manual Pages - Linux
  'support/manual/linux': {
    title: 'Linux Data Erasure Guide - Complete Manual | D-Secure Tech',
    description: 'Complete guide to data erasure on Linux systems and distributions.',
    keywords: generateKeywords(['Linux erasure', 'Linux wiping', 'Linux data destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux'),
  },

  'support/manual/linux-introduction': {
    title: 'Linux Data Erasure Introduction | D-Secure Tech Manual',
    description: 'Introduction to data erasure on Linux distributions.',
    keywords: generateKeywords(['Linux intro', 'Linux basics', 'Linux erasure overview']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-introduction'),
  },

  'support/manual/linux-filesystems': {
    title: 'Linux Filesystems & Erasure | D-Secure Tech Manual',
    description: 'Understanding Linux filesystems (ext4, XFS, Btrfs) for data erasure.',
    keywords: generateKeywords(['Linux filesystems', 'ext4', 'XFS', 'Btrfs erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-filesystems'),
  },

  'support/manual/linux-command-line': {
    title: 'Linux Command Line Erasure | D-Secure Tech Manual',
    description: 'Command-line data erasure on Linux using dd, shred, and wipe.',
    keywords: generateKeywords(['Linux CLI', 'dd command', 'shred command', 'Linux terminal']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-command-line'),
  },

  'support/manual/linux-builtin-tools': {
    title: 'Linux Built-in Erasure Tools | D-Secure Tech Manual',
    description: 'Using Linux native tools for data erasure.',
    keywords: generateKeywords(['Linux tools', 'native tools', 'built-in erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-builtin-tools'),
  },

  'support/manual/linux-third-party': {
    title: 'Third-Party Linux Erasure Tools | D-Secure Tech Manual',
    description: 'Professional third-party data erasure tools for Linux.',
    keywords: generateKeywords(['Linux third-party', 'erasure software', 'Linux apps']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-third-party'),
  },

  'support/manual/linux-preparation': {
    title: 'Linux Erasure Preparation | D-Secure Tech Manual',
    description: 'Prepare Linux systems for data erasure.',
    keywords: generateKeywords(['Linux prep', 'preparation steps', 'pre-wipe Linux']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-preparation'),
  },

  'support/manual/linux-storage': {
    title: 'Linux Storage & Data Erasure | D-Secure Tech Manual',
    description: 'Understanding Linux storage for effective erasure.',
    keywords: generateKeywords(['Linux storage', 'Linux drives', 'storage management']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-storage'),
  },

  'support/manual/linux-crypto-erasure': {
    title: 'Linux Cryptographic Erasure | D-Secure Tech Manual',
    description: 'Cryptographic erasure on Linux using LUKS encryption.',
    keywords: generateKeywords(['LUKS', 'Linux crypto', 'encryption erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-crypto-erasure'),
  },

  'support/manual/linux-verification': {
    title: 'Linux Erasure Verification | D-Secure Tech Manual',
    description: 'Verify data erasure on Linux systems.',
    keywords: generateKeywords(['Linux verification', 'verify erasure', 'validation']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-verification'),
  },

  'support/manual/linux-troubleshooting': {
    title: 'Linux Erasure Troubleshooting | D-Secure Tech Manual',
    description: 'Troubleshoot Linux data erasure issues.',
    keywords: generateKeywords(['Linux troubleshooting', 'fix issues', 'Linux errors']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-troubleshooting'),
  },

  'support/manual/linux-best-practices': {
    title: 'Linux Erasure Best Practices | D-Secure Tech Manual',
    description: 'Best practices for data erasure on Linux.',
    keywords: generateKeywords(['Linux best practices', 'Linux tips', 'erasure guidelines']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-best-practices'),
  },

  'support/manual/linux-enterprise': {
    title: 'Linux Enterprise Erasure | D-Secure Tech Manual',
    description: 'Enterprise-scale data erasure for Linux environments.',
    keywords: generateKeywords(['enterprise Linux', 'bulk erasure', 'Linux deployment']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-enterprise'),
  },

  'support/manual/linux-compliance': {
    title: 'Linux Compliance Erasure | D-Secure Tech Manual',
    description: 'Compliance-focused data erasure for Linux systems.',
    keywords: generateKeywords(['Linux compliance', 'regulatory erasure', 'compliant wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-compliance'),
  },

  'support/manual/linux-ssd-erasure': {
    title: 'Linux SSD Erasure Guide | D-Secure Tech Manual',
    description: 'Specialized guide for erasing SSDs on Linux.',
    keywords: generateKeywords(['Linux SSD', 'SSD erasure', 'solid state Linux']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-ssd-erasure'),
  },

  'support/manual/linux-luks': {
    title: 'LUKS Encryption & Linux Erasure | D-Secure Tech Manual',
    description: 'Using LUKS encryption for cryptographic erasure on Linux.',
    keywords: generateKeywords(['LUKS', 'Linux encryption', 'crypto erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-luks'),
  },

  'support/manual/linux-raid-volumes': {
    title: 'Linux RAID Volumes Erasure | D-Secure Tech Manual',
    description: 'Erasing RAID volumes and LVM on Linux systems.',
    keywords: generateKeywords(['RAID erasure', 'LVM erasure', 'Linux volumes']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-raid-volumes'),
  },

  'support/manual/linux-bootable-media': {
    title: 'Linux Bootable Media Erasure | D-Secure Tech Manual',
    description: 'Creating and using bootable media for Linux erasure.',
    keywords: generateKeywords(['bootable Linux', 'live USB', 'boot media']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-bootable-media'),
  },

  'support/manual/linux-scripting': {
    title: 'Linux Scripting for Erasure Automation | D-Secure Tech Manual',
    description: 'Automating data erasure with Linux scripts.',
    keywords: generateKeywords(['Linux scripting', 'bash automation', 'erasure scripts']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-scripting'),
  },

  'support/manual/linux-distributions': {
    title: 'Linux Distributions & Erasure | D-Secure Tech Manual',
    description: 'Data erasure across different Linux distributions.',
    keywords: generateKeywords(['Linux distros', 'Ubuntu', 'CentOS', 'Red Hat erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-distributions'),
  },

  'support/manual/linux-resources': {
    title: 'Linux Erasure Resources | D-Secure Tech Manual',
    description: 'Additional resources for Linux data erasure.',
    keywords: generateKeywords(['Linux resources', 'erasure references', 'additional help']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-resources'),
  },

  'support/manual/linux-faq': {
    title: 'Linux Erasure FAQ | D-Secure Tech Manual',
    description: 'Frequently asked questions about Linux data erasure.',
    keywords: generateKeywords(['Linux FAQ', 'Linux questions', 'common issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/linux-faq'),
  },

  // Security & Audit Pages
  'support/manual/security-features': {
    title: 'Security Features - D-Secure Tech Manual',
    description: 'Comprehensive security features and data protection capabilities.',
    keywords: generateKeywords(['security features', 'data protection', 'secure erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/security-features'),
  },

  'support/manual/audit-trails': {
    title: 'Audit Trails & Logging - D-Secure Tech Manual',
    description: 'Audit trails, logging, and compliance reporting.',
    keywords: generateKeywords(['audit trails', 'logging', 'audit logs', 'compliance tracking']),
    canonicalUrl: getCanonicalUrl('/support/manual/audit-trails'),
  },

  'support/manual/certificate-generation': {
    title: 'Certificate Generation - D-Secure Tech Manual',
    description: 'Generate compliance certificates and erasure documentation.',
    keywords: generateKeywords(['certificates', 'compliance docs', 'erasure certificates']),
    canonicalUrl: getCanonicalUrl('/support/manual/certificate-generation'),
  },

  // Reporting & Analytics
  'support/manual/reporting': {
    title: 'Reporting & Analytics - D-Secure Tech Manual',
    description: 'Generate reports and analyze erasure statistics.',
    keywords: generateKeywords(['reporting', 'analytics', 'erasure reports', 'statistics']),
    canonicalUrl: getCanonicalUrl('/support/manual/reporting'),
  },

  'support/manual/export-reports': {
    title: 'Export Reports - D-Secure Tech Manual',
    description: 'Export erasure reports in various formats (PDF, CSV, Excel).',
    keywords: generateKeywords(['export reports', 'PDF reports', 'CSV export']),
    canonicalUrl: getCanonicalUrl('/support/manual/export-reports'),
  },

  // Advanced Features
  'support/manual/advanced-settings': {
    title: 'Advanced Settings - D-Secure Tech Manual',
    description: 'Configure advanced settings and options.',
    keywords: generateKeywords(['advanced settings', 'configuration', 'advanced options']),
    canonicalUrl: getCanonicalUrl('/support/manual/advanced-settings'),
  },

  'support/manual/batch-operations': {
    title: 'Batch Operations - D-Secure Tech Manual',
    description: 'Perform batch erasure operations on multiple devices.',
    keywords: generateKeywords(['batch erasure', 'bulk operations', 'multiple devices']),
    canonicalUrl: getCanonicalUrl('/support/manual/batch-operations'),
  },

  'support/manual/automation': {
    title: 'Automation & Scheduling - D-Secure Tech Manual',
    description: 'Automate erasure tasks with scheduling and workflows.',
    keywords: generateKeywords(['automation', 'scheduling', 'automated erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/automation'),
  },

  'support/manual/remote-erasure': {
    title: 'Remote Erasure - D-Secure Tech Manual',
    description: 'Perform remote data erasure on distributed devices.',
    keywords: generateKeywords(['remote erasure', 'remote wiping', 'distributed erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/remote-erasure'),
  },

  'support/manual/api-integration': {
    title: 'API Integration - D-Secure Tech Manual',
    description: 'Integrate D-Secure Tech with third-party systems via API.',
    keywords: generateKeywords(['API', 'integration', 'API documentation', 'third-party']),
    canonicalUrl: getCanonicalUrl('/support/manual/api-integration'),
  },

  // Device-Specific Pages
  'support/manual/mobile-devices': {
    title: 'Mobile Devices Erasure - D-Secure Tech Manual',
    description: 'Data erasure for mobile devices and smartphones.',
    keywords: generateKeywords(['mobile erasure', 'smartphone wiping', 'mobile devices']),
    canonicalUrl: getCanonicalUrl('/support/manual/mobile-devices'),
  },

  'support/manual/servers': {
    title: 'Server Erasure - D-Secure Tech Manual',
    description: 'Data erasure for servers and enterprise hardware.',
    keywords: generateKeywords(['server erasure', 'enterprise servers', 'server wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/servers'),
  },

  'support/manual/virtual-machines': {
    title: 'Virtual Machine Erasure - D-Secure Tech Manual',
    description: 'Erasing data from virtual machines and cloud instances.',
    keywords: generateKeywords(['VM erasure', 'virtual machines', 'cloud erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/virtual-machines'),
  },

  'support/manual/network-storage': {
    title: 'Network Storage Erasure - D-Secure Tech Manual',
    description: 'Erasing network-attached storage (NAS) and SANs.',
    keywords: generateKeywords(['NAS erasure', 'network storage', 'SAN wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/network-storage'),
  },

  // Support & Resources
  'support/manual/getting-help': {
    title: 'Getting Help - D-Secure Tech Manual',
    description: 'How to get support and assistance with D-Secure Tech.',
    keywords: generateKeywords(['getting help', 'support', 'customer service']),
    canonicalUrl: getCanonicalUrl('/support/manual/getting-help'),
  },

  'support/manual/video-tutorials': {
    title: 'Video Tutorials - D-Secure Tech Manual',
    description: 'Watch video tutorials for D-Secure Tech features.',
    keywords: generateKeywords(['video tutorials', 'training videos', 'how-to videos']),
    canonicalUrl: getCanonicalUrl('/support/manual/video-tutorials'),
  },

  'support/manual/glossary': {
    title: 'Glossary - D-Secure Tech Manual',
    description: 'Glossary of data erasure and security terms.',
    keywords: generateKeywords(['glossary', 'terminology', 'definitions']),
    canonicalUrl: getCanonicalUrl('/support/manual/glossary'),
  },

  'support/manual/updates': {
    title: 'Software Updates - D-Secure Tech Manual',
    description: 'Update D-Secure Tech software and manage versions.',
    keywords: generateKeywords(['software updates', 'version updates', 'update guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/updates'),
  },

  'support/manual/release-notes': {
    title: 'Release Notes - D-Secure Tech Manual',
    description: 'Latest release notes and version history.',
    keywords: generateKeywords(['release notes', 'version history', 'changelog']),
    canonicalUrl: getCanonicalUrl('/support/manual/release-notes'),
  },

  // Additional Technical Pages
  'support/manual/ssd-technology': {
    title: 'SSD Technology & Erasure - D-Secure Tech Manual',
    description: 'Understanding SSD technology for effective data erasure.',
    keywords: generateKeywords(['SSD technology', 'solid state drives', 'SSD erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/ssd-technology'),
  },

  'support/manual/hdd-technology': {
    title: 'HDD Technology & Erasure - D-Secure Tech Manual',
    description: 'Understanding hard disk drive technology for data erasure.',
    keywords: generateKeywords(['HDD technology', 'hard drives', 'HDD erasure']),
    canonicalUrl: getCanonicalUrl('/support/manual/hdd-technology'),
  },

  'support/manual/nvme-drives': {
    title: 'NVMe Drives Erasure - D-Secure Tech Manual',
    description: 'Data erasure for NVMe solid-state drives.',
    keywords: generateKeywords(['NVMe', 'NVMe erasure', 'NVMe drives']),
    canonicalUrl: getCanonicalUrl('/support/manual/nvme-drives'),
  },

  'support/manual/trim-support': {
    title: 'TRIM Support & SSD Erasure - D-Secure Tech Manual',
    description: 'Understanding TRIM command and its impact on SSD erasure.',
    keywords: generateKeywords(['TRIM', 'TRIM command', 'SSD optimization']),
    canonicalUrl: getCanonicalUrl('/support/manual/trim-support'),
  },

  'support/manual/wear-leveling': {
    title: 'Wear Leveling & SSD Erasure - D-Secure Tech Manual',
    description: 'Understanding wear leveling in SSDs and erasure implications.',
    keywords: generateKeywords(['wear leveling', 'SSD wear', 'flash memory']),
    canonicalUrl: getCanonicalUrl('/support/manual/wear-leveling'),
  },

  'support/manual/secure-erase': {
    title: 'ATA Secure Erase - D-Secure Tech Manual',
    description: 'Using ATA Secure Erase command for drive sanitization.',
    keywords: generateKeywords(['Secure Erase', 'ATA command', 'drive sanitization']),
    canonicalUrl: getCanonicalUrl('/support/manual/secure-erase'),
  },

  'support/manual/sanitize-command': {
    title: 'Sanitize Command - D-Secure Tech Manual',
    description: 'Using Sanitize command for modern drive erasure.',
    keywords: generateKeywords(['Sanitize', 'Sanitize command', 'drive sanitization']),
    canonicalUrl: getCanonicalUrl('/support/manual/sanitize-command'),
  },

  // Additional Standards & Regulations
  'support/manual/gdpr-compliance': {
    title: 'GDPR Compliance - D-Secure Tech Manual',
    description: 'GDPR compliance for data erasure and privacy.',
    keywords: generateKeywords(['GDPR', 'GDPR compliance', 'data privacy']),
    canonicalUrl: getCanonicalUrl('/support/manual/gdpr-compliance'),
  },

  'support/manual/hipaa-compliance': {
    title: 'HIPAA Compliance - D-Secure Tech Manual',
    description: 'HIPAA compliance for healthcare data erasure.',
    keywords: generateKeywords(['HIPAA', 'HIPAA compliance', 'healthcare data']),
    canonicalUrl: getCanonicalUrl('/support/manual/hipaa-compliance'),
  },

  'support/manual/pci-dss': {
    title: 'PCI DSS Compliance - D-Secure Tech Manual',
    description: 'PCI DSS compliance for payment card data erasure.',
    keywords: generateKeywords(['PCI DSS', 'payment card', 'PCI compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/pci-dss'),
  },

  'support/manual/iso-standards': {
    title: 'ISO Standards & Data Erasure - D-Secure Tech Manual',
    description: 'ISO standards for data sanitization and security.',
    keywords: generateKeywords(['ISO standards', 'ISO compliance', 'international standards']),
    canonicalUrl: getCanonicalUrl('/support/manual/iso-standards'),
  },

  // Help Manual Pages
  'support/help-manual/complete-manual': {
    title: 'Complete Manual - D-Secure Tech Help Guide',
    description: 'Comprehensive manual covering all aspects of D-Secure Tech software.',
    keywords: generateKeywords(['complete manual', 'full guide', 'comprehensive documentation']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/complete-manual'),
  },

  'support/help-manual/complete-network-manual': {
    title: 'Network Manual - D-Secure Tech Help Guide',
    description: 'Complete network erasure and configuration manual.',
    keywords: generateKeywords(['network manual', 'network erasure', 'network guide']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/complete-network-manual'),
  },

  'support/help-manual/faqs': {
    title: 'FAQs - D-Secure Tech Help Manual',
    description: 'Frequently asked questions about D-Secure Tech software.',
    keywords: generateKeywords(['FAQs', 'help questions', 'common questions']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/faqs'),
  },

  'support/help-manual/network-file': {
    title: 'Network File Operations - D-Secure Tech Help',
    description: 'Network file erasure and management operations.',
    keywords: generateKeywords(['network files', 'file operations', 'network management']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/network-file'),
  },

  'support/help-manual/report-management': {
    title: 'Report Management - D-Secure Tech Help',
    description: 'Manage, generate, and export erasure reports.',
    keywords: generateKeywords(['report management', 'manage reports', 'report generation']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/report-management'),
  },

  'support/help-manual/schedule-settings': {
    title: 'Schedule Settings - D-Secure Tech Help',
    description: 'Configure scheduled erasure tasks and automation.',
    keywords: generateKeywords(['schedule settings', 'task scheduling', 'automation settings']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/schedule-settings'),
  },

  'support/help-manual/working-guide': {
    title: 'Working Guide - D-Secure Tech Help Manual',
    description: 'Step-by-step working guide for D-Secure Tech operations.',
    keywords: generateKeywords(['working guide', 'operation guide', 'step-by-step']),
    canonicalUrl: getCanonicalUrl('/support/help-manual/working-guide'),
  },

  // Additional Manual Pages - Part 1
  'support/manual/access-verification': {
    title: 'Access Verification - D-Secure Tech Manual',
    description: 'Verify access permissions and user authentication.',
    keywords: generateKeywords(['access verification', 'user access', 'authentication']),
    canonicalUrl: getCanonicalUrl('/support/manual/access-verification'),
  },

  'support/manual/activation-key': {
    title: 'Activation Key - D-Secure Tech Manual',
    description: 'Activate your software license with activation key.',
    keywords: generateKeywords(['activation key', 'license key', 'software activation']),
    canonicalUrl: getCanonicalUrl('/support/manual/activation-key'),
  },

  'support/manual/audit-preparation': {
    title: 'Audit Preparation - D-Secure Tech Manual',
    description: 'Prepare for compliance audits and documentation reviews.',
    keywords: generateKeywords(['audit preparation', 'audit readiness', 'compliance audit']),
    canonicalUrl: getCanonicalUrl('/support/manual/audit-preparation'),
  },

  'support/manual/audit-verification': {
    title: 'Audit Verification - D-Secure Tech Manual',
    description: 'Verify audit trails and compliance documentation.',
    keywords: generateKeywords(['audit verification', 'verify audit', 'audit validation']),
    canonicalUrl: getCanonicalUrl('/support/manual/audit-verification'),
  },

  'support/manual/auto-updates': {
    title: 'Auto Updates - D-Secure Tech Manual',
    description: 'Configure automatic software updates and patch management.',
    keywords: generateKeywords(['auto updates', 'automatic updates', 'update settings']),
    canonicalUrl: getCanonicalUrl('/support/manual/auto-updates'),
  },

  'support/manual/banking-finance': {
    title: 'Banking & Finance Solutions - D-Secure Tech Manual',
    description: 'Data erasure solutions for banking and financial institutions.',
    keywords: generateKeywords(['banking erasure', 'financial sector', 'banking compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/banking-finance'),
  },

  'support/manual/banking-mode': {
    title: 'Banking Mode - D-Secure Tech Manual',
    description: 'Special banking mode for financial sector compliance.',
    keywords: generateKeywords(['banking mode', 'financial mode', 'secure banking']),
    canonicalUrl: getCanonicalUrl('/support/manual/banking-mode'),
  },

  'support/manual/best-practices': {
    title: 'Best Practices - D-Secure Tech Manual',
    description: 'Industry best practices for data erasure and security.',
    keywords: generateKeywords(['best practices', 'erasure guidelines', 'security practices']),
    canonicalUrl: getCanonicalUrl('/support/manual/best-practices'),
  },

  'support/manual/bitraser-integration': {
    title: 'BitRaser Integration - D-Secure Tech Manual',
    description: 'Integration with BitRaser and third-party erasure tools.',
    keywords: generateKeywords(['BitRaser', 'integration', 'third-party tools']),
    canonicalUrl: getCanonicalUrl('/support/manual/bitraser-integration'),
  },

  'support/manual/certificate-destruction': {
    title: 'Certificate of Destruction - D-Secure Tech Manual',
    description: 'Generate certificates of destruction for compliance.',
    keywords: generateKeywords(['destruction certificate', 'compliance certificate', 'proof of destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/certificate-destruction'),
  },

  'support/manual/certificates': {
    title: 'Certificates - D-Secure Tech Manual',
    description: 'Erasure certificates and compliance documentation.',
    keywords: generateKeywords(['certificates', 'erasure certificates', 'compliance docs']),
    canonicalUrl: getCanonicalUrl('/support/manual/certificates'),
  },

  'support/manual/chain-custody': {
    title: 'Chain of Custody - D-Secure Tech Manual',
    description: 'Maintain chain of custody for audit compliance.',
    keywords: generateKeywords(['chain of custody', 'custody tracking', 'audit trail']),
    canonicalUrl: getCanonicalUrl('/support/manual/chain-custody'),
  },

  'support/manual/cloud-console': {
    title: 'Cloud Console - D-Secure Tech Manual',
    description: 'Access and manage cloud-based erasure console.',
    keywords: generateKeywords(['cloud console', 'cloud management', 'cloud platform']),
    canonicalUrl: getCanonicalUrl('/support/manual/cloud-console'),
  },

  'support/manual/comparison-table': {
    title: 'Comparison Table - D-Secure Tech Manual',
    description: 'Compare erasure methods, standards, and features.',
    keywords: generateKeywords(['comparison table', 'feature comparison', 'method comparison']),
    canonicalUrl: getCanonicalUrl('/support/manual/comparison-table'),
  },

  'support/manual/compliance-export': {
    title: 'Compliance Export - D-Secure Tech Manual',
    description: 'Export compliance reports and documentation.',
    keywords: generateKeywords(['compliance export', 'export reports', 'compliance documentation']),
    canonicalUrl: getCanonicalUrl('/support/manual/compliance-export'),
  },

  'support/manual/crushing-method': {
    title: 'Crushing Method - D-Secure Tech Manual',
    description: 'Physical crushing method for device destruction.',
    keywords: generateKeywords(['crushing method', 'physical crushing', 'device crushing']),
    canonicalUrl: getCanonicalUrl('/support/manual/crushing-method'),
  },

  'support/manual/crypto-benefits': {
    title: 'Cryptographic Erasure Benefits - D-Secure Tech Manual',
    description: 'Benefits of cryptographic erasure over traditional methods.',
    keywords: generateKeywords(['crypto benefits', 'encryption benefits', 'crypto advantages']),
    canonicalUrl: getCanonicalUrl('/support/manual/crypto-benefits'),
  },

  'support/manual/crypto-importance': {
    title: 'Importance of Cryptographic Erasure - D-Secure Tech Manual',
    description: 'Why cryptographic erasure is critical for modern storage.',
    keywords: generateKeywords(['crypto importance', 'encryption importance', 'why crypto']),
    canonicalUrl: getCanonicalUrl('/support/manual/crypto-importance'),
  },

  'support/manual/crypto-process': {
    title: 'Cryptographic Erasure Process - D-Secure Tech Manual',
    description: 'Step-by-step cryptographic erasure process and workflow.',
    keywords: generateKeywords(['crypto process', 'encryption process', 'erasure workflow']),
    canonicalUrl: getCanonicalUrl('/support/manual/crypto-process'),
  },

  'support/manual/crypto-verification': {
    title: 'Cryptographic Erasure Verification - D-Secure Tech Manual',
    description: 'Verify cryptographic erasure completion and effectiveness.',
    keywords: generateKeywords(['crypto verification', 'verify encryption', 'crypto validation']),
    canonicalUrl: getCanonicalUrl('/support/manual/crypto-verification'),
  },

  'support/manual/custom-algorithms': {
    title: 'Custom Algorithms - D-Secure Tech Manual',
    description: 'Create and use custom erasure algorithms.',
    keywords: generateKeywords(['custom algorithms', 'custom patterns', 'algorithm creation']),
    canonicalUrl: getCanonicalUrl('/support/manual/custom-algorithms'),
  },

  'support/manual/custom-configs': {
    title: 'Custom Configurations - D-Secure Tech Manual',
    description: 'Configure custom settings and preferences.',
    keywords: generateKeywords(['custom configs', 'custom settings', 'configuration']),
    canonicalUrl: getCanonicalUrl('/support/manual/custom-configs'),
  },

  'support/manual/custom-configurations': {
    title: 'Custom Configuration Options - D-Secure Tech Manual',
    description: 'Advanced custom configuration options and settings.',
    keywords: generateKeywords(['custom configuration', 'advanced settings', 'config options']),
    canonicalUrl: getCanonicalUrl('/support/manual/custom-configurations'),
  },

  'support/manual/custom-dashboards': {
    title: 'Custom Dashboards - D-Secure Tech Manual',
    description: 'Create and customize dashboards for your workflow.',
    keywords: generateKeywords(['custom dashboards', 'dashboard customization', 'personalized dashboard']),
    canonicalUrl: getCanonicalUrl('/support/manual/custom-dashboards'),
  },

  'support/manual/degaussing-method': {
    title: 'Degaussing Method - D-Secure Tech Manual',
    description: 'Degaussing method for magnetic media destruction.',
    keywords: generateKeywords(['degaussing', 'magnetic erasure', 'degausser']),
    canonicalUrl: getCanonicalUrl('/support/manual/degaussing-method'),
  },

  'support/manual/destruction-quality': {
    title: 'Destruction Quality Assurance - D-Secure Tech Manual',
    description: 'Ensure quality and effectiveness of physical destruction.',
    keywords: generateKeywords(['destruction quality', 'quality assurance', 'destruction effectiveness']),
    canonicalUrl: getCanonicalUrl('/support/manual/destruction-quality'),
  },

  'support/manual/destruction-standards': {
    title: 'Destruction Standards - D-Secure Tech Manual',
    description: 'Physical destruction standards and compliance requirements.',
    keywords: generateKeywords(['destruction standards', 'physical standards', 'destruction compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/destruction-standards'),
  },

  'support/manual/destruction-use-cases': {
    title: 'Destruction Use Cases - D-Secure Tech Manual',
    description: 'Common use cases for physical device destruction.',
    keywords: generateKeywords(['destruction use cases', 'physical destruction', 'use case scenarios']),
    canonicalUrl: getCanonicalUrl('/support/manual/destruction-use-cases'),
  },

  'support/manual/device-selection': {
    title: 'Device Selection - D-Secure Tech Manual',
    description: 'Select and manage devices for erasure operations.',
    keywords: generateKeywords(['device selection', 'select devices', 'device management']),
    canonicalUrl: getCanonicalUrl('/support/manual/device-selection'),
  },

  'support/manual/dod-standards': {
    title: 'DoD Standards - D-Secure Tech Manual',
    description: 'Department of Defense data sanitization standards.',
    keywords: generateKeywords(['DoD standards', 'DoD 5220.22-M', 'military standards']),
    canonicalUrl: getCanonicalUrl('/support/manual/dod-standards'),
  },

  'support/manual/download-installer': {
    title: 'Download Installer - D-Secure Tech Manual',
    description: 'Download D-Secure Tech software installer.',
    keywords: generateKeywords(['download installer', 'software download', 'installer download']),
    canonicalUrl: getCanonicalUrl('/support/manual/download-installer'),
  },

  'support/manual/enterprise-benefits': {
    title: 'Enterprise Benefits - D-Secure Tech Manual',
    description: 'Benefits of enterprise-scale data erasure solutions.',
    keywords: generateKeywords(['enterprise benefits', 'business benefits', 'enterprise advantages']),
    canonicalUrl: getCanonicalUrl('/support/manual/enterprise-benefits'),
  },

  'support/manual/enterprise-integration': {
    title: 'Enterprise Integration - D-Secure Tech Manual',
    description: 'Integrate with enterprise systems and workflows.',
    keywords: generateKeywords(['enterprise integration', 'system integration', 'workflow integration']),
    canonicalUrl: getCanonicalUrl('/support/manual/enterprise-integration'),
  },

  'support/manual/environmental-considerations': {
    title: 'Environmental Considerations - D-Secure Tech Manual',
    description: 'Environmental impact and sustainability considerations.',
    keywords: generateKeywords(['environmental impact', 'sustainability', 'eco-friendly']),
    canonicalUrl: getCanonicalUrl('/support/manual/environmental-considerations'),
  },

  'support/manual/environmental-impact': {
    title: 'Environmental Impact - D-Secure Tech Manual',
    description: 'Assess environmental impact of data destruction methods.',
    keywords: generateKeywords(['environmental impact', 'carbon footprint', 'eco impact']),
    canonicalUrl: getCanonicalUrl('/support/manual/environmental-impact'),
  },

  'support/manual/erasure-preferences': {
    title: 'Erasure Preferences - D-Secure Tech Manual',
    description: 'Configure erasure preferences and default settings.',
    keywords: generateKeywords(['erasure preferences', 'preferences settings', 'default settings']),
    canonicalUrl: getCanonicalUrl('/support/manual/erasure-preferences'),
  },

  'support/manual/erasure-process': {
    title: 'Erasure Process - D-Secure Tech Manual',
    description: 'Complete data erasure process workflow and steps.',
    keywords: generateKeywords(['erasure process', 'erasure workflow', 'process steps']),
    canonicalUrl: getCanonicalUrl('/support/manual/erasure-process'),
  },

  'support/manual/erasure-reports': {
    title: 'Erasure Reports - D-Secure Tech Manual',
    description: 'Generate and manage detailed erasure reports.',
    keywords: generateKeywords(['erasure reports', 'report generation', 'detailed reports']),
    canonicalUrl: getCanonicalUrl('/support/manual/erasure-reports'),
  },

  'support/manual/faqs': {
    title: 'FAQs - D-Secure Tech Manual',
    description: 'Frequently asked questions about data erasure.',
    keywords: generateKeywords(['FAQs', 'frequently asked', 'common questions']),
    canonicalUrl: getCanonicalUrl('/support/manual/faqs'),
  },

  'support/manual/financial-verification': {
    title: 'Financial Verification - D-Secure Tech Manual',
    description: 'Verification procedures for financial sector compliance.',
    keywords: generateKeywords(['financial verification', 'financial compliance', 'banking verification']),
    canonicalUrl: getCanonicalUrl('/support/manual/financial-verification'),
  },

  'support/manual/firewall-config': {
    title: 'Firewall Configuration - D-Secure Tech Manual',
    description: 'Configure firewall settings for D-Secure Tech.',
    keywords: generateKeywords(['firewall config', 'firewall settings', 'network security']),
    canonicalUrl: getCanonicalUrl('/support/manual/firewall-config'),
  },

  'support/manual/firewall-setup': {
    title: 'Firewall Setup - D-Secure Tech Manual',
    description: 'Set up firewall rules and network security.',
    keywords: generateKeywords(['firewall setup', 'network setup', 'security configuration']),
    canonicalUrl: getCanonicalUrl('/support/manual/firewall-setup'),
  },

  'support/manual/first-run': {
    title: 'First Run Guide - D-Secure Tech Manual',
    description: 'First run wizard and initial configuration guide.',
    keywords: generateKeywords(['first run', 'initial setup', 'first launch']),
    canonicalUrl: getCanonicalUrl('/support/manual/first-run'),
  },

  'support/manual/first-scan': {
    title: 'First Scan - D-Secure Tech Manual',
    description: 'Perform your first device scan and discovery.',
    keywords: generateKeywords(['first scan', 'initial scan', 'device discovery']),
    canonicalUrl: getCanonicalUrl('/support/manual/first-scan'),
  },

  'support/manual/fragment-verification': {
    title: 'Fragment Verification - D-Secure Tech Manual',
    description: 'Verify data fragment erasure and residual data.',
    keywords: generateKeywords(['fragment verification', 'verify fragments', 'residual data']),
    canonicalUrl: getCanonicalUrl('/support/manual/fragment-verification'),
  },

  'support/manual/future-trends': {
    title: 'Future Trends - D-Secure Tech Manual',
    description: 'Future trends in data erasure and security technology.',
    keywords: generateKeywords(['future trends', 'emerging technology', 'future developments']),
    canonicalUrl: getCanonicalUrl('/support/manual/future-trends'),
  },

  'support/manual/gdpr-verification': {
    title: 'GDPR Verification - D-Secure Tech Manual',
    description: 'Verify GDPR compliance for data erasure.',
    keywords: generateKeywords(['GDPR verification', 'GDPR compliance', 'verify GDPR']),
    canonicalUrl: getCanonicalUrl('/support/manual/gdpr-verification'),
  },

  'support/manual/general-settings': {
    title: 'General Settings - D-Secure Tech Manual',
    description: 'Configure general application settings and preferences.',
    keywords: generateKeywords(['general settings', 'app settings', 'preferences']),
    canonicalUrl: getCanonicalUrl('/support/manual/general-settings'),
  },

  'support/manual/government-defense': {
    title: 'Government & Defense - D-Secure Tech Manual',
    description: 'Data erasure solutions for government and defense sectors.',
    keywords: generateKeywords(['government erasure', 'defense sector', 'government compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/government-defense'),
  },

  'support/manual/government-verification': {
    title: 'Government Verification - D-Secure Tech Manual',
    description: 'Verification procedures for government compliance.',
    keywords: generateKeywords(['government verification', 'defense verification', 'gov compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/government-verification'),
  },

  'support/manual/hardware-sanitization': {
    title: 'Hardware Sanitization - D-Secure Tech Manual',
    description: 'Hardware-based sanitization methods and techniques.',
    keywords: generateKeywords(['hardware sanitization', 'hardware erasure', 'physical sanitization']),
    canonicalUrl: getCanonicalUrl('/support/manual/hardware-sanitization'),
  },

  'support/manual/hdd-destruction': {
    title: 'HDD Destruction - D-Secure Tech Manual',
    description: 'Physical destruction methods for hard disk drives.',
    keywords: generateKeywords(['HDD destruction', 'hard drive destruction', 'disk destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/hdd-destruction'),
  },

  'support/manual/healthcare-destruction': {
    title: 'Healthcare Destruction - D-Secure Tech Manual',
    description: 'Data destruction for healthcare and medical devices.',
    keywords: generateKeywords(['healthcare destruction', 'medical data', 'HIPAA destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/healthcare-destruction'),
  },

  'support/manual/healthcare-verification': {
    title: 'Healthcare Verification - D-Secure Tech Manual',
    description: 'Verification procedures for healthcare compliance.',
    keywords: generateKeywords(['healthcare verification', 'HIPAA verification', 'medical compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/healthcare-verification'),
  },

  'support/manual/implementation-considerations': {
    title: 'Implementation Considerations - D-Secure Tech Manual',
    description: 'Key considerations for implementing data erasure solutions.',
    keywords: generateKeywords(['implementation', 'deployment considerations', 'planning']),
    canonicalUrl: getCanonicalUrl('/support/manual/implementation-considerations'),
  },

  'support/manual/implementation-practices': {
    title: 'Implementation Practices - D-Secure Tech Manual',
    description: 'Best practices for implementing data erasure programs.',
    keywords: generateKeywords(['implementation practices', 'deployment practices', 'best practices']),
    canonicalUrl: getCanonicalUrl('/support/manual/implementation-practices'),
  },

  'support/manual/incineration-method': {
    title: 'Incineration Method - D-Secure Tech Manual',
    description: 'Incineration method for complete device destruction.',
    keywords: generateKeywords(['incineration', 'burning method', 'thermal destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/incineration-method'),
  },

  'support/manual/industry-applications': {
    title: 'Industry Applications - D-Secure Tech Manual',
    description: 'Data erasure applications across different industries.',
    keywords: generateKeywords(['industry applications', 'sector solutions', 'industry use']),
    canonicalUrl: getCanonicalUrl('/support/manual/industry-applications'),
  },

  'support/manual/industry-use-cases': {
    title: 'Industry Use Cases - D-Secure Tech Manual',
    description: 'Real-world use cases across various industries.',
    keywords: generateKeywords(['use cases', 'industry examples', 'real-world applications']),
    canonicalUrl: getCanonicalUrl('/support/manual/industry-use-cases'),
  },

  'support/manual/installation-guide': {
    title: 'Installation Guide - D-Secure Tech Manual',
    description: 'Complete installation guide and setup instructions.',
    keywords: generateKeywords(['installation guide', 'setup guide', 'install instructions']),
    canonicalUrl: getCanonicalUrl('/support/manual/installation-guide'),
  },

  'support/manual/installation-path': {
    title: 'Installation Path - D-Secure Tech Manual',
    description: 'Choose installation path and directory settings.',
    keywords: generateKeywords(['installation path', 'install directory', 'installation location']),
    canonicalUrl: getCanonicalUrl('/support/manual/installation-path'),
  },

  'support/manual/installation-progress': {
    title: 'Installation Progress - D-Secure Tech Manual',
    description: 'Monitor installation progress and status.',
    keywords: generateKeywords(['installation progress', 'install status', 'setup progress']),
    canonicalUrl: getCanonicalUrl('/support/manual/installation-progress'),
  },

  'support/manual/installation-settings': {
    title: 'Installation Settings - D-Secure Tech Manual',
    description: 'Configure installation settings and options.',
    keywords: generateKeywords(['installation settings', 'install options', 'setup configuration']),
    canonicalUrl: getCanonicalUrl('/support/manual/installation-settings'),
  },

  'support/manual/internet-requirements': {
    title: 'Internet Requirements - D-Secure Tech Manual',
    description: 'Internet connectivity requirements and network settings.',
    keywords: generateKeywords(['internet requirements', 'network requirements', 'connectivity']),
    canonicalUrl: getCanonicalUrl('/support/manual/internet-requirements'),
  },

  'support/manual/itad-datacenters': {
    title: 'ITAD & Data Centers - D-Secure Tech Manual',
    description: 'IT Asset Disposition and data center solutions.',
    keywords: generateKeywords(['ITAD', 'data centers', 'asset disposition']),
    canonicalUrl: getCanonicalUrl('/support/manual/itad-datacenters'),
  },

  // Additional Manual Pages - Part 2
  'support/manual/key-activation': {
    title: 'Key Activation - D-Secure Tech Manual',
    description: 'Activate software license using activation key.',
    keywords: generateKeywords(['key activation', 'license key', 'activation process']),
    canonicalUrl: getCanonicalUrl('/support/manual/key-activation'),
  },

  'support/manual/keyboard-shortcuts': {
    title: 'Keyboard Shortcuts - D-Secure Tech Manual',
    description: 'Complete list of keyboard shortcuts and hotkeys.',
    keywords: generateKeywords(['keyboard shortcuts', 'hotkeys', 'shortcuts guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/keyboard-shortcuts'),
  },

  'support/manual/key-destruction-verify': {
    title: 'Key Destruction Verification - D-Secure Tech Manual',
    description: 'Verify encryption key destruction for crypto erasure.',
    keywords: generateKeywords(['key destruction', 'verify keys', 'crypto verification']),
    canonicalUrl: getCanonicalUrl('/support/manual/key-destruction-verify'),
  },

  'support/manual/license-agreement': {
    title: 'License Agreement - D-Secure Tech Manual',
    description: 'Software license agreement and terms of use.',
    keywords: generateKeywords(['license agreement', 'EULA', 'terms of use']),
    canonicalUrl: getCanonicalUrl('/support/manual/license-agreement'),
  },

  'support/manual/license-troubleshooting': {
    title: 'License Troubleshooting - D-Secure Tech Manual',
    description: 'Troubleshoot license activation and validation issues.',
    keywords: generateKeywords(['license troubleshooting', 'activation issues', 'license errors']),
    canonicalUrl: getCanonicalUrl('/support/manual/license-troubleshooting'),
  },

  'support/manual/limitations': {
    title: 'Limitations - D-Secure Tech Manual',
    description: 'Software limitations and technical constraints.',
    keywords: generateKeywords(['limitations', 'constraints', 'technical limits']),
    canonicalUrl: getCanonicalUrl('/support/manual/limitations'),
  },

  'support/manual/mobile': {
    title: 'Mobile Devices - D-Secure Tech Manual',
    description: 'Data erasure for mobile devices and tablets.',
    keywords: generateKeywords(['mobile devices', 'smartphone erasure', 'tablet wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/mobile'),
  },

  'support/manual/mobile-destruction': {
    title: 'Mobile Destruction - D-Secure Tech Manual',
    description: 'Physical destruction methods for mobile devices.',
    keywords: generateKeywords(['mobile destruction', 'smartphone destruction', 'device destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/mobile-destruction'),
  },

  'support/manual/navigation': {
    title: 'Navigation Guide - D-Secure Tech Manual',
    description: 'Navigate through D-Secure Tech interface and features.',
    keywords: generateKeywords(['navigation', 'user interface', 'UI navigation']),
    canonicalUrl: getCanonicalUrl('/support/manual/navigation'),
  },

  'support/manual/nist-guidelines': {
    title: 'NIST Guidelines - D-Secure Tech Manual',
    description: 'NIST 800-88 guidelines and compliance implementation.',
    keywords: generateKeywords(['NIST guidelines', 'NIST 800-88', 'NIST compliance']),
    canonicalUrl: getCanonicalUrl('/support/manual/nist-guidelines'),
  },

  'support/manual/nist-modern-storage': {
    title: 'NIST Modern Storage - D-Secure Tech Manual',
    description: 'NIST guidelines for modern storage technologies.',
    keywords: generateKeywords(['NIST storage', 'modern storage', 'NIST SSD']),
    canonicalUrl: getCanonicalUrl('/support/manual/nist-modern-storage'),
  },

  'support/manual/onsite-offsite': {
    title: 'Onsite & Offsite Erasure - D-Secure Tech Manual',
    description: 'Onsite and offsite data erasure services and procedures.',
    keywords: generateKeywords(['onsite erasure', 'offsite erasure', 'erasure services']),
    canonicalUrl: getCanonicalUrl('/support/manual/onsite-offsite'),
  },

  'support/manual/operation-history': {
    title: 'Operation History - D-Secure Tech Manual',
    description: 'View and manage operation history and logs.',
    keywords: generateKeywords(['operation history', 'activity log', 'operation log']),
    canonicalUrl: getCanonicalUrl('/support/manual/operation-history'),
  },

  'support/manual/optical-tape-destruction': {
    title: 'Optical & Tape Destruction - D-Secure Tech Manual',
    description: 'Destruction methods for optical media and magnetic tapes.',
    keywords: generateKeywords(['optical destruction', 'tape destruction', 'media destruction']),
    canonicalUrl: getCanonicalUrl('/support/manual/optical-tape-destruction'),
  },

  'support/manual/overwrite-introduction': {
    title: 'Overwrite Introduction - D-Secure Tech Manual',
    description: 'Introduction to data overwrite methods and patterns.',
    keywords: generateKeywords(['overwrite intro', 'overwrite basics', 'overwrite methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/overwrite-introduction'),
  },

  'support/manual/overwrite-risks': {
    title: 'Overwrite Risks - D-Secure Tech Manual',
    description: 'Understanding risks and limitations of overwrite methods.',
    keywords: generateKeywords(['overwrite risks', 'overwrite limitations', 'wiping risks']),
    canonicalUrl: getCanonicalUrl('/support/manual/overwrite-risks'),
  },

  'support/manual/parental-controls': {
    title: 'Parental Controls - D-Secure Tech Manual',
    description: 'Configure parental controls and access restrictions.',
    keywords: generateKeywords(['parental controls', 'access control', 'user restrictions']),
    canonicalUrl: getCanonicalUrl('/support/manual/parental-controls'),
  },

  'support/manual/pattern-selection': {
    title: 'Pattern Selection - D-Secure Tech Manual',
    description: 'Select appropriate overwrite patterns for erasure.',
    keywords: generateKeywords(['pattern selection', 'choose pattern', 'overwrite pattern']),
    canonicalUrl: getCanonicalUrl('/support/manual/pattern-selection'),
  },

  'support/manual/performance': {
    title: 'Performance Guide - D-Secure Tech Manual',
    description: 'Optimize performance for faster data erasure.',
    keywords: generateKeywords(['performance', 'optimization', 'speed']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance'),
  },

  'support/manual/performance-analysis': {
    title: 'Performance Analysis - D-Secure Tech Manual',
    description: 'Analyze erasure performance metrics and statistics.',
    keywords: generateKeywords(['performance analysis', 'metrics', 'performance stats']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance-analysis'),
  },

  'support/manual/performance-tradeoffs': {
    title: 'Performance Tradeoffs - D-Secure Tech Manual',
    description: 'Understanding performance tradeoffs in data erasure.',
    keywords: generateKeywords(['performance tradeoffs', 'speed vs security', 'optimization balance']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance-tradeoffs'),
  },

  'support/manual/performance-troubleshooting': {
    title: 'Performance Troubleshooting - D-Secure Tech Manual',
    description: 'Troubleshoot performance issues and slowdowns.',
    keywords: generateKeywords(['performance troubleshooting', 'slow performance', 'speed issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance-troubleshooting'),
  },

  'support/manual/performance-tuning': {
    title: 'Performance Tuning - D-Secure Tech Manual',
    description: 'Fine-tune performance settings for optimal speed.',
    keywords: generateKeywords(['performance tuning', 'optimization', 'speed tuning']),
    canonicalUrl: getCanonicalUrl('/support/manual/performance-tuning'),
  },

  'support/manual/physical-destruction-overview': {
    title: 'Physical Destruction Overview - D-Secure Tech Manual',
    description: 'Overview of physical destruction methods and techniques.',
    keywords: generateKeywords(['physical destruction', 'destruction overview', 'physical methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/physical-destruction-overview'),
  },

  'support/manual/physical-inspection': {
    title: 'Physical Inspection - D-Secure Tech Manual',
    description: 'Physical inspection procedures for device verification.',
    keywords: generateKeywords(['physical inspection', 'device inspection', 'visual verification']),
    canonicalUrl: getCanonicalUrl('/support/manual/physical-inspection'),
  },

  'support/manual/post-install-optimization': {
    title: 'Post-Install Optimization - D-Secure Tech Manual',
    description: 'Optimize settings after installation for best performance.',
    keywords: generateKeywords(['post-install', 'optimization', 'setup optimization']),
    canonicalUrl: getCanonicalUrl('/support/manual/post-install-optimization'),
  },

  'support/manual/pre-installation': {
    title: 'Pre-Installation - D-Secure Tech Manual',
    description: 'Pre-installation checklist and system preparation.',
    keywords: generateKeywords(['pre-installation', 'installation prep', 'system preparation']),
    canonicalUrl: getCanonicalUrl('/support/manual/pre-installation'),
  },

  'support/manual/progress-monitoring': {
    title: 'Progress Monitoring - D-Secure Tech Manual',
    description: 'Monitor erasure progress and task status.',
    keywords: generateKeywords(['progress monitoring', 'task monitoring', 'status tracking']),
    canonicalUrl: getCanonicalUrl('/support/manual/progress-monitoring'),
  },

  'support/manual/quickstart': {
    title: 'Quick Start Guide - D-Secure Tech Manual',
    description: 'Quick start guide to get up and running fast.',
    keywords: generateKeywords(['quick start', 'getting started', 'fast setup']),
    canonicalUrl: getCanonicalUrl('/support/manual/quickstart'),
  },

  'support/manual/readback-verification': {
    title: 'Readback Verification - D-Secure Tech Manual',
    description: 'Readback verification methods for erasure validation.',
    keywords: generateKeywords(['readback verification', 'read verification', 'data validation']),
    canonicalUrl: getCanonicalUrl('/support/manual/readback-verification'),
  },

  'support/manual/real-time-monitoring': {
    title: 'Real-Time Monitoring - D-Secure Tech Manual',
    description: 'Real-time monitoring of erasure operations.',
    keywords: generateKeywords(['real-time monitoring', 'live monitoring', 'active tracking']),
    canonicalUrl: getCanonicalUrl('/support/manual/real-time-monitoring'),
  },

  'support/manual/realtime-protection': {
    title: 'Real-Time Protection - D-Secure Tech Manual',
    description: 'Real-time data protection and security features.',
    keywords: generateKeywords(['realtime protection', 'live protection', 'active security']),
    canonicalUrl: getCanonicalUrl('/support/manual/realtime-protection'),
  },

  'support/manual/recovery': {
    title: 'Recovery - D-Secure Tech Manual',
    description: 'Data recovery prevention and secure deletion.',
    keywords: generateKeywords(['data recovery', 'recovery prevention', 'secure deletion']),
    canonicalUrl: getCanonicalUrl('/support/manual/recovery'),
  },

  'support/manual/regulatory-compliance': {
    title: 'Regulatory Compliance - D-Secure Tech Manual',
    description: 'Regulatory compliance requirements and standards.',
    keywords: generateKeywords(['regulatory compliance', 'compliance standards', 'regulations']),
    canonicalUrl: getCanonicalUrl('/support/manual/regulatory-compliance'),
  },

  'support/manual/remote-management': {
    title: 'Remote Management - D-Secure Tech Manual',
    description: 'Remotely manage devices and erasure operations.',
    keywords: generateKeywords(['remote management', 'remote control', 'remote operations']),
    canonicalUrl: getCanonicalUrl('/support/manual/remote-management'),
  },

  'support/manual/sampling-methodology': {
    title: 'Sampling Methodology - D-Secure Tech Manual',
    description: 'Sampling methodologies for verification testing.',
    keywords: generateKeywords(['sampling methodology', 'verification sampling', 'testing methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/sampling-methodology'),
  },

  'support/manual/sanitization-concepts': {
    title: 'Sanitization Concepts - D-Secure Tech Manual',
    description: 'Core concepts of data sanitization and erasure.',
    keywords: generateKeywords(['sanitization concepts', 'erasure concepts', 'data sanitization']),
    canonicalUrl: getCanonicalUrl('/support/manual/sanitization-concepts'),
  },

  'support/manual/scan-exclusions': {
    title: 'Scan Exclusions - D-Secure Tech Manual',
    description: 'Configure scan exclusions and filters.',
    keywords: generateKeywords(['scan exclusions', 'exclusion filters', 'scan settings']),
    canonicalUrl: getCanonicalUrl('/support/manual/scan-exclusions'),
  },

  'support/manual/scan-results': {
    title: 'Scan Results - D-Secure Tech Manual',
    description: 'View and interpret scan results and findings.',
    keywords: generateKeywords(['scan results', 'scan findings', 'scan reports']),
    canonicalUrl: getCanonicalUrl('/support/manual/scan-results'),
  },

  'support/manual/scan-scheduling': {
    title: 'Scan Scheduling - D-Secure Tech Manual',
    description: 'Schedule automated scans and discovery tasks.',
    keywords: generateKeywords(['scan scheduling', 'scheduled scans', 'automation']),
    canonicalUrl: getCanonicalUrl('/support/manual/scan-scheduling'),
  },

  'support/manual/scripting': {
    title: 'Scripting Guide - D-Secure Tech Manual',
    description: 'Scripting and automation guide for advanced users.',
    keywords: generateKeywords(['scripting', 'automation scripts', 'command line']),
    canonicalUrl: getCanonicalUrl('/support/manual/scripting'),
  },

  'support/manual/scripting-automation': {
    title: 'Scripting & Automation - D-Secure Tech Manual',
    description: 'Automate tasks using scripts and workflows.',
    keywords: generateKeywords(['scripting automation', 'workflow automation', 'task automation']),
    canonicalUrl: getCanonicalUrl('/support/manual/scripting-automation'),
  },

  'support/manual/security-assurance': {
    title: 'Security Assurance - D-Secure Tech Manual',
    description: 'Security assurance and verification procedures.',
    keywords: generateKeywords(['security assurance', 'security verification', 'assurance testing']),
    canonicalUrl: getCanonicalUrl('/support/manual/security-assurance'),
  },

  'support/manual/security-protocols': {
    title: 'Security Protocols - D-Secure Tech Manual',
    description: 'Security protocols and encryption standards.',
    keywords: generateKeywords(['security protocols', 'encryption protocols', 'security standards']),
    canonicalUrl: getCanonicalUrl('/support/manual/security-protocols'),
  },

  'support/manual/service-workflow': {
    title: 'Service Workflow - D-Secure Tech Manual',
    description: 'Service workflow and process management.',
    keywords: generateKeywords(['service workflow', 'process flow', 'workflow management']),
    canonicalUrl: getCanonicalUrl('/support/manual/service-workflow'),
  },

  'support/manual/setup-wizard': {
    title: 'Setup Wizard - D-Secure Tech Manual',
    description: 'Use the setup wizard for guided configuration.',
    keywords: generateKeywords(['setup wizard', 'configuration wizard', 'guided setup']),
    canonicalUrl: getCanonicalUrl('/support/manual/setup-wizard'),
  },

  'support/manual/shredding-method': {
    title: 'Shredding Method - D-Secure Tech Manual',
    description: 'Physical shredding method for device destruction.',
    keywords: generateKeywords(['shredding', 'device shredding', 'physical shredding']),
    canonicalUrl: getCanonicalUrl('/support/manual/shredding-method'),
  },

  'support/manual/software-supported-media': {
    title: 'Supported Media - D-Secure Tech Manual',
    description: 'List of supported storage media and devices.',
    keywords: generateKeywords(['supported media', 'device support', 'compatible devices']),
    canonicalUrl: getCanonicalUrl('/support/manual/software-supported-media'),
  },

  'support/manual/software-verification': {
    title: 'Software Verification - D-Secure Tech Manual',
    description: 'Software-based verification methods and tools.',
    keywords: generateKeywords(['software verification', 'verify software', 'validation tools']),
    canonicalUrl: getCanonicalUrl('/support/manual/software-verification'),
  },

  'support/manual/ssd-challenges': {
    title: 'SSD Challenges - D-Secure Tech Manual',
    description: 'Understanding SSD erasure challenges and solutions.',
    keywords: generateKeywords(['SSD challenges', 'SSD issues', 'SSD complexity']),
    canonicalUrl: getCanonicalUrl('/support/manual/ssd-challenges'),
  },

  'support/manual/ssd-destruction': {
    title: 'SSD Destruction - D-Secure Tech Manual',
    description: 'Physical destruction methods for solid-state drives.',
    keywords: generateKeywords(['SSD destruction', 'SSD physical', 'destroy SSD']),
    canonicalUrl: getCanonicalUrl('/support/manual/ssd-destruction'),
  },

  'support/manual/standards-comparison': {
    title: 'Standards Comparison - D-Secure Tech Manual',
    description: 'Compare erasure standards and compliance requirements.',
    keywords: generateKeywords(['standards comparison', 'compare standards', 'compliance comparison']),
    canonicalUrl: getCanonicalUrl('/support/manual/standards-comparison'),
  },

  'support/manual/start-erasure': {
    title: 'Start Erasure - D-Secure Tech Manual',
    description: 'Begin data erasure operations and tasks.',
    keywords: generateKeywords(['start erasure', 'begin erasure', 'initiate wiping']),
    canonicalUrl: getCanonicalUrl('/support/manual/start-erasure'),
  },

  'support/manual/statistical-confidence': {
    title: 'Statistical Confidence - D-Secure Tech Manual',
    description: 'Statistical confidence levels in verification testing.',
    keywords: generateKeywords(['statistical confidence', 'confidence levels', 'statistical testing']),
    canonicalUrl: getCanonicalUrl('/support/manual/statistical-confidence'),
  },

  'support/manual/status-indicators': {
    title: 'Status Indicators - D-Secure Tech Manual',
    description: 'Understanding status indicators and progress markers.',
    keywords: generateKeywords(['status indicators', 'progress indicators', 'status icons']),
    canonicalUrl: getCanonicalUrl('/support/manual/status-indicators'),
  },

  'support/manual/supported-devices': {
    title: 'Supported Devices - D-Secure Tech Manual',
    description: 'Complete list of supported devices and hardware.',
    keywords: generateKeywords(['supported devices', 'device compatibility', 'hardware support']),
    canonicalUrl: getCanonicalUrl('/support/manual/supported-devices'),
  },

  'support/manual/supported-encryption': {
    title: 'Supported Encryption - D-Secure Tech Manual',
    description: 'Supported encryption methods and algorithms.',
    keywords: generateKeywords(['supported encryption', 'encryption support', 'crypto algorithms']),
    canonicalUrl: getCanonicalUrl('/support/manual/supported-encryption'),
  },

  'support/manual/system-scanning': {
    title: 'System Scanning - D-Secure Tech Manual',
    description: 'Scan systems for devices and storage media.',
    keywords: generateKeywords(['system scanning', 'device scanning', 'media discovery']),
    canonicalUrl: getCanonicalUrl('/support/manual/system-scanning'),
  },

  'support/manual/system-setup': {
    title: 'System Setup - D-Secure Tech Manual',
    description: 'Complete system setup and configuration guide.',
    keywords: generateKeywords(['system setup', 'system configuration', 'setup guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/system-setup'),
  },

  'support/manual/use-cases': {
    title: 'Use Cases - D-Secure Tech Manual',
    description: 'Common use cases and application scenarios.',
    keywords: generateKeywords(['use cases', 'application scenarios', 'real-world examples']),
    canonicalUrl: getCanonicalUrl('/support/manual/use-cases'),
  },

  'support/manual/user-management': {
    title: 'User Management - D-Secure Tech Manual',
    description: 'Manage users, roles, and permissions.',
    keywords: generateKeywords(['user management', 'user admin', 'role management']),
    canonicalUrl: getCanonicalUrl('/support/manual/user-management'),
  },

  'support/manual/user-profile': {
    title: 'User Profile - D-Secure Tech Manual',
    description: 'Manage user profile and account settings.',
    keywords: generateKeywords(['user profile', 'account settings', 'profile management']),
    canonicalUrl: getCanonicalUrl('/support/manual/user-profile'),
  },

  'support/manual/verification-challenges': {
    title: 'Verification Challenges - D-Secure Tech Manual',
    description: 'Understanding verification challenges and solutions.',
    keywords: generateKeywords(['verification challenges', 'verification issues', 'testing challenges']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-challenges'),
  },

  'support/manual/verification-importance': {
    title: 'Verification Importance - D-Secure Tech Manual',
    description: 'Why verification is critical for data erasure.',
    keywords: generateKeywords(['verification importance', 'why verify', 'verification critical']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-importance'),
  },

  'support/manual/verification-logs': {
    title: 'Verification Logs - D-Secure Tech Manual',
    description: 'View and manage verification logs and records.',
    keywords: generateKeywords(['verification logs', 'log management', 'verification records']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-logs'),
  },

  'support/manual/verification-overview': {
    title: 'Verification Overview - D-Secure Tech Manual',
    description: 'Overview of verification methods and procedures.',
    keywords: generateKeywords(['verification overview', 'verification intro', 'verification guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-overview'),
  },

  'support/manual/verification-risks': {
    title: 'Verification Risks - D-Secure Tech Manual',
    description: 'Understanding risks in verification testing.',
    keywords: generateKeywords(['verification risks', 'testing risks', 'verification issues']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-risks'),
  },

  'support/manual/verification-standards': {
    title: 'Verification Standards - D-Secure Tech Manual',
    description: 'Verification standards and compliance requirements.',
    keywords: generateKeywords(['verification standards', 'compliance verification', 'testing standards']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-standards'),
  },

  'support/manual/verification-techniques': {
    title: 'Verification Techniques - D-Secure Tech Manual',
    description: 'Advanced verification techniques and methodologies.',
    keywords: generateKeywords(['verification techniques', 'testing methods', 'verification methods']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-techniques'),
  },

  'support/manual/verification-tools': {
    title: 'Verification Tools - D-Secure Tech Manual',
    description: 'Tools and utilities for erasure verification.',
    keywords: generateKeywords(['verification tools', 'testing tools', 'verification utilities']),
    canonicalUrl: getCanonicalUrl('/support/manual/verification-tools'),
  },

  'support/manual/virus-definitions': {
    title: 'Virus Definitions - D-Secure Tech Manual',
    description: 'Virus definitions and malware detection.',
    keywords: generateKeywords(['virus definitions', 'malware detection', 'security definitions']),
    canonicalUrl: getCanonicalUrl('/support/manual/virus-definitions'),
  },

  'support/manual/visual-confirmation': {
    title: 'Visual Confirmation - D-Secure Tech Manual',
    description: 'Visual confirmation methods for physical verification.',
    keywords: generateKeywords(['visual confirmation', 'visual verification', 'physical inspection']),
    canonicalUrl: getCanonicalUrl('/support/manual/visual-confirmation'),
  },

  'support/manual/vpn-setup': {
    title: 'VPN Setup - D-Secure Tech Manual',
    description: 'Configure VPN for secure remote access.',
    keywords: generateKeywords(['VPN setup', 'VPN configuration', 'secure access']),
    canonicalUrl: getCanonicalUrl('/support/manual/vpn-setup'),
  },

  'support/manual/why-physical-destruction': {
    title: 'Why Physical Destruction - D-Secure Tech Manual',
    description: 'Why physical destruction is sometimes necessary.',
    keywords: generateKeywords(['physical destruction', 'why destroy', 'destruction reasons']),
    canonicalUrl: getCanonicalUrl('/support/manual/why-physical-destruction'),
  },

  'support/manual/working-with-D-Secure': {
    title: 'Working with D-Secure - D-Secure Tech Manual',
    description: 'Complete guide to working with D-Secure Tech software.',
    keywords: generateKeywords(['working guide', 'D-Secure guide', 'software guide']),
    canonicalUrl: getCanonicalUrl('/support/manual/working-with-D-Secure'),
  },

  // Support Guides
  'support/cloud-console-guide': {
    title: 'Cloud Console Guide - D-Secure Tech Support',
    description: 'Complete guide to using D-Secure Tech cloud console.',
    keywords: generateKeywords(['cloud console', 'cloud guide', 'console guide']),
    canonicalUrl: getCanonicalUrl('/support/cloud-console-guide'),
  },

  'support/file-eraser-guide': {
    title: 'File Eraser Guide - D-Secure Tech Support',
    description: 'Guide to using file eraser for selective data deletion.',
    keywords: generateKeywords(['file eraser', 'file deletion', 'selective erasure']),
    canonicalUrl: getCanonicalUrl('/support/file-eraser-guide'),
  },

  'support/mac-eraser-guide': {
    title: 'Mac Eraser Guide - D-Secure Tech Support',
    description: 'Complete guide to erasing data on Mac systems.',
    keywords: generateKeywords(['Mac eraser', 'macOS erasure', 'Mac guide']),
    canonicalUrl: getCanonicalUrl('/support/mac-eraser-guide'),
  },

  'support/mac-wipe-guide': {
    title: 'Mac Wipe Guide - D-Secure Tech Support',
    description: 'Guide to wiping Mac drives and storage.',
    keywords: generateKeywords(['Mac wipe', 'macOS wipe', 'Mac wiping']),
    canonicalUrl: getCanonicalUrl('/support/mac-wipe-guide'),
  },

  'support/overwrite-guide': {
    title: 'Overwrite Guide - D-Secure Tech Support',
    description: 'Complete guide to data overwrite methods.',
    keywords: generateKeywords(['overwrite guide', 'overwrite methods', 'wiping guide']),
    canonicalUrl: getCanonicalUrl('/support/overwrite-guide'),
  },

  'support/retain-os-guide': {
    title: 'Retain OS Guide - D-Secure Tech Support',
    description: 'Guide to erasing data while retaining operating system.',
    keywords: generateKeywords(['retain OS', 'keep OS', 'OS preservation']),
    canonicalUrl: getCanonicalUrl('/support/retain-os-guide'),
  },

  'support/sas-wipe-guide': {
    title: 'SAS Wipe Guide - D-Secure Tech Support',
    description: 'Guide to wiping SAS drives and storage systems.',
    keywords: generateKeywords(['SAS wipe', 'SAS drives', 'SAS erasure']),
    canonicalUrl: getCanonicalUrl('/support/sas-wipe-guide'),
  },

  'support/secure-erase-hddssd': {
    title: 'Secure Erase HDD/SSD - D-Secure Tech Support',
    description: 'Secure erase methods for HDD and SSD drives.',
    keywords: generateKeywords(['secure erase', 'HDD SSD', 'ATA secure erase']),
    canonicalUrl: getCanonicalUrl('/support/secure-erase-hddssd'),
  },

  'support/ssd-cryptographic-erasure-guide': {
    title: 'SSD Cryptographic Erasure Guide - D-Secure Tech Support',
    description: 'Guide to cryptographic erasure for SSDs.',
    keywords: generateKeywords(['SSD crypto', 'cryptographic SSD', 'SSD encryption']),
    canonicalUrl: getCanonicalUrl('/support/ssd-cryptographic-erasure-guide'),
  },

  'support/wipe-guide': {
    title: 'Wipe Guide - D-Secure Tech Support',
    description: 'Complete data wiping guide and best practices.',
    keywords: generateKeywords(['wipe guide', 'wiping guide', 'erasure guide']),
    canonicalUrl: getCanonicalUrl('/support/wipe-guide'),
  },

  // Application Pages
  'cloud-integration': {
    title: 'Cloud Integration - D-Secure Tech',
    description: 'Integrate D-Secure Tech with cloud platforms and services.',
    keywords: generateKeywords(['cloud integration', 'cloud services', 'cloud platform']),
    canonicalUrl: getCanonicalUrl('/cloud-integration'),
  },

  'connecting-domain': {
    title: 'Connecting Domain - D-Secure Tech',
    description: 'Connect your custom domain to D-Secure Tech.',
    keywords: generateKeywords(['domain connection', 'custom domain', 'domain setup']),
    canonicalUrl: getCanonicalUrl('/connecting-domain'),
  },

  'downloads': {
    title: 'Downloads - D-Secure Tech',
    description: 'Download D-Secure Tech software, tools, and resources.',
    keywords: generateKeywords(['downloads', 'software download', 'download center']),
    canonicalUrl: getCanonicalUrl('/downloads'),
  },

  'edit-subuser': {
    title: 'Edit Subuser - D-Secure Tech',
    description: 'Edit subuser accounts and permissions.',
    keywords: generateKeywords(['edit subuser', 'manage subuser', 'subuser settings']),
    canonicalUrl: getCanonicalUrl('/edit-subuser'),
  },

  'erasing-files': {
    title: 'Erasing Files - D-Secure Tech',
    description: 'Erase individual files and folders securely.',
    keywords: generateKeywords(['erase files', 'file erasure', 'delete files']),
    canonicalUrl: getCanonicalUrl('/erasing-files'),
  },

  'erasing-traces': {
    title: 'Erasing Traces - D-Secure Tech',
    description: 'Erase digital traces and browsing history.',
    keywords: generateKeywords(['erase traces', 'digital traces', 'privacy cleaning']),
    canonicalUrl: getCanonicalUrl('/erasing-traces'),
  },

  'faq': {
    title: 'FAQ - Frequently Asked Questions | D-Secure Tech',
    description: 'Frequently asked questions about D-Secure Tech data erasure software.',
    keywords: generateKeywords(['FAQ', 'questions', 'help']),
    canonicalUrl: getCanonicalUrl('/faq'),
  },

  'groups': {
    title: 'Groups - D-Secure Tech',
    description: 'Manage device groups and organizational units.',
    keywords: generateKeywords(['groups', 'device groups', 'group management']),
    canonicalUrl: getCanonicalUrl('/groups'),
  },

  'groups/add': {
    title: 'Add Group - D-Secure Tech',
    description: 'Create new device groups for organization.',
    keywords: generateKeywords(['add group', 'create group', 'new group']),
    canonicalUrl: getCanonicalUrl('/groups/add'),
  },

  'installation': {
    title: 'Installation - D-Secure Tech',
    description: 'Install D-Secure Tech software on your system.',
    keywords: generateKeywords(['installation', 'install software', 'setup']),
    canonicalUrl: getCanonicalUrl('/installation'),
  },

  'licenses': {
    title: 'Licenses - D-Secure Tech',
    description: 'Manage software licenses and subscriptions.',
    keywords: generateKeywords(['licenses', 'license management', 'subscriptions']),
    canonicalUrl: getCanonicalUrl('/licenses'),
  },

  'licensing': {
    title: 'Licensing - D-Secure Tech',
    description: 'Licensing options and activation.',
    keywords: generateKeywords(['licensing', 'license options', 'activation']),
    canonicalUrl: getCanonicalUrl('/licensing'),
  },

  'machines': {
    title: 'Machines - D-Secure Tech',
    description: 'Manage machines and devices in your network.',
    keywords: generateKeywords(['machines', 'devices', 'machine management']),
    canonicalUrl: getCanonicalUrl('/machines'),
  },

  'performance': {
    title: 'Performance - D-Secure Tech',
    description: 'Monitor and optimize erasure performance.',
    keywords: generateKeywords(['performance', 'optimization', 'monitoring']),
    canonicalUrl: getCanonicalUrl('/performance'),
  },

  'private-cloud-setup': {
    title: 'Private Cloud Setup - D-Secure Tech',
    description: 'Set up private cloud infrastructure for D-Secure Tech.',
    keywords: generateKeywords(['private cloud', 'cloud setup', 'private infrastructure']),
    canonicalUrl: getCanonicalUrl('/private-cloud-setup'),
  },

  'profile/edit': {
    title: 'Edit Profile - D-Secure Tech',
    description: 'Edit your user profile and account settings.',
    keywords: generateKeywords(['edit profile', 'profile settings', 'account settings']),
    canonicalUrl: getCanonicalUrl('/profile/edit'),
  },

  'quick-overview': {
    title: 'Quick Overview - D-Secure Tech',
    description: 'Quick overview of D-Secure Tech features and capabilities.',
    keywords: generateKeywords(['quick overview', 'overview', 'features overview']),
    canonicalUrl: getCanonicalUrl('/quick-overview'),
  },

  'report-management': {
    title: 'Report Management - D-Secure Tech',
    description: 'Manage erasure reports and compliance documentation.',
    keywords: generateKeywords(['report management', 'manage reports', 'documentation']),
    canonicalUrl: getCanonicalUrl('/report-management'),
  },

  'reports': {
    title: 'Reports - D-Secure Tech',
    description: 'View and download erasure reports.',
    keywords: generateKeywords(['reports', 'erasure reports', 'compliance reports']),
    canonicalUrl: getCanonicalUrl('/reports'),
  },

  'reports/admin': {
    title: 'Admin Reports - D-Secure Tech',
    description: 'Administrative reports and analytics.',
    keywords: generateKeywords(['admin reports', 'administrative reports', 'admin analytics']),
    canonicalUrl: getCanonicalUrl('/reports/admin'),
  },

  'reports/generate': {
    title: 'Generate Reports - D-Secure Tech',
    description: 'Generate custom erasure and compliance reports.',
    keywords: generateKeywords(['generate reports', 'create reports', 'report generation']),
    canonicalUrl: getCanonicalUrl('/reports/generate'),
  },

  'resources/compliance': {
    title: 'Compliance Resources - D-Secure Tech',
    description: 'Compliance resources, guides, and documentation.',
    keywords: generateKeywords(['compliance resources', 'compliance guides', 'regulatory resources']),
    canonicalUrl: getCanonicalUrl('/resources/compliance'),
  },

  'scheduling-tasks': {
    title: 'Scheduling Tasks - D-Secure Tech',
    description: 'Schedule automated erasure tasks and operations.',
    keywords: generateKeywords(['scheduling', 'scheduled tasks', 'task automation']),
    canonicalUrl: getCanonicalUrl('/scheduling-tasks'),
  },

  'sessions': {
    title: 'Sessions - D-Secure Tech',
    description: 'Manage active sessions and user activity.',
    keywords: generateKeywords(['sessions', 'active sessions', 'user sessions']),
    canonicalUrl: getCanonicalUrl('/sessions'),
  },

  'settings': {
    title: 'Settings - D-Secure Tech',
    description: 'Configure application settings and preferences.',
    keywords: generateKeywords(['settings', 'configuration', 'preferences']),
    canonicalUrl: getCanonicalUrl('/settings'),
  },

  'subusers': {
    title: 'Subusers - D-Secure Tech',
    description: 'Manage subusers and delegated access.',
    keywords: generateKeywords(['subusers', 'user management', 'delegated access']),
    canonicalUrl: getCanonicalUrl('/subusers'),
  },

  'user-interface': {
    title: 'User Interface - D-Secure Tech',
    description: 'Navigate and use D-Secure Tech user interface.',
    keywords: generateKeywords(['user interface', 'UI', 'navigation']),
    canonicalUrl: getCanonicalUrl('/user-interface'),
  },

  'users': {
    title: 'Users - D-Secure Tech',
    description: 'Manage users, roles, and permissions.',
    keywords: generateKeywords(['users', 'user management', 'user admin']),
    canonicalUrl: getCanonicalUrl('/users'),
  },

  'users/add': {
    title: 'Add User - D-Secure Tech',
    description: 'Add new users to your organization.',
    keywords: generateKeywords(['add user', 'create user', 'new user']),
    canonicalUrl: getCanonicalUrl('/users/add'),
  }
};

// Merge default SEO with page-specific SEO
export const getSEOForPage = (pageName: keyof typeof PAGE_SEO): SEOMetadata => {
  const defaultSEO = getDefaultSEO();
  const pageSEO = PAGE_SEO[pageName] || {};

  return {
    ...defaultSEO,
    ...pageSEO,
    ogTitle: pageSEO.ogTitle || pageSEO.title || defaultSEO.ogTitle,
    ogDescription: pageSEO.ogDescription || pageSEO.description || defaultSEO.ogDescription,
    twitterTitle: pageSEO.twitterTitle || pageSEO.title || defaultSEO.twitterTitle,
    twitterDescription: pageSEO.twitterDescription || pageSEO.description || defaultSEO.twitterDescription,
  };
};

// Format structured data for JSON-LD
export const formatStructuredData = (data: any): string => {
  return JSON.stringify(data, null, 0);
};

// Additional SEO helper functions
export const generateMetaTags = (seoData: SEOMetadata) => {
  const tags = [
    { name: 'description', content: seoData.description },
    { name: 'keywords', content: seoData.keywords },
    { property: 'og:title', content: seoData.ogTitle },
    { property: 'og:description', content: seoData.ogDescription },
    { property: 'og:image', content: seoData.ogImage },
    { property: 'og:url', content: seoData.canonicalUrl },
    { property: 'og:type', content: seoData.ogType },
    { name: 'twitter:card', content: seoData.twitterCard },
    { name: 'twitter:title', content: seoData.twitterTitle },
    { name: 'twitter:description', content: seoData.twitterDescription },
    { name: 'twitter:image', content: seoData.twitterImage },
    { rel: 'canonical', href: seoData.canonicalUrl }
  ];

  return tags.filter(tag => tag.content);
};

// SEO performance monitoring
export const trackSEOPerformance = (pageName: string, metrics: any) => {
  // Implementation for tracking SEO performance metrics
  // console.log(`SEO Performance for ${pageName}:`, metrics);
};

// Keyword density analyzer
export const analyzeKeywordDensity = (content: string, keywords: string[]) => {
  const wordCount = content.split(/\s+/).length;
  const density: Record<string, number> = {};

  keywords.forEach(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    density[keyword] = (count / wordCount) * 100;
  });

  return density;
};