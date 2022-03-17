document.addEventListener('DOMContentLoaded', async () => {

    const anchors = document.querySelectorAll('a')

    for (const anchor of anchors){
        anchor.addEventListener('click', (event) => {
            event.preventDefault()

            const url = anchor.getAttribute('href')

            history.pushState(null, "", url)

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

hideCurrentPage = () => {
    document.querySelector('.current-page').classList.remove('current-page')
}

showPage = (url) => {
    let nextPageId

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
                }
                
            } else {
                nextPageId = 'not-found-page'
            }

    }

    document.getElementById(nextPageId).classList.add('current-page')

}

logoutFormHandler = (event) => {
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
