import {BoardActions} from '../store/BoardSlice';
import {GameActions} from '../store/GameSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {FiChevronsRight, FiPause, FiPlay, FiTrash} from 'react-icons/fi';

/**
 * Handles the controls of the board, i.e. tick, play / pause and clear buttons.
 */
export const BoardControls = () => {
	const running = useSelector((state: RootState) => state.game.running);

	const dispatch = useDispatch();

	return <div className="flex flex-row justify-center">
		<button
			className="btn btn-secondary text-2xl"
			onClick={() => dispatch(BoardActions.tick())}
			title="Tick"
		>
			<FiChevronsRight />
		</button>
		<button
			className="mx-8 btn btn-primary text-2xl"
			onClick={() => dispatch(GameActions.toggleRunning())}
			title={running ? 'Stop' : 'Play'}
		>
			{running ? <FiPause /> : <FiPlay />}
		</button>
		<button
			className="btn btn-accent text-2xl"
			onClick={() => dispatch(BoardActions.clear())}
			title="Clear"
		>
			<FiTrash />
		</button>
	</div>;
};