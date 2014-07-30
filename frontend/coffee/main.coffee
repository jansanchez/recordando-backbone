require.config({
	baseUrl: 'public/js/',
	paths: {
		jquery: 'libs/jquery/jquery.min',
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
})


require(['jquery', 'underscore', 'backbone', 'text'], ($, _, Backbone, text) ->

	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g }

	require(['js/views/modules/GalleryView.js'],
		(GalleryView) ->
			#Creamos una instancia de nuestra galería principal
			new GalleryView({})
	)
)
