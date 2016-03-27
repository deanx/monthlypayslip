var fs = require('fs');
var _ = require('lodash');

var numberOfMonths = 12; //number of Months in the year. Factor to use in some operations
var oneCent = 0.01; //needed to round some calculus

var taxTable = [
  {minimumSalary:0, maximumSalary:18200, taxRate: 0, fixedTax: 0},
    {minimumSalary:18201, maximumSalary:37000, taxRate: 0.19, fixedTax: 0},
  {minimumSalary:37001, maximumSalary:80000, taxRate: 0.325, fixedTax: 3572},
  {minimumSalary:80001, maximumSalary:180000, taxRate: 0.37, fixedTax: 17547},
  {minimumSalary:180001, maximumSalary:Number.MAX_SAFE_INTEGER, taxRate: 0.45, fixedTax: 54547}
];
var validateInputData = function(program) {
  if(!program.file) {
    throw(new Error('will must inform the CSV file to be parsed'));
  }

  if(!fs.existsSync(program.file)) {
    throw(new Error(program.file + ' file does not exist'));
  }
};

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
  var superValue = (grossIncome * superRate) / 100;
  return Math.round(superValue);
};

module.exports = {
  validateInputData:validateInputData,
  calculateGross:calculateGross,
  calculateIncomeTax:calculateIncomeTax,
  calculateNetIncome:calculateNetIncome,
  calculateSuper:calculateSuper
};
