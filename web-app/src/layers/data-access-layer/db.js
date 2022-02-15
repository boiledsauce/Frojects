const mysql = require('mysql')
const setUpSequelize = require('./models/init-models');

const { Sequelize /*, Model, DataTypes*/ } = require('sequelize');

const connection = mysql.createConnection({
	host     : 'database',
	port	 : 3306,
	user     : 'root',
	password : 'abc123',
	database : 'frojects'
})


const sequelize = new Sequelize('frojects', 'root', 'abc123', {
	host: 'database',
	port: 3306,
	dialect: 'mysql'
});

const models = setUpSequelize.initModels(sequelize)

module.exports = {database: connection, models}
	//sequelize
