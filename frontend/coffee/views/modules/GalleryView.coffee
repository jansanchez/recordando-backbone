
define(['backbone', 'underscore', 'views/modules/childrens/GalleryRow',  'models/collections/Authors'], (Backbone, _, galleryRow, Authors) ->

	# Creamos la vista principal que contendrá nuestras vistas hijas
	GalleryView = Backbone.View.extend({
		el: 'body',
		collection: null,
		dom: {},
		catchDom: () ->
			this.dom.frmAuthor = this.$('#frmAuthor', this.$el)
			this.dom.txtId = this.$('#id', this.dom.frmAuthor)
			this.dom.txtName = this.$('#name', this.dom.frmAuthor)
			this.dom.txtPhoto = this.$('#photo', this.dom.frmAuthor)
			this.dom.txtTwitter = this.$('#twitter', this.dom.frmAuthor)
			this.dom.txtUrl = this.$('#url', this.dom.frmAuthor)
			#console.log('catchDom')
			return
		initialize: () ->
			# _.bindAll(this) hace que las funciones apunten siempre al "this" del objeto principal
			_.bindAll(this, 'render', 'addAuthor', 'newAuthor')

			# Asignamos a la variable "collection" una instancia de nuestra Colección
			this.collection = new Authors()

			# Traemos la collección desde el servidor, esto realizará un GET hacia la url de la colección
			this.collection.fetch()

			# Ejecutamos la funcion 'addAuthor' cuando escuchamos el evento 'add' en la colección
			this.listenTo(this.collection, 'add', this.addAuthor)
			# Ejecutamos la funcion 'removeAuthor' cuando escuchamos el evento 'remove' en la colección
			this.listenTo(this.collection, 'remove', this.removeAuthor)

			this.catchDom()
			return
		,
		# Función "render" de la vista
		render: () ->
			# Aqui renderizo la vista principal, la cargo con datos si deseo, en este caso no la necesito
			return
		,
		# Cuando hubo un "add" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado
		addAuthor: (modelo) ->
			# Creamos una instancia de una vista hija y le pasamos su modelo recientemente creado
			view = new galleryRow({model : modelo, collection: this.collection})

			# Appeneamos dentro de $('.authors') el nuevo elemento que nos devuelve la función render de la vista hija
			this.$el.find('.authors').append( view.render().el )
			return
		,
		# Cuando hubo un "remove" en la colección ejecutamos esta función y recibimos como parámetro el modelo afectado
		removeAuthor: (modelo) ->
			# Destruimos el modelo
			modelo.destroy()
			return
		,
		newAuthor: (e) ->
			authorData = {
				id: this.dom.txtId.val()
				name: this.dom.txtName.val()
				photo: this.dom.txtPhoto.val()
				twitter: this.dom.txtTwitter.val()
				url: this.dom.txtUrl.val()
			}

			#console.log(this.collection)
			this.collection.create(authorData)

			return
		,
		events: {
			"click #btnSubmit": "newAuthor"
		}

	})

	return GalleryView
)
