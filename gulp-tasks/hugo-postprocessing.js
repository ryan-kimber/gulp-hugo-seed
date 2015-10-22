/** Created by ryan-kimber on 2015-10-18
 *
 * @param gulp
 * @param plugins
 * @param buildProperties
 *
 * assemble-html.js creates a gulp task that does post-processing on the output from Hugo (build/hugo-tmp) to
 * allow variable substitution, replacement of js libraries with concatenated, minified ones, insertion of deployment-specific
 * variables like Google Analytics IDs, etc.
 */
module.exports = function(gulp, plugins, buildProperties) {

    function inject(glob, path, tag) {
        return plugins.inject(
            gulp.src(glob, {
                cwd: path
            }), {
                starttag: '<!-- gulp-inject:' + tag + ':{{ext}} -->'
            }
        );
    }

    gulp.task('hugo-postprocessing', function(callback) {
       plugins.runSequence('hugo-postprocessing:assemble-html', 'hugo-postprocessing:copy-resources', function() {
         if(callback) callback();
       });
    });

    gulp.task('hugo-postprocessing:assemble-html', function(callback) {

        var gulpPipe = gulp.src('./build/hugo-tmp/**/*.html', { base: './build/hugo-tmp/' })
            .pipe(plugins.size({ showFiles: true }))
            .pipe(plugins.replace('${htmlBase}', buildProperties.htmlBase))
            .pipe(plugins.replace('${google.analytics.id}', buildProperties.GOOGLE_ANALYTICS_ID))
            .pipe(plugins.replace('${use.min}', buildProperties.useMin))
            .pipe(inject('./css/main*.css', buildProperties.targetDir, 'maincss'))
            .pipe(inject('./css/vendor-concat*.css', buildProperties.targetDir, 'vendorcss'))
            .pipe(inject('./js/app*.js', buildProperties.targetDir, 'appjs'))
            .pipe(inject('./js/vendor-concat*.js', buildProperties.targetDir, 'vendorjs'));


            if(buildProperties.minifyHtml) gulpPipe = gulpPipe.pipe(plugins.minifyHtml({
                  empty: true,
                  spare: true,
                  quotes: true
            }));

            gulpPipe.pipe(plugins.size({ showFiles: true }))
                 .pipe(gulp.dest(buildProperties.targetDir))
                 .on('end', callback || function(){
                     plugins.util.log("processing html completed for " + path + "...");
                 })
                 .on('error', plugins.util.log);
    });

    gulp.task('hugo-postprocessing:copy-resources', function(callback) {
        return gulp.src(['./build/hugo-tmp/*/**', '!./build/hugo-tmp/**/*.html', '!./build/hugo-tmp/**/*.scss'], { base: './build/hugo-tmp/' })
                   .pipe(gulp.dest(buildProperties.targetDir));
    });
}