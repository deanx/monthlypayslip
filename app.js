var EventEmitter = require('events');
var program = require('commander');
var fs = require('fs');

program.version('1.0.0')
 .option('-f --file [file]', 'CSV file')
 .parse(process.argv);

if(!program.file) {
  throw(new Error('will must inform the CSV file to be parsed'));
}

if(!fs.exists(program.file)) {
  throw(new Error('file does not exist'));
}
