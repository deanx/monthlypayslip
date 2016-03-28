var _ = require('lodash');
var numberOfMonths = 12; //number of Months in the year. Factor to use in some operations
var oneCent = 0.01; //needed to round some calculus
var csv = require('./csv.js');

var taxTable = [
  {minimumSalary:0, maximumSalary:18200, taxRate: 0, fixedTax: 0},
  {minimumSalary:18201, maximumSalary:37000, taxRate: 0.19, fixedTax: 0},
  {minimumSalary:37001, maximumSalary:80000, taxRate: 0.325, fixedTax: 3572},
  {minimumSalary:80001, maximumSalary:180000, taxRate: 0.37, fixedTax: 17547},
  {minimumSalary:180001, maximumSalary:Number.MAX_SAFE_INTEGER, taxRate: 0.45, fixedTax: 54547}
];

var calculateGross = function(annualSalary) {
  return Math.round(annualSalary / numberOfMonths);
};

var calculateIncomeTax = function(annualSalary) {
  var taxes = _.find(taxTable, function(o) {
    return (annualSalary >= o.minimumSalary && annualSalary <= o.maximumSalary);
  });
  var incomeTax = (((annualSalary - taxes.minimumSalary + oneCent) *  taxes.taxRate) + taxes.fixedTax) / numberOfMonths;
  return Math.round(incomeTax);
};

var calculateNetIncome = function(grossIncome, incomeTax) {
    return Math.round(grossIncome - incomeTax);
};

var calculateSuper = function(grossIncome, superRate) {
  var superValue = (grossIncome * parseInt(superRate)) / 100;
  return Math.round(superValue);
};

var isValidLine = function(line) {

  return !(
    _.isNil(line) ||
    _.isNil(line.firstName) ||
    _.isNil(line.lastName) ||
    (!_.isNumber(line.annualSalary) && line.annualSalary <= 0) ||
    parseInt(line.superRate) <= 0 ||
    _.isNil(line.paymentStartDate)
  );
};
var convertInObjToOutObj = function(inObject) {
  if(!isValidLine(inObject)) return wrongDataValue;

  var name = inObject.firstName + ' ' + inObject.lastName;
  var payPeriod = inObject.paymentStartDate;
  var grossIncome = calculateGross(inObject.annualSalary);
  var incomeTax = calculateIncomeTax(inObject.annualSalary);
  var netIncome = calculateNetIncome(grossIncome, incomeTax);
  var superValue = calculateSuper(grossIncome, inObject.superRate);

  return {'name': name, 'payPeriod': payPeriod, 'grossIncome': grossIncome,
    'incomeTax': incomeTax, 'netIncome': netIncome, 'super': superValue};
};

var parseLinesToResponse = function(lines) { // sugar to avoid foreach in interface
  var returnLines = [];
  _.forEach(lines, function(line) {
    returnLines.push(convertInObjToOutObj(line));
  });
  return returnLines;
};
module.exports = {
  calculateGross: calculateGross,
  calculateIncomeTax: calculateIncomeTax,
  calculateNetIncome: calculateNetIncome,
  calculateSuper: calculateSuper,
  parseLinesToResponse: parseLinesToResponse
};
