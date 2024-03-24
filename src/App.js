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
import Login from './pages/Login';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route path="checkout" element={<Checkout />} />
			<Route path="products" element={<Products />} />
			<Route path="products/:slug" element={<ProductDetail />} />
			<Route path="login" element={<Login />} />
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
