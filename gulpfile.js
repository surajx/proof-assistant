var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  streamify = require('gulp-streamify');


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('browserify', function() {
  var bundleStream = browserify()
    .require('./FOL/parser/parser.js', {expose: 'FOLParser'})
    .require('./FOL/proof/Proof.js', {expose: 'FOLValidator'})
    .bundle();

  bundleStream
    .pipe(source('parser.js'))
    //.pipe(streamify(uglify()
    // .on('error', function(e) { console.log('\x07',e.message);})))
    .pipe(rename('parserBundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', [
  'develop',
  'browserify'
]);
