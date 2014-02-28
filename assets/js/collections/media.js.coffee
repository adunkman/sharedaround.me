#= require vendor/jquery
#= require vendor/underscore
#= require vendor/backbone
#= require models/tweet
#= require models/instagram

SharedAroundMe = SharedAroundMe or {}
SharedAroundMe.Collections or= {}

class SharedAroundMe.Collections.Media extends Backbone.Collection
  url: "/media"
  comparator: (m) -> -m.get("timestamp")

  model: (attrs, options) ->
    switch attrs.service
      when "twitter" then new SharedAroundMe.Models.Tweet(attrs, options)
      when "instagram" then new SharedAroundMe.Models.Instagram(attrs, options)
      else new Backbone.Model(attrs, options)
