const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

const router = async () => {
    const routes = [
        { path: '/', view: () => console.log("Viewing home") },
        { path: '/projects', view: () => console.log("Viewing projects") }
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