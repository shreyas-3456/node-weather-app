const request = require('request');

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibXItc2VuYXRlIiwiYSI6ImNraGptdmxsbTFkZjIyc3FxcnRqaTdwdWYifQ.OgH_blT5EhTGQDyMeuvaYQ`;

	request({ url, json: true }, (error, response) => {
		const { body } = response;
		const { features } = body;
		if (error) {
			callback('Unable reach service');
		} else if (features.length === 0) {
			const { query } = body;
			callback(`${query} location does not exist.Try another search`);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
