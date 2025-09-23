import React, { useEffect, useRef } from 'react';

const QRCode = ({ url }) => {
    const qrRef = useRef(null);
    useEffect(() => {
        if (qrRef.current && url && window.qrcode) {
            qrRef.current.innerHTML = ''; // Clear previous QR
            const qr = window.qrcode(0, 'L');
            qr.addData(url);
            qr.make();
            qrRef.current.innerHTML = qr.createImgTag(5);
        }
    }, [url]);
    return <div ref={qrRef} className="bg-white p-3 rounded-lg aspect-square flex items-center justify-center"></div>;
};

const CertificateModal = ({ isOpen, onClose, cert }) => {
    if (!isOpen || !cert) return null;

    const verificationUrl = `https://des.mysertifico.com/verify.html?id=${encodeURIComponent(cert.id)}`;

    return (
        <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                    <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                    <button onClick={onClose} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button>
                </div>
                <div className="p-6 flex-grow overflow-auto flex flex-col md:flex-row gap-6">
                    <div className="flex-grow flex items-center justify-center">
                        <img src={cert.image} alt={cert.title} className="max-w-full max-h-[60vh] object-contain" />
                    </div>
                    <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-4">
                        <h4 className="font-bold text-white">Verify & Share</h4>
                        <QRCode url={verificationUrl} />
                        <p className="text-xs text-primary-mywall-200 text-center">Scan to verify certificate</p>
                        {/* Add Share buttons here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;