const jwt = require('jsonwebtoken')

const router = require("express").Router({mergeParams: true})

const ISSUING_AUTHORITY = 'https://localhost:3000.com'

const ACCESS_TOKEN_SECRET = 'd52b08e837b9ec2f937b734c5563daefc7a83b28fdf1864ea7f0e1c7f2c3eb6eb216fed8f06ee8fcc96f7224f1c98a61f9ebf27bc67cc09cd4452d60583e9a9f'

const authenticateAccessToken = (request, response, next) => {
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

const getIdToken = (user) => {
	const idTokenPayload = user

    delete idTokenPayload.hashedPassword
    delete idTokenPayload.openId

	idTokenPayload.iss = ISSUING_AUTHORITY
	idTokenPayload.aud = user.id

    return jwt.sign(idTokenPayload, ACCESS_TOKEN_SECRET, {expiresIn: '1 hour'})
}

module.exports = ({projectRESTRouter, userManager}) => {

    router.post('/users/create', async (request, response) => {
    
        const user = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        }
    
        try{
            user.id = await userManager.createUser(user)

            response.status(201).json()
    
        } catch (errors) {
            response.status(400).json({ errors })
        }
    
    })

    router.post('/tokens', async (request, response) => {

        const grant_type = request.body.grant_type

        if (grant_type != 'password'){
            return response.status(400).json({error: 'unsupported_grant_type'})
        }
    
        const loginCredentials = {
            email: request.body.username,
            password: request.body.password
        }

        let user

        try{
            user = await userManager.getUserByEmail(loginCredentials.email)
        } catch (errors) {
            return response.status(401).json({error: 'invalid_client'})
        }
            
        if (await userManager.loginCredentialsMatchUser(loginCredentials, user)) {

            const accessTokenPayload = {
                userId: user.id
            }

            const accessToken = jwt.sign(accessTokenPayload, ACCESS_TOKEN_SECRET)

            return response.json({
                access_token: accessToken,
                id_token: getIdToken(user)
            })	

        } else {
            return response.status(401).json({error: 'invalid_client'})
        }
    })

    router.use('/', authenticateAccessToken)
    
    router.use('/projects', projectRESTRouter)
    
    return router

}
