var EventEmitter = require('events');
var program = require('commander');

program.version('1.0.0')
 .option('-f --file', 'CSV file')
 .parse(process.argv);

if(!program.file) {
  throw(new Error('will must inform the CSV file to be parsed'));
}
