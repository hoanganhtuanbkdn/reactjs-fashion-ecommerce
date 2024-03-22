import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	removeAllProductToCart,
	removeProductToCart,
} from '../store/redux/CartSlice';
import { Image } from 'antd';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../constants/Routers';

const TargetPrice = 2000;
export default function Cart() {
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
		<div className="container py-10 mx-auto grid grid-cols-3 gap-6">
			<div className="grid col-span-2 bg-white p-6 shadow-md">
				<div className="p-5 border border-dashed border-[#e9e9e9]">
					<p>
						Buy{' '}
						<span className="text-red-400">
							${TargetPrice - calculateTotal()}
						</span>{' '}
						more for get <strong>Free Shipping!!</strong>
					</p>
				</div>
				<table class="table-auto w-full mt-6 divide-y divide-[#e9e9e9]">
					<thead>
						<tr className="[&_th]:py-4">
							<th></th>
							<th></th>
							<th className="text-left">Products</th>
							<th className="text-center">Price</th>
							<th className="text-right">Quantity</th>
							<th className="text-right">Total</th>
						</tr>
					</thead>
					<tbody>
						{carts.map((item) => (
							<tr key={item.id} className="[&_td]:pt-4">
								<td>
									<button
										className=""
										onClick={() => removeAllToCart(item)}
									>
										<IoCloseCircleOutline />
									</button>
								</td>
								<td>
									<Image
										src={item.image}
										width={120}
										height={120}
									/>
								</td>
								<td className="text-left">{item.name}</td>
								<td className="text-center text-sm">
									${item.price}
								</td>
								<td className="text-right">
									<div className="border border-[#d0d0d0] h-[30px] flex flex-row items-center float-right w-[75px]">
										<button
											className="flex items-center justify-center flex-1"
											onClick={() => removeToCart(item)}
										>
											<span>-</span>
										</button>
										<div className="flex items-center justify-center flex-1">
											<p>{item.quantity}</p>
										</div>
										<button
											className="flex items-center justify-center flex-1"
											onClick={() => addToCart(item)}
										>
											<span>+</span>
										</button>
									</div>
								</td>
								<td className="text-right text-sm">
									${item.quantity * item.price}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex flex-row mt-5 pt-5 border-t border-[#e9e9e9]">
					<input
						placeholder="Coupon code"
						className="h-[52px] px-4 w-[154px] border border-[#d3ced2]"
					/>
					<button className="border-none h-[52px] w-[154px] text-white bg-black">
						Apply Coupon
					</button>
				</div>
			</div>
			<div className="grid col-span-1 bg-white p-6 shadow-md">
				<div className="divide-y divide-[#e9e9e9]">
					<div className="py-5">
						<p>Cart Totals</p>
					</div>
					<div className="flex flex-row items-center justify-between py-6">
						<p>Subtotal</p>
						<p>${calculateTotal()}</p>
					</div>
					<div className="py-5 space-y-4">
						<div>
							<p>Shipping</p>
						</div>
						<div className="flex flex-row items-center justify-between ">
							<p>Flat rate:</p>
							<p>$0</p>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between py-5">
						<p>Total</p>
						<p>${calculateTotal()}</p>
					</div>
				</div>
				<Link
					to={ROUTERS.CHECKOUT}
					className="border-none h-[52px] mt-5 flex items-center justify-center w-full text-white bg-black"
				>
					<p>Proceed To Checkout</p>
				</Link>
			</div>
		</div>
	);
}
