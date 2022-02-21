const mysql = require('mysql')
const { initModels } = require('./models/init-models')

const DB_HOST = 'database'
const DB_PORT = 3306
const DB_USER = 'root'
const DB_PASSWORD = 'abc123'
const DB_NAME = 'frojects'

const { Sequelize } = require('sequelize')

const connection = mysql.createConnection({
	host     : DB_HOST,
	port	 : DB_PORT,
	user     : DB_USER,
	password : DB_PASSWORD,
	database : DB_NAME
})

initialize = () => {
	try{
		connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
	} catch (error) {
		console.log(error)
	}

}

initialize()

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'mysql',
	query: {raw: true}
})

const models = initModels(sequelize)

module.exports = { models }
