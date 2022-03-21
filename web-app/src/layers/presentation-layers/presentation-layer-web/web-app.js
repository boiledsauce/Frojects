module.exports = ({mainRouter}) => {

	return {

		async getApp(){

			const express = require('express')
			const expressHandlebars = require('express-handlebars')
			const path = require('path')
			const flash = require('express-flash')
			const csrf = require("csurf")
			const breadcrumb = require('express-url-breadcrumb')
			const session = require('express-session')
			const RedisStore = require("connect-redis")(session)
			const { createClient } = require("redis")

			const redisClient = createClient({ legacyMode: true, url: 'redis://redis:6379' })
			redisClient.connect().catch(console.error)

			const app = express()


			//View configuration
			app.engine('hbs', expressHandlebars.engine({
				extname: 'hbs'
			}))

			app.set('view engine', 'hbs')

			app.set('views', path.join(__dirname, 'views'))

			app.use(express.urlencoded({
				extended: false
			}))

			app.use(session({
				secret: "tdffZDd>DASD",
				store: new RedisStore({ client: redisClient }),
				saveUninitialized: false,
				resave: false,
				cookie: {
					maxAge: 1000 * 60 * 60 // (1 hour)
				}
			}))

			//Middleware for passing message with redirect
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

			//CSRF Protection
			app.use(csrf())

			//Make CSRF token available to all views
			app.use((request, response, next) => {
				response.locals.csrfToken = request.csrfToken()
				next()
			})

			//Generate and translate breadcrumbs
			app.use(breadcrumb(async (item, index) => {

				switch(item.label){

					case 'app':
						item.label = 'App'
						break
						
					case 'create':
						item.label = 'Skapa'
						break

					case 'update':
						item.label = 'Uppdatera'
						break

					case 'projects':
						item.label = 'Projekt'
						break

					case 'usersWithAccess':
						item.label = 'Användare med tillgång'
						break

					case 'share':
						item.label = 'Dela'
						break

					case 'tasks':
						item.label = 'Uppgifter'
						break

					case 'create comment':
						item.label = 'Skapa kommentar'
						break

					case 'removeUser':
						item.label = 'Ta bort användare'
						break

					case 'delete':
						item.label = 'Ta bort'
						break

					default:
						break
						
				}

			}))

			app.use('/', mainRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				response.status(404).render("errors/404", {layout: 'empty'})
			})

			//CSRF error handler
			app.use(function (error, request, response, next) {
				if (error.code !== "EBADCSRFTOKEN"){
					return next(error)
				}
				const model = {
					layout: 'empty', 
					message: 'Formulärdatans usprung kunde inte verifieras'
				}

				response.status(403).render('errors/403', model)
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				response.status(500).render("errors/500", {layout: 'empty'})
			})

			return app

		}

	}

}