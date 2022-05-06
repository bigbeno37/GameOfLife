import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
	/**
	 * Whether the board should automatically run ticks every particular interval of time.
	 */
	running: false,

	/**
	 * Represents how many times a second a tick should be run.
	 */
	playbackRate: 1
};

export const GameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleRunning: state => {
			state.running = !state.running;
		},
		incrementPlaybackRate: state => {
			state.playbackRate++;
		},
		decrementPlaybackRate: state => {
			state.playbackRate -= state.playbackRate > 0 ? 1 : 0;
		}
	}
});

export const GameActions = GameSlice.actions;
export const GameReducer = GameSlice.reducer;