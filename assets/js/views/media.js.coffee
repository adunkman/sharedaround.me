#= require vendor/jquery
#= require vendor/jquery.timeago
#= require vendor/underscore
#= require vendor/backbone
#= require views/item

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Views or= {}

class SharedAroundMe.Views.Media extends Backbone.View
  initialize: () ->
    @listenTo(@collection, "request", _.bind(@set_loading_state, this, true))
    @listenTo(@collection, "sync", _.bind(@set_loading_state, this, false))
    @listenTo(@collection, "sync", @render)

    @item_list = @$("ol")

  set_loading_state: (is_loading) ->
    @$el.toggleClass("loading", is_loading)

  render: () ->
    @render_model(m) for m in @collection.models
    @$("time").timeago()

  render_model: (model) ->
    view = new SharedAroundMe.Views.Item({ model })
    @item_list.append(view.el)
