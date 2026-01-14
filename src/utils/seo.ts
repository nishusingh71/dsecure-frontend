/**
 * SEO Utility - Centralized SEO metadata management for DSecure Tech
 * Provides consistent, optimized meta tags and structured data across all pages
 */

/**
 * SEO Utility - Centralized SEO metadata management for DSecure Tech
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
  baseUrl: 'https://dsecuretech.com',
  defaultImage: 'https://dsecuretech.com/logo-white.svg',
  author: 'D-Secure Tech',
  language: 'en',
  locale: 'en_US',
  twitterHandle: '@dsecuretech',
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
  'information protection'
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
  "name": "DSecure Tech",
  "url": SEO_CONFIG.baseUrl,
  "logo": `${SEO_CONFIG.baseUrl}/logo-white.svg`,
  "description": "Leading provider of enterprise data erasure and sanitization solutions for GDPR, HIPAA, and compliance requirements.",
  "sameAs": [
    "https://linkedin.com/company/dsecuretech",
    "https://twitter.com/dsecuretech"
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
    "name": "DSecure Tech"
  }
});

// Default SEO metadata for all pages
export const getDefaultSEO = (): SEOMetadata => ({
  title: 'D-Secure Tech - Enterprise Data Erasure & Sanitization Solutions',
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
      'compliance data erasure',
      'secure data erasure download',
      'free trial data wiping',
      'data sanitization software free',
      'professional data destruction tool',
      'enterprise grade erasure software',
      'business data erasure solution'
    ]),
    canonicalUrl: getCanonicalUrl('/'),
  },

  services: {
    title: 'Data Erasure Services - Secure Data Destruction | DSecure Tech',
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
      'on-premise data wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/services'),
  },

  solutions: {
    title: 'Enterprise Data Erasure Solutions - GDPR & HIPAA Compliance | DSecure',
    description: 'Complete data sanitization solutions for enterprises. GDPR, HIPAA, and ISO 27001 compliant data erasure software and services.',
    keywords: generateKeywords([
      'enterprise data solutions',
      'GDPR compliance software',
      'HIPAA data erasure',
      'ISO 27001 data security',
      'enterprise data management',
      'corporate data solutions',
      'business data security',
      'organization data management',
      'enterprise compliance solution',
      'business data protection'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions'),
  },

  about: {
    title: 'About DSecure Tech - Data Erasure & Security Experts',
    description: 'Learn about DSecure Tech, industry leaders in data erasure and sanitization solutions. Our mission to secure enterprise data worldwide.',
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
      'security technology firm'
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
      'support team data destruction'
    ]),
    canonicalUrl: getCanonicalUrl('/contact'),
  },

  support: {
    title: 'Support Center - Data Erasure Help & Resources | DSecure Tech',
    description: 'Comprehensive support for DSecure data erasure software. Find guides, documentation, and get technical assistance.',
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
      'user manual data wiping'
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
      'service health check'
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
      'business plan pricing'
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
      'integration partnership'
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
      'security best practices'
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
      'learning materials'
    ]),
    canonicalUrl: getCanonicalUrl('/resources'),
  },

  features: {
    title: 'Features - Data Erasure Software Capabilities | D-Secure Tech',
    description: 'Advanced features of DSecure data erasure software including multi-platform support, compliance reporting, and enterprise management.',
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
      'software tools features'
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
      'secure delete tutorial'
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
      'Mac data destruction guide'
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
      'data destruction techniques'
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
      'secure wipe solid state drive'
    ]),
    canonicalUrl: getCanonicalUrl('/support/ssd-cryptographic-erasure-guide'),
  },

  'cloud-console-guide': {
    title: 'Cloud Console Guide - Remote Data Erasure Management',
    description: 'Learn to use DSecure cloud console for remote data erasure management and enterprise deployment.',
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
      'remote deployment console'
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
      'storage media wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/secure-erase-hdd-ssd'),
  },

  // Legal and policy pages
  'privacy-policy': {
    title: 'Privacy Policy - D-Secure Tech Data Protection Commitment',
    description: 'DSecure Tech privacy policy outlining our commitment to protecting your personal data and privacy rights.',
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
      'privacy guidelines'
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
      'software license terms'
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
      'regulatory requirements'
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
      'hospital data security'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/healthcare'),
  },

  'login': {
    title: 'Login - DSecure Tech | Data Erasure Management Platform',
    description: 'Login to your DSecure Tech account to manage data erasure tasks, view compliance reports, and ensure enterprise security.',
    keywords: generateKeywords([
      'DSecure login',
      'account login',
      'user dashboard',
      'erasure management',
      'compliance portal',
      'secure login',
      'enterprise access',
      'client portal',
      'erasure reports login',
      'management console'
    ]),
    canonicalUrl: getCanonicalUrl('/login'),
  },

  'register': {
    title: 'Create Account | DSecure Tech - Secure Data Erasure Solutions',
    description: 'Create your DSecure Tech account to access professional data erasure solutions. Join thousands of enterprises securing their data with compliant erasure.',
    keywords: generateKeywords([
      'DSecure register',
      'create account',
      'data erasure signup',
      'enterprise data security',
      'secure erasure account',
      'signup form',
      'new user registration',
      'get started',
      'enterprise account',
      'compliance platform signup'
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
    title: 'Payment & License Setup | DSecure Tech - Complete Your Setup',
    description: 'Complete your DSecure Tech payment and license setup. Configure billing details and license requirements to access all data erasure features.',
    keywords: generateKeywords([
      'DSecure payment setup',
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

  'crypto-erase-ssd': {
    title: 'CryptoEraseSSD | DSecure - Secure SSD Data Erasure',
    description: 'Professional guide to cryptographic erase (CryptoErase) for SSDs: when to use it, how it works, and best practices for secure disposal in 2025.',
    keywords: generateKeywords([
      'crypto erase SSD',
      'cryptographic erase',
      'SSD secure erase',
      'ATA secure erase',
      'SSD data erasure',
      'crypto erase guide',
      'SSD sanitization',
      'secure SSD disposal'
    ]),
    canonicalUrl: getCanonicalUrl('/crypto-erase-ssd'),
  },

  'wipe-mac-m1': {
    title: 'WipeMacM1 Guide | DSecure - Securely Erase Your M1 Mac',
    description: 'Learn how to securely wipe your Apple M1 Mac using professional data erasure methods without compromising security.',
    keywords: generateKeywords([
      'wipe Mac M1',
      'erase M1 Mac',
      'Apple Silicon erasure',
      'Mac data erasure',
      'M1 Mac secure wipe',
      'Mac data destruction',
      'Apple Silicon sanitization'
    ]),
    canonicalUrl: getCanonicalUrl('/wipe-mac-m1'),
  },

  'wipe-sas-drive': {
    title: 'WipeSASDrive | DSecure - Professional Data Erasure Guide',
    description: 'Professional guide for secure data erasure using DSecure tools and methods.',
    keywords: generateKeywords([
      'wipe SAS drive',
      'SAS drive erasure',
      'SAS drive sanitization',
      'enterprise drive erasure',
      'SAS data destruction',
      'server drive wiping'
    ]),
    canonicalUrl: getCanonicalUrl('/wipe-sas-drive'),
  },

  'retain-os-guide': {
    title: 'Retain OS Guide | DSecure - Selective Data Erasure',
    description: 'Learn how to wipe everything and retain your operating system using DSecure selective erasure methods.',
    keywords: generateKeywords([
      'retain OS erasure',
      'selective data erasure',
      'OS preservation',
      'partial drive wipe',
      'selective wipe',
      'OS retention erasure'
    ]),
    canonicalUrl: getCanonicalUrl('/retain-os-guide'),
  },

  'admin-performance': {
    title: 'DSecureTech Performance | System Performance & Erasure Metrics',
    description: 'Monitor DSecureTech system performance, erasure metrics, and throughput analytics in real-time.',
    keywords: generateKeywords([
      'performance monitoring',
      'erasure metrics',
      'system analytics',
      'data erasure performance',
      'admin performance dashboard',
      'system throughput',
      'erasure statistics'
    ]),
    canonicalUrl: getCanonicalUrl('/admin/performance'),
  },

  // Help and Support Pages
  'help-manual': {
    title: 'Help Manual - DSecure Tech User Guide & Documentation',
    description: 'Comprehensive help manual and user guide for DSecure Tech data erasure software. Step-by-step instructions and troubleshooting.',
    keywords: generateKeywords([
      'help manual',
      'user guide',
      'software documentation',
      'erasure software manual',
      'data destruction guide',
      'user instructions',
      'software help',
      'tutorial guide',
      'how to use erasure software',
      'software manual'
    ]),
    canonicalUrl: getCanonicalUrl('/support/help-manual'),
  },

  'faqs': {
    title: 'FAQs - Frequently Asked Questions | DSecure Tech',
    description: 'Find answers to frequently asked questions about DSecure Tech data erasure software, licensing, compliance, and technical support.',
    keywords: generateKeywords([
      'frequently asked questions',
      'FAQ data erasure',
      'erasure software questions',
      'data destruction FAQ',
      'software support FAQ',
      'common questions',
      'help FAQ',
      'technical FAQ',
      'erasure FAQ',
      'data security FAQ'
    ]),
    canonicalUrl: getCanonicalUrl('/support/faqs'),
  },

  'knowledge-base': {
    title: 'Knowledge Base - Data Erasure Resources & Guides | DSecure Tech',
    description: 'Comprehensive knowledge base with articles, guides, and resources for DSecure Tech data erasure software and best practices.',
    keywords: generateKeywords([
      'knowledge base',
      'erasure articles',
      'data destruction guides',
      'technical resources',
      'help articles',
      'documentation library',
      'erasure knowledge base',
      'support articles',
      'technical guides',
      'resource library'
    ]),
    canonicalUrl: getCanonicalUrl('/support/knowledge-base'),
  },

  'get-started': {
    title: 'Get Started - Quick Start Guide | DSecure Tech',
    description: 'Get started with DSecure Tech data erasure software. Quick start guide, installation instructions, and first steps for new users.',
    keywords: generateKeywords([
      'get started',
      'quick start guide',
      'beginner guide',
      'first steps',
      'installation guide',
      'setup guide',
      'getting started',
      'new user guide',
      'onboarding guide',
      'start guide'
    ]),
    canonicalUrl: getCanonicalUrl('/support/get-started'),
  },

  'product-videos': {
    title: 'Product Videos - Tutorials & Demos | DSecure Tech',
    description: 'Watch product videos, tutorials, and demonstrations for DSecure Tech data erasure software. Learn how to use features effectively.',
    keywords: generateKeywords([
      'product videos',
      'tutorial videos',
      'software demos',
      'how-to videos',
      'erasure tutorials',
      'video guides',
      'software demonstrations',
      'training videos',
      'instructional videos',
      'product demonstrations'
    ]),
    canonicalUrl: getCanonicalUrl('/support/product-videos'),
  },

  'download': {
    title: 'Download - DSecure Tech Data Erasure Software',
    description: 'Download DSecure Tech data erasure software. Free trial available. Enterprise-grade data destruction and sanitization tools.',
    keywords: generateKeywords([
      'download data erasure',
      'software download',
      'free trial download',
      'erasure software download',
      'data destruction download',
      'secure download',
      'software installer',
      'download trial',
      'enterprise download',
      'data wiping software download'
    ]),
    canonicalUrl: getCanonicalUrl('/download'),
  },

  // Resource Pages
  'case-studies': {
    title: 'Case Studies - Data Erasure Success Stories | DSecure Tech',
    description: 'Read case studies and success stories from organizations using DSecure Tech data erasure solutions. Real-world implementations and results.',
    keywords: generateKeywords([
      'case studies',
      'success stories',
      'customer case studies',
      'implementation stories',
      'erasure case studies',
      'real-world examples',
      'customer success',
      'use case examples',
      'implementation examples',
      'success examples'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/case-studies'),
  },

  'compliance-resources': {
    title: 'Compliance Resources - Regulatory Guides | DSecure Tech',
    description: 'Comprehensive compliance resources including GDPR, HIPAA, NIST, and ISO standards. Regulatory guides and compliance documentation.',
    keywords: generateKeywords([
      'compliance resources',
      'regulatory guides',
      'GDPR compliance',
      'HIPAA compliance',
      'NIST compliance',
      'ISO compliance',
      'compliance documentation',
      'regulatory resources',
      'compliance guides',
      'standards compliance'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/compliance'),
  },

  'documentation': {
    title: 'Documentation - Technical Documentation | DSecure Tech',
    description: 'Complete technical documentation for DSecure Tech data erasure software. API documentation, user guides, and technical references.',
    keywords: generateKeywords([
      'technical documentation',
      'software documentation',
      'API documentation',
      'user documentation',
      'technical guides',
      'documentation library',
      'software manuals',
      'technical reference',
      'developer documentation',
      'product documentation'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/documentation'),
  },

  'whitepapers': {
    title: 'Whitepapers - Data Erasure Research & Insights | DSecure Tech',
    description: 'Download whitepapers on data erasure, compliance, security best practices, and industry insights from DSecure Tech experts.',
    keywords: generateKeywords([
      'whitepapers',
      'data erasure research',
      'security whitepapers',
      'compliance whitepapers',
      'industry insights',
      'research papers',
      'technical whitepapers',
      'security research',
      'best practices papers',
      'industry reports'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/whitepapers'),
  },

  'datasheets': {
    title: 'Datasheets - Product Specifications | DSecure Tech',
    description: 'Download product datasheets and specifications for DSecure Tech data erasure software. Technical details and feature overviews.',
    keywords: generateKeywords([
      'datasheets',
      'product specifications',
      'technical datasheets',
      'product sheets',
      'specification sheets',
      'product information',
      'technical specs',
      'product details',
      'feature sheets',
      'specification documents'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/datasheets'),
  },

  'ebooks': {
    title: 'eBooks - Data Erasure Guides & Resources | DSecure Tech',
    description: 'Download free eBooks on data erasure, compliance, security best practices, and data destruction strategies.',
    keywords: generateKeywords([
      'ebooks',
      'data erasure books',
      'security ebooks',
      'compliance ebooks',
      'free ebooks',
      'digital books',
      'guide books',
      'security guides',
      'compliance guides',
      'educational ebooks'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/ebooks'),
  },

  'brochures': {
    title: 'Brochures - Product Information | DSecure Tech',
    description: 'Download product brochures and marketing materials for DSecure Tech data erasure solutions and services.',
    keywords: generateKeywords([
      'brochures',
      'product brochures',
      'marketing materials',
      'product information',
      'solution brochures',
      'service brochures',
      'company brochures',
      'product flyers',
      'information brochures',
      'solution sheets'
    ]),
    canonicalUrl: getCanonicalUrl('/resources/brochures'),
  },

  // Blog
  'blog': {
    title: 'Blog - Data Erasure News & Insights | DSecure Tech',
    description: 'Read the latest blog posts about data erasure, security best practices, compliance updates, and industry news from DSecure Tech.',
    keywords: generateKeywords([
      'data erasure blog',
      'security blog',
      'compliance blog',
      'data security news',
      'erasure insights',
      'security articles',
      'compliance articles',
      'data destruction blog',
      'security updates',
      'industry news'
    ]),
    canonicalUrl: getCanonicalUrl('/blog'),
  },

  // Products
  'products': {
    title: 'Products - Data Erasure Software Solutions | DSecure Tech',
    description: 'Explore DSecure Tech data erasure products including Drive Eraser, Mobile Eraser, File Eraser, and Admin Console solutions.',
    keywords: generateKeywords([
      'data erasure products',
      'erasure software products',
      'drive eraser',
      'mobile eraser',
      'file eraser',
      'admin console',
      'erasure solutions',
      'data destruction products',
      'software products',
      'erasure tools'
    ]),
    canonicalUrl: getCanonicalUrl('/products'),
  },

  // Services and Solutions
  'implementation': {
    title: 'Implementation Services - Data Erasure Deployment | DSecure Tech',
    description: 'Professional implementation services for DSecure Tech data erasure solutions. Expert deployment, configuration, and integration support.',
    keywords: generateKeywords([
      'implementation services',
      'deployment services',
      'software implementation',
      'erasure deployment',
      'integration services',
      'setup services',
      'configuration services',
      'deployment support',
      'implementation support',
      'professional services'
    ]),
    canonicalUrl: getCanonicalUrl('/implementation'),
  },

  'partner-program': {
    title: 'Partner Program - Join Our Partner Network | DSecure Tech',
    description: 'Join the DSecure Tech partner program. Reseller opportunities, technology partnerships, and channel partner benefits.',
    keywords: generateKeywords([
      'partner program',
      'reseller program',
      'channel partners',
      'technology partners',
      'partner opportunities',
      'reseller opportunities',
      'partner benefits',
      'channel program',
      'technology alliance',
      'partner network'
    ]),
    canonicalUrl: getCanonicalUrl('/partner-program'),
  },

  'professional-services': {
    title: 'Professional Services - Data Erasure Consulting | DSecure Tech',
    description: 'Professional services for data erasure including consulting, implementation, training, and ongoing support for enterprise clients.',
    keywords: generateKeywords([
      'professional services',
      'erasure consulting',
      'data security consulting',
      'implementation services',
      'training services',
      'consulting services',
      'enterprise services',
      'professional support',
      'expert services',
      'consulting support'
    ]),
    canonicalUrl: getCanonicalUrl('/professional-services'),
  },

  'resellers': {
    title: 'Resellers - Become a DSecure Tech Reseller',
    description: 'Become a DSecure Tech reseller. Reseller program benefits, partner support, and opportunities to sell data erasure solutions.',
    keywords: generateKeywords([
      'resellers',
      'reseller program',
      'become a reseller',
      'reseller opportunities',
      'channel resellers',
      'reseller benefits',
      'reseller support',
      'reseller network',
      'authorized resellers',
      'reseller partnership'
    ]),
    canonicalUrl: getCanonicalUrl('/resellers'),
  },

  // Customer Success
  'reviews': {
    title: 'Reviews - Customer Reviews & Testimonials | DSecure Tech',
    description: 'Read customer reviews and testimonials for DSecure Tech data erasure software. See what our customers say about our solutions.',
    keywords: generateKeywords([
      'customer reviews',
      'software reviews',
      'erasure software reviews',
      'user reviews',
      'product reviews',
      'customer testimonials',
      'user feedback',
      'customer feedback',
      'software ratings',
      'product ratings'
    ]),
    canonicalUrl: getCanonicalUrl('/reviews'),
  },

  'customer-stories': {
    title: 'Customer Stories - Success Stories | DSecure Tech',
    description: 'Read customer success stories and case studies from organizations using DSecure Tech data erasure solutions.',
    keywords: generateKeywords([
      'customer stories',
      'success stories',
      'customer success',
      'case studies',
      'customer testimonials',
      'user stories',
      'implementation stories',
      'success examples',
      'customer experiences',
      'real-world stories'
    ]),
    canonicalUrl: getCanonicalUrl('/customer-stories'),
  },

  'testimonials': {
    title: 'Testimonials - Customer Testimonials | DSecure Tech',
    description: 'Read testimonials from DSecure Tech customers. See how organizations benefit from our data erasure solutions.',
    keywords: generateKeywords([
      'testimonials',
      'customer testimonials',
      'user testimonials',
      'customer feedback',
      'client testimonials',
      'customer quotes',
      'user feedback',
      'customer reviews',
      'testimonial quotes',
      'customer experiences'
    ]),
    canonicalUrl: getCanonicalUrl('/testimonials'),
  },

  // Community and Learning
  'forum': {
    title: 'Forum - Community Discussion | DSecure Tech',
    description: 'Join the DSecure Tech community forum. Discuss data erasure, ask questions, share experiences, and get help from experts.',
    keywords: generateKeywords([
      'community forum',
      'discussion forum',
      'user forum',
      'support forum',
      'erasure forum',
      'community discussion',
      'user community',
      'discussion board',
      'community support',
      'user discussions'
    ]),
    canonicalUrl: getCanonicalUrl('/forum'),
  },

  'release-notes': {
    title: 'Release Notes - Software Updates | DSecure Tech',
    description: 'View release notes and changelog for DSecure Tech data erasure software updates, new features, and bug fixes.',
    keywords: generateKeywords([
      'release notes',
      'changelog',
      'software updates',
      'version updates',
      'update notes',
      'what\'s new',
      'software changelog',
      'version history',
      'update history',
      'release history'
    ]),
    canonicalUrl: getCanonicalUrl('/release-notes'),
  },

  'roi-calculator': {
    title: 'ROI Calculator - Calculate Your Savings | DSecure Tech',
    description: 'Calculate the return on investment for DSecure Tech data erasure solutions. Estimate cost savings and efficiency gains.',
    keywords: generateKeywords([
      'ROI calculator',
      'return on investment',
      'cost calculator',
      'savings calculator',
      'investment calculator',
      'cost savings',
      'ROI analysis',
      'cost benefit calculator',
      'investment analysis',
      'savings analysis'
    ]),
    canonicalUrl: getCanonicalUrl('/roi-calculator'),
  },

  'integrations': {
    title: 'Integrations - Third-Party Integrations | DSecure Tech',
    description: 'Integrate DSecure Tech data erasure software with your existing IT infrastructure. API integrations and third-party connectors.',
    keywords: generateKeywords([
      'integrations',
      'API integrations',
      'third-party integrations',
      'software integrations',
      'system integrations',
      'integration partners',
      'API connectors',
      'integration solutions',
      'enterprise integrations',
      'software connectors'
    ]),
    canonicalUrl: getCanonicalUrl('/integrations'),
  },

  'use-cases': {
    title: 'Use Cases - Data Erasure Applications | DSecure Tech',
    description: 'Explore use cases and applications for DSecure Tech data erasure solutions across industries and scenarios.',
    keywords: generateKeywords([
      'use cases',
      'erasure use cases',
      'data destruction use cases',
      'application scenarios',
      'use case examples',
      'industry use cases',
      'scenario examples',
      'application examples',
      'use case scenarios',
      'practical applications'
    ]),
    canonicalUrl: getCanonicalUrl('/use-cases'),
  },

  'events': {
    title: 'Events - Conferences & Webinars | DSecure Tech',
    description: 'Upcoming events, conferences, webinars, and workshops from DSecure Tech. Learn about data erasure and security best practices.',
    keywords: generateKeywords([
      'events',
      'conferences',
      'webinars',
      'workshops',
      'data security events',
      'erasure conferences',
      'security conferences',
      'industry events',
      'training events',
      'educational events'
    ]),
    canonicalUrl: getCanonicalUrl('/events'),
  },

  'standards': {
    title: 'Standards - Data Erasure Standards & Compliance | DSecure Tech',
    description: 'Learn about data erasure standards including NIST, ISO, DoD, and industry-specific compliance requirements.',
    keywords: generateKeywords([
      'data erasure standards',
      'NIST standards',
      'ISO standards',
      'DoD standards',
      'compliance standards',
      'regulatory standards',
      'industry standards',
      'erasure standards',
      'security standards',
      'compliance requirements'
    ]),
    canonicalUrl: getCanonicalUrl('/standards'),
  },

  'training': {
    title: 'Training - Data Erasure Training Programs | DSecure Tech',
    description: 'Professional training programs for DSecure Tech data erasure software. Certification courses and skill development programs.',
    keywords: generateKeywords([
      'training programs',
      'erasure training',
      'software training',
      'certification training',
      'professional training',
      'skill development',
      'training courses',
      'educational training',
      'technical training',
      'user training'
    ]),
    canonicalUrl: getCanonicalUrl('/training'),
  },

  'webinars': {
    title: 'Webinars - Data Erasure Webinars | DSecure Tech',
    description: 'Join DSecure Tech webinars on data erasure, security, compliance, and best practices. Free educational webinars.',
    keywords: generateKeywords([
      'webinars',
      'online webinars',
      'data erasure webinars',
      'security webinars',
      'compliance webinars',
      'educational webinars',
      'free webinars',
      'training webinars',
      'expert webinars',
      'industry webinars'
    ]),
    canonicalUrl: getCanonicalUrl('/webinars'),
  },

  // Company Pages
  'leadership': {
    title: 'Leadership - Executive Team | DSecure Tech',
    description: 'Meet the leadership team at DSecure Tech. Learn about our executives and their vision for data security and erasure.',
    keywords: generateKeywords([
      'leadership team',
      'executive team',
      'company leadership',
      'management team',
      'executives',
      'leadership',
      'company executives',
      'management',
      'executive leadership',
      'company management'
    ]),
    canonicalUrl: getCanonicalUrl('/leadership'),
  },

  'live-demo': {
    title: 'Live Demo - See DSecure Tech in Action',
    description: 'Schedule a live demo of DSecure Tech data erasure software. See how our solutions work in real-time.',
    keywords: generateKeywords([
      'live demo',
      'software demo',
      'product demonstration',
      'live demonstration',
      'interactive demo',
      'real-time demo',
      'demo session',
      'product demo',
      'software demonstration',
      'demo request'
    ]),
    canonicalUrl: getCanonicalUrl('/live-demo'),
  },

  'request-demo': {
    title: 'Request Demo - Schedule a Demo | DSecure Tech',
    description: 'Request a personalized demo of DSecure Tech data erasure solutions. See how our software can meet your needs.',
    keywords: generateKeywords([
      'request demo',
      'schedule demo',
      'demo request',
      'product demo',
      'software demo',
      'personalized demo',
      'demo scheduling',
      'request demonstration',
      'demo booking',
      'schedule demonstration'
    ]),
    canonicalUrl: getCanonicalUrl('/request-demo'),
  },

  'team': {
    title: 'Team - Meet Our Team | DSecure Tech',
    description: 'Meet the DSecure Tech team. Learn about our experts in data security, software development, and customer support.',
    keywords: generateKeywords([
      'team',
      'company team',
      'our team',
      'team members',
      'staff',
      'employees',
      'company staff',
      'team profiles',
      'company employees',
      'team information'
    ]),
    canonicalUrl: getCanonicalUrl('/team'),
  },

  'free-trial': {
    title: 'Free Trial - Try DSecure Tech Free | Data Erasure Software',
    description: 'Start your free trial of DSecure Tech data erasure software. No credit card required. Experience enterprise-grade data destruction.',
    keywords: generateKeywords([
      'free trial',
      'trial version',
      'free software trial',
      'try free',
      'no credit card trial',
      'free erasure trial',
      'trial download',
      'free trial download',
      'software trial',
      'free trial period'
    ]),
    canonicalUrl: getCanonicalUrl('/free-trial'),
  },

  'news': {
    title: 'News - Latest Updates & Announcements | DSecure Tech',
    description: 'Stay updated with the latest news, announcements, and updates from DSecure Tech on data erasure and security.',
    keywords: generateKeywords([
      'news',
      'latest news',
      'company news',
      'announcements',
      'updates',
      'news updates',
      'industry news',
      'security news',
      'company announcements',
      'latest updates'
    ]),
    canonicalUrl: getCanonicalUrl('/news'),
  },

  'press': {
    title: 'Press - Press Releases & Media | DSecure Tech',
    description: 'Press releases, media coverage, and press kit from DSecure Tech. Latest company news and media resources.',
    keywords: generateKeywords([
      'press',
      'press releases',
      'media coverage',
      'press kit',
      'media resources',
      'company press',
      'press information',
      'media information',
      'press materials',
      'media kit'
    ]),
    canonicalUrl: getCanonicalUrl('/press'),
  },

  // Solutions Pages
  'service-providers-solutions': {
    title: 'Service Provider Solutions - Data Erasure for MSPs | DSecure Tech',
    description: 'Data erasure solutions for managed service providers (MSPs) and IT service providers. Scalable, multi-tenant erasure platform.',
    keywords: generateKeywords([
      'service provider solutions',
      'MSP solutions',
      'managed service providers',
      'IT service providers',
      'multi-tenant erasure',
      'service provider platform',
      'MSP data erasure',
      'service provider tools',
      'provider solutions',
      'MSP platform'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/service-providers'),
  },

  'financial-services': {
    title: 'Financial Services Solutions - Banking Data Erasure | DSecure Tech',
    description: 'Data erasure solutions for financial services, banks, and financial institutions. SOX, PCI DSS, and regulatory compliance.',
    keywords: generateKeywords([
      'financial services solutions',
      'banking data erasure',
      'financial data security',
      'SOX compliance',
      'PCI DSS compliance',
      'bank data erasure',
      'financial institution security',
      'banking compliance',
      'financial data destruction',
      'bank data security'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/financial'),
  },

  'healthcare-services': {
    title: 'Healthcare Solutions - HIPAA Compliant Data Erasure | DSecure Tech',
    description: 'HIPAA-compliant data erasure solutions for healthcare organizations. Secure patient data destruction and medical device sanitization.',
    keywords: generateKeywords([
      'healthcare solutions',
      'HIPAA compliant erasure',
      'medical data destruction',
      'patient data security',
      'healthcare data erasure',
      'medical device sanitization',
      'PHI data destruction',
      'healthcare compliance',
      'medical data wiping',
      'hospital data security'
    ]),
    canonicalUrl: getCanonicalUrl('/healthcare-services'),
  },

  'mobile-erasure-solutions': {
    title: 'Mobile Erasure Solutions - Mobile Device Data Destruction | DSecure Tech',
    description: 'Mobile device data erasure solutions for smartphones, tablets, and mobile devices. Secure mobile data destruction.',
    keywords: generateKeywords([
      'mobile erasure solutions',
      'mobile device erasure',
      'smartphone data erasure',
      'tablet data erasure',
      'mobile data destruction',
      'phone data wiping',
      'mobile device wiping',
      'mobile data security',
      'device erasure',
      'mobile sanitization'
    ]),
    canonicalUrl: getCanonicalUrl('/products/mobile-erasure'),
  },

  'cryptographic-erasure': {
    title: 'Cryptographic Erasure - CryptoErase Guide | DSecure Tech',
    description: 'Learn about cryptographic erasure (CryptoErase) for SSDs and modern storage devices. Fast, secure data destruction method.',
    keywords: generateKeywords([
      'cryptographic erasure',
      'crypto erase',
      'SSD crypto erase',
      'cryptographic sanitization',
      'crypto erase guide',
      'secure erase SSD',
      'ATA secure erase',
      'cryptographic destruction',
      'crypto wipe',
      'secure crypto erase'
    ]),
    canonicalUrl: getCanonicalUrl('/support/manual/cryptographic-erasure'),
  },

  'technical-documentation': {
    title: 'Technical Documentation - API & Developer Docs | DSecure Tech',
    description: 'Complete technical documentation for DSecure Tech including API references, developer guides, and integration documentation.',
    keywords: generateKeywords([
      'technical documentation',
      'API documentation',
      'developer documentation',
      'API reference',
      'developer guides',
      'integration docs',
      'technical reference',
      'API guides',
      'developer resources',
      'technical guides'
    ]),
    canonicalUrl: getCanonicalUrl('/technical-documentation'),
  },

  'enterprise-solutions': {
    title: 'Enterprise Solutions - Large-Scale Data Erasure | DSecure Tech',
    description: 'Enterprise-grade data erasure solutions for large organizations. Scalable, centralized management, and compliance reporting.',
    keywords: generateKeywords([
      'enterprise solutions',
      'enterprise data erasure',
      'large-scale erasure',
      'enterprise management',
      'centralized erasure',
      'enterprise platform',
      'corporate solutions',
      'enterprise tools',
      'large organization solutions',
      'enterprise deployment'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/enterprise'),
  },

  'financial-solutions': {
    title: 'Financial Solutions - Banking & Finance Data Erasure | DSecure Tech',
    description: 'Data erasure solutions for financial institutions, banks, and finance companies. SOX and PCI DSS compliant.',
    keywords: generateKeywords([
      'financial solutions',
      'banking solutions',
      'finance data erasure',
      'financial institution security',
      'bank data erasure',
      'SOX compliance',
      'PCI DSS compliance',
      'financial data destruction',
      'banking security',
      'finance compliance'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/financial'),
  },

  'digital-protection-solutions': {
    title: 'Digital Protection Solutions - Education Sector | DSecure Tech',
    description: 'Data erasure and digital protection solutions for educational institutions. Secure student and institutional data destruction.',
    keywords: generateKeywords([
      'digital protection solutions',
      'education solutions',
      'school data erasure',
      'university data security',
      'educational institution security',
      'student data protection',
      'education data erasure',
      'school data security',
      'educational compliance',
      'institutional data security'
    ]),
    canonicalUrl: getCanonicalUrl('/solutions/education'),
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