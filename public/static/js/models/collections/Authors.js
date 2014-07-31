define(['backbone', 'models/Author'], function(Backbone, Author) {
  var Authors;
  Authors = Backbone.Collection.extend({
    model: Author,
    url: function() {
      return 'http://localhost:9494/authors';
    }
  });
  return Authors;
});
