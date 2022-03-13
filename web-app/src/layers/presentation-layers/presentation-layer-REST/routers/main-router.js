const router = require("express").Router({mergeParams: true})

const ISSUING_AUTHORITY = 'https://localhost:3000.com'

getIdToken = (user) => {
	delete user.hashedPassword
	delete user.openId
	//Populate id_token
	const idTokenPayload = user
	idTokenPayload.iss = ISSUING_AUTHORITY
	idTokenPayload.aud = user.id

	return jwt.sign(idTokenPayload, ACCESS_TOKEN_SECRET, {expiresIn: '1 hour'})
}

module.exports = ({projectRESTRouter, userRESTRouter, userManager}) => {


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
            console.log(errors)
            return response.status(401).json({error: 'invalid_client'})
        }
            
        if (await userManager.loginCredentialsMatchUser(loginCredentials, user)) {

            const accessTokenPayload = {
                userId: user.id
            }

            const accessToken = jwt.sign(accessTokenPayload, ACCESS_TOKEN_SECRET, {expiresIn: '1 hour'})

            return response.json({ 
                access_token: accessToken,
                id_token: getIdToken(user)
            })	

        } else {
            return response.status(401).json({error: 'invalid_client'})
        }
    })

    router.use('/', authenticateAccessToken)
    
    router.use('/users', userRESTRouter)
    router.use('/projects', projectRESTRouter)
    
    return router

}
