import { API_BASE_URL } from '../configs/configs';

const department = {};

department.getDepartments = async function () {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/department`, {
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

department.updateDepartment = async function (dataValues, id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/department/${id}/`, {
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

department.createDepartment = async function (dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/department`, {
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

department.deleteDepartment = async function (id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/department/${id}/`, {
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

export default department;
