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
	return <nav className="flex flex-row justify-between items-center h-12 bg-gray-400 px-4">
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
		<div>
			<button onClick={running.toggle}>{running.value ? 'Stop' : 'Play'}</button>
			<button className="mx-8" onClick={onTick}>Tick</button>
			<button onClick={onClear}>Clear</button>
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