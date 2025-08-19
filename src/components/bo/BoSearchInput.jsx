import React, { useState, useEffect, useRef } from 'react';

const BoSearchInput = ({ 
  value, 
  onChange, 
  onSearch, 
  onClear, 
  placeholder = "Search...",
  showClearButton = true,
  className = "",
  activeSearchTerm = ""
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative min-w-20">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
          />
          {showClearButton && (value || activeSearchTerm) && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSearch}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {/*<i className="ri-search-line"></i>*/}
            <span>Search</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BoSearchInput;