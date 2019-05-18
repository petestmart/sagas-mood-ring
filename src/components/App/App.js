import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_IMAGE'})
  }
  
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <p>Empty Page</p>
      </div>
    );
  }
}

export default App;
