import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialState = {
	user: null,
	token: null,
	fetching: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest: (state) => {
			state.fetching = true;
		},
		loginSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.accessToken;
			state.fetching = false;
		},
		loginFailure: (state) => {
			state.user = null;
			state.token = null;
			state.fetching = false;
		},
		registerRequest: (state) => {
			state.fetching = true;
		},
		registerSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.accessToken;
			state.fetching = false;
		},
		registerFailure: (state) => {
			state.user = null;
			state.token = null;
			state.fetching = false;
		},
		logoutRequest: (state) => {
			state.user = null;
			state.token = null;
			state.fetching = false;
		},
		updateUserRequest: (state) => {
			state.fetching = true;
		},
		updateUserSuccess: (state, action) => {
			state.user = action.payload;
			state.fetching = false;
		},
		updateUserFailure: (state) => {
			state.fetching = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	registerRequest,
	registerSuccess,
	registerFailure,
	logoutRequest,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
} = authSlice.actions;

export const AUTH_PERSIST_KEY = 'authPersist';

export const AuthReducer = persistReducer(
	{
		storage,
		key: AUTH_PERSIST_KEY,
		whitelist: ['token', 'user'],
	},
	authSlice.reducer
);

export default AuthReducer;
