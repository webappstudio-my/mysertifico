import React from 'react';

const BoUsersTable = ({ users, onToggleStatus }) => {
    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-100">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Date Joined</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.role}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.dateJoined}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="p-2 rounded-lg"
                                            title={user.status === 'Active' ? 'Set to Inactive' : 'Set to Active'}
                                            onClick={() => onToggleStatus(user.id)}
                                        >
                                            <i className={`${user.status === 'Active' ? 'ri-toggle-fill text-primary text-3xl' : 'ri-toggle-line text-gray-500 text-3xl'}`}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-16">
                                    <div className="flex flex-col items-center">
                                        <i className="ri-user-search-line text-6xl text-gray-400 mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Users Found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">Your search or filter did not match any users.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile List */}
            <div className="block md:hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="p-4 flex justify-between items-center">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {user.role} &bull; Joined: {user.dateJoined}
                                    </div>
                                    <div className="mt-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="p-2 rounded-lg"
                                        title={user.status === 'Active' ? 'Set to Inactive' : 'Set to Active'}
                                        onClick={() => onToggleStatus(user.id)}
                                    >
                                        <i className={`${user.status === 'Active' ? 'ri-toggle-fill text-primary text-3xl' : 'ri-toggle-line text-gray-500 text-3xl'}`}></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="flex flex-col items-center">
                                <i className="ri-user-search-line text-6xl text-gray-400 mb-4"></i>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Users Found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">Your search or filter did not match any users.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BoUsersTable;
