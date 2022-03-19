
const USER_SESSION_KEY = 'user'

const ACCESS_TOKEN_KEY = 'accessToken'

const toolbox = {

    clearErrors: async () => {
        const errorList = document.querySelector('.current-page .errors')
        errorList.innerHTML = ''
    },

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

    hideMenuLink: async (menuLinkId) => {
        const link = document.getElementById(menuLinkId)

        link.classList.add('hidden')
    },

    showMenuLink: async (menuLinkId) => {
        const link = document.getElementById(menuLinkId)

        link.classList.remove('hidden')
    },

    showLoadingIndicator: async () => {
        document.getElementById('loading-indicator').classList.remove('hidden')
    },

    hideLoadingIndicator: async () => {
        document.getElementById('loading-indicator').classList.add('hidden')
    },

    setSidebarName: async (firstName = '', lastName = '') => {
        const nameTag = document.getElementById('users-name')

        nameTag.innerText = `${firstName} ${lastName}`

        const userProfile = document.getElementById('user-profile')

        if (firstName == '' && lastName == ''){
            userProfile.classList.add('hidden')
        } else {
            userProfile.classList.remove('hidden')
        }
    },

    saveAccessToken: async (accessToken) => {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken))
    },
    
    getSavedAccessToken: async () => {
        return JSON.parse(sessionStorage.getItem(ACCESS_TOKEN_KEY))
    },

    createUserSession: async (id_token) => {
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(id_token))
    },

    getUserSession: async () => {
        return JSON.parse(sessionStorage.getItem(USER_SESSION_KEY))
    },

    destroyUserSession: async () => {
        sessionStorage.removeItem(USER_SESSION_KEY)
    },
    
    userIsLoggedIn: async () => {
        return sessionStorage.getItem(USER_SESSION_KEY) !== null
    },

    parseJwt: async (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (error) {
            console.log('En base64-sträng kunde inte tolkas')
        }
    },

    setTitle: async (title) => {
        document.title = `${title} - Frojects Single Page Application`
    },

    flashMessage: async (message) => {
        const flashMessage = document.getElementById('flash-message')
        
        const messageText = flashMessage.querySelector('p')
        messageText.innerText = message

        flashMessage.classList.remove('invisible')

        setTimeout(() => {
            flashMessage.classList.add('invisible')
        }, 5000)


    },

    redirect: async (url) => {
        history.pushState(null, "", url)

        hideCurrentPage()
        showPage(url)
    },

    deactiveSubmitButton: async () => {
        const submitButton = document.querySelector('.current-page form button')
        submitButton.disabled = true
        console.log("Submit button deactivated")
    },

    activateSubmitButton: async () => {
        const submitButton = document.querySelector('.current-page form button')
        submitButton.disabled = false
        console.log("Submit button activated")
    }

}