import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	removeAllProductToCart,
	removeProductToCart,
} from '../store/redux/CartSlice';
import { X } from 'lucide-react';

import { Button, Drawer, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
	const carts = useSelector((state) => state.cart.carts);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const addToCart = (product) => {
		dispatch(addProductToCart(product));
	};

	const removeToCart = (product) => {
		dispatch(removeProductToCart(product));
	};

	const removeAllToCart = (product) => {
		dispatch(removeAllProductToCart(product));
	};

	const calculateTotal = () => {
		return carts.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
	};

	return (
		<>
			<Button className="relative" type="text" onClick={showDrawer}>
				<ShoppingBag size={20} color="#222222" />
				<p className="absolute text-black top-[-10px] right-0 text-xs font-bold">
					{carts.length}
				</p>
			</Button>
			<Drawer
				title={`Your Basket (${carts.length})`}
				onClose={onClose}
				open={open}
				className="w-full lg:w-[450px] h-full relative flex flex-col bg-white float-right z-50"
			>
				<div className="flex flex-col justify-between flex-1">
					<div className="">
						<p>
							Buy{' '}
							<span className="text-[#DF4141]">
								${calculateTotal()}{' '}
							</span>
							more for get{' '}
							<span className="font-semibold">
								Free Shipping!!
							</span>
						</p>
						<div className="max-h-full my-4 space-y-3 col overscroll-auto">
							{carts.map((product) => (
								<div
									key={product.id}
									className="flex flex-row items-center justify-between w-full"
								>
									<div className="flex flex-row gap-3">
										<div className="w-[72px] h-[90px] relative">
											<Image
												src={product.image}
												width={72}
												height={90}
											/>
										</div>
										<div className="">
											<p className="text-sm">
												{product.name}
											</p>
											<div className="border border-[#d0d0d0] h-[30px] flex flex-row items-center mt-2 w-[75px]">
												<button
													className="flex items-center justify-center flex-1"
													onClick={() =>
														removeToCart(product)
													}
												>
													<span>-</span>
												</button>
												<div className="flex items-center justify-center flex-1">
													<p>{product.quantity}</p>
												</div>
												<button
													className="flex items-center justify-center flex-1"
													onClick={() =>
														addToCart(product)
													}
												>
													<span>+</span>
												</button>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2">
										<button
											onClick={() =>
												removeAllToCart(product)
											}
										>
											<X size={15} />
										</button>
										<p className="text-sm">
											$ {product.price}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-[15px] ">
						<Link
							to={ROUTERS.CART}
							onClick={onClose}
							className="py-[11px] px-6 bg-[#EAEAEB] text-center"
						>
							View Cart
						</Link>

						<button className="py-[11px] px-6 bg-black text-white">
							Checkout
						</button>
					</div>
				</div>
			</Drawer>
		</>
	);
}
