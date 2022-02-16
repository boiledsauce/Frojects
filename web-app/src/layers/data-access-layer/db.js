const mysql = require('mysql')
const { initModels } = require('./models/init-models');

const { Sequelize /*, Model, DataTypes*/ } = require('sequelize');

const connection = mysql.createConnection({
	host     : 'database',
	port	 : 3306,
	user     : 'root',
	password : 'abc123',
	database : 'frojects'
})

initialize = async () => {
	try{
		connection.query('CREATE DATABASE IF NOT EXISTS `frojects`;')
	} catch (error) {
		throw ['Databasen kunde inte skapas']
	}

}

initialize()

const sequelize = new Sequelize('frojects', 'root', 'abc123', {
	host: 'database',
	port: 3306,
	dialect: 'mysql',
	query: {raw: true}
})

const models = initModels(sequelize)

module.exports = { models }
