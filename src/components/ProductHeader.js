import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Dropdown, Input, message } from 'antd';
const { Search } = Input;

const SortOptions = {
	'Sort by popularity': '',
	'Sort by price: low to hight': 'price',
	'Sort by price: hight to low': '-price',
};
export default function ProductHeader() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState('');
	const [sort, setSort] = useState('Sort by popularity');

	function handleOrderProduct(value) {
		setSort(value);
		setSearchParams((prevParams) => {
			if (!SortOptions[value]) {
				prevParams.delete('sort');
			} else {
				prevParams.set('sort', SortOptions[value]);
			}
			return prevParams;
		});
	}
	function handleSearchProduct(vaue) {
		setSearchParams((prevParams) => {
			if (!searchValue) {
				prevParams.delete('q');
			} else {
				prevParams.set('q', searchValue);
			}
			return prevParams;
		});
	}

	const items = [
		{
			key: 'Sort by popularity',
			label: (
				<button
					onClick={() => handleOrderProduct('Sort by popularity')}
				>
					Sort by popularity
				</button>
			),
		},
		{
			key: 'Sort by price: low to hight',
			label: (
				<button
					onClick={() =>
						handleOrderProduct('Sort by price: low to hight')
					}
				>
					Sort by price: low to hight
				</button>
			),
		},
		{
			key: 'Sort by price: hight to low',
			label: (
				<button
					onClick={() =>
						handleOrderProduct('Sort by price: hight to low')
					}
				>
					Sort by price: hight to low
				</button>
			),
		},
	];

	return (
		<div className="flex flex-row items-center justify-between w-full">
			<div>
				<Search
					size="large"
					className="w-[300px] text-sm"
					placeholder="Search with keyword"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onSearch={handleSearchProduct}
					allowClear
				/>
			</div>
			<Dropdown menu={{ items }} placement="bottomLeft">
				<Button size="large">{sort}</Button>
			</Dropdown>
		</div>
	);
}
