import React from 'react';
import {expect, it, afterEach, test} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import {App} from '../src/components/App';
import userEvent from '@testing-library/user-event';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(cleanup);

const getCell = (cellIndex: number, rowIndex: number) => screen.getByTestId(`${cellIndex}-${rowIndex}`);
const isAlive = (cellIndex: number, rowIndex: number) => getCell(cellIndex, rowIndex).classList.contains('bg-black');
const click = userEvent.click;
const toggleCell = (cellIndex: number, rowIndex: number) => click(getCell(cellIndex, rowIndex));
const tick = () => click(screen.getByText('Tick'));

it('changes from start to stop after clicking play button', async () => {
	render(<App />);

	expect(screen.queryByText('Stop')).toBeNull();

	await click(screen.getByText('Play'));

	expect(screen.queryByText('Play')).toBeNull();
	const stopButton = screen.getByText('Stop');

	await click(stopButton);
	screen.getByText('Play');
});

it('allows cells to be toggled with a click', async () => {
	render(<App />);

	expect(isAlive(0, 0)).toBeFalsy();

	await toggleCell(0, 0);

	expect(isAlive(0, 0)).toBeTruthy();

	await toggleCell(0, 0);

	expect(isAlive(0, 0)).toBeFalsy();
});

test('a cell without any neighbours dies', async () => {
	render(<App />);

	await toggleCell(0, 0);
	expect(isAlive(0, 0)).toBeTruthy();

	await tick();
	expect(isAlive(0, 0)).toBeFalsy();
});

test('a cell with two neighbours survives', async () => {
	render(<App />);

	await toggleCell(0, 0);
	await toggleCell(0, 1);
	await toggleCell(1, 0);

	expect(isAlive(0, 0)).toBeTruthy();

	await tick();

	expect(isAlive(0, 0)).toBeTruthy();
});