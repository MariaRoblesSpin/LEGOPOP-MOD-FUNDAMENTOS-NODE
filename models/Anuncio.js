'use strict'

const mongoose = require('mongoose')

//definimos el esquema 
const anuncioSchema = mongoose.Schema ({
	nombre: { type: String, index: true, required: true},
	venta: { type: Boolean, index: true, required: true},
	precio: { type: Object, index: true, required: true},
	foto: { type: String, required: true},
	tag: { type: [], index: true, required: true},
	codigo: { type: Number, index: true}
}) 

anuncioSchema.statics.buscar = (filtro, skip, limit, sort, fields) => {
	const query = Anuncio.find(filtro)
	query.skip(skip)
	query.limit(limit)
	query.sort(sort)
	query.select(fields)

	//query.where('tag').all(tag)
  
	return query.exec()
}

//creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio