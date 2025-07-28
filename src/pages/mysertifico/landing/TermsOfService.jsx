// src/pages/mysertifico/TermsOfServicePage.jsx
import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PageHeader from '../../../components/common/PageHeader'; // Reusing the PageHeader component
import TermsContent from '../../../components/common/TermsContent';

const TermsOfService = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Terms of Service"
                    description="Please read these terms carefully before using our services."
                />
                {/* Date line from original HTML */}
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 21 June 2025</p>

                {/* Terms of Service Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            <TermsContent />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;