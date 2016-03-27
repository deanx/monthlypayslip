var fs = require('fs');
var numberOfMonths = 12; //number of Months in the year. Factor to use in some operations

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
}

module.exports = {
  validateInputData:validateInputData,
  calculateGross:calculateGross
};
