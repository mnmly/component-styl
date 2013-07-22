var Builder = require('component-builder')
  , expect = require('expect.js')
  , componentStylus = require('../');
  
describe('', function () {
  
})  
  
describe("Component Stylus", function () {
  
  it('should pass-though if there are no styles', function (done) {
    var builder = new Builder(__dirname + '/support/no-styles');
    
    builder.use(componentStylus());
    
    builder.build(done);
  });
  
  
  it('should pass-though if there are no stylus files', function (done) {
    var builder = new Builder(__dirname + '/support/no-stylus');
    
    builder.use(componentStylus());
    
    builder.build(done);
  });
  
  it('should build stylus in a component into css', function (done) {
    var builder = new Builder(__dirname + '/support/with-stylus');
    
    builder.use(componentStylus());
    
    builder.build(function (err, res) {
      expect(res.css).to.eql('body {\n  background: #000;\n}');
      done()
    });
  });
  
  it('should build stylus in a component with child into css', function (done) {
    var builder = new Builder(__dirname + '/support/with-child-component');
    
    builder.use(componentStylus());
    
    builder.build(function (err, res) {
      expect(res.css).to.eql('body {\n  background: #000;\n}');
      done()
    });
  });
  
  it('should be able to build css with options', function(done){
    var builder = new Builder(__dirname + '/support/with-options');
    builder.use(componentStylus({whitespace: false, compress: true}));

    builder.build(function (err, res) {
      expect(res.css).to.eql('body{color:rgba(255, 255, 255, 0.5);}');
      done()
      
    })
  })

})
