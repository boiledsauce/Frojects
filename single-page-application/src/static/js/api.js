const GRANT_TYPE = 'password'
const API_URL = 'http://localhost:3000/api'


const api = {
    
    getAccessToken: async (email, password) => {

        const response = await fetch(`${API_URL}/tokens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: `grant_type=${GRANT_TYPE}&username=${email}&password=${password}`
        })
    
        if (response.status == 200){
            const data = await response.json()
    
            return data.access_token
        } else {
            throw (await response.json()).error
        }
    },
    
    saveAccessToken: async (accessToken) => {
        sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
    },
    
    getSavedAccessToken: async () => {
        return JSON.parse(sessionStorage['accessToken'])
    }
}