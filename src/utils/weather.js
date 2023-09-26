const request = require("request");

const weather = ({ long, lat } = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=47454cb624dbb87f29db737208117cfc&query=${
    (long.toString().slice(0, 6), lat.toString().slice(0, 6))
  }`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback(body.error.info);
    } else {
      console.log(body.current)
      console.log(body)
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        humidity: body.current.humidity
      });
    }
  });
};

module.exports = weather;
