(function(){
  "use strict";

  var gutil = require('gulp-util'),
    through = require('through2'),
    cssjanus = require('cssjanus'),
    _ = require('lodash');


  module.exports = function (config) {

    config = _.defaults({}, config, {
      swapLtrRtlInUrl: false,
      swapLeftRightInUrl: false,
      cssjanus: cssjanus
    });

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        this.push(file);
        return cb();
      }

      if (file.isStream()) {
        this.emit('error', new gutil.PluginError('gulp-cssjanus', 'Streaming not supported'));
        return cb();
      }

      var ltrCss = file.contents.toString();

      var rtlCss = config.cssjanus.transform(
        ltrCss,
        config.swapLtrRtlInUrl,
        config.swapLeftRightInUrl
      );

      file.contents = new Buffer(rtlCss);
      this.push(file);
      cb();
    });
  };
})();