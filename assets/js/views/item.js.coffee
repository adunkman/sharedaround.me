#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone
#= require templates/service-error
#= require templates/instagram
#= require templates/twitter

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Views or= {}

class SharedAroundMe.Views.Item extends Backbone.View
  className: () -> "item #{@model.get("type") or ""} #{@model.get("service")}"
  tagName: "li"

  initialize: () ->
    @render()

  render: () ->
    if @model.get("type") is "error" then template_name = "error"
    else template_name = @model.get("service")

    return unless template = JST["templates/#{template_name}"]

    html = template({ @model })
    @$el.html(html)
