import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	fetching: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProductsRequest: (state, action) => {
			state.fetching = true;
		},
		getProductsSuccess: (state, action) => {
			state.products = action.payload;
			state.fetching = false;
		},
		getProductsFailure: (state, action) => {
			state.products = [];
			state.fetching = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { getProductsRequest, getProductsSuccess, getProductsFailure } =
	productSlice.actions;

export default productSlice.reducer;
