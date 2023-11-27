import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationHeader from './components/NavigationHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationHeader />
        {routes()}
      </div>
    </Router>
  );
}

export default App;
