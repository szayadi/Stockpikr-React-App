import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationHeader from './components/NavigationHeader';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Login', href: '/login' },
];

function App() {
  return (
    <div className="App">
      <NavigationHeader />
    </div>
  );
}

export default App;
