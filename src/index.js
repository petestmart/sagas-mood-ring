import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// ---------- SAGAS ---------- //
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_IMAGE', fetchImage)
} // end rootSaga

// Fetches all images from the server
// Sends images to images reducer
function* fetchImage() {
    try {
    let imageResponse = yield axios.get('/image');
    yield put({type: 'SET_IMAGES', payload: imageResponse.data })
    }
    catch (err) {
        console.log(err)
    }
} // end Saga fetchImage

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// ---------- REDUCERS ---------- //
// Used to store images returned from the server
const images = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
} // end reducer images

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
} // end reducer tags

// ---------- STORE ---------- //
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        images,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
); // end storeInstance

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
