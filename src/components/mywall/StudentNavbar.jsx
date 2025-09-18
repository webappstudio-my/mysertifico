import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png';

const StudentNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close the menu if a click occurs outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? 'flex items-center px-4 py-2 text-sm text-primary font-bold bg-primary-50'
            : 'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary';

    return (
        <header className="bg-white shadow-md text-gray-800 fixed w-full top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <NavLink to="/mywall/parent-wall" className="flex items-center gap-2">
                        <img src={logo} alt="MyWall Logo" className="h-10 w-10 rounded-full" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/134E4A/FFFFFF?text=M'; }} />
                        <span className="font-poppins font-bold text-2xl text-primary">MyWall</span>
                    </NavLink>
                    <div className="relative" ref={menuRef}>
                        <button
                            id="profile-menu-button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            <i className="ri-menu-4-line text-3xl"></i>
                        </button>
                        {!isMenuOpen ? null : (
                            <div id="profile-menu" className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                                <NavLink to="/mywall/parent-wall" className={getNavLinkClass}><i className="ri-layout-grid-fill mr-3"></i>MyWall</NavLink>
                                <NavLink to="/mywall/parent-myprofile" className={getNavLinkClass}><i className="ri-user-line mr-3"></i>MyProfile</NavLink>
                                <NavLink to="/mywall/parent-myfamily" className={getNavLinkClass}><i className="ri-group-line mr-3"></i>MyFamily</NavLink>
                                <NavLink to="/mywall/parent-myaccount" className={getNavLinkClass}><i className="ri-settings-3-line mr-3"></i>MyAccount</NavLink>
                                <NavLink to="/mywall/parent-resume" className={getNavLinkClass}><i className="ri-article-line mr-3"></i>MyResume</NavLink>
                                <div className="border-t my-1 border-gray-200"></div>
                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary"><i className="ri-logout-box-r-line mr-3"></i>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default StudentNavbar;