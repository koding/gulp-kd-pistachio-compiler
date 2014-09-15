var through = require('through2');
var pistachioCompiler = require('pistachio-compiler');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-kd-pistachio-compiler';

// function compileInStream() {
//   var stream = through();
//   stream.write(prefixText);
//   return stream;
// }

function compile() {
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  }

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
       // do nothing if no contents
    }

    if (file.isBuffer()) {
        file.contents = pistachioCompiler(file.contents);
    }

    if (file.isStream()) {
        file.contents = file.contents.pipe(through(function(chunk, enc, callback){
          console.log(chunk);
        }));
    }

    this.push(file);

    return cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = compile;