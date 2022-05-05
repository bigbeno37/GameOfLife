type NumberModifierProps = {
	title: string,
	value: number,
	increment: () => void,
	decrement: () => void
};

export const NumberModifier = ({ title, value, increment, decrement }: NumberModifierProps) =>
	<div>
		<button title={`Decrement ${title}`} onClick={decrement}>-</button>
		<span>{value}</span>
		<button title={`Increment ${title}`} onClick={increment}>+</button>
	</div>;