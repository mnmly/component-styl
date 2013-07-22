# component-styl

Seemlessly use `styl` in your components.

## Usage

````javascript

// component.json
{
  ...
  "styles": [
    "base.styl",
    "nav.styl"
  ]
  ...
}

// builder.js
var fs = require('fs')
  , Builder = require('component-builder')
  , c7tStylus = require('component-styl');

var builder = new Builder(__dirname);

builder.use(c7tStylus());
// -OR-
builder.use(c7tStylus({whitespace:false}));

builder.build(function(err, res){
  if (err) throw err;

  fs.writeFileSync('public/package.js', res.require + res.js);
  fs.writeFileSync('public/package.css', res.css);
});