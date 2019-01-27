const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator/check')

const Anuncio = require('../../models/Anuncio')
const filtros = require('./filtros')

// para recoger los filtros de las consultas al API
router.get('/',[
	query('precio').optional().not().isEmpty().withMessage('Necesita un valor. Búsquedas por precio: valor, valor-, -valor, valor-valor'),
	query('nombre').optional().not().isEmpty().withMessage('Necesita un valor: string.'),
	query('venta').optional().not().isEmpty().withMessage('Necesita un valor: boolean.'),
	query('codigo').optional().not().isEmpty().withMessage('Necesita un valor: number.'),
	query('tag').optional().not().isEmpty().withMessage('Necesita un valor o varios: strings. ?tag=valor&tag=valor'),
	query('sort').optional().not().isEmpty().withMessage('Necesita un valor: nombre o precio.'),
	query('limit').optional().not().isEmpty().withMessage('Necesita un valor: Number.'),
	query('skip').optional().not().isEmpty().withMessage('Necesita un valor: Number.'),
	query('fields').optional().not().isEmpty().withMessage('Necesita uno o vario de los campos que contiene el anuncio: nombre, precio, venta, foto, tag, codigo. Separados por un espacio')

], async (req, res, next) => {
	try {
		validationResult(req).throw() //lanza una excepción si hay errores de validación
		// menor /^-d*/
		// mayor /d*-$/
		// rango /^\d*-d*/
		// digito  /d*$/
		const anuncios = await filtros(req)
		res.json({success: true, results: anuncios})
		
		// Status code 204: Content not found
		// if ( anuncios.length === 0 ) {
		// 	res.status(204);
		// }
	} catch(err) {
		next(err)
		return
	}
})
router.get('/tags', async (req, res, next) => {
	try {
		const valoresTags = await Anuncio.distinct('tag')
		res.json({success: true, results: valoresTags})
	
		// Status code 204: Content not found
		if ( valoresTags.length === 0 ) {
			res.status(204)
		}
	
	} catch(err) {
		next(err)
		return
	}
})
router.post('/nuevoanuncio', async (req, res, next) =>{
	try{
		const data = req.body
		console.log('fotooooooooooooooo', req.body)
		const anuncio = new Anuncio(data)
		const anuncioGuardado = await anuncio.save()
		res.json({ success: true, results: anuncioGuardado})

	} catch(err) {
		next(err)
		return
	}
})
module.exports = router


