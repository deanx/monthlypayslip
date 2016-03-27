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


  describe('When I calculated income tax', function() {
    it('should return 0 for the lower lane', function() {
      assert.equal(0, util.calculateIncomeTax(12));
    });

    it('should return correctly for a normal lane', function() {
      assert.equal(922, util.calculateIncomeTax(60050));
    });

    it('should return correctly for a almost high lane', function() {
      assert.equal(2696, util.calculateIncomeTax(120000));
    });
  });

  describe('When I calculated net income', function() {
    it('should return a correct rounded value', function() {
      assert.equal(4082, util.calculateNetIncome(5004,922));
    });
  });

  describe('When I calculated super', function() {
    it('should return the correct rounded value', function() {
      assert.equal(450, util.calculateSuper(5004, 9));
    })
  });
});
