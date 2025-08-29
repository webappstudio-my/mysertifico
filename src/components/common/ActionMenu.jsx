import React from 'react';

const ActionMenu = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
        <button onClick={onEdit} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-pencil-line mr-3"></i>Edit
        </button>
        <button onClick={onDelete} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-delete-bin-line mr-3"></i>Delete
        </button>
    </div>
);

export default ActionMenu;