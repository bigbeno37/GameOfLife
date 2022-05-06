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
const expectCellToNotExist = (cellIndex: number, rowIndex: number) => expect(screen.queryByTestId(`${cellIndex}-${rowIndex}`)).toBeNull();
const isAlive = (cellIndex: number, rowIndex: number) => getCell(cellIndex, rowIndex).classList.contains('bg-black');
const click = userEvent.click;
const toggleCell = (cellIndex: number, rowIndex: number) => click(getCell(cellIndex, rowIndex));
const tick = () => click(screen.getByTitle('Tick'));
const isDisabled = (element: HTMLElement) => (element as HTMLButtonElement).disabled;
const getNavbarControl = (title: string) => Number.parseInt(screen.getByTestId(`${title} value`).textContent ?? '-1');
const getBoardColumns = () => getNavbarControl('board columns');
const getBoardRows = () => getNavbarControl('board rows');
const getPlaybackRate = () => getNavbarControl('updates per second');

it('changes from start to stop after clicking play button', async () => {
	expect(screen.queryByTitle('Stop')).toBeNull();

	await click(screen.getByTitle('Play'));

	expect(screen.queryByTitle('Play')).toBeNull();
	const stopButton = screen.getByTitle('Stop');

	await click(stopButton);
	screen.getByTitle('Play');
});

it('can increment and decrement board columns', async () => {
	expect(getBoardColumns()).toBe(9);
	expectCellToNotExist(9, 8);

	await click(screen.getByTitle('Increment board columns'));

	getCell(9, 8);
	expect(getBoardColumns()).toBe(10);

	await click(screen.getByTitle('Decrement board columns'));

	expectCellToNotExist(9, 8);
	expect(getBoardColumns()).toBe(9);
});

it('can increment and decrement board rows', async () => {
	expect(getBoardRows()).toBe(9);
	expectCellToNotExist(8, 9);

	await click(screen.getByTitle('Increment board rows'));

	getCell(8, 9);
	expect(getBoardRows()).toBe(10);

	await click(screen.getByTitle('Decrement board rows'));

	expectCellToNotExist(8, 9);
	expect(getBoardRows()).toBe(9);
});

it('can increment and decrement playback rate', async () => {
	expect(getPlaybackRate()).toBe(1);

	await click(screen.getByTitle('Increment updates per second'));

	expect(getPlaybackRate()).toBe(2);

	await click(screen.getByTitle('Decrement updates per second'));

	expect(getPlaybackRate()).toBe(1);
});

it('disables the decrement playback rate button if the playback rate is 1', async () => {
	expect(getPlaybackRate()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement updates per second'))).toBeTruthy();

	// Attempt to click the disabled button
	await click(screen.getByTitle('Decrement updates per second'));

	expect(getPlaybackRate()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement updates per second'))).toBeTruthy();

	await click(screen.getByTitle('Increment updates per second'));

	expect(getPlaybackRate()).toBe(2);
	expect(isDisabled(screen.getByTitle('Decrement updates per second'))).toBeFalsy();

	await click(screen.getByTitle('Decrement updates per second'));

	expect(getPlaybackRate()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement updates per second'))).toBeTruthy();
});

it('disables the decrement columns button if the columns value is 1', async () => {
	expect(getBoardColumns()).toBe(9);

	for (let i = 0; i < 8; i++) {
		await click(screen.getByTitle('Decrement board columns'));
	}

	expect(getBoardColumns()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board columns'))).toBeTruthy();

	// Attempt to click the disabled button
	await click(screen.getByTitle('Decrement board columns'));

	expect(getBoardColumns()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board columns'))).toBeTruthy();

	await click(screen.getByTitle('Increment board columns'));

	expect(getBoardColumns()).toBe(2);
	expect(isDisabled(screen.getByTitle('Decrement board columns'))).toBeFalsy();

	await click(screen.getByTitle('Decrement board columns'));

	expect(getBoardColumns()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board columns'))).toBeTruthy();
});

it('disables the decrement rows button if the rows value is 1', async () => {
	expect(getBoardRows()).toBe(9);

	for (let i = 0; i < 8; i++) {
		await click(screen.getByTitle('Decrement board rows'));
	}

	expect(getBoardRows()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board rows'))).toBeTruthy();

	// Attempt to click the disabled button
	await click(screen.getByTitle('Decrement board rows'));

	expect(getBoardRows()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board rows'))).toBeTruthy();

	await click(screen.getByTitle('Increment board rows'));

	expect(getBoardRows()).toBe(2);
	expect(isDisabled(screen.getByTitle('Decrement board rows'))).toBeFalsy();

	await click(screen.getByTitle('Decrement board rows'));

	expect(getBoardRows()).toBe(1);
	expect(isDisabled(screen.getByTitle('Decrement board rows'))).toBeTruthy();
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