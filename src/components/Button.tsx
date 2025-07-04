
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover-lift";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (loading || disabled) && "opacity-50 cursor-not-allowed hover:transform-none",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};
