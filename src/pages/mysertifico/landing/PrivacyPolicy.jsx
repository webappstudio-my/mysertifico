// src/pages/mysertifico/PrivacyPolicyPage.jsx
import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PageHeader from '../../../components/common/PageHeader'; // Reusing the PageHeader component

const PrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Privacy Policy"
                    description="Your privacy is important to us. Here's how we protect your data."
                />
                {/* Date line from original HTML */}
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 21 June 2025</p>

                {/* Privacy Policy Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                            <h2><i className="ri-file-info-line mr-2"></i>Introduction</h2>
                            <p className="mb-4">Welcome to MySertifico. Webapp Studio Sdn. Bhd. ("we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>

                            <h2><i className="ri-file-list-3-line mr-2"></i>Information We Collect</h2>
                            <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                            <ul className="mb-4">
                                <li className="mb-4"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                <li className="mb-4"><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                                <li className="mb-4"><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor.</li>
                            </ul>

                            <h2><i className="ri-settings-3-line mr-2"></i>How We Use Your Information</h2>
                            <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                            <ul className="mb-4">
                                <li className="mb-4">Create and manage your account.</li>
                                <li className="mb-4">Email you regarding your account or order.</li>
                                <li className="mb-4">Enable user-to-user communications.</li>
                                <li className="mb-4">Generate a personal profile about you to make your visit to the Site more personalized.</li>
                                <li className="mb-4">Increase the efficiency and operation of the Site.</li>
                                <li className="mb-4">Monitor and analyze usage and trends to improve your experience with the Site.</li>
                                <li className="mb-4">Notify you of updates to the Site.</li>
                                <li className="mb-4">Offer new products, services, mobile applications, and/or recommendations to you.</li>
                                <li className="mb-4">Perform other business activities as needed.</li>
                                <li className="mb-4">Process payments and refunds.</li>
                                <li className="mb-4">Request feedback and contact you about your use of the Site.</li>
                                <li className="mb-4">Resolve disputes and troubleshoot problems.</li>
                                <li className="mb-4">Respond to product and customer service requests.</li>
                            </ul>

                            <h2><i className="ri-share-forward-line mr-2"></i>Disclosure Of Your Information</h2>
                            <p className="mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                            <ul className="mb-4">
                                <li className="mb-4"><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                <li className="mb-4"><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                                <li className="mb-4"><strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</li>
                            </ul>

                            <h2><i className="ri-shield-star-line mr-2"></i>Security Of Your Information</h2>
                            <p className="mb-4">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                            <h2><i className="ri-parent-line mr-2"></i>Policy For Children</h2>
                            <p className="mb-4">We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

                            <h2><i className="ri-loop-left-line mr-2"></i>Changes To This Privacy Policy</h2>
                            <p className="mb-4">We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>

                            <h2><i className="ri-customer-service-2-line mr-2"></i>Contact Us</h2>
                            <p className="mb-4">If you have questions or comments about this Privacy Policy, please contact us at:</p>
                            <p className="mb-4">
                                Webapp Studio Sdn Bhd<br />
                                83, Jalan KH 5, Kita Harmoni,<br />
                                Cybersouth, 47810 Dengkil,<br />
                                Selangor Darul Ehsan, Malaysia<br />
                                Email: <a href="mailto:support@webappstudio.my">support@webappstudio.my</a><br />
                                Phone: +60 19-489 2806
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
