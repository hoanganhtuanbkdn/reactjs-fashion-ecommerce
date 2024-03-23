import React, { useEffect, useState } from 'react';
import { ServiceApi } from '../services/Api';
import { addProductToCart } from '../store/redux/CartSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import ProductLoading from '../components/ProductLoading';
import ProductHeader from '../components/ProductHeader';
import ProductSidebar from '../components/ProductSidebar';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [products, setProducts] = useState([]);
	const [fetching, setFetching] = useState([]);
	const dispatch = useDispatch();

	const onAdd = (newProduct) => {
		dispatch(addProductToCart(newProduct));
		message.success('Thêm sản phẩm thành công');
	};

	const getProducts = async () => {
		setFetching(true);
		const sort = searchParams.get('sort');
		const q = searchParams.get('q');
		const categoryId = searchParams.get('categoryId');
		const priceRange = searchParams.get('price-range') || '';
		const res = await ServiceApi.getProducts({
			sort,
			categoryId,
			priceRange: JSON.parse(priceRange),
		});
		if (res.ok) {
			if (q) {
				setProducts(
					res.data.filter((item) =>
						item.name.toUpperCase().includes(q.toUpperCase())
					)
				);
			} else {
				setProducts(res.data);
			}
		}
		setFetching(false);
	};

	useEffect(() => {
		getProducts();
	}, [searchParams]);

	return (
		<div className="container py-16 mx-auto">
			<div className="relative flex flex-row w-full gap-7">
				<ProductSidebar />
				<div className="flex flex-col flex-[3]">
					<ProductHeader />
					<div className="py-4">
						<p>Showing all {products.length} results</p>
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
										<p className="font-semibold">
											{item.name}
										</p>
										<p>$ {item.price}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Products;
