import { Routes, Route, Navigate } from 'react-router-dom';
import ConfirmEmailPage from '../features/auth/views/ConfirmEmailPage';
import SignInPage from '../features/auth/views/SignInPage';
import SignUpPage from '../features/auth/views/SignUpPage';
import HomePage from '../features/home/views/HomePage';
import FlightCatalogPage from '../features/flightCatalog/views/FlightCatalogPage';
import MyProfile from '../features/myProfile/views/MyProfile';
import MyBookings from '../features/myBookings/views/MyBookings';
import PaymentPage from '../features/payment/views/PaymentPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/sign-in' replace />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/confirm-email' element={<ConfirmEmailPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/flight-catalog' element={<FlightCatalogPage />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/my-bookings' element={<MyBookings />} />
      <Route path='/payment' element={<PaymentPage />} />
      {/* <Route path='/map' element={<SeatMap />} /> */}
    </Routes>
  );
};

export default AppRoutes;
