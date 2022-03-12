loadRegisterPage = async () => {

    try{
        const form = document.getElementById('register-form')
        
        form.addEventListener('submit', registerFormHandler)
        
    } catch (error) {
        console.log(error)
    }

}

registerFormHandler = async (event) => {
    event.preventDefault()

    const formData = Object.fromEntries(new FormData(document.getElementById('register-form')).entries())

    console.log(formData)

    const {firstName, lastName, email, password, confirmPassword} = formData

    try{
        const response = await api.makeCall({
            uri: '/users/create', 
            method: 'POST',
            bodyParams: {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }
        })

        const data = await response.json()

        if (response.status == 400 ){
            throw data.errors
        } else if (response.status == 200){
            console.log("API-call actually succeeded")
        } else {
            console.log("Fel i api-called", data)
        }

    } catch (errors) {
        const errorList = document.getElementById('register-errors')

        for (const error of errors){
            const li = document.createElement('li')
            li.innerText = error
            errorList.appendChild(li)
        }
    }
}