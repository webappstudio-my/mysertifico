// src/components/auth/AdminDetailsForm.jsx
import React, { useState } from 'react';
import AuthInputField from './AuthInputField';

const AdminDetailsForm = ({ formData, handleChange, handleNextStep, setErrors, errors }) => {
    const [passwordStrength, setPasswordStrength] = useState(0);

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
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        handleChange(e); // Pass event up to parent

        // Calculate password strength
        let strength = 0;
        if (value.length >= 8) strength += 25;
        if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength += 25;
        if (value.match(/\d/)) strength += 25;
        if (value.match(/[^a-zA-Z\d]/)) strength += 25;
        setPasswordStrength(strength);
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
                onChange={handlePasswordChange} // Use custom handler for password
                onBlur={() => validate()}
                required
                error={errors.password}
                showPasswordStrength={true}
                passwordStrength={passwordStrength}
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