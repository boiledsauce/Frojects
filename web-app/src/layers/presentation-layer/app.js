const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

const app = express()
const projectRouter = require('./routers/project-router')

//View configuration
app.engine("hbs", expressHandlebars.engine({
    extname: "hbs"
}))

app.use(express.urlencoded({
	extended: false
}))

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, "views"))

//Public folder for static resources.
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('start')
})

app.use('/project', projectRouter)

app.listen(8080, () => {
    console.log("It's up and running")
})