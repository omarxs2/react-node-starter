import { API_BASE_URL } from '../configs/configs';

const auth = {};

auth.login = async function (credential) {
	const res = await fetch(`${API_BASE_URL}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(credential),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response =>
		response.json().then(responseJson =>
			Promise.resolve({
				response: responseJson
			})
		)
	);
	return res;
};


auth.resetPass = async function (credential, role) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/auth/${role}-reset-password`, {
		method: 'POST',
		body: JSON.stringify(credential),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	}).then(response =>
		response.json().then(responseJson =>
			Promise.resolve({
				response: responseJson
			})
		)
	);
	return res;
};

// auth.forgetPass = async function (credential, role) {
// 	const res = await fetch(`${API_BASE_URL}/auth/${role}forget-password`, {
// 		method: 'POST',
// 		body: JSON.stringify(credential),
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}).then(response =>
// 		response.json().then(responseJson =>
// 			Promise.resolve({
// 				response: responseJson
// 			})
// 		)
// 	);
// 	return res;
// };

export default auth;
