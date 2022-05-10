import { API_BASE_URL } from '../configs/configs';

const user = {};

user.getUsers = async function () {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/user`, {
		method: 'GET',
		headers: {
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

user.updateUser = async function (dataValues, id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/user/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(dataValues),
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

user.createUser = async function (dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/user`, {
		method: 'POST',
		body: JSON.stringify(dataValues),
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

user.deleteUser = async function (id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/user/${id}/`, {
		method: 'DELETE',
		headers: {
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

export default user;
