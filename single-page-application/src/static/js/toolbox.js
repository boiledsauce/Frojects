
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

    hideMenuLink: async (menuLinkId) => {
        const link = document.getElementById(menuLinkId)

        link.classList.add('hidden')
    },

    showMenuLink: async (menuLinkId) => {
        const link = document.getElementById(menuLinkId)

        link.classList.remove('hidden')
    },

    setSidebarName: async (firstName = '', lastName = '') => {
        const nameTag = document.getElementById('users-name')

        nameTag.innerText = `${firstName} ${lastName}`
    },

    saveAccessToken: async (accessToken) => {
        sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
    },
    
    getSavedAccessToken: async () => {
        return JSON.parse(sessionStorage.getItem('accessToken'))
    },

    createUserSession: async (id_token) => {
        sessionStorage.setItem('user', JSON.stringify(id_token))
    },

    getUserSession: async () => {
        return JSON.parse(sessionStorage.getItem('user'))
    },
    
    userIsLoggedIn: async () => {
        return sessionStorage.getItem('user') !== null
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
    }

}