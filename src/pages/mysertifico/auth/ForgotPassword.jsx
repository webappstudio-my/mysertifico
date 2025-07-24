import React, { useState } from 'react';

const ForgotPassword = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [sentEmailAddress, setSentEmailAddress] = useState('');

    // Dummy database of registered emails
    const registeredEmails = ['admin@mysertifico.com', 'user@example.com'];

    const validateEmail = () => {
        let isValid = true;
        setEmailError('');

        if (!email) {
            setEmailError('Email address is required.');
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else if (!registeredEmails.includes(email.toLowerCase())) {
            setEmailError('Email not found in our database. Please check the email address.');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail()) {
            // Dummy logic for sending email
            console.log(`Password reset link sent to ${email}`);
            setSentEmailAddress(email);
            setIsSuccess(true);
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
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Forgot Your Password?</h1>
                    <p className="text-primary-200 text-lg">Let's get you back on track. We'll help you reset it and regain access to your account.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-mail-send-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    <div className="text-center lg:hidden mb-8">
                        <a href="#" onClick={() => navigate('home')} className="flex items-center justify-center gap-x-2">
                            <img src="https://placehold.co/40x40/ffffff/0d9488?text=M" alt="MySertifico Logo" className="h-10 w-10" />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </a>
                    </div>
                    {!isSuccess ? (
                        <div id="form-container">
                            <h2 className="font-bold text-3xl text-gray-800">Reset Your Password</h2>
                            <p className="text-gray-500 mb-8">No worries. Enter your email address and we'll send you a link to reset your password.</p>

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
                                            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                                        />
                                    </div>
                                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                </div>

                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                        Send Reset Link
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* Success Message */
                        <div id="success-message" className="text-center">
                            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <i className="ri-mail-check-line text-6xl text-green-600"></i>
                            </div>
                            <h2 className="mt-6 font-bold text-2xl text-gray-800">Check Your Email</h2>
                            <p className="text-gray-500 mt-2">We have sent a password reset link to <strong id="sent-email-address">{sentEmailAddress}</strong>. Please follow the instructions in the email to reset your password.</p>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            <a href="#" onClick={() => navigate('signIn')} className="font-medium text-primary hover:underline"><i className="ri-arrow-left-line align-middle"></i> Back to Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
