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
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="products" element={<Products />} />
			<Route path="products/:slug" element={<ProductDetail />} />
			. <Route path="login" element={<Login />} />
		</Route>
	)
);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
					<RouterProvider router={router} />
				</ConfigProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
