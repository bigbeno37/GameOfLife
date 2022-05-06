import {BoardSizeControls} from './BoardSizeControls';
import {BoardControls} from './BoardControls';
import {PlaybackRateControls} from './PlaybackRateControls';

export const Navbar = () =>
	<nav className="flex flex-row items-center p-1 lg:px-4 h-28 lg:h-16 bg-gray-400 w-full">
		<div className="flex flex-col items-center block lg:hidden w-full">
			<BoardSizeControls />
			<div className="my-1"/>
			<PlaybackRateControls />
		</div>
		<div className="hidden lg:flex justify-between flex-row w-full">
			<BoardSizeControls />
			<BoardControls />
			<PlaybackRateControls />
		</div>
	</nav>;