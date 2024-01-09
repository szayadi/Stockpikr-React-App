import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import ContactUsPage from './components/Settings/ContactUs';
import Settings from './components/Settings/Settings';
import SignIn from './components/SignIn';
import { Watchlist } from './components/Watchlist/Watchlist';

export default () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/contactUs" element={<ContactUsPage />} />
  </Routes>
);
