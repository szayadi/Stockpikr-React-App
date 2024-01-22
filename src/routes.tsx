import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings/Settings';
import SignIn from './components/SignIn';
import SwaggerDocs from './components/Swagger/SwaggerDocs';
import { Watchlist } from './components/Watchlist/Watchlist';
import Positions from './components/Positions/Positions';

export default () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/positions" element={<Positions />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/swaggerDocs" element={<SwaggerDocs />} />
  </Routes>
);
