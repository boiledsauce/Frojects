loadProjectsPage = async () => {

    try{
        const accessToken = await api.getAccessToken('matts@svinarp.se', 'test123')

        await api.saveAccessToken(accessToken)
    
        const decodedAccessToken = await api.getSavedAccessToken()
    
        const resourceResponse = await fetch(`${API_URL}/projects/1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${decodedAccessToken}`,
                'Accept': 'application/json'
            }
        })
    
        if (resourceResponse.status == 200){
            const resource = await resourceResponse.json()
    
            console.log("Resource:", resource)
        } else {
            console.log("Felkod:", resourceResponse.status)
        }
    } catch (error) {
        console.log("Ett fel uppstod:", error)
    }

}
