import {FiMinus, FiPlus} from 'react-icons/fi';

type NumberModifierProps = {
	/**
	 * The title of the value being changed, e.g. board columns.
	 * This will be used with the increment / decrement buttons in the form "<Increment/Decrement> <title>" as well as
	 * the testid of the value itself in the form "<title> value".
	 */
	title: string,

	/**
	 * The current value to show.
	 */
	value: number,

	/**
	 * The minimum value this can decrement the value to before the decrement button is disabled. By default, this is
	 * configured to 1.
	 */
	minimum?: number,

	/**
	 * A function that increments the given value.
	 */
	increment: () => void,

	/**
	 * A function that decrements the given value.
	 */
	decrement: () => void
};

/**
 * A generic component that can be used to show a value and buttons to increment / decrement values. This is mainly
 * used to show the board column, board row, and playback rate values in a consistent style.
 */
export const NumberModifier = ({ title, value, minimum, increment, decrement }: NumberModifierProps) =>
	<div className="flex flex-row justify-center">
		<button
			className="btn btn-primary text-2xl"
			title={`Decrement ${title}`}
			onClick={decrement}
			disabled={value <= (minimum ?? 1)}
		>
			<FiMinus />
		</button>
		<span
			className="text-2xl mx-1 lg:mx-4 text-white self-center"
			data-testid={`${title} value`}
		>
			{value}
		</span>
		<button
			className="btn btn-primary text-2xl"
			title={`Increment ${title}`}
			onClick={increment}
		>
			<FiPlus />
		</button>
	</div>;