import React from 'react';

const CertificateCard = ({ cert, onSelect, isSelected, onView, onDownload }) => {
    const handleDownloadClick = (e) => {
        e.stopPropagation();
        onDownload(cert);
    };

    return (
        <div
            className={`certificate-card bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden group flex flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-mywall/30 hover:-translate-y-2 ${isSelected ? 'ring-2 ring-accent' : ''}`}
        >
            <div className="relative h-48 overflow-hidden bg-black/20 p-2">
                <img className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110" src={cert.image} alt={cert.title} />
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(cert.id)}
                    className="custom-checkbox absolute bottom-3 left-3 z-10"
                />
                {cert.source === 'mysertifico' ? (
                    <div className="absolute top-2 left-2 bg-primary-mywall rounded-full p-2 text-white z-10" title="MySertifico Certificate"><i className="ri-shield-star-fill"></i></div>
                ) : (
                    <div className="absolute top-2 left-2 bg-gray-500 rounded-full p-2 text-white z-10" title="Externally Uploaded"><i className="ri-upload-cloud-2-line"></i></div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="flex items-center gap-2 text-xs text-primary-mywall-300 font-semibold mb-2">
                        <i className="ri-user-line"></i><span>{cert.ownerName}</span>
                    </p>
                    <h3 className="text-lg font-bold text-white truncate">{cert.title}</h3>
                    <p className="text-sm text-primary-mywall-200 mt-1">Issued by {cert.issuer}</p>
                    <p className="text-xs text-primary-mywall-300 mt-2">Date: {cert.date}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                    <button onClick={() => onView(cert)} className="flex-1 text-center px-3 py-2 text-sm bg-primary-mywall/80 text-white font-semibold rounded-lg hover:bg-primary-mywall transition-colors flex items-center justify-center gap-1">
                        <i className="ri-eye-line"></i> View
                    </button>
                    <button onClick={handleDownloadClick} className="flex-1 text-center px-3 py-2 text-sm bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-1">
                        <i className="ri-download-2-line"></i> Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;