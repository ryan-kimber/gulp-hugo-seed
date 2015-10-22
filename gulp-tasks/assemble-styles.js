/**
 * Created by ryankimber on 2015-10-18.
 */
module.exports = function(gulp, plugins, buildProperties) {

    gulp.task('assemble-styles', function() {
        //We're storing scss variables in files named with the prefix '__'. These need to be processed at the start of the stream.
        var thePipe = gulp.src(['./src/hugo/**/__*.scss', './src/hugo/static/css/*.scss', './src/hugo/layouts/**/*.scss'])
                .pipe(plugins.size({ showFiles: true }))
                .pipe(plugins.concat('./css/main-is-all.css'))
                .pipe(plugins.sass({ includePaths : ['./src/hugo/static/css/'] }))
                .on('error', plugins.util.log)
                .on('end', function() {
                    plugins.util.log('Done building main.css...');
                });

        if(buildProperties.minifyCss)
        {
            console.log("Creating minified main.css...");
            return thePipe.pipe(plugins.minifyCss())
            .pipe(plugins.rev())
            .pipe(plugins.size({ showFiles: true }))
            .pipe(gulp.dest(buildProperties.targetDir));
        }
        else return thePipe.pipe(gulp.dest(buildProperties.targetDir));

    });
};