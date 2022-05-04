import {useEffect, useMemo, useState} from 'react';
import {Navbar} from './Navbar';
import {Board} from './Board';
import type {Board as BoardType, Row} from '../types';
import {generateEmptyBoard, getBoardAfterCellToggle, getBoardAfterGeneration, getNeighbours} from '../utils';

export const App = () => {
	const [boardXValue, setBoardXValue] = useState('9');
	const boardX = useMemo(() => Number.parseInt(boardXValue), [boardXValue]);

	const [boardYValue, setBoardYValue] = useState('9');
	const boardY = useMemo(() => Number.parseInt(boardYValue), [boardYValue]);

	const [running, setRunning] = useState(false);

	const [iterationsPerSecondValue, setIterationsPerSecondValue] = useState('2');
	const iterationsPerSecond = Number.parseInt(iterationsPerSecondValue);

	const [board, setBoard] = useState<BoardType>([]);

	const clearBoard = () => setBoard(generateEmptyBoard(boardY, boardX));

	// IDEA: Instead of destroying board, add new columns / rows while retaining existing data
	useEffect(() => {
		if (!boardX || !boardY) return;

		clearBoard();
	}, [boardY, boardX]);
	
	const handleTick = () => {
		setBoard(getBoardAfterGeneration);
	};

	const toggleCell = (rowIndex: number, cellIndex: number) => {
		setBoard(getBoardAfterCellToggle(board, rowIndex, cellIndex));
	};

	return <div className="h-full flex flex-col">
		<Navbar
			boardX={{ value: boardXValue, setValue: setBoardXValue, invalid: isNaN(boardX) }}
			boardY={{ value: boardYValue, setValue: setBoardYValue, invalid: isNaN(boardY) }}
			running={{ value: running, toggle: () => setRunning(!running) }}
			onTick={handleTick}
			onClear={clearBoard}
			iterationsPerSecond={{ value: iterationsPerSecondValue, setValue: setIterationsPerSecondValue, invalid: isNaN(iterationsPerSecond) }}
		/>
		<Board board={board} toggleCell={toggleCell} />
	</div>;
};
