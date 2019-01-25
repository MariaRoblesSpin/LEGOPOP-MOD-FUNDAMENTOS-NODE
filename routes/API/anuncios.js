const express = require('express')
const router = express.Router()

const Anuncio = require('../../models/Anuncio')
const filtros = require('./filtros')

// para recoger los filtros de las consultas al API
router.get('/', async (req, res, next) => {
	try {
		console.log('Pasa por anuncios!!!')
		const anuncios = await filtros(req)
		res.json({success: true, results: anuncios})
	} catch(err) {
			next(err)
			return
	}
})
router.get('/tags', async (req, res, next) => {
	try {
	console.log('Pasa por tags')
	const valoresTags = await Anuncio.distinct('tag')
	res.json({success: true, results: valoresTags})
	
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


