import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Container from '../Layouts/Container';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const JoinPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }
        setTimeout(() => {
            console.log('Registering with:', { username, email, password });
            setError('Registration is currently disabled. Please try again later.'); 
            setLoading(false);
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>Join TMDB - Create an Account</title>
                <meta name="description" content="Join The Movie Database community to create lists, rate movies, and more." />
            </Head>

            <Container>
                <div className="min-h-screen pt-8 text-white flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h1 className="text-4xl font-bold text-center mb-6">Join TMDB</h1>
                        <p className="text-center text-gray-400 mb-8">Create an account to join the community.</p>
                        
                        {error && (
                            <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <FaUser className="h-5 w-5 text-gray-500" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <FaEnvelope className="h-5 w-5 text-gray-500" />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <FaLock className="h-5 w-5 text-gray-500" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <FaLock className="h-5 w-5 text-gray-500" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-tmdbLightBlue text-white font-bold rounded-lg hover:bg-tmdbLightBlue/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue focus:ring-offset-2"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-tmdbLightBlue hover:underline font-semibold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default JoinPage;