// src/components/mywall/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Info */}
                <div>
                    <h3 className="text-xl font-bold font-poppins mb-4">MyWall</h3>
                    <p className="text-sm text-gray-400">MyWall is your personal digital wall for all your certificates and qualifications. Collect, manage, showcase, and share your achievements securely.</p>
                </div>
                {/* Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Links</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/mywall/home" className="hover:text-white">Home</Link></li>
                        <li><Link to="/mywall/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/mywall/pricing" className="hover:text-white">Pricing</Link></li>
                        <li><Link to="/mywall/contact-us" className="hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>
                {/* Policies */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Terms & Policies</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                        <li><Link to="/security-policy" className="hover:text-white">Security Policy</Link></li>
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
                <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">&copy; {currentYear} MyWall. All rights reserved by Webapp Studio Sdn. Bhd.</div>
            </div>
        </footer>
    );
};

export default Footer;