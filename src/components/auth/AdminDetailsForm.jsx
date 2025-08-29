// src/components/auth/AdminDetailsForm.jsx
import React from 'react';
import AuthInputField from './AuthInputField';

const AdminDetailsForm = ({
    formData,
    handleChange,
    handleNextStep,
    setErrors,
    errors
}) => {

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required.';
            isValid = false;
        }
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }
        // Dummy check for existing emails (replace with actual API call)
        const existingEmails = ['admin@mysertifico.com', 'test@example.com'];
        if (existingEmails.includes(formData.email.toLowerCase())) {
            newErrors.email = 'This email address is already registered.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleNextStep();
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <h2 className="font-bold text-2xl text-gray-800">Administrator Details</h2>
            <p className="text-gray-500 mb-6">Start by creating your personal admin account.</p>

            <AuthInputField
                iconClass="ri-user-line"
                label="Your Full Name"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => validate()} // Validate on blur
                required
                error={errors.fullName}
            />
            <AuthInputField
                iconClass="ri-mail-line"
                label="Email Address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => validate()}
                required
                error={errors.email}
            />
            <AuthInputField
                iconClass="ri-lock-line"
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => validate()}
                required
                error={errors.password}
                // FIXED: Added this prop to enable the strength meter
                showPasswordStrength={true}
            />
            <AuthInputField
                iconClass="ri-lock-line"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => validate()}
                required
                error={errors.confirmPassword}
            />

            <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
                Continue <i className="ri-arrow-right-line"></i>
            </button>
        </form>
    );
};

export default AdminDetailsForm;
