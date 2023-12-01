import { Route, Routes } from 'react-router-dom';
import { Watchlist } from './components/Watchlist';
import { Profile } from './components/Settings/Profile/Profile';
import { Dashboard } from './components/Settings/Dashboard/Dashboard';
import { Settings } from './components/Settings/Settings/Settings';

export default () => (
  <Routes>
    {/* FIXME: Add a landing page and let the default path to be the landing page */}
    <Route path="/" />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    {/* <Route path="*" element={<NotFound />} /> */}


  </Routes>
);
