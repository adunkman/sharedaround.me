//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Models = SharedAroundMe.Models || {};

SharedAroundMe.Models.Tweet = Backbone.Model.extend({
  parse: function (data) {
    data.timestamp = new Date(data.created_at);
    return data;
  },

  screenName: function () { return this.get("user").screen_name; },
  avatarPath: function () { return this.get("user").profile_image_url; },
  fullName: function () { return this.get("user").name; },
  tweetHtml: function () { return this.get("text"); },

  imagePath: function () {
    var medias = this.get("entities").media || [];

    for (var i = 0; i < medias.length; i++) {
      var media = medias[i];

      if (media.type == "photo") {
        return media.media_url;
      }
    };
  }
});
