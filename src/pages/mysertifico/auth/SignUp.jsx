import React, { useState } from 'react';

const SignUp = ({ navigate }) => {
    const [step, setStep] = useState(1);
    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [country, setCountry] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [adminNameError, setAdminNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [orgNameError, setOrgNameError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [termsError, setTermsError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', iconClass: '', iconColor: '' });

    // Dummy database for existing emails
    const existingEmails = ['admin@mysertifico.com', 'test@example.com'];

    const validateField = (id, value, extraValue = null) => {
        let isValid = true;
        let errorMessage = '';

        switch (id) {
            case 'admin-name':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Full name is required.';
                }
                setAdminNameError(errorMessage);
                break;
            case 'email':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Email address is required.';
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                } else if (existingEmails.includes(value.toLowerCase())) {
                    isValid = false;
                    errorMessage = 'This email address is already registered.';
                }
                setEmailError(errorMessage);
                break;
            case 'password':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Password is required.';
                } else if (value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters.';
                }
                setPasswordError(errorMessage);
                break;
            case 'confirm-password':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Confirm password is required.';
                } else if (value !== extraValue) {
                    isValid = false;
                    errorMessage = 'Passwords do not match.';
                }
                setConfirmPasswordError(errorMessage);
                break;
            case 'org-name':
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = 'Organization name is required.';
                }
                setOrgNameError(errorMessage);
                break;
            case 'country':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a country.';
                }
                setCountryError(errorMessage);
                break;
            case 'terms':
                if (!value) {
                    isValid = false;
                    errorMessage = 'You must agree to the terms.';
                }
                setTermsError(errorMessage);
                break;
            default:
                break;
        }
        return isValid;
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        const isNameValid = validateField('admin-name', adminName);
        const isEmailValid = validateField('email', email);
        const isPasswordValid = validateField('password', password);
        const isConfirmPasswordValid = validateField('confirm-password', confirmPassword, password);

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            setStep(2);
        }
    };

    const handleStep2Submit = (e) => {
        e.preventDefault();
        const isOrgNameValid = validateField('org-name', orgName);
        const isCountryValid = validateField('country', country);
        const areTermsAccepted = validateField('terms', termsAccepted);

        if (isOrgNameValid && isCountryValid && areTermsAccepted) {
            // Simulate successful registration
            setStep(3); // Show success message
        }
    };

    const getPasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
        if (pwd.match(/\d/)) strength++;
        if (pwd.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };

    const handleCountryChange = (e) => {
        const selectedValue = e.target.value;
        setCountry(selectedValue);
        validateField('country', selectedValue);

        if (selectedValue === 'ID') {
            setModalContent({
                title: "Coming Soon!",
                message: "Our service for Indonesia will be available shortly. Please check back later.",
                iconClass: "ri-time-line",
                iconColor: "bg-blue-100 text-blue-600"
            });
            setIsModalOpen(true);
        } else if (selectedValue === 'ZZ') {
            setModalContent({
                title: "Service Not Available",
                message: "Currently, our service is not available in the selected country. We are expanding our reach continuously.",
                iconClass: "ri-error-warning-line",
                iconColor: "bg-red-100 text-red-600"
            });
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 antialiased text-gray-800">
            <div className="grid lg:grid-cols-5 gap-0 items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Left Column: Branding and Information */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-700 to-primary-500 h-full lg:col-span-2">
                    <a href="#" onClick={() => navigate('home')} className="flex items-center gap-x-3 mb-8">
                        <img src="https://placehold.co/48x48/ffffff/0d9488?text=M" alt="MySertifico Logo" className="h-12 w-12 bg-white p-1 rounded-full" />
                        <span className="font-poppins text-4xl font-bold text-white">MySertifico</span>
                    </a>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Unlock the Future of Digital Certification.</h1>
                    <p className="text-primary-200 text-lg">Join thousands of organizations worldwide trusting MySertifico to issue, manage, and verify digital credentials securely.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-shield-check-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sign-up Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    <div className="text-center lg:hidden mb-8">
                        <a href="#" onClick={() => navigate('home')} className="flex items-center justify-center gap-x-2">
                            <img src="https://placehold.co/40x40/ffffff/0d9488?text=M" alt="MySertifico Logo" className="h-10 w-10" />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </a>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                                <span className="ml-2 font-semibold">Admin Details</span>
                            </div>
                            <div className={`flex-auto border-t-2 mx-4 ${step >= 2 ? 'border-primary' : 'border-gray-200'}`}></div>
                            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                                <span className="ml-2 font-semibold">Organization</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Create Account */}
                    {step === 1 && (
                        <div id="step1">
                            <h2 className="font-bold text-2xl text-gray-800">Administrator Details</h2>
                            <p className="text-gray-500 mb-6">Start by creating your personal admin account.</p>
                            <form onSubmit={handleStep1Submit} className="space-y-4" noValidate>
                                <div>
                                    <div className="relative">
                                        <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            id="admin-name"
                                            placeholder="Your Full Name"
                                            required
                                            className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${adminNameError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={adminName}
                                            onChange={(e) => { setAdminName(e.target.value); validateField('admin-name', e.target.value); }}
                                        />
                                    </div>
                                    {adminNameError && <p className="text-red-500 text-xs mt-1">{adminNameError}</p>}
                                </div>
                                <div>
                                    <div className="relative">
                                        <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }}
                                        />
                                    </div>
                                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                </div>
                                <div>
                                    <div className="relative">
                                        <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Password"
                                            required
                                            className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); validateField('password', e.target.value); }}
                                        />
                                        <button type="button" className="password-toggle absolute inset-y-0 right-0 px-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                                        </button>
                                    </div>
                                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                                        <div
                                            id="password-strength-bar"
                                            className={`h-2 rounded-full transition-all ${getPasswordStrength(password) <= 1 ? 'bg-red-500' : getPasswordStrength(password) === 2 ? 'bg-yellow-500' : getPasswordStrength(password) === 3 ? 'bg-blue-500' : 'bg-green-500'}`}
                                            style={{ width: `${getPasswordStrength(password) * 25}%` }}
                                        ></div>
                                    </div>
                                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                                </div>
                                <div>
                                    <div className="relative">
                                        <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirm-password"
                                            placeholder="Confirm Password"
                                            required
                                            className={`pl-10 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); validateField('confirm-password', e.target.value, password); }}
                                        />
                                        <button type="button" className="password-toggle absolute inset-y-0 right-0 px-3 flex items-center text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <i className={showConfirmPassword ? 'ri-eye-line' : 'ri-eye-off-line'}></i>
                                        </button>
                                    </div>
                                    {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                                </div>
                                <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                    Continue <i className="ri-arrow-right-line"></i>
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Step 2: Organisation Details */}
                    {step === 2 && (
                        <div id="step2">
                            <h2 className="font-bold text-2xl text-gray-800">Organization Details</h2>
                            <p className="text-gray-500 mb-6">Tell us about your school or institution.</p>
                            <form onSubmit={handleStep2Submit} className="space-y-4" noValidate>
                                <div>
                                    <div className="relative">
                                        <i className="ri-building-4-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            id="org-name"
                                            placeholder="Organization Name"
                                            required
                                            className={`pl-10 mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${orgNameError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={orgName}
                                            onChange={(e) => { setOrgName(e.target.value); validateField('org-name', e.target.value); }}
                                        />
                                    </div>
                                    {orgNameError && <p className="text-red-500 text-xs mt-1">{orgNameError}</p>}
                                </div>
                                <div>
                                    <div className="relative">
                                        <i className="ri-earth-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                        <select
                                            id="country"
                                            name="country"
                                            required
                                            className={`pl-10 mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary appearance-none ${countryError ? 'border-red-500' : 'border-gray-300'}`}
                                            value={country}
                                            onChange={handleCountryChange}
                                        >
                                            <option value="">-- Select Country --</option>
                                            <option value="MY">Malaysia</option>
                                            <option value="ID">Indonesia</option>
                                            <option value="ZZ">Others</option>
                                        </select>
                                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                    </div>
                                    {countryError && <p className="text-red-500 text-xs mt-1">{countryError}</p>}
                                </div>
                                <div className="flex items-start pt-2">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                                        checked={termsAccepted}
                                        onChange={(e) => { setTermsAccepted(e.target.checked); validateField('terms', e.target.checked); }}
                                    />
                                    <label htmlFor="terms" className="ml-3 block text-sm text-gray-900">
                                        I agree to the <a href="#" onClick={() => navigate('termsOfService')} className="font-medium text-primary hover:underline">Terms and Conditions</a> and confirm that I am an authorized representative of this organization.
                                    </label>
                                </div>
                                {termsError && <p className="text-red-500 text-xs -mt-2">{termsError}</p>}
                                <button
                                    type="submit"
                                    id="complete-registration-button"
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition-colors ${country === 'ID' || country === 'ZZ' ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : 'bg-primary hover:bg-primary-dark'}`}
                                    disabled={country === 'ID' || country === 'ZZ'}
                                >
                                    Complete Registration
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Success Message */}
                    {step === 3 && (
                        <div id="success-div" className="text-center">
                            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <i className="ri-check-double-line text-6xl text-green-600"></i>
                            </div>
                            <h2 className="mt-6 font-bold text-2xl text-gray-800">Registration Successful!</h2>
                            <p className="text-gray-500 mt-2">Thank you for joining MySertifico. Please check your email to verify your account and get started.</p>
                            <button onClick={() => navigate('signIn')} className="mt-8 inline-block w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                Proceed to Sign In
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        {step === 1 && (
                            <p id="footer-signin-link" className="text-sm text-gray-600">
                                Already have an account?
                                <a href="#" onClick={() => navigate('signIn')} className="font-medium text-primary hover:underline">Sign In</a>
                            </p>
                        )}
                        {step === 2 && (
                            <button id="back-button" className="text-sm font-medium text-primary hover:underline" onClick={() => setStep(1)}>
                                <i className="ri-arrow-left-line align-middle"></i> Back to previous step
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div id="country-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="modal-content relative bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg transform scale-100 opacity-100">
                        <div className="text-center">
                            <div id="modal-icon" className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modalContent.iconColor}`}>
                                <i className={`text-4xl ${modalContent.iconClass}`}></i>
                            </div>
                            <h3 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">{modalContent.title}</h3>
                            <p id="modal-message" className="text-gray-600 dark:text-gray-400 mt-2">{modalContent.message}</p>
                            <button id="modal-close-button" className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark" onClick={() => setIsModalOpen(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
