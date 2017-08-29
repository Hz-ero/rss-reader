import React from 'react'
import ReduxThunk from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './reducers'
import App from './containers/App.jsx'
import callAPI from './util/callAPI.js'

const middleware = [ callAPI, ReduxThunk ];
let composeEnhancers = null;

if (process.env.NODE_ENV === 'production') {
    composeEnhancers = compose
} else {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(appReducer, composeEnhancers(
    applyMiddleware(...middleware)
));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)