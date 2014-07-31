
define(['backbone', 'underscore', 'views/modules/childrens/GalleryRow',  'models/collections/Authors'], (Backbone, _, galleryRow, Authors) ->

	# Creamos la vista principal que contendrá nuestras vistas hijas
	GalleryView = Backbone.View.extend({
		el : '.authors',
		contador : 0,
		collection: null,
		initialize: () ->
			# _.bindAll(this) hace que las funciones apunten siempre al "this" del objeto principal
			_.bindAll(this, 'render')

			# Asignamos a la variable "collection" una instancia de nuestra Colección
			this.collection = new Authors()
			# traemos la colleccion desde el servidor		
			this.collection.fetch()

			this.listenTo(this.collection, 'add', this.addAuthor)
			
			return
		,
		# Función "render" de la vista
		render: () ->
			# Aqui renderizo la vista principal, la cargo con datos si deseo
			console.log('render de MainView');
			return
		,
		# Cuando hubo un "add" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado
		addAuthor : (modelo) ->
			#console.log(modelo);
			# Creamos una instancia de una vista hija y le pasamos su modelo recientemente creado
			view = new galleryRow({model : modelo, collection: this.collection})

			# Appeneamos dentro de $('.dragger') el nuevo elemento que nos devuelve la función render de la vista hija
			this.$el.append( view.render().el )
			return
		,
		# Cuando hubo un "remove" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado
		removeOne : (modelo) ->
			# Destruimos el modelo
			modelo.destroy()
			return
	})

	return GalleryView
)
