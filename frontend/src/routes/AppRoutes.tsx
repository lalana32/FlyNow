import { Routes, Route } from 'react-router-dom';
import AuthPage from '../features/auth/views/AuthPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
    </Routes>
  );
};

export default AppRoutes;
