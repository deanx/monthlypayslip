var program = require('commander');
var fs = require('fs');
var util = require('./util.js');

program.version('1.0.0')
 .option('-f --file [file]', 'CSV file')
 .parse(process.argv);

util.validateInputData(program);


fs.writeFile('output.csv', '', function(err) {

});
