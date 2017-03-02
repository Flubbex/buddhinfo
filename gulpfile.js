var gulp 		= require("gulp");
var uglify 		= require("gulp-uglify");
var open		= require("gulp-open"); 
var browserify 	= require("gulp-browserify");


gulp.task("default",			["package"]);
gulp.task("reload",["package"],
	function() {
	return gulp.src("docs/index.html")
		.pipe(open({uri:__dirname+"/docs/index.html"}))
	}
);
gulp.task("watch",				["reload"],
	function () {
	return gulp.watch("source/**/*.js",["watch"]);	
	}
);
//Non-compressed tasks
gulp.task("reload-nocompress",	["package-nocompress"],
	function() {
	return gulp.src("docs/index.html")
		.pipe(open())
	}
)
gulp.task("watch-nocompress",	["reload-nocompress"],function () {
	return gulp.watch("source/**/*.js",["watch-nocompress"]);
});



//Browserify source files
gulp.task("build", function() {
    return gulp.src("source/index.js")
        .pipe(browserify())
        .pipe(gulp.dest("dist"))
});

//Compressed packager (build -> compress -> publish)
gulp.task("compress",["build"], function (cb) {
        return gulp.src("dist/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/ugly"))
});

gulp.task("publish",["compress"],function (cb) {
        return gulp.src("dist/ugly/*.js")
        .pipe(gulp.dest("docs/js"))
});

gulp.task("package",["publish"]);


//Non-compressed packager (build -> publish)
gulp.task("publish-nocompress",["build"],function (cb) {
        return gulp.src("dist/*.js")
        .pipe(gulp.dest("docs/js"))
});

gulp.task("package-nocompress",["publish-nocompress"]);




