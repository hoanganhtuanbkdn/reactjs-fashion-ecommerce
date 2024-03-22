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

	const createOrder = (payload) => api.post('/orders', payload);
	const createOrderDetails = (payload) => api.post('/orderDetails', payload);

	return {
		api,
		login,
		getProducts,
		createOrder,
		createOrderDetails,
	};
};

export const ServiceApi = createServiceApi();
