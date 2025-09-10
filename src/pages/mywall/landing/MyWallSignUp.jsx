import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthInputField from '../../../components/auth/AuthInputField';

// darkmode theme in App.jsx
const MyWallSignUp = ({ theme, onThemeToggle}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: 'Malaysia',
        userType: 'Student',
    });

    const countries = 
    ["Malaysia", "Singapore", "Indonesia", "Brunei Darussalam", "Thailand", "Philippines", "Vietnam", "Myanmar", "Cambodia",
     "Laos", "Timor-Leste", "---", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
     "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
     "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Bulgaria", "Burkina Faso", "Burundi", 
     "Cabo Verde", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
     "Democratic Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", 
     "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
     "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", 
     "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Iran", "Iraq", "Ireland", "Italy", 
     "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", 
     "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Maldives", "Mali", "Malta", 
     "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
     "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", 
     "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", 
     "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
     "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Slovakia", "Slovenia", 
     "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
     "Syria", "Taiwan", "Tajikistan", "Tanzania", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", 
     "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
     "Venezuela", "Yemen", "Zambia", "Zimbabwe"]

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear password error when user types in either password field
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }
    };

    /* when integration with backend is ready
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false); // End loading
    }
    };
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Clear any existing errors
        setPasswordError('');

        // Simulate API call
        console.log('MyWall registration submitted.');
        setRegistrationSuccess(true);
    };
    
    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">


            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative flex flex-col m-6 space-y-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    {/* Left Box */}
                    <div className="relative w-full md:w-1/2">
                        <img 
                                src="https://placehold.co/800x1200/134E4A/ffffff?text=MyWall"
                                alt="A student smiling and holding books"
                                className="w-full h-full hidden md:block rounded-l-2xl object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-90 md:rounded-l-2xl">
                        </div>
                        <div className="absolute bottom-10 left-10 text-white">
                            <h2 className="text-4xl font-bold font-poppins">MyWall</h2>
                            <p className="text-lg text-primary-200">Your Personal Wall of Achievements</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 rounded-r-2xl md:rounded-l-none rounded-2xl">
                        {/* Theme Toggle */}
                        <div className="absolute top-6 right-6">
                            <button 
                                onClick={onThemeToggle}
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 text-xl"
                            >
                                <i className={`ri-moon-line ${theme === 'dark' ? 'hidden' : 'block'}`}></i>
                                <i className={`ri-sun-line ${theme === 'dark' ? 'block' : 'hidden'}`}></i>
                            </button>
                        </div>

                        <h2 className="font-bold text-3xl text-gray-800 dark:text-white">Create Your MyWall</h2>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mb-4">Your lifelong digital wall for all your certificates.</p>

                        {/* Success Message */}
                        {registrationSuccess && (
                            <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
                                <i className="ri-checkbox-circle-line mr-3"></i>
                                <div>
                                    <span className="font-medium">Account created successfully!</span> Please check your email to verify your account.
                                </div>
                            </div>
                        )}

                        {!registrationSuccess && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <AuthInputField
                                        iconClass="ri-user-line"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder=""
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <AuthInputField
                                        iconClass="ri-mail-line"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder=""
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                    <AuthInputField
                                        iconClass="ri-lock-line"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder=""
                                        showPasswordStrength={true}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                                    <AuthInputField
                                        iconClass="ri-lock-line"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder=""
                                        error={passwordError}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                    <select 
                                        id="country" 
                                        name="country" 
                                        value={formData.country}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none text-black focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                                    >
                                        <option value="">-- Select your country --</option>
                                        {countries.map((country, index) => 
                                            country === "---" ? (
                                                <option key={index} disabled>──────────</option>
                                            ) : (
                                                <option key={index} value={country}>{country}</option>
                                            )
                                        )}
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">I am a</label>
                                    <select 
                                        id="user_type" 
                                        name="userType" 
                                        value={formData.userType}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none text-black focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300"
                                    >
                                        <option value="student">Student</option>
                                        <option value="parent">Parent / Guardian</option>
                                    </select>
                                </div>

                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    By clicking "Create Account", you agree to our <Link to="/mywall/terms-of-service" className="text-primary-mywall hover:underline">Terms of Service</Link> and <Link to="/mywall/privacy-policy" className="text-primary-mywall hover:underline">Privacy Policy</Link>.
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors"
                                >
                                    Create MyWall Account
                                </button>
                            </form>
                        )}

                        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                            Already have a MyWall account? <Link to="/mywall/sign-in" className="font-semibold text-primary-mywall hover:underline">Sign In here</Link>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWallSignUp;