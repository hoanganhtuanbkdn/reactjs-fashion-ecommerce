import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../store/redux/CartSlice';
import { message } from 'antd';
import { useEffect } from 'react';
import { getProductsRequest } from '../store/redux/ProductSlice';
import ProductLoading from './ProductLoading';
function List() {
	const { products, fetching } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const onAdd = (newProduct) => {
		dispatch(addProductToCart(newProduct));
		message.success('Thêm sản phẩm thành công');
	};

	const getProducts = () => {
		dispatch(getProductsRequest());
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="container py-10 mx-auto">
			<div className="card">
				<div className="mb-6 text-center">
					<h2 className="text-3xl">Best selling fashion items</h2>
					<h4 className="mt-4">
						Base optimal relaxation unlock my. Asserts too invite
						web cause eow can breakout ocean create.
					</h4>
				</div>

				{fetching ? (
					<ProductLoading />
				) : (
					<div className="grid grid-cols-1 gap-5 md:grid-cols-4">
						{products.map((item, index) => (
							<div
								className="group"
								key={index}
								onClick={() => onAdd(item)}
							>
								<div className="relative overflow-hidden ">
									<img
										src={item.image}
										alt={item.name}
										className="w-full"
									/>
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
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default List;
