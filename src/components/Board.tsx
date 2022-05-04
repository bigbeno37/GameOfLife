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
					<div key={`${rowIndex}-${cellIndex}`} className={`border border-black grow ${cell && 'bg-black'}`} onClick={() => toggleCell(rowIndex, cellIndex)}/>
				))}
			</div>
		))}
	</div>;
};