'use strict'

const mongoose = require('mongoose')

//definimos el esquema 
const adSchema = mongoose.Schema ({
  name: { type: String, index: true, required: true },
  sale: { type: Boolean, index: true, required: true },
  price: { type: Number, index: true, required: true },
  photo: { type: String, required: true },
  tags: { type: [String], index: true, required: true }
}) 

adSchema.statics.buscar = (filtro, skip, limit, fields, sort) => {
  const query = Ad.find(filtro)
  query.skip(skip)
  query.limit(limit)
  query.select(fields)
  query.sort(sort)
  return query.exec()
}

//creamos el modelo
const Ad = mongoose.model('Ad', adSchema)

Ad.find().exec((err, ads) => {
  console.log(ads)
}) 

module.exports = Ad