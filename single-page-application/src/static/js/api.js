const GRANT_TYPE = 'password'
const API_URL = 'http://localhost:3000/api'

const DEFAULT_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}

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

    /**
     * 
     * @param {string} uri The endpoint uri
     * @param {string} method The HTTP method
     * @param {object} bodyParams Optional object containing key-value pairs
     * @param {Boolean} includeAuthHeader Indicate whether access token should be used 
     * @returns {response} A response promise
     */
    makeCall: async ({uri, method, bodyParams = undefined, includeAuthHeader = true}) => {

        if (!(await userIsLoggedIn()) && includeAuthHeader){
            throw ['Du måste logga in för att få tillgång till resurserna på API:n']
        }

        const headers = DEFAULT_HEADERS
        if (includeAuthHeader){
            headers['Authorization'] = `Bearer ${await getSavedAccessToken()}`
        }

        const requestOptions = {
            method,
            headers
        }

        let body = ''

        if (bodyParams != undefined){

            for (const [key, value] of Object.entries(bodyParams)){
                body += `${key}=${value}&`
            }

            body = body.slice(0, -1)

            requestOptions.body = body
        }

        console.log("REquestOptions:", requestOptions)

        return await fetch(`${API_URL}${uri}`, requestOptions)
    }

}