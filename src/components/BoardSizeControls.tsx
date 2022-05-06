import {NumberModifier} from './NumberModifier';
import {BoardActions} from '../store/BoardSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';

/**
 * Handles the controls relating to the size of the board.
 */
export const BoardSizeControls = () => {
	const boardColumns = useSelector((state: RootState) => state.board.size.columns);
	const boardRows = useSelector((state: RootState) => state.board.size.rows);
	const dispatch = useDispatch();

	return <div className="flex flex-row">
		<NumberModifier
			title="board columns"
			value={boardColumns}
			increment={() => dispatch(BoardActions.addColumn())}
			decrement={() => dispatch(BoardActions.removeColumn())}
		/>
		<span className="mx-2 lg:mx-8 text-white text-xl self-center">by</span>
		<NumberModifier
			title="board rows"
			value={boardRows}
			increment={() => dispatch(BoardActions.addRow())}
			decrement={() => dispatch(BoardActions.removeRow())}
		/>
	</div>;
};