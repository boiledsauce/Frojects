loadLoginPage = async () => {
    try{
        toolbox.setTitle('Logga in')

        const form = document.getElementById('login-form')
        
        form.addEventListener('submit', loginFormHandler)
        
    } catch (error) {
        console.log(error)
    }

}

loginFormHandler = async (event) => {
    event.preventDefault()

    const formData = Object.fromEntries(new FormData(document.getElementById('login-form')).entries())

    const {email, password} = formData

    try{
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

            toolbox.showMenuLink('projects-menu-link')

            toolbox.hideMenuLink('login-menu-link')
            toolbox.hideMenuLink('register-menu-link')

            toolbox.setSidebarName(user.firstName, user.lastName)

            toolbox.flashMessage('Du har loggat in. Välkommen!')

            hideCurrentPage()
            showPage('/')
        } else{
            console.log('Kunde inte hämta tokens')
        }

    } catch (errors) {

    }
}