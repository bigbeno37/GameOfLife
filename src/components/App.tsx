import {Navbar} from './Navbar';
import {Board} from './Board';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {BoardActions} from '../store/BoardSlice';
import {BoardControls} from './BoardControls';
import {WindowActions} from '../store/WindowSlice';

export const App = () => {
	const running = useSelector((state: RootState) => state.game.running);
	const playbackRate = useSelector((state: RootState) => state.game.playbackRate);
	const width = useSelector((state: RootState) => state.window.width);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleResize = () => dispatch(WindowActions.setWidth(window.innerWidth));

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [dispatch]);

	useEffect(() => {
		if (!running) return;

		const interval = setInterval(() => dispatch(BoardActions.tick()), 1000/playbackRate);

		return () => clearInterval(interval);
	}, [running, playbackRate, dispatch]);

	return <div className="h-full flex flex-col">
		<Navbar />
		<Board />
		{width < 1024 && (
			<div className="h-16 flex flex-col justify-center">
				<BoardControls />
			</div>
		)}
	</div>;
};
