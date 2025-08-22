// src/pages/mysertifico/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm';
import logo from '../../../assets/images/logos/logo.png'; // Adjust the path as necessary

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [emailSent, setEmailSent] = useState(false);
    const [sentEmailAddress, setSentEmailAddress] = useState('');

    // Dummy registered emails for client-side validation
    const registeredEmails = ['admin@mysertifico.com', 'user@example.com'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        let isValid = true;

        const email = formData.email.trim().toLowerCase();

        if (!email) {
            newErrors.email = 'Email address is required.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        } else if (!registeredEmails.includes(email)) {
            newErrors.email = 'Email not found in our database. Please check the email address.';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Simulate sending reset link
            console.log(`Password reset link sent to ${email}`);
            setSentEmailAddress(email);
            setEmailSent(true);
        }
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
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Forgot Your Password?</h1>
                    <p className="text-teal-100 text-lg">Let's get you back on track. We'll help you reset it and regain access to your account.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-mail-send-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    {/* Logo for mobile/single column view */}
                    <div className="text-center lg:hidden mb-8">
                        <Link to="/" className="flex items-center justify-center gap-x-2">
                            <img src={logo} alt="MySertifico Logo" className="h-10 w-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/ffffff/0d9488?text=M'; }} />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </Link>
                    </div>

                    {!emailSent ? (
                        <>
                            <h2 className="font-bold text-3xl text-gray-800">Reset Your Password</h2>
                            <p className="text-gray-500 mb-8">No worries. Enter your email address and we'll send you a link to reset your password.</p>
                            <ForgotPasswordForm
                                formData={formData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                errors={errors}
                            />
                        </>
                    ) : (
                        // Success Message
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <i className="ri-mail-check-line text-6xl text-green-600"></i>
                            </div>
                            <h2 className="mt-6 font-bold text-2xl text-gray-800">Check Your Email</h2>
                            <p className="text-gray-500 mt-2">We have sent a password reset link to <strong className="font-semibold text-gray-800">{sentEmailAddress}</strong>. Please follow the instructions in the email to reset your password.</p>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            <Link to="/auth/sign-in" className="font-medium text-primary hover:underline"><i className="ri-arrow-left-line align-middle"></i> Back to Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;