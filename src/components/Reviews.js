import React, { memo, useState, useEffect } from 'react';
import { ServiceApi } from '../services/Api';
import { useSelector } from 'react-redux';
import { Button, Card, Form, Rate } from 'antd';
import { message } from './Layout';
import TextArea from 'antd/es/input/TextArea';

export default memo(function Reviews({ detail }) {
	const user = useSelector((state) => state.auth.user);

	const [comments, setComments] = useState([]);
	const [form] = Form.useForm();
	const getComments = async () => {
		const res = await ServiceApi.getCommentsByProductId({
			productId: detail.id,
		});

		if (res.ok && res.data) {
			setComments(res.data);
		}
	};

	const onCreateComment = async (values) => {
		const res = await ServiceApi.createComment({
			productId: detail.id,
			user: user,
			content: values.content,
			rate: values.rate,
			createdAt: new Date().toISOString(),
		});
		if (res.ok) {
			await getComments();
			message.success('Created review successfully');
			form.resetFields();
		}
	};

	// Hàm này kiểm tra xem người đã đánh giá sẩn phẩm này hay chưa.
	// Dựa vào việc kiểm tra xem trong danh sách đánh giá của sản phẩm, có đánh giá nào do người dùng tạo hay không

	const isExistMyReview =
		user && comments.find((item) => item.user.id === user.id);

	useEffect(() => {
		if (detail) {
			getComments();
		}
	}, [detail]);

	return (
		<div className="pt-9">
			<p className="text-2xl font-semiold pb-6">Reviews</p>
			<div className="space-y-10">
				<Card className="">
					{comments.map((item) => (
						<div className="flex flex-col gap-4 mt-4">
							<p>
								{item.user.firstname} {item.user.lastname}
							</p>
							<Rate value={item.rate} />
							<p>{item.content}</p>
						</div>
					))}
				</Card>

				{user && !isExistMyReview && (
					<Card className="">
						<Form
							size="large"
							form={form}
							layout="vertical"
							onFinish={onCreateComment}
						>
							<div>
								<p className="text-xl font-semibold pb-6">
									{user.firstname} {user.lastname}
								</p>
								<Form.Item
									name="rate"
									label="Rate"
									rules={[{ required: true }]}
								>
									<Rate />
								</Form.Item>
								<Form.Item
									name="content"
									label="Content"
									rules={[{ required: true }]}
								>
									<TextArea />
								</Form.Item>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</div>
						</Form>
					</Card>
				)}
			</div>
		</div>
	);
});
