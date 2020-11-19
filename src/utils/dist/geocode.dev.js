"use strict";

var request = require('request');

var geoCode = function geoCode(address, callback) {
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(address), ".json?access_token=pk.eyJ1IjoibXItc2VuYXRlIiwiYSI6ImNraGptdmxsbTFkZjIyc3FxcnRqaTdwdWYifQ.OgH_blT5EhTGQDyMeuvaYQ");
  request({
    url: url,
    json: true
  }, function (error, response) {
    var body = response.body;
    var features = body.features;

    if (error) {
      callback('Unable reach service');
    } else if (features.length === 0) {
      var query = body.query;
      callback("".concat(query, " location does not exist.Try another search"));
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;