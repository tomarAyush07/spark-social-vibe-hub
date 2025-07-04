
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/AuthCard';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Welcome back to Vibe Social!');
      navigate('/feed');
    }, 1000);
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to continue your vibe">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        
        <div className="flex items-center justify-between">
          <Link 
            to="/forgot-password" 
            className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
        
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link 
            to="/register" 
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};
