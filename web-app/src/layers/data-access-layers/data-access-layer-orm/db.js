const mysql = require('mysql2/promise')

const { Sequelize } = require('sequelize')

const { initModels, sequelizeConstants } = require('./models/init-models')

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

	} catch (error) {
		console.error(error)
		throw ['Kunde inte skapa databasen']
	}

}

try{
	initialize()

	const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
		host: DB_HOST,
		port: DB_PORT,
		dialect: 'mysql',
		logging: false,
		query: {
			raw: true, 
		},
		dialectOptions: {
			dateStrings: true,
			typeCast: true
		}
	})

	const models = initModels(sequelize)

	module.exports = { models, sequelizeConstants, sequelize }

} catch (error) {
	console.log(error)
	throw ['Kunde inte etablera anslutning till databasen']
}
