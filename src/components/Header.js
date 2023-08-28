import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductToCart } from '../store/CartSlice';

export default function Header() {
	const carts = useSelector((state) => state.cart.carts);
	const dispatch = useDispatch();
	const [isShowCart, setShowCart] = useState(false);
	const toggleShowCart = () => setShowCart(!isShowCart);

	const removeToCart = (product) => {
		dispatch(removeProductToCart(product));
	};
	return (
		<div className=" h-[75px] border border-[rgba(204, 199, 199, 0.35)]">
			<div className="container flex flex-row items-center justify-between h-full mx-auto">
				<div className="">
					<img
						src="/images/logo.webp"
						alt=""
						className="w-[175px] h-[45px]"
					/>
				</div>
				<div className="flex flex-row gap-5">
					<div>Home</div>
					<div>Product</div>
					<div>Contact</div>
				</div>
				<div className="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-shopping-bag"
						onClick={toggleShowCart}
					>
						<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<path d="M16 10a4 4 0 0 1-8 0"></path>
					</svg>
					<p className="absolute top-[-10px] right-[-10px] text-xs font-bold">
						{carts.length}
					</p>
					{isShowCart && (
						<div className="fixed inset-0 z-40 bg-black bg-opacity-70">
							<div className="w-full lg:w-[450px] h-full col bg-white float-right z-50">
								<div className="px-[35px] py-[15px] row-between bg-[#dcdcdc]">
									<p>Your Basket ({carts.length})</p>
									<button
										className="bg-transparent"
										onClick={toggleShowCart}
									>
										{/* <CloseIcon /> */}x
									</button>
								</div>
								<div className="p-[35px] pb-[55px] flex flex-1 flex-col justify-between">
									<div className="">
										<p>
											Buy{' '}
											<span className="text-[#DF4141]">
												$949
											</span>{' '}
											more for get{' '}
											<span className="font-semibold">
												Free Shipping!!
											</span>
										</p>
										<div className="max-h-full gap-2 my-4 col overscroll-auto">
											{carts.map((product) => (
												<div
													key={product.id}
													className="flex justify-between w-full fle-row"
												>
													<div className="flex flex-row gap-3">
														<div className="w-[72px] h-[90px] relative">
															{/* <Image
														src={product.image}
														alt={product.name}
														fill
														className="object-cover"
													/> */}
														</div>
														<div className="">
															<p className="text-sm">
																{product.name}
															</p>
															<div className="border border-[#d0d0d0] h-[30px] row mt-2 w-[75px]">
																<button className="w-[25px] center">
																	<span>
																		-
																	</span>
																</button>
																<div className="w-[25px] center">
																	<p>
																		{/* {
																	product
																		.items
																		?.length
																} */}
																		1
																	</p>
																</div>
																<button className=" w-[25px] center">
																	<span>
																		+
																	</span>
																</button>
															</div>
														</div>
													</div>
													<div className="items-end gap-2 col">
														<button
															onClick={() =>
																removeToCart(
																	product
																)
															}
														>
															{/* <CloseIcon width={18} /> */}
															x
														</button>
														<p className="text-sm">
															${' '}
															{/* {product.price *
														Number(
															product.items
																?.length
														)} */}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="col gap-[15px] ">
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
					)}
				</div>
			</div>
		</div>
	);
}
