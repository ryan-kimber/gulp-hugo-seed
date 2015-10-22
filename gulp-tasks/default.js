/**
 * Created by ryankimber on 2015-10-13.
 */
module.exports = function(gulp, plugins, options) {
    gulp.task('default', function(callback){
        plugins.runSequence('build:dev', 'local-server', function(){
            if(callback) callback();
        });
    });
}