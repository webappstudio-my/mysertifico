// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink here

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to apply active styles for NavLink
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? 'text-primary font-semibold' // Styles for the active link
            : 'hover:text-primary font-medium'; // Styles for inactive links

    return (
        <header className="bg-white shadow-md text-gray-800 fixed w-full top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="src/assets/images/logos/logo.png" alt="MySertifico Logo" className="h-10 w-10" />
                        <span className="font-poppins font-bold text-2xl text-primary">MySertifico</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {/* Use NavLink for navigation items */}
                        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                        <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
                        <NavLink to="/price" className={getNavLinkClass}>Pricing</NavLink>
                        <NavLink to="/contact-us" className={getNavLinkClass}>Contact Us</NavLink>
                    </div>

                    {/* Login Buttons for Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/auth/sign-in" className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">Sign In</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-gray-800 focus:outline-none" onClick={toggleMobileMenu}>
                            <i className={`ri-menu-line text-2xl ${isMobileMenuOpen ? 'hidden' : ''}`}></i>
                            <i className={`ri-close-line text-2xl ${isMobileMenuOpen ? '' : 'hidden'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden mt-4`}>
                    {/* Use NavLink for mobile navigation items as well */}
                    <NavLink to="/" className={({ isActive }) => `block py-2 text-sm ${isActive ? 'text-primary font-semibold' : 'text-gray-800'} ${isActive ? '' : 'hover:text-primary'}`} onClick={toggleMobileMenu}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `block py-2 text-sm ${isActive ? 'text-primary font-semibold' : 'text-gray-800'} ${isActive ? '' : 'hover:text-primary'}`} onClick={toggleMobileMenu}>About</NavLink>
                    <NavLink to="/price" className={({ isActive }) => `block py-2 text-sm ${isActive ? 'text-primary font-semibold' : 'text-gray-800'} ${isActive ? '' : 'hover:text-primary'}`} onClick={toggleMobileMenu}>Pricing</NavLink>
                    <NavLink to="/contact-us" className={({ isActive }) => `block py-2 text-sm ${isActive ? 'text-primary font-semibold' : 'text-gray-800'} ${isActive ? '' : 'hover:text-primary'}`} onClick={toggleMobileMenu}>Contact Us</NavLink>
                    <div className="border-t my-4"></div>
                    <Link to="/auth/sign-in" className="block w-full text-center py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark" onClick={toggleMobileMenu}>Sign In</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;