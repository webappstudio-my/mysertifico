// src/components/common/SolutionSection.jsx
import React from 'react';
import ProblemSolutionCard from './ProblemSolutionCard'; // Reuse the card component

const solutions = [
    {
        iconClass: 'ri-qr-scan-2-line',
        iconColor: 'text-accent',
        title: 'Instant Verification',
        description: 'Every certificate comes with a unique QR code. A quick scan is all it takes for anyone to verify its authenticity instantly.',
    },
    {
        iconClass: 'ri-lock-2-fill',
        iconColor: 'text-accent',
        title: 'Secure & Permanent',
        description: 'Stored securely in the cloud, digital certificates are tamper-proof and protected from loss or damage, forever.',
    },
    {
        iconClass: 'ri-wallet-3-line',
        iconColor: 'text-accent',
        title: 'MyWall Digital Wallet',
        description: 'Recipients get a lifelong digital wallet to access, manage, and share all their achievements from one single place.',
    },
];

const SolutionSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Our Solution: The MySertifico Ecosystem</h2>
                    <p className="text-teal-200 mb-12">MySertifico revolutionizes certificate management with a secure, centralized, and verifiable digital platform.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <ProblemSolutionCard
                            key={index}
                            iconClass={solution.iconClass}
                            iconColor={solution.iconColor}
                            title={solution.title}
                            description={solution.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;