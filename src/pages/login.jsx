import React, { useState } from 'react';
import Container from '../Layouts/Container';
import { useRouter } from 'next/router';
import Head from 'next/head'; 
import Link from 'next/link'; 

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
        <>
            <Head>
                <title>Login - The Movie Database</title>
                <meta name="description" content="Login to your TMDB account to manage your profile and lists." />
            </Head>

            <Container>
                <div className="min-h-screen pt-8 flex items-center justify-center flex-col bg-white text-white">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
                        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
                        <p className="text-center text-gray-400 mb-8">Access your TMDB account</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent"
                                    placeholder="Enter your email or username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue focus:border-transparent"
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
                                        className="h-4 w-4 text-tmdbLightBlue focus:ring-tmdbLightBlue border-gray-600 rounded bg-gray-700"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-tmdbLightBlue hover:text-tmdbLightGreen transition-colors duration-200">
                                    Forgot password?
                                </a>
                            </div>

                            {error && (
                                <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            {successMessage && (
                                <div className="bg-green-900 bg-opacity-30 border border-green-500 text-green-300 px-4 py-3 rounded relative" role="alert">
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
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link href="/join" className="font-medium text-tmdbLightBlue hover:text-tmdbLightGreen">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default LoginPage;