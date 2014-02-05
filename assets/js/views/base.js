//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require templates/base-find-me-button
//= require templates/base-loading-indicator
//= require templates/base-location-services-error
//= require templates/base-missing-location-services
//= require views/instagram
//= require views/service-error
//= require views/tweet

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Base = Backbone.View.extend({
  events: {
    "click .find-me": "locate"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.renderMedia);
    this.render();
  },

  render: function () {
    if ("geolocation" in navigator) {
      var html = JST["templates/base-find-me-button"]();
      this.$("header").append(html);
    }
    else {
      var html = JST["templates/base-missing-location-services"]();
      this.$(".status").html(html);
    }
  },

  locate: function () {
    var html = JST["templates/base-loading-indicator"]();
    this.$(".status").html(html);
    this.$(".media").html(null);

    navigator.geolocation.getCurrentPosition(
      _.bind(this.onLocation, this),
      _.bind(this.onLocationError, this)
    )
  },

  onLocation: function (position) {
    this.collection.fetch({
      data: _.pick(position.coords, "latitude", "longitude")
    });
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

    var data = { description: description };
    var html = JST["templates/base-location-services-error"](data);
    this.$(".status").html(html);
  },

  renderMedia: function () {
    for (var i = this.collection.models.length - 1; i >= 0; i--) {
      var model = this.collection.models[i];
      var service = model.get("service");
      var type = model.get("type");
      var view;

      if (type == "error")
        view = new SharedAroundMe.Views.ServiceError({ model: model });
      else if (service == "twitter")
        view = new SharedAroundMe.Views.Tweet({ model: model });
      else if (service == "instagram")
        view = new SharedAroundMe.Views.Instagram({ model: model });

      if (view) {
        this.$(".media").append(view.el);
      }
    };
  }

});
