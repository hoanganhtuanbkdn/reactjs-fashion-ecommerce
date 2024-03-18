import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	removeAllProductToCart,
	removeProductToCart,
} from '../store/redux/CartSlice';
import { IoClose } from 'react-icons/io5';

import { Image, message } from 'antd';

export default function Cart({ toggleShowCart }) {
	const carts = useSelector((state) => state.cart.carts);
	const dispatch = useDispatch();

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
		<div className="fixed inset-0 z-40 bg-black bg-opacity-70">
			<div className="w-full lg:w-[450px] h-full flex flex-col bg-white float-right z-50">
				<div className="px-[35px] py-[15px] flex flex-row items-center justify-between bg-[#dcdcdc]">
					<p>Your Basket ({carts.length})</p>
					<button className="bg-transparent" onClick={toggleShowCart}>
						<IoClose />
					</button>
				</div>
				<div className="p-[35px] pb-[55px] flex flex-1 flex-col justify-between">
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
											<IoClose />
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
						<button className="py-[11px] px-6 bg-[#EAEAEB]">
							View Cart
						</button>
						<button className="py-[11px] px-6 bg-black text-white">
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
