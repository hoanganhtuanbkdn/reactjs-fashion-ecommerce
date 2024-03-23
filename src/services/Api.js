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

	const getProducts = ({ sort, categoryId, priceRange }) =>
		api.get('/products', {
			...(!!sort ? { _sort: sort } : {}),
			...(!!categoryId ? { categoryId } : {}),
			...(!!priceRange && priceRange[0] && priceRange[1]
				? { price_gte: priceRange[0], price_lte: priceRange[1] }
				: {}),
		});

	const getCategories = () => api.get('/categories?_embed=products');

	const createOrder = (payload) => api.post('/orders', payload);
	const createOrderDetails = (payload) => api.post('/orderDetails', payload);

	return {
		api,
		login,
		getProducts,
		getCategories,
		createOrder,
		createOrderDetails,
	};
};

export const ServiceApi = createServiceApi();
