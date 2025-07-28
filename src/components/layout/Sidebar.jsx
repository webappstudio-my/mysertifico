import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCertificate, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="bg-white w-64 h-screen shadow-md fixed">
            <div className="p-6 text-2xl font-bold text-indigo-600">MySertifico</div>
            <ul className="mt-6 space-y-2">
                <li className="px-6 py-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-2">
                    <FontAwesomeIcon icon={faHome} /> Dashboard
                </li>
                <li className="px-6 py-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} /> Profile
                </li>
                <li className="px-6 py-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-2">
                    <FontAwesomeIcon icon={faCertificate} /> Certificates
                </li>
                <li className="px-6 py-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-2 text-red-600">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
