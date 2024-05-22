// frontend/src/App.tsx
import React from 'react';
import './App.css';
import Register from './components/Register' // Ensure the path is correct based on your structure

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to QuickReserve</h1>
        <Register />
      </header>
    </div>
  );
}

export default App;
