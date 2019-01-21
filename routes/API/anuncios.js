'use strict'

const express = require('express')
const router = express.Router()
const Anuncio = require('../../models/Anuncio')

// para recoger los filtros de las consultas al API
router.get('/', async (req, res, next) => {
	try {
		console.log('Pasa por anuncios!!!')
		const nombre = req.query.nombre
		const venta = req.query.venta
		const precio = req.query.precio
		const tags = req.query.tags
		// hasta aquí quedan definidas todas las constantes por las que se van a poder hacer consultas 
		const start = parseInt(req.query.start)
		const skip = parseInt(req.query.skip)
		const limit = parseInt(req.query.limit)
		const fields = req.query.fields
		const sort = req.query.sort

		const filtro = {}

		if (nombre) {
			filtro.nombre = nombre
		} 
		if (venta) {
			filtro.venta = venta
		}
		if (precio) {
			filtro.precio = precio
		}
		if (tags) {
			filtro.tags = tags
		}
		// buscamos anuncios en la base de datos legopop
		const anuncios = await Anuncio.buscar(filtro, start, skip, limit, fields, sort)

		res.json({success: true, results: anuncios})

	} catch(err) {
			next(err)
			return
	}
})
router.post('/', async (req, res, next) =>{
	try{
		const data = req.body
		const anuncio = new Anuncio(data)
		const anuncioGuardado = await anuncio.save()
		res.json({ success: true, results: anuncioGuardado})

	} catch(err) {
		next(err)
		return
	}
})
module.exports = router