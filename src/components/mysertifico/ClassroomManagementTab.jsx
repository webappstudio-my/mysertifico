import React, { useState } from 'react';
import Pagination from '../common/Pagination';
// You would also import your modal components here
// import ItemModal from './ItemModal';
// import ConfirmationModal from './ConfirmationModal';

const ClassroomManagementTab = () => {
    const [classrooms] = useState([
        { id: 1, name: '1 Amanah' },
        { id: 2, name: '2 Bestari' },
        { id: 3, name: '3 Cerdas' },
        { id: 4, name: '4 Dedikasi' },
        { id: 5, name: '5 Elit' },
        { id: 6, name: '6 Fikrah' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const totalItems = classrooms.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClassrooms = classrooms.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

     // Add states for modals here
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Classroom Management</h3>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"><i className="ri-add-line mr-2"></i>Add Class</button>
            </div>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">#</th>
                            <th scope="col" className="px-6 py-3">Class Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClassrooms.map((cls, index) => (
                            <tr key={cls.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cls.name}</th>
                                <td className="px-6 py-4 text-center">
                                    {/* Action menu would be a component */}
                                    <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><i className="ri-more-2-fill"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {/* Mobile List */}
             <div className="space-y-4 md:hidden">
                {currentClassrooms.map(cls => (
                     <div key={cls.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{cls.name}</span>
                        <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"><i className="ri-more-2-fill"></i></button>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default ClassroomManagementTab;