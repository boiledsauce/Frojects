const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const ACCESS_TOKEN_SECRET = 'd52b08e837b9ec2f937b734c5563daefc7a83b28fdf1864ea7f0e1c7f2c3eb6eb216fed8f06ee8fcc96f7224f1c98a61f9ebf27bc67cc09cd4452d60583e9a9f'

authenticateAccessToken = (request, response, next) => {
	const authorizationHeader = request.header('Authorization')

	if (authorizationHeader == undefined){
		return response.status(400).end()

	} else{
		const accessToken = authorizationHeader.substring('Bearer '.length)

		jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
			if (error) return response.status(401).end()
	
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
					return response.status(400).end()
				}
			
				const loginCredentials = {
					email: request.body.username,
					password: request.body.password
				}

				let user

				try{
					user = await userManager.getUserByEmail(loginCredentials.email)
				} catch (errors) {
					return response.status(401).json('Ingen användare med eposten hittades')
				}
					
				if (await userManager.loginCredentialsMatchUser(loginCredentials, user)) {

					const payload = {
						userId: user.id
					}

					const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: 3600 }) //1 hour

					return response.json({ accessToken })	

				} else {
					return response.status(401).json('Felaktiga inloggningsuppgifter')
				}
			})

			app.use('/', authenticateAccessToken, mainRESTRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				return response.status(404).end()
			})

			/*
			500 Internal server error handler.
			Catches all uncaught synchronous exceptions
			*/
			app.use((error, request, response, next) => {
				console.log(error)
				return response.status(500).end()
			})
			
			return app
		}
	}
}