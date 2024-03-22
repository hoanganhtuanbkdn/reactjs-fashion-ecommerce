import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../store/redux/CartSlice';
import { Button, Form, Input, message } from 'antd';
import { ServiceApi } from '../services/Api';
import { ORDER_STATUS } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const carts = useSelector((state) => state.cart.carts);
	const dispatch = useDispatch();
	const calculateTotal = () => {
		return carts.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
	};

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		setIsSubmitting(true);
		try {
			const resOrder = await ServiceApi.createOrder({
				...values,
				userId: 1, // request login
				status: ORDER_STATUS.PENDING,
				orderDate: new Date().toISOString(),
				price: calculateTotal(),
			});

			if (resOrder.ok) {
				await Promise.all(
					carts.map(async (cart) => {
						await ServiceApi.createOrderDetails({
							orderId: resOrder.data.id,
							productId: cart.id,
							quantity: cart.quantity,
							price: cart.price,
						});
					})
				);
				message.success('Bạn đã đặt hàng thành công.');
				dispatch(resetCart());
				navigate('/');
			} else {
				message.error('Đặt hàng không thành công');
			}
		} catch (e) {
			message.error(e.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			size="large"
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 18 }}
			form={form}
			onFinish={onFinish}
			className="container py-10 mx-auto grid grid-cols-3 gap-6"
		>
			<div className="grid col-span-2 bg-white p-6 shadow-md">
				<div className="pb-8">
					<p className="text-3xl">Billing Details</p>
				</div>
				<Form.Item
					name="fullName"
					label="Full Name"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="address"
					label="Address"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="city"
					label="City"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="country"
					label="Country"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
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
							<p>$10</p>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between py-5">
						<p>Total</p>
						<p>${calculateTotal() + 10}</p>
					</div>
				</div>
				<Button
					type="primary"
					htmlType="submit"
					loading={isSubmitting}
					className="border-none h-[52px] mt-5 w-full text-white bg-black"
				>
					Proceed To Checkout
				</Button>
			</div>
		</Form>
	);
}
