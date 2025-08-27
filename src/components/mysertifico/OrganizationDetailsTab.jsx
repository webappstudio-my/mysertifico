import React, { useState } from 'react';

const states = ["Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "W.P. Kuala Lumpur", "W.P. Labuan", "W.P. Putrajaya"];
const countries = ["Malaysia", "Singapore", "Indonesia", "Brunei", "Thailand"];

const OrganizationDetailsTab = () => {
    const [formData, setFormData] = useState({
        school_name: 'Sekolah Menengah Kebangsaan Seri Bintang',
        school_code: 'WBA0001',
        address1: 'Jalan 3/91, Taman Shamelin Perkasa',
        address2: 'Batu 3 1/2 Cheras',
        postcode: '56100',
        city: 'Kuala Lumpur',
        state: 'W.P. Kuala Lumpur',
        country: 'Malaysia',
        phone: '03-9284 8499',
        email: 'info@smksbs.edu.my'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.school_name.trim()) newErrors.school_name = 'School name is required.';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email.';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // Handle successful form submission
            console.log('Form submitted successfully:', formData);
            // You can add a toast notification here
        }
    };

    return (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organization Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <InputField id="school_name" label="School Name" value={formData.school_name} onChange={handleChange} error={errors.school_name} required />
                    <InputField id="school_code" label="School Code" value={formData.school_code} onChange={handleChange} placeholder="e.g., WBA0001" />
                    <div className="sm:col-span-2">
                        <InputField id="address1" label="Address Line 1" value={formData.address1} onChange={handleChange} placeholder="e.g., Jalan 3/91, Taman Shamelin Perkasa" />
                    </div>
                    <div className="sm:col-span-2">
                        <InputField id="address2" label="Address Line 2" value={formData.address2} onChange={handleChange} placeholder="e.g., Batu 3 1/2 Cheras" />
                    </div>
                    <InputField id="postcode" label="Postcode" value={formData.postcode} onChange={handleChange} placeholder="e.g., 56100" />
                    <InputField id="city" label="City" value={formData.city} onChange={handleChange} placeholder="e.g., Kuala Lumpur" />
                    <SelectField id="state" label="State" value={formData.state} onChange={handleChange} options={states} />
                    <SelectField id="country" label="Country" value={formData.country} onChange={handleChange} options={countries} />
                    <InputField id="phone" label="Telephone No." type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g., 03-9284 8499" />
                    <InputField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="e.g., info@smksbs.edu.my" />
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const InputField = ({ id, label, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block mb-2 font-medium text-gray-900 dark:text-white">{label}</label>
        <input id={id} {...props} className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : ''}`} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const SelectField = ({ id, label, options, ...props }) => (
    <div>
        <label htmlFor={id} className="block mb-2 font-medium text-gray-900 dark:text-white">{label}</label>
        <select id={id} {...props} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);

export default OrganizationDetailsTab;
