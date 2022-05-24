import { API_BASE_URL } from '../configs/configs';

const application = {};

application.getApplications = async function (role) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/application${role === 'Admin' ? '/all' : '/agent'}`, {
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

application.getSingleApplication = async function (id, role) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/application${role === 'Admin' ? '/admin' : ''}/${id}`, {
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

application.checkEmail = async function (email) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/application/check-email?email=${email}`, {
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

application.updateApplication = async function (id, dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/application/${id}/`, {
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

application.createApplication = async function (dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/application`, {
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


export default application;
