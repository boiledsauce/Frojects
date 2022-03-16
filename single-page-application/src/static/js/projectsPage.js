loadProjectsPage = async () => {

    try{
        toolbox.setTitle('Projekt')

        if ((await toolbox.userIsLoggedIn())){

            const response = await api.makeCall({
                uri: '/projects',
                method: 'GET'
            })

            if (response.status = 200){
                const data = await response.json()

                const list = document.getElementById('your-projects')

                for (const project of data.projects){
                    const listItem = document.createElement('a')
                    listItem.classList.add('list-group-item', 'list-group-item-action')
                    listItem.setAttribute('href', `/projects/${project.id}`)
                    listItem.innerText = project.name
                    list.appendChild(listItem)
                }

            } else {
                console.log('Kunde ej hämta projekt')
            }

        } else {
            alert('Du måste logga in för att få tillgång till dina projekt')
        }

    } catch (error) {
        console.log("Ett fel uppstod:", error)
    }

}
