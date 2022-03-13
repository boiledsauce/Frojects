
const toolbox = {

    printErrors: async (errors) => {
        if (errors instanceof Error){
            console.log(errors)
            errors = ['Ett oväntat fel inträffade']
        }
    
        const errorList = document.querySelector('.current-page .errors')
        errorList.innerHTML = ''
    
        for (const error of errors){
            const li = document.createElement('li')
            li.innerText = error
            errorList.appendChild(li)
        }
    },

    clearFormInput: async () => {
        const inputFields = document.querySelectorAll('.current-page form input')

        for (const inputField of inputFields){
            inputField.value = ''
        }

    },

    saveAccessToken: async (accessToken) => {
        sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
    },
    
    getSavedAccessToken: async () => {
        return JSON.parse(sessionStorage.getItem('accessToken'))
    },

    createUserSession: async (id_token) => {
        sessionStorage.setItem('idToken', JSON.stringify(id_token))
    },
    
    userIsLoggedIn: async () => {
        return sessionStorage.getItem('idToken') !== null
    }

}