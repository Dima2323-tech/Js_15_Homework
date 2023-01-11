const {src , dest , series , watch , parallel} = require('gulp')
const htmlMin = require('gulp-htmlmin')
const sassComp = require('gulp-sass')(require('sass'))
const jsMin = require('gulp-jsmin')
const browserSync = require('browser-sync').create();

function minifyHtml(){
    return src('NoneMinifyAndCompyle/index.html')
        .pipe(htmlMin({
            collapseWhitespace:true,
            sortClassName : true,
            removeComments : true
        }))
        .pipe(dest('MinifyAndCompyle/'))
}

function compileSass(){
    return src('NoneMinifyAndCompyle/style.scss')
        .pipe(sassComp().on('error' , sassComp.logError))
        .pipe(dest('MinifyAndCompyle/'))
}

function minifyJs(){
    return src ("NoneMinifyAndCompyle/script.js")
        .pipe(jsMin())
        .pipe(dest('MinifyAndCompyle/'))
}

function watchfn () {
    browserSync.init({
        server:{
            baseDir:"./MinifyAndCompyle"
        }
    })
    watch('NoneMinifyAndCompyle/index.html' , minifyHtml())
    watch('NoneMinifyAndCompyle/script.js' , compileSass())
    watch('NoneMinifyAndCompyle/style.scss' , minifyJs())
}

exports.default = parallel(
    series(minifyJs , compileSass , minifyHtml),
    watchfn
)
