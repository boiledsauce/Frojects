const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'abc123',
	database : 'frojects'
})

module.exports = connection