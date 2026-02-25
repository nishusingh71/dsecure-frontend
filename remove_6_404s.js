import fs from 'fs';

const urlsToRemove = [
    'https://dsecuretech.com/licensing',
    'https://dsecuretech.com/erasing-files',
    'https://dsecuretech.com/edit-subuser',
    'https://dsecuretech.com/reports',
    'https://dsecuretech.com/quick-overview',
    'https://dsecuretech.com/subusers'
];

let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

urlsToRemove.forEach(url => {
    const index = sitemap.indexOf('<loc>' + url + '</loc>');
    if (index !== -1) {
       console.log('Found and removing: ' + url);
       const start = sitemap.lastIndexOf('<url>', index);
       const end = sitemap.indexOf('</url>', index) + 6;
       if (start !== -1 && end !== -1) {
          sitemap = sitemap.substring(0, start) + sitemap.substring(end);
       }
    } else {
       console.log('Not found: ' + url);
    }
});

// Remove blank lines cleanly without powershell parsing errors
sitemap = sitemap.split('\n').filter(line => line.trim() !== '').join('\n');

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Successfully cleaned sitemap.');
