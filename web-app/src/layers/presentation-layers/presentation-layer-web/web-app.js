module.exports = ({mainRouter, projectManager, taskManager}) => {

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

			//Trust proxy since production environment is probably using Apache or similiar
			app.enable('trust proxy');

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

			//CSRF Protection
			app.use(csrf())

			let requestObject

			//Make variables available to all views
			app.use((request, response, next) => {
				response.locals.message = request.flash("message")
				response.locals.session = request.session
				response.locals.csrfToken = request.csrfToken()

				requestObject = request

				next()
			})

			//Generate and translate breadcrumbs
			app.use(breadcrumb(async (item, index) => {

				const pageTitles = require('./page-titles')

				item.label = pageTitles[item.label] ? pageTitles[item.label] : item.label

				//Translate projectId, taskId to corresponding resources actual name/title

				const lastTwoUrlSegments = item.url.split('/').slice(-2)

				if (lastTwoUrlSegments.length == 2){
					const resources = lastTwoUrlSegments[0]
					const resourceId = lastTwoUrlSegments[1]
					
					if (!isNaN(resourceId)){
						if (resources == 'projects'){
							const project = await projectManager.getProjectById(resourceId)
							item.label = project.name
	
						} else if (resources == 'tasks'){
							const task = await taskManager.getTaskById(resourceId)
							item.label = task.title
						}
					}
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