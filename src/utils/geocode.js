const request = require('request');

const geocode = (address, callback) => {
  const urlGeocode =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoicmVuYXRvbGltYXN0ZXIiLCJhIjoiY2p0OHk5dmk1MGR4YTRhbnZtOGlneXZscyJ9.Xi_EdIPOhR0yutlDsEbJpA&limit=1';

  request({ url: urlGeocode, json: true }, (error, { body }) => {
    if (body.message) {
      callback(body.message, undefined);
    } else if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const { center, place_name } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      });
    }
  });
};

module.exports = geocode;
