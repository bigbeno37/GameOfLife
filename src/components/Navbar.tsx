import {BoardSizeControls} from './BoardSizeControls';
import {BoardControls} from './BoardControls';

export const Navbar = () => {

	return <nav className="flex flex-row justify-between items-center h-16 bg-gray-400 px-4">
		<div className="flex flex-row">
			<BoardSizeControls />
		</div>
		<div className="flex flex-row justify-center">
			<BoardControls />
		</div>
		{/*<div>*/}
		{/*	<input*/}
		{/*		type="number"*/}
		{/*		className={`w-16 ${iterationsPerSecond.invalid && 'border border-red-600'}`}*/}
		{/*		value={iterationsPerSecond.value}*/}
		{/*		onChange={e => iterationsPerSecond.setValue(e.target.value)}*/}
		{/*	/> iterations every second*/}
		{/*</div>*/}
	</nav>;
};