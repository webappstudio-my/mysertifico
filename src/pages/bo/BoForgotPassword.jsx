import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation

const BoForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage('');
        setIsLoading(true);

        if (!email) {
            setIsError(true);
            setErrorMessage('Please enter your email address.');
            setIsLoading(false);
            return;
        }

        // Simulate an API call
        console.log('Sending reset email to:', email);
        setTimeout(() => {
            if (email === 'test@example.com') { // Simulating a successful request
                setIsSuccess(true);
                setEmail('');
            } else { // Simulating an error case
                setIsError(true);
                setErrorMessage('Email not found. Please check your email and try again.');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-bo-bg-dark text-gray-200">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-8">
                <img src="/assets/images/logos/logo.png" alt="Logo" className="h-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/32x32/0d9488/ffffff?text=M'; }} />
                <span className="font-poppins text-2xl font-bold text-gray-50">MySertifico</span>
            </Link>

            {/* Forgot Password Card */}
            <div className="bg-bo-surface-dark rounded-xl shadow-md p-6 sm:p-8 w-full max-w-sm">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-50">Forgot your password?</h1>
                    <p className="text-sm text-gray-400 mt-2">No problem. Just enter your email and we'll send you a password reset link.</p>
                </div>

                {isSuccess && (
                    <div className="bg-green-800 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3">
                        <i className="ri-checkbox-circle-line text-md mt-0.5"></i>
                        <span>A password reset link has been sent to your email.</span>
                    </div>
                )}
                {isError && (
                    <div className="bg-red-800 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3">
                        <i className="ri-alert-line text-md mt-0.5"></i>
                        <span>{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-50"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        Remember your password?
                        <Link to="/login" className="text-primary hover:underline ml-1">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BoForgotPassword;