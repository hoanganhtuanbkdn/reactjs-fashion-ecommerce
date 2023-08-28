import React from 'react';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from './pages/Detail';
import { Provider } from 'react-redux';
import { store } from './store';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/detail/:id',
		element: <Detail />,
	},
]);

const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
};

export default App;
