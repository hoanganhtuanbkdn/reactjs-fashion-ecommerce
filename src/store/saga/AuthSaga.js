import { call, put } from 'redux-saga/effects';
import {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	updateUserFailure,
	updateUserSuccess,
} from '../redux/AuthSlice';
import { ServiceApi } from '../../services/Api';
import { message } from 'antd';
import emailjs from '@emailjs/browser';

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
			firstname: action.payload.firstname,
			lastname: action.payload.lastname,
			email: action.payload.email,
			password: action.payload.password,
		});
		if (res.ok && res.status === 201) {
			yield put(registerSuccess(res.data));
			emailjs.send(
				'service_o9xzkin',
				'template_nmp6tew',
				{
					email: action.payload.email,
					name:
						action.payload.firstname +
						' ' +
						action.payload.lastname,
				},
				{
					publicKey: 'rmmm_AWYPrBXmj97f',
				}
			);
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
