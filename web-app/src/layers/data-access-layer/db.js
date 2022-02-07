const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database',
	port	 : 3306,
	user     : 'root',
	password : 'abc123',
	database : 'frojects'
})

module.exports = connection