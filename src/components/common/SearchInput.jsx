import React, { useState, useEffect, useRef } from 'react';

const SearchInput = ({ 
    onSearchChange,
    onPageReset,
    placeholder = "Search...",
    showClearButton = true,
    className = "",
    initialValue = ""
    }) => {
    const [searchInput, setSearchInput] = useState(initialValue);
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Handle search submission
    const handleSearch = () => {
      setSearchTerm(searchInput);
      if (onSearchChange) {
        onSearchChange(searchInput);
      }
      if (onPageReset) {
        onPageReset();
      }
    };

    // Handle clear search
    const handleClear = () => {
      setSearchInput('');
      setSearchTerm('');
      if (onSearchChange) {
        onSearchChange('');
      }
      if (onPageReset) {
        onPageReset();
      }
    };

    // Handle key press
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    // Handle input change
    const handleInputChange = (value) => {
      setSearchInput(value);
    };

    // Effect to handle initial value changes
    useEffect(() => {
      if (initialValue !== searchInput) {
        setSearchInput(initialValue);
        setSearchTerm(initialValue);
      }
    }, [initialValue]);

    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative min-w-80">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
            />
            {showClearButton && (searchInput || searchTerm) && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Search</span>
            </button>
          </div>
        </div>
    </div>
  );
};

export default SearchInput;