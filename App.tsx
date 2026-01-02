import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { PublicLayout, AdminLayout, ProtectedRoute } from './components/Layout';
import { PageLoader } from './components/UI';
import * as Sentry from "@sentry/react";

// Lazy loading pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Sentry Error Boundary Fallback
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert" className="p-10 text-center">
    <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
    <pre className="text-sm bg-gray-100 p-4 rounded mb-4 overflow-auto max-w-lg mx-auto text-left">
      {error.message}
    </pre>
    <button onClick={resetErrorBoundary} className="bg-brand-600 text-white px-4 py-2 rounded">
      Try again
    </button>
  </div>
);

const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      <AuthProvider>
        <DataProvider>
          <HashRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                </Route>

                {/* Secure Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </DataProvider>
      </AuthProvider>
    </Sentry.ErrorBoundary>
  );
};

export default App;