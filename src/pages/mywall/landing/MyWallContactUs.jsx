import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';

const MyWallContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white overflow-x-hidden">
            <Header />
            
            <main className="pt-24 pb-12">
                {/* Page Header Section */}
                <section className="py-16 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-poppins">Get In Touch</h1>
                        <p className="text-lg text-primary-mywall-200 mt-4 max-w-2xl mx-auto">We're here to help. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.</p>
                    </div>
                </section>

                {/* Contact Form & Info Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl lg:grid lg:grid-cols-3">
                            {/* Contact Info */}
                            <div className="p-8 lg:p-12 text-white">
                                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                                <p className="text-primary-mywall-200 mb-8">Fill up the form and our team will get back to you within 24 hours.</p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <i className="ri-mail-send-line text-2xl text-accent-mywall"></i>
                                        <a href="mailto:helpdesk@webappstudio.com" className="hover:text-accent-mywall">helpdesk@webappstudio.com</a>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <i className="ri-phone-line text-2xl text-accent-mywall"></i>
                                        <span>+60 19-489 2806</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <i className="ri-map-pin-line text-2xl text-accent-mywall mt-1"></i>
                                        <span>Webapp Studio Sdn. Bhd.<br/>83, Jalan KH 5, Kita Harmoni,<br/>Cybersouth, 47810 Dengkil,<br/>Selangor Darul Ehsan, Malaysia</span>
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-white/20">
                                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-primary-mywall-200 hover:text-white text-2xl" title="Facebook"><i className="ri-facebook-box-fill"></i></a>
                                        <a href="#" className="text-primary-mywall-200 hover:text-white text-2xl" title="Instagram"><i className="ri-instagram-fill"></i></a>
                                        <a href="#" className="text-primary-mywall-200 hover:text-white text-2xl" title="TikTok"><i className="ri-tiktok-fill"></i></a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="p-8 lg:p-12 lg:col-span-2 bg-white rounded-r-2xl text-gray-800">
                                <h2 className="text-2xl font-bold text-primary-mywall-900 mb-6">Send us a Message</h2>
                                
                                {/* Success Message */}
                                {isSubmitted && (
                                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                                        <i className="ri-checkbox-circle-line mr-3"></i>
                                        <div>
                                            <span className="font-medium">Message Sent!</span> Thank you for contacting us. We will get back to you shortly.
                                        </div>
                                    </div>
                                )}

                                {!isSubmitted && (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                required 
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-mywall focus:border-primary-mywall"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                required 
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-mywall focus:border-primary-mywall"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                id="subject" 
                                                required 
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-mywall focus:border-primary-mywall"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                            <textarea 
                                                id="message" 
                                                name="message" 
                                                rows="4" 
                                                required 
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-mywall focus:border-primary-mywall"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <button 
                                                type="submit" 
                                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-accent-mywall hover:bg-accent-mywall-hover font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-mywall-hover"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MyWallContactUs;