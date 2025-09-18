import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ParentEditProfileForm = ({ user, onSave }) => {
    const [profile, setProfile] = useState(user);

    useEffect(() => {
        setProfile(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(profile);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit}>
                <div className="p-6 border-b border-primary-800/50">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
                        <NavLink to="/mywall/parent-myprofile" className="text-primary-mywall-200 hover:text-white transition-colors" title="Back to Profile">
                            <i className="ri-arrow-left-line text-2xl"></i>
                        </NavLink>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    {/* Personal Info Section */}
                    <fieldset className="space-y-4">
                        <legend className="text-lg font-semibold text-primary-mywall-300 mb-2">Personal Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-primary-mywall-200 mb-1">Full Name</label>
                                <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <label htmlFor="nationalId" className="block text-sm font-medium text-primary-mywall-200 mb-1">National ID / Passport No.</label>
                                <input type="text" id="nationalId" name="nationalId" value={profile.nationalId} onChange={handleChange} required className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-primary-mywall-200 mb-1">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-primary-mywall-200 mb-1">Country</label>
                                <select id="country" name="country" value={profile.country} onChange={handleChange} required className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-primary-900/80 focus:outline-none transition-all appearance-none" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="%2399f6e4"%3E%3Cpath d="M12 16L6 10H18L12 16Z"%3E%3C/path%3E%3C/svg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.2em' }}>
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
                                <input type="email" id="email" name="email" value={profile.email} required className="w-full px-4 py-2 bg-white/10 text-primary-mywall-300 rounded-lg border-2 border-transparent focus:outline-none cursor-not-allowed" disabled />
                            </div>
                            {/* ... more fields ... */}
                        </div>
                    </fieldset>

                    {/* Professional Info Section */}
                    <fieldset className="space-y-4">
                        <legend className="text-lg font-semibold text-primary-mywall-300 mb-2">Professional Information</legend>
                        <div>
                            <label htmlFor="aboutMe" className="block text-sm font-medium text-primary-mywall-200 mb-1">About Me</label>
                            <textarea id="aboutMe" name="aboutMe" rows="4" value={profile.aboutMe} onChange={handleChange} className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all"></textarea>
                        </div>
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium text-primary-mywall-200 mb-1">Skills (comma separated)</label>
                            <input type="text" id="skills" name="skills" value={profile.skills} onChange={handleChange} className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-primary-mywall-200 mb-1">LinkedIn URL</label>
                            <input type="url" id="linkedin" name="linkedin" value={profile.linkedin} onChange={handleChange} className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:bg-white/30 focus:outline-none transition-all" />
                        </div>
                    </fieldset>
                </div>
                <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-800/50">
                    <NavLink to="/mywall/parent-myprofile" className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">Cancel</NavLink>
                    <button type="submit" className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default ParentEditProfileForm;