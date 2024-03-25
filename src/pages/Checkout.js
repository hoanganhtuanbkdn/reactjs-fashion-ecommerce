import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, setBillDetails } from '../store/redux/CartSlice';
import { Button, Form, Input, message } from 'antd';
import { ServiceApi } from '../services/Api';
import { ORDER_STATUS } from '../constants';
import { useNavigate } from 'react-router-dom';
import Price from '../components/Price';
import { setShowAuthModal } from '../store/redux/AuthSlice';
import { sentOrderSuccessEmail } from '../services/Email';
import { ROUTERS } from '../constants/Routers';

export default function Checkout() {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const carts = useSelector((state) => state.cart.carts);
	const user = useSelector((state) => state.auth.user);
	const billDetails = useSelector((state) => state.cart.billDetails);
	const dispatch = useDispatch();
	const calculateTotal = () => {
		return carts.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
	};
	const totalPrice = calculateTotal();

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		if (!user) {
			// Mở modal login nếu chưa login
			dispatch(setShowAuthModal(true));
			return;
		}

		setIsSubmitting(true);
		try {
			const resOrder = await ServiceApi.createOrder({
				...values,
				userId: user.id, // request login
				status: ORDER_STATUS.PENDING,
				orderDate: new Date().toISOString(),
				price: totalPrice,
			});

			if (resOrder.ok) {
				// Lưu lại thông tin đặt hàng để tự động điền cho lần sau
				dispatch(setBillDetails(values));
				await Promise.all(
					carts.map(async (cart) => {
						await ServiceApi.createOrderDetails({
							orderId: resOrder.data.id,
							product: cart,
							quantity: cart.quantity,
							price: cart.price,
						});
					})
				);
				// Gửi email thông báo cho người dùng khi người dùng đặt hàng thành công
				sentOrderSuccessEmail({
					email: user.email,
					userName: user.firstname + ' ' + user.lastname,
					orderDate: resOrder.data.orderDate,
					orderCode: resOrder.data.id,
					orderPrice: '$ ' + resOrder.data.price,
				});

				message.success('Ordered product successfully');
				// Xóa dữ liệu giỏ hàng sau khi đặt hàng thành công
				dispatch(resetCart());
				// Di chuyển về trang chủ
				navigate(ROUTERS.HOME);
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
		<div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
			<Form
				size="large"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 18 }}
				form={form}
				initialValues={{
					...billDetails,
					// sử dụng thông tin đặt hàng đã được lưu vào redux từ đơn đặt hàng trước để tự động điền cho người dùng
				}}
				onFinish={onFinish}
			>
				<div className="grid grid-cols-3 gap-6">
					<div className="grid col-span-2 p-6 bg-white shadow-md">
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
					<div className="grid col-span-1 p-6 bg-white shadow-md">
						<div className="flex flex-col justify-between h-full``1">
							<div className="divide-y divide-[#e9e9e9]">
								<div className="py-5">
									<p className="font-semibold">Cart Totals</p>
								</div>
								<div className="flex flex-row items-center justify-between py-6">
									<p className="font-semibold">Subtotal</p>
									<p className="font-semibold">
										<Price value={totalPrice} />
									</p>
								</div>
								<div className="py-5 space-y-4">
									<div>
										<p className="font-semibold">
											Shipping
										</p>
									</div>
									<div className="flex flex-row items-center justify-between ">
										<p className="font-semibold">
											Flat rate:
										</p>
										<p>$0</p>
									</div>
								</div>
								<div className="flex flex-row items-center justify-between py-5">
									<p className="font-semibold">Total</p>
									<p className="font-semibold">
										<Price value={totalPrice} />
									</p>
								</div>
							</div>
							<Button
								type="primary"
								htmlType="submit"
								loading={isSubmitting}
								className="w-full mt-5 "
							>
								Proceed To Checkout
							</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
