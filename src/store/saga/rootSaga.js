import { takeLatest, all } from 'redux-saga/effects';
import { getProductsRequest } from '../redux/ProductSlice';
import { getProducts } from './ProductSaga';
import {
	loginRequest,
	registerRequest,
	updateUserRequest,
} from '../redux/AuthSlice';
import { login, register, updateUser } from './AuthSaga';

export default function* rootSaga() {
	yield all([takeLatest(getProductsRequest.type, getProducts)]);
	yield all([takeLatest(loginRequest.type, login)]);
	yield all([takeLatest(registerRequest.type, register)]);
	yield all([takeLatest(updateUserRequest.type, updateUser)]);
}
