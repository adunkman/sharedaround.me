#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Models or= {}

class SharedAroundMe.Models.Instagram extends Backbone.Model
  parse: (data) ->
    data.timestamp = new Date(parseInt(data.created_time, 10) * 1000)
    return data

  formatted_timestamp: () -> @get("timestamp").toLocaleString()
  iso_timestamp: () -> @get("timestamp").toISOString()
  url: () -> @get("link")
  is_video: () -> @get("type") is "video"
  screen_name: () -> @get("user").username
  full_name: () -> @get("user").full_name
  avatar_url: () -> @get("user").profile_picture
  image_url: () -> @get("images").standard_resolution.url
  video_url: () -> @get("videos").standard_resolution.url
  caption: () -> if c = @get("caption") then c.text else ""
