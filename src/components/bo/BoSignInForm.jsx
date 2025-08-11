// src/components/bo/BoSignInForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BoAuthInputField from './BoAuthInputField'; // Reusing the AuthInputField component

const BoSignInForm = ({ 
    formData, 
    handleChange, 
    handleSubmit, 
    errors,
    loading = false, 
}) => {
    return (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <BoAuthInputField
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
            <BoAuthInputField
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
                        className="h-4 w-4 text-teal-400 focus:ring-teal-400 focus:ring-offset-slate-800 border-slate-600 bg-slate-700 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                        Remember me
                        </label>
                </div>
                <div className="text-sm">
                    <Link to="/auth/forgot-password" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                    Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <i className='ri-loader-4-line animate-spin'></i>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <i className=''></i>
                            Sign In
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default BoSignInForm;