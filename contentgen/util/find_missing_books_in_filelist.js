'use strict';
const fs = require('fs');
const path = require('path');

const filelist = require('./filelist')

const descriptionToFilelistMap = {
  "children": "Children",
  "general": "General",
  "history-art": "History",
  "mahayana": "Mahayana",
  "meditation": "Meditation",
  "theravada": "Theravada"
};

var targetDir = path.join(__dirname, 'missing');

if (!fs.existsSync(targetDir)){
  fs.mkdirSync(targetDirdir);
}

console.log('Attempting to resolve book names');


for(const fileSuffix of Object.keys(descriptionToFilelistMap)) {
  const jsonFileName = path.join(__dirname, 'json', fileSuffix + ".json");
  const filelistKey = descriptionToFilelistMap[fileSuffix];

  let targetFilelist = null;
  for(const currFilelist of filelist) {
    if(currFilelist.name == filelistKey) {
      targetFilelist = currFilelist;
      break;
    }
  }
  if(!targetFilelist) {
    throw "Couldn't find file list for " + filelistKey;
  }

  function findMissing(err, data) {
    const missingMapFileName = path.join(targetDir, fileSuffix + '.json');
    const fileList = targetFilelist.content
    const jsonData = JSON.parse(data);
    const fileBooks = new Set(fileList.map((b) => b.name.toLowerCase()));

    fs.readFile(missingMapFileName, 'utf8', function(err, data) {
      debugger
      let missingBookMap = {}

      if(!err) {
        missingBookMap = JSON.parse(data);
      }

      // Create a list of books that we can't find in the fileList
      // Assuming that it is not already accounted for.
      for(const bookName of Object.keys(jsonData)) {
        if(!fileBooks.has(bookName.toLowerCase())) {
          if(!missingBookMap[bookName]) {
            missingBookMap[bookName] = null;
          }
        } else {
          missingBookMap[bookName] = bookName;
        }
      }

      fs.writeFile(missingMapFileName, JSON.stringify(missingBookMap, null, 2),
          'utf8', () => console.log('Missing Books To ' + missingMapFileName));
    });

  }

  fs.readFile(jsonFileName, 'utf8', findMissing);
}
