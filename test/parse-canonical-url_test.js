/*global describe,it*/
'use strict';

var assert = require('assert')
    , parseCanonicalUrl = require('../lib/parse-canonical-url.js');


describe('Parse canonical url tests', function () {
    it('parse canonical supported url if asked for', function (done) {

        var askedUrl = "http://www.cnn.com.co.il";
        return parseCanonicalUrl.canonical(askedUrl)
            .then(function(result) {

                assert.ok(result);
                assert.notEqual(result, "");
                assert.notEqual(askedUrl, result);
                done();
            });
    });

    it('parse alternate supported url if asked for', function (done) {

        var askedUrl = "http://www.ynet.co.il";
        return parseCanonicalUrl.alternate(askedUrl)
            .then(function(result) {

                assert.ok(result);
                assert.notEqual(result, "");
                assert.notEqual(askedUrl, result);
                done();
            });
    });

    it('fail to parse canonical bad url parameter', function (done) {

        var askedUrl = "123";
        return parseCanonicalUrl.canonical(askedUrl)
            .then(function(result) {
                assert.fail();
            })
            .catch(function(err) {
                done();
            });
    });

    it('fail to parse alternate bad url parameter', function (done) {

        var askedUrl = "123";
        return parseCanonicalUrl.alternate(askedUrl)
            .then(function(result) {
                assert.fail();
            })
            .catch(function(err) {
                done();
            });
    });
});
