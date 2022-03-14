loadProjectsPage = async () => {

    try{
        toolbox.setTitle('Projekt')

        if ((await toolbox.userIsLoggedIn())){
            
            const user = await toolbox.getUserSession()

            const response = api.makeCall({
                uri: '/projects',
                method: 'GET'
            })

            if (response.status = 200){
                const data = await response.json()

                console.log("Projekt:", data)

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
