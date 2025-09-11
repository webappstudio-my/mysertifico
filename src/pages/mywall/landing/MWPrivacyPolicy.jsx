// src/pages/mywall/landing/PrivacyPolicy.jsx
import React from 'react';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';
import PageHeader from '../../../components/common/PageHeader';

const MWPrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Privacy Policy"
                    description="Your privacy is important to us. Here's how we protect your data."
                />
                {/* Date line from original HTML */}
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 10 September 2025</p>

                {/* Privacy Policy Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                            <h2><i className="ri-file-info-line mr-2"></i>Introduction</h2>
                            <p className="mb-4">Welcome to MyWall ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.</p>

                            <h2><i className="ri-file-list-3-line mr-2"></i>Information We Collect</h2>
                            <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes:</p>
                            <ul className="mb-4">
                                <li className="mb-4"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information (such as your age, gender, and country), that you voluntarily give to us when you register with the Application.</li>
                                <li className="mb-4"><strong>Certificate Data:</strong> All certificates and related information (such as issuing institution, date of issue, and any attached documents or images) that you upload or that are issued to you through our platform.</li>
                                <li className="mb-4"><strong>Usage Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.</li>
                            </ul>

                            <h2><i className="ri-settings-3-line mr-2"></i>How We Use Your Information</h2>
                            <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
                            <ul className="mb-4">
                                <li className="mb-4">Create and manage your account.</li>
                                <li className="mb-4">Display your certificates and achievements as directed by you.</li>
                                <li className="mb-4">Enable you to share your certificates with third parties (e.g., employers, educational institutions).</li>
                                <li className="mb-4">Email you regarding your account or order.</li>
                                <li className="mb-4">Monitor and analyze usage and trends to improve your experience with the Application.</li>
                                <li className="mb-4">Notify you of updates to the Application.</li>
                                <li className="mb-4">Respond to customer service requests.</li>
                            </ul>

                            <h2><i className="ri-share-forward-line mr-2"></i>Disclosure of Your Information</h2>
                            <p className="mb-4">We do not share, sell, rent, or trade your information with third parties for their commercial purposes.</p>
                            <p className="mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                            <ul className="mb-4">
                                <li className="mb-4"><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                <li className="mb-4"><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data storage, hosting services, and customer service. These third parties are obligated to protect your information.</li>
                                <li className="mb-4"><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent. For example, when you choose to share a certificate, you are consenting to its disclosure to the recipient you specify.</li>
                            </ul>

                            <h2><i className="ri-shield-star-line mr-2"></i>Security of Your Information</h2>
                            <p className="mb-4">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                            <h2><i className="ri-user-settings-line mr-2"></i>Your Rights</h2>
                            <p className="mb-4">You have the right to access, correct, or delete your personal data. You can manage your account information and certificate data directly within the MyWall application. If you wish to terminate your account, you may do so from your account settings.</p>

                            <h2><i className="ri-loop-left-line mr-2"></i>Changes to This Privacy Policy</h2>
                            <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

                            <h2><i className="ri-customer-service-2-line mr-2"></i>Contact Us</h2>
                            <p className="mb-4">If you have questions or comments about this Privacy Policy, please contact us at:</p>
                            <p className="mb-4">
                                Webapp Studio Sdn Bhd<br />
                                83, Jalan KH 5, Kita Harmoni,<br />
                                Cybersouth, 47810 Dengkil,<br />
                                Selangor Darul Ehsan, Malaysia<br />
                                Email: <a href="mailto:support@webappstudio.my">support@webappstudio.my</a><br />
                                Phone: +60 19-489 2086
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MWPrivacyPolicy;
