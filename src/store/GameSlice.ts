import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
	running: false
};

export const GameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleRunning: state => {
			state.running = !state.running;
		}
	}
});

export const GameActions = GameSlice.actions;
export const GameReducer = GameSlice.reducer;