import React from "react";

const CertificateCard = ({ title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold text-indigo-600">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default CertificateCard;
