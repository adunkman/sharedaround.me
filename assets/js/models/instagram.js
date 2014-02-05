//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Models = SharedAroundMe.Models || {};

SharedAroundMe.Models.Instagram = Backbone.Model.extend({
  parse: function (data) {
    data.timestamp = new Date(parseInt(data.created_time, 10) * 1000);
    return data;
  },

  isVideo: function () { return this.get("type") == "video"; },
  screenName: function () { return this.get("user").username; },
  fullName: function () { return this.get("user").full_name; },
  avatarPath: function () { return this.get("user").profile_picture; },
  imagePath: function () { return this.get("images").standard_resolution.url; },
  caption: function () { return (c = this.get("caption")) ? c.text : ""; }
});
