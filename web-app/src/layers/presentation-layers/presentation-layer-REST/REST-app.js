const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const ACCESS_TOKEN_SECRET = 'd52b08e837b9ec2f937b734c5563daefc7a83b28fdf1864ea7f0e1c7f2c3eb6eb216fed8f06ee8fcc96f7224f1c98a61f9ebf27bc67cc09cd4452d60583e9a9f'

authenticateAccessToken = (request, response, next) => {
	const authorizationHeader = request.header('Authorization')

	if (authorizationHeader == undefined){
		response.status(400).end()

	} else{
		const accessToken = authorizationHeader.substring("Bearer ".length)

		jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
			if (error) response.status(401).end()
	
			request.user = payload
			next()
		})
	}
}

module.exports = function createApp({mainRESTRouter, userManager}){

	return {

		async getApp(){

			const app = express()	

			//Parse requests
			app.use(express.json())
			app.use(express.urlencoded({ extended: false }))


			//Allow Cross-Origin Resource Sharing
			app.use(cors())
			
			app.post('/tokens', async (request, response) => {

				const grant_type = request.body.grant_type

				if (grant_type != 'password'){
					response.status(400).end()
				}
			
				const loginCredentials = {
					email: request.body.username,
					password: request.body.password
				}
				try{
					const user = await userManager.getUserByEmail(loginCredentials.email)
					
					if (await userManager.loginCredentialsMatchUser(loginCredentials, user)) {

						const payload = {
							userId: user.id
						}

						const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: 3600 }) //milliseconds
						response.json({ accessToken })				
					}
					else {
						response.status(500).end()
					}
				}
				catch (errors) {
					console.log(errors)
					response.status(500).end()
				}
			})

			app.use('/', authenticateAccessToken, mainRESTRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				response.status(404).end()
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				response.status(500).end()
			})
			
			return app
		}
	}
}