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
		
		// Status code 204: Content not found
		// if ( anuncios.length === 0 ) {
		// 	res.status(204);
		// }
	} catch(err) {
		console.log('Llega a catch en anuncios', err)

		next(err)
		return
	}
})
router.get('/tags', async (req, res, next) => {
	try {
	console.log('Pasa por tags')
	const valoresTags = await Anuncio.distinct('tag')
	res.json({success: true, results: valoresTags})
	
	// Status code 204: Content not found
	if ( valoresTags.length === 0 ) {
		res.status(204);
	}
	
	} catch(err) {
		next(err)
		return
	}
})
router.post('/nuevoanuncio', async (req, res, next) =>{
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


