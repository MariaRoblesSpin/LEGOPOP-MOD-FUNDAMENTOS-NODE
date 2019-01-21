'use strict'

const mongoose = require('mongoose')
var conn = mongoose.connection

conn.on('error', err =>{
    console.log('Error de conexión', err)
    process.exit(1)
})

conn.once('open', () => {
    console.log('Conectado a MongoDB en base de datos', conn.name)
})

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost/legopop', { useNewUrlParser: true })

module.exports = conn