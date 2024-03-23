import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './CartSlice';
import productReducer from './ProductSlice';
import authReducer from './AuthSlice';

export const rootReducer = combineReducers({
	cart: cartReducer,
	product: productReducer,
	auth: authReducer,
});
