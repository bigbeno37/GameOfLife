import {Navbar} from './Navbar';
import {Board} from './Board';

export const App = () => {
	// useEffect(() => {
	// 	if (!state.running) return;
	//
	// 	const interval = setInterval(() => dispatch({ type: 'STEP' }), 1000/2);
	//
	// 	return () => clearInterval(interval);
	// }, [state.running]);

	return <div className="h-full flex flex-col">
		<Navbar />
		<Board />
	</div>;
};
