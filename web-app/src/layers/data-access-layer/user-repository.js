const database = require('./db')

exports.createUser = (user) => {

    const query = 'INSERT INTO User (FirstName, LastName, Email, HashedPassword) VALUES (?, ?, ?, ?)'
    const values = [user.firstName, user.lastName, user.email, user.password]

    return new Promise((resolve, reject) => {
        database.query(query, values, (error, result) => {
            if (error)
                reject(error)
            else
                resolve(result.insertId)
        })
    })

}