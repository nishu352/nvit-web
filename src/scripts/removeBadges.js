const fs = require('fs');
const files = [
  'c:/Users/bhard/Desktop/New folder/frontend/src/config/primaryServicesContent.ts',
  'c:/Users/bhard/Desktop/New folder/frontend/src/config/childServicesContent.ts'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/,\s*badge:\s*"Live API"/g, '');
  content = content.replace(/,\s*badge:\s*"Interactive"/g, '');
  fs.writeFileSync(file, content);
});
console.log('Done!');
