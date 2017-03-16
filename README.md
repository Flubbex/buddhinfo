# HTML5base
*Basic framework for my Browserify projects.*

### Contains
* node-inspector for debugging
* mocha for testing
* JSHint code verification + jshint-stylish output
* Gulp tasks to automate everything
* Minimal CSS Skeleton framework (22,6kb)

### Gulp tasks
| Name|Task|Source|Destination|
|-----|----|------|-----------|
| build|Browserify|/source|/dist/dev/|
| lint|Validate|/dist/dev|Console
| merge|Merge|/dist/dev/|/dist/dev/index.js
| compress|Uglify|/dist/dev/index.js|/dist/rel/index.js
| publish|Publish| /dist/rel/index.js|/docs/js/index.js
|reload|Open file|/docs/index.html|Browser
|watch|Auto reload|/source/|reload

### Folder structure

#### source
Project root folder.

#### test
Unit tests for /source.

#### dist
Distributions of /source files.

#### docs
Public HTML files.


### Dependencies
*   "gulp":              "^3.9.1"
*   "gulp-browserify":   "^0.5.1"
*   "gulp-jshint":       "^2.0.4"
*   "gulp-open":         "^2.0.0"
*   "gulp-uglify":       "^2.0.1"
*   "jshint":            "^2.9.4"
*   "jshint-stylish":    "^2.2.1"
*   "mocha":             "^3.2.0"
*   "node-inspector":    "^0.12.10"

## Install everything
*npm install     gulp gulp-browserify gulp-jshint gulp-open gulp-uglify
                jshint jshint-stylish mocha node-inspector*

### Credits
[dhg](https://github.com/dhg) - [Skeleton](https://github.com/dhg/Skeleton)
