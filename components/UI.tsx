import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'danger' | 'secondary' }> = ({ 
  className = '', 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-500 text-white focus:ring-brand-500",
    danger: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input 
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all ${className}`}
    {...props}
  />
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status] || styles.inactive}`}>
      {status}
    </span>
  );
};

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-40">
    <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
  </div>
);

export const PageLoader = () => (
  <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
    {/* Indeterminate Progress Bar */}
    <div className="h-1 w-full bg-brand-100 overflow-hidden">
      <div className="h-full bg-brand-600 w-full origin-left animate-indeterminate-bar"></div>
    </div>
    
    {/* Centered Loading State */}
    <div className="flex-grow flex flex-col items-center justify-center pb-20">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-200 rounded-full animate-ping opacity-20"></div>
        <Loader2 className="w-12 h-12 animate-spin text-brand-600 relative z-10" />
      </div>
      <p className="mt-4 text-brand-900 font-medium text-sm tracking-wide animate-pulse">
        LOADING...
      </p>
    </div>
  </div>
);