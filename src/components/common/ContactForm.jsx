// src/components/common/ContactForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/contact-us', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // 10 second timeout
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess(true);
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                
                // Hide success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            console.error('Error sending message:', err);
            
            // Handle different error types
            if (err.response) {
                // Server responded with error status
                setError(err.response.data.message || `Error: ${err.response.status}`);
            } else if (err.request) {
                // Request made but no response received
                setError('Unable to connect to server. Please check your connection.');
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
            
            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                    <p className="text-green-300 text-sm">
                        ✅ Message sent successfully! We'll get back to you soon.
                    </p>
                </div>
            )}
            
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                    <p className="text-red-300 text-sm">
                        ❌ {error}
                    </p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-teal-100">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your full name"
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-teal-100">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your email address"
                    />
                </div>
                
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-teal-100">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="What's this about?"
                    />
                </div>
                
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-teal-100">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                        placeholder="Tell us more about your inquiry..."
                    />
                </div>
                
                <div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;