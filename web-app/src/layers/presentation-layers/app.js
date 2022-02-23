const express = require('express')
const app = express()

module.exports = ({webApp, RESTapp}) => {
    return {
        async start() {
            app.use('/api', await RESTapp.getApp())
            app.use('/', await webApp.getApp())
            .listen(8080)
        }
    }
}