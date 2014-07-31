
define(['backbone', 'models/Author'], (Backbone, Author) ->

	# Creamos una colección de Autores
	Authors = Backbone.Collection.extend({
		# Establecemos como modelo de la colección al modelo: Author
		model : Author,
		url: () ->
			return 'http://localhost:9494/authors'
	})

	return Authors

)

