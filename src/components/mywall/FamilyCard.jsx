import React from 'react';

const FamilyCard = ({ member, onEdit, onDelete }) => {
    // Determine border color based on relationship or other logic
    const borderColorClass = member.relation === 'Child' ? 'border-primary-400' : 'border-accent';
    const imagePath = `/images/users/${member.name.split(' ')[0].toLowerCase()}.png`;

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img
                src={imagePath}
                alt={member.name}
                className={`w-24 h-24 rounded-full border-4 ${borderColorClass} mb-4`}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/134E4A/FFFFFF?text=${member.name.charAt(0)}`; }}
            />
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-primary-mywall-200">{member.relation}</p>
            <p className="text-sm text-primary-mywall-300 mt-2">National ID: {member.nid}</p>
            <div className="mt-6 flex gap-3 w-full">
                <button
                    onClick={() => onEdit(member)}
                    className="edit-member-button flex-1 px-4 py-2 text-sm bg-primary-mywall/80 text-white font-semibold rounded-lg hover:bg-primary transition-colors">
                    Edit
                </button>
                <button
                    onClick={() => onDelete(member)}
                    className="delete-member-button flex-1 px-4 py-2 text-sm bg-red-600/80 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FamilyCard;