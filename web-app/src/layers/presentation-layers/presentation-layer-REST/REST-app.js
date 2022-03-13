const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const ACCESS_TOKEN_SECRET = 'd52b08e837b9ec2f937b734c5563daefc7a83b28fdf1864ea7f0e1c7f2c3eb6eb216fed8f06ee8fcc96f7224f1c98a61f9ebf27bc67cc09cd4452d60583e9a9f'

const REQUIRED_CONTENT_TYPE = 'application/x-www-form-urlencoded'

authenticateAccessToken = (request, response, next) => {
	const authorizationHeader = request.header('Authorization')

	if (authorizationHeader == undefined){
		return response.status(400).json({error: 'invalid_request'})

	} else{
		const accessToken = authorizationHeader.substring('Bearer '.length)

		jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
			if (error){
				return response.status(401).json({error: 'invalid_token'})
			}
	
			request.user = payload
			next()
		})
	}
}

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