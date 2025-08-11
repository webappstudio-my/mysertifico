// src/pages/bo/BoPasswordResetPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BoPasswordResetForm from '../../components/bo/BoPasswordResetForm';
import logo from '../../assets/images/logos/favicon.png'; // Adjust the path as necessary

const BoPasswordResetPage = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [success, setSuccess] = useState(false);

    // Password validate function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasSymbols = /[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        let strength = 0;
        let errors = [];

        if (password.length >= minLength) {
            strength += 25;
        } else {
            errors.push(`Password must be at least ${minLength} characters long.`);
        }

        if (hasSymbols) {
            strength += 25;
        } else {
            errors.push('Password must contain at least one special character (@, #, $, etc.).');
        }

        if (hasUpperCase) {
            strength += 25;
        } else {
            errors.push('Password must contain at least one uppercase letter.');
        }

        if (hasLowerCase && hasNumbers) {
            strength += 25;
        } else if (!hasLowerCase) {
            errors.push('Password must contain at least one lowercase letter.');
        } else if (!hasNumbers) {
            errors.push('Password must contain at least one number.');
        }

        return { strength, errors, isValid: errors.length === 0}
   
   
    };

    // Handle form change
    const handleChange = (e) => {
        // Update form data state
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
        // Reset general error if any field is changed
        if (generalError) {
            setGeneralError('');
        }
        // Reset success state if any field is changed
        if (success) {
            setSuccess(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError('');
        setSuccess(false);

        let newErrors = {};
        let isValid = true;

        // Validate New Password
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required.';
            isValid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters long.';
            isValid = false;
        }

        // Validate Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password.';
            isValid = false;
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);

        // Simulate loading state delay
        setTimeout(() => {
            setLoading(false);

            if (isValid) {
                setSuccess(true);
                // Clear form data after successful reset
                setFormData({
                    newPassword: '',
                    confirmPassword: '',
                });
                // In a real application, you would handle the password reset
                // and redirect the user to the sign-in page after a delay
                setTimeout(() => {
                    alert('Redirecting to login page...');
                }, 2000);
            } else {
                if (newErrors.newPassword || newErrors.confirmPassword) {
                    setGeneralError('Please correct the errors and try again.');
                }
            }
        }, 1000);
    }

    //Calculate password strength for display
    const passwordStrength = formData.newPassword ? validatePassword(formData.newPassword).strength : 0;

    return (
        <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md'>
                {/* Logo */}
                <div className="flex items-center justify-center text-center mb-8">
                    <img
                        src={logo}
                        alt="Mysertifico Logo"
                        className="h-10 w-auto mr-3"
                    />
                    <h1 className='text-white text-2xl font-bold tracking-wide'>MySertifico</h1>
                </div>

                {/* Reset Password Card */}
                <div className='bg-slate-800 rounded-xl p-8 shadow-xl'>
                    <div className='text-center mb-6'>
                        <h2 className='text-white text-2xl font-bold'>
                            Reset Your Password
                        </h2>
                        <p className='text-slate-400 text-sm'>
                            Please enter your new password below.
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className='mb-6 bg-green-900/50 border border-green-500/30 rounded-lg p-3 flex items-center'>
                            <div className='flex items-center'>
                                <i className='ri-checkbox-circle-line text-green-400 mr-2'></i>
                                <div className='text-green-200 text-sm'>
                                    <div className='font-medium'>Success! Your password has been reset.</div>
                                    <div className='text-green-300'>Redirecting to login...</div>
                                </div>
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

                    <BoPasswordResetForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        loading={loading}
                        passwordStrength={passwordStrength}
                    />

                    {/* Click to Login/Sign-In Link */}
                    <div className='mt-8 text-center'>
                        <Link to="/bo/sign-in" className="text-teal-400 hover:text-teal-300 transition-colors text-sm">
                        ← Back to Login
                        </Link>

                    </div>
                </div>

                {/* Footer */}
                <div className='mt-6 text-center'>
                    <p className='text-slate-500 text-xs'>
                        © 2025 MySertifico | Webapp Studio Sdn. Bhd.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default BoPasswordResetPage;