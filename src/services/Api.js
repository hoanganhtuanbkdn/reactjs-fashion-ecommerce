import { create } from 'apisauce';

const createServiceApi = () => {
	const api = create({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 10000,
		baseURL: process.env.REACT_APP_API_URL,
	});

	const login = async ({ email, password }) =>
		api.post('/users/login', { email, password });

	const getProducts = () => api.get('/products');

	return {
		api,
		login,
		getProducts,
	};
};

export const ServiceApi = createServiceApi();
