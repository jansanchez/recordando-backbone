define(['backbone', 'underscore'], function(Backbone, _) {
  var galleryRow;
  galleryRow = Backbone.View.extend({
    model: null,
    collection: null,
    events: {
      "dbclick input": "editAuthor"
    },
    template: $('#tplAuthor').html(),
    initialize: function() {
      _.bindAll(this, 'render', 'deleteAuthor');
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      console.log('initializa Row');
    },
    render: function() {
      var compiled_template;
      compiled_template = _.template(this.template);
      this.$el.html(compiled_template(this.model.toJSON()));
      return this;
    },
    deleteAuthor: function() {
      this.collection.remove(this.model);
    }
  });
  return galleryRow;
});
