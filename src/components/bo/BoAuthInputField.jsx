// src/components/bo/BoAuthInputField.jsx
// Change for BO authentication input fields
import React, { useState } from 'react';

const BoAuthInputField = ({  label, type, id, name, value, onChange, required = false, placeholder, error, onBlur, showPasswordStrength = false, passwordStrength = 0, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    // Determine input type for password field
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Password strength text and color
    const getPasswordStrengthInfo = () => {
        if (passwordStrength <= 25) return { text: 'Weak', color: 'text-red-400' };
        if (passwordStrength <= 50) return { text: 'Fair', color: 'text-amber-400' };
        if (passwordStrength <= 75) return { text: 'Good', color: 'text-blue-400' };
        return { text: 'Strong', color: 'text-green-500' };
    };

    const strengthInfo = getPasswordStrengthInfo();

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

            {/* Password strength indicator */}
            {showPasswordStrength && type === 'password' && value && (
                <div className='mt-2'>
                    <div className='flex justify-between items-center mb-1'>
                        <span className='text-xs text-slate-300 font-medium'>Password Strength</span>
                        <span className={`text-xs font-medium ${strengthInfo.color}`}>
                            {strengthInfo.text}
                        </span>
                    </div>
                    <div className='h-2 w-full bg-slate-600 rounded-full'>
                        <div
                            className={`h-2 rounded-full transition-all duration-300 
                                ${passwordStrength <= 25 ? 'bg-red-500': 
                                    passwordStrength <= 50 ? 'bg-amber-500': 
                                    passwordStrength <= 75 ? 'bg-blue-500' : 
                                    'bg-green-500'}`}
                            style={{ width: `${passwordStrength}%` }}
                        />
                    </div>

                    {/*}
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
                    */}

                     {/* Password Requirements */}
                    <div className="mt-2 text-xs text-slate-400">
                        <div className="space-y-1">
                            <div className="text-slate-300 font-medium">Password must contain:</div>
                            <div className="ml-2 space-y-0.5">
                                <div className={value?.length >= 8 ? 'text-green-400' : 'text-slate-400'}>
                                    • At least 8 characters
                                </div>
                                <div className={/[A-Z]/.test(value) ? 'text-green-400' : 'text-slate-400'}>
                                    • One uppercase letter
                                </div>
                                <div className={/[a-z]/.test(value) ? 'text-green-400' : 'text-slate-400'}>
                                    • One lowercase letter
                                </div>
                                <div className={/\d/.test(value) ? 'text-green-400' : 'text-slate-400'}>
                                    • One number
                                </div>
                                <div className={/[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value) ? 'text-green-400' : 'text-slate-400'}>
                                    • One symbol (@, #, $, %, etc.)
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

export default BoAuthInputField;