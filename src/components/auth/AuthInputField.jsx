import React, { useState } from 'react';

// Password validate function
const validatePassword = (password) => {
    const minLength = 8;
    const hasSymbol = /[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    let strength = 0;

    // Award points for each requirement met
    if (password.length >= minLength) strength += 25;
    if (hasSymbol) strength += 25;
    if (hasUpperCase) strength += 25;
    // Combine lowercase and numbers for the last 25%
    if (hasLowerCase && hasNumber) {
        strength += 25;
    } else if (hasLowerCase || hasNumber) {
        // Award partial points if one is met
        strength += 12.5;
    }

    return { strength };
};

const AuthInputField = ({ iconClass, label, type, id, name, value, onChange, required = false, placeholder, error, onBlur, showPasswordStrength = false, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    // Determine input type for password field
    const inputType = type === 'password' && showPassword ? 'text' : type;

    const handlePasswordChange = (e) => {
        if (!passwordTouched) setPasswordTouched(true);
        onChange(e);
    };

    const handleBlur = (e) => {
        if (!passwordTouched) setPasswordTouched(true);
        if (onBlur) {
            onBlur(e);
        }
    };

    const { strength } = validatePassword(value || '');

    // Password strength text and color
    const getPasswordStrengthInfo = () => {
        if (strength < 30) return { text: 'Weak', color: 'text-red-400' };
        if (strength < 60) return { text: 'Fair', color: 'text-amber-400' };
        if (strength < 80) return { text: 'Good', color: 'text-blue-400' };
        return { text: 'Strong', color: 'text-green-500' };
    };

    const strengthInfo = getPasswordStrengthInfo();

    // Helper function to determine strength bar color.
    // This function NO LONGER sets the width, only the color.
    const getStrengthBarColor = () => {
        if (strength < 30) return 'bg-red-500';
        if (strength < 60) return 'bg-amber-500';
        if (strength < 80) return 'bg-blue-500';
        return 'bg-green-500';
    };

    // Helper to check individual password requirements for the UI
    const requirements = {
        length: (value?.length || 0) >= 8,
        uppercase: /[A-Z]/.test(value || ''),
        lowercase: /[a-z]/.test(value || ''),
        number: /\d/.test(value || ''),
        symbol: /[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value || ''),
    };

    return (
        <div>
            <label htmlFor={id} className="sr-only">{label}</label>
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={`${iconClass} text-gray-400`}></i>
                </div>
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={type === 'password' ? handlePasswordChange : onChange}
                    onBlur={handleBlur}
                    required={required}
                    placeholder={placeholder || label}
                    className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
                    {...props}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="password-toggle absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                    </button>
                )}
            </div>
            {showPasswordStrength && type === 'password' && passwordTouched && (
                <div className="mt-2">
                    {/* Password Strength Bar */}
                    <div className='flex justify-between items-center mb-1'>
                        <span className='text-xs font-medium text-gray-700 dark:text-gray-200'>Password Strength</span>
                        <span className={`text-xs font-medium ${strengthInfo.color}`}>
                            {strengthInfo.text}
                        </span>
                    </div>
                    <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 rounded-full ${getStrengthBarColor()}`}
                            // The width is now ONLY controlled by this inline style for a smooth animation
                            style={{ width: `${strength}%` }}
                        ></div>
                    </div>

                    {/* Password Requirements Checklist */}
                    <div className="mt-2 text-xs">
                        <div className="space-y-1">
                            <div className="font-medium text-gray-700 dark:text-gray-200">Password must contain at least:</div>
                            <div className="ml-2 space-y-0.5">
                                <div className={requirements.length ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                    • 8 characters
                                </div>
                                <div className={requirements.uppercase ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                    • One uppercase letter
                                </div>
                                <div className={requirements.lowercase ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                    • One lowercase letter
                                </div>
                                <div className={requirements.number ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                    • One number
                                </div>
                                <div className={requirements.symbol ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                    • One symbol (@, #, $, etc.)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default AuthInputField;
