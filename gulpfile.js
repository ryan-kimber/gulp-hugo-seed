
var _                   = require('lodash'),
    glob                = require('glob'),
    gulp                = require('gulp'),
    path                = require('path'),
    plugins             = require('gulp-load-plugins')(),
    runSequence         = require('run-sequence');


//Make runSequence available to our child tasks through plugins
plugins.runSequence = runSequence;

var buildProperties = {
    GOOGLE_ANALYTICS_ID : process.env.GOOGLE_ANALYTICS_ID || 'DEVELOP', //Your Google Analytics ID
    htmlBase            : 'http://localhost:4000/',
    expressPort         : 4000,
    expressDir          : path.resolve('./build/express-tmp'),
    liveReloadPort      : 35729,
    deployDir           : path.resolve('./build/www'),
    vendorDir           : path.resolve('./hugo-content/static/vendor'),
    minifyCss           : true,
    minifyHtml          : false
};

//Extend the properties with properties loaded from ./gulp-config.json, if it exists.
try {
    _.extend(buildProperties, require('./gulp-config.json').config);
}
catch(e) {
    console.log("No gulp-config.json file found, just using the default properties for Google Analytics ID, AWS, etc.");
    console.log("If you'd like to use your own custom Google Analytics ID, or deploy to Amazon S3, copy ./gulp-config-default.json to ./gulp-config.json and replace the default values with your own.");
}

//Ensure there is a buildTarget set in buildProperties (will be overridden by build:prod, or other production tasks.
buildProperties.targetDir = buildProperties.expressDir;


//Dynamically load all of the task definitions in ./gulp-tasks/*.js
glob.sync( './gulp-tasks/*.js' ).forEach( function( file ) {
    try {
        require(path.resolve(file))(gulp, plugins, buildProperties);
    }catch(e) {
        console.log("\r\nUnable to load gulp tasks from " + file + ": Expecting file to export function(gulp, plugins, buildProperties){...}\r\n");
    }
});
