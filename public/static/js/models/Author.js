define(['backbone'], function(Backbone) {
  var Author;
  Author = Backbone.Model.extend({
    defaults: {
      id: 0,
      name: 'name por default',
      photo: '0.jpg',
      twitter: '@tuit0',
      url: 'https://www.google.com.pe/?q=0'
    },
    initialize: function() {
      this.on('change:name', function() {
        console.log('se cambio el name a: ' + this.get('name'));
      });
    },
    setName: function(newName) {
      this.set({
        'name': newName
      });
    }
  });
  return Author;
});
