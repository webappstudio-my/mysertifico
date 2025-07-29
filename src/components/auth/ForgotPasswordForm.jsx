// src/components/auth/ForgotPasswordForm.jsx
import React from 'react';
import AuthInputField from './AuthInputField'; // Reusing AuthInputField

const ForgotPasswordForm = ({ formData, handleChange, handleSubmit, errors }) => {
    return (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <AuthInputField
                iconClass="ri-mail-line"
                label="Email Address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
            />

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                    Send Reset Link
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;