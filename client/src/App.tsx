import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/react-query/query-client';
import { AuthProvider } from './providers/auth';
import { ProtectedRoute } from './providers/auth/protected-routes';
import { PublicRoute } from './providers/auth/public-routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from './components/ui/sonner';

// Lazy load page components
const LoginPage = lazy(() => import('./pages/login/Login'));
const InvoicesPage = lazy(() => import('./pages/invoices/Invoices'));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/invoices" 
                  element={
                    <ProtectedRoute>
                      <InvoicesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/invoices" replace />} />
                <Route path="*" element={<Navigate to="/invoices" replace />} />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
