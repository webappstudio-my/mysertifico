import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Using Link for client-side routing

// Import your image asset. Adjust the path according to your project structure.
import loginImage from '../../../assets/images/frontend/login1.png';

const MWForgotPassword = () => {
    // State to track if the reset link has been sent
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handles the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // In a real application, you would add logic here to call your API
        // to send the password reset email.
        console.log('Forgot password request submitted.');

        // Update state to show the success message
        setIsSubmitted(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="relative flex flex-col m-6 space-y-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">

                {/* Left Side: Image & Branding */}
                <div className="relative w-full md:w-1/2">
                    <img
                        src={loginImage}
                        alt="A student smiling and holding books"
                        // The placeholder URL is a fallback if the image fails to load
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1200/134E4A/ffffff?text=MyWall'; }}
                        className="w-full h-full hidden md:block rounded-l-2xl object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-90 md:rounded-l-2xl"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                        <h2 className="text-4xl font-bold font-poppins">MyWall</h2>
                        <p className="text-lg text-primary-200">Your Personal Wall of Achievements</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="font-bold text-3xl text-gray-800 dark:text-white">Forgot Password?</h2>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mb-8">
                        No worries! Enter your email and we'll send you a reset link.
                    </p>

                    {/* Conditional Rendering: Show success message or form */}
                    {isSubmitted ? (
                        <div className="flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
                            <i className="ri-checkbox-circle-line mr-3"></i>
                            <div>
                                <span className="font-medium">Reset link sent!</span> Please check your email to reset your password.
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="you@email.com"
                                    className="mt-1 w-full p-3 border rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <button type="submit" className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors">
                                Send Reset Link
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Remember your password?{' '}
                        <Link to="/mywall/auth/sign-in" className="font-semibold text-primary hover:underline">
                            Sign In here
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MWForgotPassword;