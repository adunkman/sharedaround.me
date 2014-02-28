#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone

vSharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Models or= {}

class SharedAroundMe.Models.Tweet extends Backbone.Model
  parse: (data) ->
    data.timestamp = new Date(data.created_at)
    return data

  url: () -> "https://twitter.com/#{@get("user").screen_name}/status/#{@get("id_str")}"
  screenName: () -> @get("user").screen_name
  avatarPath: () -> @get("user").profile_image_url
  fullName: () -> @get("user").name
  tweetHtml: () -> @get("text")

  imagePath: () ->
    medias = @get("entities").media or []
    return m.media_url for m in medias when m.type is "photo"
