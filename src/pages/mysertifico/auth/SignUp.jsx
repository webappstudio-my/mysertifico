// src/pages/mysertifico/SignUpPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stepper from '../../../components/auth/Stepper';
import AdminDetailsForm from '../../../components/auth/AdminDetailsForm';
import OrganizationDetailsForm from '../../../components/auth/OrganizationDetailsForm';
import CountryRestrictionModal from '../../../components/auth/CountryRestrictionModal';
import logo from '../../../assets/images/logos/logo.png'; // Adjust the path as necessary

const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        organizationName: '',
        country: '', // Default to empty for select country option
        terms: false,
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // For final registration button
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const steps = [
        { title: 'Admin Details' },
        { title: 'Organization' },
    ];

    // Effect to handle country restriction logic and disable button
    useEffect(() => {
        if (formData.country === 'ID') {
            setIsModalOpen(true);
            setModalType('indonesia');
            setIsButtonDisabled(true);
        } else if (formData.country === 'ZZ') {
            setIsModalOpen(true);
            setModalType('others');
            setIsButtonDisabled(true);
        } else {
            setIsModalOpen(false);
            setModalType('');
            setIsButtonDisabled(false);
        }
    }, [formData.country]); // Depend on formData.country

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear error for the field being changed
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleNextStep = () => {
        // Basic validation for current step before moving
        let currentStepErrors = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.fullName.trim()) { currentStepErrors.fullName = 'Full name is required.'; isValid = false; }
            if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) { currentStepErrors.email = 'Please enter a valid email address.'; isValid = false; }
            const existingEmails = ['admin@mysertifico.com', 'test@example.com']; // Dummy check
            if (existingEmails.includes(formData.email.toLowerCase())) { currentStepErrors.email = 'This email address is already registered.'; isValid = false; }
            if (!formData.password) { currentStepErrors.password = 'Password is required.'; isValid = false; }
            else if (formData.password.length < 8) { currentStepErrors.password = 'Password must be at least 8 characters.'; isValid = false; }
            if (formData.password !== formData.confirmPassword) { currentStepErrors.confirmPassword = 'Passwords do not match.'; isValid = false; }
        }

        setErrors(currentStepErrors);

        if (isValid) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
        setErrors({}); // Clear errors when going back
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Final submission logic
        if (isButtonDisabled) {
            // Modal should already be open, just prevent submission
            return;
        }

        // Simulate API call
        console.log('Final Form Data:', formData);
        // In a real app, you'd send this to your backend
        // On success:
        setRegistrationSuccess(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 antialiased text-gray-800 p-4">
            <div className="grid lg:grid-cols-5 gap-0 items-center max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Left Column: Branding and Information (Desktop Only) */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-dark to-primary-light h-full lg:col-span-2">
                    <Link to="/" className="flex items-center gap-x-3 mb-8">
                        <img src={logo} alt="MySertifico Logo" className="h-12 w-12" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/ffffff/0d9488?text=M'; }} />
                        <span className="font-poppins text-4xl font-bold text-white">MySertifico</span>
                    </Link>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">Unlock the Future of Digital Certification.</h1>
                    <p className="text-teal-100 text-lg">Join thousands of organizations worldwide trusting MySertifico to issue, manage, and verify digital credentials securely.</p>
                    <div className="mt-12 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 bg-primary-400 opacity-20 rounded-full blur-2xl"></div>
                            <i className="ri-shield-check-line text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: '12rem' }}></i>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sign-up Form */}
                <div className="p-8 sm:p-12 lg:col-span-3">
                    {/* Logo for mobile/single column view */}
                    <div className="text-center lg:hidden mb-8">
                        <Link to="/" className="flex items-center justify-center gap-x-2">
                            <img src={logo} alt="MySertifico Logo" className="h-10 w-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/ffffff/0d9488?text=M'; }} />
                            <span className="font-poppins text-3xl font-bold text-primary">MySertifico</span>
                        </Link>
                    </div>

                    {!registrationSuccess ? (
                        <>
                            <Stepper currentStep={currentStep} steps={steps} />

                            {currentStep === 1 && (
                                <AdminDetailsForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleNextStep={handleNextStep}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            )}
                            {currentStep === 2 && (
                                <OrganizationDetailsForm
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    handlePrevStep={handlePrevStep}
                                    errors={errors}
                                    setErrors={setErrors}
                                    setIsButtonDisabled={setIsButtonDisabled} // Pass setter for button disablement
                                />
                            )}
                        </>
                    ) : (
                        // Success Message
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <i className="ri-check-double-line text-6xl text-green-600"></i>
                            </div>
                            <h2 className="mt-6 font-bold text-2xl text-gray-800">Registration Successful!</h2>
                            <p className="text-gray-500 mt-2">Thank you for joining MySertifico. Please check your email to verify your account and get started.</p>
                            <Link to="/auth/sign-in" className="mt-8 inline-block w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                Proceed to Sign In
                            </Link>
                        </div>
                    )}

                    {/* Footer Sign In Link / Back Button */}
                    <div className="mt-6 text-center">
                        {currentStep === 1 && !registrationSuccess && (
                            <p className="text-sm text-gray-600">
                                Already have an account?
                                <Link to="/auth/sign-in" className="font-medium text-primary hover:underline ml-1">Sign In</Link>
                            </p>
                        )}
                        {currentStep === 2 && !registrationSuccess && (
                            <button
                                onClick={handlePrevStep}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                <i className="ri-arrow-left-line align-middle"></i> Back to previous step
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <CountryRestrictionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalType={modalType}
            />
        </div>
    );
};

export default SignUp;