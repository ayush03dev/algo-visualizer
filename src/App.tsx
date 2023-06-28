import React from 'react';
import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SortingVisualizer />
    </div>
  );
}

export default App;
