var fs = require('fs');

var validateInputData = function(program) {
  if(!program.file) {
    throw(new Error('will must inform the CSV file to be parsed'));
  }

  if(!fs.existsSync(program.file)) {
    throw(new Error(program.file + ' file does not exist'));
  }
};


module.exports = {
  validateInputData:validateInputData,
};
