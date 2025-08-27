import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';

const AdminAddRecipient = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNo: '',
    class: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it now has a value
    if (value.trim() && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Check form validity
  useEffect(() => {
    const requiredFields = ['fullName', 'idNo', 'class'];
    const valid = requiredFields.every(field => formData[field].trim() !== '');
    setIsFormValid(valid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.idNo.trim()) newErrors.idNo = 'National ID is required.';
    if (!formData.class.trim()) newErrors.class = 'Please select a class.';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!', formData);
      alert('Recipient added successfully!');
      // Reset form
      setFormData({
        fullName: '',
        idNo: '',
        class: '',
        status: 'Active'
      });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}>
        </div>
      )}
      
      <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <DashboardNavbar 
          onSidebarToggle={handleSidebarToggle}
        />
        
        <main className="p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Add New Recipient</h1>
              <Link 
                to="/dashboard/settings/recipients" 
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex items-center gap-2 text-sm font-medium"
                title="Back to Recipient List"
              >
                <i className="ri-arrow-left-line"></i>
                <span>Back</span>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter full name as per National ID"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="idNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        National ID
                      </label>
                      <input
                        type="text"
                        id="idNo"
                        name="idNo"
                        placeholder="e.g., 090101-03-XXXX"
                        value={formData.idNo}
                        onChange={handleInputChange}
                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                          errors.idNo ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.idNo && (
                        <p className="text-red-500 text-xs mt-1">{errors.idNo}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Class
                      </label>
                      <select
                        id="class"
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                          errors.class ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Choose a class</option>
                        <option value="1 Amanah">1 Amanah</option>
                        <option value="2 Bestari">2 Bestari</option>
                        <option value="3 Cemerlang">3 Cemerlang</option>
                        <option value="4 Dedikasi">4 Dedikasi</option>
                        <option value="5 Efisien">5 Efisien</option>
                      </select>
                      {errors.class && (
                        <p className="text-red-500 text-xs mt-1">{errors.class}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 md:w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                  <Link
                    to="/admin/settings/recipients"
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-500"
                  >
                    Add Recipient
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAddRecipient;