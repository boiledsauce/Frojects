loadProjectsPage = async () => {

    try{
        toolbox.setTitle('Projekt')

        if (!(await toolbox.userIsLoggedIn())){
            
        }

    } catch (error) {
        console.log("Ett fel uppstod:", error)
    }

}
