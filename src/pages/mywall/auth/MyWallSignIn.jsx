import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../../../components/auth/SignInForm';

const MyWallSignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Dummy registered users for client-side validation (replace with actual backend check)
    const registeredUsers = {
        'admin@mysertifico.com': 'password123',
        'user@example.com': 'securepass',
    };

    const handleChange = (e) => {
        const { name, value,type,checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
        if (generalError) {
            setGeneralError('');
        };
    };

    








};