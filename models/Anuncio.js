'use strict'

const mongoose = require('mongoose')

//definimos el esquema 
const anuncioSchema = mongoose.Schema ({
  nombre: { type: String, index: true, required: true},
  venta: { type: Boolean, index: true, required: true },
  precio: { type: Object, index: true, required: true },
  foto: { type: String, required: true, lowercase: true},
  tag: { type: [String], index: true, required: true, lowercase: true}
}) 

anuncioSchema.statics.buscar = (filtro, skip, limit, fields, sort) => {
  const query = Anuncio.find(filtro)
  query.skip(skip)
  query.limit(limit)
  query.select(fields)
  query.sort(sort)
  
  return query.exec()
}

//creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio