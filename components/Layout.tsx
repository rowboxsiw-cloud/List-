import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, Home as HomeIcon } from 'lucide-react';
import { APP_NAME } from '../constants';

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.</p>
    </div>
  </footer>
);

export const PublicLayout = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <ShieldCheck className="text-brand-600 w-8 h-8" />
            <span>Authorize</span>
          </div>
          <div className="flex gap-4">
             {isAuthenticated ? (
               <NavLink to="/admin" className="text-gray-600 hover:text-brand-600 font-medium">Dashboard</NavLink>
             ) : (
               <NavLink to="/login" className="text-gray-600 hover:text-brand-600 font-medium">Admin Login</NavLink>
             )}
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <LayoutDashboard className="text-brand-500 w-6 h-6" />
            <span>Admin Portal</span>
          </div>
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <HomeIcon size={18} /> Public Site
            </NavLink>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Update ProtectedRoute to make children optional and support Outlet
export const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children ? <>{children}</> : <Outlet />;
};