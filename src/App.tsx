import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { useAuthStateChange } from './utils/passwordAuth';

function App() {
  useAuthStateChange()
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
