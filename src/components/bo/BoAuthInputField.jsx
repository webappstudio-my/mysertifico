// src/components/bo/BoAuthInputField.jsx
// Change for BO authentication input fields
import React, { useState } from 'react';

const BoAuthInputField = ({ iconClass, label, type, id, name, value, onChange, required = false, placeholder, error, onBlur, showPasswordStrength = false, passwordStrength = 0, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    // Determine input type for password field
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
                {label}
                </label>
            <div className="relative">
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} // Added onBlur for validation
                    required={required}
                    placeholder={placeholder || label}
                    className="block w-full px-3 py-2.5 rounded-md shadow-sm text-slate-200 bg-slate-600 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-slate-700 sm:text-sm border-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    {...props}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="password-toggle absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
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

export default BoAuthInputField;