// src/components/bo/BoPasswordResetForm.jsx
import React from 'react';
import BoAuthInputField from './BoAuthInputField';

const BoPasswordResetForm = ({
    formData,
    handleChange,
    handleSubmit,
    errors,
    loading = false,
    passwordStrength = 0, // New prop for password strength
}) => {
    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <BoAuthInputField
                iconClass='ri-lock-line'
                label='New Password'
                type='password'
                id='newPassword'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleChange}
                required
                autoFocus
                error={errors.newPassword}
                disabled={loading}
                placeholder={'Enter your new password'}
                showPasswordStrength={true} // Show password strength indicator
                passwordStrength={passwordStrength} // Pass the password strength
            />

            <BoAuthInputField
                iconClass='ri-lock-line'
                label='Confirm New Password'
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={errors.confirmPassword}
                disabled={loading}
                placeholder={'Confirm your new password'}
            />

            <div>
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? ( 
                        <>
                            <i className='ri-loader-4-line animate-spin'></i>
                            Resetting Password...
                        </>
                    ) : (
                        <>
                            Reset Password
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default BoPasswordResetForm;