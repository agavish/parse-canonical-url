/*
 *
 * https://github.com/agavish/parse-canonical-url
 *
 * Copyright (c) 2015 Adam Gavish
 * Licensed under the MIT license.
 */

"use strict";
var request = require('request');
var htmlparser = require("htmlparser2");
var validUrl = require('valid-url');
var Promise = require('bluebird');

exports.canonical = function(url) {
    return new Promise(function (resolve, reject) {
        var result = null;

        if (validUrl.isWebUri(url)) {
            request(url, { followAllRedirects: true }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (response.statusCode == 200) {
                        var html = response.body;

                        var parser = new htmlparser.Parser({
                            onopentag: function (name, attribs) {
                                if (result == null && name === "link" && attribs.rel === "canonical") {
                                    result = attribs.href;
                                }
                            }
                        }, {decodeEntities: true});
                        parser.write(html);
                        parser.end();
                        resolve(result);
                    } else {
                        reject(new Error(error));
                    }
                }
            });
        } else {
            reject(new Error('not a valid uri'));
        }
    });
};

exports.alternate = function(url) {
    return new Promise(function (resolve, reject) {
        var result = null;

        if (validUrl.isWebUri(url)) {
            request(url, { followAllRedirects: true }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (response.statusCode == 200) {
                        var html = response.body;

                        var parser = new htmlparser.Parser({
                            onopentag: function (name, attribs) {
                                if (result == null && name === "link" && "rel" in attribs && attribs.rel === "alternate" && "media" in attribs) {
                                    result = attribs.href;
                                }
                            }
                        }, {decodeEntities: true});
                        parser.write(html);
                        parser.end();
                        resolve(result);
                    } else {
                        reject(new Error(error));
                    }
                }
            });
        } else {
            reject(new Error('not a valid uri'));
        }
    });
};
