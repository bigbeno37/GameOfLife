import {BoardActions} from '../store/BoardSlice';
import {PlayerPause, PlayerPlay, PlayerTrackNext, Trash} from 'tabler-icons-react';
import {GameActions} from '../store/GameSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const BoardControls = () => {
	const running = useSelector((state: RootState) => state.game.running);

	const dispatch = useDispatch();

	return <div className="flex flex-row justify-center">
		<button
			className="btn btn-secondary"
			onClick={() => dispatch(BoardActions.tick())}
			title="Tick"
		>
			<PlayerTrackNext />
		</button>
		<button
			className="mx-8 btn btn-primary"
			onClick={() => dispatch(GameActions.toggleRunning())}
			title={running ? 'Stop' : 'Play'}
		>
			{running ? <PlayerPause /> : <PlayerPlay />}
		</button>
		<button
			className="btn btn-accent"
			onClick={() => dispatch(BoardActions.clear())}
			title="Clear"
		>
			<Trash />
		</button>
	</div>;
};