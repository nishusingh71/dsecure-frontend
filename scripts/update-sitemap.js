import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://dsecuretech.com";
const currentDate = new Date().toISOString().split("T")[0];

const appTsxPath = path.join(__dirname, "..", "src", "App.tsx");
const routesDir = path.join(__dirname, "..", "src", "routes");

// Routes to explicitly exclude from the sitemap
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
  "*",
];

// Routes to explicitly include with specific priorities (overrides auto-detection)
const PRIORITY_ROUTES = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/services": { changefreq: "weekly", priority: "0.9" },
  "/solutions": { changefreq: "weekly", priority: "0.9" },
  "/products": { changefreq: "weekly", priority: "0.9" },
  "/download": { changefreq: "weekly", priority: "0.8" },
  "/contact": { changefreq: "monthly", priority: "0.7" },
  "/about": { changefreq: "monthly", priority: "0.6" },
  "/llms.txt": { changefreq: "daily", priority: "0.8" },
  "/llms-full.txt": { changefreq: "daily", priority: "0.8" },
};

function extractRoutesFromFiles() {
  const allRoutes = new Set();
  const filesToScan = [appTsxPath];

  // Bacho, hum saari files scan karenge jo routes define karti hain
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

      // Remove comments to prevent extracting commented out routes
      const cleanContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");

      // Regex for <Route path="..." />
      const pathRegex = /<Route[\s\S]*?path=["']([^"']+)["']/g;
      let match;
      while ((match = pathRegex.exec(cleanContent)) !== null) {
        let routePath = match[1];

        // Normalizing path
        if (!routePath.startsWith("/") && !routePath.startsWith("http")) {
          routePath = "/" + routePath;
        }

        // Exclude dynamic and wildcards
        if (routePath.includes(":") || routePath.includes("*")) continue;

        // Element check for Navigate (Redirects should not be in sitemap)
        // Find the tag and check if it contains <Navigate
        const tagMatch = cleanContent
          .slice(match.index, match.index + 300)
          .match(/<Route[\s\S]*?>/);
        if (tagMatch && tagMatch[0].includes("Navigate")) continue;

        allRoutes.add(normalizePath(routePath));
      }

      // Special case: index routes
      if (cleanContent.includes("index")) {
        // If we find an index route, we'll try to determine its base path
        // For simplicity, we'll just ensure '/' is present, or try to infer from the file context
        if (filePath.includes("PublicRoutes") || filePath.includes("App.tsx")) {
          allRoutes.add("/");
        }
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
