module.exports = function createApp({mainRouter, mainRESTRouter}){

	return {

		async getApp(){

			const express = require('express')
			const path = require('path')
			const app = express()		

			//Parse requests
			app.use(express.urlencoded({
				extended: false
			}))

			//Public folder for static resources.
			app.use(express.static(path.join(__dirname, 'public')))

			app.use('/', mainRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				response.status(200).send("ok").json()
				//response.status(404).render("errors/404")
			})

			//CSRF error handler
			app.use(function (error, request, response, next) {
				if (error.code !== "EBADCSRFTOKEN"){
					return next(error)
				}
			
				response.status(403).send("ok").json()
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				response.status(500).send("ok").json()
			})
			
			/*
			const port = 8080

			app.listen(port, (error) => {
				if (error){
					console.log(error)
				}
				else{
					console.log("It's up and running")
				}
			})
			*/
			return app
		}
	}
}