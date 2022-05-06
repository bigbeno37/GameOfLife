import {BoardSizeControls} from './BoardSizeControls';
import {BoardControls} from './BoardControls';
import {PlaybackRateControls} from './PlaybackRateControls';

export const Navbar = () => {

	return <nav className="flex flex-row justify-between items-center h-16 bg-gray-400 px-4">
		<BoardSizeControls />
		<div className="flex flex-row justify-center">
			<BoardControls />
		</div>
		<PlaybackRateControls />
	</nav>;
};