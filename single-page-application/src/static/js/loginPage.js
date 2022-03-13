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
}