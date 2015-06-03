# gulp-cssjanus [![Build Status](https://travis-ci.org/tepez/gulp-cssjanus.svg?branch=master)](https://travis-ci.org/tepez/gulp-cssjanus)

[Gulp](http://gulpjs.com) plugin that uses [cssjanus](https://github.com/cssjanus/cssjanus) to convert LTR CSS to RTL.

## Install

```bash
$ npm install --save-dev gulp-cssjanus
```

## Basic Usage

```js
var gulp = require('gulp');
var cssjanus = require('gulp-cssjanus');

gulp.task('default', function () {
	return gulp.src('styles.css')
		.pipe(cssjanus())
		.pipe(gulp.dest('dist'));
});
```
## API

### cssjanus([options])

Convert CSS from LTR to RTL

#### options

##### swapLtrRtlInUrl

Type: `boolean`
Default: `false`

Swap 'ltr' and 'rtl' in URLs

##### swapLeftRightInUrl

Type: `boolean`
Default: `false`

Swap 'left' and 'right' in URLs

##### cssjanus

Type: `module`
Default: `require('cssjanus')`

Provide custom cssjanus module.

## Example

The below example will result in 2 copies of each stylesheet, one LTR stylesheet and one RTL stylesheet (with "-rtl" appended to the filename before the extension). The example uses autoprefixer, this is just an example of other CSS post-processing being used before cssjanus.

```js
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssjanus = require('gulp-cssjanus');
var rename = require('gulp-rename');

gulp.task('styles', function () {
    return gulp.src(['/styles/*.css')
        .pipe(autoprefixer(["last 2 versions", "> 1%"])) // Other post-processing.
        .pipe(gulp.dest('dist')) // Output LTR stylesheets.
        .pipe(cssjanus()) // Convert to RTL.
        .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
        .pipe(gulp.dest('dist')); // Output RTL stylesheets.
});
```

## Alternatives

* [gulp-rtlcss](https://github.com/jjlharrison/gulp-rtlcss) - based on rtlcss instead of cssjanus.

## License

MIT © [Tom Tepez Yam]