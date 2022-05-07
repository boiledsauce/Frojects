const mysql = require('mysql2/promise')

const DB_HOST = 'database'
const DB_PORT = 3306
const DB_USER = 'frojects-user'
const DB_PASSWORD = 'iWHnm16lURvL6iHfyvcK'
const DB_NAME = 'frojects'

const initialize = async () => {
	try{
		const connection = await mysql.createConnection({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			port: DB_PORT
		})
		connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)

		return connection

	} catch (error) {
		console.error(error)
		throw ['Kunde inte skapa databasen']
	}

}

try{
	const db = initialize()

	module.exports = { db }

} catch (error) {
	console.log(error)
	throw ['Kunde inte etablera anslutning till databasen']
}
