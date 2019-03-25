const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'https://api.darksky.net/forecast/0657cbeeacbf3b1ce4b7f53ff0e32b2d/' +
    lat +
    ',' +
    long;

  // console.log(url);

  request({ url, json: true }, (error, { body }) => {
    // console.log(error, response.body);
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const currently = body.currently;
      const daily = body.daily.data[0];
      callback(
        undefined,
        daily.summary +
          ' It is currently ' +
          currently.temperature +
          ' degrees out.\nThe righer temperature will be ' +
          daily.temperatureHigh +
          ' and the lower temperature wil be ' +
          daily.temperatureLow +
          '.\nThere is a ' +
          currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
