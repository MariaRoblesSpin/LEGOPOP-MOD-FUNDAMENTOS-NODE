var express = require('express')
var router = express.Router()

const Anuncio = require('../models/Anuncio')
const filtros = require('./api/filtros')

/* GET home page. */
router.get('/', async (req, res, next) => {
	try {
		console.log('Pasa por index!!!')
		
    const anuncios = await filtros(req)
    // variables para la plantilla ejs 
    res.locals.anuncios = anuncios
	res.render('index');

	} catch(err) {
		console.log('Llega a catch en index')
		next(err)
		return
	}
})


module.exports = router;
