document.addEventListener('DOMContentLoaded', async () => {

    const anchors = document.querySelectorAll('a')

    for (const anchor of anchors){
        anchor.addEventListener('click', (event) => {
            event.preventDefault()

            const url = anchor.getAttribute('href')

            hideCurrentPage()
            showPage(url)
        })
    }

    showPage(location.pathname)

    if (await toolbox.userIsLoggedIn()){
        toolbox.hideMenuLink('register-menu-link')
        toolbox.hideMenuLink('login-menu-link')

        const user = await toolbox.getUserSession()
        toolbox.setSidebarName(user.firstName, user.lastName)
    } else {

        toolbox.hideMenuLink('projects-menu-link')
        toolbox.setSidebarName('', '')
    }

    document.getElementById('logout-form').addEventListener('submit', logoutFormHandler)

})

window.addEventListener('popstate', () => {
    hideCurrentPage()
    showPage(location.pathname)
})

const hideCurrentPage = () => {
    document.querySelector('.current-page').classList.remove('current-page')
}

const showPage = (url) => {
    let nextPageId

    history.pushState(null, "", url)

    switch (url){

        case '#':
            nextPageId = 'start-page'
            toolbox.setTitle('Start')
            break

        case '/':
            nextPageId = 'start-page'
            toolbox.setTitle('Start')
            break

        case '/projects':
            nextPageId = 'projects-page'
            loadProjectsPage()
            break

        case '/projects/create':
            nextPageId = 'create-project-page'
            loadCreateProjectPage()
            break

        case '/register':
            nextPageId = 'register-page'
            loadRegisterPage()
            break

        case '/login':
            nextPageId = 'login-page'
            loadLoginPage()
            break

        default:
            if (url.startsWith('/projects')){
                const [empty, projects, id, action] = url.split('/')

                if (action == undefined){
                    nextPageId = 'project-page'
                    loadProjectPage(id)

                } else if (action == 'update'){
                    nextPageId = 'update-project-page'
                    loadUpdateProjectPage(id)

                } else if (action == 'delete'){
                    nextPageId = 'delete-project-page'
                    loadDeleteProjectPage(id)
                }
                
            } else {
                nextPageId = 'not-found-page'
            }

    }

    document.getElementById(nextPageId).classList.add('current-page')

}

const logoutFormHandler = (event) => {
    event.preventDefault()

    const logoutInputField = event.target.querySelector('#logout')

    if (logoutInputField.value == 'logout'){
        toolbox.destroyUserSession()

        toolbox.hideMenuLink('projects-menu-link')
        toolbox.showMenuLink('register-menu-link')
        toolbox.showMenuLink('login-menu-link')

        toolbox.setSidebarName('', '')

        toolbox.flashMessage('Du har loggats ut')
        
        hideCurrentPage()
        showPage('/login')
    }

}
