// src/components/common/ProblemSection.jsx
import React from 'react';
import ProblemSolutionCard from './ProblemSolutionCard'; // Import the reusable card

const problems = [
    {
        iconClass: 'ri-file-damage-line',
        iconColor: 'text-red-400',
        title: 'Lost & Damaged',
        description: 'Physical certificates are easily lost, misplaced, or damaged by water and time, making it hard to prove achievements.',
    },
    {
        iconClass: 'ri-timer-flash-line',
        iconColor: 'text-yellow-400',
        title: 'Slow Verification',
        description: 'Verifying a certificate\'s authenticity is a manual, time-consuming process for schools and potential employers.',
    },
    {
        iconClass: 'ri-shield-cross-line',
        iconColor: 'text-orange-400',
        title: 'Risk of Fraud',
        description: 'Physical documents can be easily forged, undermining the credibility of the issuing institution and the holder.',
    },
];

const ProblemSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">The Challenge with Traditional Certificates</h2>
                    <p className="text-teal-200 mb-12">The traditional method of managing physical certificates is outdated and comes with significant challenges for both institutions and individuals.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <ProblemSolutionCard
                            key={index}
                            iconClass={problem.iconClass}
                            iconColor={problem.iconColor}
                            title={problem.title}
                            description={problem.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;