import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../../../components/mywall/StudentNavbar';
import Toast from '../../../components/mywall/Toast';

const StudentEditProfile = () => {
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [isToastError, setIsToastError] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Taufik Nabil bin Yusoff',
        nationalId: '950101-03-1234',
        phone: '+60 12-345 6789',
        country: 'MY',
        email: 'taufik.nabil@email.com',
        address: 'A-12-01, The Horizon Residence, Jalan Tun Razak',
        city: 'Kuala Lumpur',
        postcode: '50400',
        aboutMe: 'Ambitious and driven professional with a passion for software engineering and machine learning. Eager to apply technical knowledge to real-world challenges and contribute to innovative projects. Proven ability to work in teams and adapt to new technologies quickly.',
        skills: 'Python, JavaScript, React, SQL, Project Management, Public Speaking',
        linkedin: 'https://linkedin.com/in/taufiknabil-example',
        github: 'https://github.com/taufiknabil-example',
        portfolio: 'https://taufiknabil.myportfolio.com'
    });

    const showToastMessage = (message, isError = false) => {
        setToastMessage(message);
        setIsToastError(isError);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showToastMessage('Profile updated successfully!');
        setTimeout(() => {
            navigate('/mywall/student-myprofile');
        }, 1000);
    };

    const handleCancel = () => {
        navigate('/mywall/student-myprofile');
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <StudentNavbar />

            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 border-b border-primary-mywall-800/50">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="text-primary-mywall-200 hover:text-white transition-colors"
                                            title="Back to Profile"
                                        >
                                            <i className="ri-arrow-left-line text-2xl"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* Personal Info Section */}
                                    <fieldset className="space-y-4">
                                        <legend className="text-lg font-semibold text-primary-mywall-300 mb-2">Personal Information</legend>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-primary-mywall-200 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="nationalId" className="block text-sm font-medium text-primary-mywall-200 mb-1">National ID / Passport No.</label>
                                                <input
                                                    type="text"
                                                    id="nationalId"
                                                    name="nationalId"
                                                    value={formData.nationalId}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-primary-mywall-200 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-primary-mywall-200 mb-1">Country</label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all"
                                                >
                                                    <option value="" disabled>Select your country</option>
                                                    <option value="MY">Malaysia</option>
                                                    <option value="SG">Singapore</option>
                                                    <option value="ID">Indonesia</option>
                                                    <option value="BN">Brunei Darussalam</option>
                                                    <option value="TH">Thailand</option>
                                                    <option value="US">United States</option>
                                                    <option value="GB">United Kingdom</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-primary-mywall-200 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="w-full px-4 py-2 bg-white/10 text-primary-mywall-200 placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:outline-none transition-all cursor-not-allowed"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="address" className="block text-sm font-medium text-primary-mywall-200 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-primary-mywall-200 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="postcode" className="block text-sm font-medium text-primary-mywall-200 mb-1">Postcode</label>
                                                <input
                                                    type="text"
                                                    id="postcode"
                                                    name="postcode"
                                                    value={formData.postcode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Professional Info Section */}
                                    <fieldset className="space-y-4">
                                        <legend className="text-lg font-semibold text-primary-mywall-300 mb-2">Professional Information</legend>
                                        <div>
                                            <label htmlFor="aboutMe" className="block text-sm font-medium text-primary-mywall-200 mb-1">About Me</label>
                                            <textarea
                                                id="aboutMe"
                                                name="aboutMe"
                                                rows="4"
                                                value={formData.aboutMe}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="skills" className="block text-sm font-medium text-primary-mywall-200 mb-1">Skills (comma separated)</label>
                                            <input
                                                type="text"
                                                id="skills"
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="linkedin" className="block text-sm font-medium text-primary-mywall-200 mb-1">LinkedIn URL</label>
                                                <input
                                                    type="url"
                                                    id="linkedin"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="github" className="block text-sm font-medium text-primary-mywall-200 mb-1">GitHub URL</label>
                                                <input
                                                    type="url"
                                                    id="github"
                                                    name="github"
                                                    value={formData.github}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="portfolio" className="block text-sm font-medium text-primary-mywall-200 mb-1">Portfolio URL</label>
                                                <input
                                                    type="url"
                                                    id="portfolio"
                                                    name="portfolio"
                                                    value={formData.portfolio}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Toast
                message={toastMessage}
                isError={isToastError}
                show={showToast}
            />
        </div>
    );
};

export default StudentEditProfile;