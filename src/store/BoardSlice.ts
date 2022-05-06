import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {generateEmptyBoard, getBoardAfterCellToggle, getBoardAfterGeneration} from '../utils';

const initialState = {
	/**
	 * Represents the current board. By default, this will be initialised to a 9x9 array of false values.
	 */
	value: generateEmptyBoard(9, 9),
	size: {
		columns: 9,
		rows: 9
	}
};

/**
 * Clears the board, i.e. sets all values to false.
 */
const clear = (state: Draft<typeof initialState>) => {
	state.value = generateEmptyBoard(state.size.rows, state.size.columns);
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		addColumn: state => {
			state.size.columns++;
			clear(state);
		},
		addRow: state => {
			state.size.rows++;
			clear(state);
		},
		removeColumn: state => {
			state.size.columns--;
			clear(state);
		},
		removeRow: state => {
			state.size.rows--;
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