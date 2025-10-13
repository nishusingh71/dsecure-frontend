// Sitemap Generator Utility for DSecure
// Automatically generates sitemap.xml for better SEO and search engine indexing

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  routes: SitemapUrl[];
}

// All routes in the application with SEO metadata
export const siteRoutes: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/services',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/solutions',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/compliance',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/pricing',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/resources',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/diagnostics',
    changefreq: 'weekly',
    priority: 0.5,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/login',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: '/register',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate XML sitemap content
export function generateSitemapXML(config: SitemapConfig): string {
  const { baseUrl, routes } = config;
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  routes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.loc}</loc>\n`;
    
    if (route.lastmod) {
      xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    }
    
    if (route.changefreq) {
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }
    
    if (route.priority !== undefined) {
      xml += `    <priority>${route.priority}</priority>\n`;
    }
    
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  return xml;
}

// Generate robots.txt content
export function generateRobotsTxt(baseUrl: string): string {
  return `User-agent: *
Allow: /

# Important pages for crawling
Allow: /services
Allow: /solutions
Allow: /compliance
Allow: /pricing
Allow: /resources
Allow: /about
Allow: /contact

# Block admin and auth pages
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /register
Disallow: /payment

# Block development files
Disallow: /src/
Disallow: /*.json
Disallow: /*.ts
Disallow: /*.tsx

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for polite crawling
Crawl-delay: 1
`;
}

// Function to update sitemap with current timestamp
export function updateSitemapTimestamp(): SitemapUrl[] {
  const currentDate = new Date().toISOString().split('T')[0];
  return siteRoutes.map(route => ({
    ...route,
    lastmod: currentDate
  }));
}

// SEO-focused URL structure for better crawling
export const seoUrls = {
  // Main pages
  home: '/',
  services: '/services',
  solutions: '/solutions',
  compliance: '/compliance',
  pricing: '/pricing',
  resources: '/resources',
  about: '/about',
  contact: '/contact',
  
  // Service-specific pages with search params for better SEO
  mobileDataErasure: '/services?search=mobile+device+erasure',
  networkDataErasure: '/services?search=network+server+erasure',
  cloudDataErasure: '/services?search=cloud+data+erasure',
  
  // Compliance-specific pages
  nistCompliance: '/compliance?standard=nist',
  gdprCompliance: '/compliance?standard=gdpr',
  hipaaCompliance: '/compliance?standard=hipaa',
  iso27001Compliance: '/compliance?standard=iso27001',
  
  // Solution-specific pages
  enterpriseSolution: '/solutions?industry=enterprise',
  healthcareSolution: '/solutions?industry=healthcare',
  financialSolution: '/solutions?industry=financial',
  governmentSolution: '/solutions?industry=government',
};

export default {
  generateSitemapXML,
  generateRobotsTxt,
  updateSitemapTimestamp,
  siteRoutes,
  seoUrls
};