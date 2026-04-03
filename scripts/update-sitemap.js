import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://dsecuretech.com";
const currentDate = new Date().toISOString().split("T")[0];

const appTsxPath = path.join(__dirname, "..", "src", "App.tsx");
const routesDir = path.join(__dirname, "..", "src", "routes");

// Sitemap se exclude karne wale routes — admin, dashboard, aur protected routes
const EXCLUDED_ROUTES = [
  "/admin",
  "/dashboard",
  "/login",
  "/register",
  "/payment",
  "/checkout",
  "/order-success",
  "/order-failure",
  "/api-test",
  "/search-demo",
  "/unauthorized",
  "/404",
  "/download",
  "/private-cloud-setup",
  "/profile",
  "*",
];

// Routes to explicitly include with specific priorities (overrides auto-detection)
const PRIORITY_ROUTES = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/services": { changefreq: "weekly", priority: "0.9" },
  "/solutions": { changefreq: "weekly", priority: "0.9" },
  "/products": { changefreq: "weekly", priority: "0.9" },
  "/download": { changefreq: "weekly", priority: "0.8" },
  "/support/faq": { changefreq: "weekly", priority: "0.8" },
  "/blogs": { changefreq: "weekly", priority: "0.8" },
  "/contact": { changefreq: "monthly", priority: "0.7" },
  "/about": { changefreq: "monthly", priority: "0.6" },
  "/llms.txt": { changefreq: "daily", priority: "0.8" },
  "/llms-full.txt": { changefreq: "daily", priority: "0.8" },
};

/**
 * JSX-aware Route tag parser — {curly braces} ke andar ke /> ko ignore karta hai
 * Ye zaroori hai kyunki element={<Component />} ka /> galat match ho jaata hai
 */
function parseRouteTags(content) {
  const tags = [];
  let pos = 0;
  
  while (pos < content.length) {
    const routeStart = content.indexOf('<Route', pos);
    if (routeStart === -1) break;
    
    // Tag ke end tak scan karo, brace depth track karte hue
    let i = routeStart + 6;
    let braceDepth = 0;
    let inString = false;
    let stringChar = '';
    let tagEnd = -1;
    let isSelfClosing = false;
    
    while (i < content.length) {
      const ch = content[i];
      
      // String ke andar ho toh skip karo
      if (inString) {
        if (ch === stringChar && content[i - 1] !== '\\') inString = false;
        i++;
        continue;
      }
      
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
        i++;
        continue;
      }
      
      if (ch === '{') { braceDepth++; i++; continue; }
      if (ch === '}') { braceDepth--; i++; continue; }
      
      // Sirf braceDepth 0 pe tag boundary detect karo
      if (braceDepth === 0 && ch === '>') {
        if (i > 0 && content[i - 1] === '/') {
          isSelfClosing = true;
        }
        tagEnd = i + 1;
        break;
      }
      
      i++;
    }
    
    if (tagEnd === -1) { pos = routeStart + 6; continue; }
    
    const tagContent = content.substring(routeStart, tagEnd);
    const pathMatch = tagContent.match(/path=["']([^"']+)["']/);
    
    tags.push({
      index: routeStart,
      end: tagEnd,
      path: pathMatch ? pathMatch[1] : null,
      isSelfClosing,
      hasNavigate: tagContent.includes('Navigate'),
    });
    
    pos = tagEnd;
  }
  
  return tags;
}

/**
 * Nested Route ke liye matching closing tag dhundho
 * Depth tracking se sahi </Route> milti hai
 */
function findMatchingClose(content, startPos) {
  let depth = 1;
  let pos = startPos;
  
  while (pos < content.length && depth > 0) {
    const nextOpen = content.indexOf('<Route', pos);
    const nextClose = content.indexOf('</Route>', pos);
    
    if (nextClose === -1) return -1; // Koi closing tag nahi mila
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      // Check karo ki ye self-closing hai ya nahi
      const tagEnd = content.indexOf('>', nextOpen);
      if (tagEnd !== -1 && content[tagEnd - 1] === '/') {
        // Self-closing tag — depth change nahi hogi
        pos = tagEnd + 1;
      } else {
        depth++;
        pos = tagEnd + 1;
      }
    } else {
      depth--;
      if (depth === 0) return nextClose;
      pos = nextClose + 8; // '</Route>'.length
    }
  }
  
  return -1;
}

