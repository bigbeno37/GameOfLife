import React from 'react';
import {expect, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {App} from '../src/components/App';

it('changes from start to stop after clicking play button', () => {
	render(<App />);

	expect(screen.queryByText('Stop')).toBeNull();

	fireEvent.click(screen.getByText('Play'));

	expect(screen.queryByText('Play')).toBeNull();
	const stopButton = screen.getByText('Stop');

	fireEvent.click(stopButton);
	screen.getByText('Play');
});