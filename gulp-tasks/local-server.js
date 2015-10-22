/**
 * Created by ryankimber on 2015-10-17.
 */
module.exports = function(gulp, plugins, buildProperties) {
    gulp.task('local-server', function(callback) {

        plugins.connect.server({
            root: [buildProperties.expressDir],
            port: buildProperties.expressPort,
            livereload: true
        });

        console.log("About to call clean, then build-dev...");
        //actions.startLiveReload(buildProperties);
        plugins.util.log("Starting watches...");
        gulp.watch(['./src/js/**/*.js', './src/js/**/*.tpl.html'], ['assemble-javascript']);
        gulp.watch(['src/hugo/static/**/*.scss'], ['assemble-styles']);
        gulp.watch(['src/hugo/static/**/*', '!src/hugo/static/**/*.scss'], ['build:dev']);
        gulp.watch(['src/hugo/content/**/*', 'src/hugo/layouts/**/*'], ['build:dev']);
        if(callback) callback();
    });
}