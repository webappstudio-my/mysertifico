import React, { useState } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import FamilyCard from '../../../components/mywall/FamilyCard';
import MemberModal from '../../../components/mywall/MemberModal';
import DeleteModal from '../../../components/mywall/DeleteModal';
import Toast from '../../../components/mywall/Toast';

const initialFamilyMembers = [
    { id: 1, name: 'Ali bin Ahmad', nid: '090315-10-1234', relation: 'Child' },
    { id: 2, name: 'Siti binti Ahmad', nid: '121101-10-5678', relation: 'Child' },
];

const MyFamilyPage = () => {
    const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [memberToEdit, setMemberToEdit] = useState(null);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        // The Toast component now handles its own hiding via onClose
    };

    const handleOpenAddModal = () => {
        setMemberToEdit(null);
        setIsMemberModalOpen(true);
    };

    const handleOpenEditModal = (member) => {
        setMemberToEdit(member);
        setIsMemberModalOpen(true);
    };

    const handleOpenDeleteModal = (member) => {
        setMemberToDelete(member);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsMemberModalOpen(false);
        setIsDeleteModalOpen(false);
        setMemberToEdit(null);
        setMemberToDelete(null);
    };

    const handleSaveMember = (memberData) => {
        if (!memberData.name.trim() || !memberData.nid.trim()) {
            showToast('All fields are required.', 'error');
            return;
        }

        if (memberData.id) { // Editing existing member
            setFamilyMembers(familyMembers.map(m => m.id === memberData.id ? memberData : m));
            showToast(`Updated details for ${memberData.name}.`, 'success');
        } else { // Adding new member
            const newMember = { ...memberData, id: Date.now() }; // Simple unique ID
            setFamilyMembers([...familyMembers, newMember]);
            showToast(`${memberData.name} has been added to your family.`, 'success');
        }
        handleCloseModals();
    };

    const handleDeleteMember = () => {
        setFamilyMembers(familyMembers.filter(m => m.id !== memberToDelete.id));
        showToast(`${memberToDelete.name} has been removed from your family.`, 'error');
        handleCloseModals();
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <MyWallNavbar />

            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                            <div className="text-center sm:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">My Family</h1>
                                <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl">Manage your family members' profiles and access their walls.</p>
                            </div>
                            <button onClick={handleOpenAddModal} className="mt-6 sm:mt-0 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex items-center gap-2">
                                <i className="ri-user-add-line"></i>
                                <span>Add Family Member</span>
                            </button>
                        </div>

                        <div id="family-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {familyMembers.map(member => (
                                <FamilyCard
                                    key={member.id}
                                    member={member}
                                    onEdit={handleOpenEditModal}
                                    onDelete={handleOpenDeleteModal}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <MemberModal
                isOpen={isMemberModalOpen}
                onClose={handleCloseModals}
                onSave={handleSaveMember}
                memberToEdit={memberToEdit}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModals}
                onConfirm={handleDeleteMember}
                memberToDelete={memberToDelete}
            />

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default MyFamilyPage;