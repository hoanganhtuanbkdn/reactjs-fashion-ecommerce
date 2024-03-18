import { call, put } from 'redux-saga/effects';
import { getProductsFailure, getProductsSuccess } from '../redux/ProductSlice';
import { ServiceApi } from '../../services/Api';

export function* getProducts(action) {
	try {
		const products = yield call(ServiceApi.getProducts);
		yield put(getProductsSuccess(products.data));
	} catch (error) {
		yield put(getProductsFailure());
	}
}
