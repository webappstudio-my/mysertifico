// src/components/auth/SignInForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AuthInputField from './AuthInputField'; // Reusing the AuthInputField component

const SignInForm = ({ 
    formData, 
    handleChange, 
    handleSubmit, 
    errors,
    loading = false, 
}) => {
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
                autoFocus
                autoComplete="email"
                error={errors.email}
                disabled={loading}
                placeholder={'Enter your email address'}
            />

            <AuthInputField
                iconClass="ri-lock-line"
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                error={errors.password}
                disabled={loading}
                placeholder={'Enter your password'}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe || false}
                        onChange={(e) => handleChange({
                             target: {
                                 name: 'rememberMe', 
                                 value: e.target.checked 
                                } 
                            })}
                            disabled={loading}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                        </label>
                </div>
                <div className="text-sm">
                    <Link to="/auth/forgot-password" className="font-medium text-primary hover:underline">
                    Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                    {loading ? (
                        <>
                            <i className='ri-loader-4-line animate-spin'></i>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <i className='ri-login-box-line'></i>
                            Sign In
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SignInForm;