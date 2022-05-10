import { API_BASE_URL } from '../configs/configs';

const price = {};

price.getPrices = async function (filters) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/price?university=${filters.university}&department=${filters.department}
	&language=${filters.language}&degree=${filters.degree}`, {
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

price.updatePrice = async function (dataValues, id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/price/${id}/`, {
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

price.createPrice = async function (dataValues) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/price`, {
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

price.deletePrice = async function (id) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${API_BASE_URL}/price/${id}/`, {
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

export default price;
