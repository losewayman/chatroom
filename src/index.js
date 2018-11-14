import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index'
import Routes from './components/Route'

const store = createStore(todoApp);

ReactDOM.render(
    <Provider store = {store}>
        <Routes />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();