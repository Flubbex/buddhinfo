const fs = require('fs');
const path = require('path');


const descriptionFiles = ["children", "general", "history-art", "mahayana", "meditation", "theravada"];
const fullTitleRe = new RegExp(/^\(\d*,?\d+\sKB\)\s+(.*)/);

console.log("Extract descriptions...");

var targetDir = path.join(__dirname, 'json');

if (!fs.existsSync(targetDir)){
  fs.mkdirSync(targetDirdir);
}

for(const fileSuffix of descriptionFiles) {
  const descriptionFileName = path.join(__dirname, 'data', 'descriptions_' + fileSuffix);
  const outFileName = path.join(targetDir, fileSuffix + '.json');

  fs.readFile(descriptionFileName, 'utf8', function (err, data) {
    const lines = data.split('\n');
    let descriptions = {};
    let currentDescription = "";
    let inDescription = false;
    let fullTitle = null;
    for(const line of lines) {
      if(line.trim() == "<end of file >") {
        break;
      }

      debugger
      const fullTitleMatch = line.match(fullTitleRe);
      if(fullTitleMatch) {
        if(inDescription) {
          if(fullTitle) {
            descriptions[fullTitle] = currentDescription;
          }
          currentDescription = "";
        }

        // Two spaces is the author separator
        fullTitle = fullTitleMatch[1].split('  ')[0].trim();
        inDescription = true;
        continue;
      }
      currentDescription += line.trim();
    }

    if(fullTitle) {
      descriptions[fullTitle] = currentDescription;
    }

    fs.writeFile(outFileName, JSON.stringify(descriptions, null, 2), 'utf8', ()=> {console.log('Finished ' + descriptionFileName)});
  });
}

