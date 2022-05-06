import React from 'react';
import {expect, it, afterEach, test, beforeEach} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import {App} from '../src/components/App';
import userEvent from '@testing-library/user-event';
import {createAppStore} from '../src/store/store';
import { Provider } from 'react-redux';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
	render(<Provider store={createAppStore()}><App /></Provider>);
});

afterEach(cleanup);

const getCell = (cellIndex: number, rowIndex: number) => screen.getByTestId(`${cellIndex}-${rowIndex}`);
const isAlive = (cellIndex: number, rowIndex: number) => getCell(cellIndex, rowIndex).classList.contains('bg-black');
const click = userEvent.click;
const toggleCell = (cellIndex: number, rowIndex: number) => click(getCell(cellIndex, rowIndex));
const tick = () => click(screen.getByTitle('Tick'));

it('changes from start to stop after clicking play button', async () => {
	expect(screen.queryByTitle('Stop')).toBeNull();

	await click(screen.getByTitle('Play'));

	expect(screen.queryByTitle('Play')).toBeNull();
	const stopButton = screen.getByTitle('Stop');

	await click(stopButton);
	screen.getByTitle('Play');
});

it('can increment and decrement board columns', async () => {
	expect(screen.getAllByText('9')).toHaveLength(2);
	expect(screen.queryByText('10')).toBeNull();
	expect(screen.queryByTestId('9-8')).toBeNull();

	await click(screen.getByTitle('Increment board columns'));

	screen.getByTestId('9-8');
	screen.getByText('10');
	screen.getByText('9');

	await click(screen.getByTitle('Decrement board columns'));

	expect(screen.queryByTestId('9-8')).toBeNull();
	expect(screen.getAllByText('9')).toHaveLength(2);
	expect(screen.queryByText('10')).toBeNull();
});

it('can increment and decrement board rows', async () => {
	expect(screen.getAllByText('9')).toHaveLength(2);
	expect(screen.queryByText('10')).toBeNull();
	expect(screen.queryByTestId('8-9')).toBeNull();

	await click(screen.getByTitle('Increment board rows'));

	screen.getByTestId('8-9');
	screen.getByText('10');
	screen.getByText('9');

	await click(screen.getByTitle('Decrement board rows'));

	expect(screen.queryByTestId('8-9')).toBeNull();
	expect(screen.getAllByText('9')).toHaveLength(2);
	expect(screen.queryByText('10')).toBeNull();
});

it('can increment and decrement playback rate', async () => {
	expect(screen.queryByText('2')).toBeNull();

	await click(screen.getByTitle('Increment updates per second'));

	screen.getByText('2');
	expect(screen.queryByText('1')).toBeNull();

	await click(screen.getByTitle('Decrement updates per second'));

	screen.getByText('1');
	expect(screen.queryByText('2')).toBeNull();
});

it('disables the decrement playback rate button if the playback rate is 1', () => {
	expect((screen.getByTitle('Decrement updates per second') as HTMLButtonElement).disabled).toBeTruthy();
});

it('allows cells to be toggled with a click', async () => {
	expect(isAlive(0, 0)).toBeFalsy();

	await toggleCell(0, 0);

	expect(isAlive(0, 0)).toBeTruthy();

	await toggleCell(0, 0);

	expect(isAlive(0, 0)).toBeFalsy();
});

it('can clear the board by clicking clear', async () => {
	await toggleCell(0, 0);
	expect(isAlive(0, 0)).toBeTruthy();

	await click(screen.getByTitle('Clear'));

	expect(isAlive(0, 0)).toBeFalsy();
});

test('a cell without any neighbours dies', async () => {
	await toggleCell(0, 0);
	expect(isAlive(0, 0)).toBeTruthy();

	await tick();
	expect(isAlive(0, 0)).toBeFalsy();
});

test('a cell with two neighbours survives', async () => {
	await toggleCell(0, 0);
	await toggleCell(0, 1);
	await toggleCell(1, 0);

	expect(isAlive(0, 0)).toBeTruthy();

	await tick();

	expect(isAlive(0, 0)).toBeTruthy();
});

test('a cell with three neighbours survives', async () => {
	await toggleCell(1, 1);
	await toggleCell(1, 2);
	await toggleCell(2, 1);
	await toggleCell(2, 2);

	expect(isAlive(1, 1)).toBeTruthy();
	expect(isAlive(1, 2)).toBeTruthy();
	expect(isAlive(2, 1)).toBeTruthy();
	expect(isAlive(2, 2)).toBeTruthy();

	await tick();

	expect(isAlive(1, 1)).toBeTruthy();
	expect(isAlive(1, 2)).toBeTruthy();
	expect(isAlive(2, 1)).toBeTruthy();
	expect(isAlive(2, 2)).toBeTruthy();
});