import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/redux/CartSlice';
import { message } from 'antd';

export default memo(function ProductItem({ item }) {
	const dispatch = useDispatch();

	const onAdd = (newProduct) => {
		dispatch(addProductToCart(newProduct));
		message.success('Added product successfully');
	};
	return (
		<div className="group" onClick={() => onAdd(item)}>
			<div className="relative overflow-hidden ">
				<img src={item.image} alt={item.name} className="w-full" />
				<img
					src={item.imageHover}
					alt={item.name}
					className="absolute top-0 left-0 z-20 transition-all duration-200 ease-linear opacity-0 group-hover:opacity-100 group-hover:scale-125"
				/>
				<div className="absolute left-0 right-0 z-30 flex items-center justify-center transition-all duration-200 ease-linear delay-150 -bottom-20 group-hover:bottom-10">
					<button className="hover:bg-[#DF4141] border py-[10px] px-5 text-sm hover:text-white bg-white transition-all duration-200">
						Add to cart
					</button>
				</div>
			</div>
			<div className="pt-4 text-center">
				<p className="font-semibold">{item.name}</p>
				<p>$ {item.price}</p>
			</div>
		</div>
	);
});
