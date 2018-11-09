import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index'

import {addone,addtwo} from './actions/index';
import App from './components/App'

const store = createStore(todoApp);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root'));
//serviceWorker.unregister();