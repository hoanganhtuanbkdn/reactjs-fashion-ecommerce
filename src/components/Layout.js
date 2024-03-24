import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

import { App } from 'antd';
import Footer from './Footer';

let message;
let notification;
let modal;

export default function Layout() {
	const staticFunction = App.useApp();
	message = staticFunction.message;
	modal = staticFunction.modal;
	notification = staticFunction.notification;

	return (
		<div className="min-h-screen">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export { message, modal, notification };
