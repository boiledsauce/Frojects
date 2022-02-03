const database = require('./db')

exports.createUser = (user) => {

    const query = 'INSERT INTO User (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)'
    const values = [user.firstName, user.lastName, user.email, user.password]

    database.query(query, values, (error, result) => {
        if (error) return Promise.reject(error)
        return Promise.resolve(result.insertId)
    })

}