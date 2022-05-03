import {useEffect, useMemo, useState} from 'react';

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
		<nav className="flex flex-row justify-between items-center h-12 bg-gray-400 px-4">
			<div>
				<span>Board:
					<input type="number" className={`ml-2 w-16 ${isNaN(boardX) && 'border border-red-600'}`} value={boardXValue} onChange={e => setBoardXValue(e.target.value)}/>
					<span className="mx-2">by</span>
					<input type="number" className={`w-16 ${isNaN(boardY) && 'border border-red-600'}`} value={boardY} onChange={e => setBoardYValue(e.target.value)}/>
				</span>
			</div>
			<div>
				<button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Play'}</button>
				<button className="mx-8">Tick</button>
				<button>Clear</button>
			</div>
			<div>
				<input type="number" className={`w-16 ${isNaN(iterationsPerSecond) && 'border border-red-600'}`} value={iterationsPerSecondValue} onChange={e => setIterationsPerSecondValue(e.target.value)}/> iterations every second
			</div>
		</nav>
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
