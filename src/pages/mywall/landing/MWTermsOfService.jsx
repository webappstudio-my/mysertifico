// src/pages/mywall/landing/MWTermsOfService.jsx
import React from 'react';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';
import PageHeader from '../../../components/common/PageHeader';

const MWTermsOfService = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Terms of Service"
                    description="Please read these terms carefully before using our service."
                />
                {/* Date line from original HTML */}
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 10 September 2025</p>

                {/* Terms of Service Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                            <h2><i className="ri-file-text-line mr-2"></i>1. Agreement to Terms</h2>
                            <p className="mb-4">By using the MyWall application and its services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. We may modify the Terms at any time, and such modification shall be effective immediately upon posting of the modified Terms.</p>

                            <h2><i className="ri-account-circle-line mr-2"></i>2. User Accounts</h2>
                            <p className="mb-4">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

                            <h2><i className="ri-wallet-3-line mr-2"></i>3. Subscriptions</h2>
                            <p className="mb-4">Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on an annual basis. At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Webapp Studio Sdn. Bhd. cancels it. All fees are non-refundable except as required by law.</p>

                            <h2><i className="ri-quill-pen-line mr-2"></i>4. User Content</h2>
                            <p className="mb-4">Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>

                            <h2><i className="ri-spam-2-line mr-2"></i>5. Prohibited Activities</h2>
                            <p className="mb-4">You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You may not use the Service in any manner that could damage, disable, overburden, or impair any MyWall server, or the network(s) connected to any MyWall server, or interfere with any other party's use and enjoyment of any Services.</p>
                            <ul className="mb-4">
                                <li className="mb-4">Engaging in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                                <li className="mb-4">Interfering with, disrupting, or creating an undue burden on the Site or the networks or services connected to the Site.</li>
                                <li className="mb-4">Attempting to impersonate another user or person.</li>
                                <li className="mb-4">Using any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                            </ul>

                            <h2><i className="ri-copyright-line mr-2"></i>6. Intellectual Property</h2>
                            <p className="mb-4">The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Webapp Studio Sdn. Bhd. and its licensors. The Service is protected by copyright, trademark, and other laws of both Malaysia and foreign countries.</p>

                            <h2><i className="ri-close-circle-line mr-2"></i>7. Termination</h2>
                            <p className="mb-4">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

                            <h2><i className="ri-scales-3-line mr-2"></i>8. Governing Law</h2>
                            <p className="mb-4">These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.</p>

                            <h2><i className="ri-error-warning-line mr-2"></i>9. Limitation of Liability</h2>
                            <p className="mb-4">In no event shall Webapp Studio Sdn. Bhd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                            <h2><i className="ri-customer-service-2-line mr-2"></i>Contact Us</h2>
                            <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
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

export default MWTermsOfService;
