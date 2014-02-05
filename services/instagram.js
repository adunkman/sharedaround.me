var request = require("request");

var clientId = process.env.INSTAGRAM_CLIENT_ID;

if (!clientId) {
  throw new Error("Environmental variable INSTAGRAM_CLIENT_ID is required.");
}

module.exports = {
  find: function (coordinates) {
    var search = {
      url: "https://api.instagram.com/v1/media/search",
      qs: {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        client_id: clientId
      }
    };

    return function (callback) {
      var handle = function (next) {
        return function (error, response, body) {
          if (error || response.statusCode != 200) {
            return callback(null, [{
              service: "instagram",
              type: "error",
              exception: error,
              statusCode: response ? response.statusCode : null,
              response: body
            }]);
          }

          return next(JSON.parse(body));
        }
      };

      request.get(search, handle(function (results) {
        for (var i = 0; i < results.data.length; i++) {
          results.data[i].service = "instagram"
        };

        return callback(null, results.data);
      }));
    };
  }
}
