var Builder = require('component-builder')
  , expect = require('expect.js')
  , vars = require('rework-vars')
  , componentStyl = require('../');
 

describe("Component Styl", function () {
  
  it('should pass-though if there are no styles', function (done) {
    var builder = new Builder(__dirname + '/support/no-styles');
    
    builder.use(componentStyl);
    
    builder.build(done);
  });
  
  
  it('should pass-though if there are no styl files', function (done) {
    var builder = new Builder(__dirname + '/support/no-stylus');
    
    builder.use(componentStyl);
    
    builder.build(done);
  });
  
  it('should build styl in a component into css', function (done) {
    var builder = new Builder(__dirname + '/support/with-stylus');
    
    builder.use(componentStyl);
    
    builder.build(function (err, res) {
      expect(res.css).to.eql('body {\n  background: #000;\n}');
      done()
    });
  });
  
  it('should build styl in a component with child into css', function (done) {
    var builder = new Builder(__dirname + '/support/with-child-component');
    
    builder.use(componentStyl);
    
    builder.build(function (err, res) {
      expect(res.css).to.eql('body {\n  background: #000;\n}');
      done()
    });
  });
  
  it('should not build whitespaced styl when whitepace is set false', function(done) {

    var builder = new Builder(__dirname + '/support/without-whitespace');
    componentStyl.whitespace = false;
    builder.use(componentStyl);
    expect((function() { builder.build() })).to.throwError();
    
    componentStyl.whitespace = true;
    builder.build(function(err, res){
      expect(res.css).to.eql('body {\n  background: #000;\n}');
      done();
    })


  });
  
  it('should build styl with rework-vars plugin', function(done) {

    var builder = new Builder(__dirname + '/support/with-plugin');
    componentStyl.plugins = [vars];
    builder.use(componentStyl);
    builder.build(function(err, res){
      expect(res.css).to.eql(':root {\n  var-main-color: #000;\n}\n\nbody {\n  background: #000;\n}');
      done();
    })
  });


})
