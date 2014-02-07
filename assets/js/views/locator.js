//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require templates/locator

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Locator = Backbone.View.extend({
  events: {
    "click .button-enabled": "locate",
    "click .try-again": "locate"
  },

  initialize: function () {
    this.statusHtml = this.$("noscript").text();
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    if ("geolocation" in navigator) {
      this.$el.html(JST["templates/locator"]());
      this.$("button").addClass("button-enabled");
    }
    else {
      this.showStatus("Your browser doesn’t support location services.", { frown: true });
    }
  },

  locate: function () {
    this.showStatus("Locating you…");

    navigator.geolocation.getCurrentPosition(
      _.bind(this.onLocation, this),
      _.bind(this.onLocationError, this)
    );
  },

  showStatus: function (message, options) {
    options = options || {};

    this.$el.html(this.statusHtml);
    this.$(".message").text(message);
    this.$(".frown").toggle(!!options.frown);

    if (options.retry) {
      this.$(".message").append(' <button class="try-again">Try again</button>.');
    }
  },

  onLocation: function (position) {
    this.showStatus("Found you!");
    this.trigger("location", { data: _.pick(position.coords, "latitude", "longitude") });
  },

  onLocationError: function (error) {
    var description;

    if (error.code == error.PERMISSION_DENIED)
      description = "You denied the request for your location.";
    else if (error.code == error.POSITION_UNAVAILABLE)
      description = "Your device cannot locate you right now.";
    else if (error.code == error.TIMEOUT)
      description = "Your device couldn’t locate you in a timely fashion.";
    else
      description = "Your device is being weird.";

    this.showStatus(description, { retry: true, frown: true });
  }
});
