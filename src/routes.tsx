import { Route, Routes } from 'react-router-dom';
import { Watchlist } from './components/Watchlist';
import { Dashboard } from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';


export default () => (
  <Routes>
    {/* FIXME: Add a landing page and let the default path to be the landing page */}
    <Route path="/" />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    {/* <Route path="*" element={<NotFound />} /> */}


  </Routes>
);
