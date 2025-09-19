import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import defaultAvatar from '../../../assets/images/users/aliyah.png';

const ResumeStyles = () => (
    <style>
      {`
        /* A4 paper size: 210mm x 297mm */
        .a4-container {
            width: 210mm;
            min-height: 297mm;
            margin-left: auto;
            margin-right: auto;
        }

        .page-break-avoid {
            page-break-inside: avoid;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .no-print {
                display: none !important;
            }
            .a4-container {
                box-shadow: none !important;
                border: none !important;
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 0;
            }
        }
      `}
    </style>
);

const ParentResume = () => {
    const resumeContentRef = useRef(null);

    const handleDownloadPdf = () => {
        const element = resumeContentRef.current;
        if (element) {
            const opt = {
                margin: 0,
                filename: 'Resume-Aliyah-Zawaton.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        }
    };

    return (
        <div className="bg-gray-200">
            {/*styles component*/}
            <ResumeStyles />

            {/* Action Bar */}
            <div className="bg-white shadow-md w-full py-4 px-6 flex justify-center items-center gap-4 fixed bottom-0 z-50 no-print">
                <NavLink to="/mywall/parent-myprofile" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                    <i className="ri-arrow-left-line"></i>
                    <span>Back to Profile</span>
                </NavLink>
                <button onClick={handleDownloadPdf} className="bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                    <i className="ri-download-2-line"></i>
                    <span>Download PDF</span>
                </button>
            </div>

            {/* Main content is the resume preview itself */}
            <main className="py-12">
                {/* A4 Aspect Ratio Container for PDF generation */}
                <div id="resume-content" ref={resumeContentRef} className="a4-container bg-white shadow-lg">
                    <div className="flex">
                        {/* Left Sidebar */}
                        <aside className="w-1/3 bg-primary-mywall-50 p-[16mm] flex flex-col">
                            <div className="text-center">
                                <img src={defaultAvatar} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/cccccc/333333?text=A'; }} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-md inline-block" />
                            </div>
                            
                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">About Me</h3>
                                <p className="text-xs text-gray-600 mt-2 border-l-2 border-primary-mywall pl-3">A dedicated parent and professional with a background in accounting. Passionate about supporting my children's educational journey and managing our family's digital achievements.</p>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Contact</h3>
                                <div className="mt-2 text-xs text-gray-700 space-y-2 border-l-2 border-primary-mywall pl-3">
                                    <p className="flex items-center"><i className="ri-phone-fill w-4 mr-2"></i> 012-3456789</p>
                                    <p className="flex items-center"><i className="ri-mail-fill w-4 mr-2"></i> aliyah.zawaton@email.com</p>
                                    <p className="flex items-center"><i className="ri-map-pin-fill w-4 mr-2"></i> Sungai Buloh, Selangor, Malaysia</p>
                                    <p className="flex items-center"><i className="ri-linkedin-box-fill w-4 mr-2"></i> /in/aliyah-example</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Skills</h3>
                                <div className="mt-2 text-xs text-gray-700 space-y-1 border-l-2 border-primary-mywall pl-3">
                                    <p>• Financial Planning</p>
                                    <p>• Accounting</p>
                                    <p>• Microsoft Office Suite</p>
                                    <p>• Team Management</p>
                                </div>
                            </div>
                        </aside>

                        {/* Right Main Content */}
                        <div className="w-2/3 p-[16mm] text-gray-800">
                            <header>
                                <h1 className="text-3xl font-bold font-poppins text-gray-900 leading-tight">Aliyah Zawaton binti Muhammad</h1>
                                <p className="text-gray-600 mt-1">National ID: 750101-10-1234</p>
                            </header>

                            <section className="mt-8">
                                <h2 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Work Experience</h2>
                                <div className="mt-4 space-y-6">
                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">Senior Accountant</h3>
                                        <p className="text-sm text-gray-600">ABC Corporation | 2015 - Present</p>
                                        <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <p className="text-gray-700">Managed financial records, oversaw budgeting and forecasting processes, and mentored junior accounting staff.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-8">
                                <h2 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Education</h2>
                                <div className="mt-4 space-y-6">
                                     <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">Bachelor of Accountancy</h3>
                                        <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex">
                                                <p className="w-1/4 font-semibold text-gray-600">Institution</p>
                                                <p className="w-3/4">Universiti Malaya</p>
                                            </div>
                                            <div className="flex">
                                                <p className="w-1/4 font-semibold text-gray-600">Graduated</p>
                                                <p className="w-3/4">2012</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ParentResume;