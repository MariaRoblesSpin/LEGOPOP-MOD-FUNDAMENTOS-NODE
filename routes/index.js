var express = require('express')
var router = express.Router()

const filtros = require('./api/filtros')

/* GET home page. */
router.get('/', async (req, res, next) => {
	try {
		const anuncios = await filtros(req)
		// variables para la plantilla ejs 
		res.locals.anuncios = anuncios
		res.render('index')

	} catch(err) {
		next(err)
		return
	}
})


module.exports = router
