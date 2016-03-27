var assert = require('chai').assert;
describe('MontlyPaySlip Service', function() {
  var service = require('./../montlyPaySlipeService.js');
  var util = require('./../util.js');
  describe('When I have a gross with float point', function() {
    before(function(done) {
      //gross calculations are splitted by 12.
      grossToRoundDown = 63.6;
      grossToRoundUp = 67.2;
      grossToRoundUpAtMiddle = 66;
      done(null);
    });
    it('should round gross down', function() {
      assert.equal(5, util.calculateGross(grossToRoundDown));
    });

    it('should round gross up', function() {
      assert.equal(6, util.calculateGross(grossToRoundUp));
    });

    it('should round gross up for mid point number', function() {
      assert.equal(6, util.calculateGross(grossToRoundUpAtMiddle));
    });
  });

});
