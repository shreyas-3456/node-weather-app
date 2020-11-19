"use strict";

var request = require('request');

var forecast = function forecast(_ref, callback) {
  var latitude = _ref.latitude,
      longitude = _ref.longitude;
  var url = "https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/".concat(latitude, ",").concat(longitude);
  request({
    url: url,
    json: true
  }, function (error, response) {
    if (error) {
      callback('cannot connect to services');
    } else if (response.body.error) {
      callback("code ".concat(response.body.code, " error: ").concat(response.body.error));
    } else {
      var data = response.body.currently;
      var descrip = response.body;
      callback(undefined, "".concat(descrip.daily.data[0].summary, " It is currently ").concat(data.temperature, " degrees and there is ").concat(data.precipProbability, " % chance of rain"));
    }
  });
};

module.exports = forecast;