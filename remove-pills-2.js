const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('c:/Users/bhard/Desktop/New folder/frontend/src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /[ \t]*<div className="inline-flex items-center gap-[^"]*rounded-full[^"]*">[\s\S]*?<\/div>\r?\n/g;
    
    if (regex.test(content)) {
      let newContent = content.replace(regex, '');
      fs.writeFileSync(filePath, newContent);
      console.log('Removed pill from', filePath);
      count++;
    }
  }
});
console.log('Total files updated:', count);
