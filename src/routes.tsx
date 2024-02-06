import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import { StockQuotePage } from './components/Stock/StockQuotePage';
import SwaggerDocs from './components/Swagger/SwaggerDocs';
import Watchlist from './components/Watchlist/Watchlist';

const routes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/swaggerDocs" element={<SwaggerDocs />} />
    <Route path="/quote" element={<StockQuotePage />} />
  </Routes>
);
export default routes;
