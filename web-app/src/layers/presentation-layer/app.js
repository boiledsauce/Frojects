const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

const projectRouter = require('./routers/project-router')
const userRouter = require('./routers/user-router')

const app = express()

//View configuration
app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs'
}))

app.use(express.urlencoded({
	extended: false
}))

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'))

//Public folder for static resources.
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('start')
})

app.use('/project', projectRouter)
app.use('/user', userRouter)

app.listen(8080, () => {
    console.log("It's up and running")
})