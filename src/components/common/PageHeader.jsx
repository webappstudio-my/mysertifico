// src/components/common/PageHeader.jsx
import React from 'react';

const PageHeader = ({ title, description }) => {
    return (
        <section className="py-16">
            <div className="container mx-auto text-center px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{title}</h1>
                <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">{description}</p>
            </div>
        </section>
    );
};

export default PageHeader;