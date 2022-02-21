const express = require('express')
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = 'd52b08e837b9ec2f937b734c5563daefc7a83b28fdf1864ea7f0e1c7f2c3eb6eb216fed8f06ee8fcc96f7224f1c98a61f9ebf27bc67cc09cd4452d60583e9a9f'

const user = {
	username: "Test Testsson",
	password: "abc123"
}

function authenticateAccessToken(request, response, next) {
	const authHeader = request.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return response.sendStatus(401)

	jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) response.sendStatus(403)

		request.user = user
		next()
	})
}

module.exports = function createApp({mainRESTRouter}){

	return {

		async getApp(){

			const app = express()	

			//Parse requests
			app.use(express.json())

			app.use('/login', (request, response) => {

				//TODO Authenticate user

				const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 }) //1 hour
				response.json({ accessToken })
			})

			app.use('/', authenticateAccessToken, mainRESTRouter)

			//404 Page not found error handler
			app.use((request, response) => {
				response.status(404).json("Sidan hittades inte")
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
				response.status(500).json("Internal server error")
			})
			
			return app
		}
	}
}