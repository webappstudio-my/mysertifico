import React, { useState, useMemo, useEffect, useRef } from 'react';
import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 5;

// --- REUSABLE COMPONENTS (Modal, Action Menu, etc.) ---

// Modal for Adding and Editing positions
const PositionModal = ({ isOpen, onClose, onSave, positionToEdit }) => {
    const [name, setName] = useState('');
    const isEditing = !!positionToEdit;

    useEffect(() => {
        // Pre-fill the input if we are editing
        if (isEditing) {
            setName(positionToEdit.name);
        }
    }, [positionToEdit, isEditing]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    const handleClose = () => {
        setName(''); // Reset name on close
        onClose();
    };

    return (
        <div className="modal fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-1/3 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Position' : 'Add New Position'}
                    </h3>
                    <button type="button" onClick={handleClose} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="item-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position Name</label>
                        <input
                            type="text"
                            id="item-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Confirmation Modal for Deleting
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, positionName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-1/3 lg:w-1/4 p-6 text-center">
                <i className="ri-error-warning-line text-4xl text-red-500 mx-auto mb-4"></i>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Deletion</h3>
                <p className="my-4 text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete '<strong>{positionName}</strong>'?
                </p>
                <div className="flex justify-center space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger-hover">
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// Action Menu for each table row
const ActionMenu = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
        <a href="#" onClick={onEdit} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-pencil-line mr-3"></i>Edit
        </a>
        <a href="#" onClick={onDelete} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-delete-bin-line mr-3"></i>Delete
        </a>
    </div>
);


// --- MAIN COMPONENT ---

const PositionManagementTab = () => {
    const [positions, setPositions] = useState([
        { id: 1, name: 'Principal' },
        { id: 2, name: 'Senior Assistant' },
        { id: 3, name: 'Head of Department' },
        { id: 4, name: 'Teacher' },
        { id: 5, name: 'Discipline Teacher' },
        { id: 6, name: 'Counselor' },
        { id: 7, name: 'Librarian' },
        { id: 8, name: 'Lab Assistant' },
        { id: 9, name: 'Sports Teacher' },
        { id: 10, name: 'Music Teacher' },
        { id: 11, name: 'Art Teacher' },
        { id: 12, name: 'Administrative Officer' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);

    // State for modals and menus
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [positionToEdit, setPositionToEdit] = useState(null);
    const [positionToDelete, setPositionToDelete] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const menuRef = useRef(null);

    // Close the action menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const paginatedPositions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return positions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, positions]);

    const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);

    // --- CRUD Handlers ---

    const handleOpenAddModal = () => {
        setPositionToEdit(null); // Ensure we are in "add" mode
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (position) => {
        setPositionToEdit(position);
        setIsModalOpen(true);
        setActiveMenuId(null); // Close menu
    };

    const handleOpenDeleteConfirm = (position) => {
        setPositionToDelete(position);
        setIsDeleteConfirmOpen(true);
        setActiveMenuId(null); // Close menu
    };

    const handleSavePosition = (newName) => {
        if (positionToEdit) { // Editing existing position
            setPositions(positions.map(p => p.id === positionToEdit.id ? { ...p, name: newName } : p));
        } else { // Adding new position
            const newPosition = {
                id: positions.length > 0 ? Math.max(...positions.map(p => p.id)) + 1 : 1,
                name: newName,
            };
            setPositions([...positions, newPosition]);
        }
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setPositions(positions.filter(p => p.id !== positionToDelete.id));
        setIsDeleteConfirmOpen(false);
        setPositionToDelete(null);
    };

    // --- Render ---

    const renderPositionRow = (pos, index) => (
        <tr key={pos.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pos.name}</th>
            <td className="px-6 py-4 text-center">
                <div className="relative inline-block" ref={activeMenuId === pos.id ? menuRef : null}>
                    <button onClick={() => setActiveMenuId(activeMenuId === pos.id ? null : pos.id)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i className="ri-more-2-fill"></i>
                    </button>
                    {activeMenuId === pos.id && (
                        <ActionMenu
                            onEdit={(e) => { e.preventDefault(); handleOpenEditModal(pos); }}
                            onDelete={(e) => { e.preventDefault(); handleOpenDeleteConfirm(pos); }}
                        />
                    )}
                </div>
            </td>
        </tr>
    );

    const renderPositionCard = (pos) => (
        <div key={pos.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-white">{pos.name}</span>
            <div className="relative" ref={activeMenuId === pos.id ? menuRef : null}>
                <button onClick={() => setActiveMenuId(activeMenuId === pos.id ? null : pos.id)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <i className="ri-more-2-fill"></i>
                </button>
                {activeMenuId === pos.id && (
                    <ActionMenu
                        onEdit={(e) => { e.preventDefault(); handleOpenEditModal(pos); }}
                        onDelete={(e) => { e.preventDefault(); handleOpenDeleteConfirm(pos); }}
                    />
                )}
            </div>
        </div>
    );

    return (
        <>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Position Management</h3>
                    <button onClick={handleOpenAddModal} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center">
                        <i className="ri-add-line mr-2"></i>Add Position
                    </button>
                </div>

                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">#</th>
                                <th scope="col" className="px-6 py-3">Position Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPositions.map(renderPositionRow)}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List */}
                <div className="space-y-4 md:hidden">
                    {paginatedPositions.map(renderPositionCard)}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={positions.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            </div>

            {/* Modals rendered here */}
            <PositionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePosition}
                positionToEdit={positionToEdit}
            />
            <DeleteConfirmModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                positionName={positionToDelete?.name}
            />
        </>
    );
};

export default PositionManagementTab;