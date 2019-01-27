const Anuncio = require('../../models/Anuncio')

function filtros (req) {
	// obtener del req todos los parámetros que van a permitir consultas
	const nombre = req.query.nombre
	const venta = req.query.venta
	const precio = req.query.precio
	const codigo = req.query.codigo
	let tag = req.query.tag
	let skip = parseInt(req.query.skip)
	let limit = parseInt(req.query.limit)
	let fields = req.query.fields
	let sort = req.query.sort

	// construir los filtros 
	const filtro = {}

	if ( typeof nombre !== 'undefined' ) {
		filtro.nombre = new RegExp('^' + nombre, 'i')
	} 
	if (venta) {
		filtro.venta = venta
	}
	if (precio) {
		let precioString = precio.toString()
		let posicionGuion = precioString.indexOf('-')
		let regexpMayorMenor = new RegExp('^\\d*-\d*')
		let regexpMayor = new RegExp('\d*-$')
		let regexpMenor = new RegExp('^-\d*')
		let regexpDigito = new RegExp('d*$')

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
		} else if (regexpDigito.test(precioString)) {
			filtro.precio = parseInt(precio)
		}
	}
	// if ( precio == 'null' || precio == '0') {
	// 	filtro.precio = null
	// }
	if (codigo) {
		filtro.codigo = codigo
	}
	if (typeof tag !== 'undefined') {
		// Filtrado por varios tags en case insensitive
		// Estructura expresion regular necesaria(/^a/i)
		if (Array.isArray(tag)){ 
			tag.forEach((element, indice, arrayQuery) => {
				element = new RegExp('^' + element, 'i')
				arrayQuery.push(element)
			})
			filtro.tag = { $in: tag }
		} else if (typeof tag === 'string'){
			let regExpTag = new RegExp('^' + tag, 'i')
			filtro.tag = regExpTag
		}	
	}

	if (sort) {
		
		if (sort === 'nombre' && sort === 'nombre:1'){
			sort = { nombre: 1 }
		} else if (sort === 'nombre:-1'){
			sort = { nombre: -1 }
		}

		if (sort === 'precio' && sort === 'precio:1'){
			sort = { precio: 1 }
		} else if (sort === 'precio:-1'){
			sort = { precio: -1 }
		}

		if (sort === 'codigo' && sort === 'codigo:1'){
			sort = { codigo: 1 }
		} else if (sort === 'codigo:-1'){
			sort = { codigo: -1 }
		}

	}
	

	// buscamos anuncios en la base de datos legopop
	return Anuncio.buscar(filtro, skip, limit, sort, fields)
}

module.exports = filtros