import React, { memo } from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/redux/AuthSlice';

export default memo(function Login() {
	const fetching = useSelector((state) => state.auth.fetching);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		dispatch(loginRequest(values));
	};

	return (
		<div>
			<Form
				form={form}
				name="login"
				layout="vertical"
				onFinish={onFinish}
				style={{ width: '100%' }}
				scrollToFirstError
			>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
						},
					]}
				>
					<Input size="large" className="" />
				</Form.Item>

				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
					hasFeedback
				>
					<Input.Password size="large" />
				</Form.Item>

				<div className="space-x-6">
					<Button
						type="primary"
						className="bg-black"
						htmlType="submit"
						loading={fetching}
					>
						Login
					</Button>
				</div>
			</Form>
		</div>
	);
});
