import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const TermsOfService = ({ navigate }) => {
    return (
        <>
            <Navbar navigate={navigate} />
            <main className="pt-24">
                {/* Page Header Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Terms of Service</h1>
                        <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">Please read these terms carefully before using our services.</p>
                        <p className="text-sm text-teal-200 mt-2">Last Updated: 21 June 2025</p>
                    </div>
                </section>

                {/* Terms of Service Content */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            <div className="prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">

                                <p className="mb-6">By accessing or using the MySertifico platform ("Service"), operated by Webapp Studio Sdn. Bhd. ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you disagree with any part of the terms, then you may not access the Service.</p>

                                <h2>1. Acceptance of Terms</h2>
                                <p className="mb-4">These Terms apply to all visitors, users, and others who access or use the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>

                                <h2>2. Use of the Platform</h2>
                                <p className="mb-4">You are granted a non-exclusive, non-transferable, revocable license to access and use MySertifico strictly in accordance with these Terms. You agree not to use the platform for any unlawful or prohibited purpose.</p>

                                <h2>3. User Accounts & Responsibilities</h2>
                                <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

                                <h2>4. Intellectual Property</h2>
                                <p className="mb-4">The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Webapp Studio Sdn. Bhd. and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.</p>

                                <h2>5. Termination</h2>
                                <p className="mb-4">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                                <h2>6. Limitation of Liability</h2>
                                <p className="mb-4">In no event shall Webapp Studio Sdn. Bhd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, resulting from your access to or use of, or inability to access or use, the Service.</p>

                                <h2>7. Governing Law</h2>
                                <p className="mb-4">These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.</p>

                                <h2>8. Changes to Terms</h2>
                                <p className="mb-4">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

                                <h2>9. Contact Us</h2>
                                <p>If you have any questions about these Terms, please contact us at: <a href="mailto:support@webappstudio.my">support@webappstudio.my</a>.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default TermsOfService;
