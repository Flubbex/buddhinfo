var fs = require("fs");


console.log("Checking /missing/ descriptions");
var files = fs.readdirSync("missing");
files.map(function(filename){
   var file = fs.readFileSync("missing/"+filename);
   var data = JSON.parse(file);
   var missing = Object.keys(data).filter(function (key)
                                    {
                                        return !data[key];
                                    });
   console.log(filename);
   if (missing.length === 0)
    console.log("\t","No missing descriptions found");
   else
    console.log(missing);

});

console.log("\n","Checking filelist.js metadata");

var file = fs.readFileSync("../source/filelist.json");
var data  = JSON.parse(file);
var result = {};
data.map(function(category){
    console.log(category.name)
    result[category.name] = 0;
   category.content.map(function(title){
       for (var attr in title)
        if (title[attr] === null || title[attr] === "")
        {
            console.log("\t",title.name.slice(0,12)+"...","\t\t","missing metadata:",attr);
            result[category.name]++;
        }
   });

});

console.log("Overview:")
for (var cat in result)
    console.log("\t",cat,"missing\t",result[cat],"\tmetadata entries in total.");

console.log("done");
