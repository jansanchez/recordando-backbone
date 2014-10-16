define(['backbone', 'underscore', 'views/modules/childrens/GalleryRow', 'models/collections/Authors'], function(Backbone, _, galleryRow, Authors) {
  var GalleryView;
  GalleryView = Backbone.View.extend({
    el: 'body',
    collection: null,
    dom: {},
    catchDom: function() {
      this.dom.frmAuthor = this.$('#frmAuthor', this.$el);
      this.dom.txtId = this.$('#id', this.dom.frmAuthor);
      this.dom.txtName = this.$('#name', this.dom.frmAuthor);
      this.dom.txtPhoto = this.$('#photo', this.dom.frmAuthor);
      this.dom.txtTwitter = this.$('#twitter', this.dom.frmAuthor);
      this.dom.txtUrl = this.$('#url', this.dom.frmAuthor);
    },
    initialize: function() {
      _.bindAll(this, 'render', 'addAuthor', 'newAuthor');
      this.collection = new Authors();
      this.collection.fetch();
      this.listenTo(this.collection, 'add', this.addAuthor);
      this.listenTo(this.collection, 'remove', this.removeAuthor);
      this.catchDom();
    },
    render: function() {},
    addAuthor: function(modelo) {
      var view;
      view = new galleryRow({
        model: modelo,
        collection: this.collection
      });
      this.$el.find('.authors').append(view.render().el);
    },
    removeAuthor: function(modelo) {
      modelo.destroy();
    },
    newAuthor: function(e) {
      var authorData;
      authorData = {
        id: this.dom.txtId.val(),
        name: this.dom.txtName.val(),
        photo: this.dom.txtPhoto.val(),
        twitter: this.dom.txtTwitter.val(),
        url: this.dom.txtUrl.val()
      };
      console.log(this.collection);
      this.collection.create(authorData);
    },
    events: {
      "click #btnSubmit": "newAuthor"
    }
  });
  return GalleryView;
});
