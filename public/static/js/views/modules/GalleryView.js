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
    },
    render: function() {
      console.log('render principal');
    },
    addOne: function(modelo) {},
    removeOne: function(modelo) {
      modelo.destroy();
    }
  });
  return GalleryView;
});
