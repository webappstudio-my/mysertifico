// src/pages/mysertifico/SignInPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../../../components/auth/SignInForm';
import logo from '../../../assets/images/logos/logo.png'; // Adjust the path as necessary

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

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
        if (generalError) {
            setGeneralError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError('');
        setIsSuccess(false);

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

        setTimeout(() => {
            setLoading(false);

            if (isValid) {
                if (formData.rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                if (newErrors.email || newErrors.password) {
                    setGeneralError('Please correct the error and try again.');
                }
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 antialiased text-gray-800 p-4">
            <div className="grid lg:grid-cols-5 gap-0 items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Left Column: Branding and Information (Desktop Only) */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-dark to-primary-light h-full lg:col-span-2">
                    <Link to="/" className="flex items-center gap-x-3 mb-8">
                        <img className="h-12 w-12" src={logo} alt="MySertifico Logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/ffffff/0d9488?text=M'; }} />
                        <span className="font-poppins text-4xl font-bold text-white">MySertifico</span>
                    </Link>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Welcome Back to Your Digital HQ.</h1>
                    <p className="text-teal-100 text-lg">Securely access your dashboard to manage, issue, and verify your organization's digital certificates.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-shield-keyhole-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sign-in Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    {/* Logo for mobile/single column view */}
                    <div className="text-center lg:hidden mb-8">
                        <Link to="/" className="flex items-center justify-center gap-x-2">
                            <img src={logo} alt="MySertifico Logo" className="h-10 w-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/ffffff/0d9488?text=M'; }} />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </Link>
                    </div>

                    <h2 className="font-bold text-3xl text-gray-800">Admin Sign In</h2>
                    <p className="text-gray-500 mb-8">Please enter your credentials to access your account.</p>

                    {isSuccess && (
                        <div className='mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative' role='alert'>
                            <i className='ri-checkbox-circle-line text-green-700 mr-2'></i>
                            <strong className='font-bold'>Sign in successful!</strong>
                            <span className='block sm:inline'> Redirecting to dashboard...</span>
                        </div>
                    )}

                    {generalError && (
                        <div className='mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative' role='alert'>
                            <i className='ri-error-warning-line text-red-700 mr-2'></i>
                            <strong className='font-bold'>Error!</strong>
                            <span className='block sm:inline'> {generalError}</span>
                        </div>
                    )}

                    <SignInForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        loading={loading}
                    />

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <Link to="/auth/sign-up" className="font-medium text-primary hover:underline ml-1">Sign Up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;