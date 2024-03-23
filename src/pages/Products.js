import React, { useEffect, useState } from 'react';
import { ServiceApi } from '../services/Api';
import ProductLoading from '../components/ProductLoading';
import ProductHeader from '../components/ProductHeader';
import ProductSidebar from '../components/ProductSidebar';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { insertObjectIf } from '../utils';
const Products = () => {
	const [searchParams] = useSearchParams();

	const [products, setProducts] = useState([]);
	const [fetching, setFetching] = useState([]);

	const getProducts = async () => {
		setFetching(true);
		const sort = searchParams.get('sort') || '';
		const sorts = sort.split('-');
		console.log(111, sort, sorts);
		const q = searchParams.get('q');
		const categoryId = searchParams.get('categoryId');
		const priceRange = searchParams.get('price-range');
		console.log(333, {
			...insertObjectIf(sort, {
				_sort: sorts[0],
				_order: sorts[1],
			}),
			...insertObjectIf(q, { name_like: q }),
			...insertObjectIf(categoryId, { categoryId }),
			...insertObjectIf(priceRange, {
				priceRange: JSON.parse(priceRange),
			}),
		});

		const res = await ServiceApi.getProducts({
			...insertObjectIf(sort, {
				_sort: sorts[0],
				_order: sorts[1],
			}),
			...insertObjectIf(q, { name_like: q }),
			...insertObjectIf(categoryId, { categoryId }),
			...insertObjectIf(priceRange, {
				priceRange: JSON.parse(priceRange),
			}),
		});
		if (res.ok) {
			setProducts(res.data);
		}
		setFetching(false);
	};

	useEffect(() => {
		getProducts();
	}, [searchParams]);

	return (
		<div className="container py-16 mx-auto">
			<div className="relative flex flex-row w-full gap-9">
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
								<ProductItem key={index} item={item} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Products;
