define(['backbone'], (Backbone) ->
	# Creamos un modelo de Backbone
	Author = Backbone.Model.extend({
		# Defino los atributos por defecto del modelo
		defaults : {
			id      : 0
			name  : 'name por default'
			photo  : '0.jpg'
			twitter : '@tuit0'
			url     : 'https://www.google.com.pe/?q=0'
		},
		# Pseudo constructor del modelo, se ejecuta cuando un modelo es instanciado
		initialize : () ->
			# Nos ponemos a escuchar el evento 'change:name' del modelo
			this.on('change:name', () ->
				console.log('se cambio el name a: ' + this.get('name'))
				return
			)
			return
		,
		# Agregamos al modelo funciones de manipulación de sus atributos
		setName : (newName) ->
			# Seteamos el atributo name desde un argumento llamado newName
			this.set({'name' : newName})
			return
	})

	return Author
)
