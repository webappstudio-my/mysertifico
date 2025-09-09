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
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 9 September 2025</p>

                {/* Terms of Service Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                            <h2><strong>Introduction</strong></h2>
                            <p className="mb-4">Welcome to MyWall. These Terms of Service ("Terms") govern your use of the MyWall platform and services provided by Webapp Studio Sdn. Bhd. ("we", "us", or "our"). By accessing or using our platform, you agree to be bound by these Terms.</p>

                            <h2><strong>Account Registration</strong></h2>
                            <p className="mb-4">
                                To use certain features of MyWall, you may be required to register for an account. You agree to:
                            </p>
                            <ul className="mb-4">
                                <li className="mb-4">Provide accurate, current, and complete information during the registration process.</li>
                                <li className="mb-4">Maintain and promptly update your account information to keep it accurate, current, and complete.</li>
                                <li className="mb-4">Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                                <li className="mb-4">Promptly notify us if you discover or otherwise suspect any security breaches related to MyWall.</li>
                            </ul>

                            <h2><strong>Use of Services</strong></h2>
                            <p className="mb-4">
                                MyWall provides a platform for issuing, managing, and verifying digital certificates. You agree to use our services only for lawful purposes and in accordance with these Terms. You shall not:
                            </p>
                            <ul className="mb-4">
                                <li className="mb-4">Use the platform for any illegal or unauthorized purpose.</li>
                                <li className="mb-4">Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                                <li className="mb-4">Interfere with or disrupt the integrity or performance of the platform or data contained therein.</li>
                                <li className="mb-4">Attempt to gain unauthorized access to the platform or its related systems or networks.</li>
                            </ul>

                            <h2><strong>Intellectual Property Rights</strong></h2>
                            <p className="mb-4">
                                All content, trademarks, service marks, trade names, logos, and intellectual property displayed on MyWall are owned by Webapp Studio Sdn. Bhd. or its licensors. You may not use, reproduce, distribute, or create derivative works from any content without our express written permission.
                            </p>

                            <h2><strong>Payments and Subscriptions</strong></h2>
                            <p className="mb-4">
                                If you subscribe to a paid plan, you agree to pay all applicable fees and taxes. All payments are processed through secure third-party payment gateways. We reserve the right to change our pricing plans upon reasonable notice.
                            </p>

                            <h2><strong>Termination</strong></h2>
                            <p className="mb-4">
                                We may terminate or suspend your account and access to MyWall immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
                            </p>

                            <h2><strong>Disclaimer of Warranties</strong></h2>
                            <p className="mb-4">
                                MyWall is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                            </p>

                            <h2><strong>Limitation of Liability</strong></h2>
                            <p className="mb-4">
                                In no event shall Webapp Studio Sdn. Bhd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                            </p>

                            <h2><strong>Governing Law</strong></h2>
                            <p className="mb-4">
                                These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.
                            </p>

                            <h2><strong>Changes to Terms</strong></h2>
                            <p className="mb-4">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>

                            <h2><strong>Contact Us</strong></h2>
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
