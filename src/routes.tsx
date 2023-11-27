import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import { Watchlist } from './components/Watchlist';

export default () => (
  <Routes>
    {/* FIXME: Add a landing page and let the default path to be the landing page */}
    <Route path="/" />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/signin" element={<SignIn />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);
