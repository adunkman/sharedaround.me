//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require templates/instagram

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Instagram = Backbone.View.extend({
  className: "item instagram",
  tagName: "section",

  initialize: function () {
    this.render();
  },

  render: function () {
    var html = JST["templates/instagram"]({ model: this.model });
    this.$el.html(html);
  }
});
