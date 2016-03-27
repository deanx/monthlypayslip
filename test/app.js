var fs = require('fs');
var assert = require('chai').assert;
var exec = require('child_process');
var lineByLineReader = require('line-by-line');

describe('App', function() {
  var outputFile = './output.csv';
  var error, commandOut, commandErr;
  var commandReturnParseWithNullReturn = function(err, stdout, stderr,done) {
    error = err;
    commandOut = stdout;
    commandErr = stderr;
    done(null);
  };
  describe('Run without file', function() {
    before(function (done) {
      var commandLine = 'node ' + appRelativePath + appIndexFile;
        exec.exec(commandLine, function(err, stdout, stderr) {
	         commandReturnParseWithNullReturn(err, stdout, stderr, done);
         });
    });

    it('should not execute  without a file name', function() {
      assert.instanceOf(error, Error);
    });
  });

  describe('Run with non-existent file', function() {
    before(function(done) {
      var commandLine = 'node ' + appRelativePath + appIndexFile + ' --file ./test/non-existent-test.csv';
      exec.exec(commandLine, function(err, stdout, stderr) {
        commandReturnParseWithNullReturn(err, stdout, stderr, done);
      });
    });

    it('should raise an error with the non-existent file', function() {
      assert.instanceOf(error, Error);
    });
  });

  describe('Run with existent file', function() {
    before(function (done) {
      try {
        fs.unlinkSync(outputFile);
      } catch(err) {
        // file still do not exists. No problem!
      }

      var commandLine = 'node ' + appRelativePath + appIndexFile + ' -f ./test/empty-file.csv';
      console.log(commandLine);
      exec.exec(commandLine, function(err, stdout, stderr) {
        commandReturnParseWithNullReturn(err, stdout, stderr, done);
      });
    });
    it('should create a new file for correct calls', function() {
      assert.isTrue(fs.existsSync(outputFile));
    });
  });

  describe('Run with existent file but wrong input in the second line', function() {
    before(function (done) {
    var commandLine = 'node ' + appRelativePath + appIndexFile + ' --file ./test/wrong-input-2-line.csv';
      exec.exec(commandLine, function(err, stdout, stderr) {
        var reader = new lineByLineReader(outputFile);
        lines = [];
        reader.on('line', function(line) {
          lines.push(line);
        });
        commandReturnParseWithNullReturn(err, stdout, stderr, done);
      });
    });
    it('Should verify if the second line of generated file has a error message', function() {
      assert.equal('Wrong data', lines[1]);
    });
  });
});
