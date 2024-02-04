import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import NavigationHeader from './components/NavigationHeader';
import routes from './routes';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <NavigationHeader />
        {routes()}
      </div>
    </Router>
  );
}

export default App;
