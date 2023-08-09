import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './pages/error/error-fallback.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { MINUTE, RETRY_TIMES } from './constants/time.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * MINUTE,
      cacheTime: 2 * MINUTE,
      retry: RETRY_TIMES,
      refetchOnWindowFocus: false
    }
  }
});

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.5
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(107, 122, 144, 0.2)',
          backdropFilter: 'blur(4px)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: '#2F353D',
          border: '1px solid #DCE0E5 !important',
          backgroundColor: '#fff'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Montserrat"'
  },
  palette: {
    primary: {
      main: '#36BFB6'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
            <CssBaseline />
            <ReactQueryDevtools initialIsOpen={false} />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
