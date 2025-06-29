import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './app/AppContent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppContent />
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
