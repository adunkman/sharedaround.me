//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone

var SharedAroundMe = SharedAroundMe || {};
SharedAroundMe.Views = SharedAroundMe.Views || {};

SharedAroundMe.Views.Media = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "request", _.bind(this.setLoadingState, this, true));
    this.listenTo(this.collection, "sync", _.bind(this.setLoadingState, this, false));
    this.listenTo(this.collection, "sync", this.render);
  },

  setLoadingState: function (isLoading) {
    this.$el.toggleClass("loading", isLoading);
  },

  scrollIntoView: function () {
    $("body").animate({
      scrollTop: this.$el.offset().top
    }, 1000);
  },

  render: function () {
    var models = this.collection.models;

    for (var i = models.length - 1; i >= 0; i--) {
      var model = models[i];
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
        this.$el.append(view.el);
      }
    }
  }

});
