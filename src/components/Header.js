import React from 'react';

import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import HeaderCart from './HeaderCart';
import AuthModal from './Modal/AuthModal';

export default function Header() {
	return (
		<>
			<div className=" h-[75px] border border-[rgba(204, 199, 199, 0.35)] bg-white sticky top-0 z-40">
				<div className="container flex flex-row items-center justify-between h-full mx-auto">
					<div className="">
						<img
							src="/images/logo.webp"
							alt=""
							className="w-[175px] h-[45px]"
						/>
					</div>
					<div className="flex flex-row gap-5">
						<NavLink
							to={ROUTERS.HOME}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Home
						</NavLink>
						<NavLink
							to={ROUTERS.PRODUCTS}
							className={({ isActive }) =>
								`${isActive && 'font-bold'}`
							}
						>
							Products
						</NavLink>
					</div>
					<div className="flex flex-row gap-3">
						<AuthModal />
						<HeaderCart />
					</div>
				</div>
			</div>
		</>
	);
}
