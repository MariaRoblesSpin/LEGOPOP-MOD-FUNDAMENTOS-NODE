'use strict'

const readline = require('readline')

const db = require('../lib/connectMongoose')
const Anuncio = require('../models/Anuncio')
const anunciosData = require('../data/anuncios')

db.once('open', async ()=> {
	try{
		// preguntar por consola si quiere borrar la base de datos
		const answer = await askUser('¿Seguro que quieres borrar TODA la base de datos? (NO)')
		if (answer.toLowerCase() === 'sí' || answer.toLowerCase() === 'si') {
			await initDB()
			db.close()
			return
		} 
		console.log('Abortando operación')
		// se cancela el proceso porque la respuesta es negativa
		process.exit(0)

	} catch(err){
		console.log('Ocurrió el siguiente error', err)
		process.exit(1)
	}
})
function askUser(question){
	return new Promise((resolve, reject) => {
		// crear la interfaz para poder hacer la pregunta en consola y recibir la respuesta
		const consoleInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})
		consoleInterface.question(question, answer => {
			consoleInterface.close()
			resolve(answer)
			return
		})
})
}

async function initDB(){
	let anunciostoString = JSON.stringify(anunciosData)
	let anunciosLowerCase = anunciostoString.toLowerCase()
	let anunciosJSON = JSON.parse(anunciosLowerCase)
	console.log('Procedemos al borrado de la base de datos')
	// primero borrar todos los anuncios que existan
	const deleted = await Anuncio.deleteMany()
	console.log(`Eliminados ${deleted.n} anuncios`)
	// después cargar los anuncios que están en el json
	const inserted = await Anuncio.insertMany(anunciosJSON)
	console.log(`Insertados ${inserted.length} anuncios`)
}