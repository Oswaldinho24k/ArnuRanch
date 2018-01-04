import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes} from './Routes'
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes/>
      </div>
    );
  }
}

export default App;
