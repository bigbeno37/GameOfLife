import {PlayerPause, PlayerPlay, PlayerTrackNext, Trash} from 'tabler-icons-react';
import {NumberModifier} from './NumberModifier';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {BoardActions} from '../store/BoardSlice';
import {GameActions} from '../store/GameSlice';

export const Navbar = () => {
	const boardX = useSelector((state: RootState) => state.board.size.x);
	const boardY = useSelector((state: RootState) => state.board.size.y);
	const running = useSelector((state: RootState) => state.game.running);

	const dispatch = useDispatch();

	return <nav className="flex flex-row justify-between items-center h-16 bg-gray-400 px-4">
		<div>
			<span>Board:
				<NumberModifier value={boardX} increment={() => dispatch(BoardActions.incrementX())} decrement={() => dispatch(BoardActions.decrementX())} />
				<span className="mx-2">by</span>
				<NumberModifier value={boardY} increment={() => dispatch(BoardActions.incrementY())} decrement={() => dispatch(BoardActions.decrementY())} />
			</span>
		</div>
		<div className="flex flex-row justify-center">
			<button
				className="p-3 rounded bg-orange-600 hover:bg-orange-700 text-white"
				onClick={() => dispatch(BoardActions.tick())}
				title="Tick"
			>
				<PlayerTrackNext />
			</button>
			<button
				className="mx-8 p-3 rounded bg-green-600 hover:bg-green-700 text-white"
				onClick={() => dispatch(GameActions.toggleRunning())}
				title={running ? 'Stop' : 'Play'}
			>
				{running ? <PlayerPause /> : <PlayerPlay />}
			</button>
			<button
				className="p-3 text-center rounded bg-red-600 hover:bg-red-700 text-white"
				onClick={() => dispatch(BoardActions.clear())}
				title="Clear"
			>
				<Trash />
			</button>
		</div>
		{/*<div>*/}
		{/*	<input*/}
		{/*		type="number"*/}
		{/*		className={`w-16 ${iterationsPerSecond.invalid && 'border border-red-600'}`}*/}
		{/*		value={iterationsPerSecond.value}*/}
		{/*		onChange={e => iterationsPerSecond.setValue(e.target.value)}*/}
		{/*	/> iterations every second*/}
		{/*</div>*/}
	</nav>;
};