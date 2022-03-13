document.addEventListener('DOMContentLoaded', () => {

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

        case '/':
            nextPageId = 'login-page'
            loadLoginPage()
            break

        case '/projects':
            nextPageId = 'projects-page'
            loadProjectsPage()
            break

        case '/register':
            nextPageId = 'register-page'
            loadRegisterPage()
            break

        case '/start':
            nextPageId = 'start-page'

        default:
            if (url.startsWith('/projects')){
                const [empty, projects, id] = url.split('/')
                nextPageId = ''
            } else {
                nextPageId = 'not-found-page'
            }

    }

    document.getElementById(nextPageId).classList.add('current-page')

}
