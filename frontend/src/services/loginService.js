import { API_BASE_URL } from '../configs/configs'


const auth = {}

auth.login = async function (credential) {
    const res = await fetch(`${API_BASE_URL}/Auth/Login`, {
        method: 'post',
        body: JSON.stringify(credential),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json()
        .then(responseJson => Promise.resolve(
            {
                response: responseJson
            }
        )));

    return res

}





export default auth