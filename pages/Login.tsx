import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/UI';
import { Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 5) score++;
    if (password.length > 9) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const getStrengthColor = () => {
    switch (strengthScore) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthLabel = () => {
    switch (strengthScore) {
      case 0: return '';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your secure credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 transition-all duration-300 ease-in-out">
                <div className="flex gap-1 h-1.5 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`flex-1 rounded-full transition-colors duration-300 ${
                        strengthScore >= level ? getStrengthColor() : 'bg-gray-100'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-end">
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    strengthScore === 1 ? 'text-red-500' :
                    strengthScore === 2 ? 'text-yellow-600' :
                    strengthScore === 3 ? 'text-blue-600' :
                    strengthScore === 4 ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {getStrengthLabel()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full justify-center">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;