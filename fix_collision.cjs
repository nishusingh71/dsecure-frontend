const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/locales/*.json');

for (const file of files) {
  let j;
  try {
    j = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch(e) { continue; }
  
  if (j.dashboard && typeof j.dashboard.adminDashboard === 'string') {
    j.dashboard.adminDashboardTitle = j.dashboard.adminDashboard;
    delete j.dashboard.adminDashboard;
    fs.writeFileSync(file, JSON.stringify(j, null, 2));
    console.log(`Renamed in ${file}`);
  }
}
