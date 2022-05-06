import {Minus, Plus} from 'tabler-icons-react';

type NumberModifierProps = {
	title: string,
	value: number,
	increment: () => void,
	decrement: () => void
};

export const NumberModifier = ({ title, value, increment, decrement }: NumberModifierProps) =>
	<div className="flex flex-row">
		<button className="border-2 border-green-900 bg-green-600 rounded" title={`Decrement ${title}`} onClick={decrement}><Minus /></button>
		<span className="text-2xl mx-4">{value}</span>
		<button className="border-2 border-green-900 bg-green-600 rounded" title={`Increment ${title}`} onClick={increment}><Plus /></button>
	</div>;