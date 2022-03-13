loadRegisterPage = async () => {

    try{
        toolbox.setTitle('Skapa konto')

        const form = document.getElementById('register-form')
        
        form.addEventListener('submit', registerFormHandler)
        
    } catch (error) {
        console.log(error)
    }

}

registerFormHandler = async (event) => {
    event.preventDefault()

    const formData = Object.fromEntries(new FormData(document.getElementById('register-form')).entries())

    const {firstName, lastName, email, password, confirmPassword} = formData

    try{
        const createUserResponse = await api.makeCall({
            uri: '/users/create', 
            method: 'POST',
            bodyParams: {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            },
            includeAuthHeader: false
        })

        if (createUserResponse.status == 201){
            toolbox.clearFormInput()

            //Sign in user
            const tokenResponse = await api.makeCall({
                uri: '/tokens',
                method: 'POST',
                bodyParams: {
                    grant_type: 'password',
                    username: email,
                    password
                },
                includeAuthHeader: false
            })

            if (tokenResponse.status == 200){
                const tokens = await tokenResponse.json()

                await toolbox.saveAccessToken(tokens.access_token)

                const user = await toolbox.parseJwt(tokens.id_token)

                await toolbox.createUserSession(user)

                toolbox.toggleProjectsMenuLink()

                toolbox.setSidebarName(user.firstName, user.lastName)

                const userSession = await toolbox.getUserSession()

                console.log("User session:", userSession)

                hideCurrentPage()
                showPage('/')
            } else{
                console.log('Kunde inte hämta tokens')
            }



        } else{
            const data = await createUserResponse.json()

            throw data.errors
        }

    } catch (errors) {
        toolbox.printErrors(errors)
    }
}