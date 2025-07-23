import React from 'react';

const Footer = ({ navigate }) => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Info */}
                <div>
                    <h3 className="text-xl font-bold font-poppins mb-4">MySertifico</h3>
                    <p className="text-sm text-gray-400">MySertifico is a secure digital platform for managing official certificates for schools and institutions across Malaysia. Trusted. Simple. Digital.</p>
                </div>
                {/* Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Links</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" onClick={() => navigate('home')} className="hover:text-white">Home</a></li>
                        <li><a href="#" onClick={() => navigate('about')} className="hover:text-white">About</a></li>
                        <li><a href="#" onClick={() => navigate('price')} className="hover:text-white">Pricing</a></li>
                        <li><a href="#" onClick={() => navigate('contact-us')} className="hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
                {/* Policies */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Terms & Policies</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" onClick={() => navigate('privacyPolicy')} className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" onClick={() => navigate('termsOfService')} className="hover:text-white">Terms of Service</a></li>
                        <li><a href="#" onClick={() => navigate('securityPolicy')} className="hover:text-white">Security Policy</a></li>
                    </ul>
                </div>
                {/* Social */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-xl" title="Facebook"><i className="ri-facebook-fill"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl" title="Instagram"><i className="ri-instagram-fill"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl" title="TikTok"><i className="ri-tiktok-fill"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl" title="YouTube"><i className="ri-youtube-fill"></i></a>
                    </div>
                </div>
            </div>
            {/* Divider + Copyright */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">&copy; 2025 MySertifico. All rights reserved by Webapp Studio Sdn. Bhd.</div>
            </div>
        </footer>
    );
};

export default Footer;
