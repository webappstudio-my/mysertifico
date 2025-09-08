import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md text-gray-800 fixed w-full top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/mywall/home" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-10 w-10" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/14B8A6/FFFFFF?text=MW'; }} />
                        <span className="font-poppins font-bold text-2xl text-primary">MyWall</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/mywall/home" className="text-primary font-semibold">Home</Link>
                        <Link to="/mywall/about" className="hover:text-primary font-medium">About</Link>
                        <Link to="/mywall/pricing" className="hover:text-primary font-medium">Pricing</Link>
                        <Link to="/mywall/contact-us" className="hover:text-primary font-medium">Contact Us</Link>
                    </div>

                    {/* Login Buttons for Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/mywall/auth/sign-in" className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-600">Sign In</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-gray-800 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <i className="ri-close-line text-2xl"></i> : <i className="ri-menu-line text-2xl"></i>}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
                    <Link to="/mywall/home" className="block py-2 text-sm text-primary font-semibold">Home</Link>
                    <Link to="/mywall/about" className="block py-2 text-sm hover:text-primary">About</Link>
                    <Link to="/mywall/pricing" className="block py-2 text-sm hover:text-primary">Pricing</Link>
                    <Link to="/mywall/contact-us" className="block py-2 text-sm hover:text-primary">Contact Us</Link>
                    <div className="border-t my-4"></div>
                    <Link to="/mywall/auth/sign-in" className="block w-full text-center py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-600">Sign In</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
