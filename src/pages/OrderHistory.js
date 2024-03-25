import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, Popconfirm, Table, message } from 'antd';
import { ServiceApi } from '../services/Api';
import { useSearchParams } from 'react-router-dom';
import Price from '../components/Price';
import { insertObjectIf } from '../utils';
import moment from 'moment';
import { setShowAuthModal } from '../store/redux/AuthSlice';
import AuthSidebar from '../components/AuthSidebar';
export default function OrderHistory() {
	const user = useSelector((state) => state.auth.user);
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const [fetching, setFetching] = useState([]);

	const getOrders = async () => {
		setFetching(true);
		const res = await ServiceApi.getOrders({
			_embed: 'orderDetails',
			...insertObjectIf(user, { userId: user.id }),
		});
		if (res.ok) {
			setOrders(res.data);
		}
		setFetching(false);
	};

	useEffect(() => {
		if (user) {
			getOrders();
		} else {
			// Trang lịch sử đặt hàng yêu cầu phải đăng nhập, nếu chưa đặt nhập mà di chuyển đến trang thì mở modal login để user đăng nhập
			dispatch(setShowAuthModal(true));
		}
	}, [searchParams, user]);

	const confirm = async (id) => {
		await ServiceApi.deleteOrders(id);
		await getOrders();
		message.success('Deleted order successfully');
	};

	const columns = [
		{ title: 'Code', dataIndex: 'id', key: 'id' },
		Table.EXPAND_COLUMN,
		{
			title: 'Bill Detail',
			render: (text, record, index) => (
				<div className="flex flex-col">
					<p className="text-xs">{record.fullName}</p>
					<p className="text-xs">
						{[
							record.phone,
							record.email,
							record.address,
							record.city,
							record.country,
						].join(', ')}
					</p>
				</div>
			),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (value) => <Price value={value} />,
		},
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate',
			render: (value) => moment(value).format('YYYY.MM.DD hh:mm'),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (_, record) => (
				<Popconfirm
					title="Delete the order"
					description="Are you sure to delete this order?"
					onConfirm={() => confirm(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<Button danger size="small">
						Delete
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
			<div className="grid grid-cols-5 gap-6">
				<AuthSidebar />
				<div className="grid col-span-4 p-6 bg-white shadow-md">
					<Table
						columns={columns}
						loading={fetching}
						expandable={{
							expandedRowRender: (record) => (
								<div>
									<table class="table-auto w-full ">
										<thead>
											<tr className="[&_th]:py-2">
												<th></th>
												<th className="text-left">
													Products
												</th>
												<th className="text-center">
													Price
												</th>
												<th className="text-center">
													Quantity
												</th>
												<th className="text-right">
													Total
												</th>
											</tr>
										</thead>
										<tbody>
											{record.orderDetails.map((item) => (
												<tr
													key={item.id}
													className="[&_td]:pt-2"
												>
													<td>
														<Image
															src={
																item.product
																	.image
															}
															width={60}
															height={60}
														/>
													</td>
													<td className="text-left">
														{item.product.name}
													</td>
													<td className="text-sm text-center">
														<Price
															value={item.price}
														/>
													</td>
													<td>
														<p className="text-center w-full">
															{item.quantity}
														</p>
													</td>
													<td className="text-sm text-right">
														<Price
															value={
																item.quantity *
																item.price
															}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							),
						}}
						dataSource={orders}
					/>
				</div>
			</div>
		</div>
	);
}
