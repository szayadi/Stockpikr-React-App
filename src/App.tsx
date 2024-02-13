import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/GlobalErrorBoundary';
import NavigationHeader from './components/NavigationBar/NavigationBar';
import routes from './routes';

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/">
        <div className="App">
          <NavigationHeader />
          {routes()}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
