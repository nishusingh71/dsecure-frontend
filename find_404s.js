import fs from 'fs';

const appPath = 'src/App.tsx';
const sitemapPath = 'public/sitemap.xml';

const appContent = fs.readFileSync(appPath, 'utf8');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// 1. Extract valid routes
const routeRegex = /path="([^"]+)"/g;
const validRoutes = new Set();
// Add core known routes
validRoutes.add('/');
validRoutes.add('');

let match;
while ((match = routeRegex.exec(appContent)) !== null) {
  let route = match[1];
  // remove leading slash for consistency unless it's just '/'
  if (route.startsWith('/') && route.length > 1) {
    route = route.substring(1);
  }
  validRoutes.add(route);
}

// 2. Extract sitemap URLs
const locRegex = /<loc>(?:https?:\/\/dsecuretech\.com\/)?(.*?)<\/loc>/g;
const sitemapUrls = [];
let smMatch;
while ((smMatch = locRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.push(smMatch[1]);
}

// 3. Find 404s
const baseUrl = 'https://dsecuretech.com/';
const missingRoutes = [];

// Helper to check if a route matches (including dynamic routes like :userId)
// Very rudimentary check: replace :var with [^/]+ and make a regex
function matchesAnyRoute(urlPath) {
    if (urlPath === '/' || urlPath === '') return validRoutes.has('/') || validRoutes.has('');
    
    // remove leading slash
    if (urlPath.startsWith('/')) urlPath = urlPath.substring(1);
    
    // check exact match first
    if (validRoutes.has(urlPath)) return true;

    // check against dynamic routes
    for (const route of validRoutes) {
       if (route.includes(':')) {
           const regexStr = '^' + route.replace(/:[^\/]+/g, '[^/]+') + '$';
           const regex = new RegExp(regexStr);
           if (regex.test(urlPath)) return true;
       }
    }
    
    // Check if it's admin/xxx in nested route. App.tsx has <Route path="admin" ...> and inside <Route path="performance" ...>
    // We didn't parse nested trees properly with regex, so let's do manual fallbacks for known prefixes or just check the raw App.tsx
    // For now, let's just do a simple substring check in App.tsx as a fallback
    
    // Fallback: search App.tsx for the exact path segment, or its basename
    const segments = urlPath.split('/');
    const lastSegment = segments[segments.length - 1];
    
    // if lastSegment shows up in App.tsx inside a path="" we might have missed nesting
    const fallbackRegex = new RegExp('path="' + lastSegment.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\\\$&") + '"');
    if (fallbackRegex.test(appContent)) {
       return true; 
    }

    return false;
}


for (const urlPath of sitemapUrls) {
    // skip the base domain itself
    if (urlPath === '') continue; 
    
    // some nested routes like admin/licenses are defined as path="licenses" under path="admin"
    // Let's do a more robust check by asking if `urlPath` is completely absent from validRoutes 
    // AND none of its segments exist in path="..."
    
    if (!matchesAnyRoute(urlPath)) {
        // Double check by seeing if it's explicitly handled
        missingRoutes.push(urlPath);
    }
}

console.log("Found " + missingRoutes.length + " potential 404 URLs in sitemap:");
missingRoutes.forEach(r => console.log(" - " + baseUrl + r));

// Also generate a list we can review
fs.writeFileSync('missing_urls.txt', missingRoutes.join('\n'));
