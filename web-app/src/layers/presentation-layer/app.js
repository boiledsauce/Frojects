const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
const redisClient = createClient({ legacyMode: true,  url: 'redis://host.docker.internal:6379' })
redisClient.connect().catch(console.error)


const projectRouter = require('./routers/project-router')
const userRouter = require('./routers/user-router')

const app = express()

//View configuration
app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs'
}))

app.use(session({
	secret: "tdffZDd>DASD",
	store: new RedisStore({ client: redisClient }),
	saveUninitialized: false,
	resave: false,
}))

app.use(function (request, response, next) {
	response.locals.session = request.session
	next()
})

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