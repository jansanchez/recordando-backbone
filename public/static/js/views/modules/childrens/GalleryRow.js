define(['backbone', 'underscore'], function(Backbone, _) {
  var galleryRow;
  galleryRow = Backbone.View.extend({
    model: null,
    collection: null,
    tagName: "li",
    events: {
      "dblclick input": "editAuthor",
      "keypress input": "updateAuthor",
      "click .remove": "deleteAuthor"
    },
    template: $('#tplAuthor').html(),
    dom: {},
    catchDom: function() {
      this.dom.txtName = this.$el.find('input');
    },
    initialize: function() {
      _.bindAll(this, 'render', 'deleteAuthor', 'editAuthor', 'updateAuthor');
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      var compiled_template;
      compiled_template = _.template(this.template);
      this.$el.html(compiled_template(this.model.toJSON()));
      return this;
    },
    deleteAuthor: function() {
      this.collection.remove(this.model);
    },
    editAuthor: function() {
      this.catchDom();
      if (!this.dom.txtName.hasClass('editable')) {
        this.dom.txtName.addClass('editable');
      }
    },
    updateAuthor: function(evt) {
      if (evt.keyCode === 13) {
        this.catchDom();
        this.model.setName(this.dom.txtName.val());
        this.model.save();
      }
    }
  });
  return galleryRow;
});