function extractRoutesFromFiles() {
  const allRoutes = new Set();
  const filesToScan = [appTsxPath];

  // Saari route files scan karo
  if (fs.existsSync(routesDir)) {
    const routeFiles = fs
      .readdirSync(routesDir)
      .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
      .map((file) => path.join(routesDir, file));
    filesToScan.push(...routeFiles);
  }

  filesToScan.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Comments hata do taaki commented routes na mil jaayein
      const cleanContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");

      // ProtectedRoute wali route files skip karo — admin/dashboard routes public sitemap mein nahi chahiye
      // App.tsx ko skip nahi karna hai kyunki usme public routes bhi import hote hain
      const fileName = path.basename(filePath);
      if (fileName !== "App.tsx" && (filePath.includes("DashboardRoutes") || filePath.includes("AuthRoutes"))) {
        console.log(`⏭️  Skipping protected routes file: ${fileName}`);
        return;
      }

      // Nested route resolution — proper JSX parser jo {curly braces} handle kare
      // Regex se ye kaam nahi hota kyunki element={<Component />} ka /> galat match hota hai
      const routeTags = parseRouteTags(cleanContent);

      // Nesting track karo — stack based approach
      const parentStack = []; // [{path, closeIndex}]

      for (const tag of routeTags) {
        // Pehle check karo ki koi parent close hua hai
        while (parentStack.length > 0 && parentStack[parentStack.length - 1].closeIndex <= tag.index) {
          parentStack.pop();
        }

        if (tag.path) {
          // Dynamic aur wildcard routes skip karo
          if (tag.path.includes(":") || tag.path.includes("*")) {
            if (!tag.isSelfClosing) {
              const closePos = findMatchingClose(cleanContent, tag.end);
              if (closePos !== -1) parentStack.push({ path: tag.path, closeIndex: closePos });
            }
            continue;
          }

          // Navigate wale routes skip karo
          if (tag.hasNavigate) continue;

          let fullPath = tag.path;

          // Agar relative path hai (/ se start nahi hota) toh parent path prefix lagao
          if (!fullPath.startsWith("/")) {
            const parentPath = parentStack.length > 0 ? parentStack[parentStack.length - 1].path : "";
            const normalizedParent = parentPath.startsWith("/") ? parentPath : "/" + parentPath;
            fullPath = normalizedParent.replace(/\/$/, "") + "/" + fullPath;
          }

          allRoutes.add(normalizePath(fullPath));
        }

        // Agar self-closing nahi hai toh ye parent ban sakta hai
        if (!tag.isSelfClosing && tag.path) {
          const closePos = findMatchingClose(cleanContent, tag.end);
          if (closePos !== -1) {
            const resolvedPath = tag.path.startsWith("/") ? tag.path : (parentStack.length > 0 ? (parentStack[parentStack.length - 1].path.replace(/\/$/, "") + "/" + tag.path) : "/" + tag.path);
            parentStack.push({ path: resolvedPath, closeIndex: closePos });
          }
        }
      }

      // Homepage ensure karo
      if (filePath.includes("PublicRoutes") || filePath.includes("App.tsx")) {
        allRoutes.add("/");
      }
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  });

  // Adding manual query param routes that are important for SEO
  const queryRoutes = [
    "/services?search=mobile+device+erasure",
    "/services?search=network+server+erasure",
    "/services?search=cloud+data+erasure",
    "/compliance?standard=nist",
    "/compliance?standard=gdpr",
    "/compliance?standard=hipaa",
    "/compliance?standard=iso27001",
    "/solutions?industry=enterprise",
    "/solutions?industry=healthcare",
    "/solutions?industry=financial",
    "/solutions?industry=government",
    "/llms.txt",
    "/llms-full.txt",
  ];

  queryRoutes.forEach((r) => allRoutes.add(r));

  // Filter out excluded routes and prefixes, and ensure uniqueness
  const seen = new Set();
  const finalRoutes = Array.from(allRoutes)
    .filter((route) => {
      if (!route || seen.has(route)) return false;
      seen.add(route);
      
      const isExcluded = EXCLUDED_ROUTES.some((excluded) => {
        if (excluded === "*") return route === "*";
        return (
          route === excluded ||
          route.startsWith(excluded + "/") ||
          (excluded !== "/" && route.startsWith(excluded))
        );
      });
      return !isExcluded;
    })
    .sort((a, b) => a.localeCompare(b));

  console.log(`✅ Extracted ${finalRoutes.length} unique routes from source files.`);
  return finalRoutes;
}

