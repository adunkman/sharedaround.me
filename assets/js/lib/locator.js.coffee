#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone

SharedAroundMe = SharedAroundMe or {}

class SharedAroundMe.Locator
  constructor: () ->
    _.extend(@, Backbone.Events)

  get_current_position: () ->
    navigator.geolocation.getCurrentPosition(@trigger_coordinates, @trigger_error)

  trigger_coordinates: (position) =>
    @trigger("coordinates", _.pick(position.coords, "latitude", "longitude"))

  trigger_error: (error) =>
    description = switch error.code
      when error.PERMISSION_DENIED then "You denied the request for your location."
      when error.POSITION_UNAVAILABLE then "Your device cannot locate you right now."
      when error.TIMEOUT then "Your device couldn’t locate you in a timely fashion."
      else "Your device is being weird."

    @trigger("error", { description })
