import { takeLatest, all } from 'redux-saga/effects';
import { getProductsRequest } from '../redux/ProductSlice';
import { getProducts } from './ProductSaga';

export default function* rootSaga() {
	yield all([takeLatest(getProductsRequest.type, getProducts)]);
}
