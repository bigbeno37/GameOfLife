import {Board, Board as BoardType, Cell, Row} from './types';

/**
 * Generates a board of the given size with all Cells set to false, i.e. dead.
 *
 * @param rows How many rows to generate.
 * @param columns How many columns to generate.
 */
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

/**
 * Given a Board and a particular Cell, this will determine how many alive neighbours that Cell has. This is used
 * during a tick to determine whether a Cell survives. For the conditions, see {@link getBoardAfterGeneration}.
 *
 * @param board The current board.
 * @param cellIndex The index of the Cell to use of the given Row.
 * @param rowIndex The index of the Row the Cell resides in.
 */
export const getNeighbours = (board: Readonly<BoardType>, cellIndex: number, rowIndex: number): number => {
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

/**
 * Returns a new board with each Cell mapped based on the following conditions:
 * 1. Any live cell with two or three live neighbours survives.
 * 2. Any dead cell with three live neighbours becomes a live cell.
 * 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 *
 * @param board The Board to use.
 */
export const getBoardAfterGeneration = (board: Readonly<Board>): Board => {
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

/**
 * Returns a Board with the given Cell toggled (i.e. if dead, made alive and vice versa)
 *
 * @param board The board to use.
 * @param cellIndex The index of the Cell to use of the given Row.
 * @param rowIndex The index of the Row the Cell resides in.
 */
export const getBoardAfterCellToggle = (board: Readonly<Board>, cellIndex: number, rowIndex: number): Board => {
	const boardClone = [...board];
	const rowClone = [...boardClone[rowIndex]];

	rowClone[cellIndex] = !rowClone[cellIndex];
	boardClone[rowIndex] = rowClone;

	return boardClone;
};