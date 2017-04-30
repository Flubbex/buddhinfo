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

let promiseList = [];

let bookCompare = function(bookA, bookB) {
  let bookAName = bookA.name.trim().replace(/^The\s/, "").replace(/^A\s/, "")
  let bookBName = bookB.name.trim().replace(/^The\s/, "").replace(/^A\s/, "")
  if(bookAName < bookBName) {
    return -1;
  } else if (bookAName > bookBName) {
    return 1;
  } else {
    return 0;
  }
}

console.log("Creating final filelist.js");

for(const fileSuffix of Object.keys(descriptionToFilelistMap)) {
  const jsonFileName = path.join(__dirname, 'json', fileSuffix + ".json");
  const missingFileName = path.join(__dirname, 'missing', fileSuffix + ".json");
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


  // Grab the json data
  const grabBookData = function(callback) {
    fs.readFile(jsonFileName, 'utf8', (jsonErr, jsonData) => {
      fs.readFile(missingFileName, 'utf8', (missingErr, missingData) => {
        callback(JSON.parse(jsonData), JSON.parse(missingData));
      });
    });
  }


  let content = targetFilelist.content;
  let name = targetFilelist.name;

  promiseList.push(new Promise(function(resolve, reject) {
    grabBookData(function(bookData, missingBooks)  {
      // Supplement the data in the targetFilelist with the data from json
      let newFilelist = [];
      let reverseMissingMap = new Map(Object.keys(missingBooks).map((k) => [missingBooks[k], k]));
      let newTargetBook = null;
      for(const targetBook of content) {
        newTargetBook = targetBook;
        let desc = "";
        let realName = "";
        if(reverseMissingMap.has(targetBook.name)) {
          realName  = reverseMissingMap.get(targetBook.name);
          desc = bookData[realName];
        }
        newTargetBook["description"] = desc;
        newFilelist.push(newTargetBook);
      }
      newFilelist.sort(bookCompare);
      let finalList = {"name": name, "content": newFilelist};
      resolve(finalList);
    })
  }));

}

Promise.all(promiseList).then(function(values) {
  let finalJavascript = "var filelist = " + JSON.stringify(values, null, 2) + ";\nmodule.exports = filelist;\n";
  fs.writeFile(path.join(__dirname, '..', 'filelist.js'), finalJavascript, 'utf8', () => console.log('Finished'));
});
