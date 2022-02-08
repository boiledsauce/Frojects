const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

//Use Redis database for sessions
const session = require('express-session')
const RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
const redisClient = createClient({ legacyMode: true, url: 'redis://redis:6379' })
redisClient.connect().catch(console.error)

//CSRF Protection
const csrf = require("csurf")

//Router imports
const projectRouter = require('./routers/project-router')
const userRouter = require('./routers/user-router')

const app = express()

//View configuration
app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'))

//Parse requests
app.use(express.urlencoded({
	extended: false
}))

//Session configuration
app.use(session({
	secret: "tdffZDd>DASD",
	store: new RedisStore({ client: redisClient }),
	saveUninitialized: false,
	resave: false,
	cookie: {
        maxAge: 1000 * 60 * 60 // milliseconds (1 hour)
    }
}))


//Public folder for static resources.
app.use(express.static(path.join(__dirname, 'public')))

app.use(csrf())

//Make CSRF token available to all views
app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken()
    next()
})

app.use('/user', userRouter)

//Authentication
app.use('/', (request, response, next) => {
	if ('userId' in request.session){
		next()
	}
	else{
		response.render('user/welcome', {layout: 'empty'})
	}
})

app.get('/', (request, response) => {
    response.render('start')
})

app.use('/project', projectRouter)

const PORT = 8080

app.listen(PORT, (error) => {
	if (error){
		console.log(error)
	}
	else{
    	console.log("It's up and running")
	}
})