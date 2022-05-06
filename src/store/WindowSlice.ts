import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState = {
	width: window.innerWidth
};

export const WindowSlice = createSlice({
	name: 'window',
	initialState,
	reducers: {
		setWidth: (state, action: PayloadAction<number>) => {
			state.width = action.payload;
		}
	}
});

export const WindowActions = WindowSlice.actions;
export const WindowReducer = WindowSlice.reducer;