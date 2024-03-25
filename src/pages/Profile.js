import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import AuthSidebar from '../components/AuthSidebar';
import { updateUserRequest } from '../store/redux/AuthSlice';

export default function Profile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const isSubmitting = useSelector((state) => state.auth.fetching);

	const [form] = Form.useForm();

	const onFinish = async (values) => {
		dispatch(updateUserRequest({ id: user.id, ...values }));
	};

	return (
		<div className="container py-10 mx-auto min-h-[calc(100vh_-_139px)]">
			<div className="grid grid-cols-5 gap-6">
				<AuthSidebar />
				<div className="grid col-span-4 p-6 bg-white shadow-md">
					<Form
						size="large"
						form={form}
						layout="vertical"
						initialValues={{
							...user,
						}}
						onFinish={onFinish}
					>
						<div>
							<div className="pb-8">
								<p className="text-3xl">Profile</p>
							</div>
							<Form.Item
								name="firstname"
								label="First Name"
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="lastname"
								label="Last Name"
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
							<Button
								type="primary"
								htmlType="submit"
								loading={isSubmitting}
								className="w-full mt-5 "
							>
								Save
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
