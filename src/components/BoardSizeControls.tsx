import {NumberModifier} from './NumberModifier';
import {BoardActions} from '../store/BoardSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const BoardSizeControls = () => {
	const boardX = useSelector((state: RootState) => state.board.size.x);
	const boardY = useSelector((state: RootState) => state.board.size.y);
	const dispatch = useDispatch();

	return <div className="flex flex-row">
		<NumberModifier
			title="board columns"
			value={boardX}
			increment={() => dispatch(BoardActions.incrementX())}
			decrement={() => dispatch(BoardActions.decrementX())}
		/>
		<span className="mx-8 text-white text-xl self-center">by</span>
		<NumberModifier
			title="board rows"
			value={boardY}
			increment={() => dispatch(BoardActions.incrementY())}
			decrement={() => dispatch(BoardActions.decrementY())}
		/>
	</div>;
};