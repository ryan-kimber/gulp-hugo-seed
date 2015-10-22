/**
 * Created by ryan-kimber on 2015-10-18.
 */
module.exports = function(gulp, plugins, buildProperties) {

    gulp.task('build:dev', function(callback) {
        plugins.runSequence('clean', 'hugo:dev', 'assemble-styles', 'hugo-postprocessing', function() {
           if(callback) callback();
        });
    });

    gulp.task('build:prod', function(callback) {
        //override the target directory to use the our deployment build directory.
        buildProperties.targetDir = buildProperties.deployDir;
        buildProperties.minifyCss = true;
        buildProperties.minifyHtml = true;
        //buildProperties.GOOGLE_ANALYTICS_ID = 'UA-55041245-1';
        //buildProperties.base = 'http://launchcode.io/';
        plugins.runSequence('clean', 'hugo:prod', 'assemble-styles', 'hugo-postprocessing', function() {
            if(callback) callback();
        });
    });
}