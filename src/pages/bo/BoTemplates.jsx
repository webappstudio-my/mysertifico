import React, { useState, useEffect, useRef } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';


const BoTemplateManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [editingTemplate, setEditingTemplate] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        style: '',
        orientation: '',
        alignment: '',
        color: '',
        image: null,
    });
    const fileInputRef = useRef(null);
    const itemsPerPage = 12;
    const [templateData, setTemplateData] = useState([
        // Sample data for demonstration purposes
        { id: 1, code: 'CLLC-GOLD-001', title: 'Classic · Landscape · Center · Gold', thumb: 'https://placehold.co/400x300/f59e0b/fff?text=Certificate', style: 'Classic', orientation: 'Landscape', color: 'GOLD', alignment: 'Centre' },
        { id: 2, code: 'CLPC-BLUE-002', title: 'Classic · Portrait · Center · Blue', thumb: 'https://placehold.co/300x400/3b82f6/fff?text=Certificate', style: 'Classic', orientation: 'Portrait', color: 'BLUE', alignment: 'Centre' },
        { id: 3, code: 'MDLC-PURPLE-003', title: 'Modern · Landscape · Center · Purple', thumb: 'https://placehold.co/400x300/8b5cf6/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'PURPLE', alignment: 'Centre' },
        { id: 4, code: 'MDLC-GOLD-004', title: 'Modern · Landscape · Center · Gold', thumb: 'https://placehold.co/400x300/f59e0b/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'GOLD', alignment: 'Centre' },
        { id: 5, code: 'MDPL-RED-005', title: 'Modern · Portrait · Left · Red', thumb: 'https://placehold.co/300x400/ef4444/fff?text=Certificate', style: 'Modern', orientation: 'Portrait', color: 'RED', alignment: 'Left' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' }
    ]);







}