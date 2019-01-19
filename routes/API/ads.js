'use strict'

const express = require('express')
const router = express.Router()
const Ad = require('../../models/Ad')

// para recoger los filtros de las consultas al API
router.get('/', async (req, res, next) => {
	try {
		const name = req.query.name
		const sale = req.query.sale
		const price = req.query.price
		const tags = req.query.tags
		// hasta aquí quedan definidas todas las constantes por las que se van a poder hacer consultas 
		const skip = parseInt(req.query.skip)
		const limit = parseInt(req.query.limit)
		const fields = req.query.fields
		const sort = req.query.sort

		const filtro = {}

		if (name) {
			filtro.name = name
		} 
		if (sale) {
			filtro.sale = sale
		}
		if (price) {
			filtro.price = price
		}
		if (tags) {
			filtro.tags = tags
		}
		// buscamos anuncios en la base de datos legopop
		const ads = await Ad.buscar(filtro, skip, limit, fields, sort)
		res.json({ success: true, results: ads })

	} catch(err) {
			next(err)
			return
	}
})
router.post('/', async (req, res, next) =>{
	try{
		const data = req.body
		const ad = new Ad(data)
		const adSaved = await ad.save()
		res.json({ success: true, results: adSaved})

	} catch(err) {
		next(err)
		return
	}
})
module.exports = router