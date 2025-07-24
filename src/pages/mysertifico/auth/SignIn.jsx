import React, { useState } from 'react';

const SignIn = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Dummy registered users for demonstration
    const registeredUsers = {
        'admin@mysertifico.com': 'password123',
        'user@example.com': 'securepass'
    };

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        // Validate Email
        if (!email) {
            setEmailError('Email address is required.');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else if (!registeredUsers[email.toLowerCase()]) {
            setEmailError('This email is not registered. Please sign up.');
            isValid = false;
        }

        // Validate Password
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (registeredUsers[email.toLowerCase()] && registeredUsers[email.toLowerCase()] !== password) {
            setPasswordError('Incorrect password. Please try again.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real application, you would handle authentication here
            // For now, simulate success and redirect to dashboard
            alert('Sign in successful! Redirecting to dashboard...');
            navigate('dashboard'); // Navigate to dashboard on successful sign-in
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 antialiased text-gray-800">
            <div className="grid lg:grid-cols-5 gap-0 items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Left Column: Branding and Information */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-700 to-primary-500 h-full lg:col-span-2">
                    <a href="#" onClick={() => navigate('home')} className="flex items-center gap-x-3 mb-8">
                        <img src="https://placehold.co/48x48/ffffff/0d9488?text=M" alt="MySertifico Logo" className="h-12 w-12 bg-white p-1 rounded-full" />
                        <span className="font-poppins text-4xl font-bold text-white">MySertifico</span>
                    </a>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Welcome Back to Your Digital HQ.</h1>
                    <p className="text-primary-200 text-lg">Securely access your dashboard to manage, issue, and verify your organization's digital certificates.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-shield-keyhole-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sign-in Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    <div className="text-center lg:hidden mb-8">
                        <a href="#" onClick={() => navigate('home')} className="flex items-center justify-center gap-x-2">
                            <img src="https://placehold.co/40x40/ffffff/0d9488?text=M" alt="MySertifico Logo" className="h-10 w-10" />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </a>
                    </div>

                    <h2 className="font-bold text-3xl text-gray-800">Admin Sign In</h2>
                    <p className="text-gray-500 mb-8">Please enter your credentials to access your account.</p>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                            <div className="relative">
                                <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    required
                                    className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>

                        <div>
                            <div className="relative">
                                <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    required
                                    className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" className="password-toggle absolute inset-y-0 right-0 px-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                                </button>
                            </div>
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" onClick={() => navigate('forgotPassword')} className="font-medium text-primary hover:underline">Forgot your password?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a href="#" onClick={() => navigate('signUp')} className="font-medium text-primary hover:underline">Sign Up here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
