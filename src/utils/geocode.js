const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.maptiler.com/geocoding/${address}.json?key=E5o4PLoB4sOY0hpVUxrF&limit=1`;

  request({ url }, (error, response) => {
    const data = JSON.parse(response.body);

    if (error) {
      callback("Unable to connect to Geolocation service!");
    } else if (data.features.length === 0) {
      callback("Unknown city");
    } else {
      const long = data.features[0].geometry.coordinates[0];
      const lat = data.features[0].geometry.coordinates[1];

      callback(undefined, { long, lat });
    }
  });
};

module.exports = geocode;
