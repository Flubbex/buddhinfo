var gulp        = require("gulp"),
    uglify      = require("gulp-uglify"),
    browserify  = require("gulp-browserify"),
    jshint      = require("gulp-jshint"),
    open        = require("gulp-open"),
    mocha       = require('gulp-mocha');

var package = require("./package.json");

var app = {
        name:package.name //used as main namespace name
};

//Test /source using /test and write a HTML report to /docs
//TODO; write a JSON report to /docs
gulp.task('test', function()
{
    return gulp.src('/test/index.js')
        .pipe(mocha())
        //.pipe(gulp.dest('docs/info.html'))
});

//Lint /source
//TODO; write a JSON report to /docs
gulp.task('lint', function()
{
    return gulp.src('source/index.js')
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish",{verbose:true}))
    .pipe(jshint.reporter("fail"))
});

//Watch for changes in /source, reload if so.
gulp.task("watch", function()
{
    return gulp.watch("source/**/*.js",["reload"]);
});

//Browserify /source files to /dist/developer
gulp.task("build",  function()
{
    return gulp.src("source/index.js")
    .pipe(browserify())
    .pipe(gulp.dest("dist/developer"))
});

//merge all /dist/developer files into one
gulp.task('merge', function(){
  gulp.src('source/developer/**/*')
    .pipe(gulp.dest('dist/developer/index.js'));
});

//Uglify /dist/developer to /dist/release
gulp.task("compress", ["build"], function()
{
    return gulp.src("dist/developer/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/release"))
});

//Remove everything in /dist/developer and dist/test
gulp.task("clean", function()
{
        //TODO: Implement /dist/dev and /dist/test cleaning
});

//Publish files from /dist/developer to /docs/js
gulp.task("publish-developer",["build"], function()
{
    return gulp.src("dist/developer/*.js")
    .pipe(gulp.dest("docs/js"))
});

//Publish files from /dist/release to /docs/js
gulp.task("publish",["compress"], function()
{
    return gulp.src("dist/release/*.js")
    .pipe(gulp.dest("docs/js"))
});

//Open /doc/index.html in browser
gulp.task("reload",["publish-developer"], function()
{
    return gulp.src("docs/index.html")
    .pipe(open({uri:__dirname+"/docs/index.html"}))
});

gulp.task("default",        ["publish-developer"]);
gulp.task("developer",      ["watch","publish-developer"]);
