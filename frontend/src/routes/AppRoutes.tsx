import { Routes, Route } from 'react-router-dom';
import ConfirmEmailPage from '../features/auth/views/ConfirmEmailPage';
import SignInPage from '../features/auth/views/SignInPage';
import SignUpPage from '../features/auth/views/SignUpPage';
import HomePage from '../features/home/views/HomePage';
import FlightCatalogPage from '../features/flightCatalog/views/FlightCatalogPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SignInPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/confirm-email' element={<ConfirmEmailPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/flight-catalog' element={<FlightCatalogPage />} />
    </Routes>
  );
};

export default AppRoutes;
