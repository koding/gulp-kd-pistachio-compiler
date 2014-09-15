'use strict';

var through = require('through2');
var pistachioCompiler = require('pistachio-compiler');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-kd-pistachio-compiler';

module.exports = function () {

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new PluginError( PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isNull()){
      return cb(null, file);
    }

    var contents;

    try {
      contents = pistachioCompiler(file.contents.toString('utf8'));
    } catch (err) {
      return cb(new PluginError(PLUGIN_NAME, err));
    } finally {
      file.contents = new Buffer(contents);
      return cb(null, file);
    }

  });

};