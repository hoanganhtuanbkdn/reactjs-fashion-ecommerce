import React, { memo, useEffect, useState } from 'react';
import { Button, Modal, Tabs, message, Dropdown, Space } from 'antd';
import { User } from 'lucide-react';
import Login from './Login';
import Register from './Register';
import { useSelector } from 'react-redux';
import { ChevronDown, Power } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../store/redux/AuthSlice';
import { modal } from '../Layout';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../constants/Routers';

const Auth = () => {
	const { token, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (token) {
			setOpen(false);
		}
	}, [token]);

	const onClick = ({ key }) => {
		if (key === '1') {
			navigate(ROUTERS.PROFILE);
		}
		if (key === '2') {
			navigate(ROUTERS.ORDER_HISTORY);
		}
		if (key === '3') {
			modal.confirm({
				title: 'Logging Out',
				content: 'Do you Want to logout?',
				onOk() {
					dispatch(logoutRequest());
				},
				onCancel() {},
			});
		}
	};

	const items = [
		{
			label: 'Profile',
			key: '1',
		},
		{
			label: 'Order History',
			key: '2',
		},
		{
			label: 'Logout',
			key: '3',
		},
	];

	return (
		<>
			{user ? (
				<Dropdown menu={{ items, onClick }}>
					<Space>
						<p>
							{user.firstname} {user.lastname}
						</p>
						<ChevronDown size={16} />
					</Space>
				</Dropdown>
			) : (
				<Button type="text" onClick={showModal}>
					<User color="#222222" size={20} />
				</Button>
			)}

			<Modal open={open} onCancel={handleCancel} footer={[]}>
				<Tabs
					defaultActiveKey="2"
					items={[
						{
							key: 1,
							label: `Login`,
							children: <Login />,
						},
						{
							key: 2,
							label: `Register`,
							children: <Register />,
						},
					]}
				/>
			</Modal>
		</>
	);
};

export default memo(Auth);
