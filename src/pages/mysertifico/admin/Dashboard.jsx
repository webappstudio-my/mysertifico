import React from "react";
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";
import CertificateCard from "../../../components/common/CertificateCard";

const Dashboard = () => {
    const mockCertificates = [
        { title: "React Developer", description: "Completed July 2024" },
        { title: "Web Accessibility", description: "Completed May 2024" },
        { title: "Intro to Git", description: "Completed January 2024" },
    ];

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 w-full min-h-screen bg-gray-100">
                <Header />
                <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockCertificates.map((cert, index) => (
                        <CertificateCard key={index} {...cert} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
