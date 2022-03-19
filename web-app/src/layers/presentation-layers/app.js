const express = require('express')
const app = express()
const PORT = 8080

module.exports = ({webApp, RESTapp}) => {
    return {
        async start() {
            app.use('/api', await RESTapp.getApp())
            app.use('/', await webApp.getApp())
            app.listen(PORT)
        }
    }
}