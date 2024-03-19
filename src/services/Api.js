import { create } from 'apisauce';

const createServiceApi = () => {
	const api = create({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 10000,
		baseURL:
			process.env.NODE_ENV !== 'production'
				? 'http://localhost:4000'
				: 'https://ecommerce-json-server-sand.vercel.app',
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
