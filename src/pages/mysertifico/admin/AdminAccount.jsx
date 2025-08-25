import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../../components/bo/BoSidebar';
import BoNavbar from '../../../components/bo/BoNavbar';
import BoPagination from '../../../components/bo/BoPagination';
import BoSearchInput from '../../../components/bo/BoSearchInput';


const AdminAccount = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');    
  const [searchInput, setSearchInput] = useState('');
  const itemsPerPage = 10;

  // Billing history data
  const billingHistory = [
    { invoiceId: 'INV-2025-001', date: '20 Jun 2025', amount: 'RM 100.00', status: 'Paid'},
    { invoiceId: 'INV-2024-002', date: '24 Jun 2024', amount: 'RM 50.00', status: 'Paid'},
  ];

  // Filter billing history based on search term
  const filteredBillingHistory = billingHistory.filter(item =>
    item.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBillingHistory.length;

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <BoSidebar 
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
        <BoNavbar 
          onSidebarToggle={handleSidebarToggle}
          headerTitle="MySertifico"
        />
        
        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Account & Billing
            </h1>
            
            {/* Current Balance Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Balance
                </h3>
                <div className="bg-teal-600/10 dark:bg-teal-600/20 p-6 rounded-lg text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Available Tokens</p>
                  <p className="text-4xl font-bold text-teal-600 dark:text-amber-500">20</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 token per recipient</p>
                </div>
              </div>
              
              {/* Top Up Plans */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Up Tokens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Trial Plan */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col text-center">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">Trial Plan</h4>
                  <p className="text-3xl font-extrabold my-2 text-black dark:text-white">
                    20 <span className="text-base font-normal">tokens</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Free, no credit card required
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-lg mb-4">
                    1 token per recipient
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 flex-grow text-left">
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                      Unlimited Certificates
                    </li>
                    <li className="flex items-center">
                      <i className="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                      Unlimited Templates
                    </li>
                  </ul>
                  <button className="mt-6 block w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-lg dark:bg-gray-600 dark:text-white cursor-not-allowed">
                    Current Plan
                  </button>
                </div>

                {/* Topup RM20 */}
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col text-center hover:border-teal-600 dark:hover:border-amber-500 transition-all">
                  <h4 className="text-lg font-bold text-teal-600 dark:text-amber-500">Basic Pack</h4>
                  <p className="text-3xl font-extrabold my-2 text-black dark:text-white">
                    50 <span className="text-base font-normal">tokens</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">(+10 free tokens)</p>
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium py-2 px-4 rounded-lg mb-4">
                    <span className="relative -top-0.5">≈</span> 0.15 sen per recipient
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    All features from Trial Plan.
                  </p>
                  <a href="topup-now.html" className="mt-6 block w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-center">
                    Topup Now
                  </a>
                </div>

                {/* Topup RM50 */}
                <div className="border-2 border-teal-600 dark:border-amber-500 rounded-lg p-6 flex flex-col text-center relative">
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -mt-3 bg-teal-600 dark:bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                  <h4 className="text-lg font-bold text-teal-600 dark:text-amber-500">Value Pack</h4>
                  <p className="text-3xl font-extrabold my-2 text-black dark:text-white">
                    100 <span className="text-base font-normal">tokens</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">(+30 free tokens)</p>
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium py-2 px-4 rounded-lg mb-4">
                    Save 13% - Only <span className="relative -top-0.5">≈</span> 0.13 sen
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    All features from Topup RM20.
                  </p>
                  <a href="topup-now.html" className="mt-6 block w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-center">
                    Topup Now
                  </a>
                </div>

                {/* Topup RM100 */}
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col text-center hover:border-teal-600 dark:hover:border-amber-500 transition-all relative">
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -mt-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SUPER SAVE!
                  </span>
                  <h4 className="text-lg font-bold text-teal-600 dark:text-amber-500">Mega Pack</h4>
                  <p className="text-3xl font-extrabold my-2 text-black dark:text-white">
                    250 <span className="text-base font-normal">tokens</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">(+50 free tokens)</p>
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium py-2 px-4 rounded-lg mb-4">
                    Save 33% - Only <span className="relative -top-0.5">≈</span> 0.10 sen
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    All features from Topup RM50.
                  </p>
                  <a href="topup-now.html" className="mt-6 block w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-center">
                    Topup Now
                  </a>
                </div>

                {/* Topup RM */}
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col text-center hover:border-teal-600 dark:hover:border-amber-500 transition-all relative">
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -mt-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SUPER SAVE!
                  </span>
                  <h4 className="text-lg font-bold text-teal-600 dark:text-amber-500">Ultra Pack</h4>
                  <p className="text-3xl font-extrabold my-2 text-black dark:text-white">
                    500 <span className="text-base font-normal">tokens</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">(+50 free tokens)</p>
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium py-2 px-4 rounded-lg mb-4">
                    Save 33% - Only <span className="relative -top-0.5">≈</span> 0.10 sen
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    All features from Topup RM50.
                  </p>
                  <a href="topup-now.html" className="mt-6 block w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-center">
                    Topup Now
                  </a>
                </div>
              </div>
            </div>

            {/* Billing History Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Billing History
              </h3>
              
              {/* Search Input */}
              <div className="mb-6">
                <BoSearchInput
                  value={searchInput}
                  onChange={setSearchInput}
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  placeholder="Search by ID, Date, or Amount..."
                  activeSearchTerm={searchTerm}
                />
              </div>

              {/* Empty State or Data */}
              {filteredBillingHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-search-line text-3xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No Billing History Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    {searchTerm 
                      ? "Your search did not match any billing records. Try another keyword."
                      : "You don't have any billing history yet."
                    }
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="overflow-x-auto hidden sm:block">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">Invoice ID</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Amount</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Download</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBillingHistory.map((item, index) => (
                          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.invoiceId}
                            </th>
                            <td className="px-6 py-4">{item.date}</td>
                            <td className="px-6 py-4">{item.amount}</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="font-medium text-teal-600 dark:text-amber-500 hover:underline">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="space-y-4 sm:hidden">
                    {filteredBillingHistory.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div className="text-sm">
                          <p className="font-bold text-gray-900 dark:text-white">{item.invoiceId}</p>
                          <p className="text-gray-500 dark:text-gray-400">{item.date}</p>
                          <p className="text-gray-700 dark:text-gray-300">{item.amount}</p>
                          <p>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              {item.status}
                            </span>
                          </p>
                        </div>
                        <button className="font-medium text-teal-600 dark:text-amber-500 hover:underline">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                    <BoPagination
                      currentPage={currentPage}
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAccount;