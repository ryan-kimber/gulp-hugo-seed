/**
 * Created by ryankimber on 2015-10-17.
 */
/**
 * This task (or set of tasks) deploys the assembled web site to an Amazon S3 bucket.
 * The S3 bucket name, server location, AWS Key and Secret should be set in gulp-config.json.
 * Be careful not to commit your gulp-config.json file to source control so you don't accidentally compromise your keys.
 */
module.exports = function(gulp, plugins, buildProperties) {
    gulp.task('deploy:prod', ['build:prod'], function(callback){

        console.log("Starting deploy to " + buildProperties.awsBucket + "...");
        // create a new publisher
        var publisher = plugins.awspublish.create({
            "key": buildProperties.awsKey,
            "secret": buildProperties.awsSecret,
            "Bucket": buildProperties.awsBucket,
            "region": buildProperties.awsRegion,
            "params": {
                "Bucket": buildProperties.awsBucket,
                "Region": buildProperties.awsRegion
            },
            "accessKeyId": buildProperties.awsKey,
            "secretAccessKey": buildProperties.awsSecret
        });

        // For most resources, we're going to set cache-controls so they get cached.
        var resourceHeaders = {
            'Cache-Control': 'max-age=1209600, no-transform, public',
            'Content-Encoding': 'gzip'
        };

        // For our HTML files, we'll set cache timeouts to 0, so they are always requested fresh (in case we make changes).
        var htmlHeaders = {
            'Cache-Control': 'max-age=0, no-transform, public',
            'Content-Encoding': 'gzip'
        };

        // First upload all of the non-html resources, don't push any .scss files, then push all the .html files with cache-timeout at 0.
        console.log("...starting upload...");
        gulp.src([buildProperties.deployDir + '/**/*',
            //Skip anything starting with a '!'
            '!' + buildProperties.deployDir + '/**/*.scss', '!' + buildProperties.deployDir + '/**/*.html'])
            .pipe(plugins.awspublish.gzip())
            .pipe(publisher.publish(resourceHeaders))
            .pipe(plugins.awspublish.reporter())
            .on('end', function(){
                gulp.src([buildProperties.deployDir + '/**/*.html'])
                    .pipe(plugins.awspublish.gzip())
                    .pipe(publisher.publish(htmlHeaders))
                    .pipe(plugins.awspublish.reporter())
                    .on('end', function(){
                        console.log("Completed upload...");
                        if(callback) callback();
                    });
            });

    });
}