import { call, put } from 'redux-saga/effects';
import { getProductsFailure, getProductsSuccess } from '../redux/ProductSlice';
import { ServiceApi } from '../../services/Api';

export function* getProducts(action) {
	try {
		const res = yield call(ServiceApi.getProducts);
		if (res.ok && res.status === 200) {
			yield put(getProductsSuccess(res.data));
		} else {
			yield put(getProductsFailure());
		}
	} catch (error) {
		yield put(getProductsFailure());
	}
}
