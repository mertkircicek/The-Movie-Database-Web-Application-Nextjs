import React, { useState } from 'react';
import Container from '../Layouts/Container';
import { useRouter } from 'next/router'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Please enter both email/username and password.');
      return;
    }

    if (email === 'test@example.com' && password === 'password123') {
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      setError('Invalid email/username or password.');
    }
  };

  return (
    <Container>
      <div className="min-h-screen pt-8 flex items-center justify-center flex-col bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
          <p className="text-center text-gray-600 mb-8">Access your TMDB account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent text-gray-800"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-tmdbLightBlue focus:ring-tmdbLightBlue border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-tmdbLightBlue hover:text-tmdbDarkBlue">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue hover:from-tmdbLightBlue hover:to-tmdbLightGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tmdbLightBlue transition-all duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-tmdbLightBlue hover:text-tmdbDarkBlue">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
