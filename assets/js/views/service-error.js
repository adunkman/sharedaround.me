//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require templates/service-error

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.ServiceError = Backbone.View.extend({
  className: "item error",
  tagName: "section",

  initialize: function () {
    this.render();
  },

  render: function () {
    var html = JST["templates/service-error"]({ model: this.model });
    this.$el.html(html);
  }
});
