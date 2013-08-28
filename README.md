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
  , reworkVars = require('rework-vars')
  , componentStyl = require('component-styl');

var builder = new Builder(__dirname);

// Use rework plugins
componentstyl.use(reworkvars());

// Set whitespace false
componentstyl.whitespace = false;

// Set compress true
componentstyl.compress = true;

builder.use(componentStyl);


builder.build(function(err, res){
  if (err) throw err;

  fs.writeFileSync('public/package.js', res.require + res.js);
  fs.writeFileSync('public/package.css', res.css);
});

  
````

Or use it as command line plugin

```
$ component build --use component-styl
```
