// src/components/common/ContactForm.jsx
import React from 'react';

const ContactForm = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
            <form action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-teal-100">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-teal-100">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-teal-100">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent"
                    ></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 font-semibold">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;