/**
 * Created by ryankimber on 2015-10-13.
 */
module.exports = function(gulp, plugins, buildProperties) {
    gulp.task('clean', function(){
        return gulp
            .src(['./build'], {read: false})
            .pipe(plugins.rimraf({force: true}));
    });
}