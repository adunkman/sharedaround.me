#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Models or= {}

class SharedAroundMe.Models.Instagram extends Backbone.Model
  parse: (data) ->
    data.timestamp = new Date(parseInt(data.created_time, 10) * 1000)
    return data

  url: () -> @get("link")
  isVideo: () -> @get("type") is "video"
  screenName: () -> @get("user").username
  fullName: () -> @get("user").full_name
  avatarPath: () -> @get("user").profile_picture
  imagePath: () -> @get("images").standard_resolution.url
  caption: () -> if c = @get("caption") then c.text else ""
