// src/pages/bo/BoSignIn.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import BoSignInForm from '../../components/bo/BoSignInForm';
import logo from '../../assets/images/logos/favicon.png'; // Adjust the path as necessary

// Backend API URL
const BACKEND_URL = 'http://127.0.0.1:3000';

const BoSignIn = () => {
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

    // Load remembered email on mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setFormData(prev => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' }));

        if (generalError) {
            setGeneralError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError('');
        setIsSuccess(false);

        let newErrors = {};
        let isValid = true;

        // Basic client-side validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            setLoading(false);
            setGeneralError('Please correct the errors and try again.');
            return;
        }

        try {
            // Make API call to sign-in endpoint
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error responses from backend
                if (response.status === 401) {
                    if (data.message && (data.message.toLowerCase().includes('email') || data.message.includes('does not exist'))) {
                        newErrors.email = 'This email is not registered.';
                    } else {
                        newErrors.password = 'Incorrect password. Please try again.';
                    }
                } else if (response.status === 403) {
                    setGeneralError('Account not verified. Please check your email.');
                } else {
                    setGeneralError(data.message || 'Sign in failed. Please try again.');
                }
                
                setErrors(newErrors);
                setLoading(false);
                return;
            }

            // Successful login - store token and user data
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            if (data.data) {
                localStorage.setItem('userData', JSON.stringify(data.data));
            }

            // Handle Remember Me
            if (formData.rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Show success message
            setIsSuccess(true);
            setLoading(false);

            // Redirect to dashboard after a delay
            setTimeout(() => {
                navigate('/bo/dashboard');
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            setGeneralError('Network error. Please check your connection and try again.');
            setLoading(false);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className='min-h-screen bg-bo-bg-dark flex flex-col items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                {/* Logo */}
                <div className="flex items-center justify-center text-center mb-8">
                    <img
                        src={logo}
                        alt="Mysertifico Logo"
                        className="h-10 w-auto mr-3"
                    />
                    <h1 className='font-poppins text-white text-2xl font-bold tracking-wide'>MySertifico</h1>
                </div>

                {/* Sign In Card */}
                <div className='bg-bo-surface-dark rounded-xl p-8 shadow-xl'>
                    <div className='text-center mb-6'>
                        <h2 className='text-white text-2xl font-bold'>
                            Back Office Sign In
                        </h2>
                        <p className='text-slate-400 text-sm'>
                            For authorized personnel only.
                        </p>
                    </div>

                    {/* Success Message */}
                    {isSuccess && (
                        <div className='mb-6 bg-green-900/50 border border-green-500/30 rounded-lg p-3 flex items-center'>
                            <div className='flex items-center'>
                                <i className='ri-checkbox-circle-line text-green-400 mr-2'></i>
                                <span className='text-green-200 text-sm'>
                                    Sign in successful! Redirecting to dashboard...
                                </span>
                            </div>
                        </div>
                    )}

                    {/* General Error Message */}
                    {generalError && (
                        <div className='mb-6 bg-red-900/50 border border-red-500/30 rounded-lg p-3 flex items-center'>
                            <div className='flex items-center'>
                                <i className='ri-error-warning-line text-red-400 mr-2'></i>
                                <span className='text-red-200 text-sm'>
                                    {generalError}
                                </span>
                            </div>
                        </div>
                    )}

                    <BoSignInForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        loading={loading}
                    />
                </div>

                {/* Footer */}
                <div className='mt-6 text-center'>
                    <p className='text-slate-500 text-xs'>
                        © {currentYear} MySertifico | Webapp Studio Sdn. Bhd.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BoSignIn;