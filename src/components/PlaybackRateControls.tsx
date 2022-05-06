import {NumberModifier} from './NumberModifier';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {GameActions} from '../store/GameSlice';

export const PlaybackRateControls = () => {
	const playbackRate = useSelector((state: RootState) => state.game.playbackRate);
	const dispatch = useDispatch();

	return <div className="flex flex-row">
		<span className="mr-3 self-center text-lg text-white">Updates per second:</span>
		<NumberModifier
			title="updates per second"
			value={playbackRate}
			increment={() => dispatch(GameActions.incrementPlaybackRate())}
			decrement={() => dispatch(GameActions.decrementPlaybackRate())}
		/>
	</div>;
};