const Anuncio = require('../../models/Anuncio')

function filtros (req) {
	const nombre = req.query.nombre
	const venta = req.query.venta
	const precio = req.query.precio
	let tag = req.query.tag
	// hasta aquí quedan definidas todas las constantes por las que se van a poder hacer consultas 
	let skip = parseInt(req.query.skip)
	let limit = parseInt(req.query.limit)
	let fields = req.query.fields
	let sort = req.query.sort
	// FALTA buscar cómo poner los filtros sort, ascendentes y descendentes

	const filtro = {}

	if (nombre) {
		filtro.nombre = new RegExp('^' + nombre, 'i')
	} 
	if (venta) {
		filtro.venta = venta
	}
	if (precio) {
		let precioString = precio.toString()
		let posicionGuion = precioString.indexOf('-')
		let regexpMayorMenor = new RegExp('\d*-\d*$')
		let regexpMayor = new RegExp('\d*-$')
		let regexpMenor = new RegExp('-\d*')
		
		if (regexpMayor.test(precioString)) {
			let valorMayor = precioString.substring(0, posicionGuion)
			filtro.precio = { $gte: parseInt(valorMayor) }
		} else if (regexpMenor.test(precioString)) {
			let valorMenor = precioString.substring(posicionGuion+1)
			filtro.precio = { $lte: parseInt(valorMenor) }
		} else if (regexpMayorMenor.test(precioString)) {
			let valorMenor = precioString.substring(0, posicionGuion)
			let valorMayor = precioString.substring(posicionGuion+1)
			filtro.precio = { $gte: parseInt(valorMenor), $lte: parseInt(valorMayor)}
		} else {
			filtro.precio = parseInt(precio)
		}
	}
	if (tag) {
		// Falta hacerlo case insensitive: creo que estoy cerc
	
		//(/^a/i)
		let buscarTags = new RegExp('^' + tag, 'i')
		let re = buscarTags
		// filtro.tag = { $all: tag }
		filtro.tag = { $all:  tag }
		
	}
	if (sort) {
		try{
			if (sort.indexOf('=') !== -1 ) {
				throw ('Not valid: try ":" instead "="')
			} 
		} catch(err) {
			console.log('Entra en catch: ', err)
		}
		
		
		if (sort === 'nombre:1'){
			sort = { nombre: 1 }
		} else if (sort === 'nombre:-1'){
			sort = { nombre: -1 }
		} else if (sort === 'nombre'){
			sort = { nombre: 1 }
		} 
		
		if (sort === 'precio:1'){
			sort = { precio: 1 }
		} else if (sort === 'precio:-1'){
			sort = { precio: -1 }
		} else if (sort === 'precio'){
			sort = { precio: 1 }
		}

		if (sort === 'venta:1'){
			sort = { venta: 1 }
		} else if (sort === 'venta:-1'){
			sort = { venta: -1 }
		} else if (sort === 'venta'){
			sort = { venta: 1 }
		}
	}

	if (fields) {
		filtro.fields = fields
	}
	

	// buscamos anuncios en la base de datos legopop

	return Anuncio.buscar(filtro, skip, limit, fields, sort)
}

module.exports = filtros