define(['backbone', 'underscore'], (Backbone, _) ->

	galleryRow = Backbone.View.extend({
		# Creamos la vista hija "galleryRow" para cada autor
		model : null,
		collection: null,
		events: {
			"dbclick input" : "editAuthor"
		},
		template : $('#tplAuthor').html(),
		initialize: () ->
			_.bindAll(this, 'render', 'deleteAuthor')

			# Nos podemos a escuchar desde la vista hija actual cuando ocurra un evento "change" en el modelo y lanzamos la función "render" de la vista hija actual
			this.listenTo(this.model, 'change', this.render)
			# Nos podemos a escuchar desde la vista hija actual cuando ocurra un evento "destroy" en el modelo y lanzamos la función "remove" de la vista hija actual
			this.listenTo(this.model, 'destroy', this.remove)
			return
		,
		render : () ->
			compiled_template = _.template(this.template)
			# Traemos los datos del modelo(this.model.toJSON()) a su vista(this.$el) correspondiente
			this.$el.html(compiled_template(this.model.toJSON()))
			# Retornamos this para poder usar el elemento generado
			return this
		,
		deleteAuthor: () ->
			# Removemos el modelo seleccionado desde su colección correspondiente
			this.collection.remove(this.model)
			return
	})

	return galleryRow

)
