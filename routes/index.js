var express = require('express')
var router = express.Router()
const Anuncio = require('../models/Anuncio')
const { query, params, body, validationResult } = require('express-validator/check')

/* GET home page. */
router.get('/', [
  query('precio').isNumeric().withMessage('must be numeric')
], async (req, res, next) => {
	try {
		console.log('Pasa por index!!!')
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
			filtro.nombre = new RegExp('^' + req.query.nombre, 'i')
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

    // variables para la plantilla ejs 
    res.locals.anuncios = anuncios
    
    res.render('index');

	} catch(err) {
			next(err)
			return
	}
})


module.exports = router;
