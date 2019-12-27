const gulp = require('gulp');
//jade = require('gulp-jade');
const pug = require('gulp-pug');
const changed = require('gulp-changed');
//TODO: remember and write comment why I used npm-watch instead of gulp-watch for pug_changed stuff. Probably gulp-watch can be combined with other console stuff?

var path = {
    jade: {
        out: './test/outputFiles',
        src: ['./test/**/*.pug']
    }
};

gulp.task('pug_changed', function () {
    return gulp.src(path.jade.src)
        .pipe(changed(path.jade.out, { extension: '.html' }))
        .pipe(pug({
            pretty: true
        }))
        //someone in the chain lists all the content of the html file on every error, so, cut the stupid stuff
        .on('error',(err)=>{
            let es = err.toString()
            let detailsIndex = es.indexOf("Details:");
            let message = es.substr(0, detailsIndex);
            console.log(message +"The details go here but they does not relate to the pug error we need, so they are truncated. All the info we need is above.");
          })
        .pipe(gulp.dest(path.jade.out));
});

gulp.task('test1', function (done) {
    console.log("Hello World!");
    done();
});