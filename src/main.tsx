import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store/store';

const root = document.getElementById('root');

if (!root) throw new Error('Element #root not found! Something has gone terribly, terribly wrong!');

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
