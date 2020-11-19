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
				`${descrip.daily.data[0].summary} It is currently ${data.temperature} degrees and there is ${data.precipProbability} % chance of rain`
			);
		}
	});
};

module.exports = forecast;
