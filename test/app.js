var assert = require('chai').assert;
var exec = require('child_process');

describe('App', function() {
  describe('Run', function() {
    var error, commandOut, commandErr;
    before(function (done) {
      var commandLine = 'node ' + appRelativePath + appIndexFile;
      try {
        exec.exec(commandLine, function(err, stdout, stderr) {
	         error = err;
           commandOut = stdout;
           commandErr = stderr;
           done(null);
         });
       } catch (err) {
         console.log('erroooom');
         done(null);
       }
    });

    it('should not execute  without a file name', function() {
      assert.instanceOf(error, Error);
    });
  });
});
