import {PlayerPlay, PlayerStop, PlayerTrackNext, Trash} from 'tabler-icons-react';

type NavbarProps = {
	boardX: {
		invalid: boolean,
		value: string,
		setValue: (newValue: string) => void
	},
	boardY: {
		invalid: boolean,
		value: string,
		setValue: (newValue: string) => void
	},
	running: {
		value: boolean,
		toggle: () => void
	},
	onTick: () => void,
	onClear: () => void,
	iterationsPerSecond: {
		invalid: boolean,
		value: string,
		setValue: (newValue: string) => void
	}
};

export const Navbar = ({boardX, boardY, running, onTick, onClear, iterationsPerSecond}: NavbarProps) => {
	return <nav className="flex flex-row justify-between items-center h-16 bg-gray-400 px-4">
		<div>
			<span>Board:
				<input
					type="number"
					className={`ml-2 w-16 ${boardX.invalid && 'border border-red-600'}`}
					value={boardX.value}
					onChange={e => boardX.setValue(e.target.value)}
				/>
				<span className="mx-2">by</span>
				<input
					type="number"
					className={`w-16 ${boardY.invalid && 'border border-red-600'}`}
					value={boardY.value}
					onChange={e => boardY.setValue(e.target.value)}
				/>
			</span>
		</div>
		<div className="flex flex-row justify-center">
			<button
				className="p-3 rounded bg-orange-600 hover:bg-orange-700 text-white"
				onClick={onTick}
				title="Tick"
			>
				<PlayerTrackNext />
			</button>
			<button
				className="mx-8 p-3 rounded bg-green-600 hover:bg-green-700 text-white"
				onClick={running.toggle}
				title={running.value ? 'Stop' : 'Play'}
			>
				{running.value ? <PlayerStop /> : <PlayerPlay />}
			</button>
			<button
				className="p-3 text-center rounded bg-red-600 hover:bg-red-700 text-white"
				onClick={onClear}
				title="Clear"
			>
				<Trash />
			</button>
		</div>
		<div>
			<input
				type="number"
				className={`w-16 ${iterationsPerSecond.invalid && 'border border-red-600'}`}
				value={iterationsPerSecond.value}
				onChange={e => iterationsPerSecond.setValue(e.target.value)}
			/> iterations every second
		</div>
	</nav>;
};