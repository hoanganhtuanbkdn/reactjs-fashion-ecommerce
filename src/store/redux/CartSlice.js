import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	carts: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			const currentCart = [...state.carts];
			const existingProductIndex = currentCart.findIndex(
				(item) => item.id === action.payload.id
			);
			if (existingProductIndex !== -1) {
				// Product already exists in the cart, update quantity
				currentCart[existingProductIndex].quantity += 1;
				state.carts = currentCart;
			} else {
				// Product doesn't exist in the cart, add it
				state.carts = [
					{ quantity: 1, ...action.payload },
					...currentCart,
				];
			}
		},
		removeProductToCart: (state, action) => {
			const currentCart = [...state.carts];
			const existingProductIndex = currentCart.findIndex(
				(item) => item.id === action.payload.id
			);
			if (existingProductIndex !== -1) {
				if (currentCart[existingProductIndex].quantity === 1) {
					state.carts = currentCart.filter(
						(item) => item.id !== action.payload.id
					);
				} else {
					currentCart[existingProductIndex].quantity -= 1;
					state.carts = currentCart;
				}
			}
		},
		removeAllProductToCart: (state, action) => {
			const currentCart = [...state.carts];

			const newCart = currentCart.filter(
				(item) => item.id !== action.payload.id
			);

			state.carts = newCart;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProductToCart, removeProductToCart, removeAllProductToCart } =
	cartSlice.actions;

export default cartSlice.reducer;
