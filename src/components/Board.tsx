import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {BoardActions} from '../store/BoardSlice';

export const Board = () => {
	const board = useSelector((state: RootState) => state.board.value);
	const dispatch = useDispatch();

	return <div className="flex-grow flex flex-col bg-white">
		{board.map((row, rowIndex) => (
			<div key={rowIndex} className="w-full flex flex-row grow">
				{row.map((cell, cellIndex) => (
					<div
						key={`${cellIndex}-${rowIndex}`}
						data-testid={`${cellIndex}-${rowIndex}`}
						className={`border border-black grow cursor-pointer ${cell ? 'bg-black hover:bg-gray-800' : 'hover:bg-gray-200'}`}
						onClick={() => dispatch(BoardActions.toggleCell({ cellIndex, rowIndex }))}
					/>
				))}
			</div>
		))}
	</div>;
};