// src/components/auth/Stepper.jsx
import React from 'react';

const Stepper = ({ currentStep, steps }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className={`flex items-center ${currentStep >= index + 1 ? 'text-primary' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${currentStep >= index + 1
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-500'
                                }`}>
                                {index + 1}
                            </div>
                            <span className={`ml-2 font-semibold transition-colors duration-300 ${currentStep >= index + 1
                                    ? 'text-primary'
                                    : 'text-gray-500'
                                }`}>
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-auto border-t-2 mx-4 transition-colors duration-300 ${currentStep > index + 1 ? 'border-primary' : 'border-gray-200'
                                }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Stepper;