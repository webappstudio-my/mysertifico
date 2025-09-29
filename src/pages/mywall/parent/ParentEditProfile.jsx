import React, { useState } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import ParentEditProfileForm from '../../../components/mywall/ParentEditProfileForm';
import Toast from '../../../components/mywall/Toast';

const ParentEditProfile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        nationalId: '900101-10-1234',
        phone: '012-3456789',
        country: 'MY',
        email: 'john.doe@example.com',
        address: 'No. 1, Jalan 2, Taman 3',
        city: 'Kuala Lumpur',
        postcode: '50000',
        aboutMe: 'I am a software engineer.',
        skills: 'React, Node.js, TypeScript',
        linkedin: 'https://www.linkedin.com/in/johndoe',
    });

    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
    };

    const handleSave = (formData) => {
        // In a real application, you would send this data to a server.
        console.log('Saving data:', formData);
        setUser(formData);
        showToast('Profile updated successfully!');
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <MyWallNavbar />

            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center sm:text-left mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">Edit Profile</h1>
                            <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl">Update your personal information.</p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <ParentEditProfileForm user={user} onSave={handleSave} />
                        </div>
                    </div>
                </section>
            </main>

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />
        </div>
    );
};

export default ParentEditProfile;