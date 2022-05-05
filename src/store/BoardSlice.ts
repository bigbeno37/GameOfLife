import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {generateEmptyBoard, getBoardAfterCellToggle, getBoardAfterGeneration} from '../utils';

const initialState = {
	value: generateEmptyBoard(9, 9),
	size: {
		x: 9,
		y: 9
	}
};

const clear = (state: Draft<typeof initialState>) => {
	state.value = generateEmptyBoard(state.size.y, state.size.x);
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		incrementX: state => {
			state.size.x++;
			clear(state);
		},
		incrementY: state => {
			state.size.y++;
			clear(state);
		},
		decrementX: state => {
			state.size.x--;
			clear(state);
		},
		decrementY: state => {
			state.size.y--;
			clear(state);
		},
		tick: state => {
			state.value = getBoardAfterGeneration(state.value);
		},
		clear,
		toggleCell: (state, { payload }: PayloadAction<{ cellIndex: number, rowIndex: number }>) => {
			state.value = getBoardAfterCellToggle(state.value, payload.cellIndex, payload.rowIndex);
		}
	}
});

export const BoardActions = boardSlice.actions;
export const BoardReducer = boardSlice.reducer;