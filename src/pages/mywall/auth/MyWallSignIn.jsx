import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../../../components/auth/SignInForm';

const MyWallSignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Dummy registered users for client-side validation (replace with actual backend check)
    const registeredUsers = {
        'admin@mysertifico.com': 'password123',
        'user@example.com': 'securepass',
    };

    const handleChange = (e) => {
        const { name, value,type,checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setError((prev) => ({
            ...prev,
            [name]: '',
        }));
        if (generalError) {
            setGeneralError('');
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneralError('');
        setIsSuccess(false);

        let newErrors = {};
        let isValid = true;

        // Validate Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        } else if (!registeredUsers[formData.email.toLowerCase()]) {
            newErrors.email = 'This email is not registered. Please sign up.';
            isValid = false;
        }

        // Validate Password
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (registeredUsers[formData.email.toLowerCase()] && registeredUsers[formData.email.toLowerCase()] !== formData.password) {
            newErrors.password = 'Incorrect password. Please try again.';
            isValid = false;
        }

        setError(newErrors);

        setTimeout(() => {
            setLoading(false);

            if (isValid) {
                if (formData.rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                if (newErrors.email || newErrors.password) {
                    setGeneralError('Please correct the error and try again.');
                }
            }
        }, 1000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="relative flex flex-col m-6 space-y-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                {/* Left Side */}
                <div className="relative w-full md:w-1/2">
                    <img 
                        src="/src/assets/images/frontend/welcome1.png"
                        alt="A student smiling and holding books"
                        className="w-full h-full hidden md:block rounded-l-2xl object-cover"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/800x1200/134E4A/ffffff?text=MyWall';
                        }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-mywall-900 to-transparent opacity-90 md:rounded-l-2xl"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                        <h2 className="text-4xl font-bold font-poppins">MyWall</h2>
                        <p className="text-lg text-primary-200">Your Personal Wall of Achievements</p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="font-bold text-3xl text-gray-800 dark:text-white">Sign In to MyWall</h2>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mb-8">Welcome back! Please enter your details.</p>

                    {generalError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                            {generalError}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-700 rounded-lg text-sm">
                            Sign-in successful! Redirecting...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                className="mt-1 w-full p-3 border rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
                            />
                            {error.email && (
                                <p className="mt-1 text-sm text-red-600">{error.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    name="password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                    className="mt-1 w-full p-3 border rounded-lg pr-10 text-black focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 px-3 text-gray-500 dark:text-gray-400"
                                >
                                    <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                                </button>
                            </div>
                            {error.password && (
                                <p className="mt-1 text-sm text-red-600">{error.password}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="rememberMe" 
                                    name="rememberMe" 
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <Link 
                                to="/mywall/auth/forgot-password" 
                                className="text-sm font-semibold text-primary hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link to="/mywall/auth/sign-up" className="font-semibold text-primary hover:underline">Sign Up here</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWallSignIn;