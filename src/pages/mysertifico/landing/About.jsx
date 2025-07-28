// src/pages/mysertifico/AboutPage.jsx
import React from 'react';
import Header from '../../../components/layout/Header'; // Assuming Header is in this path
import Footer from '../../../components/layout/Footer'; // Assuming Footer is in this path
import PageHeader from '../../../components/common/PageHeader';
import ProblemSection from '../../../components/common/ProblemSection';
import SolutionSection from '../../../components/common/SolutionSection';
import VisionSection from '../../../components/common/VisionSection';

const About = () => {
    return (
        // The body class in about.html was 'bg-gradient-to-br from-primary-dark to-primary text-white'
        // This styling needs to be applied to the main wrapper or the body element.
        // For React, we'll apply it to a top-level div in the page component.
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24"> {/* pt-24 to offset fixed header */}
                <PageHeader
                    title="About MySertifico"
                    description="A trusted platform for simple, secure, and smart certificate management."
                />
                <ProblemSection />
                <SolutionSection />
                <VisionSection />
            </main>
            <Footer />
        </div>
    );
};

export default About;