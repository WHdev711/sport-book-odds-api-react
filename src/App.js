import React from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      <Navigation/>
     <Routes /> 
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
