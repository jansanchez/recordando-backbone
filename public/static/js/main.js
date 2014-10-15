require.config({
  baseUrl: 'static/js/',
  paths: {
    jquery: 'libs/jquery/dist/jquery.min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/text/text'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require(['jquery', 'underscore', 'backbone', 'text'], function($, _, Backbone, text) {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  require(['static/js/views/modules/GalleryView.js'], function(GalleryView) {
    new GalleryView();
  });
});
