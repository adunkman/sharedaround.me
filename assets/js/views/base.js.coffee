#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone
#= require lib/locator
#= require collections/media
#= require views/media

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Views or= {}

class SharedAroundMe.Views.Base extends Backbone.View
  events:
    "click .js-locate": "locate"

  location_services_missing:
    description: "Your browser doesn’t have the capability to determine your location."

  initialize: () ->
    return @show_error(@location_services_missing) unless `"geolocation" in navigator`

    @locator = new SharedAroundMe.Locator()
    @collection = new SharedAroundMe.Collections.Media()
    @media = new SharedAroundMe.Views.Media(el: @$("#media"), collection: @collection)

    @listenTo(@locator, "coordinates", @load)
    @listenTo(@locator, "error", @show_error)

    @$el.addClass("no-location")

  locate: () ->
    @$el.removeClass("no-location").removeClass("has-media").addClass("locating")
    @$("#working p").text("Locating you…")
    @locator.get_current_position()

  load: (coordinates) ->
    @$el.removeClass("locating").addClass("loading")
    @$("#working p").html("<strong>Wahoo! Found you.</strong> Looking around…")
    @collection.fetch(data: coordinates)
    @listenToOnce(@collection, "sync", @show_media)

  show_error: (error) ->
    @$el.removeClass("no-location").removeClass("locating").addClass("location-services-error")
    @$("#location-services-error p").text(error.description)

  show_media: () ->
    @$el.removeClass("loading").addClass("has-media")
