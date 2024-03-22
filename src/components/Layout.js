import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
export default function Layout() {
	return (
		<main className="min-h-screen">
			<Header />
			<div className="container mx-auto">
				<Outlet />
			</div>
		</main>
	);
}
