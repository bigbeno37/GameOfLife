import {useEffect, useMemo, useState} from 'react';
import {Navbar} from './Navbar';
import {Board} from './Board';
import type {Board as BoardType, Cell, Row} from '../types';

const generateEmptyBoard = (rows: number, columns: number) => {
	const constructedBoard: Row[] = [];

	for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
		const row: Cell[] = [];

		for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
			row.push(false);
		}

		constructedBoard.push(row);
	}

	return constructedBoard;
};

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

	const getNeighbours = (cellIndex: number, rowIndex: number): number => {
		let neighbours = 0;
		for (let y = -1; y <= 1; y++) {
			const newY = rowIndex + y;
			
			if (newY < 0 || newY >= boardY) continue;
			
			for (let x = -1; x <= 1; x++) {
				const newX = cellIndex + x;
				
				// We're not gonna count a cell as a neighbour of itself...
				if (newY === 0 && newX === 0) continue;
				
				if (newX < 0 || newX >= boardX) continue;
				
				if (board[newY][newX]) neighbours++;
			}
		}
		
		return neighbours;
	};
	
	const handleTick = () => {
		const newBoard: BoardType = [];
		
		board.forEach((row, rowIndex) => {
			const newRow: Row = [];
			
			row.forEach((cell, cellIndex) => {
				const neighbours = getNeighbours(cellIndex, rowIndex);
				
				const isAliveAndNotOverpopulated = cell && (neighbours === 2 || neighbours === 3);
				const isDeadAndNextToThreeNeighbours = !cell && neighbours === 3; 
				
				if (isAliveAndNotOverpopulated || isDeadAndNextToThreeNeighbours) {
					newRow.push(true);
				} else {
					newRow.push(false);
				}
			});
			
			newBoard.push(newRow);
		});

		setBoard(newBoard);
	};

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
			onTick={handleTick}
			onClear={clearBoard}
			iterationsPerSecond={{ value: iterationsPerSecondValue, setValue: setIterationsPerSecondValue, invalid: isNaN(iterationsPerSecond) }}
		/>
		<Board board={board} toggleCell={toggleCell} />
	</div>;
};
