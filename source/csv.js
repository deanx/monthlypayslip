var fs = require('fs');
var _ = require('lodash');
var LineReader = require('n-readlines');

GLOBAL.wrongDataValue = 'Wrong data';

var numberOfColumnsInFile = 5;
var lines = [];
var parse = function(fileName, separator) {
  var lineReader = new LineReader(fileName);

  var objectInGenerator = function(columns) {
    if(_.isEqual(numberOfColumnsInFile, _.size(columns))) {
      return {'firstName': columns[0], 'lastName': columns[1],
        'annualSalary': columns[2], 'superRate': columns[3],
        'paymentStartDate': columns[4]};
    }
    return null;
  };

  while (line = lineReader.next()) {
    var columns = _.split(line, separator);
    lines.push(objectInGenerator(columns));
  }
  return lines;
};

var generateOutput = function(collection, outputFile) {
  var lines = [];
  var writeToFile = function(file, content) {
      fs.writeFileSync(file, content);
  };

  _.forEach(collection, function(value) {
    if(! _.isEqual(wrongDataValue, value)) {
      lines.push(_.join(_.values(value),','));
    } else {
      lines.push(value);
    }
  });
  
  writeToFile(outputFile, _.join(lines,require('os').EOL));
};

module.exports = {
  parse: parse,
  generateOutput: generateOutput
};
