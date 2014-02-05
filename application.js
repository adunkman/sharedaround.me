var express = require("express");
var async = require("async");
var app = express();

var services = {
  twitter: require("./services/twitter"),
  instagram: require("./services/instagram")
};

if (process.env.NODE_ENV != "production") {
  app.use(express.logger("dev"));
}

app.use(require("connect-assets")());

app.get("/", function (req, res) { return res.render("index.html.ejs"); });

app.get("/media", function (req, res) {
  if (!req.query.latitude || !req.query.longitude) {
    res.statusCode = 400;
    return res.send({ error: "Query parameters latitude and longitude are required." })
  }

  async.parallel([
    services.twitter.find(req.query),
    services.instagram.find(req.query)
  ], function (err, results) {
    if (err) {
      res.statusCode = 500;
      return res.send({ error: err });
    }

    return res.send([].concat.apply([], results));
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Booted:", this.address())
});
