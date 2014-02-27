var request = require("request");

var key = process.env.TWITTER_CONSUMER_KEY;
var secret = process.env.TWITTER_CONSUMER_SECRET;

if (!key || !secret) {
  throw new Error("Environmental variables TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET are required.");
}

var unencodedCredentials = [key, secret].map(encodeURIComponent).join(":");
var credentials = new Buffer(unencodedCredentials).toString('base64');

module.exports = {
  find: function (coordinates) {
    var authentication = {
      url: "https://api.twitter.com/oauth2/token",
      headers: {
        "User-Agent": "sharedaround.me",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic " + credentials
      },
      body: "grant_type=client_credentials"
    };

    var search = {
      url: "https://api.twitter.com/1.1/search/tweets.json",
      qs: {
        q: "-RT",
        geocode: [coordinates.latitude, coordinates.longitude, "1mi"].join(","),
        count: 100
      },
      headers: {
        "User-Agent": "sharedaround.me"
      }
    };

    return function (callback) {
      var handle = function (next) {
        return function (error, response, body) {
          if (error || response.statusCode != 200) {
            return callback(null, [{
              service: "twitter",
              type: "error",
              exception: error,
              statusCode: response ? response.statusCode : null,
              response: body
            }]);
          }

          return next(JSON.parse(body));
        }
      };

      request.post(authentication, handle(function (body) {
        search.headers["Authorization"] = "Bearer " + body.access_token;

        request.get(search, handle(function (results) {
          for (var i = 0; i < results.statuses.length; i++) {
            results.statuses[i].service = "twitter";
          };

          return callback(null, results.statuses);
        }));
      }));
    };
  }
}
