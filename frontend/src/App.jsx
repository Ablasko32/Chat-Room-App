import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './features/ui/AppLayout';
import ProtectedRoute from './features/ui/ProtectedRoute.jsx';
import MainPage from './pages/mainPage';
import NotFound from './pages/NotFound.jsx';
import Room from './pages/Room';
import './services/roomsApi.js';
import './utils/encryption.js';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/room/:room/:name"
              element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
      {/* Notifications toaster */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-lifted)',
            color: 'var(--primary-color)',
            fontSize: '1.4rem',
          },
          success: {
            iconTheme: {
              primary: 'var(--primary-color)',
              secondary: 'var(--background-color)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--red-error)',
              secondary: 'var(--background-color)',
            },
            style: {
              color: 'var(--red-error)',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
