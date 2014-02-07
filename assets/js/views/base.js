//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require views/instagram
//= require views/locator
//= require views/media
//= require views/service-error
//= require views/tweet

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Base = Backbone.View.extend({
  initialize: function () {
    this.locator = new SharedAroundMe.Views.Locator({
      el: $(".location-controls"),
      collection: this.collection
    });

    this.media = new SharedAroundMe.Views.Media({
      el: $(".media"),
      collection: this.collection
    });

    this.listenTo(this.locator, "location", _.bind(this.collection.fetch, this.collection));

    this.locator.render();
    this.locator.once("location", this.media.scrollIntoView, this.media);
  }
});
