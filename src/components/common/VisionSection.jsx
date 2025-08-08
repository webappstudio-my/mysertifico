// src/components/common/VisionSection.jsx
import React from 'react';
import logo from '../../assets/images/logos/logo.png'; // Adjust the path as necessary

const VisionSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                {/* Updated image path for Vite */}
                <img src={logo} className="mx-auto h-28 w-28 mb-6 rounded-full bg-white/40" alt="MySertifico Icon" />
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                <p className="mt-4 text-xl text-teal-100 italic">
                    “We envision a future where every certificate is instantly verifiable, tamper-proof, and digitally archived. Our goal is to become the national standard for academic and co-curricular certificate management across Malaysia and beyond.”
                </p>
            </div>
        </section>
    );
};

export default VisionSection;