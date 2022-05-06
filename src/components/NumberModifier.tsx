import {Minus, Plus} from 'tabler-icons-react';

type NumberModifierProps = {
	title: string,
	value: number,
	minimum?: number,
	increment: () => void,
	decrement: () => void
};

export const NumberModifier = ({ title, value, minimum, increment, decrement }: NumberModifierProps) =>
	<div className="flex flex-row justify-center">
		<button
			className="btn btn-primary"
			title={`Decrement ${title}`}
			onClick={decrement}
			disabled={value <= (minimum ?? 1)}
		>
			<Minus />
		</button>
		<span className="text-2xl mx-4 text-white self-center" data-testid={`${title} value`}>{value}</span>
		<button
			className="btn btn-primary"
			title={`Increment ${title}`}
			onClick={increment}
		>
			<Plus />
		</button>
	</div>;