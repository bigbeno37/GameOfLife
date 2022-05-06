import {Navbar} from './Navbar';
import {Board} from './Board';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {BoardActions} from '../store/BoardSlice';
import {BoardControls} from './BoardControls';

export const App = () => {
	const running = useSelector((state: RootState) => state.game.running);
	const playbackRate = useSelector((state: RootState) => state.game.playbackRate);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!running) return;

		const interval = setInterval(() => dispatch(BoardActions.tick()), 1000/playbackRate);

		return () => clearInterval(interval);
	}, [running, playbackRate, dispatch]);

	return <div className="h-full flex flex-col">
		<Navbar />
		<Board />
		<div className="lg:hidden h-16 flex flex-col justify-center">
			<BoardControls />
		</div>
	</div>;
};
