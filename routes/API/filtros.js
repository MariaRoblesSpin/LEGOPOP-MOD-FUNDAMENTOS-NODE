const Anuncio = require('../../models/Anuncio')

function filtros (req) {
	// obtener del req todos los parámetros que van a permitir consultas
	const nombre = req.query.nombre
	const venta = req.query.venta
	const precio = req.query.precio
	let tag = req.query.tag
	// const codigo = req.query.codigo
	let skip = parseInt(req.query.skip)
	let limit = parseInt(req.query.limit)
	let fields = req.query.fields
	let sort = req.query.sort
console.log ('valor req.query: ', req.query)

    // construir los filtros 
	const filtro = {}

	if ( typeof nombre !== 'undefined' ) {

		// expresión para que no contemple tildes ni eñes en castellano. Detalle final por si acaso
		// /([aeio])\u0301|(u)[\u0301\u0308]/
		//filtro.nombre = new RegExp('^' + '([aeio])\\u0301|(u)[\\u0301\\u0308]' + nombre, 'i')
		//filtro.nombre = new RegExp('^' + '/\([aeio])\\u0301|(u)[\\u0301\\u0308]' + nombre, 'i')
		filtro.nombre = new RegExp('^' + nombre, 'i')
		console.log('Valor de filtro.nombre :', filtro.nombre )
	} 
	if (venta) {
		filtro.venta = venta
	}
	if (precio) {
		let precioString = precio.toString()
		let posicionGuion = precioString.indexOf('-')
		let regexpMayorMenor = new RegExp('^\\d*-\d*')
		let regexpMayor = new RegExp('d*-\$')
		let regexpMenor = new RegExp('^\-\d*') // he puesto el circunflejo por probar pero no funciona
		let regexpDigito = new RegExp('d*$')

		
		if (regexpMayor.test(precioString)) {
			console.log('Entra en mayor: ', regexpMayor)
			let valorMayor = precioString.substring(0, posicionGuion)
			filtro.precio = { $gte: parseInt(valorMayor) }
		} else if (regexpMenor.test(precioString)) {
			console.log('Entra en mayor: ', regexpMenor)
			let valorMenor = precioString.substring(posicionGuion+1)
			filtro.precio = { $lte: parseInt(valorMenor) }
		} else if (regexpMayorMenor.test(precioString)) {
			console.log('Entra en rango: ', regexpMayorMenor)
			let valorMenor = precioString.substring(0, posicionGuion)
			let valorMayor = precioString.substring(posicionGuion+1)
			filtro.precio = { $gte: parseInt(valorMenor), $lte: parseInt(valorMayor)}
		} else if (regexpDigito.test(precioString)) {
			console.log('Concreto: ', regexpDigito)
			filtro.precio = parseInt(precio)
		}
	}
	if ( precio == 'null' || precio == '0') {
		filtro.precio = null
	}
	if (typeof tag !== 'undefined') {
		// Filtrado por varios tags en case insensitive
		//estructura expresion regular necesaria(/^a/i)
		if (Array.isArray(tag)){ 
 			tag.forEach((element, indice, arrayQuery) => {
				 element = new RegExp('^' + element, 'i')
				 arrayQuery.push(element)
			 });
			filtro.tag = { $in: tag }
		} else if (typeof tag === 'string'){
			let regExpTag = new RegExp('^' + tag, 'i')
			filtro.tag = regExpTag
		}	
	}
	if (sort) {
		try{
			if (sort.indexOf('=') !== -1 ) {
				throw ('Not valid: try ":" instead "="')
			} 
		} catch(err) {
			console.log('Entra en catch: ', err)
		}
		
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

	}
	// console.log('Llega a new error')
	// if (!(Object.keys(req.query).length === 0) && !nombre && !precio && !tag && !venta && !fields && !skip && !limit && !sort){
	// 	throw new Error ('Petición incorrecta')
	// }
	

	// buscamos anuncios en la base de datos legopop
	return Anuncio.buscar(filtro, skip, limit, sort, fields)
}

module.exports = filtros