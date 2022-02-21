module.exports = function createApp({mainRouter, mainRESTRouter}){

	return {

		async start(){

			const express = require('express')
			const expressHandlebars = require('express-handlebars')
			const path = require('path')

			//Use Redis database for sessions
			const session = require('express-session')
			const RedisStore = require("connect-redis")(session)
			const { createClient } = require("redis")
			const redisClient = createClient({ legacyMode: true, url: 'redis://redis:6379' })
			redisClient.connect().catch(console.error)

			//Middleware for passing message with redirect
			const flash = require('express-flash')

			//CSRF Protection
			const csrf = require("csurf")

			const app = express()

			//View configuration
			app.engine('hbs', expressHandlebars.engine({
				extname: 'hbs'
			}))

			app.set('view engine', 'hbs')

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
					maxAge: 1000 * 60 * 60 // (1 hour)
				}
			}))

			app.use(flash())

			//Public folder for static resources.
			app.use(express.static(path.join(__dirname, 'public')))

			//Make express-connect flash message available to all views
			app.use((request, response, next) => {
				response.locals.message = request.flash("message")
				next()
			})

			//Make the session object available to all views
			app.use((request, response, next) => {
				response.locals.session = request.session
				next()
			})

			app.use(csrf())

			//Make CSRF token available to all views
			app.use((request, response, next) => {
				response.locals.csrfToken = request.csrfToken()
				next()
			})

			app.use('/api', mainRESTRouter)
			app.use('/', mainRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				response.status(404).render("errors/404")
			})

			//CSRF error handler
			app.use(function (error, request, response, next) {
				if (error.code !== "EBADCSRFTOKEN"){
					return next(error)
				}
			
				response.status(403).render("errors/403")
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				response.status(500).render("errors/500")
			})

			const port = 8080

			app.listen(port, (error) => {
				if (error){
					console.log(error)
				}
				else{
					console.log("It's up and running")
				}
			})
		}
	}
}