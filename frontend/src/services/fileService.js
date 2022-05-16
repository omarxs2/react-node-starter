import { API_BASE_URL } from '../configs/configs';

const fileService = {}

fileService.sendFile = function (file) {
    const token = localStorage.getItem('token')
    const res = fetch(`${API_BASE_URL}/file`, {
        method: 'POST',
        body: file,
        headers: {
            Authorization: "Bearer " + token
        },
    }).then(response =>
        response.json().then(responseJson =>
            Promise.resolve({
                response: responseJson
            })));
    return res;

}


export default fileService