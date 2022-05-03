import {useEffect, useMemo, useState} from 'react';
import {Navbar} from './Navbar';

type Cell = boolean

type Row = Cell[];
type Board = Row[];

export const App = () => {
	const [boardXValue, setBoardXValue] = useState('9');
	const boardX = useMemo(() => Number.parseInt(boardXValue), [boardXValue]);

	const [boardYValue, setBoardYValue] = useState('9');
	const boardY = useMemo(() => Number.parseInt(boardYValue), [boardYValue]);

	const [running, setRunning] = useState(false);

	const [iterationsPerSecondValue, setIterationsPerSecondValue] = useState('2');
	const iterationsPerSecond = Number.parseInt(iterationsPerSecondValue);

	const [board, setBoard] = useState<Board>([]);

	// IDEA: Instead of destroying board, add new columns / rows while retaining existing data
	useEffect(() => {
		if (!boardX || !boardY) return;

		const constructedBoard: Row[] = [];

		for (let rowIndex = 0; rowIndex < boardY; rowIndex++) {
			const row: Cell[] = [];

			for (let columnIndex = 0; columnIndex < boardX; columnIndex++) {
				row.push(false);
			}

			constructedBoard.push(row);
		}

		setBoard(constructedBoard);
	}, [boardY, boardX]);

	const toggleCell = (row: number, cellIndex: number) => {
		const boardClone = [...board];
		const rowClone = [...boardClone[row]];

		rowClone[cellIndex] = !rowClone[cellIndex];
		boardClone[row] = rowClone;

		setBoard(boardClone);
	};

	return <div className="h-full flex flex-col">
		<Navbar
			boardX={{ value: boardXValue, setValue: setBoardXValue, invalid: isNaN(boardX) }}
			boardY={{ value: boardYValue, setValue: setBoardYValue, invalid: isNaN(boardY) }}
			running={{ value: running, toggle: () => setRunning(!running) }}
			iterationsPerSecond={{ value: iterationsPerSecondValue, setValue: setIterationsPerSecondValue, invalid: isNaN(iterationsPerSecond) }}
		/>
		<div className="flex-grow flex flex-col">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="w-full flex flex-row grow">
					{row.map((cell, cellIndex) => (
						<div key={`${rowIndex}-${cellIndex}`} className={`border border-black grow ${cell && 'bg-black'}`} onClick={() => toggleCell(rowIndex, cellIndex)}/>
					))}
				</div>
			))}
		</div>
	</div>;
};
