var fs  = require("fs");
const path = require('path');
var yargs = require('yargs').argv;

(function main(args)
{
    console.log("* Buddhinfo content generator 1.0.0 * ");

    var infilename,infile,indata,
        outfilename,outfile,outdata,
        titlesource,titlefile,titledata;

    var metalist = {},metasource = {};

    //Input filelist
    if (args.n || args.new)
    {
      console.log("Generating new, empty titlelist.");
      indata      = [];
    }
    else if(args.i || args.input)
    {
      console.log("Using '",args.i||args.input,"' as input filelist.");
        infilename = args.i || args.input;
        indata     = JSON.parse(fs.readFileSync(infilename))
        infile     = fs.writeFileSync("contentgen/filelist.json",
            JSON.stringify(indata)
        );
    }

    //Output filelist
    if(args.o || args.output)
    {
      console.log("Using '",args.o||args.outpur,"' as output filelist.");
        outfilename = args.o||args.outpur;
        outfile     = fs.openSync(args.o || args.output,2);
        outdata     = {};
    }

    //Title sourcing
    if (args.t || args.title)
    {
      console.log("Using '",args.t||args.title,"' as title source.");
      titlesource = args.t||args.title;
      var titledata      = sourceFile(titlesource,true);

      if (indata.length===0)
        indata = titledata.map(function(cat)
          {
            cat.content = cat.content.map(function(title)
            {
              title.description = title.data;
              delete title.data;
              return title;
            });
            return cat;
          });
      else
        for (var i=0;i<indata.length;i++)
          for (var x=0;x<indata[i].content.length;x++)
              for (var attr in titledata)
                indata[i].content[x][attr] =
                  titledata[i] &&
                  titledata[i].content[x]
                  ? titledata[i].content[x][attr]
                  : null;

      }

    if (args.m || args.missing)
        require("./find_missing_books_in_filelist");

    if (args.d || args.descjson)
        require("./descriptions_to_json");

    if (!args.n && !args.nosort)
        require("./create_final_descriptions_filelist");


    //Actual processing
    if (outfile)
    {
      if (metalist)
        outdata = expandList(indata,metalist,metasource)
      else
        outdata = indata;

      //Clean outfile
      fs.ftruncateSync(outfile);
      //Write all titles to file
      fs.writeSync(outfile,JSON.stringify(outdata,null,2));
      fs.closeSync(outfile);
    }

    if (infile)
    {
      fs.closeSync(infile);
    }

    if (outfile)
    {
      console.log("Succes: Filelist '",outfilename,"written.");
    }

    if (!infile && !outfile && !indata)
      printUsage();

}(yargs));

function printUsage()
{
  console.log("-n  --new\t\t\tGenerate an empty filelist");
  console.log("-i  --input=FILE\t\tUse this file as input filelist instead");
  console.log("-t  --title=SOURCEDIR\t\tFetch titles from JSON");
  console.log("-d  --description=SOURCEDIR\tFetch descriptions from JSON");
  console.log("-i  --image=SOURCEDIR\t\tFetch image sources from JSON");
  console.log("-a  --author=SOURCEDIR\t\tFetch authors from JSON");
  console.log("-o  --output=FILE\t\Out result to filelist");
  console.log("-m  --missing\tGenerate missing lists")
  console.log("-d  --descjson\tConvert descriptions from 'data' to 'json'")
  console.log("-n  --nosort\tDon't sort files alphabetically.");


  console.log("EXAMPLE USAGE")
  console.log("Generates a 'filelist.js' "+
              "using the 'json' directory as a source for titles.");
  console.log("contentgen -n -o='filelist.js' -t='json'");
}

function sourceFile(fpath,explicit)
{
    indata = [];
    if (fs.statSync(fpath).isDirectory())
    {
      var root = fs.readdirSync(fpath);
      if (explicit)
        console.log(" Directory was given, found",root.length,"categories:");
      for (var i=0;i<root.length;i++)
      {
        var prettyname = root[i].slice(0,root[i].indexOf('.'));
        if (explicit)
          console.log(i+1+":\t",prettyname,"\t(",root[i].length,"titles)");
        var jsondata = JSON.parse(
            fs.readFileSync(path.join(fpath,root[i]))
          );
        var content = Object.keys(jsondata)
                      .map(function (key) { return {name:key,
                                                    data:jsondata[key]}; });
        indata.push({name:prettyname,
                      content:content});
      }
    }
    else
    {
      indata   = JSON.parse(fs.readFileSync(args.t||args.title));
      if (explicit)
        console.log(" Singular file, no categories,"
                    +indata.length+" titles");
    }

    return indata;
};

function expandList(filelist,metalist)
{
  filelist = filelist || [];
  console.log("Expanding ",filelist.length," files with metadata.");
  for (var i=0;i<filelist.length;i++)
  {
    var category        = filelist[i];
    //expand dongs
    for (var x=0;x<category.content.length;x++)
    {
      var title             = category.content[x];
      for (var metatag in metalist)
        title[metatag] = metalist[metatag](title,metasource[metatag]);
    }
  }
  return filelist;
};
