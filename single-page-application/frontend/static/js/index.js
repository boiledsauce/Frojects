import Home from './views/home.js'
import Projects from './views/projects.js'

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

const router = async () => {
    
    const routes = [
        { path: '/', view: Home },
        { path: '/projects', view: Projects }
    ]

    const potentialMatches = routes.map(route => {
        return {
            route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view()

    document.querySelector('#app').innerHTML = await view.getHtml()
    console.log(match.route.view())
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', event => {
        if (event.target.matches('[data-link]')){
            event.preventDefault()
            navigateTo(event.target.href)
        }
    })

    router()
})