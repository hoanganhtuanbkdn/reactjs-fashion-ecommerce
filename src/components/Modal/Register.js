import React, { memo } from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../store/redux/AuthSlice';

export default memo(function Register() {
	const fetching = useSelector((state) => state.auth.fetching);
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
		dispatch(registerRequest(values));
	};

	return (
		<div>
			<Form
				form={form}
				name="register"
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
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('password') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										'The new password that you entered do not match!'
									)
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<div className="space-x-6">
					<Button
						type="primary"
						className="bg-black"
						htmlType="submit"
						loading={fetching}
					>
						Register
					</Button>
				</div>
			</Form>
		</div>
	);
});
