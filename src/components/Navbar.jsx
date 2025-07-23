import React, { useState } from 'react';

const Navbar = ({ navigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-md text-gray-800 fixed w-full top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" onClick={() => navigate('home')} className="flex items-center gap-2">
                        <img src="https://placehold.co/40x40/0d9488/ffffff?text=M" alt="Logo" className="h-10 w-10 rounded-full" />
                        <span className="font-poppins font-bold text-2xl text-primary">MySertifico</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#" onClick={() => navigate('home')} className="text-primary font-semibold">Home</a>
                        <a href="#" onClick={() => navigate('about')} className="hover:text-primary font-medium">About</a>
                        <a href="#" onClick={() => navigate('price')} className="hover:text-primary font-medium">Pricing</a>
                        <a href="#" onClick={() => navigate('contact-us')} className="hover:text-primary font-medium">Contact Us</a>
                    </div>

                    {/* Login Buttons for Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button onClick={() => navigate('signIn')} className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">Sign In</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-gray-800 focus:outline-none" onClick={toggleMobileMenu}>
                            <i className={`ri-menu-line text-2xl ${isMobileMenuOpen ? 'hidden' : 'block'}`}></i>
                            <i className={`ri-close-line text-2xl ${isMobileMenuOpen ? 'block' : 'hidden'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div id="mobile-menu" className={`md:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <a href="#" onClick={() => { navigate('home'); toggleMobileMenu(); }} className="block py-2 text-sm text-primary font-semibold">Home</a>
                    <a href="#" onClick={() => { navigate('about'); toggleMobileMenu(); }} className="block py-2 text-sm hover:text-primary">About</a>
                    <a href="#" onClick={() => { navigate('price'); toggleMobileMenu(); }} className="block py-2 text-sm hover:text-primary">Pricing</a>
                    <a href="#" onClick={() => { navigate('contact-us'); toggleMobileMenu(); }} className="block py-2 text-sm hover:text-primary">Contact Us</a>
                    <div className="border-t my-4"></div>
                    <button onClick={() => { navigate('signIn'); toggleMobileMenu(); }} className="block w-full text-center py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark">Sign In</button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
