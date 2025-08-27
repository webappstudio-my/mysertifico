import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import SearchInput from '../../../components/common/SearchInput';

// Mock data - in a real app, this would likely come from an API
import { templatesData } from '../../../data/sampleTemplateData';

const TemplatesList = ({theme, onThemeToggle}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({
        style: 'all',
        orientation: 'all',
        alignment: 'all',
        color: 'all',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const filteredTemplates = useMemo(() => {
        return templatesData.filter(template => {
            return (
                (searchTerm === '' || template.template_code.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (filters.style === 'all' || template.style === filters.style) &&
                (filters.orientation === 'all' || template.orientation === filters.orientation) &&
                (filters.alignment === 'all' || template.alignment === filters.alignment) &&
                (filters.color === 'all' || template.theme_color === filters.color)
            );
        });
    }, [filters, searchTerm]);

    const handlePreview = (template) => {
        setSelectedTemplate(template);
        setIsPreviewModalOpen(true);
    };

    const handleSelect = (template) => {
        // Logic to handle template selection
        setToastMessage(`Template "${template.template_code}" selected!`);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Templates Gallery</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Browse and select a template for your next certificate batch.</p>
                        </div>

                        <FilterBar 
                            filters={filters} 
                            onFilterChange={handleFilterChange}
                            onSearchChange={handleSearchChange}
                            searchTerm={searchTerm}
                        />

                        <div id="templates-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredTemplates.length > 0 ? (
                                filteredTemplates.map(template => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        onPreview={handlePreview}
                                        onSelect={handleSelect}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-16">
                                    <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Templates Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Your search or filter did not match any templates.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <PreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                template={selectedTemplate}
            />

            {toastMessage && <ToastNotification message={toastMessage} />}
        </div>
    );
};

const FilterBar = ({ filters, onFilterChange, onSearchChange, searchTerm }) => {
    const uniqueFilters = useMemo(() => {
        const styles = [...new Set(templatesData.map(t => t.style))];
        const orientations = [...new Set(templatesData.map(t => t.orientation))];
        const alignments = [...new Set(templatesData.map(t => t.alignment))];
        const colors = [...new Set(templatesData.map(t => t.theme_color))];
        return { styles, orientations, alignments, colors };
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
                <SearchInput
                    onSearchChange={onSearchChange}
                    placeholder="Search templates by code..."
                    initialValue={searchTerm}
                />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:w-auto gap-4 text-gray-900 dark:text-white">
                <select value={filters.style} onChange={(e) => onFilterChange('style', e.target.value)} className="w-full lg:w-44 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="all">All Styles</option>
                    {uniqueFilters.styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filters.orientation} onChange={(e) => onFilterChange('orientation', e.target.value)} className="w-full lg:w-44 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="all">All Orientations</option>
                    {uniqueFilters.orientations.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={filters.alignment} onChange={(e) => onFilterChange('alignment', e.target.value)} className="w-full lg:w-44 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="all">All Alignments</option>
                    {uniqueFilters.alignments.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={filters.color} onChange={(e) => onFilterChange('color', e.target.value)} className="w-full lg:w-44 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="all">All Colors</option>
                    {uniqueFilters.colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>
    );
};

const TemplateCard = ({ template, onPreview, onSelect }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
        <div className="relative bg-gray-200 dark:bg-gray-700">
            <img
                className={template.orientation === 'Portrait' ? 'object-contain h-48 w-full' : 'object-cover w-full h-48'}
                src={template.imageUrl}
                alt={template.template_code}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x424/cccccc/333333?text=Image+Error'; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2">
                <button onClick={() => onPreview(template)} className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/80 text-gray-800 font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:bg-white">
                    <i className="ri-eye-line"></i>
                    <span>Preview</span>
                </button>
                <button onClick={() => onSelect(template)} className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-primary text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2">
                    <i className="ri-check-line"></i>
                    <span>Select</span>
                </button>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">{template.template_code}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-2 text-xs text-gray-600 dark:text-gray-300">
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{template.style}</span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{template.orientation}</span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{template.alignment}</span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{template.theme_color}</span>
            </div>
        </div>
    </div>
);

const PreviewModal = ({ isOpen, onClose, template }) => {
    if (!isOpen || !template) return null;

    const containerWidth = template.orientation === 'Portrait' ? 450 : 842;
    const containerHeight = template.orientation === 'Portrait' ? 637 : 595;

    return (
        <div className="fixed inset-0 bg-black/70 z-[120] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col transform transition-all">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">Preview: {template.template_code}</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><i className="ri-close-line text-2xl"></i></button>
                </div>
                <div className="p-6 flex-grow overflow-auto bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <div className="relative shadow-lg" style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}>
                        <img src={template.imageUrl} className="w-full h-auto" alt="Template background" />
                        <div className="absolute inset-0">
                            {template.content.map(el => (
                                <div key={el.element_id} className="preview-element absolute" style={{
                                    top: `${(el.position_y / (template.orientation === 'Portrait' ? 1123 : 595)) * 100}%`,
                                    left: `${(el.position_x / (template.orientation === 'Portrait' ? 794 : 1123)) * 100}%`,
                                    fontFamily: el.font_family,
                                    fontSize: `${el.font_size}px`,
                                    fontWeight: el.font_weight || 'normal',
                                    color: el.color,
                                }}>
                                    {el.type === 'text' ? el.content : <img src={el.content} alt="" style={{ width: el.width, height: el.height }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToastNotification = ({ message }) => (
    <div className="fixed top-24 right-6 bg-green-100 border border-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-4 py-3 rounded-lg shadow-md flex items-center gap-3 z-[150]">
        <i className="ri-checkbox-circle-fill text-xl"></i>
        <span>{message}</span>
    </div>
);

export default TemplatesList;
