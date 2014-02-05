//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Models = SharedAroundMe.Models || {};

SharedAroundMe.Models.Tweet = Backbone.Model.extend({
  parse: function (data) {
    data.timestamp = new Date(data.created_at);
    return data;
  }
});
