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
		api.post('/login', { email, password });

	const register = async ({ email, password }) =>
		api.post('/register', { email, password });

	const getProducts = (params) => api.get('/products', params);

	const getCategories = () => api.get('/categories?_embed=products');

	const createOrder = (payload) => api.post('/orders', payload);
	const createOrderDetails = (payload) => api.post('/orderDetails', payload);

	return {
		api,
		login,
		register,
		getProducts,
		getCategories,
		createOrder,
		createOrderDetails,
	};
};

export const ServiceApi = createServiceApi();
