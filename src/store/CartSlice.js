import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	carts: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			state.carts = [action.payload, ...state.carts];
		},
		removeProductToCart: (state, action) => {
			const newCarts = state.carts.filter(
				(item) => item.id !== action.payload.id
			);

			state.carts = newCarts;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProductToCart, removeProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
