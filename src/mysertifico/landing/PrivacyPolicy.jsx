import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = ({ navigate }) => {
    return (
        <>
            <Navbar navigate={navigate} />
            <main className="pt-24">
                {/* Page Header Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Privacy Policy</h1>
                        <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">Your privacy is important to us. Here's how we protect your data.</p>
                        <p className="text-sm text-teal-200 mt-2">Last Updated: 21 June 2025</p>
                    </div>
                </section>

                {/* Privacy Policy Content */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            <div className="prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                                <h2><strong>Introduction</strong></h2>
                                <p className="mb-4">Welcome to MySertifico. Webapp Studio Sdn. Bhd. ("we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>

                                <h2><strong>Information We Collect</strong></h2>
                                <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                                <ul className="mb-4">
                                    <li className="mb-4"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                    <li className="mb-4"><strong>Certificate Data:</strong> Information required for the creation and issuance of certificates, such as recipient names, identification numbers, event details, and signatory information, provided by the issuing Organisation.</li>
                                    <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.</li>
                                </ul>

                                <h2><strong>How We Use Your Information</strong></h2>
                                <p className="mb-4">Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Create and manage your account.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Generate, issue, and deliver digital certificates.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Enable verification of certificates via QR code.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Process payments and refunds for subscription plans and tokens.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Email you regarding your account or order.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Monitor and analyze usage and trends to improve your experience with the Site.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Notify you of updates to the Site.</span></li>
                                    <li className="flex items-start"><i className="ri-checkbox-circle-line text-accent mt-1 mr-3"></i><span>Provide customer support and respond to your requests.</span></li>
                                </ul>

                                <h2><strong>Data Security</strong></h2>
                                <p className="mb-4">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                                <h2><strong>Your Rights</strong></h2>
                                <p className="mb-4">You have certain rights in relation to your personal data. You have the right to request access, correction, or deletion of your data. To make such a request, please contact us using the contact information provided below.</p>

                                <h2><strong>Contact Us</strong></h2>
                                <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:support@mwebappstudio.my">support@mwebappstudio.my</a>.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default PrivacyPolicy;
