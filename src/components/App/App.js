import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import DisplayImage from '../DisplayImage/DisplayImage';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_IMAGE'})
  }

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
      <header><h1>The Mood Ring</h1></header>
        <h2>Image Title</h2>
        <DisplayImage />
        <p>Tags Go Here</p>
      </div>
    );
  }
}

export default connect()(App);
