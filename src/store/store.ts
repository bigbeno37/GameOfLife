import {configureStore} from '@reduxjs/toolkit';
import {BoardReducer} from './BoardSlice';
import {GameReducer} from './GameSlice';

export const createAppStore = () => configureStore({
	reducer: {
		board: BoardReducer,
		game: GameReducer
	}
});

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;