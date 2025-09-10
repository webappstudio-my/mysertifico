// src/pages/mywall/landing/MWSecurityPolicy.jsx
import React from 'react';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';
import PageHeader from '../../../components/common/PageHeader';

const MWSecurityPolicy = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="Security Policy"
                    description="The security of our platform and your data is our highest priority."
                />
                {/* Date line from original HTML */}
                <p className="text-sm text-teal-200 mt-2 text-center container mx-auto px-6">Last Updated: 10 September 2025</p>

                {/* Security Policy Content Section */}
                <section className="pb-20 pt-8">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg prose prose-invert prose-p:text-teal-200 prose-headings:text-white prose-h2:border-b prose-h2:border-white/20 prose-h2:pb-2 prose-a:text-accent hover:prose-a:text-yellow-300">
                            <h2><i className="ri-shield-check-line mr-2"></i>Our Commitment to Security</h2>
                            <p className="mb-4">At MyWall, the security of your data is our highest priority. We are committed to protecting your personal information and your digital certificates from unauthorized access, use, or disclosure. This Security Policy outlines the measures we take to secure our platform and your data.</p>

                            <h2><i className="ri-database-2-line mr-2"></i>Data Protection Measures</h2>
                            <h3 className="text-xl text-white">Encryption</h3>
                            <ul className="mb-4">
                                <li className="mb-4"><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using industry-standard Transport Layer Security (TLS 1.2 or higher). This ensures that your data is protected from eavesdropping.</li>
                                <li className="mb-4"><strong>Encryption at Rest:</strong> Your personal information and uploaded certificate files are encrypted at rest on our servers using advanced encryption standards (AES-256).</li>
                            </ul>
                            <h3 className="text-xl text-white">Data Storage</h3>
                            <p className="mb-4">We partner with leading cloud infrastructure providers that maintain state-of-the-art physical and network security to protect our servers. Access to this data is strictly limited to authorized personnel.</p>

                            <h2><i className="ri-account-box-line mr-2"></i>Account Security</h2>
                            <p className="mb-4">You play a crucial role in protecting your account. We encourage you to:</p>
                            <ul className="mb-4">
                                <li className="mb-4">Use a strong, unique password for your MyWall account. A strong password includes a mix of letters, numbers, and symbols.</li>
                                <li className="mb-4">Do not share your password with anyone. MyWall staff will never ask you for your password.</li>
                                <li className="mb-4">Be cautious of phishing attempts. Always ensure you are on the official MyWall website before entering your login credentials.</li>
                                <li className="mb-4">Sign out of your account when using a shared or public computer.</li>
                            </ul>

                            <h2><i className="ri-share-forward-line mr-2"></i>Secure Sharing</h2>
                            <p className="mb-4">MyWall's sharing feature is designed with security in mind. When you share a certificate, we generate a unique, secure link that you can share with trusted recipients. You maintain control over your shared content and can manage access as needed.</p>

                            <h2><i className="ri-bug-line mr-2"></i>Vulnerability Reporting</h2>
                            <p className="mb-4">We are committed to working with security researchers to identify and resolve potential vulnerabilities in our service. If you believe you have found a security vulnerability in MyWall, please report it to us responsibly. We ask that you do not publicly disclose the issue until we have had a chance to address it.</p>
                            <p>Please send your findings to <a href="mailto:security@mywall.app">security@mywall.app</a>. We appreciate your efforts to help us keep our platform secure.</p>

                            <h2><i className="ri-loop-left-line mr-2"></i>Policy Updates</h2>
                            <p>We may update this Security Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.</p>

                            <h2><i className="ri-customer-service-2-line mr-2"></i>Contact Us</h2>
                            <p className="mb-4">If you have any questions about our security practices, please contact us at:</p>
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

export default MWSecurityPolicy;
