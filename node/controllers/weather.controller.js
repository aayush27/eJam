var OAuth = require('oauth');
require('dotenv').config();

exports.getWeatherOfCity = (req, res) => {
    const params = {
        city: req.query.city
    }
    var header = {
        "X-Yahoo-App-Id": "IDN4ELWU34"
    };
    var request = new OAuth.OAuth(
        null,
        null,
        process.env.CONSUMER_KEY,
        process.env.CONSUMER_SECRET,
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
    );
    request.get(
        `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${params.city}&format=json`,
        null,
        null,
        function (err, data, result) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
        }
    );
};