const express = require('express')
const cors = require('cors')

const REQUIRED_CONTENT_TYPE = 'application/x-www-form-urlencoded'

module.exports = ({mainRESTRouter}) => {

	return {

		async getApp(){

			const app = express()	

			//Parse requests
			app.use(express.json())
			app.use(express.urlencoded({ extended: false }))


			//Allow Cross-Origin Resource Sharing
			app.use(cors())

			//Validate Content Type
			app.use((request, response, next) => {
				const contentType = request.header('Content-Type')

				if (contentType != REQUIRED_CONTENT_TYPE){
					return response.status(400).json({error: 'invalid_request'})
				} else {
					next()
				}

			})

			app.use('/', mainRESTRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				return response.status(404).json()
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				return response.status(500).json()
			})
			
			return app
		}
	}
}