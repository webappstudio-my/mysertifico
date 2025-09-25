// src/pages/bo/BoSupportHelp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoSupportHelp = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [markStatus, setMarkStatus] = useState('In Progress');
    const [replyError, setReplyError] = useState(false);
    const [replyLoading, setReplyLoading] = useState(false);
    
    // Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    
    const statusStyles = {
        'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'Unread': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'Resolved': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };

    // Helper function to format status from backend to frontend
    const formatStatus = (backendStatus) => {
        const statusMap = {
            'new': 'New',
            'unread': 'Unread', 
            'in progress': 'In Progress',
            'resolved': 'Resolved'
        };
        return statusMap[backendStatus?.toLowerCase()] || 'New';
    };

    // Helper function to format backend status for API calls
    const formatBackendStatus = (frontendStatus) => {
        const statusMap = {
            'New': 'new',
            'Unread': 'unread',
            'In Progress': 'in progress',
            'Resolved': 'resolved'
        };
        return statusMap[frontendStatus] || 'unread';
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    };

    // Transform backend data to frontend format
    const transformTicketData = (backendData) => {
        return backendData.map(ticket => ({
            id: ticket.id,
            subject: ticket.subject || 'No Subject',
            name: ticket.fullname,
            email: ticket.email,
            date: formatDate(ticket.createdAt),
            status: formatStatus(ticket.status),
            message: ticket.message,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        }));
    };

    // Fetch tickets from API
    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError('');
            
            const response = await axios.get('http://127.0.0.1:3000/api/contact-us', {
                timeout: 10000
            });

            if (response.data && response.data.data) {
                const transformedData = transformTicketData(response.data.data);
                setTicketData(transformedData);
                setFilteredData(transformedData);
            } else {
                setTicketData([]);
                setFilteredData([]);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setError('Failed to load support tickets. Please try again.');
            
            // Show user-friendly error
            if (error.response) {
                setError(`Server error: ${error.response.data?.message || error.response.status}`);
            } else if (error.request) {
                setError('Unable to connect to server. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Load tickets on component mount
    useEffect(() => {
        fetchTickets();
    }, []);

    //For BoSearchInput variables
    const handleSearchSubmit = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchTerm('');
        setCurrentPage(1);
    };

    // Apply filters
    useEffect(() => {
        let filtered = ticketData;
        
        if (searchTerm) {
            filtered = filtered.filter(ticket => 
                ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(ticket => ticket.status === statusFilter);
        }
        
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, statusFilter, ticketData]);
    
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const openReplyModal = (ticket) => {
        setSelectedTicket(ticket);
        setReplyMessage('');
        setMarkStatus(ticket.status === 'Resolved' ? 'Resolved' : 'In Progress');
        setReplyError(false);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTicket(null);
        setReplyMessage('');
        setReplyError(false);
        setReplyLoading(false);
    };
    
    const showToastNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };
    
    const handleSubmitReply = async (e) => {
        e.preventDefault();
        
        if (!replyMessage.trim()) {
            setReplyError(true);
            return;
        }
        
        setReplyLoading(true);
        
        try {
            // In a real implementation, you would send the reply to your backend
            // For now, we'll just update the status locally
            
            // If you have a reply endpoint, uncomment and use this:
            /*
            const replyData = {
                ticketId: selectedTicket.id,
                replyMessage: replyMessage.trim(),
                status: formatBackendStatus(markStatus)
            };
            
            await axios.post('http://localhost:3000/api/contact-us/reply', replyData);
            */
            
            // Update local state (remove this if you implement the API call above)
            setTicketData(prev => prev.map(ticket => 
                ticket.id === selectedTicket.id 
                    ? { ...ticket, status: markStatus }
                    : ticket
            ));
            
            // Create success message
            const now = new Date();
            const repliedBy = "Admin"; // This would be dynamic in a real app
            const formattedDate = now.toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });
            const formattedTime = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });
            
            const successMsg = `Reply sent successfully!\nBy: ${repliedBy} on ${formattedDate} at ${formattedTime}`;
            showToastNotification(successMsg);
            
            closeModal();
        } catch (error) {
            console.error('Error sending reply:', error);
            setReplyError(true);
            showToastNotification('Failed to send reply. Please try again.');
        } finally {
            setReplyLoading(false);
        }
    };

    // Refresh tickets handler
    const handleRefresh = () => {
        fetchTickets();
        showToastNotification('Tickets refreshed successfully!');
    };
    
    return (
        <div className="min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar onSidebarToggle={handleSidebarToggle} headerTitle="Support & Help" />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Support Tickets
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Respond to user inquiries and complaints from the Contact Us page.
                                </p>
                                {!loading && (
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        Total tickets: {ticketData.length} | Showing: {filteredData.length}
                                    </p>
                                )}
                            </div>
                            
                            <button 
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`}></i>
                                Refresh
                            </button>
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <i className="ri-error-warning-line"></i>
                                    <span>{error}</span>
                                    <button 
                                        onClick={fetchTickets}
                                        className="ml-auto text-sm underline hover:no-underline"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            {/* Toolbar: Search & Filter */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by subject, email or name..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                                />
                                
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Unread">Unread</option>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            
                            {/* Loading State */}
                            {loading ? (
                                <div className="text-center py-16">
                                    <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        Loading Tickets...
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                                        Please wait while we fetch the latest support tickets.
                                    </p>
                                </div>
                            ) : currentItems.length === 0 ? (
                                <div className="text-center py-16">
                                    <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        {filteredData.length === 0 && ticketData.length === 0 
                                            ? 'No Support Tickets Yet'
                                            : 'No Tickets Found'
                                        }
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                                        {filteredData.length === 0 && ticketData.length === 0
                                            ? 'When users submit contact forms, they will appear here.'
                                            : 'Your search or filter did not match any tickets.'
                                        }
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3">#</th>
                                                    <th className="px-6 py-3">Subject</th>
                                                    <th className="px-6 py-3">From</th>
                                                    <th className="px-6 py-3">Date Received</th>
                                                    <th className="px-6 py-3">Status</th>
                                                    <th className="px-6 py-3 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((ticket, index) => (
                                                    <tr key={ticket.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                            {indexOfFirstItem + index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {ticket.subject}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <div className="text-gray-800 dark:text-gray-200">
                                                                    {ticket.name}
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {ticket.email}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                            {ticket.date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[ticket.status]}`}>
                                                                {ticket.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button 
                                                                onClick={() => openReplyModal(ticket)}
                                                                className="p-2 text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                                                title="View & Reply"
                                                            >
                                                                <i className="ri-mail-send-line"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {/* Pagination */}
                                    {filteredData.length > itemsPerPage && (
                                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                                            <BoPagination
                                                currentPage={currentPage}
                                                totalItems={filteredData.length}
                                                itemsPerPage={itemsPerPage}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Reply Modal */}
            {isModalOpen && selectedTicket && (
                <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all my-auto">
                        <form onSubmit={handleSubmitReply}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
                                    Re: {selectedTicket.subject}
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>
                            
                            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">From</h4>
                                    <p className="text-gray-800 dark:text-white">
                                        {selectedTicket.name} ({selectedTicket.email})
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Message</h4>
                                    <p className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg">
                                        {selectedTicket.message}
                                    </p>
                                </div>
                                
                                <div>
                                    <label htmlFor="reply-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Your Reply
                                    </label>
                                    <textarea 
                                        id="reply-message"
                                        rows="5" 
                                        value={replyMessage}
                                        onChange={(e) => {
                                            setReplyMessage(e.target.value);
                                            setReplyError(false);
                                        }}
                                        disabled={replyLoading}
                                        className={`w-full py-2 px-4 border ${
                                            replyError 
                                                ? 'border-red-500 dark:border-red-500' 
                                                : 'border-gray-300 dark:border-gray-600'
                                        } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50`}
                                    />
                                    {replyError && (
                                        <small className="text-red-500 mt-1 block">
                                            Reply message cannot be empty.
                                        </small>
                                    )}
                                </div>
                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center">
                                    <label htmlFor="mark-status" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mark as:
                                    </label>
                                    <select 
                                        id="mark-status"
                                        value={markStatus}
                                        onChange={(e) => setMarkStatus(e.target.value)}
                                        disabled={replyLoading}
                                        className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50"
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        type="button" 
                                        onClick={closeModal}
                                        disabled={replyLoading}
                                        className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={replyLoading}
                                        className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {replyLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reply'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Toast Notification */}
            <div className={`fixed top-24 right-6 bg-green-100 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 px-4 py-3 rounded-lg shadow-md flex items-start gap-3 transition-all transform z-[150] ${
                showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
                <i className="ri-checkbox-circle-fill text-xl"></i>
                <div>
                    <div className="font-medium">{toastMessage.split('\n')[0]}</div>
                    {toastMessage.split('\n')[1] && (
                        <div className="text-xs font-normal mt-1">
                            {toastMessage.split('\n')[1]}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoSupportHelp;