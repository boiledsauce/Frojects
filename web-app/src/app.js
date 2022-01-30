const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const app = express()
const router = express.Router()
const projectRouter = require('./Layers/Presentation-Layer/project-router')


app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "Layers/Presentation-Layer/views"))

app.use('/project', projectRouter)

app.get('/', (req, res) => {
    res.render('start.hbs')
})


app.listen(8080, () => {
    console.log("It's up and running")
})