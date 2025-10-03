// src/components/auth/OrganizationDetailsForm.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInputField from './AuthInputField';

const OrganizationDetailsForm = ({ formData, handleChange, handleSubmit, handlePrevStep, setErrors, errors }) => {
    const [countryMessage, setCountryMessage] = useState({ text: '', type: '' }); // type: 'indonesia' or 'others'
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (formData.country === 'ID') {
            setCountryMessage({ text: 'Our service for Indonesia will be available shortly. Please check back later.', type: 'indonesia' });
            setIsButtonDisabled(true);
        } else if (formData.country === 'ZZ') {
            setCountryMessage({ text: 'Currently, our service is not available in the selected country. We are expanding our reach continuously.', type: 'others' });
            setIsButtonDisabled(true);
        } else {
            setCountryMessage({ text: '', type: '' });
            setIsButtonDisabled(false);
        }
    }, [formData.country, setIsButtonDisabled]);

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.organizationName.trim()) {
            newErrors.organizationName = 'Organization name is required.';
            isValid = false;
        }
        if (!formData.country) {
            newErrors.country = 'Please select a country.';
            isValid = false;
        }
        if (!formData.terms) { // Assuming 'terms' is a boolean in formData
            newErrors.terms = 'You must agree to the terms.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validate() && !isButtonDisabled) {
            handleSubmit(e); // Call parent submit
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleFormSubmit} noValidate>
            <h2 className="font-bold text-2xl text-gray-800">Organization Details</h2>
            <p className="text-gray-500 mb-6">Tell us about your school or institution.</p>

            <AuthInputField
                iconClass="ri-building-4-line"
                label="Organization Name"
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                onBlur={() => validate()}
                required
                error={errors.organizationName}
            />

            <div>
                <label htmlFor="country" className="sr-only">Country</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <i className="ri-earth-line text-gray-400"></i>
                    </div>
                    <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={() => validate()}
                        className={`pl-10 mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary appearance-none ${errors.country ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">-- Select Country --</option>
                        <option value="MY">Malaysia</option>
                        <option value="ID">Indonesia</option>
                        <option value="ZZ">Others</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                {countryMessage.text && (
                    <div className={`mt-2 p-3 text-sm rounded-lg ${countryMessage.type === 'indonesia' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {countryMessage.text}
                    </div>
                )}
            </div>

            <div className="flex items-start pt-2">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms || false}
                    onChange={(e) => handleChange({ target: { name: 'terms', value: e.target.checked } })}
                    onBlur={() => validate()}
                    required
                    className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1 ${errors.terms ? 'border-red-500' : ''
                        }`}
                />
                <label htmlFor="terms" className="ml-3 block text-sm text-gray-900">
                    I agree to the <Link to="/terms-of-service" className="font-medium text-primary hover:underline">Terms and Conditions</Link> and confirm that I am an authorized representative of this organization.
                </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs -mt-2">{errors.terms}</p>}

            {errors.api && (
                <div className="text-red-500 text-sm text-center mt-4">
                    {errors.api}
                </div>
            )}

            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/2 py-3 px-4 rounded-lg text-primary font-semibold border border-primary hover:bg-primary-100 flex items-center justify-center gap-2 transition-colors"
                >
                    <i className="ri-arrow-left-line"></i> Back
                </button>
                <button
                    type="submit"
                    id="complete-registration-button"
                    className={`w-1/2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition-colors ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                        }`}
                    disabled={isButtonDisabled}
                >
                    Complete Registration
                </button>
            </div>
        </form>
    );
};

export default OrganizationDetailsForm;