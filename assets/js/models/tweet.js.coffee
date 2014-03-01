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

    formatted_timestamp: () -> @get("timestamp").toLocaleString()
    iso_timestamp: () -> @get("timestamp").toISOString()
    url: () -> "https://twitter.com/#{@get("user").screen_name}/status/#{@get("id_str")}"
    screen_name: () -> @get("user").screen_name
    full_name: () -> @get("user").name
    avatar_url: () -> @get("user").profile_image_url
    tweet_html: () -> vivify_twitter_entities(@get("text"), @get("entities"))
    has_image: () -> @image_url()?

    image_url: () ->
      medias = @get("entities").media or []
      return m.media_url for m in medias when m.type is "photo"

      urls = @get("entities").urls or []
      regex = /^https?:\/\/(www\.)?instagram\.com\/p\/.*$/i
      return "#{u.expanded_url}media" for u in urls when regex.test(u.expanded_url)

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

    ###
      Known issue: unicode characters (like emoji) are actually represented
      as two characters in the string. Twitter entities consider them to be
      one character — so we need to adjust for these characters in our index
      calculations. Further reading: http://mzl.la/1bVdOF9
    ###
    for r in replacements
      parts.push(text.substring(index, r.start)) if index isnt r.start
      parts.push(r.link(text.substring(r.start, r.end)))

      index = r.end

    parts.push(text.substring(index, text.length)) if index isnt text.length

    return parts.join("")
