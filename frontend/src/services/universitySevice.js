import { API_BASE_URL } from '../configs/configs';

const university = {};

university.getUniversities = async function () {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/university`, {
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

university.updateUniversity = async function (dataValues, id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/university/${id}/`, {
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

university.createUniversity = async function (dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/university`, {
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

university.deleteUniversity = async function (id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/university/${id}/`, {
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

export default university;
