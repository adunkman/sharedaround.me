#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Models or= {}

do () ->
  class SharedAroundMe.Models.Tweet extends Backbone.Model
    parse: (data) ->
      data.timestamp = new Date(data.created_at)
      return data

    url: () -> "https://twitter.com/#{@get("user").screen_name}/status/#{@get("id_str")}"
    screenName: () -> @get("user").screen_name
    avatarPath: () -> @get("user").profile_image_url
    fullName: () -> @get("user").name

    tweetHtml: () ->
      vivify_twitter_entities(@get("text"), @get("entities"))

    imagePath: () ->
      medias = @get("entities").media or []
      return m.media_url for m in medias when m.type is "photo"

  vivify_twitter_entities = (text, entities) ->
    replacements = []
    parts = []
    index = 0

    for e in entities.urls then replacements.push
      start: e.indices[0]
      end: e.indices[1]
      link: do (e) -> () ->
        "<a href='#{e.url}' title='#{e.expanded_url}'>#{e.display_url}</a>"

    for e in entities.symbols.concat(entities.hashtags) then replacements.push
      start: e.indices[0]
      end: e.indices[1]
      link: do (e) -> (text) ->
        search_url = "https://twitter.com/search?q=#{encodeURIComponent(text)}"
        "<a href='#{search_url}' class='tag'>#{text}</a>"

    for e in entities.user_mentions then replacements.push
      start: e.indices[0]
      end: e.indices[1]
      link: do (e) -> (text) ->
        profile_url = "https://twitter.com/#{encodeURIComponent(e.screen_name)}"
        "<a href='#{profile_url}' class='mention'>#{text}</a>"

    for e in entities.media or [] then replacements.push
      start: e.indices[0]
      end: e.indices[1]
      link: () -> "" # Remove pic.twitter.com links, we’re already rendering it.

    replacements.sort((a, b) -> a.start - b.start)

    for r in replacements
      parts.push(text.substring(index, r.start)) if index isnt r.start
      parts.push(r.link(text.substring(r.start, r.end)))

      index = r.end

    parts.push(text.substring(index, text.length)) if index isnt text.length

    return parts.join("")
