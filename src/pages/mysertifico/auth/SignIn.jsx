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
        <div className='min-h-screen bg-slate-900 flex flex-col items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                {/*logo*/}
                <div className="flex items-center justify-center text-center mb-8">
                    <img
                        src="../logos/favicon.png"
                        alt="Mysertifico Logo"
                        className="h-10 w-auto mr-3"
                    />
                    <h1 className='text-white text-2xl font-bold tracking-wide'>MySertifico</h1>
                </div>

                {/* Sign In Card */}
                <div className='bg-slate-800 rounded-xl p-8 shadown-xl'>
                    <div className='text-center mb-6'>
                        <h2 className='text-white text-2xl font-bold'>
                            Back Office Sign In
                        </h2>
                        <p className='text-slate-400 text-sm'>
                            For authorized personnel only.
                        </p>
                    </div>

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

                   <SignInForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        loading={loading}
                    />
                </div>

                {/* Sign Up Link */}
                <div className='mt-8 text-center'>
                    <p className='text-slate-400 text-sm'>
                        Don't have an account?{' '}
                        <Link to="/auth/sign-up" className='text-teal-400 hover:text-teal-300 transition-colors'>
                            Register here
                        </Link>
                    </p>
                </div>
            

                {/* Footer */}
                <div className='mt-10 text-center'>
                    <p className='text-slate-500 text-xs'>
                        © 2025 MySertifico | Webapp Studio Sdn. Bhd.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;