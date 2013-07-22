var fs = require('fs')
  , Batch = require('batch')
  , debug = require('debug')('component:styl')
  , styl = require('styl')
  , endsWith = require('./utils').endsWith;

module.exports = function(options){
  options = options || { whitespace: true };

  function compileStyl(builder) {
    builder.hook('before styles', function (pkg, cb) {
      if (!pkg.config.styles) return cb();

      var stylFiles = pkg.config.styles.filter(endsWith('styl'))
        , batch = new Batch();

      stylFiles.forEach(function (stylFile) {
        batch.push(function (done) {
          var stylPath = pkg.path(stylFile)
            , name = stylFile.split('.')[0] + '.css';

          debug('compiling: %s', stylFile);

          var css = styl(fs.readFileSync(stylPath, 'utf-8'), { whitespace: options.whitespace }).toString();
          pkg.addFile('styles', name, css);
          pkg.removeFile('styles', stylFile);
          done();
        });
      });

      batch.end(cb);
    });
  }

  return compileStyl;
}