import { call, put } from 'redux-saga/effects';
import {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
} from '../redux/AuthSlice';
import { ServiceApi } from '../../services/Api';
import { message } from 'antd';

export function* login(action) {
	try {
		const res = yield call(ServiceApi.login, {
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 200) {
			yield put(loginSuccess(res.data));
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
			email: action.payload.email,
			password: action.payload.password,
		});
		console.log(222, res);
		if (res.ok && res.status === 201) {
			yield put(registerSuccess(res.data));
		} else {
			message.error(res.data);
			yield put(registerFailure());
		}
	} catch (error) {
		message.error(error.message);
		yield put(registerFailure());
	}
}
