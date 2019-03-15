var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Compile LESS files from /less into /css
gulp.task('less', function(done) {
    gulp.src('less/etnx.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('less/spinner.less')
            .pipe(less())
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.reload({
                stream: true
        }));
        done();
});

// Minify compiled CSS
gulp.task('minify-css', gulp.series('less', function(done) {
    gulp.src('dist/css/etnx.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('dist/css/spinner.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        done();
}));

// Copy JS to dist
gulp.task('js', function(done) {
    gulp.src(['js/etnx.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/simulatedData.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/index.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/login.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/register.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/pin-code.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/history.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/send.js']).pipe(gulp.dest('dist/js'));
    gulp.src(['js/mob_wallet.js']).pipe(gulp.dest('dist/js'));

    done();
})

// Copy plugins libraries from /bower_components into /plugins
gulp.task('copy', function(done) {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('plugins/bootstrap'))

    gulp.src(['bower_components/bootstrap-social/*.css', 'bower_components/bootstrap-social/*.less', 'bower_components/bootstrap-social/*.scss'])
        .pipe(gulp.dest('plugins/bootstrap-social'))

    gulp.src(['bower_components/datatables/media/**/*'])
        .pipe(gulp.dest('plugins/datatables'))

    gulp.src(['bower_components/datatables-plugins/integration/bootstrap/3/*'])
        .pipe(gulp.dest('plugins/datatables-plugins'))

    gulp.src(['bower_components/datatables-responsive/css/*', 'bower_components/datatables-responsive/js/*'])
        .pipe(gulp.dest('plugins/datatables-responsive'))

    gulp.src(['bower_components/flot/*.js'])
        .pipe(gulp.dest('plugins/flot'))

    gulp.src(['bower_components/flot.tooltip/js/*.js'])
        .pipe(gulp.dest('plugins/flot-tooltip'))

    gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*'])
        .pipe(gulp.dest('plugins/font-awesome'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('plugins/jquery'))

    gulp.src(['bower_components/metisMenu/dist/*'])
        .pipe(gulp.dest('plugins/metisMenu'))

    gulp.src(['bower_components/morrisjs/*.js', 'bower_components/morrisjs/*.css', '!bower_components/morrisjs/Gruntfile.js'])
        .pipe(gulp.dest('plugins/morrisjs'))

    gulp.src(['bower_components/raphael/raphael.js', 'bower_components/raphael/raphael.min.js'])
        .pipe(gulp.dest('plugins/raphael'))

        done();

})


// Configure the browserSync task
gulp.task('browserSync', function(done) {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
    done();
})

// Run everything
gulp.task('default', gulp.series('less', 'minify-css', 'js', 'copy', function(done){
	done();
}));



// Dev task with browserSync
gulp.task('dev', gulp.series('browserSync', 'less', 'minify-css', 'js', function(done) {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('pages/*.html', browserSync.reload);
    gulp.watch('dist/js/*.js', browserSync.reload);
    done();
}));
