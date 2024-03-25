import React from 'react';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import { ROUTERS } from './constants/Routers';
import Profile from './pages/Profile';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path={ROUTERS.CART} element={<Cart />} />
			<Route path={ROUTERS.CHECKOUT} element={<Checkout />} />
			<Route path={ROUTERS.PRODUCTS} element={<Products />} />
			<Route path={ROUTERS.PRODUCT_DETAIL} element={<ProductDetail />} />
			<Route path={ROUTERS.PROFILE} element={<Profile />} />
			<Route path={ROUTERS.ORDER_HISTORY} element={<OrderHistory />} />
		</Route>
	)
);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	);
};

export default App;
