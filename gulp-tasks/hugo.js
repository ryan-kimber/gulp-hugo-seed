/**
 * Created by ryankimber on 2015-10-17.
 */
module.exports = function(gulp, plugins, buildProperties) {
    gulp.task('hugo:dev', ['clean'], function(callback) {
        gulp.src('').pipe(plugins.shell(['hugo -v -D -F -d ../../build/hugo-tmp -s ./src/hugo -b ' + buildProperties.htmlBase], { cwd: process.cwd() })).on('end', callback || function() {});;
    });

    gulp.task('hugo:prod', ['clean'], function(callback) {
        gulp.src('').pipe(plugins.shell(['hugo -v -d ../../build/hugo-tmp -s ./src/hugo -b ' + buildProperties.htmlBase], { cwd: process.cwd() })).on('end', callback || function() {});;
    });
}