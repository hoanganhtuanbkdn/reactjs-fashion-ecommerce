import { call, put } from 'redux-saga/effects';
import {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	setShowAuthModal,
	updateUserFailure,
	updateUserSuccess,
} from '../redux/AuthSlice';
import { ServiceApi } from '../../services/Api';
import { message } from 'antd';
import { sentRegisterSuccessEmail } from '../../services/Email';

export function* login(action) {
	try {
		const res = yield call(ServiceApi.login, {
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 200) {
			yield put(loginSuccess(res.data));
			// Đóng modal login sau khi login thành công
			yield put(setShowAuthModal(false));
		} else {
			message.error(res.data);
			yield put(loginFailure());
		}
	} catch (error) {
		message.error(error.message);
		yield put(loginFailure());
	}
}

export function* register(action) {
	try {
		const res = yield call(ServiceApi.register, {
			firstname: action.payload.firstname,
			lastname: action.payload.lastname,
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 201) {
			yield put(registerSuccess(res.data));
			// Đóng modal đăng ký sau khi login thành công
			yield put(setShowAuthModal(false));
			// Gửi email thông báo cho người dùng sau khi đăng ký tài khoản thành công
			sentRegisterSuccessEmail(action.payload);
		} else {
			message.error(res.data);
			yield put(registerFailure());
		}
	} catch (error) {
		message.error(error.message);
		yield put(registerFailure());
	}
}

export function* updateUser(action) {
	try {
		const res = yield call(ServiceApi.updateUser, action.payload.id, {
			email: action.payload.email,
			firstname: action.payload.firstname,
			lastname: action.payload.lastname,
		});
		if (res.ok && res.status === 200) {
			yield put(
				updateUserSuccess({
					...action.payload,
				})
			);
			message.success('Updated profile successfully');
		} else {
			message.error(res.data);
			yield put(updateUserFailure());
		}
	} catch (error) {
		message.error(error.message);
		yield put(updateUserFailure());
	}
}
