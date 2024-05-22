// frontend/src/App.tsx
import React from 'react';
import './App.css';
import Register from './components/Register';

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
