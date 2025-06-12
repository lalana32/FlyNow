import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material/styles'; // Dodaj ThemeProvider
import { Provider } from 'react-redux';
import theme from './theme.ts'; // Tvoj tema fajl
import CssBaseline from '@mui/material/CssBaseline'; // Dodaj CssBaseline
import App from './App.tsx';
import store from './app/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {' '}
      {/* Dodaj ThemeProvider */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline /> {/* Dodaj CssBaseline */}
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
