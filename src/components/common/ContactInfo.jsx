// src/components/common/ContactInfo.jsx
import React from 'react';

const ContactInfo = () => {
    return (
        <div className="lg:pl-8">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
                <div className="flex items-start">
                    <i className="ri-map-pin-2-line text-2xl text-accent mr-4 mt-1"></i>
                    <div>
                        <h4 className="font-semibold text-white">Address</h4>
                        <p className="text-teal-200">
                            Webapp Studio Sdn Bhd,<br />83, Jalan KH 5, Kita Harmoni,<br />Cybersouth, 47810 Dengkil,<br />Selangor Darul Ehsan, Malaysia
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <i className="ri-mail-send-line text-2xl text-accent mr-4 mt-1"></i>
                    <div>
                        <h4 className="font-semibold text-white">Email</h4>
                        <a href="mailto:support@webappstudio.my" className="text-teal-200 hover:text-white">
                            support@webappstudio.my
                        </a>
                    </div>
                </div>
                <div className="flex items-start">
                    <i className="ri-phone-line text-2xl text-accent mr-4 mt-1"></i>
                    <div>
                        <h4 className="font-semibold text-white">Phone</h4>
                        <a href="tel:+60194892806" className="text-teal-200 hover:text-white">
                            +60 19-489 2806
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;