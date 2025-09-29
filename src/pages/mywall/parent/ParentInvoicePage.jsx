import React, { useRef, useState } from 'react';
import ActionBar from '../../../components/mywall/ActionBar';
import InvoicePreview from '../../../components/mywall/InvoicePreview';
import Toast from '../../../components/mywall/Toast';

// Data can be fetched from an API or defined statically
const invoiceData = {
    id: '#INV-2025-07-001',
    company: {
        name: 'Webapp Studio Sdn. Bhd.',
        address1: 'B-05-01, Level 5, Block B, CoPlace 2,',
        address2: '2270, Jalan Usahawan 2, 63000 Cyberjaya,',
        address3: 'Selangor, Malaysia.',
        email: 'hello@webappstudio.com'
    },
    billTo: {
        name: 'Aliyah Zawaton binti Muhammad',
        address1: 'A-12-01, The Horizon Residence,',
        address2: 'Jalan Tun Razak, 50400 Kuala Lumpur'
    },
    details: {
        issueDate: 'July 15, 2025',
        dueDate: 'July 30, 2025'
    },
    items: [
        {
            description: 'Standard Plan - Annual Subscription (2025-2026)',
            qty: 1,
            unitPrice: 10.00,
            amount: 10.00
        }
    ],
    totals: {
        subtotal: 10.00,
        taxRate: 8,
        taxAmount: 0.80,
        grandTotal: 10.80
    }
};


const ParentInvoicePage = () => {
    // Create a ref to hold the DOM element of the invoice content
    const invoiceRef = useRef(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleDownloadPdf = () => {
        const element = invoiceRef.current;
        if (element && window.html2pdf) {
            showToast('Downloading PDF...', 'info');
            window.scrollTo(0, 0);
            const opt = {
                margin: 0,
                filename: `Invoice-${invoiceData.id}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 4, useCORS: true, logging: false, scrollY: 0 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            window.html2pdf().set(opt).from(element).save();
        } else {
            showToast('Could not generate PDF. Please try again later.', 'error');
            console.error("PDF generation library (html2pdf) not found or element not ready.");
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen overflow-auto">
            <ActionBar onDownloadPdf={handleDownloadPdf} backTo="/mywall/parent-myaccount" />
            <main className="py-12 mb-24"> {/* Added margin-bottom to avoid overlap with action bar */}
                <InvoicePreview ref={invoiceRef} invoiceData={invoiceData} />
            </main>
            <Toast
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default ParentInvoicePage;