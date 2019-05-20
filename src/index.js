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
    yield takeEvery('ADD_TAG', postTag)
    yield takeEvery('FETCH_IMAGE', fetchImage)
    yield takeEvery('FETCH_TAGS', fetchTags)
    yield takeEvery('FETCH_IMAGES_TAGS', fetchImagesTags)
} // end rootSaga

// Fetches all image data from the server (from DB images table)
// Sends images to images reducer
function* fetchImage() {
    try {
        let imageResponse = yield axios.get('/api/images');
        yield put({ type: 'SET_IMAGES', payload: imageResponse.data })
    }
    catch (err) {
        console.log(err)
    }
} // End Saga fetchImage

// Fetches all junction data images_tags from the server
function* fetchImagesTags() {
    try {
        let imagesTagsResponse = yield axios.get('/api/images');
        yield put({ type: 'SET_IMAGES_TAGS', payload: imagesTagsResponse.data })
    }
    catch (err) {
        console.log('fetchImagesTags Saga:', err);
    }
} // End Saga fetchImagesTags

// Fetches tags data from the server (from DB tags table)
function* fetchTags() {
    try {
        let tagsResponse = yield axios.get('/api/tags');
        yield put({ type: 'SET_TAGS', payload: tagsResponse.data })
    }
    catch (err) {
        console.log(err)
    }
} // End Saga fetchTags

// POST current selected tagId & imageId to the server (then the juction table)
function* postTag(action) {
    try {
        yield axios.post('/api/images/addtag', action.payload);
        yield put({ type: 'FETCH_IMAGES_TAGS' })
    } catch (err) {
        console.log(err);
    }
} // End Saga PostTag

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
} // End Reducer images

// Used to store junction table data
const imagesTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES_TAGS':
            return action.payload;
        default:
            return state;
    }
} // End Reducer imagesTags

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
} // End Reducer tags


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
