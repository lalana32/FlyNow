import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import Navbar from '../shared/components/NavBar';

const AppContent = () => {
  const location = useLocation();

  const hideNavbarOnRoutes = ['/', '/sign-in', '/signup'];

  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div style={{ paddingTop: '56px' }}>
        <AppRoutes />
      </div>
    </>
  );
};

export default AppContent;
