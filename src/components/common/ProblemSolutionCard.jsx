// src/components/common/ProblemSolutionCard.jsx
import React from 'react';

const ProblemSolutionCard = ({ iconClass, iconColor, title, description }) => {
    return (
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <i className={`${iconClass} text-4xl ${iconColor} mb-4`}></i>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-teal-200 text-sm">{description}</p>
        </div>
    );
};

export default ProblemSolutionCard;