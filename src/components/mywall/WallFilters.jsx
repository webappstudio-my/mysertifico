import React from 'react';
import { personFilterOptions, categoryFilterOptions } from '../../data/certificateData';

const WallFilters = ({ filters, onFilterChange, onUploadClick }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    const handleUploadClick = () => {
        onUploadClick();
    };

    return (
        <div className="max-w-6xl mx-auto mb-12">
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ri-search-line text-primary-mywall-200"></i>
                </div>
                <input
                    type="text"
                    name="search"
                    placeholder="Search for a certificate by title..."
                    value={filters.search}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/20 text-white placeholder-primary-mywall-200 rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Person Filter */}
                <select name="owner" value={filters.owner} onChange={handleInputChange} className="custom-select w-full px-4 py-3 bg-white/20 text-white rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all">
                    {personFilterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>

                {/* Category Filter */}
                <select name="category" value={filters.category} onChange={handleInputChange} className="custom-select w-full px-4 py-3 bg-white/20 text-white rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all">
                    {categoryFilterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>

                {/* Source Filter */}
                <select name="source" value={filters.source} onChange={handleInputChange} className="custom-select w-full px-4 py-3 bg-white/20 text-white rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all">
                    <option value="all">All Sources</option>
                    <option value="mysertifico">MySertifico</option>
                    <option value="external">External</option>
                </select>

                <button onClick={handleUploadClick} className="bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2">
                    <i className="ri-upload-cloud-2-line"></i>
                    <span>Upload External</span>
                </button>
            </div>
        </div>
    );
};

export default WallFilters;