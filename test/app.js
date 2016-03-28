var fs = require('fs');
var assert = require('chai').assert;
var exec = require('child_process');
var lineByLineReader = require('line-by-line');
var wrongLineReturn = 'Wrong data';

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
      exec.exec(commandLine, function(err, stdout, stderr) {
        commandReturnParseWithNullReturn(err, stdout, stderr, done);
      });
    });
    it('should create a new file for correct calls', function() {
      assert.isTrue(fs.existsSync(outputFile));
    });
  });

  var getFileLines = function(fileName, done) {
    var lines = [];
    var commandLine = 'node ' + appRelativePath + appIndexFile + ' --file ' + fileName;
    exec.exec(commandLine, function(err, stdout, stderr) {
      var reader = new lineByLineReader(outputFile);
      reader.on('line', function(line) {
        lines.push(line);
      });
      reader.on('end', function() {
        commandReturnParseWithNullReturn(err, stdout, stderr, done);
      });
    });
    return lines;
  };

  describe('Run with existent file and correct input', function() {
    before(function (done) {
      lines = getFileLines('./test/correct-input.csv', done);
    });

    it('Should verify that first line is correct', function() {
      assert.equal('David Rudd,01 March – 31 March,5004,922,4082,450', lines[0]);
    });

    it('Should verify that second line is correct', function() {
      assert.equal('Ryan Chen,01 March – 31 March,10000,2696,7304,1000', lines[1]);
    });
  });

  describe('Run with existent file but wrong input for the second line', function() {
    before(function (done) {
      lines = getFileLines('./test/wrong-input-2-line.csv',done);
    });

    it('Should verify that the second line of generated file has a error message', function() {
      assert.equal(wrongLineReturn, lines[1]);
    });
    it('Should verify that the first line of generated file has the correct name', function() {
      assert.equal('David Rudd,01 March – 31 March,5004,922,4082,450', lines[0]);
    });
  });

  describe('Run with existent file but wrong tax rate for the first line', function() {
    before(function (done) {
      lines = getFileLines('./test/wrong-input-superrate.csv',done);
    });

    it('Should verify that the first line of generated file has a error message', function() {
      assert.equal(wrongLineReturn, lines[0]);
    });

    it('Should verify that the second line still has a correct return', function() {
      assert.equal('David Rudd,01 March – 31 March,5004,922,4082,450', lines[1]);
    });
  });
});
