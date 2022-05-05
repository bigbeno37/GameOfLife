import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateEmptyBoard, getBoardAfterCellToggle, getBoardAfterGeneration} from '../utils';

const initialState = {
	value: generateEmptyBoard(9, 9),
	size: {
		x: 9,
		y: 9
	}
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		incrementX: state => {
			state.size.x++;
		},
		incrementY: state => {
			state.size.y++;
		},
		decrementX: state => {
			state.size.x--;
		},
		decrementY: state => {
			state.size.y--;
		},
		tick: state => {
			state.value = getBoardAfterGeneration(state.value);
		},
		clear: state => {
			state.value = generateEmptyBoard(state.size.y, state.size.x);
		},
		toggleCell: (state, { payload }: PayloadAction<{ cellIndex: number, rowIndex: number }>) => {
			state.value = getBoardAfterCellToggle(state.value, payload.cellIndex, payload.rowIndex);
		}
	}
});

export const BoardActions = boardSlice.actions;
export const BoardReducer = boardSlice.reducer;