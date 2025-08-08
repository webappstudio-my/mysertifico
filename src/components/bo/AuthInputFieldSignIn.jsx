// src/components/auth/AuthInputFieldSignIn.jsx
import React, { useState } from 'react';

const AuthInputField = ({ iconClass, label, type, id, name, value, onChange, required = false, placeholder, error, onBlur, showPasswordStrength = false, passwordStrength = 0, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine input type for password field
    const inputType = type === 'password' && showPassword ? 'text' : type;

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
                    onChange={onChange}
                    onBlur={onBlur} // Added onBlur for validation
                    required={required}
                    placeholder={placeholder || label}
                    className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
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
            {showPasswordStrength && type === 'password' && (
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                    <div
                        className={`h-2 rounded-full transition-all`}
                        style={{
                            width: `${passwordStrength}%`, backgroundColor:
                                passwordStrength <= 25 ? '#ef4444' : // red-500
                                    passwordStrength <= 50 ? '#f59e0b' : // amber-500
                                        passwordStrength <= 75 ? '#3b82f6' : // blue-500
                                            '#22c55e' // green-500
                        }}
                    ></div>
                </div>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default AuthInputField;