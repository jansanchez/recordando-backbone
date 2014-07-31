define(['backbone', 'models/Author'], function(Backbone, Author) {
  var Authors;
  Authors = Backbone.Collection.extend({
    model: Author
  });
  return Authors;
});
