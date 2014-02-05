//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require templates/tweet

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Tweet = Backbone.View.extend({
  initialize: function () {
    this.render();
  },

  render: function () {
    var html = JST["templates/tweet"]({ model: this.model });
    this.$el.html(html);
  }
});
