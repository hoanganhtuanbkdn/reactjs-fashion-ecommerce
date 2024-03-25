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

	const login = async (payload) => api.post('/login', payload);

	const register = async (payload) => api.post('/register', payload);

	const getProducts = (params) => api.get('/products', params);
	const getProductBySlug = (params) => api.get('/products', params);

	const getCategories = () => api.get('/categories?_embed=products');

	const getOrders = (params) => api.get('/orders', params);
	const deleteOrders = (orderId) => api.delete('/orders/' + orderId);

	const createOrder = (payload) => api.post('/orders', payload);
	const createOrderDetails = (payload) => api.post('/orderDetails', payload);
	const updateUser = (id, payload) => api.patch('/users/' + id, payload);
	const getUserById = (id) => api.get('/users/' + id);

	return {
		api,
		login,
		register,
		getProducts,
		getProductBySlug,
		getCategories,
		createOrder,
		createOrderDetails,
		getOrders,
		deleteOrders,
		updateUser,
		getUserById,
	};
};

export const ServiceApi = createServiceApi();
