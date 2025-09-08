import React, { useState, useMemo, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../../components/mysertifico/Sidebar";
import DashboardNavbar from "../../../components/mysertifico/DashboardNavbar";
import SearchInput from "../../../components/common/SearchInput";
import { templatesData } from "../../../data/sampleTemplateData";

const SelectedTemplateList = ({ theme, onThemeToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filters, setFilters] = useState({
    style: "all",
    orientation: "all",
    alignment: "all",
    color: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleFilterChange = (filterName, value) =>
    setFilters((prev) => ({ ...prev, [filterName]: value }));

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      return (
        (searchTerm === "" ||
          template.template_code
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (filters.style === "all" || template.style === filters.style) &&
        (filters.orientation === "all" ||
          template.orientation === filters.orientation) &&
        (filters.alignment === "all" ||
          template.alignment === filters.alignment) &&
        (filters.color === "all" || template.theme_color === filters.color)
      );
    });
  }, [filters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Main */}
      <div
        className={`relative min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <DashboardNavbar
          onSidebarToggle={toggleSidebar}
          theme={theme}
          onThemeToggle={onThemeToggle}
        />

        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Header />

            {/* Filters */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchChange={setSearchTerm}
              searchTerm={searchTerm}
            />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onPreview={(t) => {
                      setSelectedTemplate(t);
                      setIsPreviewOpen(true);
                    }}
                    onSelect={(t) => console.log("Selected:", t)}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </main>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          template={selectedTemplate}
          onSelect={(t) => console.log("Template selected:", t)}
        />
      </div>
    </div>
  );
};

// HEADER
const Header = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Selected Templates
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Manage your chosen templates or add new ones from the gallery.
      </p>
    </div>
    <NavLink
      to="/template-list"
      className="w-full md:w-auto justify-center px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
    >
      <i className="ri-add-line mr-2"></i>
      Add From Gallery
    </NavLink>
  </div>
);

//  FILTER BAR 
const FilterBar = ({ filters, onFilterChange, onSearchChange, searchTerm }) => {
  const uniqueFilters = useMemo(() => {
    const styles = [...new Set(templatesData.map((t) => t.style))];
    const orientations = [...new Set(templatesData.map((t) => t.orientation))];
    const alignments = [...new Set(templatesData.map((t) => t.alignment))];
    const colors = [...new Set(templatesData.map((t) => t.theme_color))];
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
        <SelectFilter
          label="All Styles"
          value={filters.style}
          options={uniqueFilters.styles}
          onChange={(val) => onFilterChange("style", val)}
        />
        <SelectFilter
          label="All Orientations"
          value={filters.orientation}
          options={uniqueFilters.orientations}
          onChange={(val) => onFilterChange("orientation", val)}
        />
        <SelectFilter
          label="All Alignments"
          value={filters.alignment}
          options={uniqueFilters.alignments}
          onChange={(val) => onFilterChange("alignment", val)}
        />
        <SelectFilter
          label="All Colors"
          value={filters.color}
          options={uniqueFilters.colors}
          onChange={(val) => onFilterChange("color", val)}
        />
      </div>
    </div>
  );
};

const SelectFilter = ({ label, value, options, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full lg:w-44 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
  >
    <option value="all">{label}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

// TEMPLATE CARD
const TemplateCard = ({ template, onPreview, onSelect }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
    <div className="relative bg-gray-200 dark:bg-gray-700">
      {/* <img
        className={
          template.orientation === "Portrait"
            ? "object-contain h-48 w-full"
            : "object-cover w-full h-48"
        }
        src={template.imageUrl}
        alt={template.template_code}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg";
        }}
      /> */}


      {/* for testing purposes, later remove code below and uncomment above  */}
      <img
        className={
            template.orientation === "Portrait"
            ? "object-contain h-48 w-full"
            : "object-cover w-full h-48"
        }
        src={
            template.imageUrl ||
            (template.orientation === "Portrait"
            ? "https://marketplace.canva.com/EAFM1s4f1vE/1/0/1131w/canva-blue-certificate-of-appreciation-simple-minimalist-certificate-certificate-wE18DqMUlZ4.jpg"
            : "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg")
        }
        alt={template.template_code}
        onError={(e) => {
            e.target.onerror = null;
            e.target.src =
            template.orientation === "Portrait"
                ? "https://marketplace.canva.com/EAFM1s4f1vE/1/0/1131w/canva-blue-certificate-of-appreciation-simple-minimalist-certificate-certificate-wE18DqMUlZ4.jpg"
                : "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg";
        }}
        />


      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2">
        <button
          onClick={() => onPreview(template)}
          className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/80 text-gray-800 font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:bg-white"
        >
          <i className="ri-eye-line"></i>
          <span>Preview</span>
        </button>
        <button
          onClick={() => onSelect(template)}
          className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-primary text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2"
        >
          <i className="ri-check-line"></i>
          <span>Select</span>
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 dark:text-white">
        {template.template_code}
      </h3>
      <div className="flex items-center flex-wrap gap-2 mt-2 text-xs text-gray-600 dark:text-gray-300">
        <Badge>{template.style}</Badge>
        <Badge>{template.orientation}</Badge>
        <Badge>{template.alignment}</Badge>
        <Badge>{template.theme_color}</Badge>
      </div>
    </div>
  </div>
);

const Badge = ({ children }) => (
  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
    {children}
  </span>
);

// EMPTY STATE 
const EmptyState = () => (
  <div className="col-span-full text-center py-16">
    <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
      No Templates Found
    </h3>
    <p className="text-gray-500 dark:text-gray-400 mt-1">
      Your search or filter did not match any templates.
    </p>
  </div>
);

// PREVIEW MODAL 
const PreviewModal = ({ isOpen, onClose, template, onSelect }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      requestAnimationFrame(() => {
        panelRef.current.classList.remove("opacity-0", "scale-95");
        panelRef.current.classList.add("opacity-100", "scale-100");
      });
    }
  }, [isOpen]);

  if (!isOpen || !template) return null;

  const maxWidth = template.orientation === "Portrait" ? "520px" : "900px";

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[120] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all duration-300 opacity-0 scale-95 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
            Preview: {template.template_code}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-auto bg-gray-100 dark:bg-gray-900">
          <div className="flex items-center justify-center">
            <div
              className="relative shadow-lg w-full"
              style={{
                maxWidth,
                aspectRatio: `${template.original_width} / ${template.original_height}`,
              }}
            >
              {/* <img
                src={template.imageUrl}
                alt="Template Background"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg";
                }}
              /> */}

              {/* for testing purposes too, to check the preview modal fit the required design, later remove code below and uncomment above */}

              <img
                src={
                    template.imageUrl ||
                    (template.orientation === "Portrait"
                    ? "https://marketplace.canva.com/EAFM1s4f1vE/1/0/1131w/canva-blue-certificate-of-appreciation-simple-minimalist-certificate-certificate-wE18DqMUlZ4.jpg"
                    : "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg")
                }
                alt="Template Background"
                className="w-full h-auto"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                    template.orientation === "Portrait"
                        ? "https://marketplace.canva.com/EAFM1s4f1vE/1/0/1131w/canva-blue-certificate-of-appreciation-simple-minimalist-certificate-certificate-wE18DqMUlZ4.jpg"
                        : "https://marketplace.canva.com/EAFlVDzb7sA/3/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-Qn4Rei141MM.jpg";
                }}
                />


              <div className="absolute inset-0">
                {template.content?.map((el) => (
                  <div
                    key={el.element_id}
                    className="absolute"
                    style={{
                      top: `${
                        (el.position_y / template.original_height) * 100
                      }%`,
                      left: `${
                        (el.position_x / template.original_width) * 100
                      }%`,
                      fontFamily: el.font_family,
                      fontSize: `${el.font_size}px`,
                      fontWeight: el.font_weight || "normal",
                      color: el.color,
                    }}
                  >
                    {el.type === "text" ? (
                      el.content
                    ) : (
                      <img
                        src={el.content}
                        alt=""
                        style={{ width: el.width, height: el.height }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* (modal buttons) */}
        <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 gap-x-3">
          <button
            onClick={() => onSelect?.(template)}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Select Template
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedTemplateList;
