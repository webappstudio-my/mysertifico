// src/pages/mysertifico/SignInPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../../../components/auth/SignInForm';

const SignIn = () => {
    // State to manage form data and errors
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    // State to manage loading state (optional)
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');



    // Dummy registered users for client-side validation (replace with actual backend check)
    const registeredUsers = {
        'admin@mysertifico.com': 'password123',
        'user@example.com': 'securepass',
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change

        // Clear general error on input change
        if (generalError) {
            setGeneralError(''); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError(''); // Clear general error on submit

        let newErrors = {};
        let isValid = true;

        // Validate Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        } else if (!registeredUsers[formData.email.toLowerCase()]) {
            newErrors.email = 'This email is not registered. Please sign up.';
            isValid = false;
        }

        // Validate Password
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (registeredUsers[formData.email.toLowerCase()] && registeredUsers[formData.email.toLowerCase()] !== formData.password) {
            newErrors.password = 'Incorrect password. Please try again.';
            isValid = false;
        }

        setErrors(newErrors);

        // simulate loading state delay
        setTimeout(() => {
            setLoading(false);

            if (isValid) {
                // Handle Remeber Me
                if (formData.rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                // Simulate successful sign-in
                alert('Sign in successful! Redirecting to dashboard...');
                // In a real application, you would handle authentication (e.g., Firebase Auth)
                // and then redirect the user:
                // navigate('/dashboard');
            } else {
                // Set general error if there are validation issues
                if (newErrors.email || newErrors.password) {
                    setGeneralError('Please correct the error and try again.');
                }
            }
        }, 1000); // Simulate network delay
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center items-center gap-2 mb-8">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <span className="font-bold text-2xl text-gray-900">MySertifico</span>
                </div>
                
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/auth/signup" className="font-medium text-primary hover:underline">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* General Error Message */}
                    {generalError && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i className="ri-error-warning-line text-red-400"></i>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Authentication failed
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        {generalError}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading Overlay */}
                    <div className="relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <i className="ri-loader-4-line animate-spin text-primary text-xl"></i>
                                    <span className="text-primary font-medium">Signing in...</span>
                                </div>
                            </div>
                        )}
                        
                        <SignInForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            loading={loading}
                        />
                    </div>
                    
                    {/* Demo Credentials */}
                    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="text-center">
                            <p className="text-xs font-medium text-blue-800">Demo Credentials:</p>
                            <p className="text-xs text-blue-600">admin@mysertifico.com / password123</p>
                            <p className="text-xs text-blue-600">user@example.com / securepass</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;