import {BoardActions} from '../store/BoardSlice';
import {PlayerPause, PlayerPlay, PlayerTrackNext, Trash} from 'tabler-icons-react';
import {GameActions} from '../store/GameSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const BoardControls = () => {
	const running = useSelector((state: RootState) => state.game.running);

	const dispatch = useDispatch();

	return <>
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
	</>;
};