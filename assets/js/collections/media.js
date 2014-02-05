//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require models/tweet
//= require models/instagram

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Collections = SharedAroundMe.Collections || {};

SharedAroundMe.Collections.Media = Backbone.Collection.extend({
  url: "/media",

  comparator: "timestamp",

  model: function (attrs, options) {
    if (attrs.service == "twitter") {
      return new SharedAroundMe.Models.Tweet(attrs, options);
    }
    else if (attrs.service == "instagram") {
      return new SharedAroundMe.Models.Instagram(attrs, options);
    }
    else {
      return new Backbone.Model(attrs, options);
    }
  }
});
