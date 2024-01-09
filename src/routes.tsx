import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Settings/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import SignIn from './components/SignIn';
import { Watchlist } from './components/Watchlist/Watchlist';

export default () => (
  <Routes>
    {/* FIXME: Add a landing page and let the default path to be the landing page */}
    <Route path="/" />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/signin" element={<SignIn />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);
