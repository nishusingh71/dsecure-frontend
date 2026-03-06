import fs from 'fs';

const date = new Date().toISOString().split('T')[0];

const routes = [
  '/',
  '/services',
  '/services/cloud-erasure',
  '/solutions',
  '/solutions/enterprise',
  '/solutions/itad',
  '/solutions/education',
  '/solutions/financial',
  '/solutions/financial-services',
  '/solutions/government',
  '/solutions/healthcare',
  '/solutions/service-providers',
  '/search-demo',
  '/resources',
  '/resources/documentation',
  '/technical-documentation',
  '/resources/case-studies',
  '/resources/compliance',
  '/resources/whitepapers',
  '/community',
  '/compliance',
  '/data-eraser-software',
  '/contact',
  '/about',
  '/pricing-and-plan',
  '/download',
  '/products/drive-eraser',
  '/products/file-eraser',
  '/diagnostics',
  '/privacy-policy',
  '/legal-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/security',
  '/api-test',
  '/what-is-d-secure',
  '/why-d-secure',
  '/ai-overview',
  '/comparison',
  '/whitepaper',
  '/use-cases',
  '/founder',
  '/trust-center',
  '/status',
  '/data-hygiene-framework',
  '/glossary',
  '/partners',
  '/support',
  '/enterprise',
  '/healthcare-services',
  '/itad-solution',
  '/blog',
  '/pricing',
  '/checkout',
  '/order-success',
  '/order-failure',
  '/payment',
  '/compliance?standard=gdpr',
  '/compliance?standard=hipaa',
  '/compliance?standard=iso27001',
  '/compliance?standard=nist',
  '/services?search=cloud+data+erasure',
  '/services?search=mobile+device+erasure',
  '/services?search=network+server+erasure',
  '/solutions?industry=enterprise',
  '/solutions?industry=financial',
  '/solutions?industry=government',
  '/solutions?industry=healthcare'
];

// 1. Read blog posts to get all dynamic blog links
const blogPostsContent = fs.readFileSync('./src/data/blogPosts.ts', 'utf-8');
const blogLinksMatch = blogPostsContent.match(/link:\s*["'](\/blog\/[^"']+)["']/g);
if (blogLinksMatch) {
  blogLinksMatch.forEach(match => {
    const link = match.replace(/link:\s*["']/, '').replace(/["']$/, '');
    if (!routes.includes(link)) {
      routes.push(link);
    }
  });
}

// 2. Read SupportRoutes for all static support paths
const supportRoutesContent = fs.readFileSync('./src/routes/SupportRoutes.tsx', 'utf-8');
const supportPathMatch = supportRoutesContent.match(/path=["']([^"']+)["']/g);
if (supportPathMatch) {
  supportPathMatch.forEach(match => {
    let link = match.replace(/path=["']/, '').replace(/["']$/, '');
    
    // Filter out known "Coming Soon" support pages
    if (link === 'support/product-videos' || link === '/support/product-videos') return;
    
    // Check if it's a nested route for network-file that doesn't include the full path
    if (!link.startsWith('/') && !link.startsWith('support/') && link !== '') {
        link = '/support/help-manual/network-file/' + link;
    }

    // Ensure leading slash
    if (!link.startsWith('/')) {
       link = '/' + link;
    }
    // Only accept actual content paths
    if (link.length > 2 && !routes.includes(link)) {
      routes.push(link);
    }
  });
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

routes.forEach(route => {
  // Give home page priority 1.0, main pages 0.8, query params 0.5
  let priority = '0.7';
  let changefreq = 'weekly';
  
  if (route === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (route.includes('?')) {
    priority = '0.5';
    changefreq = 'monthly';
  } else if (route.split('/').length === 2 && route !== '/') {
    priority = '0.8';
  }

  const url = `https://dsecuretech.com${route}`;
  const escapedUrl = url.replace(/&/g, '&amp;');

  xml += `  <url>
    <loc>${escapedUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap successfully generated with ' + routes.length + ' URLs');
