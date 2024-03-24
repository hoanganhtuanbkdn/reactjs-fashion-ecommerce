import React, { memo, useEffect, useState } from 'react';
import { ServiceApi } from '../services/Api';
import { useSearchParams } from 'react-router-dom';
import { Slider } from 'antd';

function ProductSidebar() {
	const [categories, setCategories] = useState([]);
	const [sliderValues, setSliderValues] = useState([10, 150]);
	const [searchParams, setSearchParams] = useSearchParams();

	const categorySelected = searchParams.get('categoryId');
	function handleFilterProductByCategory(value) {
		setSearchParams((prevParams) => {
			if (!value) {
				prevParams.delete('categoryId');
			} else {
				prevParams.set('categoryId', value);
			}
			return prevParams;
		});
	}
	const getProducts = async () => {
		const res = await ServiceApi.getCategories();
		if (res.ok) {
			setCategories(res.data);
		}
	};

	const onChange = (value) => {
		setSliderValues(value);
	};

	const onChangeComplete = (value) => {
		setSearchParams((prevParams) => {
			if (!value) {
				prevParams.delete('price-range');
			} else {
				prevParams.set('price-range', JSON.stringify(value));
			}
			return prevParams;
		});
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="sticky top-0 flex flex-col flex-1 space-y-6">
			<div>
				<p className="text-xs">Home / Shop</p>
			</div>
			<div className="">
				<p className="mb-4 font-semibold">Categories</p>
				<ul className="space-y-4 text-sm">
					<li
						onClick={() => handleFilterProductByCategory('')}
						className={`cursor-pointer ${
							!categorySelected && 'font-semibold'
						}`}
					>
						All
					</li>
					{categories.map((item) => (
						<li
							key={item.id}
							onClick={() =>
								handleFilterProductByCategory(item.id)
							}
							className={`cursor-pointer ${
								categorySelected === item.id && 'font-semibold'
							}`}
						>
							{item.name} ( {item.products.length} )
						</li>
					))}
				</ul>
			</div>
			<div>
				<p className="mb-4 font-semibold">Price</p>
				<Slider
					min={1}
					max={500}
					range
					step={10}
					defaultValue={[10, 150]}
					onChange={onChange}
					onChangeComplete={onChangeComplete}
				/>
				<div className="flex flex-row items-center justify-between w-full mt-5 text-xs">
					<p className="w-[50px] font-semibold text-center py-1 border border-black">
						{sliderValues[0]}
					</p>
					<p className="w-[50px] font-semibold text-center py-1 border border-black">
						{sliderValues[1]}
					</p>
				</div>
			</div>
		</div>
	);
}

export default memo(ProductSidebar);
