// src/pages/mysertifico/ContactUsPage.jsx
import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PageHeader from '../../../components/common/PageHeader'; // Reusing the PageHeader component
import ContactForm from '../../../components/common/ContactForm';
import ContactInfo from '../../../components/common/ContactInfo';

const ContactUs = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Contact Us"
                    description="We’d love to hear from you! Get in touch with our team for any inquiries."
                />

                {/* Contact Section */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            <ContactForm />
                            <ContactInfo />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;