(function() {

  'use strict';
  var Vinyl = require('vinyl'),
    cssjanus = require('cssjanus'),
    gulpCssjanus = require('./index'),
    expect = require('chai').expect,
    sinon = require('sinon');

  describe('gulp-cssjanus', function () {

    var cssjanusSpy;

    beforeEach(function () {
      cssjanusSpy = sinon.spy(cssjanus, 'transform');
    });

    afterEach(function () {
      cssjanus.transform.restore();
    });

    it('should convert LTR CSS to RTL', function (done) {

      var stream = gulpCssjanus();

      stream.on('data', function (file) {
        expect(file.contents.toString()).to.equal('.selector { float: right; /* comment */ }');
        done();
      });

      stream.write(new Vinyl({
        path: 'styles.css',
        contents: new Buffer('.selector { float: left; /* comment */ }')
      }));
    });

    it('should use cssjanus by default', function (done) {
      var stream = gulpCssjanus();

      stream.on('data', function (file) {
        expect(cssjanusSpy.callCount).to.equal(1);
        expect(cssjanusSpy.getCall(0).args).to.deep.equal([
          '.selector { float: left; /* comment */ }', false, false
        ]);
        done();
      });

      stream.write(new Vinyl({
        path: 'styles.css',
        contents: new Buffer('.selector { float: left; /* comment */ }')
      }));

    });

    it('should accept cssjanus options', function (done) {
      var stream = gulpCssjanus({
        swapLtrRtlInUrl: true,
        swapLeftRightInUrl: true
      });

      stream.on('data', function (file) {
        expect(cssjanusSpy.callCount).to.equal(1);
        expect(cssjanusSpy.getCall(0).args).to.deep.equal([
          '.selector { float: left; /* comment */ }', true, true
        ]);
        done();
      });

      stream.write(new Vinyl({
        path: 'styles.css',
        contents: new Buffer('.selector { float: left; /* comment */ }')
      }));

    });

    it('should accept cssjanus options', function (done) {

      var customCssjanus = { transform: sinon.spy(function() {
        return 'xxx';
      }) };

      var stream = gulpCssjanus({
        cssjanus: customCssjanus
      });

      stream.on('data', function (file) {
        expect(cssjanusSpy.callCount).to.equal(0);

        expect(customCssjanus.transform.callCount).to.equal(1);
        expect(customCssjanus.transform.getCall(0).args).to.deep.equal([
          '.selector { float: left; /* comment */ }', false, false
        ]);

        expect(file.contents.toString()).to.equal('xxx');

        done();
      });

      stream.write(new Vinyl({
        path: 'styles.css',
        contents: new Buffer('.selector { float: left; /* comment */ }')
      }));

    });


  });

})();
