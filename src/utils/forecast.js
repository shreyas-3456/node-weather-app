const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
	const url = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
	request({ url, json: true }, (error, response) => {
		if (error) {
			callback('cannot connect to services');
		} else if (response.body.error) {
			callback(`code ${response.body.code} error: ${response.body.error}`);
		} else {
			const data = response.body.currently;
			const descrip = response.body;
			callback(
				undefined,
				`${descrip.daily.data[0].summary} It is currently ${data.temperature}F degrees and there is ${data.precipProbability} % chance of rain. The highest temperature today is ${descrip.daily.data[0].temperatureHigh}F and the lowest temperature today is ${descrip.daily.data[0].temperatureLow}F `
			);
		}
	});
};

module.exports = forecast;
