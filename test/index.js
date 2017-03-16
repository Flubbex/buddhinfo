var assert  = require('assert');
var app     = require("../source/index.js");

describe('Application', function() {
  describe('Module', function() {
    it('Returns as an object', function() {
      assert.equal(typeof(app),"object");
    });
  });
});

