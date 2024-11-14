import React, { Component } from 'react';
import './App.css';
import ShowPokemonData from './Components/ShowPokemonData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ShowPokemonData></ShowPokemonData>
      </div>
    );
  }
}

export default App;
