'use strict'

const mongoose = require('mongoose')

//definimos el esquema 
const anuncioSchema = mongoose.Schema({
    name: String,
    age: Number,
}) 

//creamos el modelo
const Anuncio = mongoose.model('Agente', anuncioSchema)

Anuncio.find().exec((err, anuncios) => {
    console.log(anuncios)
}) 
module.exports = Anuncio