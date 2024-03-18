import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './CartSlice';
import productReducer from './ProductSlice';

export const rootReducer = combineReducers({
	cart: cartReducer,
	product: productReducer,
});
