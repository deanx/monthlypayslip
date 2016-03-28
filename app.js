var program = require('commander');
var fs = require('fs');
var util = require('./source/util.js');
var service = require('./source/monthlyPaySlipService.js');
var csv = require('./source/csv.js');

program.version('1.0.0')
 .option('-f --file [file]', 'CSV file')
 .parse(process.argv);

util.validateInputData(program);

var lines = csv.parse(program.file,',');

response = service.parseLines(lines);

csv.generateOutput(response, './output.csv');

console.info('file generated with success');
