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
// Watcher
function* rootSaga() {
    yield takeEvery('FETCH_IMAGE', fetchImage)
    yield takeEvery('FETCH_TAGS', fetchTags)
    yield takeEvery('FETCH_IMAGES_TAGS', fetchImagesTags)
} // end rootSaga

// Fetches all image data from the server
// Sends images to images reducer
function* fetchImage() {
    try {
        let imageResponse = yield axios.get('/image');
        yield put({ type: 'SET_IMAGES', payload: imageResponse.data })
    }
    catch (err) {
        console.log(err)
    }
} // end Saga fetchImage

// Fetches all junction data images_tags from the server
function* fetchImagesTags() {
    try {
        let imagesTagsResponse = yield axios.get('/image/tags');
        yield put({ type: 'SET_IMAGES_TAGS', payload: imagesTagsResponse.data})
    }
    catch (err) {
        console.log('fetchImagesTags Saga:', err);
    }
} // end fetchImagesTags

// Fetches all tags data from the server
function* fetchTags() {
    try {
        let tagsResponse = yield axios.get('/tags');
        yield put({ type: 'SET_TAGS', payload: tagsResponse.data })
    }
    catch (err) {
        console.log(err)
    }
}

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

// Used to store junction table data
const imagesTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES_TAGS':
            return action.payload;
        default:
            return state;
    }
} // end reducer imagesTags

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
        imagesTags
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
); // end storeInstance

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
