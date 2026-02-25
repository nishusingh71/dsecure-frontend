import puppeteer from 'puppeteer';
import fs from 'fs';

const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
const locRegex = /<loc>(?:https?:\/\/dsecuretech\.com\/)?(.*?)<\/loc>/g;
const sitemapUrls = [];
let smMatch;
while ((smMatch = locRegex.exec(sitemapContent)) !== null) {
    if (smMatch[1] !== '') {
        sitemapUrls.push(smMatch[1]);
    }
}

const LOCAL_BASE = 'http://localhost:5173/';
const CONCURRENCY = 10;
const results = {
    valid: [],
    invalid: [], // 404s
    errors: []
};

async function checkUrl(browser, pathPath) {
    const url = LOCAL_BASE + pathPath;
    const page = await browser.newPage();
    try {
        await page.setDefaultNavigationTimeout(30000);
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        // Let React render
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

        const is404 = await page.evaluate(() => {
            // Check for NotFoundPage markers
            const bodyText = document.body.innerText || '';
            const heading = document.querySelector('h1')?.innerText || '';
            const bigText = document.querySelector('.text-8xl')?.innerText || '';
            return heading.includes('Page Not Found') || bigText.includes('404');
        });

        if (is404) {
            console.log(`❌ 404 Detected: ${url}`);
            results.invalid.push(pathPath);
        } else {
            console.log(`✅ OK: ${url}`);
            results.valid.push(pathPath);
        }
    } catch (err) {
        console.log(`⚠️  Error on ${url}: ${err.message}`);
        results.errors.push(pathPath);
    } finally {
        await page.close();
    }
}

async function run() {
    console.log(`Starting crawl of ${sitemapUrls.length} URLs...`);
    const browser = await puppeteer.launch({ headless: 'new' });
    
    // Process in chunks (concurrency)
    for (let i = 0; i < sitemapUrls.length; i += CONCURRENCY) {
        const chunk = sitemapUrls.slice(i, i + CONCURRENCY);
        const promises = chunk.map(url => checkUrl(browser, url));
        await Promise.all(promises);
    }
    
    await browser.close();
    
    console.log('\n--- CRAWL COMPLETE ---');
    console.log(`Valid: ${results.valid.length}`);
    console.log(`Invalid (404s): ${results.invalid.length}`);
    console.log(`Errors: ${results.errors.length}`);
    
    fs.writeFileSync('crawler_results.json', JSON.stringify(results, null, 2));
    if (results.invalid.length > 0) {
        console.log('\nFailed paths:');
        results.invalid.forEach(p => console.log(' - ' + p));
    }
}

run().catch(console.error);
