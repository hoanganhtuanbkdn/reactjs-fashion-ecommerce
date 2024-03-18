import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import { LuShoppingBag } from 'react-icons/lu';
import Cart from './Cart';

export default function Header() {
	const carts = useSelector((state) => state.cart.carts);

	const [isShowCart, setShowCart] = useState(false);
	const toggleShowCart = () => setShowCart(!isShowCart);

	return (
		<>
			<div className=" h-[75px] border border-[rgba(204, 199, 199, 0.35)] sticky top-0 z-10">
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
					<button className="relative" onClick={toggleShowCart}>
						<LuShoppingBag size={20} />
						<p className="absolute top-[-10px] right-[-10px] text-xs font-bold">
							{carts.length}
						</p>
					</button>
				</div>
			</div>
			{isShowCart && <Cart toggleShowCart={toggleShowCart} />}
		</>
	);
}
