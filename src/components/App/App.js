import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import DisplayImage from '../DisplayImage/DisplayImage';
// import ImageTitle from '../ImageTitle/ImageTitle'
import DisplayTags from '../DisplayTags/DisplayTags'

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_IMAGE'});
    this.props.dispatch({ type: 'FETCH_TAGS'});
    this.props.dispatch({ type: 'FETCH_IMAGES_TAGS'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
      <header><h1>The Mood Ring</h1></header>
        <DisplayImage />
        <DisplayTags />
      </div>
    );
  }
}

export default connect()(App);
