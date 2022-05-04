import React from 'react';
import {expect, it, afterEach} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {App} from '../src/components/App';
import userEvent from '@testing-library/user-event';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(cleanup);

it('changes from start to stop after clicking play button', async () => {
	render(<App />);

	expect(screen.queryByText('Stop')).toBeNull();

	await userEvent.click(screen.getByText('Play'));

	expect(screen.queryByText('Play')).toBeNull();
	const stopButton = screen.getByText('Stop');

	fireEvent.click(stopButton);
	screen.getByText('Play');
});

it('allows cells to be toggled with a click', async () => {
	render(<App />);

	const topLeftCell = screen.getByTestId('0-0');
	expect(topLeftCell.classList.contains('bg-black')).toBeFalsy();

	await userEvent.click(topLeftCell);

	expect(topLeftCell.classList.contains('bg-black')).toBeTruthy();

	await userEvent.click(topLeftCell);

	expect(topLeftCell.classList.contains('bg-black')).toBeFalsy();
});