define(['backbone', 'underscore', 'views/modules/childrens/GalleryRow', 'models/collections/Authors'], function(Backbone, _, galleryRow, Authors) {
  var GalleryView;
  GalleryView = Backbone.View.extend({
    el: '.authors',
    contador: 0,
    collection: null,
    initialize: function() {
      _.bindAll(this, 'render');
      this.collection = new Authors();
      this.collection.fetch();
      this.listenTo(this.collection, 'add', this.addAuthor);
      this.listenTo(this.collection, 'remove', this.removeAuthor);
    },
    render: function() {
      console.log('render de MainView');
    },
    addAuthor: function(modelo) {
      var view;
      view = new galleryRow({
        model: modelo,
        collection: this.collection
      });
      this.$el.append(view.render().el);
    },
    removeAuthor: function(modelo) {
      modelo.destroy();
    }
  });
  return GalleryView;
});
