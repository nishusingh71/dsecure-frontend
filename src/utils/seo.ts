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
  'ISO 27001 certified',
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
  
  // Certified Solutions
  'certified data destruction',
  'certified data erasure',
  'verified data wiping',
  'audited data sanitization',
  'compliant data erasure',
  'approved data destruction',
  'certified data removal',
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
  'destruction certificate',
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
  description: 'Leading data erasure software for GDPR, HIPAA & compliance. Secure data destruction with NIST 800-88 certification. Enterprise data sanitization solutions.',
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
    description: 'Professional data erasure solutions for GDPR, HIPAA & compliance. Secure data destruction with NIST 800-88 certification. Download free trial.',
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
    description: 'Comprehensive data erasure services including hard drive wiping, SSD sanitization, and certified data destruction for enterprise compliance.',
    keywords: generateKeywords([
      'data erasure services',
      'hard drive destruction',
      'SSD data wiping',
      'certified data destruction',
      'on-site data erasure',
      'professional data wiping service',
      'managed data destruction',
      'data sanitization service',
      'certified erasure service',
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
    description: 'D-Secure Tech security standards and compliance certifications. NIST 800-88, GDPR, HIPAA, and ISO 27001 compliant data erasure.',
    keywords: generateKeywords([
      'security standards',
      'compliance certifications',
      'NIST 800-88 compliance',
      'security framework',
      'erasure security standards',
      'compliance framework',
      'security certification',
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

  'payment-setup': {
    title: 'Payment Setup - Configure Billing for D-Secure Tech',
    description: 'Set up payment methods and billing information for D-Secure Tech software subscriptions and services.',
    keywords: generateKeywords([
      'payment setup',
      'billing configuration',
      'subscription management',
      'payment methods',
      'billing setup',
      'payment configuration',
      'subscription setup',
      'billing management',
      'payment method setup',
      'billing information setup'
    ]),
    canonicalUrl: getCanonicalUrl('/payment-setup'),
  },

  'pricing-and-plan': {
    title: 'Pricing & Plans - Choose Your D-Secure Tech Package',
    description: 'Compare D-Secure Tech pricing plans and packages. Find the right data erasure solution for your needs.',
    keywords: generateKeywords([
      'pricing plans',
      'software packages',
      'license comparison',
      'plan features',
      'package comparison',
      'plan options',
      'software packages comparison',
      'license plans',
      'subscription plans',
      'enterprise packages'
    ]),
    canonicalUrl: getCanonicalUrl('/pricing-and-plan'),
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
      'certification requirements',
      'compliance information',
      'regulatory standards',
      'certification center',
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
  console.log(`SEO Performance for ${pageName}:`, metrics);
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