import {BoardSizeControls} from './BoardSizeControls';
import {BoardControls} from './BoardControls';
import {PlaybackRateControls} from './PlaybackRateControls';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const Navbar = () => {
	const width = useSelector((state: RootState) => state.window.width);

	return <nav className="flex flex-row items-center p-1 lg:px-4 h-28 lg:h-16 bg-gray-400 w-full">
		{/* If the width is less than 1024px, then the BoardControls will be rendered at the bottom of the screen. */}
		{/* As such, don't render it in the navbar */}
		{ width < 1024 ? (
			<div className="flex flex-col items-center w-full">
				<BoardSizeControls />
				<div className="my-1"/>
				<PlaybackRateControls />
			</div>
		) : (
			<div className="flex justify-between flex-row w-full">
				<BoardSizeControls />
				<BoardControls />
				<PlaybackRateControls />
			</div>
		) }
	</nav>;
};
