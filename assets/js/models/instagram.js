//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Models = SharedAroundMe.Models || {};

SharedAroundMe.Models.Instagram = Backbone.Model.extend({
  parse: function (data) {
    data.timestamp = new Date(parseInt(data.created_time, 10) * 1000);
    return data;
  }
});
