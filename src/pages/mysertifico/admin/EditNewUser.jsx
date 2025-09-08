import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';

const EditNewUser = ({ theme, onThemeToggle}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: '',
        status: 'Active'
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('https://placehold.co/300x300/e2e8f0/cbd5e1?text=Upload');
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDate(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    }










}