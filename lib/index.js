var fs = require('fs')
  , Batch = require('batch')
  , path  = require('path')
  , debug = require('debug')('component:styl')
  , Styl = require('styl');

var stylPlugin = module.exports = function stylPlugin(builder) {

  builder.hook('before styles', function(pkg, next) {

    var styles = pkg.config.styles;
    if (!styles) return next();

    var stylFiles = styles.filter(function(file) { return path.extname(file) == '.styl';});
    var batch = new Batch();

    stylFiles.forEach(function(stylFile) {
      var stylPath = pkg.path(stylFile);
      var name = stylFile.split('.')[0] + '.css';

      debug('compiling: %s', stylFile);

      var options = {
        compress: stylPlugin.compress,
        whitespace: stylPlugin.whitespace
      };

      var styl = new Styl(fs.readFileSync(stylPath, 'utf-8'), options);
      
      // Assign plugins
      stylPlugin.plugins.forEach(styl.use);

      var css = styl.toString();
      
      // Add compiled css
      pkg.addFile('styles', name, css);

      // Remove .styl file
      pkg.removeFile('styles', stylFile);

    });
    next();
  });
}

stylPlugin.compress = false;
stylPlugin.whitespace = true;
stylPlugin.plugins = [];