function normalizePath(p) {
  if (!p) return "/";
  // Ensure single leading slash
  let clean = p.startsWith("/") ? p : "/" + p;
  // Remove trailing slash unless it's just '/'
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

function generateSitemap() {
  const discoveredRoutes = extractRoutesFromFiles();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  discoveredRoutes.forEach((routePath) => {
    let priority = "0.5";
    let changefreq = "monthly";

    if (PRIORITY_ROUTES[routePath]) {
      priority = PRIORITY_ROUTES[routePath].priority;
      changefreq = PRIORITY_ROUTES[routePath].changefreq;
    } else {
      if (
        routePath.startsWith("/products") ||
        routePath.startsWith("/services") ||
        routePath.startsWith("/solutions")
      ) {
        priority = "0.8";
        changefreq = "weekly";
      } else if (routePath.includes("blog/")) {
        priority = "0.7";
        changefreq = "weekly";
      } else if (routePath.includes("manual/")) {
        priority = "0.7";
        changefreq = "monthly";
      }
    }

    const loc = `${baseUrl}${routePath}`.replace(/&/g, "&amp;");
    
    // lastmod calculation: Try to find the source file to get actual modification date
    let lastmod = currentDate;
    try {
      // Basic mapping from route to file path for lastmod
      let potentialFile = '';
      if (routePath === '/') potentialFile = 'src/pages/HomePage.tsx';
      else if (routePath.includes('blog/')) potentialFile = `src/pages/blog/${routePath.split('/').pop()}Page.tsx`; // Heuristic
      else potentialFile = `src/pages/${routePath.split('/').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')}Page.tsx`;

      const fullPath = path.join(__dirname, "..", potentialFile);
      if (fs.existsSync(fullPath)) {
        lastmod = fs.statSync(fullPath).mtime.toISOString().split("T")[0];
      }
    } catch (e) {
      // Fallback to currentDate
    }

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return { xml, count: discoveredRoutes.length };
}

function updateSitemap() {
  try {
    const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
    const result = generateSitemap();

    fs.writeFileSync(sitemapPath, result.xml);

    console.log("✅ Sitemap updated successfully!");
    console.log(`📅 Date: ${currentDate}`);
    console.log(`📄 Total URLs: ${result.count}`);

    // Update robots.txt timestamp
    const robotsPath = path.join(__dirname, "..", "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      let robotsContent = fs.readFileSync(robotsPath, "utf8");
      if (!robotsContent.includes("# Last updated:")) {
        robotsContent += `\n\n# Last updated: ${currentDate}`;
      } else {
        robotsContent = robotsContent.replace(
          /# Last updated: .*/,
          `# Last updated: ${currentDate}`,
        );
      }
      fs.writeFileSync(robotsPath, robotsContent);
      console.log("✅ Robots.txt updated!");
    }
  } catch (error) {
    console.error("❌ Error updating sitemap:", error.message);
    process.exit(1);
  }
}

updateSitemap();
