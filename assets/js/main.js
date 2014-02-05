//= require collections/media
//= require views/base

new SharedAroundMe.Views.Base({
  el: document,
  collection: new SharedAroundMe.Collections.Media()
});
