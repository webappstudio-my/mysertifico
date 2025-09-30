import React from 'react'; 
import { NavLink } from 'react-router-dom';
import defaultAvatar from '../../../assets/images/users/nabil.png';


const ResumeStyles = () => (
  <style>{`
    /* A4 paper size for browser view */
    .a4-container {
        width: 210mm;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* This section controls the PDF output */
    @media print {
        /* Hide everything on the page by default */
        body * {
            visibility: hidden;
        }
        /* Make only the resume and its contents visible */
        .printable-area, .printable-area * {
            visibility: visible;
        }
        /* Position the resume perfectly on the printed page */
        .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
        }
        /* Hide the action buttons when printing */
        .no-print {
            display: none !important;
        }
    }
  `}</style>
);

const StudentResume = () => {

    // function that uses the browser's print engine
    const handlePrintToPdf = () => {
        window.print();
    };

    return (
        <div className="bg-gray-200 text-gray-800">
            <ResumeStyles />
            
            <div className="bg-white shadow-md w-full py-4 px-6 flex justify-center items-center gap-4 fixed bottom-0 z-50 no-print">
                <NavLink to="/mywall/student-myprofile" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                    <i className="ri-arrow-left-line"></i>
                    <span>Back to Profile</span>
                </NavLink>
                <button onClick={handlePrintToPdf} className="bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                    <i className="ri-download-2-line"></i>
                    <span>Download PDF</span>
                </button>
            </div>

            {/* Main content is the resume preview itself */}
            <main className="py-12">
                <div className="a4-container bg-white shadow-lg printable-area">
                    <div className="flex">
                        {/* Left Sidebar */}
                        <aside className="w-1/3 bg-primary-mywall-50 p-[16mm] flex flex-col">
                            <div className="text-center">
                                <img src={defaultAvatar} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/cccccc/333333?text=A'; }} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-md inline-block" />
                            </div>
                            
                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">About Me</h3>
                                <p className="text-xs text-gray-600 mt-2 border-l-2 border-primary-mywall pl-3">Driven professional with a passion for software engineering and machine learning. Eager to apply technical knowledge to real-world challenges.</p>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Contact</h3>
                                <div className="mt-2 text-xs text-gray-700 space-y-2 border-l-2 border-primary-mywall pl-3">
                                    <p className="flex items-center"><i className="ri-phone-fill w-4 mr-2"></i> +60 12-345 6789</p>
                                    <p className="flex items-center"><i className="ri-mail-fill w-4 mr-2"></i> t.nabil@email.com</p>
                                    <p className="flex items-center"><i className="ri-map-pin-fill w-4 mr-2"></i> 807-D, Jalan Angsana 2, 123456 Puchong, Selangor, MALAYSIA</p>
                                    <p className="flex items-center"><i className="ri-linkedin-box-fill w-4 mr-2"></i> /in/taufiknabil</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Skills</h3>
                                <div className="mt-2 text-xs text-gray-700 space-y-1 border-l-2 border-primary-mywall pl-3">
                                    <p>• Python, JavaScript, React</p>
                                    <p>• SQL, AWS, Docker</p>
                                    <p>• Agile, Scrum, Project Management</p>
                                </div>
                            </div>
                        </aside>

                        {/* Right Main Content */}
                        <div className="w-2/3 p-[16mm]">
                            <header>
                                <h1 className="text-3xl font-bold font-poppins text-gray-900 leading-tight">Nabil Taufik Yusoff</h1>
                                <p className="text-gray-600 mt-1">National ID: 950101-03-1234</p>
                            </header>

                            <section className="mt-8">
                                <h2 className="font-poppins font-bold text-primary-mywall text-sm tracking-widest uppercase">Achievements & Credentials</h2>
                                <div className="mt-4 space-y-6">
                                    
                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">Universiti Teknologi Petronas</h3>
                                        <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">May 2024</p><p className="w-3/4">Dean’s List, Semester 2, 2023/2024</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Jan 2024</p><p className="w-3/4">Technical Executive, Google Developer Student Club UTP</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Dec 2023</p><p className="w-3/4">Dean’s List, Semester 1, 2023/2024</p></div>
                                        </div>
                                    </div>

                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">PETRONAS Digital Sdn. Bhd.</h3>
                                        <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Aug 2023</p><p className="w-3/4">Internship Completion Certificate (Software Engineering)</p></div>
                                        </div>
                                    </div>

                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">Professional Certifications</h3>
                                        <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Dec 2023</p><p className="w-3/4">Professional Scrum Master I (Scrum.org)</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Nov 2023</p><p className="w-3/4">AWS Certified Cloud Practitioner (Amazon Web Services)</p></div>
                                        </div>
                                    </div>
                                    
                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">SM Sains Machang, Kelantan</h3>
                                          <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Mar 2022</p><p className="w-3/4">Best SPM Student Award (9As)</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Aug 2021</p><p className="w-3/4">Champion, State-level Robotics Competition</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Jan 2021</p><p className="w-3/4">Head Prefect</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Nov 2020</p><p className="w-3/4">1st in Form Award</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Jul 2020</p><p className="w-3/4">Participant, National Chemistry Quiz</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Mar 2019</p><p className="w-3/4">Best Student, Lower Secondary Assessment (PMR)</p></div>
                                        </div>
                                    </div>

                                    <div className="page-break-avoid">
                                        <h3 className="font-bold text-lg text-gray-900">SK Kubang Kerian 3, Kelantan</h3>
                                          <div className="mt-2 space-y-3 pl-3 text-sm border-l-2 border-primary-mywall-50">
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Nov 2016</p><p className="w-3/4">Best UPSR Student Award (5As)</p></div>
                                            <div className="flex"><p className="w-1/4 font-semibold text-gray-600">Jan 2016</p><p className="w-3/4">Head Prefect</p></div>
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

export default StudentResume;