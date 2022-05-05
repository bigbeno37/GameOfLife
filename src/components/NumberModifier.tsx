type NumberModifierProps = {
	value: number,
	increment: () => void,
	decrement: () => void
};

export const NumberModifier = ({ value, increment, decrement }: NumberModifierProps) =>
	<div>
		<button onClick={decrement}>-</button>
		<span>{value}</span>
		<button onClick={increment}>+</button>
	</div>;