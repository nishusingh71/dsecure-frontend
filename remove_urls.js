import fs from 'fs';
const path = 'public/sitemap.xml';
let content = fs.readFileSync(path, 'utf8');

const urlsToRemove = [
  'https://dsecuretech.com/licenses',
  'https://dsecuretech.com/blog/securePHIErase',
  'https://dsecuretech.com/erasing-traces',
  'https://dsecuretech.com/cloud-integration',
  'https://dsecuretech.com/installation',
  'https://dsecuretech.com/settings',
  'https://dsecuretech.com/groups',
  'https://dsecuretech.com/performance',
  'https://dsecuretech.com/report-management',
  'https://dsecuretech.com/groups/add',
  'https://dsecuretech.com/profile/edit',
  'https://dsecuretech.com/private-cloud-setup',
  'https://dsecuretech.com/scheduling-tasks',
  'https://dsecuretech.com/machines',
  'https://dsecuretech.com/user-interface',
  'https://dsecuretech.com/faq',
  'https://dsecuretech.com/users',
  'https://dsecuretech.com/users/add',
  'https://dsecuretech.com/sessions',
  'https://dsecuretech.com/downloads',
  'https://dsecuretech.com/connecting-domain'
];

let changed = false;
urlsToRemove.forEach(url => {
    // try finding just the loc
    const index = content.indexOf('<loc>' + url + '</loc>');
    if (index !== -1) {
       console.log('Found manual index for ' + url);
       const start = content.lastIndexOf('<url>', index);
       const end = content.indexOf('</url>', index) + 6;
       if (start !== -1 && end !== -1) {
          // Remove from start to end, and also try to remove the trailing newline and spaces
          const before = content.substring(0, start);
          const after = content.substring(end);
          content = before + after;
          changed = true;
       }
    } else {
       console.log('Not found: ' + url);
    }
});

// Remove blank lines if any left behind
content = content.replace(/^\s*$(?:\r\n?|\n)/gm, '');

if (changed) {
  fs.writeFileSync(path, content);
  console.log('Sitemap updated successfully.');
} else {
  console.log('No changes made to sitemap.');
}
