import type { Board as BoardType } from '../types';

export type BoardProps = {
	board: BoardType,
	toggleCell: (rowIndex: number, cellIndex: number) => void
};

export const Board = ({board, toggleCell}: BoardProps) => {
	return <div className="flex-grow flex flex-col">
		{board.map((row, rowIndex) => (
			<div key={rowIndex} className="w-full flex flex-row grow">
				{row.map((cell, cellIndex) => (
					<div
						key={`${cellIndex}-${rowIndex}`}
						data-testid={`${cellIndex}-${rowIndex}`}
						className={`border border-black grow cursor-pointer ${cell ? 'bg-black hover:bg-gray-800' : 'hover:bg-gray-200'}`}
						onClick={() => toggleCell(rowIndex, cellIndex)}
					/>
				))}
			</div>
		))}
	</div>;
};