
import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-bg bg-clip-text text-transparent mb-2">
            Vibe Social
          </h1>
          <p className="text-gray-500">Spark your creativity</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
