import {Board, Board as BoardType, Cell, Row} from './types';

export const generateEmptyBoard = (rows: number, columns: number): Board => {
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

export const getNeighbours = (board: BoardType, cellIndex: number, rowIndex: number): number => {
	const maxY = board.length;
	const maxX = board[0]?.length ?? 0;

	let neighbours = 0;
	for (let y = -1; y <= 1; y++) {
		const newY = rowIndex + y;

		if (newY < 0 || newY >= maxY) continue;

		for (let x = -1; x <= 1; x++) {
			// We're not gonna count a cell as a neighbour of itself...
			if (y === 0 && x === 0) continue;

			const newX = cellIndex + x;

			if (newX < 0 || newX >= maxX) continue;

			if (board[newY][newX]) neighbours++;
		}
	}

	return neighbours;
};

export const getBoardAfterGeneration = (board: Board): Board => {
	const newBoard: BoardType = [];

	board.forEach((row, rowIndex) => {
		const newRow: Row = [];

		row.forEach((cell, cellIndex) => {
			const neighbours = getNeighbours(board, cellIndex, rowIndex);

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

	return newBoard;
};

export const getBoardAfterCellToggle = (board: Board, cellIndex: number, rowIndex: number): Board => {
	const boardClone = [...board];
	const rowClone = [...boardClone[rowIndex]];

	rowClone[cellIndex] = !rowClone[cellIndex];
	boardClone[rowIndex] = rowClone;

	return boardClone;
};